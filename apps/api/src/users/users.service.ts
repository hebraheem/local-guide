import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { User, Profile, Tenant, Role } from '../database/entities';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
  UserProfileDto,
} from './dto/user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { username, email, password, roles } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.hashPassword(password);
    const tenant = await this.getOrCreateDefaultTenant();

    const user = await this.userRepository.save({
      username,
      email,
      password: hashedPassword,
      roles: (roles as Role[]) || [Role.REQUESTER],
      tenant,
      tenantId: tenant.id,
    });

    this.logger.log(`User created: ${user.id}`);
    return this.mapUserToResponse(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find({
      select: {
        id: true,
        username: true,
        email: true,
        isVerified: true,
        isActive: true,
        roles: true,
        avgRating: true,
        reviews: true,
        totalHelped: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users.map((user) => this.mapUserToResponse(user));
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
      select: {
        id: true,
        username: true,
        email: true,
        isVerified: true,
        isActive: true,
        roles: true,
        avgRating: true,
        reviews: true,
        totalHelped: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.mapUserToResponse(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.username) {
      user.username = updateUserDto.username;
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.roles) {
      user.roles = updateUserDto.roles as Role[];
    }

    const updatedUser = await this.userRepository.save(user);
    this.logger.log(`User updated: ${id}`);

    return this.mapUserToResponse(updatedUser);
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.logger.log(`User deleted: ${id}`);
  }

  async updateProfile(
    id: string,
    profileDto: UserProfileDto,
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const profileData = {
      userId: id,
      bio: profileDto.bio || '',
      firstName: profileDto.firstName || '',
      lastName: profileDto.lastName || '',
      phone: profileDto.phone || '',
      avatarUrl: profileDto.avatarUrl,
    };

    if (user.profile) {
      await this.profileRepository.update({ userId: id }, profileData);
    } else {
      await this.profileRepository.save(profileData);
    }

    this.logger.log(`Profile updated for user: ${id}`);
    return this.findById(id);
  }

  private async hashPassword(password: string): Promise<string> {
    const rounds: number = parseInt(
      this.configService.get('auth.bcryptRounds') ?? '10',
    );
    return bcrypt.hash(password, rounds);
  }

  private mapUserToResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      isVerified: user.isVerified,
      isActive: user.isActive,
      roles: user.roles,
      avgRating: user.avgRating,
      reviews: user.reviews,
      totalHelped: user.totalHelped,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

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
