from agents.kpi_generator import _weights_sum_to_one


def test_weights_sum_to_one_exact():
    kpis = [{"weight": 0.5}, {"weight": 0.5}]
    assert _weights_sum_to_one(kpis) is True


def test_weights_sum_to_one_within_tolerance():
    kpis = [{"weight": 0.33}, {"weight": 0.33}, {"weight": 0.34}]
    assert _weights_sum_to_one(kpis) is True


def test_weights_not_summing_to_one():
    kpis = [{"weight": 0.5}, {"weight": 0.2}]
    assert _weights_sum_to_one(kpis) is False


def test_weights_missing_key():
    kpis = [{"name": "latency"}, {"weight": 0.5}]
    assert _weights_sum_to_one(kpis) is False


def test_weights_non_numeric():
    kpis = [{"weight": "fast"}]
    assert _weights_sum_to_one(kpis) is False
