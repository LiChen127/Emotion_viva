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
exports.MessageRepository = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const rabbitmq_service_1 = require("../rabbitmq.service");
let MessageRepository = class MessageRepository {
    constructor(client, rabbitmqService) {
        this.client = client;
        this.rabbitmqService = rabbitmqService;
    }
    async publish(pattern, data) {
        await (0, rxjs_1.lastValueFrom)(this.client.emit(pattern, data));
    }
    async send(pattern, data) {
        return (0, rxjs_1.lastValueFrom)(this.client.send(pattern, data));
    }
    async close() {
        await this.client.close();
    }
    async emit(pattern, data) {
        await (0, rxjs_1.lastValueFrom)(this.client.emit(pattern, data));
    }
    subscribe(pattern, callback) {
        this.rabbitmqService.subscribe(pattern, callback);
    }
};
exports.MessageRepository = MessageRepository;
exports.MessageRepository = MessageRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('RABBITMQ_CLIENT')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        rabbitmq_service_1.RabbitMQService])
], MessageRepository);
//# sourceMappingURL=message.respositories.js.map