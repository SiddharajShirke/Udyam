"""Section 2.7 — internal service auth for every /ai/* route.

Every route under /ai/* depends on this — reject with 401 if the shared
X-Internal-Secret header is missing or doesn't match INTERNAL_SECRET
(coordinated with the Node.js API — must be the identical value in both
apps/api/.env and apps/ai-engine/.env).
"""

import os

from fastapi import Header, HTTPException, status


def require_internal_secret(x_internal_secret: str | None = Header(default=None)) -> None:
    expected = os.environ.get("INTERNAL_SECRET")
    if not expected or x_internal_secret != expected:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid X-Internal-Secret header",
        )
