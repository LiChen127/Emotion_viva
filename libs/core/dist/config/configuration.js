"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueConfig = exports.cacheConfig = exports.databaseConfig = void 0;
const config_1 = require("@nestjs/config");
exports.databaseConfig = (0, config_1.registerAs)('database', () => ({
    mysql: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    mongodb: {
        uri: process.env.MONGODB_URI,
    },
}));
exports.cacheConfig = (0, config_1.registerAs)('cache', () => ({
    redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
        password: process.env.REDIS_PASSWORD,
        db: parseInt(process.env.REDIS_DB, 10) || 0,
    },
}));
exports.queueConfig = (0, config_1.registerAs)('queue', () => ({
    rabbitmq: {
        uri: process.env.RABBITMQ_URI,
        queues: {
            main: 'main_queue',
            scraper: 'scraper_queue',
        },
    },
}));
//# sourceMappingURL=configuration.js.map