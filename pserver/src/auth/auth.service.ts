import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { $Enums } from '@prisma/client';
import { verify } from 'argon2';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  EXPIRE_DAY_REFRESH_TOKEN = 7;
  REFRESH_TOKEN_NAME = 'refreshToken';
  tempPrefix = null;
  cloudFolder = null;

  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {
    this.tempPrefix = this.configService.get('TEMP_PREFIX');
    this.cloudFolder = this.configService.get('CLOUD_PATH');
  }

  async login(dto: AuthDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.validateUser(dto);

    const tokens = this.issueTokens({ role: user.roles, id: user.id });

    return { user, ...tokens };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.userService.getByEmail(dto.email);

    if (oldUser) throw new BadRequestException('User already exists');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.create(dto);

    if (user) {
      // Функция для создания директории где хранятся облачные данные
      fs.mkdir(
        path.join(this.cloudFolder, user.id),
        { recursive: true },
        (err) => {
          if (err) {
            return console.error(
              `Ошибка при создании директории: ${err.message}`,
            );
          }
        },
      );
      // Функция для создания директории где хранятся облачные данные
      fs.mkdir(
        path.join(this.cloudFolder, user.id + '-' + this.tempPrefix, 'faces'),
        { recursive: true },
        (err) => {
          if (err) {
            return console.error(
              `Ошибка при создании директории: ${err.message}`,
            );
          }
        },
      );
    }

    const tokens = this.issueTokens({ role: user.roles, id: user.id });

    return { user, ...tokens };
  }

  private issueTokens(data: { id: string; role: $Enums.Roles }) {
    const accessToken = this.jwt.sign(data, { expiresIn: '1h' });

    const refreshToken = this.jwt.sign(data, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) throw new NotFoundException('User not found');

    if (!user.active) throw new BadRequestException('User in not active');

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      // domain: 'localhost',
      secure: true,
      sameSite: 'none',
      expires: expiresIn,
    });
  }

  removeRefreshTokenToResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: 'localhost',
      secure: true,
      sameSite: 'none',
      expires: new Date(0),
    });
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);

    if (!result) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.getById(result.id);

    const tokens = this.issueTokens({
      id: result.id,
      role: result.role,
    });
    return { user, ...tokens };
  }

  async generateTokenWithCustomSecret(
    payload: any,
    options?: JwtSignOptions,
  ): Promise<string> {
    return this.jwt.sign(payload, options);
  }
}
