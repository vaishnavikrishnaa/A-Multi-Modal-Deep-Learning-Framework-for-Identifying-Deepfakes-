# 🔍 DeepFake Detection System using EfficientNet & FastAPI

A **full-stack AI-based DeepFake Detection System** that identifies whether an uploaded **image or video is REAL or FAKE** using a trained deep learning model.  
This project integrates **PyTorch, FastAPI, React (Vite), Tailwind CSS, and JWT Authentication**.

---

## 🚀 Features

✅ Detects Deepfake **Images**  
✅ Detects Deepfake **Videos**  
✅ Secure **User Authentication (Login & Register)**  
✅ **JWT Protected APIs**  
✅ **Scan History Per User**  
✅ **Face Detection using MTCNN**  
✅ **EfficientNet-B4 Deep Learning Model**  
✅ **Fast & Accurate Predictions**  
✅ **Modern UI with React + TailwindCSS**

---

## 🧠 AI Model Details

| Parameter        | Value |
|------------------|-------|
| **Model Used**   | EfficientNet-B4 |
| **Framework**   | PyTorch |
| **Dataset**     | Kaggle – Real vs Fake Faces |
| **Training Type** | Transfer Learning |
| **Loss Function** | CrossEntropyLoss |
| **Optimizer**   | Adam |
| **Input Size**  | 224 × 224 |

---

## ⚙️ Backend Setup (FastAPI)

### 1️⃣ Create Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate


2️⃣ Install Dependencies
pip install -r requirements.txt

3️⃣ Start Backend Server
uvicorn main:app --reload

✅ Backend Runs At:
http://127.0.0.1:8000

✅ Swagger API Docs:
http://127.0.0.1:8000/docs

🎨 Frontend Setup (React + Vite)
cd frontend
npm install
npm run dev

✅ Frontend Runs At:
http://localhost:5173


🔐 API Routes
Route	Method	Purpose
/auth/register	POST	Register User
/auth/login	POST	Login User
/api/detect/image	POST	Detect Deepfake Image
/api/detect/video	POST	Detect Deepfake Video
/api/history	GET	User Scan History
📌 Technologies Used

Python

PyTorch

FastAPI

React (Vite)

Tailwind CSS

JWT Authentication

SQLite / SQLAlchemy

MTCNN Face Detection

OpenCV

Kaggle Dataset

🎯 Real-World Applications

✅ Fake News Detection
✅ Cyber Crime Prevention
✅ Election Media Verification
✅ Celebrity Impersonation Detection
✅ AI Ethics & Digital Security

📂 Dataset Disclaimer

Due to GitHub size limitations, the dataset is not included in this repository.

Dataset used:
Kaggle – 140K Real and Fake Faces Dataset

You can download it from Kaggle and place it in the appropriate backend dataset folder before running training.
