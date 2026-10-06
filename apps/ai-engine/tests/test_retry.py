import pytest

from lib.retry import call_with_retry


@pytest.mark.asyncio
async def test_succeeds_first_try():
    async def fn():
        return "ok"

    assert await call_with_retry(fn, retries=1) == "ok"


@pytest.mark.asyncio
async def test_retries_once_then_succeeds():
    calls = {"n": 0}

    async def fn():
        calls["n"] += 1
        if calls["n"] == 1:
            raise TimeoutError("transient")
        return "ok"

    assert await call_with_retry(fn, retries=1) == "ok"
    assert calls["n"] == 2


@pytest.mark.asyncio
async def test_raises_after_retries_exhausted():
    calls = {"n": 0}

    async def fn():
        calls["n"] += 1
        raise ConnectionError("still down")

    with pytest.raises(ConnectionError):
        await call_with_retry(fn, retries=1)
    assert calls["n"] == 2  # original attempt + 1 retry


@pytest.mark.asyncio
async def test_non_retryable_exception_propagates_immediately():
    calls = {"n": 0}

    async def fn():
        calls["n"] += 1
        raise ValueError("not a transient failure")

    with pytest.raises(ValueError):
        await call_with_retry(fn, retries=1)
    assert calls["n"] == 1  # never retried
