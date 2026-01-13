import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cart_id: number;

  @Column()
  menu_item_id: number;

  @Column('int')
  quantity: number;

  @Column({ nullable: true })
  special_instructions: string;
}
