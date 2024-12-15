import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { UserProfile } from '../entities/UserProfile.entity';
import { RecommendationRules } from '../entities/Recommendation_rules.entity';
import { ScheduledTasks } from '../entities/Scheduled_tasks.entity';
import { ActionsLogs } from '../entities/Actions_logs.enity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        UserProfile,
        RecommendationRules,
        ScheduledTasks,
        ActionsLogs,
      ],
      synchronize: true,
    }),
  ],
})
export class MySQLCoreModule { }