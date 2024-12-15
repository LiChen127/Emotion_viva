import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInteraction } from '../schemas/user_interactions.schema';

@Injectable()
export class UserInteractionRepository {
  constructor(
    @InjectModel(UserInteraction.name)
    private readonly model: Model<UserInteraction>,
  ) { }
}
