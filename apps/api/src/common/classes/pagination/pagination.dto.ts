import { IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class ListRequestDto {
  @IsOptional()
  @Transform(({ value }) => Number(value) || 1)
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value) || 10)
  @IsNumber()
  @Min(1)
  limit?: number;
}

export class ListResponseDto<T> {
  data: T[];
  meta: {
    totalPages: number;
    currentPage: number;
    limit: number;
    totalRecords: number;
  };
}
