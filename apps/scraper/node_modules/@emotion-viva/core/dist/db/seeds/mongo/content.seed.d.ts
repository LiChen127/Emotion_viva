import { Model } from 'mongoose';
import { Content } from '../../mongodb/schemas/content.schema';
export declare class ContentSeeder {
    private readonly model;
    constructor(model: Model<Content>);
    run(): Promise<void>;
}
