import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import 'multer';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import {
  ActionFilesDto,
  DeleteFilesDto,
  DownloadFilesDto,
  RenameFileDto,
  UploadFileDto,
} from './dto/file.dto';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Auth()
  @Post()
  async getFiles(@Body() dto: { path: string }, @CurrentUser('id') id: string) {
    return this.filesService.getFiles(dto.path, id);
  }

  @Auth()
  @Post('copy')
  async copyFiles(@Body() dto: ActionFilesDto, @CurrentUser('id') id: string) {
    return this.filesService.copyFiles(dto, id);
  }

  @Auth()
  @Post('move')
  async moveFiles(@Body() dto: ActionFilesDto, @CurrentUser('id') id: string) {
    return this.filesService.moveFiles(dto, id);
  }

  @Auth()
  @Post('rename')
  async renameFiles(@Body() dto: RenameFileDto, @CurrentUser('id') id: string) {
    return this.filesService.renameFile(dto, id);
  }

  @Auth()
  @Post('delete')
  async deleteFiles(
    @Body() dto: DeleteFilesDto,
    @CurrentUser('id') id: string,
  ) {
    return this.filesService.deleteFiles(dto, id);
  }

  @Auth()
  @Post('download')
  async downloadFile(
    @Body() dto: DownloadFilesDto,
    @CurrentUser('id') id: string,
    @Res() res: Response,
  ) {
    return this.filesService.downloadFile(dto, id, res);
  }

  @Auth()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadFileDto,
    @CurrentUser('id') id: string,
  ) {
    return this.filesService.uploadFile(file, body, id);
  }
}
