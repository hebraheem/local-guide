import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  User,
  Profile,
  Request,
  RequestLocation,
  Category,
  Location,
  Chat,
  Message,
  Payment,
  Rating,
  Tenant,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const isProduction = configService.get('app.isProduction') as boolean;

        return {
          type: 'postgres',
          url: configService.get<string>('database.url'),
          host: configService.get('database.host') || 'localhost',
          port: configService.get('database.port') || 5432,
          // username: configService.get('database.username') || 'postgres',
          // password: configService.get('database.password') || 'postgres',
          database: configService.get('database.name'),
          autoLoadEntities: true,
          synchronize: !isProduction, // Auto-sync in dev, false in prod
          logging: !isProduction ? ['query', 'error'] : ['error'],
          dropSchema: false,
          migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
          migrationsRun: isProduction, // Run migrations on startup in prod
          ssl: isProduction ? { rejectUnauthorized: false } : false,
        };
      },
    }),
    TypeOrmModule.forFeature([
      User,
      Profile,
      Request,
      RequestLocation,
      Category,
      Location,
      Chat,
      Message,
      Payment,
      Rating,
      Tenant,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
