---
name: verify-api-contract
description: Use before opening a pull request that adds or changes an API endpoint. Checks that the implementation's actual request/response shape matches what docs/api.yaml promises, so frontend and backend branches never silently drift apart.
---

Before opening a PR that touches any endpoint in apps/api/routes/ or
apps/ai-engine/agents/:

1. Open docs/api.yaml and find the exact entry for the endpoint(s) touched.
2. Compare field-by-field: every field name, type, and nesting level in the
   actual response must match what api.yaml declares. Same for the request
   body/params.
3. If the implementation needs a shape api.yaml doesn't yet have, update
   api.yaml FIRST, in its own small commit, and flag the change to the team —
   do not let code and contract drift apart silently.
4. Confirm the change is additive wherever possible (new optional field, new
   endpoint) rather than a rename or removal of something another branch
   already depends on.
5. Only after 1-4 are true, proceed to open the PR.
