# Architecture — Sticky Notes

## Stack

| Part | Choice | Why |
|---|---|---|
| Frontend | Next.js 15 App Router, TypeScript, Tailwind v3 | Required UI stack; standalone output fits committed image. |
| Backend | Go 1.25, `net/http`, `database/sql`, pgx | Existing Docker image uses Go 1.25; stdlib HTTP avoids framework. |
| Database | PostgreSQL 16 | Persistent `notes` data required by SRS. |

## Layout

```text
code/backend/cmd/api/main.go      server and migration boot
code/backend/migrations/          ordered SQL migrations
code/frontend/app/                App Router shell and frozen shared CSS
code/frontend/components/         one default-export component per story
code/frontend/lib/mock/           temporary UI fixtures; delete with API wiring
```

## Contracts and conventions

- Backend reads `DATABASE_URL`, applies ordered migrations once, then serves. `/healthz` returns 200 only after migration and database probe succeed.
- Future API and schema details belong in `erd.md` and `services.md`; scaffold exposes no product endpoints.
- Backend JSON uses lower snake_case fields. SQL uses parameterized queries. Validate request input at HTTP boundary.
- Frontend `app/page.tsx` remains server composition root. Interactive story components begin with literal first line `"use client"` and default-export PascalCase component.
- Notes module stories own only component, CSS module, mock, and one page mount line. Do not edit `globals.css` in stories.
- CSS modules use only tokens from `app/globals.css`; no fallback values in `var()`.

## Decisions

| Decision | Rejected | Tradeoff |
|---|---|---|
| Self-migrate during backend boot | Manual migration step | Startup depends on DB, but runtime starts with empty DB. |
| pgx stdlib driver | ORM | Small single-table scope needs no ORM; SQL remains explicit. |
| One frontend composition root | Per-story page rewrites | Slightly plain scaffold; parallel story diffs stay small. |

## Environment

| Service | Keys |
|---|---|
| Backend | `DATABASE_URL`, `PORT`, optional `APP_PORT` fallback |
| Frontend | `NEXT_PUBLIC_API_URL`, `API_ORIGIN` |
| Compose | `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, port and resource overrides |

All tracked `.env.example` files name keys with comments. Never commit `.env`.

## Run and checks

Run `docker compose --profile local up --build` from repository root. Open `http://localhost:3000`; backend health is `http://localhost:8080/healthz`.

CI at `.github/workflows/ci.yml` runs Go build/vet/test, frontend install/lint/build/test, and token checks on pull requests. Committed Dockerfiles, Compose, and workflow files are compatibility constraints and remain untouched.

## Rollout and unknowns

Migrations are filename-ordered and recorded in `schema_migrations`; add paired up/down SQL for every future schema change. No data migration risk before first note feature. API error envelope and endpoints await service design.
