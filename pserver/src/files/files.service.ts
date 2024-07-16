import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as fs from 'fs';
import 'multer';
import * as path from 'path';
import {
  ActionFilesDto,
  DeleteFilesDto,
  RenameFileDto,
  UploadFileDto,
} from './dto/file.dto';
import { IResponseFileActions } from './types/files.types';
// import { response } from 'express';

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
    const response = [];
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
        if (!fs.existsSync(toPath)) {
          fs.cpSync(fromPath, toPath, { recursive: true });
          response.push({ filename: fromPath, status: 'success' });
        } else {
          response.push({
            filename: fromPath,
            status: 'error',
            detail: 'is exist',
          });
        }
      } catch (e: any) {
        response.push({
          filename: fromPath,
          status: 'error',
          description: e?.message,
        });
      }
    });

    return response;
  }

  async moveFiles(data: ActionFilesDto, accessToken: string) {
    const { destPath, sourcePath, files } = data;
    const cloudFolder = this.configService.get('CLOUD_PATH');

    const resultToken = await this.jwt.verifyAsync(accessToken.split(' ')[1]);
    if (!resultToken) throw new UnauthorizedException('Error');
    const response = [];
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
        if (!fs.existsSync(toPath)) {
          fs.renameSync(fromPath, toPath);
          response.push({ filename: fromPath, status: 'success' });
        } else {
          response.push({
            filename: fromPath,
            status: 'error',
            detail: 'is exist',
          });
        }
      } catch (e: any) {
        response.push({
          filename: fromPath,
          status: 'error',
          description: e?.message,
        });
      }
    });

    return response;
  }

  async renameFile(data: RenameFileDto, accessToken: string) {
    const { newName, sourcePath, file } = data;
    const cloudFolder = this.configService.get('CLOUD_PATH');

    const resultToken = await this.jwt.verifyAsync(accessToken.split(' ')[1]);
    if (!resultToken) throw new UnauthorizedException('Error');
    const response = [];
    const fromPath = path?.join(
      cloudFolder,
      resultToken.id,
      sourcePath,
      file.name,
    );
    const toPath = path?.join(cloudFolder, resultToken.id, sourcePath, newName);

    try {
      if (!fs.existsSync(toPath)) {
        fs.renameSync(fromPath, toPath);
        response.push({ filename: fromPath, status: 'success' });
      } else {
        response.push({
          filename: fromPath,
          status: 'error',
          detail: 'is exist',
        });
      }
    } catch (e: any) {
      response.push({
        filename: fromPath,
        status: 'error',
        description: e?.message,
      });
    }

    return response;
  }

  async deleteFiles(data: DeleteFilesDto, accessToken: string) {
    const { path: currentPath, files } = data;
    const cloudFolder = this.configService.get('CLOUD_PATH');

    const resultToken = await this.jwt.verifyAsync(accessToken.split(' ')[1]);
    if (!resultToken) throw new UnauthorizedException('Error');
    const response: IResponseFileActions[] = [];
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
          response.push({ filename: fullPath, status: 'success' });
        }
        if (item.type === 'folder') {
          fs.rmdirSync(fullPath, { recursive: true });
          response.push({ filename: fullPath, status: 'success' });
        }
      } catch (e: any) {
        response.push({
          filename: fullPath,
          status: 'error',
          description: e.message,
        });
      }
    });
    return response;
  }

  async uploadFile(
    file: Express.Multer.File,
    body: UploadFileDto,
    accessToken: string,
  ) {
    const cloudFolder = this.configService.get('CLOUD_PATH');

    const resultToken = await this.jwt.verifyAsync(accessToken.split(' ')[1]);
    if (!resultToken) throw new UnauthorizedException('Error');
    const toPath = path?.join(
      cloudFolder,
      resultToken.id,
      body.path,
      decodeURI(body.filename),
    );

    if (fs.existsSync(toPath)) {
      return { uuid: body.uuid, status: 'error', detail: 'is exist' };
    }

    await fs.promises.writeFile(toPath, file.buffer);
    return { uuid: body.uuid, status: 'success' };
  }

  // async isValidHomeDir(fullPath: string) {
  //   if (!fs.existsSync(fullPath)) {
  //     fs.mkdirSync(fullPath);
  //   }
  // }
}
