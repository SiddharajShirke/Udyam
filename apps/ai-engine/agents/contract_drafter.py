"""Section 2.5 — Contract Drafter Agent.

Fixed GFR-style structure lives in templates/contract.jinja2; Claude fills
in the variable content (outcome description, milestone descriptions, IP
clause wording appropriate to the specific deal).
"""

from pathlib import Path

from jinja2 import Environment, FileSystemLoader, select_autoescape

from lib.claude_client import ask_claude_text
from lib.json_utils import extract_json

TEMPLATE_DIR = Path(__file__).resolve().parent.parent / "templates"
_env = Environment(loader=FileSystemLoader(str(TEMPLATE_DIR)), autoescape=select_autoescape())

SYSTEM_PROMPT = """You draft the variable content for a GFR-style government
procurement contract, given the winning startup's evaluation result and the
original problem statement.

Return ONLY a JSON object with exactly these keys:
- "outcome_description": string, plain description of what's being delivered
- "milestones": array of {"title", "kpi_threshold", "amount_lakhs"}
- "ip_clause": string, IP ownership/licensing wording appropriate to this deal

No markdown, no explanation, no code fences — JSON only."""

REQUIRED_KEYS = {"outcome_description", "milestones", "ip_clause"}


async def draft_contract(evaluation: dict, winner: dict, problem: dict) -> dict:
    if not evaluation or not winner or not problem:
        raise ValueError(
            "draft_contract requires non-empty evaluation, winner, and problem —"
            " refusing to silently draft a contract from incomplete input"
        )

    user_prompt = (
        f"Problem statement:\n{problem}\n\n"
        f"Winning startup:\n{winner}\n\n"
        f"Evaluation result:\n{evaluation}"
    )
    text = await ask_claude_text(SYSTEM_PROMPT, user_prompt, max_tokens=3072)

    try:
        content = extract_json(text)
    except Exception as exc:
        raise ValueError(f"Contract drafter response was not valid JSON: {exc}") from exc
    if not isinstance(content, dict):
        raise ValueError("Contract drafter response was not a JSON object")

    missing = REQUIRED_KEYS - content.keys()
    if missing:
        raise ValueError(f"Contract drafter response missing keys: {sorted(missing)}")

    template = _env.get_template("contract.jinja2")
    contract_text = template.render(
        problem=problem,
        winner=winner,
        outcome_description=content["outcome_description"],
        milestones=content["milestones"],
    )

    return {
        "contract_text": contract_text,
        "ip_clause": content["ip_clause"],
        "milestones": content["milestones"],
    }
