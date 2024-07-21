import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { GetPhotoListDto, ScanPhotoDto } from './dto/photo.dto';
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
  @Post('scan')
  scanAll(@Body() dto: ScanPhotoDto, @CurrentUser('id') id: string) {
    return this.photosService.scanAll(dto, id);
  }
}
