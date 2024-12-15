import { Document } from 'mongoose';
import { Types } from 'mongoose';
export declare class MediaResource extends Document {
    resource_type: string;
    url: string;
    metadata: Record<string, any>;
    content_id: Types.ObjectId;
}
export declare const MediaResourceSchema: import("mongoose").Schema<MediaResource, import("mongoose").Model<MediaResource, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MediaResource>;
