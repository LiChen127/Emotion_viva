"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const redis_module_1 = require("./redis/redis.module");
const mongodb_module_1 = require("./db/mongodb/mongodb.module");
const mysql_module_1 = require("./db/mysql/mysql.module");
const rabbitmq_module_1 = require("./rabbitmq/rabbitmq.module");
const configuration_1 = require("./config/configuration");
let CoreModule = class CoreModule {
};
exports.CoreModule = CoreModule;
exports.CoreModule = CoreModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.databaseConfig, configuration_1.cacheConfig, configuration_1.queueConfig],
            }),
            mysql_module_1.MySQLModule,
            mongodb_module_1.MongoDBModule,
            redis_module_1.RedisModule,
            rabbitmq_module_1.RabbitMQModule,
        ],
        exports: [mysql_module_1.MySQLModule, mongodb_module_1.MongoDBModule, redis_module_1.RedisModule, rabbitmq_module_1.RabbitMQModule],
    })
], CoreModule);
//# sourceMappingURL=core.module.js.map