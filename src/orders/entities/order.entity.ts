import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_number: string;

  @Column()
  customer_id: number;

  @Column()
  restaurant_id: number;

  @Column()
  delivery_address_id: number;

  @Column({ nullable: true })
  delivery_person_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2 })
  delivery_fee: number;

  @Column('decimal', { precision: 10, scale: 2 })
  tax_amount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total_amount: number;

  @Column()
  payment_method: string;

  @Column({ default: 'pending' })
  payment_status: string;

  @Column({ default: 'pending' })
  status: string;

  @Column({ nullable: true })
  estimated_delivery_time: number; // in minutes
}
