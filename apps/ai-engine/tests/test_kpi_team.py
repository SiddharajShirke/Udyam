"""Section 6.2 — the KPI team's pure httpx logic, mocked so no real E2B
sandbox or network access is needed."""

import httpx
import pytest
import respx

from sandbox.e2b_runner import correctness_check, performance_check, reliability_check


@pytest.mark.asyncio
@respx.mock
async def test_performance_check_ok():
    respx.get("https://app.example/").mock(return_value=httpx.Response(200))
    result = await performance_check("https://app.example/")
    assert result["performance_ok"] is True
    assert result["performance_response_time_ms"] is not None


@pytest.mark.asyncio
@respx.mock
async def test_performance_check_unreachable():
    respx.get("https://app.example/").mock(side_effect=httpx.ConnectError("refused"))
    result = await performance_check("https://app.example/")
    assert result["performance_ok"] is False
    assert result["performance_response_time_ms"] is None


@pytest.mark.asyncio
@respx.mock
async def test_correctness_check_200():
    respx.get("https://app.example/").mock(return_value=httpx.Response(200))
    result = await correctness_check("https://app.example/", kpis=[])
    assert result == {"correctness_ok": True, "correctness_status_code": 200}


@pytest.mark.asyncio
@respx.mock
async def test_reliability_check_all_succeed():
    respx.get("https://app.example/").mock(return_value=httpx.Response(200))
    result = await reliability_check("https://app.example/", attempts=5)
    assert result["reliability_success_rate"] == 1.0
    assert result["reliability_error_rate"] == 0.0


@pytest.mark.asyncio
@respx.mock
async def test_reliability_check_partial_failures():
    route = respx.get("https://flaky.example/")
    route.side_effect = [
        httpx.Response(200),
        httpx.Response(500),
        httpx.Response(200),
        httpx.ConnectError("boom"),
        httpx.Response(200),
    ]
    result = await reliability_check("https://flaky.example/", attempts=5)
    assert result["reliability_success_rate"] == 0.6
