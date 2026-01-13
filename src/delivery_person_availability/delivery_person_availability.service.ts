import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryPersonAvailability } from './entities/delivery_person_availability.entity';
import { CreateDeliveryPersonAvailabilityDto } from './dto/create-delivery_person_availability.dto';
import { UpdateDeliveryPersonAvailabilityDto } from './dto/update-delivery_person_availability.dto';

@Injectable()
export class DeliveryPersonAvailabilityService {
  constructor(
    @InjectRepository(DeliveryPersonAvailability)
    private availabilityRepository: Repository<DeliveryPersonAvailability>,
  ) {}

  create(createDto: CreateDeliveryPersonAvailabilityDto) {
    const availability = this.availabilityRepository.create(createDto);
    return this.availabilityRepository.save(availability);
  }

  findAll() {
    return this.availabilityRepository.find();
  }

  findOne(id: number) {
    return this.availabilityRepository.findOneBy({ id });
  }

  update(id: number, updateDto: UpdateDeliveryPersonAvailabilityDto) {
    return this.availabilityRepository.update(id, updateDto);
  }

  remove(id: number) {
    return this.availabilityRepository.delete(id);
  }
}
