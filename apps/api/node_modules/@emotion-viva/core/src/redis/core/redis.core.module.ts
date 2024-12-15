import { Module } from '@nestjs/common';
import { RedisClient } from '../clients/redis.client';
import { CustomLoggerService } from '../../logger/logger.service';

@Module({
  providers: [
    CustomLoggerService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: (logger: CustomLoggerService) => {
        return new RedisClient(
          {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT, 10),
            retryStrategy: (times) => Math.min(times * 50, 2000),
            maxRetriesPerRequest: 3,
          },
          logger, // 注入 Logger
        );
      },
      inject: [CustomLoggerService], // 通过 NestJS 注入 CustomLoggerService
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisCoreModule { }
