import { Global, Module } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';

@Global()
@Module({
  providers: [
    {
      provide: CustomLoggerService,
      useValue: new CustomLoggerService({
        level: 'info',
        filename: 'app-%DATE%.log'
      })
    }
  ],
  exports: [CustomLoggerService]
})
export class LoggerModule { }