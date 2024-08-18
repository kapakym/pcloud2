import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ActivateUserDto, GetUserListDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Post('list')
  @Roles('user', 'admin')
  async getFiles(@Body() dto: GetUserListDto) {
    return this.userService.getUsers(dto);
  }

  @Auth()
  @Post('active')
  @Roles('user', 'admin')
  async setActive(@Body() dto: ActivateUserDto) {
    return this.userService.setActiveUser(dto);
  }
}
