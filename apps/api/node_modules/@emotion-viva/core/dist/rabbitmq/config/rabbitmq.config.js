"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXCHANGE_CONFIG = exports.QUEUE_CONFIG = void 0;
exports.QUEUE_CONFIG = {
    mainQueue: {
        name: 'main_queue',
        options: {
            durable: true,
            deadLetterExchange: 'dlx',
            deadLetterRoutingKey: 'dlq',
            messageTtl: 1000 * 60 * 60,
        },
    },
};
exports.EXCHANGE_CONFIG = {
    main: {
        name: 'main_exchange',
        type: 'topic',
    },
    dlx: {
        name: 'dlx',
        type: 'direct',
    },
};
//# sourceMappingURL=rabbitmq.config.js.map