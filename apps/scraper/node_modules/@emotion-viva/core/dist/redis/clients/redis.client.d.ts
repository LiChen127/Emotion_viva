import Redis, { RedisOptions } from 'ioredis';
export declare class RedisClient extends Redis {
    private readonly logger;
    constructor(options: RedisOptions);
}
