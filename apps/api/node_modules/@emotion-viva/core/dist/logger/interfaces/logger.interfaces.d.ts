export interface ILogger {
    info(context: string, message: string, meta?: Record<string, any>): void;
    error(context: string, message: string, trace?: string, meta?: Record<string, any>): void;
    warn(context: string, message: string, meta?: Record<string, any>): void;
    debug(context: string, message: string, meta?: Record<string, any>): void;
    verbose(context: string, message: string, meta?: Record<string, any>): void;
}
export interface LoggerConfig {
    level: string;
    format?: string;
    filename?: string;
    dirname?: string;
    maxFiles?: number;
    maxSize?: string;
}
