"""Section 2.7 / 2.8 test cases — every /ai/* route must 401 without the
correct X-Internal-Secret header, and this must happen before any agent
logic runs (so this test needs no real ANTHROPIC_API_KEY / E2B_API_KEY —
FastAPI evaluates the Depends() before the route body executes)."""

import os

import pytest
from fastapi import HTTPException

from lib.internal_auth import require_internal_secret


def test_missing_header_rejected():
    with pytest.raises(HTTPException) as exc_info:
        require_internal_secret(x_internal_secret=None)
    assert exc_info.value.status_code == 401


def test_wrong_secret_rejected():
    with pytest.raises(HTTPException) as exc_info:
        require_internal_secret(x_internal_secret="wrong-value")
    assert exc_info.value.status_code == 401


def test_correct_secret_passes():
    os.environ["INTERNAL_SECRET"] = "test-secret"
    require_internal_secret(x_internal_secret="test-secret")  # must not raise


def test_no_env_secret_configured_rejects_everything(monkeypatch):
    monkeypatch.delenv("INTERNAL_SECRET", raising=False)
    with pytest.raises(HTTPException) as exc_info:
        require_internal_secret(x_internal_secret="anything")
    assert exc_info.value.status_code == 401
