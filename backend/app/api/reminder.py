
from datetime import date
from uuid import uuid4

from pydantic import BaseModel, Field


class ReminderRequest(BaseModel):
    confirmed: bool
    title: str = Field(min_length=1, max_length=200)
    date: str
    time: str | None = None


class ReminderResult(BaseModel):
    id: str
    status: str
    title: str
    date: str
    time: str | None = None
    message: str


_reminders: dict[str, ReminderResult] = {}


def create_reminder(
    request: ReminderRequest,
) -> ReminderResult:
    if not request.confirmed:
        raise ValueError("User confirmation is required.")

    try:
        reminder_date = date.fromisoformat(request.date)
    except ValueError:
        raise ValueError("Date must use YYYY-MM-DD format.")

    if reminder_date < date.today():
        raise ValueError("Reminder date cannot be in the past.")

    if request.time:
        from datetime import datetime
        try:
            datetime.strptime(request.time, "%H:%M")
        except ValueError:
            raise ValueError("Time must use HH:MM format.")

    result = ReminderResult(
        id=str(uuid4()),
        status="created",
        title=request.title,
        date=reminder_date.isoformat(),
        time=request.time,
        message="Reminder saved in demo backend memory.",
    )

    _reminders[result.id] = result
    return result
