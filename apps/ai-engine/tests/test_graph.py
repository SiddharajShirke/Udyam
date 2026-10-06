"""Confirms the LangGraph pipeline compiles with all four nodes and edges
wired correctly. Does not invoke nodes (that needs a real ANTHROPIC_API_KEY)
- compiling a StateGraph does not call any node."""

from graph import build_graph


def test_graph_compiles():
    compiled = build_graph()
    assert compiled is not None


def test_graph_has_expected_nodes():
    compiled = build_graph()
    node_names = set(compiled.get_graph().nodes.keys())
    for expected in ("format_problem", "generate_kpis", "evaluate", "draft_contract"):
        assert expected in node_names
