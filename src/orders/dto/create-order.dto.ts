export class CreateOrderDto {
  order_number: string;
  customer_id: number;
  restaurant_id: number;
  delivery_address_id: number;
  delivery_person_id?: number;
  subtotal: number;
  delivery_fee: number;
  tax_amount: number;
  total_amount: number;
  payment_method: string;
  payment_status?: string;
  status?: string;
  estimated_delivery_time?: number;
}
