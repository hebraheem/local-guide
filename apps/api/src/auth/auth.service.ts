import {
  Injectable,
  BadRequestException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { User, Role, Tenant } from '../database/entities';
import { RegisterAuthDto, LoginAuthDto } from './dto/auth.dto';
import { JwtPayload, TokenResponse } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterAuthDto): Promise<TokenResponse> {
    const { username, email, password } = registerDto;
    if (!registerDto.roles || registerDto.roles.length === 0) {
      registerDto.roles = [Role.REQUESTER];
    }
    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await this.hashPassword(password);
    const tenant = await this.getOrCreateDefaultTenant();

    const user = await this.userRepository.save({
      username,
      email,
      password: hashedPassword,
      roles: registerDto.roles as Role[],
      tenant,
      profile: {
        address: {},
      },
      requestsCreated: [],
      requestsAccepted: [],
      ratings: [],
      location: {},
      tenantId: tenant.id,
    });

    this.logger.log(`User registered: ${user.id}`);
    return this.generateTokens(user.id, user.username, user.roles);
  }

  async login(loginDto: LoginAuthDto): Promise<TokenResponse> {
    const { username, password, email } = loginDto;

    const user = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await this.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    user.lastLogin = new Date();
    await this.userRepository.save(user);

    this.logger.log(`User logged in: ${user.id}`);
    return this.generateTokens(user.id, user.username, user.roles);
  }

  private async hashPassword(password: string): Promise<string> {
    const rounds: number = parseInt(
      this.configService.get('auth.bcryptRounds') ?? '10',
      10,
    );
    return bcrypt.hash(password, rounds);
  }

  private async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private generateTokens(
    userId: string,
    username: string,
    role: Role[],
  ): TokenResponse {
    const payload: JwtPayload = { sub: userId, username, roles: role };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('auth.jwtSecret'),
      expiresIn: this.configService.get('auth.jwtExpiresIn'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('auth.jwtRefreshSecret'),
      expiresIn: this.configService.get('auth.jwtRefreshExpiresIn'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Create a default tenant if none exists
   * */
  private async getOrCreateDefaultTenant(): Promise<Tenant> {
    let tenant = await this.tenantRepository.findOne({
      where: { name: 'default' },
    });

    if (!tenant) {
      tenant = await this.tenantRepository.save({
        name: 'default',
        state: 'active',
      });
    }

    return tenant;
  }
}
