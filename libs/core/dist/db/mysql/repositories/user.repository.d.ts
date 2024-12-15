import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';
export declare class UserRepository {
    private readonly repository;
    constructor(repository: Repository<User>);
    findAll(): Promise<User[]>;
    create(data: Partial<User>): Promise<User>;
    deleteMany(filter: any): Promise<void>;
}
