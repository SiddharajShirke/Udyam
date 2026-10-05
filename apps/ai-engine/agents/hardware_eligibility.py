"""Deterministic adaptive Layer-1 hardware eligibility flow."""

LAYER_1_THRESHOLD = 60


def _question(question_id: str, text: str, options: list[str]) -> dict:
    return {"id": question_id, "text": text, "options": options}


def get_next_question(previous_answers: dict) -> dict | None:
    answers = previous_answers or {}
    if "solution_type" not in answers:
        return _question("solution_type", "What kind of hardware is this?", ["sensor", "controller", "actuator", "device"])
    if answers["solution_type"] in {"sensor", "device"} and "power_source" not in answers:
        return _question("power_source", "What is the primary power source?", ["battery", "mains", "solar", "other"])
    if "deployment_environment" not in answers:
        return _question("deployment_environment", "Where will the hardware operate?", ["indoor", "outdoor", "industrial", "mixed"])
    if "connectivity" not in answers:
        return _question("connectivity", "How will it connect or report data?", ["offline", "wifi", "cellular", "lorawan", "other"])
    if "prototype_stage" not in answers:
        return _question("prototype_stage", "What is the prototype stage?", ["concept", "prototype", "field_tested", "production_ready"])
    return None


def calculate_confidence_score(all_answers: dict) -> dict:
    answers = all_answers or {}
    required = {"solution_type", "deployment_environment", "connectivity", "prototype_stage"}
    if answers.get("solution_type") in {"sensor", "device"}:
        required.add("power_source")
    completeness = sum(key in answers and bool(answers[key]) for key in required) / len(required)
    stage_points = {"concept": 0, "prototype": 10, "field_tested": 20, "production_ready": 25}
    connectivity_points = 10 if answers.get("connectivity") not in {None, "offline"} else 0
    score = round(min(100, completeness * 65 + stage_points.get(answers.get("prototype_stage"), 0) + connectivity_points))
    return {"confidence_score": score, "passed_layer_1": score >= LAYER_1_THRESHOLD}
