import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { PhotosModule } from './photos/photos.module';
import { UserModule } from './user/user.module';
import { SharesModule } from './shares/shares.module';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config], // Загрузка пользовательского файла конфигурации
      isGlobal: true, // Делает ConfigModule глобальным для всего приложения
    }),
    AuthModule,
    UserModule,
    FilesModule,
    PhotosModule,
    SharesModule,
  ],
  providers: [],
})
export class AppModule {}
