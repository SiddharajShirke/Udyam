"""Section 9.5 — fan-out compatibility: test_submission must be the single
entry point regardless of submission_type, so nothing above it ever
branches on e2b vs external_url."""

import pytest

# Aliased on import: pytest auto-collects any callable named `test_*`, and
# the function under test here is itself named `test_submission` — without
# the alias pytest would try to collect it as a (fixture-less) test case.
from sandbox.submission import test_submission as call_test_submission


@pytest.mark.asyncio
async def test_unknown_submission_type_rejected():
    with pytest.raises(ValueError, match="Unknown submission_type"):
        await call_test_submission("carrier_pigeon", "target", kpis=[])


@pytest.mark.asyncio
async def test_external_url_rejected_target_returns_error_not_raise():
    # An invalid URL must produce a clean {"status": "error", ...} result,
    # not an unhandled exception — the fan-out relies on this.
    result = await call_test_submission("external_url", "https://localhost:5000", kpis=[])
    assert result["status"] == "error"
    assert result["scores"] is None
    assert "blocked internal address" in result["error"]
