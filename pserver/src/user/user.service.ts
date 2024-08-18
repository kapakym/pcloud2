import { Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { ActivateUserDto, GetUserListDto, UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(dto: AuthDto) {
    const user = {
      email: dto.email,
      name: '',
      roles: $Enums.Roles.user,
      password: await hash(dto.password),
      active: false,
    };

    return this.prisma.user.create({ data: user });
  }

  async update(id: string, dto: UserDto) {
    let data = dto;

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    return this.prisma.user.update({ where: { id }, data });
  }

  async getUsers(dto: GetUserListDto) {
    const users = await this.prisma.user.findMany({
      skip: dto.offset,
      take: dto.limit,
      select: {
        active: true,
        email: true,
        id: true,
        roles: true,
      },
    });
    const count = await this.prisma.user.count();
    console.log(count);
    return {
      limit: dto.limit,
      offset: dto.offset,
      users,
      count,
    };
  }

  async setActiveUser(dto: ActivateUserDto) {
    try {
      await this.prisma.user.update({
        where: { id: dto.id },
        data: { active: dto.active },
      });
      return true;
    } catch {
      return false;
    }
  }
}
