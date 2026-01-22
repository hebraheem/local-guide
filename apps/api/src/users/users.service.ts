import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, ILike, Repository } from 'typeorm';
import { User, Profile, Role, LocationEntity } from '../database/entities';
import {
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
import { LocationParamDto } from './dto/location.dto';
import { EARTH_RADIUS_IN_KM } from '../common/constants/utils';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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
      {},
      ['profile', 'location'] as FindOptionsRelations<User>,
    );

    return paginateQuery.paginate();
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile', 'location'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.mapUserToResponse(user);
  }

  async findUserByLocation(
    query: ListRequestDto,
    location: LocationParamDto,
  ): Promise<ListResponseDto<UserResponseDto>> {
    const { latitude, longitude, radiusInKm } = location;
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.location', 'location')
      .leftJoinAndSelect('user.profile', 'profile')
      .where(
        `
      (
        ${EARTH_RADIUS_IN_KM} * acos(
          cos(radians(:lat)) * cos(radians(location.latitude)) *
          cos(radians(location.longitude) - radians(:lng)) +
          sin(radians(:lat)) * sin(radians(location.latitude))
        )
      ) <= :radius
      `,
        {
          lat: latitude,
          lng: longitude,
          radius: radiusInKm,
        },
      )
      .andWhere('"user"."deletedAt" IS NULL')
      .skip(skip)
      .take(limit)
      .getMany();

    const total = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.location', 'location')
      .where(
        `
    (
      ${EARTH_RADIUS_IN_KM} * acos(
        cos(radians(:lat)) * cos(radians(location.latitude)) *
        cos(radians(location.longitude) - radians(:lng)) +
        sin(radians(:lat)) * sin(radians(location.latitude))
      )
    ) <= :radius
    `,
        {
          lat: latitude,
          lng: longitude,
          radius: radiusInKm,
        },
      )
      .andWhere('"user"."deletedAt" IS NULL')
      .getCount();

    const data = users.map((user) => this.mapUserToResponse(user));
    return {
      data,
      meta: {
        totalRecords: total,
        limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile', 'location', 'profile.address'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.location) {
      // merge: if existing location exists keep its id so save will update; otherwise create a new object
      user.location = {
        ...(user.location ? { id: user.location.id } : {}),
        ...updateUserDto.location,
      } as unknown as LocationEntity;
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
      user.profile = {
        // preserve profile id if exists so cascade updates
        ...(user.profile ? { id: user.profile.id } : {}),
        ...updateUserDto.profile,
        // handle nested address id the same way
        address: updateUserDto.profile.address
          ? {
              ...(user.profile?.address ? { id: user.profile.address.id } : {}),
              ...updateUserDto.profile.address,
            }
          : user.profile?.address,
      } as unknown as Profile;

      // let profile = await this.profileRepository.findOne({
      //   where: { id: user.profile?.id },
      // });
      //
      // if (!profile) {
      //   profile = this.profileRepository.create();
      // }
      // profile.firstName = updateUserDto.profile.firstName ?? profile.firstName;
      // profile.lastName = updateUserDto.profile.lastName ?? profile.lastName;
      // profile.bio = updateUserDto.profile.bio ?? profile.bio;
      // profile.avatarUrl = updateUserDto.profile.avatarUrl ?? profile.avatarUrl;
      // profile.phone = updateUserDto.profile.phone ?? profile.phone;
      // profile.languages = updateUserDto.profile.languages ?? profile.languages;
      // profile.avatarUrl = updateUserDto.profile.avatarUrl ?? profile.avatarUrl;
      // profile.user = user;
      //
      // if (updateUserDto.profile.address) {
      //   if (!profile.address) {
      //     profile.address = {} as AddressDto;
      //   }
      //   profile.address.street =
      //     updateUserDto.profile.address.street ?? profile.address.street;
      //   profile.address.city =
      //     updateUserDto.profile.address.city ?? profile.address.city;
      //   profile.address.state =
      //     updateUserDto.profile.address.state ?? profile.address.state;
      //   profile.address.zipCode =
      //     updateUserDto.profile.address.zipCode ?? profile.address.zipCode;
      //   profile.address.country =
      //     updateUserDto.profile.address.country ?? profile.address.country;
      //   profile.address.latitude =
      //     updateUserDto.profile.address.latitude ?? profile.address.latitude;
      //   profile.address.longitude =
      //     updateUserDto.profile.address.longitude ?? profile.address.longitude;
      //   profile.address.number =
      //     updateUserDto.profile.address.number ?? profile.address.number;
      // }
      // user.profile = await this.profileRepository.save(profile);
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
      location: user.location,
      lastLogin: user.lastLogin,
      profile,
    };
  }
}
