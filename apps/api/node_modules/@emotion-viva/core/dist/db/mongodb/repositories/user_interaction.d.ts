import { Model } from 'mongoose';
import { UserInteraction } from '../schemas/user_interactions.schema';
export declare class UserInteractionRepository {
    private readonly model;
    constructor(model: Model<UserInteraction>);
}
