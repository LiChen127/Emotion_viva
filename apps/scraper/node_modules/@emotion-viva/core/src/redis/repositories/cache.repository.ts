/**
 * 定义 Redis 缓存仓库，定义缓存操作API
 */

import { Injectable, Inject } from '@nestjs/common';
import { RedisClient } from '../clients/redis.client';

@Injectable()
export class CacheRepository {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: RedisClient) { }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const serializedValue = JSON.stringify(value);
    if (ttl) {
      await this.redis.set(key, serializedValue, 'EX', ttl);
    } else {
      await this.redis.set(key, serializedValue);
    }
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }

  // 添加高级缓存方法
  async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttl?: number,
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached) return cached;

    const value = await factory();
    await this.set(key, value, ttl);
    return value;
  }
}
