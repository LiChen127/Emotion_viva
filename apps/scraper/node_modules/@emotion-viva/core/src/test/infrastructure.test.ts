import { Test } from '@nestjs/testing';
import { CoreModule } from '../core.module';
import { InfrastructureService } from '../infrastructure/infrastructure.service';
import { DataSource } from 'typeorm';
import { Connection } from 'mongoose';
import { CacheRepository } from '../redis/repositories/redis.repository';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { getConnectionToken } from '@nestjs/mongoose';

async function testInfrastructure() {
  try {
    const moduleRef = await Test.createTestingModule({
      imports: [CoreModule],
    }).compile();

    const app = moduleRef.createNestApplication();
    await app.init();

    // 获取所有服务实例
    const infrastructureService = app.get(InfrastructureService);
    const mysqlConnection = app.get(DataSource);
    const mongoConnection = app.get<Connection>(getConnectionToken());
    const redisClient = app.get(CacheRepository);
    const rabbitMQService = app.get(RabbitMQService);

    // 测试 MySQL CRUD
    console.log('\n测试 MySQL CRUD...');
    // 创建测试表
    await mysqlConnection.query(`
      CREATE TABLE IF NOT EXISTS test_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
      )
    `);
    // 插入数据
    await mysqlConnection.query(
      'INSERT INTO test_users (name, email) VALUES (?, ?)',
      ['Test User', 'test@example.com']
    );
    // 查询数据
    const users = await mysqlConnection.query('SELECT * FROM test_users');
    console.log('MySQL 查询结果:', users);
    // 清理数据
    await mysqlConnection.query('DROP TABLE test_users');

    // 测试 MongoDB CRUD
    console.log('\n测试 MongoDB CRUD...');
    const testCollection = mongoConnection.collection('test_collection');
    // 插入文档
    const insertResult = await testCollection.insertOne({
      name: 'Test Document',
      createdAt: new Date()
    });
    console.log('MongoDB 插入结果:', insertResult);
    // 查询文档
    const docs = await testCollection.find().toArray();
    console.log('MongoDB 查询结果:', docs);
    // 清理集合
    await testCollection.drop();

    // 测试 Redis 复杂操作
    console.log('\n测试 Redis 操作...');
    // String 操作
    await redisClient.set('test:string', 'Hello Redis', 60);
    const stringValue = await redisClient.get('test:string');
    console.log('Redis String 值:', stringValue);

    // Hash 操作
    await redisClient.hsetObject('test:hash', {
      field1: 'value1',
      field2: 'value2'
    });
    const hashValue = await redisClient.hgetall('test:hash');
    console.log('Redis Hash 值:', hashValue);

    // List 操作
    await redisClient.lpush('test:list', 'item1', 'item2', 'item3');
    const listValue = await redisClient.lrange('test:list', 0, -1);
    console.log('Redis List 值:', listValue);

    // 测试 RabbitMQ 消息收发
    console.log('\n测试 RabbitMQ 消息收发...');
    const channel = await rabbitMQService.getChannel();
    const testQueue = 'test_queue';

    // 创建队列
    await channel.assertQueue(testQueue, { durable: false });

    // 设置消费者
    const messagePromise = new Promise<string>((resolve) => {
      channel.consume(testQueue, (msg) => {
        if (msg) {
          const content = msg.content.toString();
          console.log('收到消息:', content);
          channel.ack(msg);
          resolve(content);
        }
      });
    });

    // 发送消息
    const testMessage = 'Hello RabbitMQ!';
    channel.sendToQueue(testQueue, Buffer.from(testMessage));

    // 等待消息接收
    const receivedMessage = await messagePromise;
    console.log('消息发送接收测试完成');

    // 清理测试数据
    console.log('\n清理测试数据...');
    await redisClient.delete('test:string');
    await redisClient.clear('test:hash');
    await redisClient.clear('test:list');
    await channel.deleteQueue(testQueue);

    // 关闭连接
    console.log('\n关闭连接...');
    await mongoConnection.close();
    await rabbitMQService.closeConnection();
    await app.close();

    console.log('\n基础设施测试完成');
    process.exit(0);
  } catch (error) {
    console.error('基础设施测试失败:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// 运行测试
testInfrastructure(); 