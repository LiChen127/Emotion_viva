import { DataSource } from 'typeorm';
export declare class UserSeeder {
    private dataSource;
    constructor(dataSource: DataSource);
    run(): Promise<void>;
}
