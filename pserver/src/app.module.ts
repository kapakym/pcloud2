import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FilesModule } from './files/files.module';
import { PhotosModule } from './photos/photos.module';
import { TasksModule } from './tasks/tasks.module';
import { WebsocketPyclientService } from './websocket-pyclient/websocket-pyclient.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    FilesModule,
    PhotosModule,
    TasksModule,
  ],
  providers: [],
})
export class AppModule {}
