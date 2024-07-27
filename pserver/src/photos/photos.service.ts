import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { WebSocketServer } from '@nestjs/websockets';
import * as ExifReader from 'exifreader';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from 'src/prisma.service';
import { TasksGateway } from 'src/tasks/tasks.gateway';
import { filterImages, getFilesNonRecursively } from 'src/utils/files.utils';
import { WebsocketPyclientService } from 'src/websocket-pyclient/websocket-pyclient.service';
import {
  DetectFaceDto,
  GetPhotoByIdtDto,
  GetPhotoListDto,
  ScanPhotoDto,
} from './dto/photo.dto';

@Injectable()
export class PhotosService {
  @WebSocketServer() server;

  constructor(
    private configService: ConfigService,
    private jwt: JwtService,
    private prisma: PrismaService,
    private tasksGateway: TasksGateway,
    private pyclient: WebsocketPyclientService,
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
    const total = await this.prisma.photos.count({
      where: {
        userId: id,
      },
    });

    const response = {
      limit: dto.limit,
      offset: dto.offset >= total ? dto.offset - dto.limit : dto.offset,
      total,
      photos: imageFiles.map((item) => ({
        id: item.id,
        path: item.path,
        dateCreate: item.dateCreate ? item.dateCreate : undefined,
        lon: item.longitude ? item.longitude : undefined,
        lat: item.latitude ? item.latitude : undefined,
      })),
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
      const tags = await ExifReader.load(item);
      // console.log(tags);

      const existImage = await this.prisma.photos.findUnique({
        where: {
          path: item,
        },
      });

      let dateCreate = null;
      if (tags['DateTime']?.description) {
        const dateArr = tags['DateTime']?.description?.split(' ');
        dateArr[0] = dateArr[0].replaceAll(':', '-');
        dateCreate = dateArr.join(' ');
      }

      if (!existImage) {
        await this.prisma.photos.create({
          data: {
            userId: id,
            path: item,
            latitude: tags['GPSLatitude']?.description
              ? String(tags['GPSLatitude']?.description)
              : undefined,
            longitude: tags['GPSLongitude']?.description
              ? String(tags['GPSLongitude']?.description)
              : undefined,
            dateCreate: dateCreate
              ? new Date(Date.parse(dateCreate))
              : undefined,
          },
        });
      }
    }
    // this.tasksGateway.server.emit('updateTask', id);
    return dto.uuidTask;
  }

  async detectFaces(dto: DetectFaceDto, id: string) {
    const cloudFolder = this.configService.get('CLOUD_PATH');

    if (!id) throw new UnauthorizedException('Error');

    const photo = await this.prisma.photos.findUnique({
      where: { id: dto.id, userId: id },
    });
    if (photo) {
      this.pyclient.socket.emit('message', { path: photo.path });
    }
  }

  async findById(dto: GetPhotoByIdtDto, id: string, res: Response) {
    if (!id) throw new UnauthorizedException('Error');

    const file = await this.prisma.photos.findUnique({
      where: {
        userId: id,
        id: dto.id,
      },
    });

    if (!file) throw new BadRequestException('file not found');

    if (fs.existsSync(file.path)) {
      return res.download(file.path, path.basename(file.path));
    }
    throw new BadRequestException('file not found');
  }
}
