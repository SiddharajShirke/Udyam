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
    """Return explainable support-API matches weighted by overlap and trust."""
    problem_tags = {tag.strip().lower() for tag in problem_domain_tags if tag.strip()}
    if not problem_tags:
        return []

    matches = []
    for startup in startups:
        startup_tags = {
            tag.strip().lower()
            for tag in (startup.get("domain_tags") or [])
            if tag.strip()
        }
        overlap = sorted(problem_tags & startup_tags)
        if not overlap:
            continue

        trust_score = max(0, min(100, int(startup.get("trust_score") or 0)))
        overlap_score = len(overlap) / len(problem_tags)
        matches.append(
            {
                "startup_id": str(startup["id"]),
                "match_score": round(overlap_score * 70 + trust_score * 0.3, 2),
                "reason": f"Matches domain tags: {', '.join(overlap)}; trust score contributes to ranking.",
            }
        )
    return sorted(matches, key=lambda match: match["match_score"], reverse=True)


def rank_fanout_startups(problem_domain_tags: list[str], startups: list[dict]) -> list[dict]:
    """Preserve candidate data while ranking the sandbox pipeline's shortlist."""
    scored = [
        {**s, "match_score": score_startup(problem_domain_tags, s.get("domain_tags", []))}
        for s in startups
    ]
    return sorted(scored, key=lambda s: s["match_score"], reverse=True)
