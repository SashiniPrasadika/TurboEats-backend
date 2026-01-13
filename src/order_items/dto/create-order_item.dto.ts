export class CreateOrderItemDto {
  order_id: number;
  menu_item_id: number;
  quantity: number;
  unit_price: number;
  special_instructions?: string;
}
