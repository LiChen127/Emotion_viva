import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
  imports: [],
  providers: [
    {
      provide: RedisService,
      useFactory: () => {
        return new RedisService();
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule { }
