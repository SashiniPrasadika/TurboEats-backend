/*import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
*/
/*
import { 
  IsEmail, IsString, IsOptional, 
  IsEnum, IsBoolean, MinLength, MaxLength, Matches 
} from 'class-validator';
import { Transform } from 'class-transformer';
import { UserType } from './create-user.dto';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Matches(/^[+]?[0-9\s\-()]{10,20}$/, {
    message: 'Phone number must be valid'
  })
  phoneNumber?: string;

  @IsOptional()
  @IsEnum(UserType)
  userType?: UserType;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  // NO PASSWORD FIELD HERE
}*/
import { 
  IsEmail, 
  IsString, 
  IsOptional, 
  IsEnum, 
  IsBoolean, 
  MinLength, 
  MaxLength, 
  Matches,
  ValidateIf
} from 'class-validator';
import { Transform } from 'class-transformer';
import { UserType } from './create-user.dto';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email?: string;

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
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  isActive?: boolean;
}