import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CrawledData extends Document {
  @Prop({ required: true })
  crawl_source: string; // 数据来源

  @Prop({ required: true, type: Object })
  content_data: Record<string, any>; // 爬取的内容数据

  @Prop({ required: true })
  crawl_status: string; // 爬取状态

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;
}

export const CrawledDataSchema = SchemaFactory.createForClass(CrawledData);
