from fastapi import APIRouter
from pydantic import BaseModel

from services.project_recommender import get_projects

router = APIRouter()


class ProjectRequest(BaseModel):
    career: str


@router.post("/projects")
def recommend_projects(data: ProjectRequest):

    projects = get_projects(data.career)

    return {
        "projects": projects
    }