import { Global, Module } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';

@Global()
@Module({
  providers: [
    {
      provide: CustomLoggerService,
      useFactory: () => {
        return new CustomLoggerService({
          level: 'info',
          filename: 'app-%DATE%.log',
          dirname: 'logs',
          maxFiles: '14',
          maxSize: '20m'
        });
      },
    },
  ],
  exports: [CustomLoggerService],
})
export class LoggerModule { }