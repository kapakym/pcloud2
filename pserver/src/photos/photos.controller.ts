import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import {
  DetectFaceDto,
  GetPhotoByIdtDto,
  GetPhotoListDto,
  ScanPhotoDto,
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
  @Post('detect')
  detectFaces(@Body() dto: DetectFaceDto, @CurrentUser('id') id: string) {
    return this.photosService.detectFaces(dto, id);
  }
}
