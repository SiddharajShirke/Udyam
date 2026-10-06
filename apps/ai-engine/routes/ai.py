"""HTTP surface for the AI pipeline (Section 2.7 — every route here depends
on require_internal_secret; Node.js is the only caller).

These routes are the Node.js integration points for docs/api.yaml's
/ai/* paths — see that file for request/response shapes.
"""

from fastapi import APIRouter, Depends, HTTPException

from agents.contract_drafter import draft_contract
from agents.evaluation import evaluate_submissions
from agents.kpi_generator import generate_kpis
from agents.problem_formatter import format_problem
from fan_out import run_fanout
from lib.internal_auth import require_internal_secret

router = APIRouter(prefix="/ai", dependencies=[Depends(require_internal_secret)])


@router.post("/format-problem")
async def format_problem_route(payload: dict):
    try:
        raw_input = payload["raw_input"]
    except KeyError as exc:
        raise HTTPException(status_code=422, detail="raw_input is required") from exc
    try:
        return await format_problem(raw_input, payload.get("department_type", "general"))
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


@router.post("/generate-kpis")
async def generate_kpis_route(payload: dict):
    try:
        formatted_ps = payload["formatted_ps"]
    except KeyError as exc:
        raise HTTPException(status_code=422, detail="formatted_ps is required") from exc
    try:
        return await generate_kpis(formatted_ps, payload.get("domain", "general"))
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


@router.post("/evaluate")
async def evaluate_route(payload: dict):
    try:
        sandbox_scores = payload["sandbox_scores"]
        kpis = payload["kpis"]
    except KeyError as exc:
        raise HTTPException(status_code=422, detail="sandbox_scores and kpis are required") from exc
    try:
        return await evaluate_submissions(sandbox_scores, kpis)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


@router.post("/draft-contract")
async def draft_contract_route(payload: dict):
    try:
        evaluation = payload["evaluation"]
        winner = payload["winner"]
        problem = payload["problem"]
    except KeyError as exc:
        raise HTTPException(
            status_code=422, detail="evaluation, winner, and problem are required"
        ) from exc
    try:
        return await draft_contract(evaluation, winner, problem)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


@router.post("/fanout")
async def fanout_route(payload: dict):
    try:
        problem_id = payload["problem_id"]
        formatted_ps = payload["formatted_ps"]
        kpis = payload["kpis"]
        startups = payload["startups"]
    except KeyError as exc:
        raise HTTPException(
            status_code=422,
            detail="problem_id, formatted_ps, kpis, and startups are required",
        ) from exc
    try:
        return await run_fanout(problem_id, formatted_ps, kpis, startups)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
