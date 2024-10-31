import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import config from './config/config';
import { FilesModule } from './files/files.module';
import { LoggerMiddleware } from './logger/logger';
import { MediaModule } from './media/media.module';
import { SharesModule } from './shares/shares.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config], // Загрузка пользовательского файла конфигурации
      isGlobal: true, // Делает ConfigModule глобальным для всего приложения
    }),
    AuthModule,
    UserModule,
    FilesModule,
    MediaModule,
    SharesModule,
    MailModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) // Применяем middleware
      .forRoutes('*'); // Логируем все маршруты
  }
}
