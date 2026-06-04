from database.mongodb import db
from fastapi import FastAPI
from routes.auth import router as auth_router

app = FastAPI()
app.include_router(auth_router)

@app.get("/")
def home():
    return {"message": "Career GPS AI Backend Running"}