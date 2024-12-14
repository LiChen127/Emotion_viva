import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDBService } from './mongodb.service';
import { Content, ContentSchema } from './content.schema';
import { MediaResource, MediaResourceSchema } from './media-resource.schema';
import {
  ContentVersion,
  ContentVersionSchema,
} from './content-versions.schema';
import {
  UserInteraction,
  UserInteractionSchema,
} from './user-interactions.schema';
import { CrawledData, CrawledDataSchema } from './crawled-data.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/emotion_viva', {}),
    MongooseModule.forFeature([
      { name: Content.name, schema: ContentSchema },
      { name: MediaResource.name, schema: MediaResourceSchema },
      { name: ContentVersion.name, schema: ContentVersionSchema },
      { name: UserInteraction.name, schema: UserInteractionSchema },
      { name: CrawledData.name, schema: CrawledDataSchema },
    ]),
  ],
  providers: [MongoDBService],
  exports: [MongoDBService],
})
export class MongoDBModule { }
