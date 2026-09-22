from agents.matchmaking import rank_startups, score_startup


def test_score_startup_full_overlap():
    assert score_startup(["healthcare", "logistics"], ["healthcare", "logistics"]) == 1.0


def test_score_startup_no_overlap():
    assert score_startup(["healthcare"], ["agritech"]) == 0.0


def test_score_startup_partial_overlap():
    score = score_startup(["healthcare", "logistics"], ["healthcare", "fintech"])
    assert score == pytest_approx(1 / 3)


def pytest_approx(value, tol=1e-9):
    class _Approx:
        def __eq__(self, other):
            return abs(other - value) < tol

    return _Approx()


def test_score_startup_case_insensitive():
    assert score_startup(["Healthcare"], ["healthcare"]) == 1.0


def test_score_startup_empty_tags_is_zero():
    assert score_startup([], ["healthcare"]) == 0.0
    assert score_startup(["healthcare"], []) == 0.0


def test_rank_startups_orders_highest_first():
    startups = [
        {"id": "s1", "domain_tags": ["agritech"]},
        {"id": "s2", "domain_tags": ["healthcare", "logistics"]},
        {"id": "s3", "domain_tags": ["healthcare"]},
    ]
    ranked = rank_startups(["healthcare", "logistics"], startups)
    assert [s["id"] for s in ranked] == ["s2", "s3", "s1"]
    assert ranked[0]["match_score"] >= ranked[1]["match_score"] >= ranked[2]["match_score"]
