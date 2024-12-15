import Redis, { RedisOptions } from 'ioredis';
import { CustomLoggerService } from '../../logger/logger.service';

export class RedisClient extends Redis {
  constructor(
    options: RedisOptions,
    private readonly logger: CustomLoggerService // 通过依赖注入获取
  ) {
    super(options);

    this.on('connect', () => {
      this.logger.log('Redis is connected successfully', 'redis');
    });

    this.on('error', (error) => {
      this.logger.error('Redis connection error', error.stack, 'redis');
    });
  }
}
