import ollama

from app.config import OLLAMA_HOST, GEMMA_MODEL
from app.ai.prompts import ANALYSIS_PROMPT
from app.ai.schemas import AnalysisResult
from app.ai.prompts import TRANSLATION_PROMPT
from app.ai.schemas import TranslationRequest, TranslationResult

client = ollama.Client(
    host=OLLAMA_HOST,
    timeout=300,
)


def analyze_image(image_bytes: bytes) -> AnalysisResult:
    response = client.chat(
        model=GEMMA_MODEL,
        messages=[
            {
                "role": "user",
                "content": ANALYSIS_PROMPT,
                "images": [image_bytes],
            }
        ],
        format=AnalysisResult.model_json_schema(),
        options={"temperature": 0},
        keep_alive="10m",
    )

    return AnalysisResult.model_validate_json(
        response.message.content
    )

import json


def translate_content(
    request: TranslationRequest,
) -> TranslationResult:
    prompt = (
        TRANSLATION_PROMPT
        + "\nTarget language: "
        + request.target_language
        + "\nContent:\n"
        + json.dumps(
            request.content.model_dump(),
            ensure_ascii=False,
        )
    )

    response = client.chat(
        model=GEMMA_MODEL,
        messages=[
            {"role": "user", "content": prompt}
        ],
        format=TranslationResult.model_json_schema(),
        options={"temperature": 0},
        keep_alive="10m",
    )

    result = TranslationResult.model_validate_json(
        response.message.content
    )
    result.target_language = request.target_language
    return result
