import { NestFactory } from '@nestjs/core';
import { CoreModule } from '../../core.module';
import { DataSource } from 'typeorm';
import { Connection } from 'mongoose';
import { runSeeders } from './seed';

async function initializeDatabase() {
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

    // 运行种子
    await runSeeders();
    console.log('Database seeding completed');

  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }

  await app.close();
}

initializeDatabase();