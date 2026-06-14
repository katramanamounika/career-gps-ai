from fastapi import APIRouter
from database.mongodb import db
from models.user import User
from database.mongodb import users_collection
from pydantic import BaseModel
import re

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/signup")
def signup(user: User):

    if (
        not user.name or
        not user.email or
        not user.password or
        not user.college or
        not user.graduation_year
    ):
        return {
            "message": "All fields are required"
        }

    email_pattern = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"

    if not re.match(
        email_pattern,
        user.email
    ):
        return {
            "message": "Invalid email format"
        }

    password_pattern = (
        r"^(?=.*[a-z])"
        r"(?=.*[A-Z])"
        r"(?=.*\d)"
        r".{6,}$"
    )

    if not re.match(
        password_pattern,
        user.password
    ):
        return {
            "message":
            "Password must contain uppercase, lowercase, number and minimum 6 characters"
        }

    existing_user = users_collection.find_one(
        {
            "email": user.email
        }
    )

    if existing_user:
        return {
            "message":
            "Email already registered"
        }

    users_collection.insert_one(
        user.dict()
    )

    return {
        "message":
        "Signup successful"
    }
@router.post("/login")
def login(data: LoginRequest):

    if not data.email:
        return {
            "message":
            "Email required"
        }

    if not data.password:
        return {
            "message":
            "Password required"
        }

    user = users_collection.find_one(
        {
            "email": data.email
        }
    )

    if not user:
        return {
            "message":
            "User not found"
        }

    if user["password"] != data.password:
        return {
            "message":
            "Incorrect password"
        }

    return {
        "message":
        "Login successful",

        "name":
        user["name"],

        "email":
        user["email"],

        "college":
        user["college"],

        "graduation_year":
        user["graduation_year"]
    }
@router.post("/forgot-password")
async def forgot_password(data: dict):

    email = data["email"]
    new_password = data["new_password"]

    user = db.users.find_one({
        "email": email
    })

    if not user:
        return {
            "message": "User not found"
        }

    db.users.update_one(
        {"email": email},
        {
            "$set": {
                "password": new_password
            }
        }
    )

    return {
        "message": "Password updated successfully"
    }