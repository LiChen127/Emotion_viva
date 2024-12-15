import { Repository } from 'typeorm';
import { UserProfile } from '../entities/UserProfile.entity';
export declare class UserProfileRepository {
    private readonly repository;
    constructor(repository: Repository<UserProfile>);
}
