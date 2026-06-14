from fastapi import APIRouter
from database.mongodb import db
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
        "message":"Login successful",
        "name": user["name"],
        "email": user["email"],
        "college": user["college"],
        "graduation_year": user["graduation_year"]
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