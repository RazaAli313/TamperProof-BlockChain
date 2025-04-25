from fastapi import FastAPI
import qrcode
import io
import base64
import os
from datetime import datetime
from pydantic import BaseModel

app = FastAPI()

class QRRequest(BaseModel):
    hash: str

@app.post("/generate-qr")
async def generate_qr(request: QRRequest):
    try:
        # Generate QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        
        verification_url = f"http://your-frontend.com/verify/{request.hash}"
        qr.add_data(verification_url)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        
        # Save to buffer
        buffer = io.BytesIO()
        img.save(buffer, format="PNG")
        buffer.seek(0)
        
        # Convert to base64 (or save to storage)
        img_str = base64.b64encode(buffer.getvalue()).decode()
        qr_url = f"data:image/png;base64,{img_str}"
        
        return {"qr_url": qr_url}
    
    except Exception as e:
        return {"error": str(e)}