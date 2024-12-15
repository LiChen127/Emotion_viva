import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrawledData } from '../schemas/crawled_data.schema';

@Injectable()
export class CrawledDataRepository {
  constructor(
    @InjectModel(CrawledData.name)
    private readonly model: Model<CrawledData>,
  ) { }
}
