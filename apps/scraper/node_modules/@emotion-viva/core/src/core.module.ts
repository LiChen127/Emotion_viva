import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { MongoDBModule } from './db/mongodb/mongodb.module';
import { MySQLModule } from './db/mysql/mysql.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { databaseConfig, cacheConfig, queueConfig } from './config/configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, cacheConfig, queueConfig],
    }),
    MySQLModule,
    MongoDBModule,
    RedisModule,
    RabbitMQModule,
  ],
  exports: [MySQLModule, MongoDBModule, RedisModule, RabbitMQModule],
})
export class CoreModule { }
