import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  restaurant_id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  category: string;

  @Column({ default: true })
  is_available: boolean;

  @Column({ nullable: true })
  preparation_time: number; // in minutes
}
