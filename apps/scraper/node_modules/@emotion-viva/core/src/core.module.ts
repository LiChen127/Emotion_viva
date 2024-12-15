/**
 * 导入核心libs模块
 */
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { MongoDBModule } from './db/mongodb/mongodb.module';
import { MySQLModule } from './db/mysql/mysql.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { LoggerModule } from './logger/logger.module';
import { infrastructureConfig } from './config/env.config';
import { InfrastructureService } from './infrastructure/infrastructure.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [infrastructureConfig],
      envFilePath: ['.env'],
    }),
    MySQLModule,
    MongoDBModule,
    RedisModule,
    RabbitMQModule,
    LoggerModule,
  ],
  providers: [InfrastructureService],
  exports: [
    MySQLModule,
    MongoDBModule,
    RedisModule,
    RabbitMQModule,
    LoggerModule,
    InfrastructureService
  ],
})
export class CoreModule { }
