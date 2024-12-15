import { DataSource } from 'typeorm';
import { User } from '../../mysql/entities/User.entity';
import { faker } from '@faker-js/faker';

export class UserSeeder {
  constructor(private dataSource: DataSource) { }

  async run() {
    const userRepository = this.dataSource.getRepository(User);

    const users = Array(10)
      .fill(null)
      .map(() => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      }));

    await userRepository.save(users);
  }
} 