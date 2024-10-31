// mail.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  user = '';
  password = '';
  host = '';
  port = null;

  constructor(private configService: ConfigService) {
    this.user = this.configService.get('MAIL_USER');
    this.password = this.configService.get('MAIL_PASSWORD');
    this.host = this.configService.get('MAIL_HOST');
    this.port = this.configService.get('MAIL_PORT');
    if (this.password && this.user && this.host) {
      this.transporter = nodemailer.createTransport({
        host: this.host, // SMTP сервер Mail.ru
        port: this.port, // Порт для SSL
        secure: true, // Использовать SSL
        auth: {
          user: this.user, // Ваш email на Mail.ru
          pass: this.password, // Пароль от вашей почты
        },
      });
    }
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    if (!this.transporter) return;
    const mailOptions = {
      from: 'mycop14@mail.ru', // Отправитель
      to, // Кому отправляем
      subject, // Тема письма
      text, // Текстовое содержимое
      html, // HTML-содержимое, если нужно
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error occurred while sending email:', error);
      throw error;
    }
  }
}
