
from io import BytesIO
import asyncio

from fastapi import APIRouter, File, HTTPException, UploadFile
from PIL import Image, UnidentifiedImageError

from app.config import MAX_IMAGE_MB
from app.ai.gemma import analyze_image

router = APIRouter(prefix="/api", tags=["Analysis"])


@router.post("/analyze")
async def analyze_document(image: UploadFile = File(...)):
    allowed_types = {
        "image/jpeg", "image/png", "image/webp"
    }

    if image.content_type not in allowed_types:
        raise HTTPException(
            status_code=415,
            detail="Upload a JPG, PNG, or WebP image.",
        )

    data = await image.read(MAX_IMAGE_MB * 1024 * 1024 + 1)

    if not data:
        raise HTTPException(400, "The uploaded image is empty.")

    if len(data) > MAX_IMAGE_MB * 1024 * 1024:
        raise HTTPException(413, "Image exceeds the 10 MB limit.")

    try:
        with Image.open(BytesIO(data)) as img:
            if img.format not in {"JPEG", "PNG", "WEBP"}:
                raise HTTPException(415, "Unsupported image format.")
            img.verify()
    except UnidentifiedImageError:
        raise HTTPException(400, "The file is not a valid image.")
    except OSError:
        raise HTTPException(400, "The image file is damaged.")

    try:
        result = await asyncio.to_thread(analyze_image, data)
        return result.model_dump()
    except Exception as exc:
        print(f"Gemma analysis failed: {exc}")
        raise HTTPException(
            503,
            detail="Analysis failed. Check that Ollama is running and Gemma is available.",
        )
