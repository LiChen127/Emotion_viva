import { Module } from '@nestjs/common';
import { RedisCoreModule } from './core/redis.core.module';
import { CacheRepository } from './repositories/cache.repository';

@Module({
  imports: [RedisCoreModule],
  providers: [CacheRepository],
  exports: [CacheRepository],
})
export class RedisModule { }
