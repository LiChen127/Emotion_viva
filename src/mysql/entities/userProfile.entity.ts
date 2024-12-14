import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  user_id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  gender: string;

  @Column()
  age: number;

  @Column()
  location: string;

  @Column()
  introduction: string;

  @Column()
  mood_status: string;
}
