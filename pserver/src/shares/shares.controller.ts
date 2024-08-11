import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import {
  CreateShareDto,
  DeleteShareDto,
  GetFilesShareLinkDto,
  UpdateShareDto,
} from './dto/share.dto';
import { SharesService } from './shares.service';
import { ShareLinkToken } from 'src/auth/decorators/shareLinkToken.decorator';

@Controller('share')
export class SharesController {
  constructor(private readonly sharesService: SharesService) {}

  @Auth()
  @Post('create')
  create(
    @Body() createShareDto: CreateShareDto,
    @CurrentUser('id') id: string,
  ) {
    return this.sharesService.create(createShareDto, id);
  }

  @Auth()
  @Get()
  findAll(@CurrentUser('id') id: string) {
    return this.sharesService.findAll(id);
  }

  @Post('files')
  getFiles(
    @Body() dto: GetFilesShareLinkDto,
    @ShareLinkToken() shareToken: string,
  ) {
    return this.sharesService.getFiles(dto, shareToken);
  }

  @Auth()
  @Delete()
  delete(@Body() dto: DeleteShareDto) {
    return this.sharesService.delete(dto);
  }

  @Auth()
  @Put()
  update(@Body() dto: UpdateShareDto) {
    return this.sharesService.update(dto);
  }
}
