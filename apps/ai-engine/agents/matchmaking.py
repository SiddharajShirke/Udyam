"""Matchmaking Agent — lightweight domain-tag similarity scoring.

Used by fan_out.py to pick the top-N eligible startups (Section 6.1) before
the more expensive sandbox fan-out. This is a real, deterministic scoring
signal (Jaccard similarity over domain tags), not a placeholder — a
Qdrant-embedding-based similarity score is a natural future upgrade
(QDRANT_URL/QDRANT_API_KEY are already in apps/ai-engine/.env.example) but
isn't required for this to be a genuine ranking signal today.
"""


def score_startup(problem_domain_tags: list[str], startup_domain_tags: list[str]) -> float:
    a = {t.lower() for t in problem_domain_tags}
    b = {t.lower() for t in startup_domain_tags}
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def rank_startups(problem_domain_tags: list[str], startups: list[dict]) -> list[dict]:
    """startups: [{"id": ..., "domain_tags": [...]}, ...]

    Returns the same dicts with a `match_score` field added, sorted
    highest-score first.
    """
    scored = [
        {**s, "match_score": score_startup(problem_domain_tags, s.get("domain_tags", []))}
        for s in startups
    ]
    return sorted(scored, key=lambda s: s["match_score"], reverse=True)
