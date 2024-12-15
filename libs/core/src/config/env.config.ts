/**
 * 定义基础设施配置
 */

import { registerAs } from '@nestjs/config';

// 基础设施配置
export const infrastructureConfig = registerAs('infrastructure', () => ({
  // MySQL配置
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306', 10),
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root',
    database: process.env.MYSQL_DATABASE || 'emotion_viva',
    // 可以添加连接池等高级配置
    pool: {
      max: parseInt(process.env.MYSQL_POOL_MAX || '10', 10),
    },
  },

  // MongoDB配置
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/emotion_viva',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: parseInt(process.env.MONGODB_POOL_SIZE || '10', 10),
    },
  },

  // Redis配置
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB || '0', 10),
    // 集群配置
    cluster:
      process.env.REDIS_CLUSTER === 'true'
        ? {
          nodes: (process.env.REDIS_NODES || '').split(','),
        }
        : undefined,
  },

  // RabbitMQ配置
  rabbitmq: {
    uri: process.env.RABBITMQ_URI || 'amqp://localhost:5672',
    // 队列配置
    queues: {
      main: {
        name: process.env.RABBITMQ_MAIN_QUEUE || 'main_queue',
        options: {
          durable: true,
          deadLetterExchange: 'dlx',
        },
      },
      scraper: {
        name: process.env.RABBITMQ_SCRAPER_QUEUE || 'scraper_queue',
        options: {
          durable: true,
          deadLetterExchange: 'dlx',
        },
      },
    },
  },
}));
