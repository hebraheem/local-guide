import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: jest.Mocked<PrismaService>;
  let jwtService: jest.Mocked<JwtService>;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findFirst: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
            tenant: {
              findFirst: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get(PrismaService) as jest.Mocked<PrismaService>;
    jwtService = module.get(JwtService) as jest.Mocked<JwtService>;
    configService = module.get(ConfigService) as jest.Mocked<ConfigService>;
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'TestPassword123',
      };

      const mockTenant = { id: 'tenant-1', name: 'default', state: 'active' };
      const mockUser = {
        id: 'user-1',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
      };

      prismaService.user.findFirst.mockResolvedValue(null);
      prismaService.tenant.findFirst.mockResolvedValue(mockTenant);
      prismaService.user.create.mockResolvedValue(mockUser as any);
      jwtService.sign.mockReturnValue('token-123');
      configService.get.mockReturnValue('7d');

      const result = await service.register(registerDto);

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('expiresIn');
      expect(prismaService.user.create).toHaveBeenCalled();
    });

    it('should throw error if user already exists', async () => {
      const registerDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'TestPassword123',
      };

      const existingUser = { id: 'user-1', username: 'testuser' };
      prismaService.user.findFirst.mockResolvedValue(existingUser as any);

      await expect(service.register(registerDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('login', () => {
    it('should login user with valid credentials', async () => {
      const loginDto = {
        username: 'testuser',
        password: 'TestPassword123',
      };

      const mockUser = {
        id: 'user-1',
        username: 'testuser',
        email: 'test@example.com',
        password: '$2a$10$... hashedpassword',
      };

      prismaService.user.findUnique.mockResolvedValue(mockUser as any);
      jwtService.sign.mockReturnValue('token-123');
      configService.get.mockReturnValue('7d');

      const result = await service.login(loginDto);

      expect(result).toHaveProperty('accessToken');
      expect(prismaService.user.update).toHaveBeenCalled();
    });

    it('should throw error for invalid username', async () => {
      const loginDto = {
        username: 'nonexistent',
        password: 'password',
      };

      prismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('validateUser', () => {
    it('should return user if exists', async () => {
      const mockUser = {
        id: 'user-1',
        username: 'testuser',
        email: 'test@example.com',
      };

      prismaService.user.findUnique.mockResolvedValue(mockUser as any);

      const result = await service.validateUser('user-1');

      expect(result).toEqual(mockUser);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        select: expect.any(Object),
      });
    });
  });
});
