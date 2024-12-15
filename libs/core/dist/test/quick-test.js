"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const core_module_1 = require("../core.module");
const redis_service_1 = require("../redis/redis.service");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(core_module_1.CoreModule);
        const redis = app.get(redis_service_1.RedisService);
        await redis.set('test:key', 'hello');
        const value = await redis.get('test:key');
        console.log('Redis Test:', value === 'hello' ? 'PASS' : 'FAIL');
        await app.close();
    }
    catch (error) {
        console.error('Test failed:', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=quick-test.js.map