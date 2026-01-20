import { HttpException, HttpStatus } from '@nestjs/common';

export class PaginationOutOfBound extends HttpException {
  constructor(message?: string) {
    super(
      message || 'Page number exceeds total pages available',
      HttpStatus.BAD_REQUEST,
    );
    this.name = 'PaginationOutOfBound';
  }
}
