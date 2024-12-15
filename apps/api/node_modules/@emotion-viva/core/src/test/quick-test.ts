import { NestFactory } from '@nestjs/core';
import { CoreModule } from '../core.module';
import { RedisService } from '../redis/redis.service';

async function bootstrap() {
  try {
    const app = await NestFactory.create(CoreModule);

    // 测试 Redis
    const redis = app.get(RedisService);
    await redis.set('test:key', 'hello');
    const value = await redis.get('test:key');
    console.log('Redis Test:', value === 'hello' ? 'PASS' : 'FAIL');

    // 测试其他服务...

    await app.close();
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

bootstrap(); 