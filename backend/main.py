import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import router as auth_router
from routes.resume import router as resume_router
from routes.career import router as career_router
from routes.roadmap import router as roadmap_router
from routes.projects import router as projects_router
from routes.readiness import router as readiness_router
from routes.advanced import router as advanced_router

app = FastAPI()
app.include_router(auth_router)
app.include_router(career_router)
app.include_router(resume_router)
app.include_router(roadmap_router)
app.include_router(projects_router)
app.include_router(readiness_router)
app.include_router(advanced_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv(
        "ALLOWED_ORIGINS", "http://localhost:5173"
    ).split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Career GPS AI Backend Running"
    }
