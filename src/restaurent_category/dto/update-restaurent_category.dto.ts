import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurentCategoryDto } from './create-restaurent_category.dto';

export class UpdateRestaurentCategoryDto extends PartialType(CreateRestaurentCategoryDto) {}
