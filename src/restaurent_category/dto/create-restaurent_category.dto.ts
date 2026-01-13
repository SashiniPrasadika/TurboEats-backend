import { IsArray, IsInt } from 'class-validator';

export class CreateRestaurentCategoryDto {
  @IsInt()
  restaurantId: number;

  @IsArray()
  categoryIds: number[];
}
