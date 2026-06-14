from fastapi import APIRouter
from services.roadmap_generator import generate_roadmap

router = APIRouter()

@router.post("/roadmap")
def roadmap(data: dict):

    missing_skills = data["missing_skills"]

    return {
        "roadmap": generate_roadmap(missing_skills)
    }