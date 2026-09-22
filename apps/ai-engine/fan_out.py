"""Section 6.1 — Autonomous Best-Match Fan-Out.

Upgrades "find a startup for this problem" into "find the best startup
among everyone eligible" — a real optimization step, not just a filter.
Node calls run_fanout() with { problem_id, formatted_ps, kpis, startups }.
"""

import asyncio

from agents.matchmaking import rank_startups
from lib.claude_client import ask_claude_text
from lib.json_utils import extract_json
from sandbox.submission import test_submission

# E2B's free tier caps concurrent sandboxes at 20, shared across the whole
# platform. Capping one fan-out at 6 (top 6 by Matchmaking Agent score)
# still fully demonstrates "find the best among the eligible pool," while
# leaving real headroom for everything else happening concurrently. This is
# a deliberate safety margin, not a shortcut — see docs/ARCHITECTURE.md.
FAN_OUT_CAP = 6

RANKING_SYSTEM_PROMPT = """You compare multiple startups' sandbox test
results for the same government problem and rank them.

Return ONLY a JSON object with exactly these keys:
- "ranked": array of {"startup_id", "total_score", "rank"}, best first
- "best_startup_id": the single best startup's id
- "per_startup_feedback": object mapping startup_id -> a specific,
  comparative reason for its ranking (not just "score X > score Y" restated)

Startups whose result has status "error" or "unreachable" must still
appear in "ranked" (ranked last, with total_score 0) and get an honest
per_startup_feedback entry explaining why. No markdown, no explanation
outside the JSON, no code fences — JSON only."""


async def run_fanout(
    problem_id: str,
    formatted_ps: dict,
    kpis: list[dict],
    startups: list[dict],
) -> dict:
    """startups: [{"id", "domain_tags", "submission_type", "submission_target"}, ...]"""
    if not startups:
        raise ValueError("run_fanout requires at least one eligible startup")

    ranked_by_match = rank_startups(formatted_ps.get("domain_tags", []), startups)
    candidates = ranked_by_match[:FAN_OUT_CAP]

    # Run concurrently — 20 sequential sandbox runs would be far too slow
    # for a live demo. One startup's failure is caught inside _run_one so
    # it never blocks or cancels the rest of the batch.
    results = await asyncio.gather(*(_run_one(c, kpis) for c in candidates))

    completed = {c["id"]: r for c, r in zip(candidates, results)}

    ranking = await _rank_with_claude(problem_id, completed)
    return {
        "candidates_considered": len(candidates),
        "results": completed,
        **ranking,
    }


async def _run_one(startup: dict, kpis: list[dict]) -> dict:
    try:
        return await test_submission(
            startup["submission_type"], startup["submission_target"], kpis
        )
    except Exception as exc:  # noqa: BLE001 - isolate one startup's failure from the batch
        return {"status": "error", "scores": None, "error": str(exc)}


async def _rank_with_claude(problem_id: str, completed: dict[str, dict]) -> dict:
    user_prompt = f"Problem: {problem_id}\n\nResults per startup:\n{completed}"
    text = await ask_claude_text(RANKING_SYSTEM_PROMPT, user_prompt, max_tokens=3072)

    try:
        data = extract_json(text)
    except Exception as exc:
        raise ValueError(f"Fan-out ranking response was not valid JSON: {exc}") from exc

    missing = [k for k in ("ranked", "best_startup_id", "per_startup_feedback") if k not in data]
    if missing:
        raise ValueError(f"Fan-out ranking response missing keys: {missing}")
    return data
