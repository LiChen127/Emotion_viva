/**
 * MongoDB 依赖注入模块
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDBCoreModule } from './core/mongodb.core.module';
import { Content, ContentSchema } from './schemas/content.schema';
import { CrawledData, CrawledDataSchema } from './schemas/crawled_data.schema';
import { MediaResource, MediaResourceSchema } from './schemas/media_resource.schema';
import { UserInteraction, UserInteractionSchema } from './schemas/user_interactions.schema';
import { ContentVersion, ContentVersionSchema } from './schemas/content_versions.schema';

// 导入所有的 Repository
import { ContentRepository } from './repositories/content.repository';
import { CrawledDataRepository } from './repositories/crawled_data';
import { MediaResourceRepository } from './repositories/media_resource';
import { UserInteractionRepository } from './repositories/user_interaction';
import { ContentVersionRepository } from './repositories/content_versions.schema';

@Module({
  imports: [
    MongoDBCoreModule,
    MongooseModule.forFeature([
      { name: Content.name, schema: ContentSchema },
      { name: CrawledData.name, schema: CrawledDataSchema },
      { name: MediaResource.name, schema: MediaResourceSchema },
      { name: UserInteraction.name, schema: UserInteractionSchema },
      { name: ContentVersion.name, schema: ContentVersionSchema },
    ]),
  ],
  providers: [
    ContentRepository,
    CrawledDataRepository,
    MediaResourceRepository,
    UserInteractionRepository,
    ContentVersionRepository,
  ],
  exports: [
    MongoDBCoreModule,
    MongooseModule,
    ContentRepository,
    CrawledDataRepository,
    MediaResourceRepository,
    UserInteractionRepository,
    ContentVersionRepository,
  ],
})
export class MongoDBModule { }