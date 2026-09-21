# Udyam

A government-startup procurement platform built for SIH 2026, Problem
Statement 26136. It connects ministries with startups through an AI-assisted
pipeline: problem formatting → matchmaking → sandboxed evaluation → contract
drafting, across four roles — Admin, Ministry, Evaluator, and Startup.

See `docs/ARCHITECTURE.md` for the full system design and `AGENTS.md` for
the living project log every session appends to.

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
cd innovateprocure
```

### Step 3 — Install Node dependencies (covers apps/web and apps/api in one shot)

```bash
pnpm install
```

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

### Step 5 — Set up apps/ai-engine's real environment file

```bash
cp apps/ai-engine/.env.example apps/ai-engine/.env
```

Fill in:

```
ANTHROPIC_API_KEY="sk-ant-..."
E2B_API_KEY="..."
INTERNAL_SECRET="<same exact value you put in apps/api/.env>"
NODE_API_URL="http://localhost:5000"
DATABASE_URL="postgresql://postgres.YOUR_PROJECT_REF:YOUR_PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
QDRANT_URL="https://xxx.qdrant.io"
QDRANT_API_KEY="..."
PORT=8000
```

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
cd innovateprocure/apps/api
pnpm dev
```

Confirm it's up:

```bash
curl http://localhost:5000/health
```

Expected: `{"status":"ok"}`

**Terminal 2 — Python AI Engine**

```bash
cd innovateprocure/apps/ai-engine
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
cd innovateprocure/apps/web
pnpm dev
```

Open http://localhost:3000 in a browser — you should see the login page.

## Quick reference — every command in order (copy-paste block for setup)

```bash
git clone <your-repo-url>
cd innovateprocure
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
