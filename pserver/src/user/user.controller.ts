import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import {
  ActivateUserDto,
  DeleteUserDto,
  GetUserListDto,
  UpdateUserDto,
} from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Post('list')
  @Roles('user', 'admin')
  async getUsers(@Body() dto: GetUserListDto) {
    return this.userService.getUsers(dto);
  }

  @Auth()
  @Post('active')
  @Roles('admin')
  async setActive(
    @Body() dto: ActivateUserDto,
    @CurrentUser('id') idUser: string,
  ) {
    return this.userService.setActiveUser(dto, idUser);
  }

  @Auth()
  @Post('delete')
  @Roles('admin')
  async deleteUser(
    @Body() dto: DeleteUserDto,
    @CurrentUser('id') idUser: string,
  ) {
    return this.userService.deleteUser(dto, idUser);
  }

  @Auth()
  @Get('profile')
  async getProfile(@CurrentUser('id') idUser: string) {
    return this.userService.getUserProfile(idUser);
  }

  @Auth()
  @Put('profile')
  async updateProfile(
    @Body() dto: UpdateUserDto,
    @CurrentUser('id') idUser: string,
  ) {
    return this.userService.updateProfile(dto, idUser);
  }
}
