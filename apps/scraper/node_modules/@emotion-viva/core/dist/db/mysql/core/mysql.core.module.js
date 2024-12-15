"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLCoreModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_entity_1 = require("../entities/User.entity");
const UserProfile_entity_1 = require("../entities/UserProfile.entity");
const Recommendation_rules_entity_1 = require("../entities/Recommendation_rules.entity");
const Scheduled_tasks_entity_1 = require("../entities/Scheduled_tasks.entity");
const Actions_logs_enity_1 = require("../entities/Actions_logs.enity");
let MySQLCoreModule = class MySQLCoreModule {
};
exports.MySQLCoreModule = MySQLCoreModule;
exports.MySQLCoreModule = MySQLCoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [
                    User_entity_1.User,
                    UserProfile_entity_1.UserProfile,
                    Recommendation_rules_entity_1.RecommendationRules,
                    Scheduled_tasks_entity_1.ScheduledTasks,
                    Actions_logs_enity_1.ActionsLogs,
                ],
                synchronize: true,
            }),
        ],
    })
], MySQLCoreModule);
//# sourceMappingURL=mysql.core.module.js.map