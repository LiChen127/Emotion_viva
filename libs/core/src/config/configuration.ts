/**
 * 配置文件
 */

import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  mysql: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
}));

export const cacheConfig = registerAs('cache', () => ({
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB, 10) || 0,
  },
}));

export const queueConfig = registerAs('queue', () => ({
  rabbitmq: {
    uri: process.env.RABBITMQ_URI,
    queues: {
      main: 'main_queue',
      scraper: 'scraper_queue',
    },
  },
}));
