# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo build

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)

# 🚀 API Quick Start Guide

## One-Command Setup (with Docker)

```bash
cd apps/api
npm run docker:up
```

This starts both PostgreSQL and the NestJS API. Access it at `http://localhost:3001/api/v1`

## Manual Setup (without Docker)

### Step 1: Install Dependencies

```bash
cd apps/api
npm install
```

### Step 2: Setup PostgreSQL

Make sure PostgreSQL is running locally or remote. Update `.env.local` with connection string.

### Step 3: Generate Prisma Client

```bash
npx prisma generate
```

### Step 4: Run Migrations

```bash
npm run migrate:dev
```

### Step 5: Start Dev Server

```bash
npm run dev
```

Server runs on `http://localhost:3001/api/v1`

---

## Test the API

### 1. Health Check

```bash
curl http://localhost:3001/api/v1/health
```

### 2. Register New User

```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test@Pass123"
  }'
```

Copy the `accessToken` from response.

### 3. Get All Users (use token from registration)

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  http://localhost:3001/api/v1/users
```

### 4. Login

```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "Test@Pass123"
  }'
```

---

## Run Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

---

## Project Files Created

### Configuration

- `src/config/config.ts` - Joi validation schema & config registration
- `src/config/config.module.ts` - Global config module

### Authentication

- `src/auth/auth.service.ts` - JWT & password handling
- `src/auth/auth.controller.ts` - Register & login endpoints
- `src/auth/auth.module.ts` - Auth module setup
- `src/auth/strategies/jwt.strategy.ts` - Passport JWT strategy
- `src/auth/guards/jwt-auth.guard.ts` - JWT authentication guards
- `src/auth/interfaces/jwt-payload.interface.ts` - Interfaces
- `src/auth/dto/auth.dto.ts` - DTOs

### Users Module

- `src/users/users.service.ts` - User CRUD operations
- `src/users/users.controller.ts` - User endpoints
- `src/users/users.module.ts` - Users module
- `src/users/dto/user.dto.ts` - User DTOs

### Common Utilities

- `src/common/filters/all-exceptions.filter.ts` - Global exception handler
- `src/common/interceptors/response.interceptor.ts` - Response logging
- `src/common/pipes/validation.pipe.ts` - Global validation
- `src/common/decorators/current-user.decorator.ts` - @CurrentUser
- `src/common/guards/` - Auth guards

### Health Check

- `src/health/health.controller.ts` - Health endpoint
- `src/health/health.module.ts` - Health module

### Tests

- `src/auth/auth.service.spec.ts` - Auth tests
- `src/users/users.service.spec.ts` - Users tests
- `test/auth.e2e-spec.ts` - E2E tests

### Configuration Files

- `.env.local` - Development environment (PORT: 3001)
- `Dockerfile` - Production Docker image
- `.dockerignore` - Docker build optimization
- `docker-compose.yml` - Multi-service setup

### CI/CD

- `.github/workflows/api-test.yml` - Test & lint workflow
- `.github/workflows/docker-build.yml` - Docker build workflow

### Documentation

- `README_PRODUCTION_SETUP.md` - Comprehensive setup guide
- `API_SETUP_COMPLETE.md` - Complete implementation details

---

## Environment Configuration

### Development (.env.local)

```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/app_db?schema=public
JWT_SECRET=dev_secret_key_change_this_in_production_must_be_32_chars_min
JWT_EXPIRATION=7d
BCRYPT_ROUNDS=10
```

### Production (.env)

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@prod-db:5432/app_db
JWT_SECRET=<generate-secure-random-32+-chars>
JWT_EXPIRATION=7d
BCRYPT_ROUNDS=12
CORS_ORIGIN=https://yourdomain.com
LOG_LEVEL=info
```

---

## Key Features

✅ **Authentication**: JWT + Passport with Bcrypt passwords
✅ **Database**: Prisma ORM with PostgreSQL
✅ **Validation**: Class-validator with DTOs
✅ **Security**: CORS, helmet-ready, input sanitization
✅ **Error Handling**: Global exception filter
✅ **Logging**: Structured logging with levels
✅ **Testing**: Jest with unit & E2E tests
✅ **Docker**: Multi-stage build, docker-compose
✅ **CI/CD**: GitHub Actions workflows
✅ **Config**: Joi validation, environment-based

---

## Available Commands

```bash
# Development
npm run dev                    # Start dev server with watch

# Production
npm run build                  # Build for production
npm run start:prod            # Run production build

# Testing
npm run test                  # Run tests once
npm run test:watch           # Watch mode
npm run test:cov             # Coverage report
npm run test:e2e             # E2E tests

# Database
npm run migrate:dev           # Run migrations in dev
npm run migrate:deploy        # Deploy migrations
npm run migrate:reset         # Reset database (dev only)
npm run db:push              # Push schema to DB
npm run db:studio            # Prisma Studio

# Code Quality
npm run lint                  # Lint with fix
npm run format                # Format with Prettier

# Docker
npm run docker:up             # Start all services
npm run docker:down           # Stop all services
npm run docker:logs           # View logs
npm run docker:rebuild        # Rebuild everything
```

---

## API Endpoints Summary

| Method | Endpoint                    | Auth | Description    |
| ------ | --------------------------- | ---- | -------------- |
| GET    | `/api/v1/health`            | No   | Health check   |
| POST   | `/api/v1/auth/register`     | No   | Register user  |
| POST   | `/api/v1/auth/login`        | No   | Login user     |
| GET    | `/api/v1/users`             | Yes  | List users     |
| GET    | `/api/v1/users/:id`         | Yes  | Get user       |
| POST   | `/api/v1/users`             | No   | Create user    |
| PATCH  | `/api/v1/users/:id`         | Yes  | Update user    |
| DELETE | `/api/v1/users/:id`         | Yes  | Delete user    |
| PATCH  | `/api/v1/users/:id/profile` | Yes  | Update profile |

---

## Next Steps

1. **Setup Database**: Start PostgreSQL (Docker or local)
2. **Run API**: `npm run dev`
3. **Test Endpoints**: Use curl or Postman
4. **Run Tests**: `npm run test`
5. **Deploy**: Follow production checklist in README_PRODUCTION_SETUP.md

---

## Need Help?

Check:

1. `README_PRODUCTION_SETUP.md` - Full documentation
2. `API_SETUP_COMPLETE.md` - Implementation details
3. Logs: `npm run docker:logs`
4. Tests: Run unit/e2e tests for examples

---

**Ready to go! 🎉**
