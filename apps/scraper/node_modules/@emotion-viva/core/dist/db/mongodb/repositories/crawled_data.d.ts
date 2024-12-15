import { Model } from 'mongoose';
import { CrawledData } from '../schemas/crawled_data.schema';
export declare class CrawledDataRepository {
    private readonly model;
    constructor(model: Model<CrawledData>);
}
