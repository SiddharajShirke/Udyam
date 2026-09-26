"""Deterministic Schemes & Policy Matching Engine."""

def evaluate_scheme_eligibility(startup: dict, schemes: list[dict]) -> list[dict]:
    """
    Evaluates a startup profile against a list of schemes and their eligibility criteria.
    Returns a list of evaluations with boolean eligibility and specific missing requirements.
    """
    results = []
    
    for scheme in schemes:
        criteria = scheme.get("eligibility_criteria", {}) or {}
        missing = []
        
        # 1. DPIIT Requirement
        if criteria.get("requires_dpiit", False):
            if not startup.get("dpiit_number"):
                missing.append("DPIIT recognition number required")
                
        # 2. Minimum Trust Score
        min_trust = criteria.get("min_trust_score", 0)
        if (startup.get("trust_score") or 0) < min_trust:
            missing.append(f"Trust score below required threshold of {min_trust}")
            
        # 3. Startup Stage
        allowed_stages = criteria.get("allowed_stages", [])
        if allowed_stages and startup.get("stage") not in allowed_stages:
            missing.append(f"Stage '{startup.get('stage')}' not in eligible stages: {', '.join(allowed_stages)}")
            
        # 4. Domain Tag Overlap
        required_domains = criteria.get("required_domain_tags", [])
        if required_domains:
            startup_domains = set(startup.get("domain_tags", []))
            if not any(d in startup_domains for d in required_domains):
                missing.append(f"Missing required domain tag (needs one of: {', '.join(required_domains)})")

        # 5. GST Number Requirement
        if criteria.get("requires_gst", False):
            if not startup.get("gst_number"):
                missing.append("GST registration required")

        eligible = len(missing) == 0
        results.append({
            "scheme_id": scheme.get("id", "unknown"),
            "scheme_name": scheme.get("name", "Unnamed Scheme"),
            "eligible": eligible,
            "missing_requirements": missing
        })
        
    return results
