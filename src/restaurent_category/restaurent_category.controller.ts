import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { RestaurentCategoryService } from './restaurent_category.service';
import { CreateRestaurentCategoryDto } from './dto/create-restaurent_category.dto';

@Controller('restaurent-categories')
export class RestaurentCategoryController {
  constructor(
    private readonly restaurentCategoryService: RestaurentCategoryService,
  ) {}

  /**
   * Assign categories to a restaurant
   * POST /restaurent-categories
   */
  @Post()
  assignCategories(
    @Body() createDto: CreateRestaurentCategoryDto,
  ) {
    return this.restaurentCategoryService.assignCategoriesToRestaurant(
      createDto,
    );
  }

  /**
   * Get all categories for a restaurant
   * GET /restaurent-categories/restaurant/1
   */
  @Get('restaurant/:restaurantId')
  findByRestaurant(
    @Param('restaurantId') restaurantId: string,
  ) {
    return this.restaurentCategoryService.findByRestaurant(
      +restaurantId,
    );
  }

  /**
   * Remove a category from a restaurant
   * DELETE /restaurent-categories/restaurant/1/category/3
   */
  @Delete('restaurant/:restaurantId/category/:categoryId')
  removeCategory(
    @Param('restaurantId') restaurantId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.restaurentCategoryService.removeCategoryFromRestaurant(
      +restaurantId,
      +categoryId,
    );
  }
}
