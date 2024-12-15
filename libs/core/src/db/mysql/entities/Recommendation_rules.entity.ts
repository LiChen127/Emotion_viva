import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RecommendationRules {
  @PrimaryGeneratedColumn()
  rule_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  create_at: Date;

  @Column()
  update_at: Date;
}
