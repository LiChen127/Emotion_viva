import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '../rabbitmq.service';

@Injectable()
export class MessageRepository {
  constructor(private readonly rabbitmqService: RabbitMQService) { }

  async publish<T>(pattern: string, data: T): Promise<void> {
    const channel = await this.rabbitmqService.getChannel();
    const exchange = 'content.exchange'; // 使用配置中定义的交换机

    channel.publish(
      exchange,
      pattern,
      Buffer.from(JSON.stringify(data)),
      { persistent: true }
    );
  }

  async subscribe<T>(pattern: string, callback: (data: T) => void): Promise<void> {
    const channel = await this.rabbitmqService.getChannel();
    const queue = 'content.queue'; // 使用配置中定义的队列

    await channel.assertQueue(queue);
    await channel.bindQueue(queue, 'content.exchange', pattern);

    channel.consume(queue, (msg) => {
      if (msg) {
        const content = JSON.parse(msg.content.toString()) as T;
        callback(content);
        channel.ack(msg);
      }
    });
  }
} 