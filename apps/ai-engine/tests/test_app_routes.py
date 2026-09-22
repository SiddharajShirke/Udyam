"""End-to-end-ish test via FastAPI's TestClient: confirms /health is public
and every /ai/* route 401s without the header — all without needing real
ANTHROPIC_API_KEY/E2B_API_KEY, since the 401 fires before any agent code
runs."""

import os

os.environ.setdefault("INTERNAL_SECRET", "test-secret")

from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_health_is_public():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_ai_routes_reject_missing_header():
    for path in (
        "/ai/format-problem",
        "/ai/generate-kpis",
        "/ai/evaluate",
        "/ai/draft-contract",
        "/ai/fanout",
    ):
        response = client.post(path, json={})
        assert response.status_code == 401, f"{path} did not 401 without the header"


def test_ai_routes_reject_wrong_header():
    response = client.post(
        "/ai/format-problem", json={}, headers={"X-Internal-Secret": "wrong"}
    )
    assert response.status_code == 401
