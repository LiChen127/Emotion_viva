import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ScheduledTasks {
  @PrimaryGeneratedColumn()
  task_id: number;

  @Column()
  rule_id: number;

  @Column()
  scheduled_at: Date;

  @Column()
  status: string;
}
