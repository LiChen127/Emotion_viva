import Redis, { RedisOptions } from 'ioredis';
import { CustomLoggerService } from '../../logger/logger.service';
export declare class RedisClient extends Redis {
    private readonly logger;
    constructor(options: RedisOptions, logger: CustomLoggerService);
}
