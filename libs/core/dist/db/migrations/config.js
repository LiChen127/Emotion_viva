"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const configService = new config_1.ConfigService();
exports.default = new typeorm_1.DataSource({
    type: 'mysql',
    host: configService.get('MYSQL_HOST'),
    port: configService.get('MYSQL_PORT'),
    username: configService.get('MYSQL_USER'),
    password: configService.get('MYSQL_PASSWORD'),
    database: configService.get('MYSQL_DATABASE'),
    entities: [path.join(__dirname, '../mysql/entities/**/*.entity{.ts,.js}')],
    migrations: [path.join(__dirname, './mysql/**/*{.ts,.js}')],
});
//# sourceMappingURL=config.js.map