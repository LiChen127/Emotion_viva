"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCoreModule = void 0;
const common_1 = require("@nestjs/common");
const redis_client_1 = require("../clients/redis.client");
const logger_service_1 = require("../../logger/logger.service");
let RedisCoreModule = class RedisCoreModule {
};
exports.RedisCoreModule = RedisCoreModule;
exports.RedisCoreModule = RedisCoreModule = __decorate([
    (0, common_1.Module)({
        providers: [
            logger_service_1.CustomLoggerService,
            {
                provide: 'REDIS_CLIENT',
                useFactory: (logger) => {
                    return new redis_client_1.RedisClient({
                        host: process.env.REDIS_HOST,
                        port: parseInt(process.env.REDIS_PORT, 10),
                        retryStrategy: (times) => Math.min(times * 50, 2000),
                        maxRetriesPerRequest: 3,
                    }, logger);
                },
                inject: [logger_service_1.CustomLoggerService],
            },
        ],
        exports: ['REDIS_CLIENT'],
    })
], RedisCoreModule);
//# sourceMappingURL=redis.core.module.js.map