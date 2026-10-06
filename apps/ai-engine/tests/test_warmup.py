import httpx
import pytest
import respx

from sandbox.submission import warm_up


@pytest.mark.asyncio
@respx.mock
async def test_warm_up_succeeds_immediately():
    respx.get("https://awake.example/").mock(return_value=httpx.Response(200))
    assert await warm_up("https://awake.example/", max_attempts=3, base_delay=0) is True


@pytest.mark.asyncio
@respx.mock
async def test_warm_up_succeeds_after_cold_start(monkeypatch):
    # First two attempts time out (cold start), third succeeds.
    route = respx.get("https://cold.example/")
    route.side_effect = [
        httpx.TimeoutException("cold"),
        httpx.TimeoutException("still cold"),
        httpx.Response(200),
    ]
    assert await warm_up("https://cold.example/", max_attempts=3, base_delay=0) is True


@pytest.mark.asyncio
@respx.mock
async def test_warm_up_fails_after_all_attempts():
    respx.get("https://dead.example/").mock(side_effect=httpx.ConnectError("refused"))
    assert await warm_up("https://dead.example/", max_attempts=3, base_delay=0) is False


@pytest.mark.asyncio
@respx.mock
async def test_warm_up_treats_5xx_as_not_awake_yet():
    route = respx.get("https://flaky.example/")
    route.side_effect = [httpx.Response(503), httpx.Response(200)]
    assert await warm_up("https://flaky.example/", max_attempts=3, base_delay=0) is True
