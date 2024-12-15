import { Model } from 'mongoose';
import { ContentVersion } from '../schemas/content_versions.schema';
export declare class ContentVersionRepository {
    private readonly model;
    constructor(model: Model<ContentVersion>);
}
