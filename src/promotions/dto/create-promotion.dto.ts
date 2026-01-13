export class CreatePromotionDto {
  code: string;
  description?: string;
  discount_type: string; // "percentage" or "fixed"
  discount_value: number;
  min_order_amount?: number;
  max_discount_amount?: number;
  valid_from: Date;
  valid_until: Date;
  usage_limit?: number;
}
