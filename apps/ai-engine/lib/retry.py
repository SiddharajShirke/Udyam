"""Section 8 — one shared retry wrapper for every external call (Claude, E2B).

Not for use around a live KPI test call against a startup's endpoint —
retrying there would change what's actually being measured.
"""

import logging
from typing import Awaitable, Callable, TypeVar

import httpx

T = TypeVar("T")

RETRYABLE_EXCEPTIONS: tuple[type[BaseException], ...] = (
    TimeoutError,
    ConnectionError,
    httpx.TimeoutException,
    httpx.ConnectError,
)

try:
    from anthropic import APIConnectionError, APITimeoutError

    RETRYABLE_EXCEPTIONS = RETRYABLE_EXCEPTIONS + (APIConnectionError, APITimeoutError)
except ImportError:  # pragma: no cover - anthropic is a hard dependency in prod
    pass

logger = logging.getLogger(__name__)


async def call_with_retry(fn: Callable[..., Awaitable[T]], *args, retries: int = 1, **kwargs) -> T:
    try:
        return await fn(*args, **kwargs)
    except RETRYABLE_EXCEPTIONS as exc:
        if retries > 0:
            logger.warning(
                "call_with_retry: %s failed (%s), retrying (%d left)",
                getattr(fn, "__name__", fn),
                exc,
                retries,
            )
            return await call_with_retry(fn, *args, retries=retries - 1, **kwargs)
        raise
