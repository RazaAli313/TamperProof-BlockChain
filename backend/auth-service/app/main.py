from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, timedelta
import jwt
from hashlib import sha256
import os
from pymongo import MongoClient

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
SECRET_KEY = os.getenv("JWT_SECRET", "your_super_secret_key_here")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# MongoDB Setup
client = MongoClient("mongodb://localhost:27017")
db = client["auth_db"]

# Models
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    role: str

class TokenData(BaseModel):
    email: Optional[EmailStr] = None
    role: Optional[str] = None

# Helper Functions
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Routes
@app.post("/login")
async def login(login_data: LoginRequest):
    user = db.users.find_one({"email": login_data.email})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Verify password
    hashed_password = sha256(login_data.password.encode()).hexdigest()
    if hashed_password != user["password"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Verify role
    if login_data.role != user["role"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"User is not registered as {login_data.role}"
        )
    
    # Create token
    token_data = {
        "sub": user["email"],
        "role": user["role"]
    }
    access_token = create_access_token(token_data)
    
    return {
        "token": access_token,
        "role": user["role"],
        "token_type": "bearer"
    }