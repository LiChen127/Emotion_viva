import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class CacheRepository {
  private readonly redis: Redis;

  constructor(private readonly configService: ConfigService) {
    this.redis = new Redis({
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT'),
      password: this.configService.get('REDIS_PASSWORD'),
    });
  }

  // String 操作
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

  // Hash 操作
  async hset(key: string, field: string, value: any): Promise<void> {
    await this.redis.hset(key, field, JSON.stringify(value));
  }

  async hsetObject(key: string, obj: Record<string, any>): Promise<void> {
    const serializedObj = Object.entries(obj).reduce((acc, [field, value]) => {
      acc[field] = JSON.stringify(value);
      return acc;
    }, {});
    await this.redis.hset(key, serializedObj);
  }

  async hget<T>(key: string, field: string): Promise<T | null> {
    const value = await this.redis.hget(key, field);
    return value ? JSON.parse(value) : null;
  }

  async hgetall<T>(key: string): Promise<Record<string, T> | null> {
    const obj = await this.redis.hgetall(key);
    if (!Object.keys(obj).length) return null;
    return Object.entries(obj).reduce((acc, [field, value]) => {
      acc[field] = JSON.parse(value);
      return acc;
    }, {});
  }

  // List 操作
  async lpush(key: string, ...values: any[]): Promise<void> {
    const serializedValues = values.map(v => JSON.stringify(v));
    await this.redis.lpush(key, ...serializedValues);
  }

  async rpush(key: string, ...values: any[]): Promise<void> {
    const serializedValues = values.map(v => JSON.stringify(v));
    await this.redis.rpush(key, ...serializedValues);
  }

  async lrange<T>(key: string, start: number, stop: number): Promise<T[]> {
    const values = await this.redis.lrange(key, start, stop);
    return values.map(v => JSON.parse(v));
  }

  // 通用操作
  async delete(...keys: string[]): Promise<void> {
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }

  async keys(pattern: string): Promise<string[]> {
    return this.redis.keys(pattern);
  }

  async clear(pattern: string): Promise<void> {
    const keys = await this.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }

  async getClient(): Promise<Redis> {
    return this.redis;
  }

  async ping(): Promise<string> {
    return await this.redis.ping();
  }

  async getOrSet<T>(key: string, factory: () => Promise<T>, ttl?: number): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached) return cached;

    const value = await factory();
    await this.set(key, value, ttl);
    return value;
  }
}
