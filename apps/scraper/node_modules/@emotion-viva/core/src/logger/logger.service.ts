import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export interface LoggerConfig {
  level?: string;
  filename?: string;
  dirname?: string;
  maxFiles?: string;
  maxSize?: string;
}

@Injectable()
export class CustomLoggerService implements LoggerService {
  private logger: winston.Logger;
  private context: string = 'Application';

  constructor(config?: LoggerConfig) {
    this.initializeLogger(config);
  }

  private initializeLogger(config?: LoggerConfig) {
    const { combine, timestamp, printf, colorize } = winston.format;

    // 自定义日志格式
    const logFormat = printf(({ level, message, timestamp, context, trace, ...meta }) => {
      return `${timestamp} [${level}] [${context}]: ${message}${trace ? `\n${trace}` : ''
        }${Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : ''}`;
    });

    // 基础配置
    const defaultConfig: LoggerConfig = {
      level: 'info',
      dirname: 'logs',
      maxFiles: '14d',
      maxSize: '20m'
    };

    const finalConfig = { ...defaultConfig, ...config };

    // 配置传输器
    const transports: winston.transport[] = [
      new winston.transports.Console({
        format: combine(colorize(), timestamp(), logFormat)
      })
    ];

    // 如果配置了文件存储,添加文件传输器
    if (finalConfig.filename) {
      transports.push(
        new DailyRotateFile({
          filename: finalConfig.filename,
          dirname: finalConfig.dirname,
          datePattern: 'YYYY-MM-DD',
          maxFiles: finalConfig.maxFiles,
          maxSize: finalConfig.maxSize,
          format: combine(timestamp(), logFormat)
        })
      );
    }

    // 创建 logger 实例
    this.logger = winston.createLogger({
      level: finalConfig.level,
      format: combine(timestamp(), logFormat),
      transports
    });
  }

  setContext(context: string): this {
    this.context = context;
    return this;
  }

  log(message: any, context?: string): void {
    this.logger.info(message, { context: context || this.context });
  }

  error(message: any, trace?: string, context?: string): void {
    this.logger.error(message, {
      context: context || this.context,
      trace
    });
  }

  warn(message: any, context?: string): void {
    this.logger.warn(message, { context: context || this.context });
  }

  debug(message: any, context?: string): void {
    this.logger.debug(message, { context: context || this.context });
  }

  verbose(message: any, context?: string): void {
    this.logger.verbose(message, { context: context || this.context });
  }

  // 扩展方法 - 带元数据的日志
  logWithMeta(level: string, message: string, meta: Record<string, any> = {}, context?: string): void {
    this.logger.log(level, message, {
      context: context || this.context,
      ...meta
    });
  }
}