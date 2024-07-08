import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActionFilesDto, DeleteFilesDto } from './dto/file.dto';
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
}
