import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CreateShareDto } from './dto/share.dto';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'argon2';

@Injectable()
export class SharesService {
  cloudFolder = null;
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {
    this.cloudFolder = this.configService.get('CLOUD_PATH');
  }

  async create(dto: CreateShareDto, id: string) {
    if (!id) throw new UnauthorizedException('Error');

    const newShare = await this.prisma.shares.create({
      data: {
        userId: id,
        path: dto.path,
        type: dto.type,
        password: await hash(dto.password),
        timeLive: dto.timeLive,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...response } = newShare;
    return response;
  }

  findAll() {
    return `This action returns all shares`;
  }

  findOne(id: number) {
    return `This action returns a #${id} share`;
  }

  // update(id: number, updateShareDto: UpdateShareDto) {
  // return `This action updates a #${id} share`;
  // }

  remove(id: number) {
    return `This action removes a #${id} share`;
  }
}
