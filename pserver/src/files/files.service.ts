import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as fs from 'fs';
import * as path from 'path';
import { ActionFilesDto, DeleteFilesDto } from './dto/file.dto';

@Injectable()
export class FilesService {
  constructor(
    private configService: ConfigService,
    private jwt: JwtService,
  ) {}

  async getFiles(currentPath: string, accessToken: string) {
    const cloudFolder = this.configService.get('CLOUD_PATH');

    const resultToken = await this.jwt.verifyAsync(accessToken.split(' ')[1]);
    if (!resultToken) throw new UnauthorizedException('Error');

    const basePath = path?.join(cloudFolder, resultToken.id);

    let fullPath = basePath;
    if (currentPath) {
      fullPath = path?.join(cloudFolder, resultToken.id, currentPath);
    }

    // await this.isValidHomeDir(fullPath);

    const items = fs.readdirSync(fullPath, { withFileTypes: true });
    const folders = items
      .filter((item: any) => item.isDirectory())
      .map((item: any) => ({ name: item.name }));
    const files = items
      .filter((item: any) => item.isFile())
      .map((item: any) => ({
        name: item.name,
        type: path?.extname(item.name),
        size: fs.statSync(path.join(fullPath, item.name)).size,
      }));
    return { files, folders };
  }

  async copyFiles(data: ActionFilesDto, accessToken: string) {
    const { destPath, sourcePath, files } = data;
    const cloudFolder = this.configService.get('CLOUD_PATH');

    const resultToken = await this.jwt.verifyAsync(accessToken.split(' ')[1]);
    if (!resultToken) throw new UnauthorizedException('Error');

    files.forEach((item) => {
      const fromPath = path?.join(
        cloudFolder,
        resultToken.id,
        sourcePath,
        item.name,
      );
      const toPath = path?.join(
        cloudFolder,
        resultToken.id,
        destPath,
        item.name,
      );
      try {
        fs.cpSync(fromPath, toPath, { recursive: true });
      } catch (e: any) {
        console.log(e);
        throw new BadRequestException('Copy files error');
      }
    });

    return data;
  }

  async moveFiles(data: ActionFilesDto, accessToken: string) {
    const { destPath, sourcePath, files } = data;
    const cloudFolder = this.configService.get('CLOUD_PATH');

    const resultToken = await this.jwt.verifyAsync(accessToken.split(' ')[1]);
    if (!resultToken) throw new UnauthorizedException('Error');

    files.forEach((item) => {
      const fromPath = path?.join(
        cloudFolder,
        resultToken.id,
        sourcePath,
        item.name,
      );
      const toPath = path?.join(
        cloudFolder,
        resultToken.id,
        destPath,
        item.name,
      );
      try {
        fs.renameSync(fromPath, toPath);
      } catch (e: any) {
        console.log(e);
        throw new BadRequestException('Move files error');
      }
    });

    return data;
  }

  async deleteFiles(data: DeleteFilesDto, accessToken: string) {
    const { path: currentPath, files } = data;
    const cloudFolder = this.configService.get('CLOUD_PATH');

    const resultToken = await this.jwt.verifyAsync(accessToken.split(' ')[1]);
    if (!resultToken) throw new UnauthorizedException('Error');

    files.forEach((item) => {
      const fullPath = path?.join(
        cloudFolder,
        resultToken.id,
        currentPath,
        item.name,
      );
      try {
        if (item.type === 'file') {
          fs.rmSync(fullPath);
        }
        if (item.type === 'folder') {
          fs.rmdirSync(fullPath, { recursive: true });
        }
      } catch (e: any) {
        console.log(e);
        throw new BadRequestException('Move files error');
      }
    });

    return data;
  }

  // async isValidHomeDir(fullPath: string) {
  //   if (!fs.existsSync(fullPath)) {
  //     fs.mkdirSync(fullPath);
  //   }
  // }
}
