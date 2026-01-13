export class CreateUserAddressDto {
  user_id: number;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  is_default?: boolean;
  latitude?: number;
  longitude?: number;
}
