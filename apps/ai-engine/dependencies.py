"""Shared request dependencies for internal AI-engine endpoints."""

import os
import secrets

from fastapi import Header, HTTPException, status


async def verify_internal_secret(x_internal_secret: str | None = Header(default=None)) -> None:
    """Reject calls that did not originate from the trusted Node API service."""
    expected_secret = os.getenv("INTERNAL_SECRET")
    if not expected_secret or not x_internal_secret or not secrets.compare_digest(x_internal_secret, expected_secret):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or missing internal service secret")
