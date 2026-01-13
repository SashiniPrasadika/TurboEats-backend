export class CreateReviewDto {
  order_id: number;
  customer_id: number;
  restaurant_id: number;
  delivery_person_id?: number;
  food_rating: number;
  delivery_rating: number;
  comment?: string;
}
