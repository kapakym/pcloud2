/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { hash, verify } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import {
  ActivateUserDto,
  DeleteUserDto,
  GetUserListDto,
  UpdateUserDto,
  UserDto,
} from './dto/user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  tempPrefix = null;
  cloudFolder = null;
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.tempPrefix = this.configService.get('TEMP_PREFIX');
    this.cloudFolder = this.configService.get('CLOUD_PATH');
  }

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(dto: AuthDto) {
    const countUsers = await this.prisma.user.count();
    const user = {
      email: dto.email,
      name: '',
      roles: countUsers > 0 ? $Enums.Roles.user : $Enums.Roles.admin,
      password: await hash(dto.password),
      active: !countUsers,
    };

    return this.prisma.user.create({ data: user });
  }

  async update(id: string, dto: UserDto) {
    let data = dto;

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    return this.prisma.user.update({ where: { id }, data });
  }

  async getUsers(dto: GetUserListDto) {
    const users = await this.prisma.user.findMany({
      skip: dto.offset,
      take: dto.limit,
      select: {
        active: true,
        email: true,
        id: true,
        roles: true,
      },
    });
    const count = await this.prisma.user.count();
    return {
      limit: dto.limit,
      offset: dto.offset,
      users,
      count,
    };
  }

  async setActiveUser(dto: ActivateUserDto, idUser: string) {
    if (dto.id === idUser && dto.active === false) return;
    try {
      await this.prisma.user.update({
        where: { id: dto.id },
        data: { active: dto.active, roles: dto.roles },
      });
      return true;
    } catch {
      return false;
    }
  }

  async deleteUser(dto: DeleteUserDto, idUser: string) {
    if (dto.id === idUser) return;
    try {
      const fullPath = path?.join(this.cloudFolder, dto.id);
      await this.prisma.user.delete({ where: { id: dto.id } });
      fs.rmdirSync(fullPath, { recursive: true });
      fs.rmdirSync(
        path.join(this.cloudFolder, dto.id + '-' + this.tempPrefix),
        { recursive: true },
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async getUserProfile(id: string) {
    if (id) {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      const { password, ...response } = user;
      return response;
    }
  }

  async updateProfile(dto: UpdateUserDto, id: string) {
    const { name, email, newPassword, oldPassword } = dto;
    if (id) {
      const user = await this.prisma.user.update({
        where: { id },
        data: { name, email },
      });
      if (!newPassword) return;
      const isValid = await verify(user.password, oldPassword);
      if (oldPassword && isValid) {
        await this.prisma.user.update({
          where: { id },
          data: { password: await hash(newPassword) },
        });
      }
      const { password, ...response } = user;
      return response;
    }
  }
}
