import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomLoggerService } from './logger/logger.service';
import { DatabaseModule } from './mysql/mysql.module';
import { RedisModule } from './redis/redis.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongoDBModule } from './app/mongodb/mongodb.module';

@Module({
  imports: [
    DatabaseModule,
    RedisModule,
    MongooseModule,
    ClientsModule.register([
      {
        name: 'MAIN_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URI],
          queue: 'main_queue',
          noAck: false,
        },
      },
    ]),
    MongoDBModule,
  ],
  controllers: [AppController],
  providers: [AppService, CustomLoggerService],
})
export class AppModule { }
