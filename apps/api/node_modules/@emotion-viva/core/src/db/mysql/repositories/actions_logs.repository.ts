import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActionsLogs } from '../entities/Actions_logs.enity';

@Injectable()
export class ActionsLogsRepository {
  constructor(
    @InjectRepository(ActionsLogs)
    private readonly repository: Repository<ActionsLogs>,
  ) { }

  async findAll(): Promise<ActionsLogs[]> {
    return this.repository.find();
  }
}
