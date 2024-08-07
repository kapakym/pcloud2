import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { PhotosModule } from './photos/photos.module';
import { UserModule } from './user/user.module';
import { SharesModule } from './shares/shares.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    FilesModule,
    PhotosModule,
    SharesModule,
  ],
  providers: [],
})
export class AppModule {}
