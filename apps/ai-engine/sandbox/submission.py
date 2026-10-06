"""Section 9 — unified submission handler.

A startup can submit either a code reference (tested via E2B) or a live URL
to something they've already deployed themselves (Hugging Face Spaces,
Render, Vercel, AWS, GCP, Azure, or anywhere else). Both paths converge on
test_submission() and return the identical result shape — nothing
downstream (Evaluation Agent, fan-out ranking, the frontend) ever needs to
know or care which path a given startup used.
"""

import asyncio

import aiohttp
import httpx

from sandbox import e2b_runner
from sandbox.http_client import get_status_code
from sandbox.url_security import ValidatedExternalUrl, validate_external_url


async def warm_up(
    url: str | ValidatedExternalUrl,
    max_attempts: int = 3,
    base_delay: int = 5,
) -> bool:
    """Handles cold starts on free-tier hosts (Hugging Face Spaces, Render).

    Never counted toward KPI scoring — only confirms the endpoint is awake
    before run_kpi_team() runs the actual, scored checks.
    """
    for attempt in range(max_attempts):
        try:
            status_code = await get_status_code(url, timeout=45)
            if status_code < 500:
                return True
        except (
            aiohttp.ClientError,
            asyncio.TimeoutError,
            httpx.TimeoutException,
            httpx.ConnectError,
        ):
            pass
        if attempt < max_attempts - 1:
            await asyncio.sleep(base_delay * (attempt + 1))  # 5s, 10s, 15s
    return False


async def test_submission(submission_type: str, target: str, kpis: list[dict]) -> dict:
    """Single entry point for both submission paths.

    Returns {"status": "ok" | "unreachable" | "error", "scores": dict | None,
    "error": str | None} regardless of path — callers (including fan_out.py)
    never branch on submission_type.
    """
    if submission_type == "e2b":
        try:
            scores = await e2b_runner.run_submission(code=target, kpis=kpis)
            return {"status": "ok", "scores": scores, "error": None}
        except Exception as exc:  # noqa: BLE001 - one bad submission must never crash the batch
            return {"status": "error", "scores": None, "error": str(exc)}

    if submission_type == "external_url":
        try:
            validated_url = validate_external_url(target)
        except ValueError as exc:
            return {"status": "error", "scores": None, "error": str(exc)}

        awake = await warm_up(validated_url)
        if not awake:
            return {
                "status": "unreachable",
                "scores": None,
                "error": "Endpoint did not respond after warm-up attempts",
            }

        scores = await e2b_runner.run_kpi_team(validated_url, kpis)
        return {"status": "ok", "scores": scores, "error": None}

    raise ValueError(f"Unknown submission_type: {submission_type}")
