import { Role } from '../../database/entities';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsArray()
  @IsOptional()
  roles?: string[];
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsArray()
  @IsOptional()
  roles?: string[];
}

export class UserResponseDto {
  id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isActive: boolean;
  roles: string[];
  avgRating: number;
  reviews: number;
  //profile: UserProfileDto;
  totalHelped: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UserProfileDto {
  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;
}

export class UserDto {
  id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isActive: boolean;
  roles: Role[];
  avgRating: number;
  reviews: number;
  totalHelped: number;
  createdAt: Date;
  updatedAt: Date;
}
