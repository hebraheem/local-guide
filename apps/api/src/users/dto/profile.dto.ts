import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AddressDto } from './address.dto';

export class ProfileDto {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    minLength: 1,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    minLength: 1,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  lastName: string;

  @ApiProperty({
    description: 'Bio of the user',
    example: 'A short bio about John Doe.',
    maxLength: 500,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  bio?: string;

  @ApiProperty({
    description: 'Profile picture URL',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  avatarUrl?: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1234567890',
    minLength: 7,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Languages spoken by the user',
    example: ['English', 'Spanish'],
    required: false,
  })
  @IsString({ each: true })
  @IsOptional()
  languages: string[];

  @ApiProperty({
    description: 'Address of the user',
    type: AddressDto,
    required: false,
  })
  address: Partial<AddressDto>;
}
