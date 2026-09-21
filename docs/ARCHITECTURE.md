# Architecture — InnovateProcure

## Overview

InnovateProcure is a three-service monorepo:

1. **`apps/web`** — Next.js 14 (App Router). One codebase serves all four
   role-based portals (Admin, Ministry, Evaluator, Startup) plus the shared
   auth flow, using Next.js route groups so each portal can be developed
   independently without colliding on URL paths.
2. **`apps/api`** — Node.js + Express + TypeScript. The core REST API:
   auth, registrations, problems, sandboxes, evaluations, contracts. Talks
   to PostgreSQL (Neon.tech) via Prisma.
3. **`apps/ai-engine`** — Python + FastAPI. Hosts the AI agents (problem
   formatting, matchmaking, KPI generation, evaluation, contract drafting,
   log-anomaly detection) and the E2B sandbox runner used to execute and
   score startup submissions.

`apps/api` and `apps/ai-engine` are independent services; `apps/web` talks
to both directly (see `lib/api.ts` for the API client, and
`NEXT_PUBLIC_AI_ENGINE_URL` for the AI engine).

## Data flow (high level)

1. A ministry submits a raw problem via `apps/web` → `apps/api` (`POST /problems`).
2. `apps/api` calls `apps/ai-engine`'s `problem_formatter` agent to produce
   a structured problem statement.
3. A sandbox is opened for the problem; the `matchmaking` and
   `kpi_generator` agents identify candidate startups and generate scoring
   KPIs.
4. Startups submit sandbox results, which are executed via the E2B runner
   and scored by the `evaluation` agent, then reviewed by a human evaluator.
5. On a winner being selected, the `contract_drafter` agent drafts the
   contract, IP clause, and milestones for ministry sign-off.

## Source of truth

- **`docs/api.yaml`** — every HTTP endpoint's request/response contract.
- **`database/prisma/schema.prisma`** — every table and field.

Both are described further in `AGENTS.md`.

## Local development

See the root `README.md` for install and run instructions for all three
services.
