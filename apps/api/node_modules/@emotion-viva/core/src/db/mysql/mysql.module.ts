import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/User.entity';
import { UserProfile } from './entities/UserProfile.entity';
import { RecommendationRules } from './entities/Recommendation_rules.entity';
import { ScheduledTasks } from './entities/Scheduled_tasks.entity';
import { ActionsLogs } from './entities/Actions_logs.enity';
import { ActionsLogsRepository } from './repositories/actions_logs.repository';
import { RecommendationRulesRepository } from './repositories/recommendation_rules';
import { ScheduledTaskRepository } from './repositories/scheduled_task';
import { UserRepository } from './repositories/user.repository';
import { UserProfileRepository } from './repositories/userProfile';

@Module({
  imports: [
    ConfigModule, // 配置模块，用于动态获取环境变量
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        authPlugins: {
          mysql_native_password: () => require('mysql2/lib/auth/mysql_native_password')
        },
        synchronize: true, // 禁用自动同步，推荐迁移管理
        autoLoadEntities: true, // 自动加载实体
        entities: [
          User,
          UserProfile,
          RecommendationRules,
          ScheduledTasks,
          ActionsLogs,
        ],
        logging: configService.get<boolean>('DB_LOGGING', false),
        poolSize: configService.get<number>('MYSQL_POOL_MAX', 10),
      }),
    }),
    TypeOrmModule.forFeature([
      User,
      UserProfile,
      RecommendationRules,
      ScheduledTasks,
      ActionsLogs,
    ]),
  ],
  providers: [ActionsLogsRepository, RecommendationRulesRepository, ScheduledTaskRepository, UserRepository, UserProfileRepository],
  exports: [TypeOrmModule, ActionsLogsRepository, RecommendationRulesRepository, ScheduledTaskRepository, UserRepository, UserProfileRepository],
})
export class MySQLModule { }
