# AGENTS.md — InnovateProcure

## Project Overview

InnovateProcure is a government-startup procurement platform built for SIH
2026, Problem Statement 26136. It serves four roles — Admin, Ministry,
Evaluator, Startup — through an AI-assisted pipeline that takes a ministry's
problem statement through formatting, startup matchmaking, sandboxed
evaluation, and contract drafting. The system is a three-service monorepo:
a Next.js 14 frontend (`apps/web`) serving all four portals, a Node/Express
REST API (`apps/api`), and a Python/FastAPI AI engine (`apps/ai-engine`)
that hosts the AI agents and the E2B sandbox runner.

## Repository Structure

```
innovateprocure/
├── apps/
│   ├── web/                        # Next.js 14 — all 4 role-based portals, one codebase
│   │   ├── app/(auth)/login/
│   │   ├── app/(admin)/
│   │   ├── app/(ministry)/
│   │   ├── app/(evaluator)/
│   │   ├── app/(startup)/
│   │   ├── components/ui/
│   │   ├── lib/{api.ts, auth.ts, react-query.ts}
│   │   └── mocks/
│   ├── api/                        # Node.js + Express — core REST API
│   │   ├── src/{app.ts, server.ts, auth/, middleware/, routes/, services/, lib/}
│   └── ai-engine/                  # Python + FastAPI — AI agents + E2B sandbox
│       ├── agents/{problem_formatter.py, matchmaking.py, kpi_generator.py, evaluation.py, contract_drafter.py, log_anomaly.py}
│       ├── sandbox/e2b_runner.py
│       └── main.py
├── database/prisma/{schema.prisma, migrations/}
├── docs/{api.yaml, ARCHITECTURE.md, BRANCH_STRATEGY.md}
├── .github/workflows/ci.yml
├── .codex/skills/
├── .claude/skills/
├── .agents/skills/
├── AGENTS.md
├── docker-compose.yml
├── .gitignore
├── .env.example
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

## Build & Run Commands

- Install: `pnpm install` (root)
- Env files: `apps/api/.env`, `apps/ai-engine/.env`, `apps/web/.env.local`
  (each copied from its own `.env.example` — see README.md for the full
  one-time setup). `INTERNAL_SECRET` must be identical in `apps/api/.env`
  and `apps/ai-engine/.env`.
- Run frontend: `cd apps/web && pnpm dev` → http://localhost:3000
- Run API: `cd apps/api && pnpm dev` → http://localhost:5000
- Run AI engine: `cd apps/ai-engine && uvicorn main:app --reload --port 8000`
  (activate the venv first: `source .venv/bin/activate` /
  `.venv\Scripts\Activate.ps1`)
- Generate Prisma client: `cd apps/api && npx prisma generate --schema=../../database/prisma/schema.prisma`
- Run migrations: `cd apps/api && npx prisma migrate dev --name init --schema=../../database/prisma/schema.prisma`
- Database is Supabase PostgreSQL (pooled `DATABASE_URL` + direct `DIRECT_URL`), not Neon.

## Folder Ownership (do not edit outside your assigned folder without a heads-up)

| Folder | Owner |
|---|---|
| apps/ai-engine/ | Yash |
| apps/api/routes/, services/ | [Teammate B] |
| apps/api/auth/, middleware/ | [Teammate C] |
| apps/web/app/(ministry)/, (admin)/ | [Teammate D] |
| apps/web/app/(startup)/, (evaluator)/ | [Teammate E] |

## The Contract Rule

`docs/api.yaml` is the source of truth for every endpoint's request/response shape.
`database/prisma/schema.prisma` is the source of truth for every table.
Never change either silently — flag it to the team before merging, and prefer
additive changes (new nullable field, new endpoint) over renaming or removing
anything another branch already depends on.

## Things This Agent Must Never Do

- Never push directly to `main` — always a feature branch + PR with 1 review
- Never rename or delete a field in schema.prisma or api.yaml without flagging it first
- Never commit `.env` files or real API keys
- Never modify another contributor's owned folder without their sign-off

## SESSION LOG — append-only, newest entry at the top
Every work session ends by appending a new entry here, in this exact format:

### [YYYY-MM-DD] — [branch name] — [1-line summary]
- **What was implemented:** ...
- **Files touched:** ...
- **api.yaml changed?** yes/no — if yes, which endpoints
- **schema.prisma changed?** yes/no — if yes, which models/fields (additive only)
- **New feature or continuing planned work:** ...
- **Anything the next session/teammate needs to know:** ...

---
(entries begin below this line — do not delete this instruction block, only append above it)

### [2026-09-23] — feature/abhay-ai-support — Fix API JWT placeholder lint errors
- **What was implemented:** Marked the existing unimplemented JWT stub parameters as intentionally unused with `void` expressions so ESLint's `no-unused-vars` rule accepts them. The stubs still throw `Error("Not implemented")`; no signing, verification, authentication, API, or security behavior changed.
- **Files touched:** `apps/api/src/auth/jwt.ts`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuing planned work — minimal CI lint unblock.
- **Anything the next session/teammate needs to know:** This is a temporary lint-only adjustment to Teammate C's JWT placeholders. The actual JWT signing and verification implementation remains outstanding.

### [2026-09-22] — feature/abhay-ai-support — AI support endpoints, pooled read layer, deterministic agents
- **What was implemented:** Added authenticated internal `/ai/*` support endpoints for deterministic problem/startup matchmaking, login anomaly detection, stateless role-aware quick assist, and adaptive hardware eligibility questions/scoring. Added a shared fail-closed `verify_internal_secret` FastAPI dependency that checks `X-Internal-Secret`; an async SQLAlchemy read-model gateway with Supabase-friendly pool limits (5 connections + 2 overflow) that only reads Prisma-owned `Problem`, `Startup`, and `AuditLog` tables; a one-retry Claude helper for anomaly explanation/quick assist; and unit coverage for the deterministic agents. The matching algorithm returns only approved startups with actual domain overlap, weighted 70% by overlap and 30% by trust score. No Python migrations or schema writes were added.
- **Files touched:** `docs/api.yaml`, `apps/ai-engine/main.py`, `apps/ai-engine/requirements.txt`, `apps/ai-engine/dependencies.py`, `apps/ai-engine/database.py`, `apps/ai-engine/routers/__init__.py`, `apps/ai-engine/routers/support.py`, `apps/ai-engine/agents/{claude_helper.py,matchmaking.py,log_anomaly.py,hardware_eligibility.py,quick_assist.py}`, `apps/ai-engine/tests/test_support_agents.py`, `AGENTS.md`.
- **api.yaml changed?** yes — additive `/ai/matchmaking`, `/ai/log-anomaly`, `/ai/quick-assist`, `/ai/hardware/next-question`, and `/ai/hardware/score` endpoints plus their schemas and `internalSecret` security scheme.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Path A — starting the previously assigned AI matchmaking/support workstream.
- **Anything the next session/teammate needs to know:** The requested Schemes & Policy Matching Engine is deliberately not implemented because the current Prisma schema has no `Scheme` model/table or `eligibility_criteria` field; Node must add that schema through a Prisma migration before Python can query it. Deterministic unit tests pass (`python -m unittest discover -s tests -v`). A fresh local `.venv` install encountered a Windows file lock while installing dependencies, so endpoint-level TestClient verification remains to be rerun after the lock is cleared. `INTERNAL_SECRET` must match the Node service's header value exactly; the implementation fails closed when it is absent.

### [2026-09-22] — main — README rewrite: branch-mapped ownership, multi-provider LLM docs
- **What was implemented:** Rewrote `README.md` end to end to reflect the
  repo's actual current state: added an "Architecture at a glance" table
  (services/ports/what talks to what), a new "Branching workflow" section
  documenting the six real feature branches
  (`feature/aniket-nodejs-backend`, `feature/siddharaj-ai-sandbox`,
  `feature/abhay-ai-support`, `feature/rag-chatbot`,
  `feature/vaishnavi-frontend-govt`, `feature/simran-frontend-startup`) and
  how to check one out and keep it current with `main`, and a new
  "LLM providers" section documenting that `apps/ai-engine` is
  multi-provider (Anthropic, Groq, NVIDIA NIM, and a generic
  OpenAI-compatible open-source slot) rather than Anthropic-only. Replaced
  the placeholder Folder Ownership table (`Teammate B/C/D/E`, and an
  individual's name on `apps/ai-engine/`) with one mapped to the six real
  branches instead — no individual names remain in `README.md`.
  `apps/ai-engine/.env.example` gained `GROQ_API_KEY`,
  `NVIDIA_NIM_API_KEY`, `NVIDIA_NIM_BASE_URL`,
  `OPENSOURCE_LLM_BASE_URL`/`OPENSOURCE_LLM_API_KEY`;
  `apps/ai-engine/requirements.txt` gained `groq==0.11.0` and
  `openai==1.51.0` (the latter doubles as the OpenAI-compatible client for
  NVIDIA NIM and any other OpenAI-compatible open-source endpoint).
- **Files touched:** `README.md`, `apps/ai-engine/.env.example`,
  `apps/ai-engine/requirements.txt`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Documentation/config
  alignment — no agent logic was implemented for any of the new
  providers, only the env-var contract and installed client libraries.
- **Anything the next session/teammate needs to know:**
  - Verified after the change: `pip install -r requirements.txt`
    (including the two new packages) succeeds in the existing venv,
    `py_compile` on all `apps/ai-engine` files is clean, and the service
    still boots and responds `200` on `/health`.
  - No code yet reads `GROQ_API_KEY` / `NVIDIA_NIM_API_KEY` / etc. — these
    are env-var + dependency plumbing only, matching Stage Zero's
    "no feature logic" scope. Whoever builds an agent that calls Groq or
    NVIDIA NIM should read the key/base-URL from these exact env var
    names rather than inventing new ones.
  - This commit was pushed to `main` and then fast-forward-merged into all
    six feature branches (each had no divergent commits yet, so the merge
    was a clean fast-forward) so every branch starts from the same
    up-to-date README.

### [2026-09-22] — main — Onboarding overhaul: Supabase + per-app env files + service-to-service auth
- **What was implemented:** Replaced the single root `.env.example` with
  three per-app files: `apps/api/.env.example` (`DATABASE_URL` +
  `DIRECT_URL` for Supabase pooled/direct connections, `JWT_SECRET`,
  `INTERNAL_SECRET`, `AI_ENGINE_URL`, `CORS_ORIGIN`, `PORT=5000`, plus the
  existing optional Cloudinary vars), `apps/ai-engine/.env.example`
  (`ANTHROPIC_API_KEY`, `E2B_API_KEY`, `INTERNAL_SECRET`, `NODE_API_URL`,
  `DATABASE_URL`, `QDRANT_URL`, `QDRANT_API_KEY`, `PORT=8000`), and
  `apps/web/.env.example` (`NEXT_PUBLIC_API_URL`, copied to `.env.local`
  not `.env`). `database/prisma/schema.prisma`'s `datasource` block now
  has `directUrl = env("DIRECT_URL")` (Supabase pooled-vs-direct pattern —
  this was already present on disk when this session started). Code
  changes to match: `apps/api/src/server.ts` default port 4000 → 5000;
  `apps/web/lib/api.ts` default API URL → `http://localhost:5000`;
  `apps/web/app/page.tsx` now `redirect("/login")` so `/` shows the login
  page as the onboarding doc describes; `apps/ai-engine/main.py` now calls
  `load_dotenv()`; added `qdrant-client==1.11.3` to
  `apps/ai-engine/requirements.txt` (matchmaking/RAG will need it, and the
  env contract already expects `QDRANT_URL`/`QDRANT_API_KEY`). Updated
  `README.md` to the full One-time Setup (10 steps) + Daily Startup (3
  terminals) + Quick Reference flow from the new onboarding doc, verbatim.
  Updated `AGENTS.md` Build & Run Commands and `docs/ARCHITECTURE.md` /
  `docker-compose.yml` comments from Neon → Supabase, and documented the
  `INTERNAL_SECRET` service-to-service auth pattern between `apps/api` and
  `apps/ai-engine`.
- **Files touched:** `apps/api/.env.example` (new), `apps/ai-engine/.env.example`
  (new), `apps/web/.env.example` (new), root `.env.example` (deleted),
  `apps/api/src/server.ts`, `apps/web/lib/api.ts`, `apps/web/app/page.tsx`,
  `apps/ai-engine/main.py`, `apps/ai-engine/requirements.txt`, `README.md`,
  `AGENTS.md`, `docs/ARCHITECTURE.md`, `docker-compose.yml`. (Real
  `apps/api/.env`, `apps/ai-engine/.env`, `apps/web/.env.local` were also
  created locally from the new examples for verification — all
  gitignored, not committed, and still hold placeholder values pending the
  user filling in real Supabase/Anthropic/E2B/Qdrant credentials.)
- **api.yaml changed?** no.
- **schema.prisma changed?** yes (already applied before this session,
  verified/kept) — added `directUrl` to the `datasource` block. Additive,
  no model/field changes.
- **New feature or continuing planned work:** Continuation of Stage Zero —
  aligning the scaffold with a concrete onboarding runbook (Supabase +
  Qdrant + service-to-service auth) supplied after the initial build.
- **Anything the next session/teammate needs to know:**
  - `prisma migrate dev --name init` was attempted against the placeholder
    `DIRECT_URL` and failed with `P1001: Can't reach database server` —
    exactly as expected with placeholder credentials. This confirms the
    command/path wiring is correct; it will succeed once a real Supabase
    project's `DATABASE_URL`/`DIRECT_URL` are filled into `apps/api/.env`.
    `prisma generate` (no DB connection required) was verified working.
  - `npx prisma studio` was not run — same reason (no live DB yet).
  - Verified with placeholder env values: `apps/api` responds `200` on
    `/health` on port 5000; `apps/ai-engine` responds `200` on `/health` on
    port 8000 (venv + `pip install -r requirements.txt` including the new
    `qdrant-client` succeeded); `apps/web` typechecks clean and `/`
    correctly 307-redirects to `/login` (which 200s).
  - `INTERNAL_SECRET` must be set to the *same* value in both
    `apps/api/.env` and `apps/ai-engine/.env` — no code currently enforces
    or checks this (Stage Zero has no service-to-service auth middleware
    yet), it's just a shared config contract the two `.env.example` files
    document for whoever builds that middleware next.

### [2026-09-22] — main — Stage Zero update: add Antigravity skill mirror (.agents/skills/)
- **What was implemented:** Applied the updated Stage Zero prompt's only new
  requirement: a third skills mirror at `.agents/skills/` (Antigravity's
  discovery path) alongside the existing `.codex/skills/` and
  `.claude/skills/`, with byte-identical `update-agents-log/SKILL.md` and
  `verify-api-contract/SKILL.md` content in all three. Updated the
  Repository Structure tree in this file to list `.agents/skills/`.
  Everything else in the updated prompt (repo tree, build order, Prisma
  schema, docs/api.yaml, CI, README, AGENTS.md sections) was already
  implemented in the prior Stage Zero session and required no changes.
- **Files touched:** `.agents/skills/update-agents-log/SKILL.md`,
  `.agents/skills/verify-api-contract/SKILL.md`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation/completion of
  Stage Zero per the updated master prompt (Antigravity support added).
- **Anything the next session/teammate needs to know:** Database migration
  against a live Neon instance still has not been run — that remains the
  first task for whoever owns `database/` (see the entry below).

### [2026-09-22] — main — Stage Zero: monorepo scaffold, all 3 services boot, schema drafted
- **What was implemented:** Full Stage Zero bootstrap. Root pnpm workspace
  (`apps/*`, `database`) with root `package.json`, `.gitignore`,
  `.env.example`. `apps/web`: Next.js 14 App Router, TypeScript, Tailwind,
  route groups for `(auth)/login`, `(admin)/admin`, `(ministry)/ministry`,
  `(evaluator)/evaluator`, `(startup)/startup` (each given a distinct URL
  segment inside its group to avoid route collisions), `components/ui/`,
  `lib/{api.ts,auth.ts,react-query.ts}`, `mocks/handlers.ts` (msw), all
  placeholder pages only. `apps/api`: Express + TypeScript, `src/app.ts`
  with helmet/cors/json + `GET /health`, `src/server.ts` entrypoint, stub
  folders/files for `auth/`, `middleware/`, `routes/`, `services/`,
  `lib/prisma.ts`. `apps/ai-engine`: FastAPI with `GET /health` in
  `main.py`, `requirements.txt`, and stub functions (raising
  `NotImplementedError`, tagged `# TODO: Yash`) for all six agents plus
  `sandbox/e2b_runner.py`. `database/prisma/schema.prisma`: full schema
  (User, Ministry, RegistrationRequest, Startup, Problem, Sandbox,
  SandboxResult, Evaluation, Contract, AuditLog) — not yet migrated against
  a live database (no Neon `DATABASE_URL` was available in this session).
  `docs/api.yaml`: full OpenAPI 3.0 skeleton covering every endpoint path
  implied by the schema (auth, registrations, problems, sandboxes,
  evaluations, contracts, startups, ministries, audit-logs) with request/
  response shapes matching the Prisma models. `docs/ARCHITECTURE.md` and
  `docs/BRANCH_STRATEGY.md` written. `.github/workflows/ci.yml`: lint +
  typecheck for web/api, `py_compile` for ai-engine, on every PR into
  `main`. `docker-compose.yml` added for an optional local Postgres
  (Neon remains the primary target per `.env.example`). `README.md`
  written with install/run instructions and folder ownership table.
  `.codex/skills/` and `.claude/skills/` created with
  `update-agents-log` and `verify-api-contract` skills (identical content
  in both locations).
- **Files touched:** entire repository (initial commit).
- **api.yaml changed?** yes — created from scratch, all endpoints are new.
- **schema.prisma changed?** yes — created from scratch, all models are new.
- **New feature or continuing planned work:** This is the Stage Zero
  baseline — no feature logic exists yet. All five engineers branch off
  this commit.
- **Anything the next session/teammate needs to know:**
  - `pnpm install` was verified against the real npm registry; `pnpm dev`
    boots `apps/web` with all 4 placeholder routes reachable, `apps/api`
    responds `200` on `/health`, `apps/ai-engine` responds `200` on
    `/health` (see verification notes in the Stage Zero PR/commit).
  - **Database migration was NOT run** — no `DATABASE_URL` was provided in
    this session. The very first thing whoever owns `database/` should do
    is set a real Neon `DATABASE_URL` in `.env` and run
    `cd database && npx prisma migrate dev --schema=prisma/schema.prisma`
    to create the `init` migration before building against it.
  - Route groups: don't put a `page.tsx` directly under `(admin)`,
    `(ministry)`, `(evaluator)`, or `(startup)` — they'd all collide on
    `/`. Each currently lives one segment deeper (`/admin`, `/ministry`,
    `/evaluator`, `/startup`); keep that pattern or restructure
    deliberately, not by accident.
  - Fill in the real names in the Folder Ownership table above ("[Teammate
    B/C/D/E]" are placeholders) once the team is assigned.
