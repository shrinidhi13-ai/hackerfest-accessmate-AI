from pydantic import BaseModel


class DateItem(BaseModel):
    text: str
    purpose: str
    year: int | None = None


class TimeItem(BaseModel):
    text: str
    purpose: str


class AnalysisResult(BaseModel):
    document_type: str
    simple_summary: str
    important_information: list[str]
    instructions: list[str]
    dates: list[DateItem]
    times: list[TimeItem]
    locations: list[str]
    warnings: list[str]
    steps: list[str]

from pydantic import Field


class TranslationRequest(BaseModel):
    content: AnalysisResult
    target_language: str = Field(min_length=2, max_length=40)


class TranslationResult(BaseModel):
    target_language: str
    translated_summary: str
    translated_important_information: list[str]
    translated_instructions: list[str]
    translated_steps: list[str]
