"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheRepository = void 0;
const common_1 = require("@nestjs/common");
const redis_client_1 = require("../clients/redis.client");
let CacheRepository = class CacheRepository {
    constructor(redis) {
        this.redis = redis;
    }
    async get(key) {
        const data = await this.redis.get(key);
        return data ? JSON.parse(data) : null;
    }
    async set(key, value, ttl) {
        const serializedValue = JSON.stringify(value);
        if (ttl) {
            await this.redis.set(key, serializedValue, 'EX', ttl);
        }
        else {
            await this.redis.set(key, serializedValue);
        }
    }
    async delete(key) {
        await this.redis.del(key);
    }
    async keys(pattern) {
        return this.redis.keys(pattern);
    }
    async clear(pattern) {
        const keys = await this.keys(pattern);
        if (keys.length > 0) {
            await this.redis.del(...keys);
        }
    }
    async getOrSet(key, factory, ttl) {
        const cached = await this.get(key);
        if (cached)
            return cached;
        const value = await factory();
        await this.set(key, value, ttl);
        return value;
    }
};
exports.CacheRepository = CacheRepository;
exports.CacheRepository = CacheRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [redis_client_1.RedisClient])
], CacheRepository);
//# sourceMappingURL=cache.repository.js.map