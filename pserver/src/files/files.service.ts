import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  constructor(
    private configService: ConfigService,
    private jwt: JwtService,
  ) {}

  async getFiles(currentPath: string, accessToken: string) {
    console.log('tets');
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

  async deleteFolder() {}

  // async isValidHomeDir(fullPath: string) {
  //   if (!fs.existsSync(fullPath)) {
  //     fs.mkdirSync(fullPath);
  //   }
  // }
}
