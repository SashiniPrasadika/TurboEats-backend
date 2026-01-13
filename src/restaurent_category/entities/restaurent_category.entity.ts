import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { Category } from '../../categories/entities/category.entity';
@Entity('restaurant_categories')
export class RestaurantCategory {

  @PrimaryColumn()
  restaurant_id: number;

  @PrimaryColumn()
  category_id: number;

  // 🔗 Relation to Restaurant
  @ManyToOne(() => Restaurant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  // 🔗 Relation to Category
  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
