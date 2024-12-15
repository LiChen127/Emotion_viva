import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from '../schemas/content.schema';

@Injectable()
export class ContentRepository {
  constructor(
    @InjectModel(Content.name) private readonly model: Model<Content>,
  ) { }

  async create(data: Partial<Content>): Promise<Content> {
    const content = new this.model(data);
    return content.save();
  }

  async findAll(): Promise<Content[]> {
    return this.model.find().exec();
  }

  async findById(id: string): Promise<Content> {
    return this.model.findById(id).exec();
  }

  async deleteMany(filter: any): Promise<void> {
    await this.model.deleteMany(filter).exec();
  }
}
