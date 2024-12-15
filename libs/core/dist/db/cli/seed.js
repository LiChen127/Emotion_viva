"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSeeders = runSeeders;
const core_1 = require("@nestjs/core");
const core_module_1 = require("../../core.module");
const user_seed_1 = require("../seeds/mysql/user.seed");
const content_seed_1 = require("../seeds/mongo/content.seed");
const mongoose_1 = require("@nestjs/mongoose");
const content_schema_1 = require("../mongodb/schemas/content.schema");
const typeorm_1 = require("typeorm");
async function runSeeders() {
    const app = await core_1.NestFactory.create(core_module_1.CoreModule);
    const dataSource = app.get(typeorm_1.DataSource);
    const userSeeder = new user_seed_1.UserSeeder(dataSource);
    await userSeeder.run();
    const contentModel = app.get((0, mongoose_1.getModelToken)(content_schema_1.Content.name));
    const contentSeeder = new content_seed_1.ContentSeeder(contentModel);
    await contentSeeder.run();
    await app.close();
}
//# sourceMappingURL=seed.js.map