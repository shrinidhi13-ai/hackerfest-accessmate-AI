
import asyncio

from fastapi import APIRouter, HTTPException

from app.ai.gemma import translate_content
from app.ai.schemas import (
    TranslationRequest,
    TranslationResult,
)

router = APIRouter(prefix="/api", tags=["Translation"])


@router.post("/translate", response_model=TranslationResult)
async def translate(request: TranslationRequest):
    try:
        return await asyncio.to_thread(
            translate_content, request
        )
    except Exception as exc:
        print(f"Translation failed: {exc}")
        raise HTTPException(
            status_code=503,
            detail="Translation failed. Please try again.",
        )

from pydantic import BaseModel

class LanguageTestRequest(BaseModel):
    languages: list[str] = [
        "Kannada",
        "Hindi",
        "Tamil",
        "Telugu",
        "Malayalam",
        "Bengali",
        "Marathi",
        "Gujarati",
        "Punjabi",
        "English",

    ]

@router.post("/translate/check-languages")
async def check_languages(request: LanguageTestRequest):
    from app.ai.schemas import AnalysisResult, TranslationRequest
    import asyncio

    sample = AnalysisResult(
        document_type="Notice",
        simple_summary="Submit the form before Friday.",
        important_information=["The deadline is 30 October 2026."],
        instructions=["Fill in the form."],
        dates=[],
        times=[],
        locations=[],
        warnings=[],
        steps=["Fill in the form.", "Submit it."]
    )

    results = []

    for language in request.languages:
        try:
            translated = await asyncio.to_thread(
                translate_content,
                TranslationRequest(
                    content=sample,
                    target_language=language
                )
            )
            results.append({
                "language": language,
                "status": "success",
                "sample_translation": translated.translated_summary
            })
        except Exception as exc:
            results.append({
                "language": language,
                "status": "failed",
                "error": str(exc)
            })

    return {
        "tested": len(results),
        "successful": sum(
            1 for item in results if item["status"] == "success"
        ),
        "results": results
    }

from fastapi import APIRouter

SUPPORTED_LANGUAGES = [
    {"name": "English", "code": "en"},
    {"name": "Kannada", "code": "kn"},
    {"name": "Hindi", "code": "hi"},
    {"name": "Tamil", "code": "ta"},
    {"name": "Telugu", "code": "te"},
    {"name": "Malayalam", "code": "ml"},
    {"name": "Bengali", "code": "bn"},
    {"name": "Marathi", "code": "mr"},
    {"name": "Gujarati", "code": "gu"},
    {"name": "Punjabi", "code": "pa"},
    {"name": "Odia", "code": "or"},
    {"name": "Urdu", "code": "ur"},
    {"name": "Assamese", "code": "as"},
    {"name": "Nepali", "code": "ne"},
    {"name": "Sanskrit", "code": "sa"},
]

@router.get("/languages")
def get_supported_languages():
    return {"languages": SUPPORTED_LANGUAGES}
