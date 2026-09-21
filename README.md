# InnovateProcure

A government-startup procurement platform built for SIH 2026, Problem
Statement 26136. It connects ministries with startups through an AI-assisted
pipeline: problem formatting → matchmaking → sandboxed evaluation → contract
drafting, across four roles — Admin, Ministry, Evaluator, and Startup.

See `docs/ARCHITECTURE.md` for the full system design and `AGENTS.md` for
the living project log every session appends to.

## Install

From the repo root:

```bash
pnpm install
```

This installs `apps/web`, `apps/api`, and `database` (all pnpm workspace
packages). `apps/ai-engine` is Python and installed separately:

```bash
cd apps/ai-engine
python -m venv .venv
.venv\Scripts\activate   # Windows; use `source .venv/bin/activate` on macOS/Linux
pip install -r requirements.txt
```

Copy `.env.example` to `.env` in the repo root and fill in real values
(Neon.tech `DATABASE_URL`, JWT secret, API keys). Each app reads from this
shared `.env`.

## Run

| Service | Command | URL |
|---|---|---|
| Web (all 4 portals) | `cd apps/web && pnpm dev` | http://localhost:3000 |
| API | `cd apps/api && pnpm dev` | http://localhost:4000 |
| AI engine | `cd apps/ai-engine && uvicorn main:app --reload` | http://localhost:8000 |

Run database migrations:

```bash
cd database
npx prisma migrate dev --schema=prisma/schema.prisma
```

Browse the database:

```bash
cd database
npx prisma studio --schema=prisma/schema.prisma
```

## Folder ownership

| Folder | Owner |
|---|---|
| `apps/ai-engine/` | Yash |
| `apps/api/routes/`, `apps/api/services/` | Teammate B |
| `apps/api/auth/`, `apps/api/middleware/` | Teammate C |
| `apps/web/app/(ministry)/`, `apps/web/app/(admin)/` | Teammate D |
| `apps/web/app/(startup)/`, `apps/web/app/(evaluator)/` | Teammate E |

## Contract rule

`docs/api.yaml` and `database/prisma/schema.prisma` are the source of truth
for every endpoint and table. See `AGENTS.md` for the full rules before
changing either.
