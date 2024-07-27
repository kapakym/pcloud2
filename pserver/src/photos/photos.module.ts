import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/jwt.config';
import { PrismaService } from 'src/prisma.service';
import { TasksService } from 'src/tasks/tasks.service';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { TasksGateway } from 'src/tasks/tasks.gateway';
import { WebsocketPyclientService } from 'src/websocket-pyclient/websocket-pyclient.service';

@Module({
  imports: [
    TasksModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [PhotosController],
  providers: [
    PhotosService,
    PrismaService,
    TasksService,
    TasksGateway,
    WebsocketPyclientService,
  ],
})
export class PhotosModule {}
