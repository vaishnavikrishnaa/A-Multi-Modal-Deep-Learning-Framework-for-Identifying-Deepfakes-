from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class ScanHistory(Base):
    __tablename__ = "scan_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    filename = Column(String, nullable=False)
    file_type = Column(String, nullable=False)  # image / video
    prediction = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)
    reasoning = Column(String, nullable=False)

    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="scans")
