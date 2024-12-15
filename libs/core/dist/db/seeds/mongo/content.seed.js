"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentSeeder = void 0;
const faker_1 = require("@faker-js/faker");
class ContentSeeder {
    constructor(model) {
        this.model = model;
    }
    async run() {
        const contents = Array(10)
            .fill(null)
            .map(() => ({
            title: faker_1.faker.lorem.sentence(),
            body: faker_1.faker.lorem.paragraphs(),
            tags: Array(3)
                .fill(null)
                .map(() => faker_1.faker.word.sample()),
            category: faker_1.faker.helpers.arrayElement(['news', 'article', 'blog']),
        }));
        await this.model.insertMany(contents);
    }
}
exports.ContentSeeder = ContentSeeder;
//# sourceMappingURL=content.seed.js.map