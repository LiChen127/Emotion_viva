import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MediaResource } from '../schemas/media_resource.schema';

@Injectable()
export class MediaResourceRepository {
  constructor(
    @InjectModel(MediaResource.name)
    private readonly model: Model<MediaResource>,
  ) { }
}
