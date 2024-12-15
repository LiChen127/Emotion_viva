import { LoggerService } from '@nestjs/common';
export interface LoggerConfig {
    level?: string;
    filename?: string;
    dirname?: string;
    maxFiles?: string;
    maxSize?: string;
}
export declare class CustomLoggerService implements LoggerService {
    private logger;
    private context;
    constructor(config?: LoggerConfig);
    private initializeLogger;
    setContext(context: string): this;
    log(message: any, context?: string): void;
    error(message: any, trace?: string, context?: string): void;
    warn(message: any, context?: string): void;
    debug(message: any, context?: string): void;
    verbose(message: any, context?: string): void;
    logWithMeta(level: string, message: string, meta?: Record<string, any>, context?: string): void;
}
