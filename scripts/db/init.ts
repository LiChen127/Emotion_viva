import { NestFactory } from '@nestjs/core';
import { CoreModule } from '../../libs/core/src/core.module';
import { DataSource } from 'typeorm';
import { Connection } from 'mongoose';

async function init() {
  const app = await NestFactory.create(CoreModule);

  try {
    // 初始化 MySQL
    const dataSource = app.get(DataSource);
    await dataSource.runMigrations();
    console.log('MySQL migrations completed');

    // 初始化 MongoDB
    const mongoConnection = app.get(Connection);
    await mongoConnection.db.dropDatabase();
    console.log('MongoDB initialized');

    // 运行种子数据
    await require('./seed');
    console.log('Database initialization completed');

  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }

  await app.close();
  process.exit(0);
}

init(); 