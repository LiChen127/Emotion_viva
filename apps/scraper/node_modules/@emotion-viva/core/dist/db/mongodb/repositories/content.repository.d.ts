import { Model } from 'mongoose';
import { Content } from '../schemas/content.schema';
export declare class ContentRepository {
    private readonly model;
    constructor(model: Model<Content>);
    create(data: Partial<Content>): Promise<Content>;
    findAll(): Promise<Content[]>;
    findById(id: string): Promise<Content>;
    deleteMany(filter: any): Promise<void>;
}
