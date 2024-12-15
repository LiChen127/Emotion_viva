/**
 * 定义 RabbitMQ 消息发送和接收的仓库
 */

import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MessageRepository {
  constructor(
    @Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy,
  ) { }

  async publish<T>(pattern: string, data: T): Promise<void> {
    await lastValueFrom(this.client.emit(pattern, data));
  }

  async send<T, R>(pattern: string, data: T): Promise<R> {
    return lastValueFrom(this.client.send(pattern, data));
  }
}
