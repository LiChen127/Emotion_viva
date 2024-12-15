import { RedisClient } from '../clients/redis.client';
export declare class CacheRepository {
    private readonly redis;
    constructor(redis: RedisClient);
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T, ttl?: number): Promise<void>;
    delete(key: string): Promise<void>;
    keys(pattern: string): Promise<string[]>;
    clear(pattern: string): Promise<void>;
    getOrSet<T>(key: string, factory: () => Promise<T>, ttl?: number): Promise<T>;
}
