import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { ILogger, LoggerConfig } from './interfaces/logger.interfaces';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class CustomLoggerService implements LoggerService, ILogger {
  private logger: winston.Logger;
  private context?: string;

  constructor(config?: LoggerConfig) {
    this.initLogger(config || { level: 'info' });
  }

  private initLogger(config: LoggerConfig) {
    const { combine, timestamp, printf, colorize } = winston.format;

    const logFormat = printf(
      ({ level, message, timestamp, context, trace, ...meta }) => {
        return `${timestamp} [${level}] [${context || 'Application'}]: ${message}${trace ? `\n${trace}` : ''
          }${Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : ''}`;
      },
    );

    const transports: winston.transport[] = [
      new winston.transports.Console({
        format: combine(colorize(), timestamp(), logFormat),
      }),
    ];

    if (config?.filename) {
      transports.push(
        new DailyRotateFile({
          filename: config.filename,
          dirname: config.dirname || 'logs',
          datePattern: 'YYYY-MM-DD',
          maxFiles: config.maxFiles || '14d',
          maxSize: config.maxSize || '20m',
          format: combine(timestamp(), logFormat),
        }),
      );
    }

    this.logger = winston.createLogger({
      level: config?.level || 'info',
      format: combine(timestamp(), logFormat),
      transports,
    });
  }

  setContext(context: string) {
    this.context = context;
    return this;
  }

  log(message: any, context?: string) {
    context = context || this.context;
    this.info(context, message);
  }

  info(context: string, message: string, meta: Record<string, any> = {}) {
    if (!this.logger) {
      this.initLogger({ level: 'info' });
    }
    this.logger.info(message, { context: context || this.context, ...meta });
  }

  error(
    context: string,
    message: string,
    trace?: string,
    meta: Record<string, any> = {},
  ) {
    if (!this.logger) {
      this.initLogger({ level: 'info' });
    }
    this.logger.error(message, { context: context || this.context, trace, ...meta });
  }

  warn(context: string, message: string, meta: Record<string, any> = {}) {
    if (!this.logger) {
      this.initLogger({ level: 'info' });
    }
    this.logger.warn(message, { context: context || this.context, ...meta });
  }

  debug(context: string, message: string, meta: Record<string, any> = {}) {
    if (!this.logger) {
      this.initLogger({ level: 'info' });
    }
    this.logger.debug(message, { context: context || this.context, ...meta });
  }

  verbose(context: string, message: string, meta: Record<string, any> = {}) {
    if (!this.logger) {
      this.initLogger({ level: 'info' });
    }
    this.logger.verbose(message, { context: context || this.context, ...meta });
  }
}