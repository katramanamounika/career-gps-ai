from fastapi import APIRouter
from services.readiness_score import calculate_readiness

router = APIRouter()

@router.post("/readiness")
def readiness(data: dict):

    match_score = data["score"]

    return calculate_readiness(
        match_score
    )