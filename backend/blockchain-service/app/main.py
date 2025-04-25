from fastapi import FastAPI, UploadFile
import hashlib

app = FastAPI()

def calculate_hash(content: bytes) -> str:
    sha = hashlib.sha256()
    sha.update(content)
    return sha.hexdigest()

@app.post("/generate-hash")
async def generate_hash(file: UploadFile):
    content = await file.read()
    return {"hash": calculate_hash(content)}