# AGENTS.md — InnovateProcure

## Project Overview

InnovateProcure is a government-startup procurement platform built for SIH
2026, Problem Statement 26136. It serves four roles — Admin, Ministry,
Evaluator, Startup — through an AI-assisted pipeline that takes a ministry's
problem statement through formatting, startup matchmaking, sandboxed
evaluation, and contract drafting. The system is a three-service monorepo:
 a React + Vite frontend (`apps/web`) serving all four portals, a Node/Express
REST API (`apps/api`), and a Python/FastAPI AI engine (`apps/ai-engine`)
that hosts the AI agents and the E2B sandbox runner.

## Repository Structure

```
innovateprocure/
├── apps/
│   ├── web/                        # React + Vite — all 4 role-based portals, one codebase
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
- Run frontend: `cd apps/web && pnpm dev` → http://localhost:3001
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

### [2026-09-26] — feature/vaishnavi-frontend-govt — Full landing page sections built with in-page anchor navigation
- **What was implemented:** Created comprehensive landing page sections for all navigation bar items (#about, #recognition, #funding, #schemes, #market-access, #marquee-initiatives, #resources, #network, #help-centre). All desktop and mobile navigation links now smoothly scroll to their corresponding on-page sections with official DPIIT styling and layout without external redirects.
- **Files touched:** `apps/web/src/pages/LandingPage.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Landing page section architecture and in-page navigation.
- **Anything the next session/teammate needs to know:** `tsc --noEmit` and `vite build` pass cleanly.

### [2026-09-26] — feature/vaishnavi-frontend-govt — Landing page navigation redirects updated to official Startup India resources
- **What was implemented:** Updated header navigation links (About, Recognition, Funding, Schemes and Policies, Market Access, Marquee Initiatives, Resources, Network, Help centre) and footer resource links on `LandingPage.tsx` to redirect to official Startup India (`startupindia.gov.in`) pages without altering the existing UI/UX, typography, or visual layout.
- **Files touched:** `apps/web/src/pages/LandingPage.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Landing page navigation refinement.
- **Anything the next session/teammate needs to know:** `tsc --noEmit` and `vite build` pass cleanly.

### [2026-09-26] — feature/vaishnavi-frontend-govt — Ministry selection card styled to reference on Login & Signup
- **What was implemented:** Styled the Ministry selection field on both `LoginPage.tsx` and `MinistrySignupPage.tsx` with a distinct dashed border container, "Select Ministry" label, "Required" badge, "Select your Ministry" placeholder, and descriptive helper text ("The selected Ministry determines the Ministry scope of the account."). Also exported shared `MINISTRY_OPTIONS` from `ministryData.ts` and added the workflow sequence banner to the Ministry request form.
- **Files touched:** `apps/web/src/lib/ministryData.ts`, `apps/web/src/pages/LoginPage.tsx`, `apps/web/src/pages/MinistrySignupPage.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Ministry portal authentication and onboarding reference alignment.
- **Anything the next session/teammate needs to know:** `tsc --noEmit` and `vite build` pass cleanly.

### [2026-09-26] — feature/vaishnavi-frontend-govt — Ministry dropdown added to Ministry sign in form
- **What was implemented:** Added a required "Ministry / Department" dropdown with a full list of Government of India ministries and departments and placeholder "Select your ministry or department" on the login page when the Ministry role is selected, matching the reference registration design.
- **Files touched:** `apps/web/src/pages/LoginPage.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Ministry login UI enhancement.
- **Anything the next session/teammate needs to know:** `tsc --noEmit` and `vite build` pass cleanly.

### [2026-09-25] — feature/vaishnavi-frontend-govt — Form text size readability enhancements & dev server run
- **What was implemented:** Increased font sizes and field padding across all form controls (Input, Select, Textarea, ScoreCriterion, LoginPage, and signup pages) for significantly improved readability and accessibility. Launched the Vite dev server on `http://localhost:3001/`.
- **Files touched:** `apps/web/src/components/ui/Input.tsx`, `apps/web/src/components/ui/Select.tsx`, `apps/web/src/components/ui/Textarea.tsx`, `apps/web/src/pages/LoginPage.tsx`, `apps/web/src/components/evaluator/ScoreCriterion.tsx`, `apps/web/src/pages/MinistryProblemCreatePage.tsx`, `apps/web/src/pages/MinistrySignupPage.tsx`, `apps/web/src/pages/EvaluatorSignupPage.tsx`, `apps/web/src/pages/StartupSignupPage.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Form accessibility and readability polish.
- **Anything the next session/teammate needs to know:** Vite development server is running on `http://localhost:3001/`. `tsc` and `vite build` pass cleanly.

### [2026-09-25] — feature/vaishnavi-frontend-govt — Khelo India footer logo verified removed
- **What was implemented:** Verified and confirmed that the footer contains only the Government of India emblem, DPIIT/#startupindia identity, newsletter subscription, last updated notice, helpline details, and portal navigation, with no Khelo India logo present.
- **Files touched:** `apps/web/src/pages/LandingPage.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Public landing page refinement.
- **Anything the next session/teammate needs to know:** `vite build` passes cleanly.

### [2026-09-25] — feature/vaishnavi-frontend-govt — Landing hero information panel removed
- **What was implemented:** Removed the “Udyam at a glance” panel and its Challenge stage / Review model labels from the public landing hero, leaving the official introduction and primary CTAs as the focus.
- **Files touched:** `apps/web/src/pages/LandingPage.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuing public landing content refinement.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web lint` and `corepack pnpm --filter web build` pass. The root page returns `200` on `http://localhost:3001/`.

### [2026-09-25] — feature/vaishnavijawalkar-frontend-govt — Landing copy and typography polish
- **What was implemented:** Refined landing-page language for official readability: clearer public-sector hero description, concise challenge/workflow section copy, consistent CTA capitalization, and explicit demonstration-content wording. Added restrained interactive display typography with balanced text wrapping and hover/focus title emphasis.
- **Files touched:** `apps/web/src/pages/LandingPage.tsx`, `apps/web/src/globals.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuing public landing content and typography polish.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web lint` and `corepack pnpm --filter web build` pass. The root page returns `200` on `http://localhost:3001/`; routes and dashboard functionality were unchanged.

### [2026-09-25] — feature/vaishnavi-frontend-govt — Official public-innovation hero copy refinement
- **What was implemented:** Replaced informal landing hero language with formal government public-innovation copy: “Advancing public services through innovation,” structured challenge/solution/evaluation language, and “Defined” / “Evidence-led” programme signals.
- **Files touched:** `apps/web/src/pages/LandingPage.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuing official public landing content alignment.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web lint` and `corepack pnpm --filter web build` pass. The landing page returns `200` on `http://localhost:3001/`; no routes or portal functionality changed.

### [2026-09-25] — feature/vaishnavi-frontend-govt — Official reference landing header and footer restored
- **What was implemented:** Restored the public landing page's official-portal treatment: Government of India utility bar, DPIIT/#startupindia identity row, verified Azadi Ka Amrit Mahotsav and Khelo India logo assets, official-site-inspired navigation labels, Udyam procurement content, and reference-style subscription/contact/footer bands.
- **Files touched:** `apps/web/src/pages/LandingPage.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuing public landing visual alignment with official website references.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web lint` and `corepack pnpm --filter web build` pass. Browser checks confirm official logo assets render and no horizontal overflow at 375, 640, 1024, or 1440px. Dashboard routes were not modified.

### [2026-09-25] — feature/vaishnavi-frontend-govt — Government frontend final QA and bug-fix pass
- **What was implemented:** Completed route, interaction, responsive, accessibility, and source-safety QA across the Government frontend. Fixed nested Ministry topbar titles and enabled native required-field validation for the demo login form. No new product functionality or backend integration was added.
- **Files touched:** `apps/web/src/components/layout/GovernmentLayout.tsx`, `apps/web/src/pages/LoginPage.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Final validation pass for the Government frontend.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web build` and `corepack pnpm --filter web lint` pass. All requested Government routes load under the correct demo role; modal, search, role switching, score calculation, evaluation submission, logout, and mobile drawer were browser-tested. No horizontal overflow was found at 375, 640, 1024, or 1440px. `/startup` remains an existing placeholder and was not modified per scope.

### [2026-09-25] — feature/vaishnavi-frontend-govt — Government demo mode and centralized workflow data
- **What was implemented:** Added a lightweight frontend-only Demo Mode notice and profile-menu role switching for Admin, Ministry, and Evaluator using the existing local demo session mechanism. Centralized the primary Smart Water Distribution Monitoring challenge and Demo Innovation Labs participant, then reused those records across Ministry problem/sandbox/evaluation/contract views and the primary Evaluator review.
- **Files touched:** `apps/web/src/mocks/demoData.ts`, `apps/web/src/lib/ministryData.ts`, `apps/web/src/lib/evaluatorData.ts`, `apps/web/src/pages/MinistryEvaluationPage.tsx`, `apps/web/src/pages/MinistryContractsPage.tsx`, `apps/web/src/components/layout/Topbar.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuing frontend Government demo workflow work.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web lint` and `corepack pnpm --filter web build` pass. Profile role switching was browser-tested from Evaluator to Admin; all Government workflow routes and `/startup` return `200`. Demo data remains local/static and backend integration is pending.

### [2026-09-25] — feature/vaishnavi-frontend-govt — Public Udyam Government landing page
- **What was implemented:** Replaced the root public page with a Udyam-specific Government Innovation Platform landing page. Added official government context, Udyam branding, Government Login and Explore Challenges CTAs, demo-labelled public challenges, a five-step workflow, Government role cards, a public notice, and a focused Udyam footer. Removed Startup India-specific branding, assets, scale claims, and Startup portal CTAs from the root page.
- **Files touched:** `apps/web/src/pages/LandingPage.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuing public Udyam landing experience work.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web lint` and `corepack pnpm --filter web build` pass. Playwright smoke checks show no horizontal overflow at 375, 640, 1024, or 1440px. `/login` and all portal routes remain unchanged.

### [2026-09-25] — feature/vaishnavi-frontend-govt — Government frontend consistency and polish pass
- **What was implemented:** Unified GovernmentLayout behavior across Admin, Ministry, and Evaluator by fixing nested active navigation, nested page titles, root portal titles, and hook ordering. Normalized Admin metric cards to match Ministry/Evaluator cards, removed the remaining purple Government login accent, and added the missing Ministry create-form breadcrumb.
- **Files touched:** `apps/web/src/components/layout/GovernmentLayout.tsx`, `apps/web/src/components/layout/Sidebar.tsx`, `apps/web/src/components/layout/MobileSidebar.tsx`, `apps/web/src/components/admin/AdminStatCard.tsx`, `apps/web/src/pages/LoginPage.tsx`, `apps/web/src/pages/MinistryProblemCreatePage.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuing Government frontend visual and interaction consistency work.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web lint` and `corepack pnpm --filter web build` pass. Playwright smoke checks show no horizontal overflow at 375, 640, 1024, or 1440px on representative Ministry and Evaluator pages. React Router emits only its existing v7 future-flag warnings in the browser console.

### [2026-09-25] — feature/vaishnavi-frontend-govt — Government demo login and role selection
- **What was implemented:** Replaced the legacy mixed-role login selector with a Government-only demo flow for Admin, Ministry, and Evaluator. Added themed role cards, email/password fields, Remember Me storage choice, local demo session creation, protected GovernmentLayout redirects, visible demo user identity, and a profile-menu logout action. Startup routing and functionality remain untouched.
- **Files touched:** `apps/web/src/lib/auth.ts`, `apps/web/src/pages/LoginPage.tsx`, `apps/web/src/components/auth/AuthLayout.tsx`, `apps/web/src/components/layout/GovernmentLayout.tsx`, `apps/web/src/components/layout/Topbar.tsx`, `apps/web/src/components/layout/Sidebar.tsx`, `apps/web/src/components/layout/MobileSidebar.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuing frontend government portal work; this is a frontend-only demo session boundary.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web lint` and `corepack pnpm --filter web build` pass. Demo sessions use `localStorage` or `sessionStorage` under `udyam.demo.session`; no JWT, API, backend auth, or persistence was added. `/startup` remains unprotected and unchanged.

### [2026-09-25] — feature/vaishnavi-frontend-govt — Interactive landing hero background
- **What was implemented:** Added a restrained interactive procurement-network background behind the landing hero copy: low-contrast grid, animated scan line and route paths, pulsing nodes, and pointer-responsive node movement. The effect stays behind the headline and preserves the existing government palette and readability.
- **Files touched:** `apps/web/src/pages/LandingPage.tsx`, `apps/web/src/globals.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuing public landing visual polish.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web lint` and `corepack pnpm --filter web build` pass. The landing page returns `200` on `http://localhost:3001/`. No portal, backend, or persistence behavior was changed.

### [2026-09-25] — feature/vaishnavi-frontend-govt — Official logo assets in landing header and footer
- **What was implemented:** Replaced text approximations with exact public official logo assets for Azadi Ka Amrit Mahotsav in the landing header and Khelo India in the landing footer, preserving the supplied reference proportions and colors. Government emblem remains the official Wikimedia-hosted asset; DPIIT/#startupindia stays as an accessible text lockup because the Startup India-hosted logo endpoint is access-protected.
- **Files touched:** `apps/web/src/pages/LandingPage.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuing public landing reference alignment.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web lint` and `corepack pnpm --filter web build` pass. The exact Azadi and Khelo assets both return HTTP `200` from Wikimedia Commons. No backend or portal functionality was changed.

### [2026-09-25] — feature/vaishnavi-frontend-govt — Startup India reference footer alignment
- **What was implemented:** Replaced the generic public landing footer with the supplied Startup India-style footer: DPIIT/#startupindia identity row, Khelo India wordmark treatment, email subscription form, last-updated block, toll-free contact details, policy/resource links, visitor-count divider, back-to-top control, and compact copyright bar.
- **Files touched:** `apps/web/src/pages/LandingPage.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuing public landing visual alignment.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web lint` and `corepack pnpm --filter web build` pass. The landing page returns `200` on `http://localhost:3001/`. Subscription and footer links remain UI-only; no backend integration was added.

### [2026-09-25] — feature/vaishnavi-frontend-govt — Startup India reference header alignment
- **What was implemented:** Reworked the public landing header to match the supplied Startup India reference: official Government of India utility bar with emblem/contact/social details, DPIIT/#startupindia identity row with search, Sign In/Register actions, white category navigation, and saffron bottom accent. Updated landing navigation styles for the new white header.
- **Files touched:** `apps/web/src/pages/LandingPage.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuing public landing visual alignment.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web lint` and `corepack pnpm --filter web build` pass. The landing page returns `200` on `http://localhost:3001/`. The official emblem is loaded from the verified public Wikimedia Government of India asset; no portal/dashboard shell or backend code was changed.

### [2026-09-25] — feature/vaishnavi-frontend-govt — Evaluator portal review workflow
- **What was implemented:** Built the Evaluator portal with a review dashboard, eight-record assigned-review table with client-side search/status/category filters, recent activity, and a detailed review route. The review screen includes problem and submission summaries, weighted 1–5 KPI scoring, evaluator notes, overall comments, calculated weighted score, completion percentage, local Save Draft feedback, and local Submit Evaluation status transition.
- **Files touched:** `apps/web/src/App.tsx`, `apps/web/src/lib/evaluatorData.ts`, `apps/web/src/components/evaluator/EvaluatorStatCard.tsx`, `apps/web/src/components/evaluator/ScoreCriterion.tsx`, `apps/web/src/pages/EvaluatorQueuePage.tsx`, `apps/web/src/pages/EvaluatorAssignedPage.tsx`, `apps/web/src/pages/EvaluatorReviewPage.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuing frontend government portal work; Evaluator UI is demo-only and uses local static data/state.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web lint` and `corepack pnpm --filter web build` pass. All requested Evaluator routes return `200` on the local Vite server at `http://localhost:3001/`. No backend calls, persistence, authentication, or API contracts were added.

### [2026-09-24] — feature/vaishnavi-frontend-govt — Official government dashboard shell restyle
- **What was implemented:** Restyled the shared GovernmentLayout shell used by Ministry, Admin, and Evaluator dashboards to match the supplied Startup India references: replaced the blue sidebar with charcoal grey, added Government of India and DPIIT/#startupindia identity branding, added the official emblem asset, introduced a government utility strip and white identity header with saffron accent, and retained the UDYAM portal label. Mobile navigation receives the same treatment.
- **Files touched:** `apps/web/src/components/layout/GovernmentBrand.tsx`, `apps/web/src/components/layout/Sidebar.tsx`, `apps/web/src/components/layout/MobileSidebar.tsx`, `apps/web/src/components/layout/Topbar.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuing frontend government portal visual alignment.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web lint` and `corepack pnpm --filter web build` pass. The emblem is loaded from the public Wikimedia-hosted Government of India asset because the Startup India site logo endpoints returned access-protected responses; the DPIIT/#startupindia wordmark is rendered as accessible text beside it. Startup portal code was not modified.

### [2026-09-24] — feature/vaishnavi-frontend-govt — Ministry portal workflow UI
- **What was implemented:** Built the Ministry portal UI with local demo data across the dashboard, searchable/filterable government problems table, structured create-problem form, problem detail view, sandbox monitoring, evaluation results, and contract overview. Added nested Ministry routes and kept the existing GovernmentLayout and shared UI system, extending it with Ministry-only stat, activity, and KPI progress components.
- **Files touched:** `apps/web/src/App.tsx`, `apps/web/src/lib/ministryData.ts`, `apps/web/src/components/ministry/MinistryStatCard.tsx`, `apps/web/src/components/ministry/ActivityFeed.tsx`, `apps/web/src/components/ministry/KpiProgress.tsx`, `apps/web/src/pages/MinistryDashboardPage.tsx`, `apps/web/src/pages/MinistryProblemsPage.tsx`, `apps/web/src/pages/MinistryProblemCreatePage.tsx`, `apps/web/src/pages/MinistryProblemDetailPage.tsx`, `apps/web/src/pages/MinistrySandboxPage.tsx`, `apps/web/src/pages/MinistryEvaluationPage.tsx`, `apps/web/src/pages/MinistryContractsPage.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuing frontend portal work; Ministry UI is demo-only and uses static local state/data.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web lint` and `corepack pnpm --filter web build` pass. All requested Ministry routes return `200` on the local Vite server at `http://localhost:3001/`. No backend calls or persistence were added; contract, sandbox, and approval buttons remain UI-only.

### [2026-09-24] — feature/vaishnavi-frontend-govt — Startup India-inspired public landing refresh
- **What was implemented:** Refreshed the public landing page with Startup India-inspired government portal structure and source-grounded content: ecosystem metrics, Network/Participate/Access cards, resource-oriented navigation, procurement workflow anchors, and a warmer editorial hero. Added DM Sans + Barlow Condensed typography with subtle interactive heading and card motion.
- **Files touched:** `apps/web/src/pages/LandingPage.tsx`, `apps/web/src/globals.css`, `apps/web/tailwind.config.ts`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuing frontend public landing work.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web lint` and `corepack pnpm --filter web build` pass. The Vite dev server remains available at `http://localhost:3001/`. Source content was based on Startup India portal navigation and about-page material; no external API integration was added.

### [2026-09-24] — feature/vaishnavi-frontend-govt — Admin portal UI: dashboard, registrations, security, audit logs
- **What was implemented:** Built the full Admin portal UI (4 pages) on top of the Government frontend foundation. `/admin` — polished dashboard with 4 stat cards (Pending Registrations 24, Approved Orgs 186, Active Evaluators 42, Security Alerts 3), registration overview table with live local approve/reject state, and a recent activity feed. `/admin/registrations` — registration management with search + status/type filters (client-side filtering over 10 demo rows), DataTable, and a detail modal with document list, approve/reject buttons. `/admin/security` — 4 stat cards, security events table with Low/Medium/High severity badges, and access policies grid. `/admin/audit-logs` — search + role/action/status filters, DataTable with 12 demo entries, client-side pagination. All interactions are local state only; no backend calls.
- **Files touched:** `apps/web/src/components/admin/AdminStatCard.tsx` (new), `apps/web/src/pages/AdminDashboardPage.tsx` (overwritten), `apps/web/src/pages/AdminRegistrationsPage.tsx` (overwritten), `apps/web/src/pages/AdminSecurityPage.tsx` (overwritten), `apps/web/src/pages/AdminAuditLogsPage.tsx` (overwritten), `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Admin portal foundation complete. Next: Ministry portal UI.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web build` and `corepack pnpm --filter web lint` both pass with 0 errors. No new npm dependencies added. All data is static demo — no MSW handlers touched.

### [2026-09-24] — feature/vaishnavi-frontend-govt — Preserve frontend skeleton during React + Vite migration
- **What was implemented:** Converted `apps/web` to React + Vite with React Router while preserving the original placeholder page content, Tailwind styling setup, shared API/auth/query utilities, and MSW handlers. The root route redirects to `/login`.
- **Files touched:** `apps/web/package.json`, `apps/web/tsconfig.json`, `apps/web/.env.example`, `apps/web/index.html`, `apps/web/vite.config.ts`, `apps/web/tailwind.config.ts`, `apps/web/postcss.config.mjs`, `apps/web/src/`, removed Next-specific `apps/web/app/`, `apps/web/lib/`, `apps/web/mocks/`, `apps/web/next-env.d.ts`, `apps/web/next.config.mjs`, and `apps/web/.eslintrc.json`, plus `README.md` and `pnpm-lock.yaml`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuing frontend framework migration; government dashboards remain placeholders as requested.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web build` and `corepack pnpm --filter web lint` pass. Vite served all required paths with `200` on local port `3002` because port `3001` was already occupied. `VITE_API_URL` replaces `NEXT_PUBLIC_API_URL`. No commit or push was made.

### [2026-09-24] — main — Migrate frontend from Next.js to React + Vite
- **What was implemented:** Replaced the empty Next.js frontend scaffold with a React + Vite app, including Vite scripts/configuration, a working Udyam workspace screen, responsive styling, and updated local run documentation.
- **Files touched:** `apps/web/package.json`, `apps/web/tsconfig.json`, `apps/web/index.html`, `apps/web/vite.config.ts`, `apps/web/src/main.tsx`, `apps/web/src/styles.css`, removed obsolete Next/Tailwind scaffold files, `README.md`, `AGENTS.md`, `pnpm-lock.yaml`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of frontend scaffold work; the web service now runs with Vite rather than Next.js.
- **Anything the next session/teammate needs to know:** `corepack pnpm --filter web build` passes and the dev server is available at `http://localhost:3001`. The API is running separately at `http://localhost:5001` because macOS Control Center owns port 5000 on this machine. The prior route-specific Next pages were empty scaffold files and were removed during migration.

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
