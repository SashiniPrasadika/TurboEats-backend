import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import {InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly CategoryRepository: Repository<Category>,

  ){}

  //create category
 async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
  const newCategory = this.CategoryRepository.create(createCategoryDto);
  return await this.CategoryRepository.save(newCategory);
}

  async findAll(): Promise<Category[]> {
  return this.CategoryRepository.find();
}

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }
  async update(
  id: number,
  updateCategoryDto: UpdateCategoryDto,
): Promise<Category> {
  const category = await this.CategoryRepository.findOne({
    where: { id },
  });

  if (!category) {
    throw new NotFoundException(`Category with id ${id} not found`);
  }

  const updatedCategory = this.CategoryRepository.merge(
    category,
    updateCategoryDto,
  );

  return this.CategoryRepository.save(updatedCategory);
}
  /*update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }*/

 // remove(id: number) {
  //  return `This action removes a #${id} category`;
  //}
  async remove(id: number): Promise<{ message: string }> {
  const result = await this.CategoryRepository.delete(id);

  if (result.affected === 0) {
    throw new NotFoundException(`Category with id ${id} not found`);
  }

  return { message: 'Category deleted successfully' };
}

}
