import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProfileDto } from './profile.dto';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username for the account',
    example: 'john_doe',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  username: string;

  @ApiProperty({
    description: 'Email address',
    example: 'john@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password (minimum 8 characters)',
    example: 'SecurePassword123',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'User roles',
    example: ['REQUESTER'],
    isArray: true,
    required: false,
  })
  @IsArray()
  @IsOptional()
  roles?: string[];
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'Updated username',
    example: 'jane_doe',
    minLength: 3,
    maxLength: 100,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  username?: string;

  @ApiProperty({
    description: 'Updated email address',
    example: 'jane@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Updated user roles',
    example: ['HELPER', 'REQUESTER'],
    isArray: true,
    required: false,
  })
  @IsArray()
  @IsOptional()
  roles?: string[];

  @ApiProperty({
    description: 'Updated profile information',
    required: false,
  })
  @IsOptional()
  profile?: Partial<ProfileDto>;
}

export class UserResponseDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Username',
    example: 'john_doe',
  })
  username: string;

  @ApiProperty({
    description: 'Email address',
    example: 'john@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Whether email is verified',
    example: false,
  })
  isVerified: boolean;

  @ApiProperty({
    description: 'Whether account is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'User roles',
    example: ['REQUESTER'],
    isArray: true,
  })
  roles: string[];

  @ApiProperty({
    description: 'Average rating',
    example: 4.5,
  })
  avgRating: number;

  @ApiProperty({
    description: 'Total number of reviews',
    example: 10,
  })
  reviews: number;

  @ApiProperty({
    description: 'Total number of people helped',
    example: 15,
  })
  totalHelped: number;

  @ApiProperty({
    description: 'Account creation date',
    example: '2026-01-19T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last account update date',
    example: '2026-01-19T12:00:00Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Updated profile information',
    required: false,
    type: ProfileDto,
  })
  @IsOptional()
  profile?: Partial<ProfileDto>;
}
