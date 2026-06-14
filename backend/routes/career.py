from fastapi import APIRouter, HTTPException
from services.career_matcher import calculate_match

router = APIRouter()

@router.post("/career-match")
def career_match(data: dict):

    if "career" not in data:
        raise HTTPException(
            status_code=400,
            detail="Career not provided"
        )

    if "skills" not in data:
        raise HTTPException(
            status_code=400,
            detail="Skills not provided"
        )

    career = data["career"]
    skills = data["skills"]

    result = calculate_match(
        career,
        skills
    )

    return result