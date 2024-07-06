import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Auth()
  @Post()
  async getFiles(@Body() dto: { path: string }, @Req() req: Request) {
    const accessToken = req.headers.authorization;
    return this.filesService.getFiles(dto.path, accessToken);
  }
}
