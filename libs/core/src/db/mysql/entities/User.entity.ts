import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserProfile } from './UserProfile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  nickname: string;

  @Column()
  password_hash: string;

  @Column()
  profile_picture: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  is_admin: string;

  @Column()
  create_at: Date;

  @Column()
  update_at: Date;

  @OneToOne(() => UserProfile)
  @JoinColumn()
  profile: UserProfile;
}
