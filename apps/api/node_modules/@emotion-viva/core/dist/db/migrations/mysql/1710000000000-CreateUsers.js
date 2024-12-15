"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsers1710000000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsers1710000000000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '100',
                    isUnique: true,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isUnique: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.CreateUsers1710000000000 = CreateUsers1710000000000;
//# sourceMappingURL=1710000000000-CreateUsers.js.map