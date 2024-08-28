import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebSocketServer } from '@nestjs/websockets';
import axios, { AxiosResponse } from 'axios';
import * as ExifReader from 'exifreader';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from 'src/prisma.service';
import { filterImages, getFilesNonRecursively } from 'src/utils/files.utils';
import {
  GetPeoplesListDto,
  GetPhotoByIdtDto,
  GetPhotoListDto,
  ScanPhotoDto,
  TaskIdDto,
} from './dto/photo.dto';
import { TasksGateway } from 'src/tasks/tasks.gateway';

@Injectable()
export class PhotosService {
  @WebSocketServer() server;
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
        const photos = await this.prisma.photos.findMany({
          where: {
            userId: id,
            faces: {
              some: {
                clusterId: people.id,
              },
            },
          },
        });
        const item = {
          id: people.id,
          name: people.name,
          face: people.faces[0].path,
          faceId: people.faces[0].id,
          photos: photos,
        };
        response.push(item);
      } else {
        for (const face of people.faces) {
          const photo = await this.prisma.photos.findUnique({
            where: { id: face.photosId },
          });
          const item = {
            id: people.id,
            name: people.name,
            face: face.path,
            faceId: face.id,
            photos: [photo],
          };
          response.push(item);
        }
      }
    }
    return response;
  }

  // async updatePeopleName(dto: { id: string }) {
  //   this.prisma.faces.update({ where: { id }, data:{} });
  // }

  async findLimit(dto: GetPhotoListDto, id: string) {
    const { sortBy, sortWay } = dto;
    if (!id) throw new UnauthorizedException('Error');

    const orderBy = sortBy
      ? {
          [sortBy]: sortWay,
        }
      : undefined;

    const imageFiles = await this.prisma.photos.findMany({
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
    if (!id) throw new UnauthorizedException('Error');

    // this.tasksGateway.server.
    const basePath = path?.join(this.cloudFolder, id);

    let fullPath = basePath;
    if (dto.path) {
      fullPath = path?.join(this.cloudFolder, id, dto.path);
    }

    const allFiles = getFilesNonRecursively(fullPath);
    const imageFiles = filterImages(allFiles);

    for (const item of imageFiles) {
      const tags = await ExifReader.load(item);

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
    this.taskGateWay.server.emit('tasks', {
      id: dto.uuidTask,
      status: 'completed',
      description: JSON.stringify({ count: imageFiles.length }),
    });
    return dto.uuidTask;
  }

  async scanFaces(dto: TaskIdDto, id: string) {
    if (!id) throw new UnauthorizedException('Error');

    const photos = await this.prisma.photos.findMany({
      include: {
        faces: true,
      },
    });
    if (photos.length) {
      const url = `${this.serverPythonUrl}/find_faces`;
      for (const photo of photos) {
        if (!photo.faces.length) {
          const result: any = await axios.post(url, {
            path: photo.path,
            dest_path: path.join(
              this.cloudFolder,
              id + '-' + this.tempPrefix,
              'faces',
            ),
          });
          for (const element of result.data.faces) {
            await this.prisma.faces.create({
              data: {
                userId: id,
                path: element.filename,
                photosId: photo.id,
                left: element.position.left,
                right: element.position.right,
                top: element.position.top,
                bottom: element.position.bottom,
              },
            });
          }
        }
      }
    }
    this.taskGateWay.server.emit('tasks', {
      id: dto.uuidTask,
      status: 'completed',
      description: JSON.stringify({ count: photos.length }),
    });
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

  async findFaceById(dto: GetPhotoByIdtDto, id: string, res: Response) {
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
}
