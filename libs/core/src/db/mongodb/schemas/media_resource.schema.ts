import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class MediaResource extends Document {
  @Prop({ required: true })
  resource_type: string;

  @Prop({ required: true })
  url: string;

  @Prop({ type: Object })
  metadata: Record<string, any>; // 资源元数据

  @Prop({ type: Types.ObjectId, ref: 'Content' })
  content_id: Types.ObjectId; // 关联内容ID
}

export const MediaResourceSchema = SchemaFactory.createForClass(MediaResource);
