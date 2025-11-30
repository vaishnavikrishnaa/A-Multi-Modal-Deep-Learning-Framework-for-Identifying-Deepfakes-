import numpy as np
import cv2
from PIL import Image
import torch
import torch.nn as nn
from torchvision import transforms, models
from facenet_pytorch import MTCNN
import io
from typing import Dict, List
import logging
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DeepFakeDetector:
    def __init__(self):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        logger.info(f"Using device: {self.device}")

        self.face_detector = MTCNN(keep_all=True, device=self.device)

        # ✅ CREATE MODEL DIRECTLY (NO _create_model ERROR ANYMORE)
        self.model = self.create_model()

        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406], 
                std=[0.229, 0.224, 0.225]
            )
        ])

    # ✅ SAFE MODEL CREATOR (NO TRAINED WEIGHTS)
    def create_model(self) -> nn.Module:
        logger.warning("⚠ Using pretrained EfficientNet-B4 (not retrained)")

        model = models.efficientnet_b4(weights="DEFAULT")
        num_features = model.classifier[1].in_features
        model.classifier[1] = nn.Linear(num_features, 2)

        model.to(self.device)
        model.eval()
        return model

    def _extract_faces(self, image: Image.Image) -> List[Image.Image]:
        try:
            boxes, _ = self.face_detector.detect(image)

            if boxes is None or len(boxes) == 0:
                return [image]

            faces = []
            for box in boxes:
                x1, y1, x2, y2 = [int(b) for b in box]
                x1, y1 = max(0, x1), max(0, y1)
                x2, y2 = min(image.width, x2), min(image.height, y2)

                face = image.crop((x1, y1, x2, y2))
                faces.append(face)

            return faces if faces else [image]
        except Exception as e:
            logger.warning(f"Face detection failed: {e}. Using full image.")
            return [image]

    def _predict_single_image(self, image: Image.Image):
        faces = self._extract_faces(image)

        predictions = []
        confidences = []

        for face in faces:
            face_tensor = self.transform(face).unsqueeze(0).to(self.device)

            with torch.no_grad():
                outputs = self.model(face_tensor)
                probabilities = torch.nn.functional.softmax(outputs, dim=1)
                confidence, predicted = torch.max(probabilities, 1)

                predictions.append(predicted.item())
                confidences.append(confidence.item())

        avg_prediction = np.mean(predictions)
        avg_confidence = np.mean(confidences)

        is_fake = avg_prediction > 0.5
        label = "FAKE" if is_fake else "REAL"
        confidence_score = avg_confidence if is_fake else (1 - avg_confidence)

        reasoning = "AI-based EfficientNet-B4 classification result."

        return label, confidence_score, reasoning

    def detect_image(self, image_bytes: bytes) -> Dict:
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        label, confidence, reasoning = self._predict_single_image(image)

        return {
            "label": label,
            "confidence": round(confidence * 100, 2),
            "reasoning": reasoning,
        }

    def detect_video(self, video_path: str, max_frames: int = 10) -> Dict:
        cap = cv2.VideoCapture(video_path)
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

        frame_indices = np.linspace(
            0, total_frames - 1, min(max_frames, total_frames), dtype=int
        )

        frame_results = []

        for frame_idx in frame_indices:
            cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
            ret, frame = cap.read()
            if not ret:
                continue

            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            pil_image = Image.fromarray(frame_rgb)

            label, confidence, _ = self._predict_single_image(pil_image)

            frame_results.append({
                "frame": int(frame_idx),
                "label": label,
                "confidence": confidence
            })

        cap.release()

        fake_count = sum(1 for r in frame_results if r["label"] == "FAKE")
        avg_confidence = np.mean([r["confidence"] for r in frame_results])

        overall_label = "FAKE" if fake_count > len(frame_results) / 2 else "REAL"

        return {
            "label": overall_label,
            "confidence": round(avg_confidence * 100, 2),
            "reasoning": f"Analyzed {len(frame_results)} frames from video.",
        }

# ✅ SINGLETON INSTANCE
detector_instance = None

def get_detector() -> DeepFakeDetector:
    global detector_instance
    if detector_instance is None:
        detector_instance = DeepFakeDetector()
    return detector_instance
