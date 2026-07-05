# 🚌 Autobuses de Colombia API

![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-database-4169E1?logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-cache-DC382D?logo=redis&logoColor=white)
![License](https://img.shields.io/badge/license-UNLICENSED-lightgrey)

REST API built with **NestJS** that powers [autobusesdecolombia.com](https://www.autobusesdecolombia.com): a public catalog of Colombian buses, their companies, models, photographers and photos, plus a small blog/CMS layer.

**📚 Interactive API docs:** once running, open `/docs` — see [API Documentation](#-api-documentation) below.

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [API documentation](#-api-documentation)
- [Available scripts](#available-scripts)
- [Testing](#testing)
- [Docker](#docker)
- [License](#license)

## Features

- **Vehicles** — browse, filter by category/plate/serial, and register new vehicles with photo upload (Cloudinary).
- **Vehicle photos** — paginated gallery, single-photo lookup, and on-the-fly photo watermarking (author + location) via an external service.
- **Companies, brands, models, vehicle types & transport categories** — the catalog taxonomy behind each vehicle.
- **Photographers** — full CRUD for photo credit management.
- **Posts** — a lightweight blog module with image upload for cover art and inline content images.
- **Search** — free-text search across the catalog.
- **Auth** — JWT-based login/register with HTTP-only cookie sessions.
- **Redis caching** — hot read endpoints (posts, categories, vehicle lists) are cached to cut database load.
- **Contact form** — transactional email via Resend.

## Tech stack

| Layer          | Choice                                   |
| -------------- | ----------------------------------------- |
| Framework      | NestJS 10 (Express platform)              |
| Language       | TypeScript                                |
| Database       | PostgreSQL + TypeORM                      |
| Cache          | Redis (ioredis + `@nestjs/cache-manager`) |
| Auth           | JWT (Passport)                            |
| File storage   | Cloudinary                                |
| Email          | Resend                                    |
| API docs       | `@nestjs/swagger` (OpenAPI) + Scalar UI   |
| Containers     | Docker / Docker Compose                   |

## Project structure

```
src/
├── auth/               # JWT strategy, guards, session verification
├── users/               # Register, login, profile
├── vehicle/             # Vehicle catalog + creation with photo upload
├── vehicle-model/       # Vehicle models
├── vehicle-type/        # Vehicle types (bus, buseta, etc.)
├── vehicle-photo/       # Photo gallery, pagination, watermarking
├── photographer/        # Photo credit management (CRUD)
├── company/             # Transport companies & services
├── brands/               # Vehicle brands
├── country/              # Countries (for international photos)
├── transport-category/   # Transport categories (intermunicipal, etc.)
├── posts/                # Blog module
├── contact/               # Contact form (Resend email)
├── search/                # Free-text search
├── redis/                 # Cache module + manual cache endpoints
├── services/              # Cloudinary & photo watermark clients
├── middleware/             # Response-time middleware
└── main.ts                 # Bootstrap, CORS, validation, Swagger/Scalar setup
```

Each feature module follows the same layout: `*.controller.ts` → `*.service.ts` → `dao/*.dao.ts` → `entities/*.entity.ts`, with request validation in `dto/`.

## Getting started

### Prerequisites

- Node.js 20+
- PostgreSQL and Redis (or just Docker — see [Docker](#docker))

### Install

```bash
git clone https://github.com/Dieghoatc/autobusesdecolombia-mordor.git
cd autobusesdecolombia-mordor
npm install
```

### Configure

Create a `.env` file in the project root (see [Environment variables](#environment-variables)).

### Run

```bash
npm run start:dev      # watch mode
npm run build && npm run start:prod   # production build
```

The API listens on `http://localhost:3001` by default. Open `http://localhost:3001/docs` for the interactive reference.

## Environment variables

| Variable                                              | Used for                                    |
| ------------------------------------------------------ | -------------------------------------------- |
| `NODE_ENV`                                              | `local` \| `staging` \| `production`         |
| `PORT`                                                  | HTTP port (default `3001`)                   |
| `CORS_ORIGIN`                                           | Allowed origin(s) in non-staging environments |
| `PGHOST`, `PGPORT`, `PGUSER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `DATABASE_URL` | Runtime Postgres connection (`app.module.ts`) |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`, `DATABASE_PUBLIC_URL` | Postgres connection used by TypeORM migrations (`src/data-source.ts`) |
| `REDIS_URL` / `REDISHOST`, `REDISPORT`                  | Redis connection (`REDIS_URL` required unless `NODE_ENV=local`) |
| `SECRET_JWT_KEY`                                        | JWT signing secret                            |
| `RESEND_API_KEY`                                        | Transactional email for the contact form      |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Image uploads                |
| `IMAGE_MARK_SERVICE_URL`                                | External service that watermarks vehicle photos |

> Note: the runtime app (`app.module.ts`) and the migration CLI (`data-source.ts`) currently read *different* variable names for the same Postgres connection (`PG*` vs `DB_*`) — set both if you plan to run migrations.

## 📖 API documentation

The API ships with an auto-generated OpenAPI spec, rendered with [Scalar](https://scalar.com):

- **Interactive reference:** `GET /docs`
- **Raw OpenAPI JSON:** `GET /docs-json`

Every controller is grouped by tag (vehicles, vehicle-photos, users, posts, etc.), with request/response schemas generated straight from the DTOs — so the docs stay in sync with the code by construction. File-upload endpoints (photo/post uploads, photo watermarking) are documented as `multipart/form-data` with example fields, and the `users/profile` endpoint documents its Bearer auth requirement.

## Available scripts

| Command                  | Description                          |
| ------------------------- | ------------------------------------- |
| `npm run start:dev`        | Start in watch mode                   |
| `npm run build`             | Compile to `dist/`                    |
| `npm run start:prod`         | Run the compiled build                |
| `npm run lint`                | ESLint with autofix                   |
| `npm run test` / `test:watch` / `test:cov` | Unit tests (Jest)        |
| `npm run test:e2e`              | End-to-end tests                  |
| `npm run migration:generate` / `migration:run` / `migration:revert` | TypeORM migrations |

## Testing

```bash
npm run test        # unit tests
npm run test:e2e     # e2e tests
npm run test:cov      # coverage report
```

## Docker

A full local stack (Postgres, Redis, Adminer, and the API itself) is defined in `docker-compose.yml`:

```bash
docker compose up -d     # start everything
docker compose down       # stop everything
```

- API → `http://localhost:3001`
- Adminer (Postgres UI) → `http://localhost:8080`
- Postgres → `localhost:5432`
- Redis → `localhost:6379`

## License

UNLICENSED — private project.
