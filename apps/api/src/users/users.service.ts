import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { User, Profile, Tenant, Role } from '../database/entities';
import {
  CreateUserDto,
  SearchAndFilterDto,
  UpdateUserDto,
  UserResponseDto,
} from './dto/user.dto';
import { ProfileDto } from './dto/profile.dto';
import { AddressDto } from './dto/address.dto';
import {
  ListRequestDto,
  ListResponseDto,
} from 'src/common/classes/pagination/pagination.dto';
import { PaginateQuery } from 'src/common/classes/pagination/paginate.class';

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
      profile: {},
      tenantId: tenant.id,
    });

    this.logger.log(`User created: ${user.id}`);
    return this.mapUserToResponse(user);
  }

  async findAll(
    query: ListRequestDto & SearchAndFilterDto,
  ): Promise<ListResponseDto<UserResponseDto>> {
    const { search } = query;
    const where = search
      ? [
          { username: ILike(`%${search}%`) },
          { email: ILike(`%${search}%`) },
          { profile: { firstName: ILike(`%${search}%`) } },
          { profile: { lastName: ILike(`%${search}%`) } },
        ]
      : {};
    if (query.role) {
      if (Array.isArray(where)) {
        where.forEach((condition) => {
          condition['roles'] = ILike(`%${query.role}%`);
        });
      } else {
        where['roles'] = ILike(`%${query.role}%`);
      }
    }
    if (typeof query.isVerified === 'boolean') {
      if (Array.isArray(where)) {
        where.forEach((condition) => {
          condition['isVerified'] = query.isVerified;
        });
      } else {
        where['isVerified'] = query.isVerified;
      }
    }
    const paginateQuery = new PaginateQuery<User, UserResponseDto>(
      this.userRepository,
      query,
      where,
      this.mapUserToResponse.bind(this) as (entity: User) => UserResponseDto,
    );

    return paginateQuery.paginate();
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
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
    if (updateUserDto.profile) {
      let profile = await this.profileRepository.findOne({
        where: { id: user.profile?.id },
      });

      if (!profile) {
        profile = this.profileRepository.create();
      }
      profile.firstName = updateUserDto.profile.firstName ?? profile.firstName;
      profile.lastName = updateUserDto.profile.lastName ?? profile.lastName;
      profile.bio = updateUserDto.profile.bio ?? profile.bio;
      profile.avatarUrl = updateUserDto.profile.avatarUrl ?? profile.avatarUrl;
      profile.phone = updateUserDto.profile.phone ?? profile.phone;
      profile.languages = updateUserDto.profile.languages ?? profile.languages;
      profile.avatarUrl = updateUserDto.profile.avatarUrl ?? profile.avatarUrl;
      profile.user = user;

      if (updateUserDto.profile.address) {
        if (!profile.address) {
          profile.address = {} as AddressDto;
        }
        profile.address.street =
          updateUserDto.profile.address.street ?? profile.address.street;
        profile.address.city =
          updateUserDto.profile.address.city ?? profile.address.city;
        profile.address.state =
          updateUserDto.profile.address.state ?? profile.address.state;
        profile.address.zipCode =
          updateUserDto.profile.address.zipCode ?? profile.address.zipCode;
        profile.address.country =
          updateUserDto.profile.address.country ?? profile.address.country;
        profile.address.latitude =
          updateUserDto.profile.address.latitude ?? profile.address.latitude;
        profile.address.longitude =
          updateUserDto.profile.address.longitude ?? profile.address.longitude;
        profile.address.number =
          updateUserDto.profile.address.number ?? profile.address.number;
      }
      const savedProfile = await this.profileRepository.save(profile);
      user.profile = savedProfile;
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

  private async hashPassword(password: string): Promise<string> {
    const rounds: number = parseInt(
      this.configService.get('auth.bcryptRounds') ?? '10',
    );
    return bcrypt.hash(password, rounds);
  }

  private mapUserToResponse(user: User): UserResponseDto {
    const profile = new ProfileDto();
    profile.firstName = user.profile?.firstName ?? '';
    profile.lastName = user.profile?.lastName ?? '';
    profile.bio = user.profile?.bio;
    profile.avatarUrl = user.profile?.avatarUrl;
    profile.phone = user.profile?.phone ?? '';
    profile.languages = user.profile?.languages ?? [];
    profile.address = new AddressDto();
    profile.address.street = user.profile?.address?.street ?? '';
    profile.address.city = user.profile?.address?.city ?? '';
    profile.address.state = user.profile?.address?.state ?? '';
    profile.address.zipCode = user.profile?.address?.zipCode ?? '';
    profile.address.country = user.profile?.address?.country ?? '';
    profile.address.latitude = user.profile?.address?.latitude;
    profile.address.longitude = user.profile?.address?.longitude;
    profile.address.number = user.profile?.address?.number ?? '';
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
      deletedAt: user.deletedAt,
      profile,
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
