
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.upload import router as upload_router
from app.api.preferences import router as preferences_router
from app.api.actions import router as actions_router


# Create the FastAPI application BEFORE registering routes.
app = FastAPI(
    title="AccessMate AI",
    description="Accessibility assistant powered by Gemma 3 4B",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["Health"])
def health():
    return {
        "status": "ok",
        "service": "AccessMate AI",
        "model": "gemma3:4b",
    }


# Register routes AFTER the app has been created.
app.include_router(upload_router)
app.include_router(preferences_router)
app.include_router(actions_router)
