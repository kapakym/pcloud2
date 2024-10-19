import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import * as ExifReader from 'exifreader';
import { Response, Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from 'src/prisma.service';
import { TasksGateway } from 'src/tasks/tasks.gateway';
import {
  filterImages,
  filterVideo,
  getFilesNonRecursively,
} from 'src/utils/files.utils';
import {
  GetPeoplesListDto,
  GetMediaByIdtDto,
  GetMediaListDto,
  ScanMediaDto,
  TaskIdDto,
} from './dto/media.dto';
import { $Enums } from '@prisma/client';

@Injectable()
export class MediaService {
  tempPrefix = null;
  serverPythonUrl = null;
  cloudFolder = null;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private taskGateWay: TasksGateway,
  ) {
    this.tempPrefix = this.configService.get('TEMP_PREFIX');
    this.serverPythonUrl = this.configService.get('SERVER_PYTHON');
    this.cloudFolder = this.configService.get('CLOUD_PATH');
  }

  async getPeoples(dto: GetPeoplesListDto, id: string) {
    const peoples = await this.prisma.clusters.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        name: 'asc',
      },
      include: {
        faces: true,
      },
    });

    const response = [];
    for (const people of peoples) {
      if (people.key !== '-1') {
        const media = await this.prisma.media.findMany({
          where: {
            userId: id,
            faces: {
              some: {
                clusterId: people.id,
              },
            },
          },
        });
        console.log('-1', media);
        const item = {
          id: people?.id,
          name: people?.name,
          face: people?.faces[0]?.path,
          faceId: people?.faces[0]?.id,
          media: media,
        };
        if (media.length) {
          response.push(item);
        }
      } else {
        for (const face of people.faces) {
          const photo = await this.prisma.media.findUnique({
            where: { id: face.mediaId },
          });
          const item = {
            id: people?.id,
            name: people?.name,
            face: face?.path,
            faceId: face?.id,
            media: [photo],
          };
          console.log('faces', photo);
          response.push(item);
        }
      }
    }
    return response;
  }

  // async updatePeopleName(dto: { id: string }) {
  //   this.prisma.faces.update({ where: { id }, data:{} });
  // }

  async findLimit(dto: GetMediaListDto, id: string) {
    const { sortBy, sortWay } = dto;
    if (!id) throw new UnauthorizedException('Error');

    const orderBy = sortBy
      ? {
          [sortBy]: sortWay,
        }
      : undefined;

    const imageFiles = await this.prisma.media.findMany({
      skip: dto.offset,
      take: dto.limit,
      orderBy: {
        ...orderBy,
      },
      where: {
        userId: id,
      },
      include: {
        faces: true,
      },
    });

    const total = await this.prisma.media.count({
      where: {
        userId: id,
      },
    });

    const response = {
      limit: dto.limit,
      offset: dto.offset >= total ? dto.offset - dto.limit : dto.offset,
      total,
      files: imageFiles.map((item) => ({
        type: item.type,
        id: item.id,
        path: item.path,
        dateCreate: item.dateCreate ? item.dateCreate : undefined,
        lon: item.longitude ? item.longitude : undefined,
        lat: item.latitude ? item.latitude : undefined,
      })),
    };

    return response;
  }

  async scanAll(dto: ScanMediaDto, id: string) {
    if (!id) throw new UnauthorizedException('Error');

    // this.tasksGateway.server.
    const basePath = path?.join(this.cloudFolder, id);

    let fullPath = basePath;
    if (dto.path) {
      fullPath = path?.join(this.cloudFolder, id, dto.path);
    }

    const allFiles = getFilesNonRecursively(fullPath);

    // Scan and add photos
    const imageFiles = filterImages(allFiles);
    this.addMediaInDB(imageFiles, id, $Enums.TypesMedia.image);

    // Scan and add video
    const videoFiles = filterVideo(allFiles);
    console.log('------>', videoFiles);
    this.addMediaInDB(videoFiles, id, $Enums.TypesMedia.video);

    this.taskGateWay.server.emit('tasks', {
      id: dto.uuidTask,
      status: 'completed',
      description: JSON.stringify({ count: imageFiles.length }),
    });
    return dto.uuidTask;
  }

  async scanFaces(dto: TaskIdDto, id: string) {
    if (!id) throw new UnauthorizedException('Error');
    // Получение списка не отсканированных фотографий
    const media = await this.prisma.media.findMany({
      where: {
        isFacesScanned: false,
      },
    });
    if (media.length) {
      const url = `${this.serverPythonUrl}/find_faces`;
      let current = 0;

      for (const photo of media) {
        current++;
        // Проход по списку фото и вытаскивание из них лиц
        console.log('scan: total,current', media.length, current);
        const result: any = await axios.post(url, {
          path: photo.path,
          dest_path: path.join(
            this.cloudFolder,
            id + '-' + this.tempPrefix,
            'faces',
          ),
        });

        console.log(result?.data?.status);
        // Установка для фото статуса отсканирована
        this.prisma.media.update({
          where: {
            id: photo.id,
          },
          data: {
            isFacesScanned: true,
          },
        });
        if (result?.data?.status === 'error') continue;
        for (const element of result.data.faces) {
          // Добавление информации в БД о найденных лицах
          await this.prisma.faces.create({
            data: {
              userId: id,
              path: element.filename,
              mediaId: photo.id,
              left: element.position.left,
              right: element.position.right,
              top: element.position.top,
              bottom: element.position.bottom,
            },
          });
        }
      }
    }
    // Отправка информации, о том что задача завершена
    this.taskGateWay.server.emit('tasks', {
      id: dto.uuidTask,
      status: 'completed',
      description: JSON.stringify({ count: media.length }),
    });
  }

  async clearCluster(id: string) {
    const result = await this.prisma.clusters.deleteMany({
      where: { userId: id },
    });

    return result;
  }
  async clearFaces(id: string) {
    await this.clearCluster(id);
    await this.prisma.media.updateMany({
      where: { userId: id },
      data: {
        isFacesScanned: false,
      },
    });

    const result = await this.prisma.faces.deleteMany({
      where: { userId: id },
    });

    fs.rm(
      path.join(this.cloudFolder, id + '-' + this.tempPrefix, 'faces', '*'),
      { recursive: true },
      (err) => {
        if (err) {
          return console.error(`Error in delete faces: ${err.message}`);
        }
      },
    );

    return result;
  }

  async clearMedia(id: string) {
    await this.clearCluster(id);
    await this.clearFaces(id);
    const result = await this.prisma.media.deleteMany({
      where: { userId: id },
    });

    return result;
  }

  async updateClusters(dto: TaskIdDto, id: string) {
    if (!id) throw new UnauthorizedException('Error');

    const url = `${this.serverPythonUrl}/update_clusters`;
    type ClusterType = Record<string, string[]>;
    const result: AxiosResponse = await axios.post<{
      clusters: ClusterType;
    }>(url, {
      path: path.join(this.cloudFolder, id + '-' + this.tempPrefix, 'faces'),
    });
    console.log(result);
    for (const key in result.data.clusters) {
      let isExistCluster: any = await this.prisma.clusters.findFirst({
        where: {
          key,
          userId: id,
        },
      });
      !isExistCluster
        ? (isExistCluster = await this.prisma.clusters.create({
            data: {
              userId: id,
              key,
              name: 'noname',
            },
          }))
        : isExistCluster;
      if (isExistCluster) {
        for (const item of result.data.clusters[key]) {
          try {
            await this.prisma.faces.update({
              where: {
                path: item,
              },
              data: {
                clusterId: isExistCluster.id,
              },
            });
          } catch (e) {
            console.log('ERROR', 'file ', item, ' not found in db');
            this.taskGateWay.server.emit('tasks', {
              id: dto.uuidTask,
              status: 'error',
              description: JSON.stringify({
                message: 'ERROR file item not found in db',
              }),
            });
          }
        }
      }
    }
    this.taskGateWay.server.emit('tasks', {
      id: dto.uuidTask,
      status: 'completed',
      description: JSON.stringify({ count: result?.data?.clusters?.size }),
    });
  }

  async findById(dto: GetMediaByIdtDto, id: string, res: Response) {
    if (!id) throw new UnauthorizedException('Error');

    const file = await this.prisma.media.findUnique({
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

  async playById(videoId: string, id: string, req: Request, res: Response) {
    console.log(videoId);
    // if (!id) throw new UnauthorizedException('Error');

    const file = await this.prisma.media.findUnique({
      where: {
        // userId: id,
        id: videoId,
      },
    });

    if (!file) throw new BadRequestException('file not found');

    const stat = fs.statSync(file.path);
    const fileSize = stat.size;
    const range = req.headers.range;

    // Если запрос не содержит заголовок Range, отправляем полный файл
    if (!range) {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(file.path).pipe(res);
    } else {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;

      const videoFile = fs.createReadStream(file.path, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, head);
      videoFile.pipe(res);
    }
  }

  async findFaceById(dto: GetMediaByIdtDto, id: string, res: Response) {
    const file = await this.prisma.faces.findUnique({
      where: {
        id: dto.id,
      },
    });

    if (!file) throw new BadRequestException('file not found');

    const pathFace = path.join(
      this.cloudFolder,
      id + '-' + this.tempPrefix,
      'faces',
      file.path,
    );
    if (fs.existsSync(pathFace)) {
      return res.download(pathFace, path.basename(file.path));
    }
    throw new BadRequestException('file not found');
  }

  async addMediaInDB(
    imageFiles: string[],
    id: string,
    typeMedia: $Enums.TypesMedia,
  ) {
    for (const item of imageFiles) {
      console.log(item);
      let tags = undefined;
      try {
        tags = await ExifReader.load(item);
      } catch (error) {
        console.log(error);
        if (typeMedia === $Enums.TypesMedia.image) continue;
      }

      const existImage = await this.prisma.media.findUnique({
        where: {
          path: item,
        },
      });

      let dateCreate = null;
      if (tags && tags['DateTime']?.description) {
        const dateArr = tags['DateTime']?.description?.split(' ');
        dateArr[0] = dateArr[0].replaceAll(':', '-');
        dateCreate = dateArr.join(' ');
      }

      if (!existImage) {
        await this.prisma.media.create({
          data: {
            type: typeMedia,
            userId: id,
            path: item,
            latitude:
              tags && tags['GPSLatitude']?.description
                ? String(tags['GPSLatitude']?.description)
                : undefined,
            longitude:
              tags && tags['GPSLongitude']?.description
                ? String(tags['GPSLongitude']?.description)
                : undefined,
            dateCreate: dateCreate
              ? new Date(Date.parse(dateCreate))
              : undefined,
          },
        });
      }
    }
  }
}