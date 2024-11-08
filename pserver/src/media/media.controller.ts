import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import {
  GetPeoplesListDto,
  GetMediaByIdtDto,
  GetMediaListDto,
  ScanMediaDto,
  TaskIdDto,
} from './dto/media.dto';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly photosService: MediaService) {}

  @Auth()
  @Get('play/:id')
  playById(
    @Param('id') idVideo: string,
    @CurrentUser('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return this.photosService.playById(idVideo, id, req, res);
  }

  @Auth()
  @Get('play/:id')
  showById(
    @Param('id') idVideo: string,
    @CurrentUser('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return this.photosService.playById(idVideo, id, req, res);
  }

  @Auth()
  @Post('get')
  findLimit(@Body() dto: GetMediaListDto, @CurrentUser('id') id: string) {
    return this.photosService.findLimit(dto, id);
  }

  @Auth()
  @Post('clear_cluster')
  clearCluster(@CurrentUser('id') id: string) {
    return this.photosService.clearCluster(id);
  }

  @Auth()
  @Post('clear_media')
  clearMedia(@CurrentUser('id') id: string) {
    return this.photosService.clearMedia(id);
  }

  @Auth()
  @Post('clear_faces')
  clearFaces(@CurrentUser('id') id: string) {
    return this.photosService.clearFaces(id);
  }

  @Auth()
  @Post('get_by_id')
  findById(
    @Body() dto: GetMediaByIdtDto,
    @CurrentUser('id') id: string,
    @Res() res: Response,
  ) {
    return this.photosService.findById(dto, id, res);
  }

  @Auth()
  @Post('get_thumb_by_id')
  findThumbById(
    @Body() dto: GetMediaByIdtDto,
    @CurrentUser('id') id: string,
    @Res() res: Response,
  ) {
    return this.photosService.findThumbById(dto, id, res);
  }

  @Auth()
  @Post('get_face_by_id')
  findFaceById(
    @Body() dto: GetMediaByIdtDto,
    @CurrentUser('id') id: string,
    @Res() res: Response,
  ) {
    return this.photosService.findFaceById(dto, id, res);
  }

  @Auth()
  @Post('scan')
  scanAll(@Body() dto: ScanMediaDto, @CurrentUser('id') id: string) {
    // Фоновая задача
    this.photosService.scanAll(dto, id);
    return { message: 'taskStarted' };
  }

  @Auth()
  @Post('scan_faces')
  detectFaces(@Body() dto: TaskIdDto, @CurrentUser('id') id: string) {
    // Фоновая задача
    this.photosService.scanFaces(dto, id);
    return { message: 'taskStarted' };
  }

  @Auth()
  @Post('scan_text')
  scanText(@Body() dto: TaskIdDto, @CurrentUser('id') id: string) {
    // Фоновая задача
    this.photosService.recogText(dto, id);
    return { message: 'taskStarted' };
  }

  @Auth()
  @Post('update_clusters')
  updateClusters(@Body() dto: TaskIdDto, @CurrentUser('id') id: string) {
    // Фоновая задача
    this.photosService.updateClusters(dto, id);
    return { message: 'taskStarted' };
  }

  @Auth()
  @Post('peoples')
  getFaces(@Body() dto: GetPeoplesListDto, @CurrentUser('id') id: string) {
    return this.photosService.getPeoples(dto, id);
  }
}
