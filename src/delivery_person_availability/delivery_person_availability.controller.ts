import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { DeliveryPersonAvailabilityService } from './delivery_person_availability.service';
import { CreateDeliveryPersonAvailabilityDto } from './dto/create-delivery_person_availability.dto';
import { UpdateDeliveryPersonAvailabilityDto } from './dto/update-delivery_person_availability.dto';

@Controller('delivery-person-availability')
export class DeliveryPersonAvailabilityController {
  constructor(private readonly service: DeliveryPersonAvailabilityService) {}

  @Post()
  create(@Body() createDto: CreateDeliveryPersonAvailabilityDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDto: UpdateDeliveryPersonAvailabilityDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
