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
        password: dto.password ? await hash(dto.password) : undefined,
        timeLive: dto.timeLive,
        filename: dto.filename,
      },
    });
    return { url: newShare.id };
  }

  async findAll(id: string) {
    const shareLinks = await this.prisma.shares.findMany({
      where: {
        userId: id,
      },
      select: {
        password: false,
        filename: true,
        id: true,
        path: true,
        timeLive: true,
        type: true,
      },
    });

    return shareLinks;
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
