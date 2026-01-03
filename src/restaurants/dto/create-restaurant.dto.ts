import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsNumber()
  owner_id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  cuisine_type: string;

  @IsString()
  phone_number: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  postal_code: string;

  @IsOptional()
  latitude?: number;

  @IsOptional()
  longitude?: number;

  @IsNumber()
  estimated_delivery_time: number;

  @IsOptional()
  opening_time?: string;

  @IsOptional()
  closing_time?: string;

  @IsOptional()
  image_url?: string;
}
