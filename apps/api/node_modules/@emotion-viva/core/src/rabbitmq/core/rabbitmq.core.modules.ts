/**
 * 定义 RabbitMQ 核心模块
 */

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUEUE_CONFIG } from '../config/rabbitmq.config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_CLIENT',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBITMQ_URI],
            queue: QUEUE_CONFIG.mainQueue.name,
            queueOptions: QUEUE_CONFIG.mainQueue.options,
            noAck: false,
          },
        }),
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RabbitMQCoreModule { }
