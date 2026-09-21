# Branch Strategy — InnovateProcure

## Rules

- `main` is always deployable. Nobody pushes directly to `main`.
- Every change is a feature branch off `main`, merged via PR with at least
  one review.
- Branch naming: `<area>/<short-description>`, e.g. `api/registration-routes`,
  `web/ministry-dashboard`, `ai/matchmaking-agent`.
- Keep PRs scoped to one folder/owner area where possible (see the Folder
  Ownership table in `AGENTS.md`) to minimize merge conflicts across the
  five-person team.

## Before opening a PR

1. Run the `verify-api-contract` skill if you touched any endpoint —
   `docs/api.yaml` must match your implementation.
2. Run the `update-agents-log` skill — append a Session Log entry to
   `AGENTS.md` documenting what you built.
3. Make sure CI (`.github/workflows/ci.yml`) passes: lint, typecheck for
   `apps/web` and `apps/api`, and `py_compile` for `apps/ai-engine`.

## Schema and contract changes

Prefer additive changes (new nullable field, new endpoint) over renaming or
removing anything another branch might already depend on. If a breaking
change is unavoidable, flag it to the team before merging.
