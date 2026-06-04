from fastapi import APIRouter
from models.user import User
from database.mongodb import users_collection
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/signup")
def signup(user: User):

    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if existing_user:
        return {
            "message": "User already exists"
        }

    users_collection.insert_one(
        user.dict()
    )

    return {
        "message": "Signup successful"
    }
@router.post("/login")
def login(data: LoginRequest):

    user = users_collection.find_one(
        {"email": data.email}
    )

    if not user:
        return {
            "message": "User not found"
        }

    if user["password"] != data.password:
        return {
            "message": "Invalid password"
        }

    return {
        "message": "Login successful",
        "name": user["name"]
    }