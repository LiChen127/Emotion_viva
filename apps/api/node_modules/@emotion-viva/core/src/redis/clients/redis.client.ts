/**
 * 定义 Redis 客户端
 */

import Redis, { RedisOptions } from 'ioredis';
import { CustomLoggerService } from '../../logger/logger.service';

export class RedisClient extends Redis {
  private readonly logger = new CustomLoggerService();

  constructor(options: RedisOptions) {
    super(options);

    this.on('connect', () => {
      const { log } = this.logger;
      log('Redis is connected successfully', 'redis', {
        dataFrom: 'redis',
        data: {
          message: 'Redis is connected successfully',
        },
      });
    });

    this.on('error', (error) => {
      const { log } = this.logger;
      log('Redis is not connected', 'redis', {
        dataFrom: 'redis',
        data: {
          message: 'Redis is not connected',
          error,
        },
      });
    });
  }
}
