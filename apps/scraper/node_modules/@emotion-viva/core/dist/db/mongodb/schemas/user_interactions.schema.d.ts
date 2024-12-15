import { Document } from 'mongoose';
import { Types } from 'mongoose';
export declare class UserInteraction extends Document {
    user_id: number;
    content_id: Types.ObjectId;
    interaction_type: string;
    interaction_data: Record<string, any>;
    timestamp: Date;
}
export declare const UserInteractionSchema: import("mongoose").Schema<UserInteraction, import("mongoose").Model<UserInteraction, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserInteraction>;
