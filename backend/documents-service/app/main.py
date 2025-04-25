from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from hashlib import sha256
import os
from datetime import datetime
import uuid
import httpx  # For making HTTP requests to other services

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware to allow requests from your frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # You can replace "*" with specific frontend URL (e.g., ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Simulate a database for documents (use a real database in production)
documents_db = {}

# Pydantic model for document verification response
class DocumentVerificationResponse(BaseModel):
    verified: bool
    document_hash: str
    filename: str
    timestamp: str
    qr_code_url: str = None


@app.post("/documents/upload")
async def upload_document(file: UploadFile = File(...)):
    # Generate a unique document ID
    document_id = str(uuid.uuid4())
    file_contents = await file.read()
    document_hash = sha256(file_contents).hexdigest()
    
    # Save the file to disk or database (In this case, save to a local directory)
    file_location = f"uploads/{document_id}_{file.filename}"
    os.makedirs(os.path.dirname(file_location), exist_ok=True)
    
    with open(file_location, "wb") as f:
        f.write(file_contents)

    # Simulate saving the document in the "database"
    document_data = {
        "id": document_id,
        "filename": file.filename,
        "hash": document_hash,
        "upload_date": datetime.now().isoformat(),
        "qr_code_url": f"/qr/{document_id}",  # Example of QR URL (you'd generate an actual QR code in a real system)
        "verified": False  # Initially, the document is not verified
    }
    
    documents_db[document_id] = document_data
    return JSONResponse(content={"message": "Document uploaded successfully", "document_id": document_id}, status_code=201)


@app.get("/verify/hash")
async def verify_document_by_hash(document_hash: str):
    # Check if the document exists in the "database" by hash
    document = next((doc for doc in documents_db.values() if doc["hash"] == document_hash), None)

    if document:
        return DocumentVerificationResponse(
            verified=True,
            document_hash=document["hash"],
            filename=document["filename"],
            timestamp=document["upload_date"],
            qr_code_url=document["qr_code_url"]
        )
    else:
        raise HTTPException(status_code=404, detail="Document not found")


@app.post("/verify/file")
async def verify_document_by_file(file: UploadFile = File(...)):
    file_contents = await file.read()
    document_hash = sha256(file_contents).hexdigest()

    # Check if the document exists in the "database" by hash
    document = next((doc for doc in documents_db.values() if doc["hash"] == document_hash), None)

    if document:
        return DocumentVerificationResponse(
            verified=True,
            document_hash=document["hash"],
            filename=document["filename"],
            timestamp=document["upload_date"],
            qr_code_url=document["qr_code_url"]
        )
    else:
        raise HTTPException(status_code=404, detail="Document not found")


@app.get("/documents/stats")
async def get_document_stats():
    total_documents = len(documents_db)
    verified_documents = sum(1 for doc in documents_db.values() if doc["verified"])

    return {"totalDocuments": total_documents, "verifiedDocuments": verified_documents}


@app.get("/documents")
async def get_documents():
    # Return a list of documents with their details
    return [{"filename": doc["filename"], "hash": doc["hash"], "upload_date": doc["upload_date"], "verified": doc["verified"], "qr_url": doc["qr_code_url"]} for doc in documents_db.values()]


@app.get("/documents/download/{document_id}")
async def download_document(document_id: str):
    document = documents_db.get(document_id)
    if document:
        return FileResponse(path=f"uploads/{document_id}_{document['filename']}", media_type="application/octet-stream", filename=document['filename'])
    else:
        raise HTTPException(status_code=404, detail="Document not found")


# Example QR code generation (not implemented here, you'd use a library like qrcode for generating actual QR codes)
@app.get("/qr/{document_id}")
async def get_qr_code(document_id: str):
    # In a real application, generate and return a QR code as an image
    return {"message": f"QR code for document {document_id}"}

# Communication with blockchain service
@app.post("/blockchain/verify")
async def verify_document_with_blockchain(document_hash: str):
    async with httpx.AsyncClient() as client:
        response = await client.post("http://localhost:8003/blockchain/verify", json={"document_hash": document_hash})
        if response.status_code == 200:
            blockchain_response = response.json()
            return {"blockchain_verified": blockchain_response.get("verified"), "blockchain_details": blockchain_response}
        else:
            raise HTTPException(status_code=500, detail="Error communicating with blockchain service")

# Communicate with QR code service to generate a QR code for the document
@app.post("/qrcode/generate")
async def generate_qr_code_for_document(document_id: str):
    async with httpx.AsyncClient() as client:
        response = await client.post(f"http://localhost:8004/qrcode/generate", json={"document_id": document_id})
        if response.status_code == 200:
            qr_code_data = response.json()
            return {"qr_code_url": qr_code_data["qr_code_url"]}
        else:
            raise HTTPException(status_code=500, detail="Error generating QR code")
