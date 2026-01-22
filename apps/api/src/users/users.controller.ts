import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import {
  SearchAndFilterDto,
  UpdateUserDto,
  UserResponseDto,
} from './dto/user.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import {
  ListRequestDto,
  ListResponseDto,
} from 'src/common/classes/pagination/pagination.dto';
import { ResponseDto } from 'src/common/classes/success.response';
import { LocationParamDto } from './dto/location.dto';

@ApiTags('Users')
@ApiBearerAuth('bearer')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieve a list of all users in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [UserResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of records per page for pagination',
    example: 10,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search term to filter users',
    example: 'john',
  })
  @ApiQuery({
    name: 'role',
    required: false,
    type: 'enum',
    enum: ['HELPER', 'REQUESTER'],
    description: 'Filter users by role (HELPER or REQUESTER)',
    example: 'HELPER',
  })
  @ApiQuery({
    name: 'isVerified',
    required: false,
    type: Boolean,
    description: 'Filter users by verified status (true or false)',
    example: true,
  })
  async findAll(
    @Query() query: ListRequestDto & SearchAndFilterDto,
  ): Promise<ListResponseDto<UserResponseDto>> {
    return this.usersService.findAll(query);
  }

  @Get('location/:latitude/:longitude/:radiusInKm')
  @ApiOperation({
    summary: 'Find users by location',
    description:
      'Retrieve a list of users within a specified radius of given latitude and longitude.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users by location',
    type: [UserResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiParam({
    name: 'latitude',
    description: 'Latitude of the location',
    example: '37.7749',
  })
  @ApiParam({
    name: 'longitude',
    description: 'Longitude of the location',
    example: '-122.4194',
  })
  @ApiParam({
    name: 'radiusInKm',
    description: 'Radius in kilometers to search for users',
    example: '10',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of records per page for pagination',
    example: 10,
  })
  async findUserByLocation(
    @Query() query: ListRequestDto,
    @Param() location: LocationParamDto,
  ): Promise<ListResponseDto<UserResponseDto>> {
    console.log('location', location);
    return this.usersService.findUserByLocation(query, location);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieve a specific user by their ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'User details',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseDto<UserResponseDto>> {
    return {
      success: true,
      message: 'User found',
      data: await this.usersService.findById(id),
    };
  }

  @Patch('me')
  @ApiOperation({
    summary: 'Update own user profile',
    description: 'Update the profile of the currently authenticated user.',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'User update data',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile updated successfully',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async updateSelf(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser('sub') userId: JwtPayload['sub'],
  ): Promise<ResponseDto<UserResponseDto>> {
    return {
      success: true,
      message: 'User profile updated successfully',
      data: await this.usersService.update(userId, updateUserDto),
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update user',
    description: 'Update user information.',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'User update data',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseDto<UserResponseDto>> {
    return {
      success: true,
      message: 'User updated successfully',
      data: await this.usersService.update(id, updateUserDto),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete a user account permanently.',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'User deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async remove(@Param('id') id: string): Promise<ResponseDto<null>> {
    await this.usersService.delete(id);
    return {
      success: true,
      message: 'User deleted successfully',
      data: null,
    };
  }
}
