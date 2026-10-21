from fastapi import APIRouter
from pydantic import BaseModel, Field
from services.career_recommender import recommend_careers
from services.job_matcher import analyze_job_description
from services.interview_coach import generate_questions, evaluate_answer
from services.project_recommender import get_project_brief

router = APIRouter(prefix="/api", tags=["Career Studio"])

class SkillsRequest(BaseModel):
    skills: list[str] = Field(default_factory=list)

class JobRequest(SkillsRequest):
    description: str = Field(min_length=20)

class InterviewRequest(SkillsRequest):
    career: str

class AnswerRequest(BaseModel):
    question: str
    answer: str = Field(min_length=1)

class ProjectRequest(BaseModel):
    career: str
    level: str = "Intermediate"

@router.post("/career-recommendations")
def career_recommendations(data: SkillsRequest):
    return {"recommendations": recommend_careers(data.skills)}

@router.post("/job-analysis")
def job_analysis(data: JobRequest):
    return analyze_job_description(data.description, data.skills)

@router.post("/interview/questions")
def interview_questions(data: InterviewRequest):
    return {"questions": generate_questions(data.career, data.skills)}

@router.post("/interview/evaluate")
def interview_evaluate(data: AnswerRequest):
    return evaluate_answer(data.question, data.answer)

@router.post("/project-brief")
def project_brief(data: ProjectRequest):
    return get_project_brief(data.career, data.level)
