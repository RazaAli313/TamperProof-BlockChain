from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from hashlib import sha256
import os
from datetime import datetime
import uuid
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from typing import List

app = FastAPI()

# MongoDB setup
MONGODB_URL = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGODB_URL)
db = client["document_verification"]
documents_collection = db["documents"]

# Models
class Document(BaseModel):
    document_id: str
    filename: str
    hash: str
    upload_date: str
    verified: bool

class DocumentVerificationResponse(BaseModel):
    verified: bool
    document_hash: str
    filename: str
    timestamp: str
    qr_code_url: str = None

class StatsResponse(BaseModel):
    totalDocuments: int
    verifiedDocuments: int
    pendingVerifications: int
    totalUsers: int = 0  # Not used but kept for compatibility

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Verify endpoints (for Verify.jsx)
@app.post("/documents/upload")
async def upload_document(file: UploadFile = File(...)):
    file_contents = await file.read()
    document_hash = sha256(file_contents).hexdigest()
    document_id = str(uuid.uuid4())
    
    # Save file to uploads directory
    file_location = f"uploads/{document_id}_{file.filename}"
    os.makedirs(os.path.dirname(file_location), exist_ok=True)
    with open(file_location, "wb") as f:
        f.write(file_contents)

    # Store in MongoDB
    document_data = {
        "document_id": document_id,
        "filename": file.filename,
        "hash": document_hash,
        "upload_date": datetime.now().isoformat(),
        "file_path": file_location,
        "verified": False
    }
    
    result = await documents_collection.insert_one(document_data)
    return JSONResponse(
        content={
            "message": "Document uploaded successfully",
            "document_id": document_id,
            "_id": str(result.inserted_id),
            "filename": file.filename,
            "verified": False,
            "upload_date": document_data["upload_date"],
            "qrUrl": f"/qr/{document_id}"
        },
        status_code=201
    )

@app.post("/verify/file")
async def verify_document_by_file(file: UploadFile = File(...)):
    file_contents = await file.read()
    document_hash = sha256(file_contents).hexdigest()
    
    existing_doc = await documents_collection.find_one({"hash": document_hash})
    
    if existing_doc:
        return DocumentVerificationResponse(
            verified=existing_doc["verified"],
            document_hash=existing_doc["hash"],
            filename=existing_doc["filename"],
            timestamp=existing_doc["upload_date"],
            qr_code_url=f"/qr/{existing_doc['document_id']}"
        )
    raise HTTPException(status_code=404, detail="Document not found")

@app.get("/verify/hash")
async def verify_document_by_hash(document_hash: str):
    existing_doc = await documents_collection.find_one({"hash": document_hash})
    
    if existing_doc:
        return DocumentVerificationResponse(
            verified=existing_doc["verified"],
            document_hash=existing_doc["hash"],
            filename=existing_doc["filename"],
            timestamp=existing_doc["upload_date"],
            qr_code_url=f"/qr/{existing_doc['document_id']}"
        )
    raise HTTPException(status_code=404, detail="Document not found")

# Admin Dashboard endpoints
@app.get("/documents", response_model=List[Document])
async def get_all_documents():
    documents = []
    async for doc in documents_collection.find():
        documents.append({
            "_id": str(doc["_id"]),
            "document_id": doc["document_id"],
            "filename": doc["filename"],
            "hash": doc["hash"],
            "upload_date": doc["upload_date"],
            "verified": doc["verified"],
            "qrUrl": f"/qr/{doc['document_id']}"
        })
    return documents

@app.get("/documents/stats", response_model=StatsResponse)
async def get_document_stats():
    total_documents = await documents_collection.count_documents({})
    verified_documents = await documents_collection.count_documents({"verified": True})
    pending_verifications = await documents_collection.count_documents({"verified": False})
    
    return {
        "totalDocuments": total_documents,
        "verifiedDocuments": verified_documents,
        "pendingVerifications": pending_verifications
    }

@app.patch("/documents/{document_id}/verify")
async def verify_document(document_id: str):
    result = await documents_collection.update_one(
        {"document_id": document_id},
        {"$set": {"verified": True}}
    )
    if result.modified_count == 1:
        return {"message": "Document verified successfully"}
    raise HTTPException(status_code=404, detail="Document not found")

@app.delete("/documents/{document_id}")
async def delete_document(document_id: str):
    result = await documents_collection.delete_one({"document_id": document_id})
    if result.deleted_count == 1:
        return {"message": "Document deleted successfully"}
    raise HTTPException(status_code=404, detail="Document not found")

# User Dashboard endpoints
@app.get("/user/documents", response_model=List[Document])
async def get_user_documents():
    """For simplicity, returns all documents since we're not implementing user auth"""
    return await get_all_documents()

@app.get("/user/stats", response_model=StatsResponse)
async def get_user_stats():
    """For simplicity, returns the same stats as admin"""
    return await get_document_stats()

# QR Code and Download endpoints
@app.get("/qr/{document_id}")
async def get_qr_code(document_id: str):
    document = await documents_collection.find_one({"document_id": document_id})
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return {
        "qr_code_url": f"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data={document['hash']}"
    }

@app.get("/documents/download/{document_id}")
async def download_document(document_id: str):
    document = await documents_collection.find_one({"document_id": document_id})
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    if not os.path.exists(document["file_path"]):
        raise HTTPException(status_code=404, detail="File not found on server")
    
    return FileResponse(
        path=document["file_path"],
        filename=document["filename"],
        media_type="application/octet-stream"
    )
