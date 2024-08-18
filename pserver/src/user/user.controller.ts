import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ActivateUserDto, DeleteUserDto, GetUserListDto } from './dto/user.dto';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

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
}
