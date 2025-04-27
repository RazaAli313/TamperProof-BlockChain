from fastapi import FastAPI, UploadFile
import hashlib
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://localhost:8002"],  # You can replace "*" with specific frontend URL (e.g., ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

def calculate_hash(content: bytes) -> str:
    sha = hashlib.sha256()
    sha.update(content)
    return sha.hexdigest()

@app.post("/generate-hash")
async def generate_hash(file: UploadFile):
    content = await file.read()
    return {"hash": calculate_hash(content)}
