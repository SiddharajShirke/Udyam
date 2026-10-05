from typing import Literal
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from agents.hardware_eligibility import calculate_confidence_score, get_next_question
from agents.log_anomaly import detect_login_anomaly
from agents.matchmaking import rank_startups
from agents.quick_assist import answer_quick_assist
from database import AiDatabase
from dependencies import verify_internal_secret

router = APIRouter(prefix="/ai", tags=["ai-internal"], dependencies=[Depends(verify_internal_secret)])


class MatchmakingRequest(BaseModel): problem_id: str
class MatchmakingResponse(BaseModel): matches: list[dict]
class LogAnomalyRequest(BaseModel): entity_id: str | None = None
class LogAnomalyResponse(BaseModel): anomaly_detected: bool; summary: str; recommended_action: str
class QuickAssistRequest(BaseModel): question: str = Field(min_length=1); role_context: Literal["ministry", "startup", "evaluator", "admin"]
class QuickAssistResponse(BaseModel): answer: str
class HardwareAnswersRequest(BaseModel): answers: dict
class HardwareQuestionResponse(BaseModel): question: dict | None
class HardwareScoreResponse(BaseModel): confidence_score: int = Field(ge=0, le=100); passed_layer_1: bool


@router.post("/matchmaking", response_model=MatchmakingResponse)
async def matchmaking(request: MatchmakingRequest) -> MatchmakingResponse:
    database = AiDatabase()
    try:
        problem = await database.get_problem(request.problem_id)
        if not problem: raise HTTPException(status_code=404, detail="Problem not found")
        return MatchmakingResponse(matches=rank_startups(problem["domain_tags"], await database.get_approved_startups()))
    finally:
        await database.close()


@router.post("/log-anomaly", response_model=LogAnomalyResponse)
async def log_anomaly(request: LogAnomalyRequest | None = None) -> LogAnomalyResponse:
    database = AiDatabase()
    try:
        return LogAnomalyResponse(**detect_login_anomaly(await database.get_recent_login_events(request.entity_id if request else None)))
    finally:
        await database.close()


@router.post("/quick-assist", response_model=QuickAssistResponse)
async def quick_assist(request: QuickAssistRequest) -> QuickAssistResponse:
    return QuickAssistResponse(answer=answer_quick_assist(request.question, request.role_context))


@router.post("/hardware/next-question", response_model=HardwareQuestionResponse)
async def hardware_next_question(request: HardwareAnswersRequest) -> HardwareQuestionResponse:
    return HardwareQuestionResponse(question=get_next_question(request.answers))


@router.post("/hardware/score", response_model=HardwareScoreResponse)
async def hardware_score(request: HardwareAnswersRequest) -> HardwareScoreResponse:
    return HardwareScoreResponse(**calculate_confidence_score(request.answers))
