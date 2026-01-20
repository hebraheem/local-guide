import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/database/entities';

export interface JwtPayload {
  sub: string;
  username: string;
  roles: Role[];
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
    example: '3600',
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
