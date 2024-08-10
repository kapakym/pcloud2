import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import {
  CreateShareDto,
  DeleteShareDto,
  UpdateShareDto,
} from './dto/share.dto';
import { SharesService } from './shares.service';

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

  @Delete()
  delete(@Body() dto: DeleteShareDto) {
    return this.sharesService.delete(dto);
  }

  @Put()
  update(@Body() dto: UpdateShareDto) {
    return this.sharesService.update(dto);
  }
}
