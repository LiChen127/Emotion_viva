"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeeder = void 0;
const User_entity_1 = require("../../mysql/entities/User.entity");
const faker_1 = require("@faker-js/faker");
class UserSeeder {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async run() {
        const userRepository = this.dataSource.getRepository(User_entity_1.User);
        const users = Array(10)
            .fill(null)
            .map(() => ({
            username: faker_1.faker.internet.userName(),
            email: faker_1.faker.internet.email(),
            password: faker_1.faker.internet.password(),
        }));
        await userRepository.save(users);
    }
}
exports.UserSeeder = UserSeeder;
//# sourceMappingURL=user.seed.js.map