"""Section 2.1 — Problem Formatter Agent.

Turns a ministry's raw plain-language problem into a structured problem
statement: { title, outcome, domain_tags[], suggested_kpis[], scope }.
"""

from lib.claude_client import ask_claude_text
from lib.json_utils import extract_json

SYSTEM_PROMPT = """You are a government procurement problem-statement formatter.
Given a department's plain-language description of a problem, turn it into a
structured, testable problem statement.

Return ONLY a JSON object with exactly these keys, nothing else:
- "title": short string
- "outcome": the specific, measurable outcome the department wants
- "domain_tags": array of short lowercase strings (e.g. ["healthcare", "logistics"])
- "suggested_kpis": array of short strings naming candidate KPIs to test a solution against
- "scope": string describing what is in scope and out of scope

No markdown, no explanation, no code fences — JSON only."""

REQUIRED_KEYS = {"title", "outcome", "domain_tags", "suggested_kpis", "scope"}


async def format_problem(raw_input: str, department_type: str = "general") -> dict:
    user_prompt = f"Department type: {department_type}\n\nRaw problem statement:\n{raw_input}"

    text = await ask_claude_text(SYSTEM_PROMPT, user_prompt)
    try:
        data = _parse(text)
    except ValueError:
        stricter_prompt = (
            user_prompt
            + "\n\nReturn ONLY JSON. No explanation, no markdown, no code fences."
        )
        text = await ask_claude_text(SYSTEM_PROMPT, stricter_prompt)
        data = _parse(text)  # let this raise if it still fails — no silent fallback

    missing = REQUIRED_KEYS - data.keys()
    if missing:
        raise ValueError(f"Problem formatter response missing keys: {sorted(missing)}")
    return data


def _parse(text: str) -> dict:
    try:
        data = extract_json(text)
    except Exception as exc:  # json.JSONDecodeError, etc.
        raise ValueError(f"Problem formatter response was not valid JSON: {exc}") from exc
    if not isinstance(data, dict):
        raise ValueError("Problem formatter response was not a JSON object")
    return data
