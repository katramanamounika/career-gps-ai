from pydantic import BaseModel

class User(BaseModel):
    name: str
    email: str
    password: str
    college: str
    graduation_year: str