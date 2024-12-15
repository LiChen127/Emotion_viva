import { Document } from 'mongoose';
import { Types } from 'mongoose';
export declare class ContentVersion extends Document {
    version_id: string;
    content_id: Types.ObjectId;
    created_at: Date;
}
export declare const ContentVersionSchema: import("mongoose").Schema<ContentVersion, import("mongoose").Model<ContentVersion, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ContentVersion>;
