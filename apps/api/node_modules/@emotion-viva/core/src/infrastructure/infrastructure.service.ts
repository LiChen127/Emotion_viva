import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { CacheRepository } from '../redis/repositories/redis.repository';
import { DataSource } from 'typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { InjectDataSource } from '@nestjs/typeorm';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class InfrastructureService implements OnModuleInit {
  constructor(
    @InjectDataSource()
    private readonly mysqlDataSource: DataSource,
    @InjectConnection()
    private readonly mongoConnection: Connection,
    private readonly configService: ConfigService,
    private readonly rabbitMQService: RabbitMQService,
    private readonly redisRepository: CacheRepository,
  ) { }

  async onModuleInit() {
    await this.initializeInfrastructure();
  }

  private async initializeInfrastructure() {
    try {
      // 初始化 MySQL
      await this.initMySQL();

      // 初始化 MongoDB
      await this.initMongoDB();

      // ��始化 Redis
      await this.initRedis();

      // 初始化 RabbitMQ
      await this.initRabbitMQ();

      console.log('基础设施初始化完成');
    } catch (error) {
      console.error('基础设施初始化失败:', error);
      throw error;
    }
  }

  private async initMySQL() {
    try {
      if (!this.mysqlDataSource.isInitialized) {
        await this.mysqlDataSource.initialize();
      }

      // 运行迁移
      await this.mysqlDataSource.runMigrations();
      console.log('MySQL 初始化成功');
    } catch (error) {
      console.error('MySQL 初始化失败:', error);
      throw error;
    }
  }

  private async initMongoDB() {
    try {
      if (this.mongoConnection.readyState !== 1) {
        console.log('正在连接 MongoDB...');
        await this.mongoConnection.asPromise();
      }

      // 验证连接
      console.log('验证 MongoDB 连接...');
      await this.mongoConnection.db.command({ ping: 1 });
      console.log('MongoDB 连接验证成功');

      // 确保所有集合都存在并设置索引
      const collections = [
        {
          name: 'contents',
          indexes: [
            { key: { title: 1 }, background: true },
            { key: { tags: 1 }, background: true },
            { key: { createdAt: -1 }, background: true }
          ]
        },
        {
          name: 'crawled_data',
          indexes: [
            { key: { url: 1 }, unique: true },
            { key: { crawledAt: -1 }, background: true }
          ]
        },
        {
          name: 'media_resources',
          indexes: [
            { key: { type: 1 }, background: true },
            { key: { contentId: 1 }, background: true }
          ]
        },
        {
          name: 'user_interactions',
          indexes: [
            { key: { userId: 1 }, background: true },
            { key: { contentId: 1 }, background: true },
            { key: { type: 1 }, background: true }
          ]
        },
        {
          name: 'content_versions',
          indexes: [
            { key: { contentId: 1 }, background: true },
            { key: { version: -1 }, background: true }
          ]
        }
      ];

      for (const collection of collections) {
        try {
          // 检查集合是否存在，不存在则创建
          const collectionExists = await this.mongoConnection.db
            .listCollections({ name: collection.name })
            .hasNext();

          if (!collectionExists) {
            await this.mongoConnection.db.createCollection(collection.name);
            console.log(`MongoDB 集合 ${collection.name} 创建成功`);
          }

          // 创建索引
          const coll = this.mongoConnection.db.collection(collection.name);
          for (const index of collection.indexes) {
            await coll.createIndex(index.key, {
              background: true,
              ...index
            });
          }
        } catch (error) {
          console.error(`MongoDB 集合 ${collection.name} 初始化失败:`, error);
          throw error;
        }
      }

      console.log('MongoDB 初始化成功');
    } catch (error) {
      console.error('MongoDB 初始化失败:', error);
      console.error('连接状态:', this.mongoConnection.readyState);
      console.error('连接字符串:', this.configService.get('infrastructure.mongodb.uri'));
      throw error;
    }
  }

  private async initRedis() {
    try {
      await this.redisRepository.ping();
      console.log('Redis 连接成功');
    } catch (error) {
      console.error('Redis 连接失败:', error);
      throw error;
    }
  }

  private async initRabbitMQ() {
    try {
      await this.rabbitMQService.initializeConnection();

      const exchanges = this.configService.get('RABBITMQ_EXCHANGES') || [];
      const queues = this.configService.get('RABBITMQ_QUEUES') || [];

      for (const exchange of exchanges) {
        await this.rabbitMQService.assertExchange(exchange.name, exchange.type);
      }

      for (const queue of queues) {
        await this.rabbitMQService.assertQueue(queue.name);
      }

      console.log('RabbitMQ 初始化成功');
    } catch (error) {
      console.error('RabbitMQ 初始化失败:', error);
      throw error;
    }
  }
} 