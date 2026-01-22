import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class LocationDto {
  @ApiProperty({
    description: 'Latitude of the location',
    example: 37.7749,
  })
  @IsNumber()
  latitude: number;

  @ApiProperty({
    description: 'Longitude of the location',
    example: -122.4194,
  })
  @IsNumber()
  longitude: number;

  @IsOptional()
  id?: string;
}

export class LocationParamDto {
  @ApiProperty({
    description: 'Radius in kilometers',
    example: 5,
  })
  @Transform(({ value }) => Number(value) || 10)
  @IsNumber()
  radiusInKm: number;

  @ApiProperty({
    description: 'Longitude of the location',
    example: -122.4194,
  })
  @Transform(({ value }) => Number(value) || 10)
  @IsNumber()
  longitude: number;

  @ApiProperty({
    description: 'Latitude of the location',
    example: 37.7749,
  })
  @Transform(({ value }) => Number(value) || 10)
  @IsNumber()
  latitude: number;
}
