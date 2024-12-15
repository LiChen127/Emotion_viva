"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClient = void 0;
const ioredis_1 = require("ioredis");
const logger_service_1 = require("../../logger/logger.service");
class RedisClient extends ioredis_1.default {
    constructor(options) {
        super(options);
        this.logger = new logger_service_1.CustomLoggerService();
        this.on('connect', () => {
            const { log } = this.logger;
            log('Redis is connected successfully', 'redis', {
                dataFrom: 'redis',
                data: {
                    message: 'Redis is connected successfully',
                },
            });
        });
        this.on('error', (error) => {
            const { log } = this.logger;
            log('Redis is not connected', 'redis', {
                dataFrom: 'redis',
                data: {
                    message: 'Redis is not connected',
                    error,
                },
            });
        });
    }
}
exports.RedisClient = RedisClient;
//# sourceMappingURL=redis.client.js.map