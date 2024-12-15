import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduledTasks } from '../entities/Scheduled_tasks.entity';

@Injectable()
export class ScheduledTaskRepository {
  constructor(
    @InjectRepository(ScheduledTasks)
    private readonly repository: Repository<ScheduledTasks>,
  ) { }
}
