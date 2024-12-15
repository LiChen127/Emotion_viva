/**
 * MongoDB core 依赖模块
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const mongoConfig = configService.get('infrastructure.mongodb');
        console.log('MongoDB 配置:', mongoConfig); // 调试用

        return {
          uri: mongoConfig.uri,
          ...mongoConfig.options,
          connectionFactory: (connection) => {
            connection.on('connected', () => {
              console.log('MongoDB 已连接');
            });
            connection.on('error', (error) => {
              console.error('MongoDB 连接错误:', error);
            });
            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class MongoDBCoreModule { }