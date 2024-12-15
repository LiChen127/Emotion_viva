import { Document } from 'mongoose';
export declare class Content extends Document {
    title: string;
    body: string;
    tags: string[];
    category: string;
    created_at: Date;
    updated_at: Date;
}
export declare const ContentSchema: import("mongoose").Schema<Content, import("mongoose").Model<Content, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Content>;
