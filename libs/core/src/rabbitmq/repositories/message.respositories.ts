/**
 * 定义 RabbitMQ 消息发送和接收的仓库
 */

import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RabbitMQService } from '../rabbitmq.service';

@Injectable()
export class MessageRepository {
  constructor(
    @Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy,
    private readonly rabbitmqService: RabbitMQService
  ) { }

  async publish<T>(pattern: string, data: T): Promise<void> {
    await lastValueFrom(this.client.emit(pattern, data));
  }

  async send<T, R>(pattern: string, data: T): Promise<R> {
    return lastValueFrom(this.client.send(pattern, data));
  }

  async close(): Promise<void> {
    await this.client.close();
  }

  async emit<T>(pattern: string, data: T): Promise<void> {
    await lastValueFrom(this.client.emit(pattern, data));
  }

  subscribe(pattern: string, callback: (data: any) => void): void {
    // 实现订阅逻辑
    this.rabbitmqService.subscribe(pattern, callback);
  }
}
