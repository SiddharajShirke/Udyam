"""Section 2.2 — KPI Generator Agent.

Turns a formatted problem statement into testable KPIs:
[{ name, metric, threshold, weight }], with weights validated (not just
trusted) to sum to 1.0.
"""

from lib.claude_client import ask_claude_text
from lib.json_utils import extract_json

SYSTEM_PROMPT = """You generate measurable KPIs used to test a startup's
submitted solution against a government problem statement.

Return ONLY a JSON array of objects, each with exactly these keys:
- "name": short string
- "metric": what is measured and how (string)
- "threshold": the pass/target value (number or string)
- "weight": float, this KPI's share of the total score

The "weight" fields across ALL KPIs in the array MUST sum to exactly 1.0.
No markdown, no explanation, no code fences — JSON array only."""

WEIGHT_TOLERANCE = 0.01


async def generate_kpis(formatted_problem: dict, domain: str = "general") -> list[dict]:
    user_prompt = f"Domain: {domain}\n\nFormatted problem statement:\n{formatted_problem}"

    kpis = await _generate_once(user_prompt)
    if not _weights_sum_to_one(kpis):
        stricter_prompt = (
            user_prompt
            + "\n\nThe `weight` fields across all KPIs MUST sum to exactly 1.0."
            " Recompute them and return ONLY the JSON array."
        )
        kpis = await _generate_once(stricter_prompt)
        if not _weights_sum_to_one(kpis):
            raise ValueError("KPI weights do not sum to 1.0 after retry")
    return kpis


async def _generate_once(user_prompt: str) -> list[dict]:
    text = await ask_claude_text(SYSTEM_PROMPT, user_prompt)
    try:
        data = extract_json(text)
    except Exception as exc:
        raise ValueError(f"KPI generator response was not valid JSON: {exc}") from exc
    if not isinstance(data, list) or not data:
        raise ValueError("KPI generator did not return a non-empty JSON array")
    return data


def _weights_sum_to_one(kpis: list[dict], tolerance: float = WEIGHT_TOLERANCE) -> bool:
    try:
        total = sum(float(k["weight"]) for k in kpis)
    except (KeyError, TypeError, ValueError):
        return False
    return abs(total - 1.0) <= tolerance
