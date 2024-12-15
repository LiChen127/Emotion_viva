/**
 * 定义基础设施配置
 */

import { registerAs } from '@nestjs/config';

// 基础设施配置
export const infrastructureConfig = registerAs('infrastructure', () => ({
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27018/emotion_viva',
    options: {}
  },
  // Redis 配置
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseInt(process.env.REDIS_PORT, 10) || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,

  // RabbitMQ 配置
  RABBITMQ_URL: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
  RABBITMQ_EXCHANGES: [
    { name: 'content.exchange', type: 'topic' },
    { name: 'notification.exchange', type: 'direct' },
  ],
  RABBITMQ_QUEUES: [
    { name: 'content.queue' },
    { name: 'notification.queue' },
  ],

  // 其他配置...
}));
