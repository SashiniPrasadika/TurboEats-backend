export class CreateDeliveryPersonAvailabilityDto {
  delivery_person_id: number;
  is_available?: boolean;
  current_latitude?: number;
  current_longitude?: number;
}
