from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from database import init_db
from routers import detection_router, auth_router   # ✅ UPDATED IMPORT

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="DeepFake Detection API",
    description="API for detecting deepfakes in images and videos",
    version="1.0.0"
)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow Vite/localhost
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],   # ⭐⭐⭐ THIS IS THE IMPORTANT PART
    expose_headers=["*"],
)


# ✅ ROUTERS REGISTERED
app.include_router(auth_router)        # ✅ ADDED
app.include_router(detection_router)   # ✅ ALREADY PRESENT

@app.on_event("startup")
async def startup_event():
    logger.info("Initializing database...")
    init_db()
    logger.info("Database initialized successfully")
    logger.info("DeepFake Detection API is ready!")

@app.get("/")
async def root():
    return {
        "message": "DeepFake Detection API",
        "version": "1.0.0",
        "endpoints": {
            "auth": "/auth",
            "image_detection": "/api/detect/image",
            "video_detection": "/api/detect/video",
            "history": "/api/history",
            "health": "/api/health"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
