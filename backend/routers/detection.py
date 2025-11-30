# backend/routers/detection.py
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Dict
import os
import shutil
from datetime import datetime

from database import get_db
from models.scan_history import ScanHistory
from ml.deepfake_detector import get_detector
from models.user import User
from utils.auth import get_current_user

router = APIRouter(prefix="/api", tags=["detection"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/detect/image")
async def detect_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Dict:
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        contents = await file.read()

        detector = get_detector()
        result = detector.detect_image(contents)

        scan_record = ScanHistory(
            user_id=current_user.id,
            filename=file.filename,
            file_type="image",
            prediction=result["label"],
            confidence=result["confidence"],
            reasoning=result["reasoning"],
        )
        db.add(scan_record)
        db.commit()
        db.refresh(scan_record)

        return {
            "success": True,
            "label": result["label"],
            "confidence": result["confidence"],
            "reasoning": result["reasoning"],
            "scan_id": scan_record.id,
            "timestamp": scan_record.timestamp.isoformat(),
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Processing error (image): {str(e)}"
        )


@router.post("/detect/video")
async def detect_video(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Dict:
    if not file.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="File must be a video")

    temp_path = None
    try:
        temp_path = os.path.join(
            UPLOAD_DIR, f"temp_{datetime.now().timestamp()}_{file.filename}"
        )

        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        detector = get_detector()
        result = detector.detect_video(temp_path)

        scan_record = ScanHistory(
            user_id=current_user.id,
            filename=file.filename,
            file_type="video",
            prediction=result["label"],
            confidence=result["confidence"],
            reasoning=result["reasoning"],
        )
        db.add(scan_record)
        db.commit()
        db.refresh(scan_record)

        return {
            "success": True,
            "label": result["label"],
            "confidence": result["confidence"],
            "reasoning": result["reasoning"],
            "scan_id": scan_record.id,
            "timestamp": scan_record.timestamp.isoformat(),
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Processing error (video): {str(e)}"
        )
    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)


@router.get("/history")
async def get_history(
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Dict:
    history = (
        db.query(ScanHistory)
        .filter(ScanHistory.user_id == current_user.id)
        .order_by(ScanHistory.timestamp.desc())
        .limit(limit)
        .all()
    )

    return {
        "success": True,
        "history": [
            {
                "id": record.id,
                "filename": record.filename,
                "file_type": record.file_type,
                "prediction": record.prediction,
                "confidence": record.confidence,
                "reasoning": record.reasoning,
                "timestamp": record.timestamp.isoformat(),
            }
            for record in history
        ],
    }


@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "DeepFake Detection API"}
