import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/jwt.config';
import { PrismaService } from 'src/prisma.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { TasksService } from 'src/tasks/tasks.service';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
  imports: [
    HttpModule,
    TasksModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService, PrismaService, TasksService],
})
export class MediaModule {}
