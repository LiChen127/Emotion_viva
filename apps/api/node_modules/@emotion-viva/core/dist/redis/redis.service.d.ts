export declare class RedisService {
    private redisClient;
    constructor();
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<'OK' | null>;
}
