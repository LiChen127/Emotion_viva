"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const mysql_core_module_1 = require("./core/mysql.core.module");
const User_entity_1 = require("./entities/User.entity");
const user_repository_1 = require("./repositories/user.repository");
let MySQLModule = class MySQLModule {
};
exports.MySQLModule = MySQLModule;
exports.MySQLModule = MySQLModule = __decorate([
    (0, common_1.Module)({
        imports: [mysql_core_module_1.MySQLCoreModule, typeorm_1.TypeOrmModule.forFeature([User_entity_1.User])],
        providers: [user_repository_1.UserRepository],
        exports: [user_repository_1.UserRepository],
    })
], MySQLModule);
//# sourceMappingURL=mysql.module.js.map