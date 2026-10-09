
from fastapi import APIRouter, HTTPException

from app.tools.reminder import (
    ReminderRequest,
    ReminderResult,
    create_reminder,
)

router = APIRouter(prefix="/api/actions", tags=["Actions"])


@router.post("/reminder", response_model=ReminderResult)
def add_reminder(request: ReminderRequest):
    if not request.confirmed:
        raise HTTPException(
            status_code=409,
            detail="User confirmation is required.",
        )

    try:
        return create_reminder(request)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))
