import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAuthDto, LoginAuthDto, RefreshTokenDto } from './dto/auth.dto';
import { TokenResponse } from './interfaces/jwt-payload.interface';
import { PublicUrl } from 'src/common/decorators/public.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @PublicUrl()
  @ApiOperation({
    summary: 'Register a new user',
    description:
      'Create a new user account with email and password. Returns JWT token.',
  })
  @ApiBody({
    type: RegisterAuthDto,
    description: 'User registration credentials',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: TokenResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input or user already exists',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async register(@Body() registerDto: RegisterAuthDto): Promise<TokenResponse> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @PublicUrl()
  @ApiOperation({
    summary: 'Login user',
    description: 'Authenticate user with credentials and return JWT token.',
  })
  @ApiBody({
    type: LoginAuthDto,
    description: 'Login credentials',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully authenticated',
    type: TokenResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async login(@Body() loginDto: LoginAuthDto): Promise<TokenResponse> {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Refresh access token',
    description: 'Get a new access token using refresh token.',
  })
  @ApiBody({
    type: RefreshTokenDto,
    description: 'Refresh token',
  })
  @ApiResponse({
    status: 200,
    description: 'Token successfully refreshed',
    type: TokenResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or expired token',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async refreshToken(
    @CurrentUser('sub') userId: string,
    @Body('refreshToken') refreshTokenDto: RefreshTokenDto,
  ): Promise<TokenResponse> {
    const token = await Promise.resolve(refreshTokenDto.refreshToken);

    return {
      accessToken: token,
    } as TokenResponse;
    // return this.authService.refreshToken(refreshToken);
  }
}
