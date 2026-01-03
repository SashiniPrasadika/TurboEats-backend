import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  // create restaurant
async create(dto: CreateRestaurantDto): Promise<Restaurant> {
  try {
    const restaurant = this.restaurantRepository.create(dto);
    return await this.restaurantRepository.save(restaurant);
  } catch (error) {
    console.error('Error creating restaurant:', error);
    throw error;
  }
}



  async findAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.find();
  }

  async findOne(id: number): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id },
    });

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id ${id} not found`);
    }

    return restaurant;
  }

  async update(
    id: number,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id },
    });

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id ${id} not found`);
    }

    const updatedRestaurant = this.restaurantRepository.merge(
      restaurant,
      updateRestaurantDto,
    );

    return this.restaurantRepository.save(updatedRestaurant);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.restaurantRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Restaurant with id ${id} not found`);
    }

    return { message: 'Restaurant deleted successfully' };
  }
}
