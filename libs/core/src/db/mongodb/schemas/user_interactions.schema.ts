import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class UserInteraction extends Document {
  @Prop({ required: true })
  user_id: number;

  @Prop({ required: true })
  content_id: Types.ObjectId;

  @Prop({ required: true })
  interaction_type: string; // 比如点赞、评论、分享

  @Prop({ type: Object })
  interaction_data: Record<string, any>; // 交互内容（比如评论）

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;
}

export const UserInteractionSchema =
  SchemaFactory.createForClass(UserInteraction);
