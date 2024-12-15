"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const core_module_1 = require("../../core.module");
const typeorm_1 = require("typeorm");
const mongoose_1 = require("mongoose");
const seed_1 = require("./seed");
async function initializeDatabase() {
    const app = await core_1.NestFactory.create(core_module_1.CoreModule);
    try {
        const dataSource = app.get(typeorm_1.DataSource);
        await dataSource.runMigrations();
        console.log('MySQL migrations completed');
        const mongoConnection = app.get(mongoose_1.Connection);
        await mongoConnection.db.dropDatabase();
        console.log('MongoDB initialized');
        await (0, seed_1.runSeeders)();
        console.log('Database seeding completed');
    }
    catch (error) {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }
    await app.close();
}
initializeDatabase();
//# sourceMappingURL=init-db.js.map