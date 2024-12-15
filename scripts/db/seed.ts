import { NestFactory } from '@nestjs/core';
import { CoreModule } from '../../libs/core/src/core.module';
import { DataSource } from 'typeorm';
import { Connection } from 'mongoose';
import { UserSeeder } from '../../libs/core/src/db/seeds/mysql/user.seed';
import { ContentSeeder } from '../../libs/core/src/db/seeds/mongo/content.seed';
import { getModelToken } from '@nestjs/mongoose';
import { Content } from '../../libs/core/src/db/mongodb/schemas/content.schema';

async function seed() {
  const app = await NestFactory.create(CoreModule);

  try {
    // MySQL Seeders
    const dataSource = app.get(DataSource);
    const userSeeder = new UserSeeder(dataSource);
    await userSeeder.run();
    console.log('MySQL seeding completed');

    // MongoDB Seeders
    const contentModel = app.get(getModelToken(Content.name));
    const contentSeeder = new ContentSeeder(contentModel);
    await contentSeeder.run();
    console.log('MongoDB seeding completed');

  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }

  await app.close();
  process.exit(0);
}

seed(); 