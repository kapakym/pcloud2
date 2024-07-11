import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { Express } from 'express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActionFilesDto, DeleteFilesDto, UploadFileDto } from './dto/file.dto';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Auth()
  @Post()
  async getFiles(@Body() dto: { path: string }, @Req() req: Request) {
    const accessToken = req.headers.authorization;
    return this.filesService.getFiles(dto.path, accessToken);
  }

  @Auth()
  @Post('copy')
  async copyFiles(@Body() dto: ActionFilesDto, @Req() req: Request) {
    const accessToken = req.headers.authorization;
    return this.filesService.copyFiles(dto, accessToken);
  }

  @Auth()
  @Post('move')
  async moveFiles(@Body() dto: ActionFilesDto, @Req() req: Request) {
    const accessToken = req.headers.authorization;
    return this.filesService.moveFiles(dto, accessToken);
  }

  @Auth()
  @Post('delete')
  async deleteFiles(@Body() dto: DeleteFilesDto, @Req() req: Request) {
    const accessToken = req.headers.authorization;
    return this.filesService.deleteFiles(dto, accessToken);
  }

  @Auth()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadFileDto,
    @Req() req: Request,
  ) {
    const accessToken = req.headers.authorization;
    return this.filesService.uploadFile(file, body, accessToken);
  }
}
