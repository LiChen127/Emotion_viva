import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContentVersion } from '../schemas/content_versions.schema';

@Injectable()
export class ContentVersionRepository {
  constructor(
    @InjectModel(ContentVersion.name)
    private readonly model: Model<ContentVersion>,
  ) { }
}
