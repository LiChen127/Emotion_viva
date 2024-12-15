import { Test } from '@nestjs/testing';
import { CoreModule } from '../core.module';
import { CacheRepository } from '../redis/repositories/cache.repository';
import { ContentRepository } from '../db/mongodb/repositories/content.repository';
import { UserRepository } from '../db/mysql/repositories/user.repository';
import { MessageRepository } from '../rabbitmq/repositories/message.respositories';

describe('Infrastructure Tests', () => {
  let cacheRepo: CacheRepository;
  let contentRepo: ContentRepository;
  let userRepo: UserRepository;
  let messageRepo: MessageRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CoreModule],
    }).compile();

    cacheRepo = moduleRef.get<CacheRepository>(CacheRepository);
    contentRepo = moduleRef.get<ContentRepository>(ContentRepository);
    userRepo = moduleRef.get<UserRepository>(UserRepository);
    messageRepo = moduleRef.get<MessageRepository>(MessageRepository);
  });

  describe('Redis', () => {
    it('should set and get value', async () => {
      const key = 'test:key';
      const value = 'test-value';

      await cacheRepo.set(key, value);
      const result = await cacheRepo.get(key);

      expect(result).toBe(value);
    });
  });

  describe('MongoDB', () => {
    it('should create and find content', async () => {
      const testContent = {
        title: 'Test Title',
        body: 'Test Body',
        tags: ['test'],
        category: 'test'
      };

      const created = await contentRepo.create(testContent);
      const found = await contentRepo.findById(created.id);

      expect(found).toBeDefined();
      expect(found.title).toBe(testContent.title);
    });
  });

  describe('MySQL', () => {
    it('should create and find user', async () => {
      const testUser = {
        username: 'testuser',
        email: 'test@test.com',
        password: 'password123'
      };

      const created = await userRepo.create(testUser);
      const found = await userRepo.findAll();

      expect(found).toBeDefined();
      expect(found[0].username).toBe(testUser.username);
    });
  });

  describe('RabbitMQ', () => {
    it('should publish and consume message', async () => {
      const testMessage = { test: 'message' };
      const pattern = 'test.pattern';

      // 发布消息
      await messageRepo.publish(pattern, testMessage);

      // 消费消息
      const message = await new Promise((resolve) => {
        messageRepo.subscribe(pattern, (msg) => {
          resolve(msg);
        });
      });

      expect(message).toEqual(testMessage);
    });
  });

  afterAll(async () => {
    // 清理测试数据
    await cacheRepo.clear('test:*');
    await contentRepo.deleteMany({});
    await userRepo.deleteMany({});
  });
}); 