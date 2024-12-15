import { Repository } from 'typeorm';
import { ActionsLogs } from '../entities/Actions_logs.enity';
export declare class ActionsLogsRepository {
    private readonly repository;
    constructor(repository: Repository<ActionsLogs>);
    findAll(): Promise<ActionsLogs[]>;
}
