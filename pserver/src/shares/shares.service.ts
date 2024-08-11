import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import * as fs from 'fs';
import 'multer';
import * as path from 'path';
import { PrismaService } from 'src/prisma.service';
import {
  CreateShareDto,
  DeleteShareDto,
  GetFilesShareLinkDto,
  TypesStatusShareLink,
  UpdateShareDto,
} from './dto/share.dto';

@Injectable()
export class SharesService {
  cloudFolder = null;
  secretShareKey = null;
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {
    this.cloudFolder = this.configService.get('CLOUD_PATH');
    this.secretShareKey = this.configService.get('JWT_SECRET_SHARE');
  }

  async create(dto: CreateShareDto, id: string) {
    if (!id) throw new UnauthorizedException('Error');
    const newShare = await this.prisma.shares.create({
      data: {
        userId: id,
        path: dto.path,
        type: dto.type,
        password: dto.password ? await hash(dto.password) : undefined,
        timeLive: dto.timeLive,
        filename: dto.filename,
      },
    });
    return { url: newShare.id };
  }

  async findAll(id: string) {
    const shareLinks = await this.prisma.shares.findMany({
      where: {
        userId: id,
      },
      select: {
        password: true,
        filename: true,
        id: true,
        path: true,
        timeLive: true,
        type: true,
      },
    });

    const response = shareLinks.map((item) => {
      const { password, ...rest } = item;
      return { ...rest, isLock: password ? true : false };
    });

    return response;
  }

  async delete(dto: DeleteShareDto) {
    const deleteShare = await this.prisma.shares.delete({
      where: {
        id: dto.id,
      },
    });
    return deleteShare.id;
  }

  async update(dto: UpdateShareDto) {
    const updateShare = await this.prisma.shares.update({
      where: { id: dto.id },
      data: {
        password: dto.password ? await hash(dto.password) : undefined,
        timeLive: dto.timeLive,
      },
    });
    return updateShare.id;
  }

  async getFiles(dto: GetFilesShareLinkDto, shareToken: string) {
    const shareLink = await this.prisma.shares.findUnique({
      where: { id: dto.id },
    });

    if (!shareLink) return { status: 'not_found' as TypesStatusShareLink };

    const result = await this.checkAuthShareLink(shareLink, dto, shareToken);
    if (shareLink.password && result.status !== 'ok') return result;

    if (shareLink.type === 'file') {
      return {
        status: 'ok' as TypesStatusShareLink,
        folders: [],
        files: [{ name: shareLink.filename, type: 'file' }],
      };
    }
    return { status: 'ok' as TypesStatusShareLink };
    // const cloudFolder = this.configService.get('CLOUD_PATH');

    // if (!id) throw new UnauthorizedException('Error');

    // const basePath = path?.join(cloudFolder, id);

    // let fullPath = basePath;
    // if (currentPath) {
    //   fullPath = path?.join(cloudFolder, id, currentPath);
    // }

    // await this.isValidHomeDir(fullPath);

    // const items = fs.readdirSync(fullPath, { withFileTypes: true });
    // const folders = items
    //   .filter((item: any) => item.isDirectory())
    //   .map((item: any) => ({ name: item.name }));
    // const files = items
    //   .filter((item: any) => item.isFile())
    //   .map((item: any) => ({
    //     name: item.name,
    //     type: path?.extname(item.name),
    //     size: fs.statSync(path.join(fullPath, item.name)).size,
    //   }));
    // return { files, folders };
  }

  async checkAuthShareLink(
    shareLink: any,
    dto: GetFilesShareLinkDto,
    shareToken: string,
  ) {
    let token = shareToken;
    if (shareLink.password && !shareToken && !dto.password) {
      return { status: 'access_denied' as TypesStatusShareLink };
    }
    if (Date.now() > new Date(shareLink.timeLive).getMilliseconds()) {
      return { status: 'time_leave' as TypesStatusShareLink };
    }
    if (dto.password && shareLink.password) {
      const isValid = await verify(shareLink.password, dto.password);

      if (!isValid) {
        return { status: 'invalid_password' as TypesStatusShareLink };
      }
      token = this.jwt.sign(
        {},
        {
          secret: this.secretShareKey,
          expiresIn: '1d',
        },
      );
      return { status: 'ok', token };
    }
    if (token) {
      try {
        // Проверка токена с использованием вашего секретного ключа
        this.jwt.verify(token, {
          secret: this.secretShareKey,
        });
        return { status: 'ok' };
      } catch (err) {
        return { status: 'access_denied' as TypesStatusShareLink };
      }
    }
  }
}
