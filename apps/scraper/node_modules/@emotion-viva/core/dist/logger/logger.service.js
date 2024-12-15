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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLoggerService = void 0;
const common_1 = require("@nestjs/common");
const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
let CustomLoggerService = class CustomLoggerService {
    constructor(config) {
        const { combine, timestamp, printf, colorize } = winston.format;
        const logFormat = printf(({ level, message, timestamp, context, trace, ...meta }) => {
            return `${timestamp} [${level}] [${context || 'Application'}]: ${message}${trace ? `\n${trace}` : ''}${Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : ''}`;
        });
        const transports = [
            new winston.transports.Console({
                format: combine(colorize(), timestamp(), logFormat),
            }),
        ];
        if (config?.filename) {
            transports.push(new DailyRotateFile({
                filename: config.filename,
                dirname: config.dirname || 'logs',
                datePattern: 'YYYY-MM-DD',
                maxFiles: config.maxFiles || '14d',
                maxSize: config.maxSize || '20m',
                format: combine(timestamp(), logFormat),
            }));
        }
        this.logger = winston.createLogger({
            level: config?.level || 'info',
            format: combine(timestamp(), logFormat),
            transports,
        });
    }
    setContext(context) {
        this.context = context;
        return this;
    }
    log(context, message, meta = {}) {
        this.logger.info(message, { context, ...meta });
    }
    info(context, message, meta = {}) {
        this.logger.info(message, { context, ...meta });
    }
    error(context, message, trace, meta = {}) {
        this.logger.error(message, { context, trace, ...meta });
    }
    warn(context, message, meta = {}) {
        this.logger.warn(message, { context, ...meta });
    }
    debug(context, message, meta = {}) {
        this.logger.debug(message, { context, ...meta });
    }
    verbose(context, message, meta = {}) {
        this.logger.verbose(message, { context, ...meta });
    }
};
exports.CustomLoggerService = CustomLoggerService;
exports.CustomLoggerService = CustomLoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], CustomLoggerService);
//# sourceMappingURL=logger.service.js.map