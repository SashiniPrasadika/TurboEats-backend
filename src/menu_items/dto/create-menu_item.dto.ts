export class CreateMenuItemDto {
  restaurant_id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  is_available?: boolean;
  preparation_time?: number;
}
