import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { CreateShareDto } from './dto/share.dto';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sharesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateShareDto: UpdateShareDto) {
  // return this.sharesService.update(+id, updateShareDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sharesService.remove(+id);
  }
}
