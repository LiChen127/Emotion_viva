"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClient = void 0;
const ioredis_1 = require("ioredis");
class RedisClient extends ioredis_1.default {
    constructor(options, logger) {
        super(options);
        this.logger = logger;
        this.on('connect', () => {
            this.logger.log('Redis is connected successfully', 'redis');
        });
        this.on('error', (error) => {
            this.logger.error('Redis connection error', error.stack, 'redis');
        });
    }
}
exports.RedisClient = RedisClient;
//# sourceMappingURL=redis.client.js.map