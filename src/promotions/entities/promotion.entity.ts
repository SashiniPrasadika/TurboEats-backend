import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  discount_type: string; // e.g., "percentage" or "fixed"

  @Column('decimal', { precision: 10, scale: 2 })
  discount_value: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  min_order_amount: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  max_discount_amount: number;

  @Column('timestamp')
  valid_from: Date;

  @Column('timestamp')
  valid_until: Date;

  @Column({ default: 1 })
  usage_limit: number;

  @Column({ default: 0 })
  times_used: number;
}
