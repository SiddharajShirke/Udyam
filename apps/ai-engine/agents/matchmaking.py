"""Deterministic, explainable startup-to-problem matching."""


def rank_startups(problem_tags: list[str], startups: list[dict]) -> list[dict]:
    """Rank by 70% tag overlap and 30% of the startup's 0-100 trust score."""
    problem_tag_set = {tag.strip().lower() for tag in problem_tags if tag.strip()}
    if not problem_tag_set:
        return []
    matches = []
    for startup in startups:
        startup_tags = {tag.strip().lower() for tag in (startup.get("domain_tags") or []) if tag.strip()}
        overlap = sorted(problem_tag_set & startup_tags)
        if not overlap:
            continue
        overlap_score = len(overlap) / len(problem_tag_set)
        trust_score = max(0, min(100, int(startup.get("trust_score") or 0))) / 100
        matches.append({"startup_id": str(startup["id"]), "match_score": round(overlap_score * 70 + trust_score * 30, 2), "reason": f"Matches domain tags: {', '.join(overlap)}; trust score contributes to ranking."})
    return sorted(matches, key=lambda match: match["match_score"], reverse=True)
