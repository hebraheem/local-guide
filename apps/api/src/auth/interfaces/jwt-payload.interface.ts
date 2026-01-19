import { ApiProperty } from '@nestjs/swagger';

export interface JwtPayload {
  sub: string;
  username: string;
  iat?: number;
  exp?: number;
}

export class TokenResponse {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Token expiration time',
    example: '7d',
    required: false,
  })
  expiresIn?: string;

  @ApiProperty({
    description: 'Refresh token (if available)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: false,
  })
  refreshToken?: string;
}
