import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DeliveryPersonAvailability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  delivery_person_id: number;

  @Column({ default: true })
  is_available: boolean;

  @Column('decimal', { precision: 10, scale: 7, nullable: true })
  current_latitude: number;

  @Column('decimal', { precision: 10, scale: 7, nullable: true })
  current_longitude: number;
}
