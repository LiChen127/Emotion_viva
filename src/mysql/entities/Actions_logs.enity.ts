import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ActionsLogs {
  @PrimaryGeneratedColumn()
  log_id: number;

  @Column()
  user_id: number;

  @Column()
  action_type: string;

  @Column()
  timestamp: Date;

  @Column()
  details: string;
}
