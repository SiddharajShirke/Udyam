"""Section 9 — unified submission handler.

A startup can submit either a code reference (tested via E2B) or a live URL
to something they've already deployed themselves (Hugging Face Spaces,
Render, Vercel, AWS, GCP, Azure, or anywhere else). Both paths converge on
test_submission() and return the identical result shape — nothing
downstream (Evaluation Agent, fan-out ranking, the frontend) ever needs to
know or care which path a given startup used.
"""

import asyncio
import ipaddress
import socket
from urllib.parse import urlparse

import httpx

from sandbox import e2b_runner

# Deliberately no allowlist of "approved" platforms — the point is
# supporting Hugging Face, Render, Vercel, AWS, GCP, and Azure alike, so the
# correct approach is blocking dangerous internal targets, not trying to
# enumerate every legitimate external host.
BLOCKED_HOSTS = {"localhost", "127.0.0.1", "0.0.0.0", "169.254.169.254", "::1"}


def validate_external_url(url: str) -> str:
    """SSRF-safe URL validation — checks the RESOLVED IP, not just the
    hostname string, to catch DNS rebinding (a domain that looks external
    but resolves to a private/internal address)."""
    parsed = urlparse(url)
    if parsed.scheme != "https":
        raise ValueError("Only HTTPS URLs are accepted")
    if not parsed.hostname:
        raise ValueError("Invalid URL — no hostname")

    hostname = parsed.hostname.lower()
    if hostname in BLOCKED_HOSTS:
        raise ValueError("URL points to a blocked internal address")

    try:
        resolved_ip = socket.gethostbyname(hostname)
    except socket.gaierror as exc:
        raise ValueError("Could not resolve hostname") from exc

    ip_obj = ipaddress.ip_address(resolved_ip)
    if ip_obj.is_private or ip_obj.is_loopback or ip_obj.is_link_local or ip_obj.is_reserved:
        raise ValueError("URL resolves to a private/internal address — rejected")

    return url


async def warm_up(url: str, max_attempts: int = 3, base_delay: int = 5) -> bool:
    """Handles cold starts on free-tier hosts (Hugging Face Spaces, Render).

    Never counted toward KPI scoring — only confirms the endpoint is awake
    before run_kpi_team() runs the actual, scored checks.
    """
    async with httpx.AsyncClient() as client:
        for attempt in range(max_attempts):
            try:
                response = await client.get(url, timeout=45)
                if response.status_code < 500:
                    return True
            except (httpx.TimeoutException, httpx.ConnectError):
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
