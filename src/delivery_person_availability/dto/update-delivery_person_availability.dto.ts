import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryPersonAvailabilityDto } from './create-delivery_person_availability.dto';

export class UpdateDeliveryPersonAvailabilityDto extends PartialType(CreateDeliveryPersonAvailabilityDto) {}
