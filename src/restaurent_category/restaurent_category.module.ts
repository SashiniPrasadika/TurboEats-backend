import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RestaurentCategoryService } from './restaurent_category.service';
import { RestaurentCategoryController } from './restaurent_category.controller';

import { RestaurantCategory } from './entities/restaurent_category.entity';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RestaurantCategory,
      Restaurant,
      Category,
    ]),
  ],
  controllers: [RestaurentCategoryController],
  providers: [RestaurentCategoryService],
})
export class RestaurentCategoryModule {}
