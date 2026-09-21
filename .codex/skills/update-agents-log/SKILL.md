---
name: update-agents-log
description: Use at the end of every coding session in this repo. Appends a structured entry to AGENTS.md's Session Log documenting what was built, so the next session (by you or a teammate) has full context without re-reading the whole codebase.
---

At the end of any session where code was written or changed in this repository:

1. Open AGENTS.md
2. Under "## SESSION LOG", insert a new entry directly below the instruction
   block, in the exact format already shown there — newest entry first.
3. Fill in every field honestly: what was built, which files changed, whether
   api.yaml or schema.prisma changed, whether this was new/experimental work
   or continuation of previously assigned work, and any open thread the next
   session needs to pick up.
4. Do this even if the session was exploratory or incomplete — an honest
   "started X, not finished, blocked on Y" entry is more useful than silence.
5. Commit AGENTS.md's update in the same commit as the code change it describes.
