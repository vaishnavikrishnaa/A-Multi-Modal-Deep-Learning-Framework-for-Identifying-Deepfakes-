🔍 DeepFake Detection System using EfficientNet & FastAPI

A full-stack AI-based DeepFake Detection System that identifies whether an uploaded image or video is REAL or FAKE using a trained deep learning model. This project integrates PyTorch, FastAPI, React (Vite), and JWT Authentication.

🚀 Features

✅ Detects Deepfake Images

✅ Detects Deepfake Videos

✅ User Authentication (Login & Register)

✅ JWT Secure API

✅ Scan History Per User

✅ Face Detection using MTCNN

✅ EfficientNet-B4 Deep Learning Model

✅ Fast & Accurate Predictions

✅ Modern UI with React + TailwindCSS

🧠 AI Model Details

Model Used: EfficientNet-B4

Framework: PyTorch

Dataset: Kaggle – Real vs Fake Faces

Training Type: Transfer Learning

Loss Function: CrossEntropyLoss

Optimizer: Adam

Input Size: 224 × 224

⚙️ Backend Setup (FastAPI)
1️⃣ Create Virtual Environment
python3 -m venv venv
source venv/bin/activate

2️⃣ Install Dependencies
pip install -r requirements.txt

3️⃣ Start Backend Server
uvicorn main:app --reload


Backend runs at:

http://127.0.0.1:8000


Swagger Docs:

http://127.0.0.1:8000/docs

🎨 Frontend Setup (React + Vite)
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173
