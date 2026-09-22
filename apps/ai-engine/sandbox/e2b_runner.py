"""Section 2.3 — E2B Sandbox Driver, and Section 6.2 — the KPI "team of
agents" (performance / correctness / reliability), all hitting the single
open endpoint a startup's submission exposes.

CAVEAT: no live E2B_API_KEY was available while writing this, so the calls
below follow e2b-code-interpreter's documented v1 interface
(Sandbox.create, sandbox.files, sandbox.commands, sandbox.get_host) but
have NOT been exercised against a real sandbox yet — that's the first
thing to verify once a real E2B_API_KEY is in apps/ai-engine/.env. The
timeout/kill safety net (2.3's two independent safeguards) and the KPI
team functions (performance_check/correctness_check/reliability_check,
pure httpx calls) ARE covered by apps/ai-engine/tests/.
"""

import asyncio
import time
from typing import Any

import httpx
from e2b_code_interpreter import Sandbox

from lib.retry import call_with_retry

SANDBOX_TIMEOUT_SECONDS = 180
DEFAULT_PORT = 8080


async def provision_and_start(
    code: str,
    start_cmd: str,
    install_cmd: str | None = "pip install -r requirements.txt",
    port: int = DEFAULT_PORT,
) -> tuple[Sandbox, str]:
    """Create a timed sandbox, write the startup's code, install deps, start
    the app in the background, and return (sandbox, exposed_url).

    Caller MUST kill the returned sandbox — see run_submission(), which
    always does this in a finally block. Never call this directly without
    a matching kill().
    """
    sandbox = await call_with_retry(_create_sandbox, retries=1)

    sandbox.files.write("/home/user/app/main.py", code)

    if install_cmd:
        sandbox.commands.run(install_cmd, cwd="/home/user/app", timeout=120)

    sandbox.commands.run(start_cmd, cwd="/home/user/app", background=True)

    # Give the process a moment to bind its port before building the URL.
    await asyncio.sleep(2)

    host = sandbox.get_host(port)
    endpoint_url = f"https://{host}"
    return sandbox, endpoint_url


async def _create_sandbox() -> Sandbox:
    return Sandbox.create(timeout=SANDBOX_TIMEOUT_SECONDS)


async def run_submission(
    code: str,
    kpis: list[dict],
    start_cmd: str = "python main.py",
    install_cmd: str | None = "pip install -r requirements.txt",
) -> dict:
    """Full E2B lifecycle for one startup's code submission: provision,
    test, ALWAYS kill.

    timeout=180 on Sandbox.create() is the second, independent safety net —
    it fires even if this function's own code crashes before reaching
    `finally` (e.g. a bug between provisioning and the try block existing).
    """
    sandbox: Sandbox | None = None
    try:
        sandbox, endpoint_url = await provision_and_start(code, start_cmd, install_cmd)
        return await run_kpi_team(endpoint_url, kpis)
    finally:
        if sandbox is not None:
            sandbox.kill()


# ---- Section 6.2 — KPI team: three angles on the one open endpoint ----


async def run_kpi_team(endpoint_url: str, kpis: list[dict]) -> dict:
    scores: dict[str, Any] = {}
    scores.update(await performance_check(endpoint_url))
    scores.update(await correctness_check(endpoint_url, kpis))
    scores.update(await reliability_check(endpoint_url))
    return scores


async def performance_check(endpoint_url: str, timeout: float = 10.0) -> dict:
    async with httpx.AsyncClient() as client:
        start = time.monotonic()
        try:
            response = await client.get(endpoint_url, timeout=timeout)
            elapsed_ms = (time.monotonic() - start) * 1000
            return {
                "performance_response_time_ms": round(elapsed_ms, 1),
                "performance_ok": response.status_code < 500,
            }
        except (httpx.TimeoutException, httpx.ConnectError):
            return {"performance_response_time_ms": None, "performance_ok": False}


async def correctness_check(endpoint_url: str, kpis: list[dict], timeout: float = 10.0) -> dict:
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(endpoint_url, timeout=timeout)
        except (httpx.TimeoutException, httpx.ConnectError):
            return {"correctness_ok": False, "correctness_status_code": None}
        return {
            "correctness_ok": response.status_code == 200,
            "correctness_status_code": response.status_code,
        }


async def reliability_check(endpoint_url: str, attempts: int = 5, timeout: float = 10.0) -> dict:
    successes = 0
    async with httpx.AsyncClient() as client:
        for _ in range(attempts):
            try:
                response = await client.get(endpoint_url, timeout=timeout)
                if response.status_code < 500:
                    successes += 1
            except (httpx.TimeoutException, httpx.ConnectError):
                pass
    return {
        "reliability_success_rate": round(successes / attempts, 2),
        "reliability_error_rate": round(1 - (successes / attempts), 2),
    }
