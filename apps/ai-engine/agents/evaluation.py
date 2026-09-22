"""Section 2.4 + Round 2 Section 6.3 — Evaluation Agent.

Section 6.3 supersedes 2.4's flat { summary, ranking, winner_recommendation }
shape with a structured, sectioned report the Evaluator can read like a
document. This output is a draft for human review (the Evaluator role) —
this agent's job ends at producing an honest, well-reasoned report, not at
making the final call.
"""

from lib.claude_client import ask_claude_text
from lib.json_utils import extract_json

SYSTEM_PROMPT = """You are an evaluation agent comparing one or more
startups' sandbox test results against a government problem's KPIs.

Return ONLY a JSON object with exactly these keys:
- "executive_summary": short string, the overall verdict
- "per_kpi_breakdown": array of {"kpi", "startup_scores", "interpretation"}
- "comparison_table": array of rows comparing startups side by side
- "recommendation": string, a specific recommended next step
- "caveats": array of strings, anything the human Evaluator should double-check

This is a DRAFT for a human Evaluator to review — be honest and specific,
never overstate confidence. No markdown, no explanation outside the JSON,
no code fences — JSON only."""

REQUIRED_SECTIONS = (
    "executive_summary",
    "per_kpi_breakdown",
    "comparison_table",
    "recommendation",
    "caveats",
)


async def evaluate_submissions(sandbox_scores: dict, kpis: list[dict]) -> dict:
    """sandbox_scores: {startup_id: {kpi_name: score, ...}, ...}"""
    if not sandbox_scores:
        raise ValueError("evaluate_submissions requires non-empty sandbox_scores")
    if not kpis:
        raise ValueError("evaluate_submissions requires non-empty kpis")

    user_prompt = f"KPIs:\n{kpis}\n\nSandbox scores per startup:\n{sandbox_scores}"
    text = await ask_claude_text(SYSTEM_PROMPT, user_prompt, max_tokens=3072)

    try:
        report = extract_json(text)
    except Exception as exc:
        raise ValueError(f"Evaluation report was not valid JSON: {exc}") from exc
    if not isinstance(report, dict):
        raise ValueError("Evaluation report was not a JSON object")

    missing = [s for s in REQUIRED_SECTIONS if s not in report]
    if missing:
        raise ValueError(f"Evaluation report missing sections: {missing}")
    empty = [s for s in REQUIRED_SECTIONS if report[s] in (None, "", [], {})]
    if empty:
        raise ValueError(f"Evaluation report sections are empty: {empty}")

    return report
