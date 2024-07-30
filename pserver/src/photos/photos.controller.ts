import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import {
  GetPhotoByIdtDto,
  GetPhotoListDto,
  ScanPhotoDto,
  TaskIdDto,
} from './dto/photo.dto';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Auth()
  @Post('get')
  findLimit(@Body() dto: GetPhotoListDto, @CurrentUser('id') id: string) {
    return this.photosService.findLimit(dto, id);
  }

  @Auth()
  @Post('getById')
  findById(
    @Body() dto: GetPhotoByIdtDto,
    @CurrentUser('id') id: string,
    @Res() res: Response,
  ) {
    return this.photosService.findById(dto, id, res);
  }

  @Auth()
  @Post('scan')
  scanAll(@Body() dto: ScanPhotoDto, @CurrentUser('id') id: string) {
    return this.photosService.scanAll(dto, id);
  }

  @Auth()
  @Post('scan_faces')
  detectFaces(@Body() dto: TaskIdDto, @CurrentUser('id') id: string) {
    return this.photosService.scanFaces(dto, id);
  }

  @Auth()
  @Post('update_clusters')
  updateClusters(@Body() dto: TaskIdDto, @CurrentUser('id') id: string) {
    return this.photosService.updateClusters(dto, id);
  }
}
