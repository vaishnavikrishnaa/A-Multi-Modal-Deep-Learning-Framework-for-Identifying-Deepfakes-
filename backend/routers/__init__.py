from .detection import router as detection_router
from .auth import router as auth_router

__all__ = ["detection_router", "auth_router"]
