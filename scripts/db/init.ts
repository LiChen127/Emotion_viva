// scripts/db/init.ts
import { NestFactory } from '@nestjs/core';
// import { CoreModule } from '../../libs/core/src/core.module';

import { DataSource } from 'typeorm';
import { getModelToken } from '@nestjs/mongoose';

// MySQL 实体
import { User } from '../../libs/core/src/db/mysql/entities/User.entity';
import { ActionsLogs } from '../../libs/core/src/db/mysql/entities/Actions_logs.enity';
import { UserProfile } from '../../libs/core/src/db/mysql/entities/UserProfile.entity';
import { RecommendationRules } from '../../libs/core/src/db/mysql/entities/Recommendation_rules.entity';
import { ScheduledTasks } from '../../libs/core/src/db/mysql/entities/Scheduled_tasks.entity';

// MongoDB 模型
// import { Content } from '../../libs/core/src/db/mongodb/schemas/content.schema';
import { Content } from '../../libs/core/src/db/mongodb/schemas/content.schema';
import { CrawledData } from '../../libs/core/src/db/mongodb/schemas/crawled_data.schema';
import { MediaResource } from '../../libs/core/src/db/mongodb/schemas/media_resource.schema';
import { UserInteraction } from '../../libs/core/src/db/mongodb/schemas/user_interactions.schema';
import { ContentVersion } from '../../libs/core/src/db/mongodb/schemas/content_versions.schema';
import { CoreModule } from '../../libs/core/src/core.module';

async function init() {
  const app = await NestFactory.create(CoreModule);

  try {
    // ===== MySQL 初始化 =====
    const dataSource = app.get(DataSource);

    // 1. 创建数据库
    await dataSource.query(`CREATE DATABASE IF NOT EXISTS emotion_viva`);
    await dataSource.query(`USE emotion_viva`);

    // 2. 清空所有表
    await dataSource.synchronize(true);

    console.log('MySQL tables created successfully');

    // ===== MongoDB 初始化 =====
    const models = [
      app.get(getModelToken(Content.name)),
      app.get(getModelToken(CrawledData.name)),
      app.get(getModelToken(MediaResource.name)),
      app.get(getModelToken(UserInteraction.name)),
      app.get(getModelToken(ContentVersion.name)),
    ];

    // 1. 删除所有现有集合
    await Promise.all(
      models.map((model) => model.collection.drop().catch(() => { })),
    );

    // 2. 创建集合
    await Promise.all(models.map((model) => model.createCollection()));

    // 3. 创建索引（可选）
    // 在这里根据实际需求添加索引
    console.log('MongoDB collections created successfully');

    // ===== 运行种子数据 =====
    if (require.main === module) {
      await require('./seed').seed(app);
      console.log('Seed data inserted successfully');
    }

    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }

  await app.close();
  process.exit(0);
}

init();
