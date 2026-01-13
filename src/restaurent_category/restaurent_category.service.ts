import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RestaurantCategory } from './entities/restaurent_category.entity';
import { CreateRestaurentCategoryDto } from './dto/create-restaurent_category.dto';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class RestaurentCategoryService {
  constructor(
    @InjectRepository(RestaurantCategory)
    private readonly restaurentCategoryRepo: Repository<RestaurantCategory>,

    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  /**
   * Assign multiple categories to a restaurant
   */
  async assignCategoriesToRestaurant(
    dto: CreateRestaurentCategoryDto,
  ) {
    const { restaurantId, categoryIds } = dto;

    // 1️⃣ Check restaurant exists
    const restaurant = await this.restaurantRepo.findOne({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    // 2️⃣ Check categories exist
    const categories = await this.categoryRepo.findByIds(categoryIds);

    if (categories.length !== categoryIds.length) {
      throw new NotFoundException('One or more categories not found');
    }

    // 3️⃣ Create mapping records
    const mappings = categoryIds.map((categoryId) =>
      this.restaurentCategoryRepo.create({
        restaurant_id: restaurantId,
        category_id: categoryId,
      }),
    );

    // 4️⃣ Save all
    return this.restaurentCategoryRepo.save(mappings);
  }

  /**
   * Get categories by restaurant
   */
  async findByRestaurant(restaurantId: number) {
    return this.restaurentCategoryRepo.find({
      where: { restaurant_id: restaurantId },
      relations: ['category'],
    });
  }

  /**
   * Remove ONE category from a restaurant
   */
  async removeCategoryFromRestaurant(
    restaurantId: number,
    categoryId: number,
  ) {
    const result = await this.restaurentCategoryRepo.delete({
      restaurant_id: restaurantId,
      category_id: categoryId,
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        'Restaurant–Category relation not found',
      );
    }

    return {
      message: 'Category removed from restaurant successfully',
    };
  }
}
