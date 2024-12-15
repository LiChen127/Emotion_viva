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
        this.context = 'Application';
        this.initializeLogger(config);
    }
    initializeLogger(config) {
        const { combine, timestamp, printf, colorize } = winston.format;
        const logFormat = printf(({ level, message, timestamp, context, trace, ...meta }) => {
            return `${timestamp} [${level}] [${context}]: ${message}${trace ? `\n${trace}` : ''}${Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : ''}`;
        });
        const defaultConfig = {
            level: 'info',
            dirname: 'logs',
            maxFiles: '14d',
            maxSize: '20m'
        };
        const finalConfig = { ...defaultConfig, ...config };
        const transports = [
            new winston.transports.Console({
                format: combine(colorize(), timestamp(), logFormat)
            })
        ];
        if (finalConfig.filename) {
            transports.push(new DailyRotateFile({
                filename: finalConfig.filename,
                dirname: finalConfig.dirname,
                datePattern: 'YYYY-MM-DD',
                maxFiles: finalConfig.maxFiles,
                maxSize: finalConfig.maxSize,
                format: combine(timestamp(), logFormat)
            }));
        }
        this.logger = winston.createLogger({
            level: finalConfig.level,
            format: combine(timestamp(), logFormat),
            transports
        });
    }
    setContext(context) {
        this.context = context;
        return this;
    }
    log(message, context) {
        this.logger.info(message, { context: context || this.context });
    }
    error(message, trace, context) {
        this.logger.error(message, {
            context: context || this.context,
            trace
        });
    }
    warn(message, context) {
        this.logger.warn(message, { context: context || this.context });
    }
    debug(message, context) {
        this.logger.debug(message, { context: context || this.context });
    }
    verbose(message, context) {
        this.logger.verbose(message, { context: context || this.context });
    }
    logWithMeta(level, message, meta = {}, context) {
        this.logger.log(level, message, {
            context: context || this.context,
            ...meta
        });
    }
};
exports.CustomLoggerService = CustomLoggerService;
exports.CustomLoggerService = CustomLoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], CustomLoggerService);
//# sourceMappingURL=logger.service.js.map