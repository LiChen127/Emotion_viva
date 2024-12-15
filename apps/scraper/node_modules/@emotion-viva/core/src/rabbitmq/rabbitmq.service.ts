import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor(private readonly configService: ConfigService) { }

  async initializeConnection() {
    try {
      const url = this.configService.get<string>('RABBITMQ_URI');
      this.connection = await amqp.connect(url);
      this.channel = await this.connection.createChannel();
      console.log('RabbitMQ 连接创建成功');
    } catch (error) {
      console.error('RabbitMQ 连接创建失败:', error);
      throw error;
    }
  }

  async getChannel(): Promise<amqp.Channel> {
    if (!this.channel) {
      await this.initializeConnection();
    }
    return this.channel;
  }

  async assertExchange(name: string, type: string) {
    const channel = await this.getChannel();
    await channel.assertExchange(name, type, { durable: true });
  }

  async assertQueue(name: string) {
    const channel = await this.getChannel();
    await channel.assertQueue(name, { durable: true });
  }

  async closeConnection() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }
}
