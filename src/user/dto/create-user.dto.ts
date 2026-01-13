import { IsEmail, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password_hash: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsOptional()
  phone_number?: string;

  @IsNotEmpty()
  user_type: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
