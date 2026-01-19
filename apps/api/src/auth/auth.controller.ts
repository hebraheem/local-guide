import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto, LoginAuthDto, RefreshTokenDto } from './dto/auth.dto';
import { TokenResponse } from './interfaces/jwt-payload.interface';
import { PublicUrl } from 'src/common/decorators/public.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @PublicUrl()
  async register(@Body() registerDto: RegisterAuthDto): Promise<TokenResponse> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @PublicUrl()
  async login(@Body() loginDto: LoginAuthDto): Promise<TokenResponse> {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @CurrentUser('sub') userId: string,
    @Body('refreshToken') refreshTokenDto: RefreshTokenDto,
  ): Promise<TokenResponse> {
    const token = await Promise.resolve(refreshTokenDto.refreshToken);
    console.log('userId', userId);
    return {
      accessToken: token,
    } as TokenResponse;
    // return this.authService.refreshToken(refreshToken);
  }
}
