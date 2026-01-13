import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_id: number;

  @Column()
  customer_id: number;

  @Column()
  restaurant_id: number;

  @Column({ nullable: true })
  delivery_person_id: number;

  @Column('int')
  food_rating: number;

  @Column('int')
  delivery_rating: number;

  @Column({ nullable: true })
  comment: string;
}
