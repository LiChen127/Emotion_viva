/**
 * 定义 Redis 核心模块
 */

import { Module } from '@nestjs/common';
import { RedisClient } from '../clients/redis.client';

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new RedisClient({
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT, 10),
          retryStrategy: (times) => Math.min(times * 50, 2000),
          maxRetriesPerRequest: 3,
        });
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisCoreModule { }
