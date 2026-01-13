import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryPersonAvailabilityService } from './delivery_person_availability.service';
import { DeliveryPersonAvailabilityController } from './delivery_person_availability.controller';
import { DeliveryPersonAvailability } from './entities/delivery_person_availability.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryPersonAvailability])],
  controllers: [DeliveryPersonAvailabilityController],
  providers: [DeliveryPersonAvailabilityService],
})
export class DeliveryPersonAvailabilityModule {}
