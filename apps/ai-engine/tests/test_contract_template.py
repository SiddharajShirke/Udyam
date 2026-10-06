from jinja2 import Environment, FileSystemLoader, select_autoescape

from agents.contract_drafter import TEMPLATE_DIR


def test_contract_template_renders():
    env = Environment(loader=FileSystemLoader(str(TEMPLATE_DIR)), autoescape=select_autoescape())
    template = env.get_template("contract.jinja2")

    rendered = template.render(
        problem={"title": "Rural Health Access", "ministry_id": "min-123"},
        winner={"name": "Acme Health"},
        outcome_description="Deploy a telemedicine triage system.",
        milestones=[
            {"title": "Pilot in 3 districts", "kpi_threshold": "95% uptime", "amount_lakhs": 10},
            {"title": "Statewide rollout", "kpi_threshold": "99% uptime", "amount_lakhs": 40},
        ],
    )

    assert "Rural Health Access" in rendered
    assert "Acme Health" in rendered
    assert "Pilot in 3 districts" in rendered
    assert "INR 10 lakhs" in rendered
    assert "GFR" in rendered
