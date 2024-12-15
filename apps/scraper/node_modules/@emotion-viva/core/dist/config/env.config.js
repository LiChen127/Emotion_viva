"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infrastructureConfig = void 0;
const config_1 = require("@nestjs/config");
exports.infrastructureConfig = (0, config_1.registerAs)('infrastructure', () => ({
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        port: parseInt(process.env.MYSQL_PORT || '3306', 10),
        username: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'root',
        database: process.env.MYSQL_DATABASE || 'emotion_viva',
        pool: {
            max: parseInt(process.env.MYSQL_POOL_MAX || '10', 10),
        },
    },
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/emotion_viva',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: parseInt(process.env.MONGODB_POOL_SIZE || '10', 10),
        },
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD,
        db: parseInt(process.env.REDIS_DB || '0', 10),
        cluster: process.env.REDIS_CLUSTER === 'true'
            ? {
                nodes: (process.env.REDIS_NODES || '').split(','),
            }
            : undefined,
    },
    rabbitmq: {
        uri: process.env.RABBITMQ_URI || 'amqp://localhost:5672',
        queues: {
            main: {
                name: process.env.RABBITMQ_MAIN_QUEUE || 'main_queue',
                options: {
                    durable: true,
                    deadLetterExchange: 'dlx',
                },
            },
            scraper: {
                name: process.env.RABBITMQ_SCRAPER_QUEUE || 'scraper_queue',
                options: {
                    durable: true,
                    deadLetterExchange: 'dlx',
                },
            },
        },
    },
}));
//# sourceMappingURL=env.config.js.map