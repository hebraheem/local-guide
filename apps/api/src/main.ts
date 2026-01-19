import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable CORS
  const corsOrigin: string | undefined = configService.get('app.corsOrigin');
  app.enableCors({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Set API prefix
  const apiPrefix: string | undefined = configService.get('app.apiPrefix');
  const apiVersion: string | undefined = configService.get('app.apiVersion');
  app.setGlobalPrefix(`${apiPrefix}/${apiVersion}`);

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Your Local Guide API')
    .setDescription(
      'Complete API documentation for Your Local Guide - a platform connecting people who need help with those willing to help them.',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
      },
      'bearer',
    )
    .addTag('Health', 'API health and status checks')
    .addTag('Authentication', 'User registration and login endpoints')
    .addTag('Users', 'User management and profile operations')
    .setContact(
      'Your Local Guide Support',
      'https://yourlocalguidе.com',
      'support@yourlocalguide.com',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayOperationId: true,
      showExtensions: true,
      filter: true,
      deepLinking: true,
    },
    customCss: `
      .topbar { display: none; }
      .swagger-ui .topbar { display: none; }
    `,
  });

  // Global pipes and filters
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  // Start server
  const port: number = configService.get('app.port') ?? 3001;
  await app.listen(port, '0.0.0.0');
  const url = await app.getUrl();
  console.log(`Application is running on: ${url}`);
  console.log(`📚 Swagger documentation available at: ${url}/docs`);
}

bootstrap();
