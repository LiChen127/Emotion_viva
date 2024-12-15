import { Repository } from 'typeorm';
import { ScheduledTasks } from '../entities/Scheduled_tasks.entity';
export declare class ScheduledTaskRepository {
    private readonly repository;
    constructor(repository: Repository<ScheduledTasks>);
}
