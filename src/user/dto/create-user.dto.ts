/*import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}*/
/*
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsEnum, IsBoolean, MinLength, MaxLength } from 'class-validator';

export enum UserType {
  CUSTOMER = 'customer',
  RESTAURANT_OWNER = 'restaurant_owner',
  ADMIN = 'admin',
  DELIVERY_PERSON = 'delivery_person'
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phoneNumber?: string;

  @IsOptional()
  @IsEnum(UserType)
  userType?: UserType = UserType.CUSTOMER;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}*/
import { 
  IsEmail, 
  IsNotEmpty, 
  IsString, 
  IsOptional, 
  IsEnum, 
  IsBoolean, 
  MinLength, 
  MaxLength,
  Matches
} from 'class-validator';
import { Transform } from 'class-transformer';

export enum UserType {
  CUSTOMER = 'customer',
  RESTAURANT_OWNER = 'restaurant_owner',
  ADMIN = 'admin',
  DELIVERY_PERSON = 'delivery_person'
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
  })
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Matches(/^[+]?[0-9\s\-()]{10,20}$/, {
    message: 'Phone number must be valid'
  })
  @Transform(({ value }) => value?.trim())
  phoneNumber?: string;

  @IsOptional()
  @IsEnum(UserType)
  userType?: UserType;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true')
  isActive?: boolean;
}