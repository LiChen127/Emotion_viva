import { NestFactory } from '@nestjs/core';
import { CoreModule } from '../../core.module';
import { UserSeeder } from '../seeds/mysql/user.seed';
import { ContentSeeder } from '../seeds/mongo/content.seed';
import { getModelToken } from '@nestjs/mongoose';
import { Content } from '../mongodb/schemas/content.schema';
import { DataSource } from 'typeorm';

export async function runSeeders() {
  const app = await NestFactory.create(CoreModule);

  // MySQL Seeders
  const dataSource = app.get(DataSource);
  const userSeeder = new UserSeeder(dataSource);
  await userSeeder.run();

  // MongoDB Seeders
  const contentModel = app.get(getModelToken(Content.name));
  const contentSeeder = new ContentSeeder(contentModel);
  await contentSeeder.run();

  await app.close();
}
