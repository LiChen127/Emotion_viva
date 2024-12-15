"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const core_module_1 = require("../core.module");
const cache_repository_1 = require("../redis/repositories/cache.repository");
const content_repository_1 = require("../db/mongodb/repositories/content.repository");
const user_repository_1 = require("../db/mysql/repositories/user.repository");
const message_respositories_1 = require("../rabbitmq/repositories/message.respositories");
describe('Infrastructure Tests', () => {
    let cacheRepo;
    let contentRepo;
    let userRepo;
    let messageRepo;
    beforeAll(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({
            imports: [core_module_1.CoreModule],
        }).compile();
        cacheRepo = moduleRef.get(cache_repository_1.CacheRepository);
        contentRepo = moduleRef.get(content_repository_1.ContentRepository);
        userRepo = moduleRef.get(user_repository_1.UserRepository);
        messageRepo = moduleRef.get(message_respositories_1.MessageRepository);
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
            await messageRepo.publish(pattern, testMessage);
            const message = await new Promise((resolve) => {
                messageRepo.subscribe(pattern, (msg) => {
                    resolve(msg);
                });
            });
            expect(message).toEqual(testMessage);
        });
    });
    afterAll(async () => {
        await cacheRepo.clear('test:*');
        await contentRepo.deleteMany({});
        await userRepo.deleteMany({});
    });
});
//# sourceMappingURL=infrastructure.test.js.map