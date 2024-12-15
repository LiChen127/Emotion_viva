import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDBCoreModule } from './core/mongodb.core.module';
import { Content, ContentSchema } from './schemas/content.schema';
import { ContentRepository } from './repositories/content.repository';

@Module({
  imports: [
    MongoDBCoreModule,
    MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }]),
  ],
  providers: [ContentRepository],
  exports: [ContentRepository],
})
export class MongoDBModule { }
