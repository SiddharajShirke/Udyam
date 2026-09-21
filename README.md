# Udyam

A government-startup procurement platform built for SIH 2026, Problem
Statement 26136. It connects ministries with startups through an
AI-assisted pipeline: problem formatting → startup matchmaking → sandboxed
evaluation → contract drafting, across four roles — Admin, Ministry,
Evaluator, and Startup.

See `docs/ARCHITECTURE.md` for the full system design and `AGENTS.md` for
the living project log every session appends to.

## Architecture at a glance

Three independent services, one monorepo:

| Service | Stack | Port | Talks to |
|---|---|---|---|
| `apps/web` | Next.js 14 (App Router) | 3000 | `apps/api` |
| `apps/api` | Node.js + Express + TypeScript | 5000 | Supabase PostgreSQL, `apps/ai-engine` |
| `apps/ai-engine` | Python + FastAPI | 8000 | Supabase PostgreSQL, Qdrant, LLM providers, `apps/api` |

- **Database:** Supabase PostgreSQL, accessed via Prisma
  (`database/prisma/schema.prisma`). A pooled connection (`DATABASE_URL`,
  via `pgbouncer`) is used at runtime; a direct connection (`DIRECT_URL`)
  is used for migrations.
- **Vector store:** Qdrant, used by the matchmaking/RAG agents for
  similarity search over startup and problem-statement embeddings.
- **LLM providers:** the AI engine is multi-provider by design — see
  [LLM providers](#llm-providers) below.
- **Service-to-service auth:** `apps/api` and `apps/ai-engine` share a
  single `INTERNAL_SECRET` value (set identically in both `.env` files) to
  authenticate requests between them. `apps/api` calls `apps/ai-engine` via
  `AI_ENGINE_URL`; `apps/ai-engine` calls back into `apps/api` via
  `NODE_API_URL`.
- **Contract sources of truth:** `docs/api.yaml` (every endpoint's
  request/response shape) and `database/prisma/schema.prisma` (every
  table). Never change either silently — see `AGENTS.md`.

## Branching workflow

`main` is always deployable — nobody pushes directly to it. Six feature
branches currently exist, each already pushed to `origin` and branched
straight off `main`:

| Branch | Area |
|---|---|
| `feature/aniket-nodejs-backend` | `apps/api` — Node.js/Express backend |
| `feature/siddharaj-ai-sandbox` | `apps/ai-engine/sandbox` — E2B sandbox execution |
| `feature/abhay-ai-support` | `apps/ai-engine/agents` — AI agent support work |
| `feature/rag-chatbot` | RAG-based chatbot (spans `apps/ai-engine` + `apps/web`) |
| `feature/vaishnavi-frontend-govt` | `apps/web` — government-facing portals (Admin, Ministry, Evaluator) |
| `feature/simran-frontend-startup` | `apps/web` — startup-facing portal |

To pick up your branch:

```bash
git fetch origin
git checkout <your-branch-name>
```

Keep it current with `main` as `main` moves:

```bash
git checkout main
git pull origin main
git checkout <your-branch-name>
git merge main
```

Open a PR back into `main` when your work is ready — see
`docs/BRANCH_STRATEGY.md` for naming, review, and pre-PR checklist rules
(including the `verify-api-contract` skill, required any time you touch an
endpoint).

## One-time setup

### Step 1 — Confirm prerequisites are installed

```bash
node --version      # expect v20.x
pnpm --version       # if missing: npm install -g pnpm
python3 --version    # expect 3.11.x
git --version
```

### Step 2 — Get the repo

```bash
git clone <your-repo-url>
cd udyam
```

### Step 3 — Install Node dependencies (covers apps/web and apps/api in one shot)

```bash
pnpm install
```

This installs `apps/web`, `apps/api`, and `database` (all pnpm workspace
packages). `apps/ai-engine` is Python and installed separately in Step 8.

### Step 4 — Set up apps/api's real environment file

```bash
cp apps/api/.env.example apps/api/.env
```

Open `apps/api/.env` and fill in real values:

```
DATABASE_URL="postgresql://postgres.YOUR_PROJECT_REF:YOUR_PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres"
JWT_SECRET="<any long random string>"
INTERNAL_SECRET="<any long random string — must match ai-engine's .env exactly>"
AI_ENGINE_URL="http://localhost:8000"
CORS_ORIGIN="http://localhost:3000"
PORT=5000
```

`CLOUDINARY_*` vars are also present in the example file for file-upload
work — optional until that feature is built.

### Step 5 — Set up apps/ai-engine's real environment file

```bash
cp apps/ai-engine/.env.example apps/ai-engine/.env
```

Fill in:

```
ANTHROPIC_API_KEY="sk-ant-..."
GROQ_API_KEY="gsk_..."
NVIDIA_NIM_API_KEY="nvapi-..."
NVIDIA_NIM_BASE_URL="https://integrate.api.nvidia.com/v1"
E2B_API_KEY="..."
INTERNAL_SECRET="<same exact value you put in apps/api/.env>"
NODE_API_URL="http://localhost:5000"
DATABASE_URL="postgresql://postgres.YOUR_PROJECT_REF:YOUR_PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
QDRANT_URL="https://xxx.qdrant.io"
QDRANT_API_KEY="..."
PORT=8000
```

You don't need every LLM key filled in to boot the service — only the
providers the agent you're building actually calls. See
[LLM providers](#llm-providers).

### Step 6 — Set up apps/web's real environment file

```bash
cp apps/web/.env.example apps/web/.env.local
```

Fill in:

```
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

### Step 7 — Create and activate the Python virtual environment

```bash
cd apps/ai-engine
python3 -m venv .venv
```

Activate it — macOS/Linux:

```bash
source .venv/bin/activate
```

Windows (PowerShell):

```powershell
.venv\Scripts\Activate.ps1
```

Your terminal prompt should now show `(.venv)` at the start of the line —
that confirms it's active.

### Step 8 — Install Python dependencies (inside the activated venv)

```bash
pip install -r requirements.txt
cd ../..
```

(back to repo root)

### Step 9 — Generate the Prisma client and run the first migration

```bash
cd apps/api
npx prisma generate --schema=../../database/prisma/schema.prisma
npx prisma migrate dev --name init --schema=../../database/prisma/schema.prisma
```

### Step 10 — Verify the database

```bash
npx prisma studio --schema=../../database/prisma/schema.prisma
```

This opens a browser tab — confirm every model shows up as a table, empty
but present. Close the tab and stop this command (Ctrl+C) once confirmed —
Prisma Studio isn't something you leave running.

```bash
cd ../..
```

Setup is done. Everything below is what you run every time you sit down to
work.

## Daily startup — three terminals, three services

Open three separate terminal windows/tabs, one per service. Each one keeps
running while you work — don't close them.

**Terminal 1 — Node.js API**

```bash
cd udyam/apps/api
pnpm dev
```

Confirm it's up:

```bash
curl http://localhost:5000/health
```

Expected: `{"status":"ok"}`

**Terminal 2 — Python AI Engine**

```bash
cd udyam/apps/ai-engine
source .venv/bin/activate        # Windows: .venv\Scripts\Activate.ps1
uvicorn main:app --reload --port 8000
```

Confirm it's up:

```bash
curl http://localhost:8000/health
```

Expected: `{"status":"ok"}`

**Terminal 3 — Next.js Frontend**

```bash
cd udyam/apps/web
pnpm dev
```

Open http://localhost:3000 in a browser — you should see the login page
(`/` redirects there automatically).

## Quick reference — every command in order (copy-paste block for setup)

```bash
git clone <your-repo-url>
cd udyam
pnpm install
cp apps/api/.env.example apps/api/.env
cp apps/ai-engine/.env.example apps/ai-engine/.env
cp apps/web/.env.example apps/web/.env.local
# --- now go fill in the three .env files with real values before continuing ---
cd apps/ai-engine
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd ../..
cd apps/api
npx prisma generate --schema=../../database/prisma/schema.prisma
npx prisma migrate dev --name init --schema=../../database/prisma/schema.prisma
cd ../..
```

Since your Python venv only needs creating once, tomorrow's startup is just
the three Terminal 1/2/3 blocks above — no setup steps repeat.

## LLM providers

`apps/ai-engine` is built to call more than one LLM provider rather than
being locked to a single vendor. Each agent picks whichever provider fits
its task (cost, latency, or open-weight model needs) via the env vars
already in `apps/ai-engine/.env.example`:

| Provider | Env vars | Client library | Notes |
|---|---|---|---|
| Anthropic (Claude) | `ANTHROPIC_API_KEY` | `anthropic` | Default for reasoning-heavy agents (e.g. contract drafting) |
| Groq | `GROQ_API_KEY` | `groq` | Fast inference for open-weight models (Llama, Mixtral, etc.) hosted on Groq's LPU infrastructure |
| NVIDIA NIM | `NVIDIA_NIM_API_KEY`, `NVIDIA_NIM_BASE_URL` | `openai` (OpenAI-compatible endpoint) | Access to NVIDIA-hosted open-source model microservices |
| Other open-source endpoints | `OPENSOURCE_LLM_BASE_URL`, `OPENSOURCE_LLM_API_KEY` | `openai` (OpenAI-compatible endpoint) | Drop-in for a local model server (Ollama, vLLM) or another OpenAI-compatible host (Together AI, etc.) |

All four are declared in `apps/ai-engine/requirements.txt`
(`anthropic`, `groq`, `openai`). You only need to fill in the API key(s)
for the provider(s) the agent you're building actually calls — the service
boots fine with the others left blank.

## Folder ownership

Matches the six feature branches above:

| Folder | Branch |
|---|---|
| `apps/api/` | `feature/aniket-nodejs-backend` |
| `apps/ai-engine/sandbox/` | `feature/siddharaj-ai-sandbox` |
| `apps/ai-engine/agents/` | `feature/abhay-ai-support`, `feature/rag-chatbot` |
| `apps/web/app/(admin)/`, `(ministry)/`, `(evaluator)/` | `feature/vaishnavi-frontend-govt` |
| `apps/web/app/(startup)/` | `feature/simran-frontend-startup` |

Don't edit outside your assigned folder without a heads-up — see
`AGENTS.md` → "Things This Agent Must Never Do".

## Contract rule

`docs/api.yaml` and `database/prisma/schema.prisma` are the source of truth
for every endpoint and table. See `AGENTS.md` for the full rules before
changing either.
