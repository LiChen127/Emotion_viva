import { Model } from 'mongoose';
import { Content } from '../../mongodb/schemas/content.schema';
import { faker } from '@faker-js/faker';

export class ContentSeeder {
  constructor(private readonly model: Model<Content>) { }

  async run() {
    const contents = Array(10)
      .fill(null)
      .map(() => ({
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(),
        tags: Array(3)
          .fill(null)
          .map(() => faker.word.sample()),
        category: faker.helpers.arrayElement(['news', 'article', 'blog']),
      }));

    await this.model.insertMany(contents);
  }
} 