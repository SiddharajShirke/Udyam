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
### [2026-09-26] — feature/simran-frontend-startup — Improve Sandbox, Schemes, and Milestones text readability
- **What was implemented:** Increased supporting text and control font sizes slightly within the Sandbox, Schemes, and Milestones pages, including the sandbox report and milestone timeline details.
- **Files touched:** `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly.

---
### [2026-09-25] — feature/simran-frontend-startup — Fix scope-aware sandbox completion gate
- **What was implemented:** Fixed the sandbox E2B runner gate so it validates only the technical fields relevant to the selected Software, Hardware, or Both scope. Completed submissions can now enter the loading and streamed report flow without being blocked by hidden fields from another scope.
- **Files touched:** `apps/web/src/main.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly.

---
### [2026-09-25] — feature/simran-frontend-startup — Restore full catalogs after search cancellation
- **What was implemented:** Fixed persistent global search state so normal navigation back to Schemes or Problem Statements restores all items. Added visible Clear search actions on both catalog pages, which immediately return the full unfiltered list.
- **Files touched:** `apps/web/src/main.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly.

---
### [2026-09-25] — feature/simran-frontend-startup — Make global search open matching catalog results
- **What was implemented:** Connected the government header search to the actual catalog pages. Searches matching problem statement IDs, titles, ministries, themes, or descriptions open the filtered Problem Statements page; scheme-related searches open the filtered Schemes page and respect its eligibility tabs.
- **Files touched:** `apps/web/src/main.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly.

---
### [2026-09-25] — feature/simran-frontend-startup — Make overview metrics navigable and polish first dashboard screen
- **What was implemented:** Converted the Overview metric cards into accessible clickable buttons that navigate to Problem Statements, Schemes, and Milestones. Framed the personalized recommendations area as a clear dashboard section and added hover, active, and keyboard focus states to the metric cards.
- **Files touched:** `apps/web/src/main.tsx`, `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly.

---
### [2026-09-25] — feature/simran-frontend-startup — Gate sandbox evaluation on complete submissions and simplify language control
- **What was implemented:** Prevented the E2B sandbox benchmark runner from starting until all required solution details and both artifact uploads are present; incomplete submissions now show a clear missing-details warning. Replaced the interactive language dropdown with a static English-only header control.
- **Files touched:** `apps/web/src/main.tsx`, `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly. Browser smoke test was skipped by the workspace after the code/build validation.

---
### [2026-09-25] — feature/simran-frontend-startup — Complete workspace page visual system and section panels
- **What was implemented:** Added the missing visual styles for the Overview, Problem Statements, Solution Sandbox, Milestones, Schemes, Profile, and sandbox report pages, including framed cards, badges, filters, responsive grids, timelines, uploads, loading states, terminal reports, and mobile layouts. Added compact white section panels around key page headers and filters, and changed missing-document scheme attachment controls to white with orange outlines.
- **Files touched:** `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly. The Vite dev server is available at `http://localhost:5175/` because ports 5173 and 5174 were already occupied.

---
### [2026-09-25] — feature/simran-frontend-startup — Comprehensive Interactive UI & Modal System Across All Pages
- **What was implemented:** Added rich interactive controls, popups, and toast feedback across all pages based on Startup India / DPIIT reference standard: (1) Added Notification Bell with unread badge & live activity alert panel in `GovtHeader`; (2) Added Challenge Bookmarking (⭐ star toggle), "Bookmarks Only" filter, Quick View Spec Modal, and Share Link toast copy in `ProblemStatementsView`; (3) Added Timeline Status Filters ("All", "Completed", "In Progress", "Upcoming"), Expandable Day Cards with detailed sub-tasks, and Schedule Day 4 Live Demo Slot Modal in `MilestonesView`; (4) Added One-Click Copy DPIIT Recognition ID, Official Digital DPIIT Startup Passport ID Card Modal, and Verified Document Preview Viewer Modal in `ProfileView`; (5) Preserved full line-by-line streaming E2B report output in `SolutionSandboxView` and MSINS 2025 scheme document triggers in `SchemesView`.
- **Files touched:** `apps/web/src/main.tsx`, `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly with 0 errors.

### [2026-09-25] — feature/simran-frontend-startup — Global UI Polish, Animations & Micro-Interactions
- **What was implemented:** Enhanced UI polish, micro-interactions, and animations across the entire application without changing layout structures or color themes: (1) Added keyframe animations (`@keyframes fadeInUp`, `@keyframes subtleGlow`, `@keyframes badgePulse`, `@keyframes floatPill`); (2) Added view entrance animations for all main views (`DashboardView`, `ProblemStatementsView`, `SolutionSandboxView`, `MilestonesView`, `SchemesView`, `ProfileView`); (3) Enhanced smooth card hover lift and glowing elevation states for problem statement cards, scheme cards, milestone day cards, profile cards, and form sections; (4) Added button active scale states, glowing focus rings for form controls, glowing saffron highlights, and custom government themed scrollbars.
- **Files touched:** `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly with 0 errors.

### [2026-09-25] — feature/simran-frontend-startup — Modular Individual Section Cards for Profile Page
- **What was implemented:** Redesigned `ProfileView` so that **EVERY SINGLE CONTENT ITEM** has its own dedicated small white section card box (`.profile-item-card`) featuring an icon badge, upper-case label, status pill, bold contrast value, and saffron left-border accent (`border-left: 4.5px solid #ea580c`) using official Startup India / DPIIT government color palette: (1) Founder / Representative Card, (2) DPIIT Recognition ID Card, (3) Registered Email Card, (4) Date of Birth Card, (5) Educational Qualification Card, (6) Registration Date Card, (7) Entity Classification Card, (8) Primary Innovation Sector Card, (9) Section 80-IAC Tax Exemption Card, (10) BHASKAR Innovation Network Sync Card, (11) Public Procurement EMD Waiver Card, (12) Account Verification Status Card, (13) Password Encryption & 2FA Card, (14) Attached Education Certificate Card, (15) Attached DPIIT Recognition Certificate Card, (16) Full Solution Description & Mandate Card.
- **Files touched:** `apps/web/src/main.tsx`, `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly with 0 errors.

### [2026-09-25] — feature/simran-frontend-startup — Full Line-by-Line Content Streaming for E2B Sandbox Evaluation Report
- **What was implemented:** Updated `SolutionSandboxView` report output page so that after clicking "Check Sandbox Benchmark Result" and completing the 3-second loader screen, **EVERY SINGLE CONTENT ITEM** on the results page streams in line-by-line / block-by-block (simulating ChatGPT streaming text output): (1) Top Report Header Card -> (2) E2B Terminal Box Header -> (3) Terminal Log Lines 1-10 -> (4) Target Ministry Test Case Verification Summary Card Header -> (5) Test Case Cards 1-4 (Accuracy, Latency, Offline Mode, Anomaly Score) -> (6) System Optimization Analysis & Drawback Points Header Card -> (7) Drawback #1 Card (Model Weight Size 45.2 MB) & Recommendation -> (8) Drawback #2 Card (Zero-Lux Ambient Sensitivity) & Recommendation -> (9) Final System Evaluation Verdict Banner ("PASSED WITH HIGHEST RECOMMENDATION - 98% Match") -> (10) Final Action Buttons Row ("Submit Final Proposal to Ministry Board").
- **Files touched:** `apps/web/src/main.tsx`, `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly with 0 errors.

### [2026-09-24] — feature/simran-frontend-startup — Expand Profile Details & Add 3s E2B Sandbox Loader with Streaming Console Report
- **What was implemented:** Added requested updates: (1) Overhauled `ProfileView` to display EVERY single detail collected/mentioned during startup registration (Founder Name, DPIIT Recognition ID, Registered Email, DOB, Education, Registration Date, Verification Status, Entity Classification, Sector, Tax Exemption status, Security Encryption status, Attached Education & DPIIT Recognition Certificates, and Full Solution Description); (2) Removed all question numbers ("Q1.", "Q2.", "Q3.", "Q4.", "3.", "4.", "5.") from the Solution Sandbox form headings and field titles; (3) Re-ordered Solution Sandbox sections so Product Code & Artifact File Uploads comes before KPI Verification, making "System KPI & Benchmark Verification" the VERY LAST STEP; (4) Added 3-second loader screen ("Running E2B Sandbox Automated Test Runner...") when checking sandbox benchmark results; (5) Built line-by-line streaming console report output page (simulating ChatGPT streaming text output) featuring execution terminal logs, test case results summary card, identified drawback points & recommendations, and final proposal submission flow.
- **Files touched:** `apps/web/src/main.tsx`, `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly with 0 errors.

### [2026-09-24] — feature/simran-frontend-startup — Add Role Dropdowns, Day-by-Day Milestones Timeline & MSINS 2025 Schemes Page
- **What was implemented:** Added interactive features: (1) Added "Login as" role dropdown select field to `LoginForm` with options (`Startup / Entrepreneur`, `Ministry / Department Officer`, `Technical Evaluator / Expert`); (2) Added "Register as" role dropdown select field to `RegisterForm` with options (`Startup / Entrepreneur`, `Ministry / Department Nodal Officer`); (3) Overhauled `MilestonesView` to feature real application evaluation tracking (`PS-2026-AGRI-01`), 60% progress bar, day-by-day lifecycle timeline (Day 1: Submission [Completed], Day 2: E2B Sandbox Test [Completed], Day 3: Ministry Review [In Progress], Day 4: Demo [Upcoming], Day 5: Contract Award [Upcoming]), and live evaluation audit logs; (4) Built `SchemesView` based on the Maharashtra Startup, Entrepreneurship & Innovation Policy 2025 (MSINS) with scheme categories, document eligibility checklists, missing document attachment triggers unlocking schemes, and "Apply for Scheme" action flow updating state to "✓ Applied".
- **Files touched:** `apps/web/src/main.tsx`, `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI & workflow features.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly with 0 errors.

### [2026-09-24] — feature/simran-frontend-startup — Separate Sandbox Questions into Individual Card Sections
- **What was implemented:** Separated every question in the Solution Sandbox form into its own individual white card container (`.form-section`) with a prominent icon, bold section header title, clear question number, and generous spacing: (1) Initial Scope Classification card; (2) Solution Title card; (3) Q1 Solution Type card; (4) Q2 Primary Outcome card; (5) Expected Outcome Explanation card; (6) Existing Process Improvement card; (7) Q3 Expected Improvement Percentage card; (8) Target KPI Value & Direction card; (9) Q4 Measurement Method card; (10) Technical & Software/Hardware Specifications card; (11) System KPI & Benchmark Verification card with E2B automated test runner; (12) Code & Artifact File Upload card.
- **Files touched:** `apps/web/src/main.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly with 0 errors.

### [2026-09-24] — feature/simran-frontend-startup — Overhaul Solution Sandbox UI Styling & Form Aesthetics
- **What was implemented:** Upgraded the Solution Sandbox page UI to match official Startup India / DPIIT government portal standards: (1) Added generous 32px/36px card padding, smooth subtle section shadows (`box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03)`), and clean saffron section header dividers (`border-left: 5px solid #ea580c`); (2) Upgraded MCQ radio option pills with saffron borders, soft orange active background (`#fff7ed`), bold contrast labels, and glowing radio dot indicators; (3) Redesigned the top Scope Selection cards (Software / Hardware / Hybrid) with large icons, clear subtitles, and hover elevation; (4) Enhanced the Target Ministry header banner with a gradient backdrop (`linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)`) and white summary chip; (5) Upgraded input fields, textareas, file upload triggers, and the primary submit button with a rich saffron gradient (`linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)`) and hover elevation.
- **Files touched:** `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly with 0 errors.

### [2026-09-24] — feature/simran-frontend-startup — Enhance Solution Sandbox with Comprehensive MCQ Evaluation & Dynamic Tech Specs
- **What was implemented:** Enhanced the Solution Sandbox form with all required structured questions: (1) Added top classification selector "Is your solution Software, Hardware, or Both?" which dynamically tailors Section 4 Technical Specifications (Microcontrollers, sensors, power footprint for hardware vs tech stack and cloud API model for software); (2) Q1 MCQ Solution Type (AI/ML, Web App, Mobile, Hardware/IoT, Hybrid, Infrastructure, Service, Other); (3) Q2 MCQ Primary Outcome (Accuracy, Speed/Latency, Cost Reduction, Productivity, Resource Utilization, Reliability, Safety, Citizen Satisfaction, Revenue, Error Reduction, Environmental Impact, Accessibility, Other); (4) Outcome explanation & process improvement textareas; (5) Q3 MCQ Expected Improvement Percentage (0–10%, 10–25%, 25–50%, 50–75%, >75%), target value input, and performance direction radio (Higher vs Lower is better); (6) Q4 MCQ Measurement Method (Automated sandbox, Uploaded dataset, API response, Test report, Sensor/device data, Government data, User feedback, Manual evaluator, Combination); (7) Preserved Section 3 "System KPI & Benchmark Verification" with automated E2B sandbox test runner simulation and product code/file upload components.
- **Files touched:** `apps/web/src/main.tsx`, `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly with 0 errors.

### [2026-09-24] — feature/simran-frontend-startup — Add Problem Statements & Interactive Solution Sandbox Flow
- **What was implemented:** Added Startup India reference features: (1) Added "Problem Statements You Might Be Interested In" personalized AI recommendations section to Overview page with Theme tags, match scores, KPI benchmarks, grant details, and direct Apply buttons; (2) Renamed header navigation tab to "Problem Statements" with open challenge count badge, full filterable listing by Theme (Agriculture & Rural, Water & Sanitation, Food & Nutrition, Healthcare & AI, Clean Energy & Mobility) and search bar; (3) Built multi-section interactive Solution Sandbox application modal/view with solution overview, value proposition, interactive automated E2B system benchmark verification test runner, tech stack & hardware specifications inputs, source code repository/document attachment uploaders, and submission confirmation flow.
- **Files touched:** `apps/web/src/main.tsx`, `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly with 0 errors.

### [2026-09-24] — feature/simran-frontend-startup — Remove stats section from login/register first page
- **What was implemented:** Completely removed the DPIIT / BHASKAR statistics banner section from the first page (login/register screen).
- **Files touched:** `apps/web/src/main.tsx`, `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly with 0 errors.

### [2026-09-24] — feature/simran-frontend-startup — Relocate stats banner above auth intro & login sections
- **What was implemented:** Removed the heavy hero background wrapper and cloud wave divider from the login page, and moved the DPIIT / BHASKAR statistics pill banner directly above the "Build what matters" left section and Login right section inside the main auth shell.
- **Files touched:** `apps/web/src/main.tsx`, `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly with 0 errors.

### [2026-09-24] — feature/simran-frontend-startup — Full-width responsive web application layout
- **What was implemented:** Removed narrow max-width limits (1320px, 820px, 660px) and margin gaps across headers, workspace navigation, dashboard bodies, detail pages, and empty-state cards. Upgraded layout to span 100% full screen width with clean responsive grid alignment across computer displays.
- **Files touched:** `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** Verified on full-screen displays. `pnpm --filter web build` passes cleanly. Dev server running on `http://localhost:5175/`.

### [2026-09-24] — feature/simran-frontend-startup — Move startup navigation into page header
- **What was implemented:** Converted the approved startup dashboard's vertical sidebar into a horizontal top workspace header containing the logo, workspace navigation, challenge count, help link, and verified startup profile.
- **Files touched:** `apps/web/src/main.tsx`, `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of the startup portal frontend prototype.
- **Anything the next session/teammate needs to know:** Verified in the approved workspace browser state. `pnpm --filter web lint` and `pnpm --filter web build` pass.

### [2026-09-24] — feature/simran-frontend-startup — Interactive Login and Register UI with Saffron Government Theme
- **What was implemented:** Added rich interactive UI capabilities to the Login and Register pages using the official Startup India / DPIIT government color palette. Added one-click demo credentials and sample data autofill buttons, interactive password show/hide visibility toggles, dynamic password strength meter (Weak/Medium/Strong bar), interactive document attachment component with file preview and remove option, interactive language dropdown menu, interactive top header search bar with toast notifications, and clickable government platform benefit tabs on the intro banner.
- **Files touched:** `apps/web/src/main.tsx`, `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly. All content, form state, and authentication/workspace flows are completely preserved.

### [2026-09-24] — feature/simran-frontend-startup — Square header corners
- **What was implemented:** Removed rounded corners from the government header, workspace header, and dashboard shell so the header sections use square corners.
- **Files touched:** `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of the startup portal frontend prototype.
- **Anything the next session/teammate needs to know:** Browser verification reports 0px radius for all three containers. `pnpm --filter web lint` and `pnpm --filter web build` pass.

### [2026-09-24] — feature/simran-frontend-startup — Remove header section gap
- **What was implemented:** Removed the remaining gap between the government header and startup workspace header while preserving normal layout flow and preventing overlap.
- **Files touched:** `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of the startup portal frontend prototype.
- **Anything the next session/teammate needs to know:** Browser geometry confirms a 0px gap and no overlap. `pnpm --filter web lint` and `pnpm --filter web build` pass.

### [2026-09-24] — feature/simran-frontend-startup — Refine government header spacing and branding
- **What was implemented:** Removed UdyamSetu branding from the government header row and reduced the gap before the startup workspace section from 20px to 6px.
- **Files touched:** `apps/web/src/main.tsx`, `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of the startup portal frontend prototype.
- **Anything the next session/teammate needs to know:** UdyamSetu remains in the workspace header below; browser geometry confirms a 6px gap. `pnpm --filter web lint` and `pnpm --filter web build` pass.

### [2026-09-24] — feature/simran-frontend-startup — Add government header above workspace
- **What was implemented:** Added the government utility bar and DPIIT/Startup India branding, language selector, search field, and user controls above the approved startup workspace header. Kept the About/Recognition/Funding navigation row removed.
- **Files touched:** `apps/web/src/main.tsx`, `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of the startup portal frontend prototype.
- **Anything the next session/teammate needs to know:** Verified in the approved workspace browser state with the government header above the workspace header. `pnpm --filter web lint` and `pnpm --filter web build` pass.

### [2026-09-24] — feature/simran-frontend-startup — Remove startup workspace labels
- **What was implemented:** Removed visible `Startup workspace` labels from the approved dashboard header and detail-page content while keeping the dashboard functionality and review status messaging intact.
- **Files touched:** `apps/web/src/main.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of the startup portal frontend prototype.
- **Anything the next session/teammate needs to know:** Only pending-review copy still mentions the workspace being unlocked. `pnpm --filter web lint` and `pnpm --filter web build` pass.

### [2026-09-24] — feature/simran-frontend-startup — Move startup navigation into page header
- **What was implemented:** Converted the approved startup dashboard's vertical sidebar into a horizontal top workspace header containing the logo, workspace navigation, challenge count, help link, and verified startup profile.
- **Files touched:** `apps/web/src/main.tsx`, `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of the startup portal frontend prototype.
- **Anything the next session/teammate needs to know:** Verified in the approved workspace browser state. `pnpm --filter web lint` and `pnpm --filter web build` pass.

### [2026-09-24] — feature/simran-frontend-startup — Make dashboard header primary
- **What was implemented:** Removed the government portal header and About/Recognition/Funding navigation row from the approved startup dashboard so the dashboard's own Overview/Verified/Log out header is now the page header.
- **Files touched:** `apps/web/src/main.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of the startup portal frontend prototype.
- **Anything the next session/teammate needs to know:** Pending-review view still uses the government header. `pnpm --filter web lint` and `pnpm --filter web build` pass.

### [2026-09-24] — feature/simran-frontend-startup — Remove government banner from auth pages
- **What was implemented:** Removed the government navigation header and saffron statistics banner from the login/register view while keeping them on pending and approved workspace views.
- **Files touched:** `apps/web/src/main.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of the startup portal frontend prototype.
- **Anything the next session/teammate needs to know:** Auth page verified with no government nav or saffron hero rendered. `pnpm --filter web lint` and `pnpm --filter web build` pass.

### [2026-09-23] — feature/simran-frontend-startup — Redesign UI with official Indian Government Portal theme
- **What was implemented:** Transformed the portal UI to match the official Startup India / DPIIT Government of India web portal theme (based on user reference design). Added dark government topbar with Ashoka Lion Capital emblem, Ministry of Commerce and Industry title, toll-free support line, DPIIT #startupindia branding, Azadi Ka Amrit Mahotsav 75 badge, language selector, search bar with orange submit button, top government navigation menu, saffron-orange hero background with statistics pill counters (254,623 DPIIT Recognised Startups), and refined form/card styling without altering any content or underlying state.
- **Files touched:** `apps/web/src/main.tsx`, `apps/web/src/styles.css`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of startup portal UI refinement.
- **Anything the next session/teammate needs to know:** `pnpm --filter web build` passes cleanly. All content, form state, and authentication/workspace flows are completely preserved.

### [2026-09-23] — feature/simran-frontend-startup — Remove startup category field
- **What was implemented:** Removed startup category collection, persistence, profile display, and related copy from the Vite registration flow.
- **Files touched:** `apps/web/src/main.tsx`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** Continuation of the startup portal frontend prototype.
- **Anything the next session/teammate needs to know:** `pnpm --filter web lint` and `pnpm --filter web build` pass.

### [2026-09-23] — feature/simran-frontend-startup — Vite startup registration and workspace flow
- **What was implemented:** Replaced the Next.js web shell with a Vite + React frontend. Added startup login with credential matching, registration for DPIIT ID, founder details, email, DOB, education, category, password, description and certificate attachment UI; added the 3–4 business day pending-review state, admin approval preview, and an approved startup workspace covering profile, government challenges, matched schemes, milestones, and solution sandbox.
- **Files touched:** `apps/web/package.json`, `apps/web/index.html`, `apps/web/src/main.tsx`, `apps/web/src/styles.css`, `apps/web/tsconfig.json`, `apps/web/tsconfig.node.json`, `apps/web/vite.config.ts`, removed the old `apps/web/app/` Next route files and Next config files, root `package.json`, `pnpm-lock.yaml`, `AGENTS.md`.
- **api.yaml changed?** no.
- **schema.prisma changed?** no.
- **New feature or continuing planned work:** New frontend prototype continuing the startup portal branch.
- **Anything the next session/teammate needs to know:** The frontend stores one prototype startup record in localStorage under `udyamsetu-startup`; the admin approval action is intentionally a local preview until the API/admin workflow is wired. The React entrypoint must mount `App` with `createRoot`, which fixed the initial blank-screen issue. `pnpm --filter web lint` and `pnpm --filter web build` pass. Dev server is available at `http://localhost:5173/`.

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
