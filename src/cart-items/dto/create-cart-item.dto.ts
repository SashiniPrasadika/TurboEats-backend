export class CreateCartItemDto {
  cart_id: number;
  menu_item_id: number;
  quantity: number;
  special_instructions?: string;
}
