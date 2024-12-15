"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQCoreModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rabbitmq_config_1 = require("../config/rabbitmq.config");
let RabbitMQCoreModule = class RabbitMQCoreModule {
};
exports.RabbitMQCoreModule = RabbitMQCoreModule;
exports.RabbitMQCoreModule = RabbitMQCoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.registerAsync([
                {
                    name: 'RABBITMQ_CLIENT',
                    useFactory: () => ({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: [process.env.RABBITMQ_URI],
                            queue: rabbitmq_config_1.QUEUE_CONFIG.mainQueue.name,
                            queueOptions: rabbitmq_config_1.QUEUE_CONFIG.mainQueue.options,
                            noAck: false,
                        },
                    }),
                },
            ]),
        ],
        exports: [microservices_1.ClientsModule],
    })
], RabbitMQCoreModule);
//# sourceMappingURL=rabbitmq.core.modules.js.map