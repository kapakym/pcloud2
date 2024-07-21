import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as path from 'path';
import { PrismaService } from 'src/prisma.service';
import { filterImages, getFilesNonRecursively } from 'src/utils/files.utils';
import { GetPhotoListDto, ScanPhotoDto } from './dto/photo.dto';

@Injectable()
export class PhotosService {
  constructor(
    private configService: ConfigService,
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  async findLimit(dto: GetPhotoListDto, id: string) {
    if (!id) throw new UnauthorizedException('Error');

    const imageFiles = await this.prisma.photos.findMany({
      skip: dto.offset,
      take: dto.limit,
      where: {
        userId: id,
      },
    });
    console.log(imageFiles, id);
    const total = await this.prisma.photos.count({
      where: {
        userId: id,
      },
    });

    const response = {
      skip: dto.limit,
      offset: dto.offset,
      total,
      photos: imageFiles.map((item) => ({ id: item.id, path: item.path })),
    };

    return response;
  }

  async scanAll(dto: ScanPhotoDto, id: string) {
    const cloudFolder = this.configService.get('CLOUD_PATH');

    if (!id) throw new UnauthorizedException('Error');

    const basePath = path?.join(cloudFolder, id);

    let fullPath = basePath;
    if (dto.path) {
      fullPath = path?.join(cloudFolder, id, dto.path);
    }

    const allFiles = getFilesNonRecursively(fullPath);
    const imageFiles = filterImages(allFiles);

    for (const item of imageFiles) {
      const existImage = await this.prisma.photos.findUnique({
        where: {
          path: item,
        },
      });
      console.log(existImage);
      if (!existImage) {
        await this.prisma.photos.create({
          data: {
            userId: id,
            path: item,
          },
        });
      }
    }

    return dto.uuidTask;
  }
}
