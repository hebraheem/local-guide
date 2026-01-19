import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  appConfig,
  authConfig,
  databaseConfig,
  jwtConfig,
  validationSchema,
} from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env', '.env.production'],
      validationSchema,
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [appConfig, databaseConfig, jwtConfig, authConfig],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class GlobalConfigModule {}
