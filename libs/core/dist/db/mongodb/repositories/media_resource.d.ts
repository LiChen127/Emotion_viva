import { Model } from 'mongoose';
import { MediaResource } from '../schemas/media_resource.schema';
export declare class MediaResourceRepository {
    private readonly model;
    constructor(model: Model<MediaResource>);
}
