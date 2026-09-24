import unittest
from datetime import datetime, timedelta, timezone
from agents.hardware_eligibility import calculate_confidence_score, get_next_question
from agents.log_anomaly import detect_login_anomaly
from agents.matchmaking import rank_startups
from agents.schemes_matching import evaluate_scheme_eligibility


class SupportAgentTests(unittest.TestCase):
    def test_matchmaking_ranks_matching_startups_and_excludes_non_matches(self):
        matches = rank_startups(["climate", "iot"], [{"id": "trusted", "domain_tags": ["climate", "iot"], "trust_score": 90}, {"id": "partial", "domain_tags": ["climate"], "trust_score": 100}, {"id": "none", "domain_tags": ["health"], "trust_score": 100}])
        self.assertEqual([match["startup_id"] for match in matches], ["trusted", "partial"])
        self.assertIn("climate", matches[0]["reason"])

    def test_login_spike_is_detected(self):
        now = datetime.now(timezone.utc)
        events = [{"created_at": now - timedelta(days=day)} for day in range(1, 6)] + [{"created_at": now} for _ in range(4)]
        self.assertTrue(detect_login_anomaly(events)["anomaly_detected"])

    def test_normal_logins_do_not_raise_false_alarm(self):
        now = datetime.now(timezone.utc)
        events = [{"created_at": now - timedelta(days=day)} for day in range(6) for _ in range(2)]
        self.assertFalse(detect_login_anomaly(events)["anomaly_detected"])

    def test_hardware_flow_is_deterministic_and_completes(self):
        answers = {"solution_type": "sensor"}
        self.assertEqual(get_next_question(answers), get_next_question(answers))
        complete = {"solution_type": "sensor", "power_source": "battery", "deployment_environment": "outdoor", "connectivity": "lorawan", "prototype_stage": "field_tested"}
        self.assertIsNone(get_next_question(complete))
        self.assertTrue(calculate_confidence_score(complete)["passed_layer_1"])

    def test_schemes_matching_explains_missing_requirements(self):
        startup = {"id": "s1", "dpiit_number": None, "trust_score": 40, "stage": "seed", "domain_tags": ["ai"]}
        schemes = [
            {"id": "sch1", "name": "DeepTech Grant", "eligibility_criteria": {"requires_dpiit": True, "min_trust_score": 50}}
        ]
        results = evaluate_scheme_eligibility(startup, schemes)
        self.assertFalse(results[0]["eligible"])
        self.assertEqual(len(results[0]["missing_requirements"]), 2)
        self.assertIn("DPIIT recognition number required", results[0]["missing_requirements"])

