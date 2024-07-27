import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as client from 'socket.io-client';

@Injectable()
export class WebsocketPyclientService implements OnModuleInit, OnModuleDestroy {
  socket;

  constructor() {
    // Установите адрес вашего WebSocket сервера
    this.socket = client.io('http://localhost:9999');
  }

  onModuleInit() {
    // Подключение и настройка обработчиков событий
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('message', (data: string) => {
      console.log('Received message:', data);
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
