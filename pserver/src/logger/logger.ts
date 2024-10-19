import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Логируем метод и URL запроса
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`,
    );

    // // Логируем заголовки запроса (если требуется)
    console.log('Headers:', req.baseUrl, req.body, req.url, res.statusCode);

    // // Логируем тело запроса (если требуется, но осторожно с большими телами)
    // if (req.method !== 'GET') {
    //   console.log('Body:', req.body);
    // }

    // Передаем запрос дальше по цепочке middleware
    next();
  }
}
