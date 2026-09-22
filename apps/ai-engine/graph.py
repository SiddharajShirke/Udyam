"""Section 2.6 — LangGraph orchestration.

Wires the chain together as one pipeline instead of separate calls
scattered across the codebase. The sandbox step is intentionally outside
the graph's automatic edges since it depends on a real startup taking an
external action (deploying/submitting their code): Node.js triggers
/ai/generate-kpis synchronously, then later calls /ai/evaluate once sandbox
results exist, resuming the graph from that point with the accumulated
state.
"""

from typing import Optional, TypedDict

from langgraph.graph import END, StateGraph

from agents.contract_drafter import draft_contract
from agents.evaluation import evaluate_submissions
from agents.kpi_generator import generate_kpis
from agents.problem_formatter import format_problem


class PipelineState(TypedDict):
    raw_input: str
    department_type: str
    formatted_ps: Optional[dict]
    kpis: Optional[list]
    sandbox_scores: Optional[dict]
    evaluation: Optional[dict]
    winner: Optional[dict]
    problem: Optional[dict]
    contract: Optional[dict]


async def format_problem_node(state: PipelineState) -> dict:
    formatted = await format_problem(state["raw_input"], state["department_type"])
    return {"formatted_ps": formatted}


async def generate_kpis_node(state: PipelineState) -> dict:
    kpis = await generate_kpis(state["formatted_ps"], state["department_type"])
    return {"kpis": kpis}


async def evaluate_node(state: PipelineState) -> dict:
    evaluation = await evaluate_submissions(state["sandbox_scores"], state["kpis"])
    return {"evaluation": evaluation}


async def draft_contract_node(state: PipelineState) -> dict:
    contract = await draft_contract(state["evaluation"], state["winner"], state["problem"])
    return {"contract": contract}


def build_graph():
    graph = StateGraph(PipelineState)
    graph.add_node("format_problem", format_problem_node)
    graph.add_node("generate_kpis", generate_kpis_node)
    graph.add_node("evaluate", evaluate_node)
    graph.add_node("draft_contract", draft_contract_node)

    graph.set_entry_point("format_problem")
    graph.add_edge("format_problem", "generate_kpis")
    # Sandbox execution (Section 2.3/6.1) happens outside the graph's
    # automatic edges — Node resumes the pipeline at "evaluate" once
    # sandbox_scores exist in the state it passes back in.
    graph.add_edge("evaluate", "draft_contract")
    graph.add_edge("draft_contract", END)
    return graph.compile()


pipeline_app = build_graph()
