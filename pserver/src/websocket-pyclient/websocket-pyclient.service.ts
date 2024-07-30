import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as client from 'socket.io-client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WebsocketPyclientService implements OnModuleInit, OnModuleDestroy {
  socket;

  constructor(private prisma: PrismaService) {
    // Установите адрес вашего WebSocket сервера
    this.socket = client.io('http://localhost:9999');
  }

  onModuleInit() {
    // Подключение и настройка обработчиков событий
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('message', async (data: string) => {
      //   console.log('Received message:', data);
      const jsonData = JSON.parse(data);
      console.log(jsonData);

      if (jsonData['type'] === 'find_faces') {
        // Scan faces
        const isExistImage = await this.prisma.faces.findMany({
          where: {
            photosId: jsonData.uuid,
          },
        });
        if (isExistImage.length) return;
        for (const element of jsonData.faces) {
          await this.prisma.faces.create({
            data: {
              path: element.filename,
              photosId: jsonData.uuid,
              left: element.position.left,
              right: element.position.right,
              top: element.position.top,
              bottom: element.position.bottom,
            },
          });
        }
      }
    });

    // Пример отправки сообщения на сервер
    this.socket.emit('message', 'Hello from NestJS client');
  }

  onModuleDestroy() {
    // Отключение от WebSocket сервера
    if (this.socket) {
      this.socket.disconnect();
      console.log('Disconnected from WebSocket server');
    }
  }
}
