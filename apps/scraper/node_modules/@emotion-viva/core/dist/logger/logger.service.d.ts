import { LoggerService } from '@nestjs/common';
import { ILogger, LoggerConfig } from './interfaces/logger.interfaces';
export declare class CustomLoggerService implements LoggerService, ILogger {
    private readonly logger;
    private context?;
    constructor(config?: LoggerConfig);
    setContext(context: string): this;
    log(context: string, message: string, meta?: Record<string, any>): void;
    info(context: string, message: string, meta?: Record<string, any>): void;
    error(context: string, message: string, trace?: string, meta?: Record<string, any>): void;
    warn(context: string, message: string, meta?: Record<string, any>): void;
    debug(context: string, message: string, meta?: Record<string, any>): void;
    verbose(context: string, message: string, meta?: Record<string, any>): void;
}
