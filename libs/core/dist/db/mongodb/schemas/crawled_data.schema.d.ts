import { Document } from 'mongoose';
export declare class CrawledData extends Document {
    crawl_source: string;
    content_data: Record<string, any>;
    crawl_status: string;
    timestamp: Date;
}
export declare const CrawledDataSchema: import("mongoose").Schema<CrawledData, import("mongoose").Model<CrawledData, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CrawledData>;
