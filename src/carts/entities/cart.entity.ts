import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  restaurant_id: number;
}
