import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class ContentVersion extends Document {
  @Prop({ required: true })
  version_id: string;

  @Prop({ type: Types.ObjectId, ref: 'Content' })
  content_id: Types.ObjectId; // 关联内容ID

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}

export const ContentVersionSchema =
  SchemaFactory.createForClass(ContentVersion);
