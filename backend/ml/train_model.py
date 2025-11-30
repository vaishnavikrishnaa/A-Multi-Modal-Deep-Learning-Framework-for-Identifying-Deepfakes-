import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader
import os

# ✅ SMALL DATASET PATH (FAST TRAINING)
DATASET_PATH = "/Users/vaishnavikrishna/Downloads/DeepFakeDetect/backend/deepfake_small/train"

# ✅ MODEL SAVE PATH
SAVE_PATH = "/Users/vaishnavikrishna/Downloads/DeepFakeDetect/backend/ml/models/deepfake_efficientnet_b4.pth"

os.makedirs(os.path.dirname(SAVE_PATH), exist_ok=True)

# ✅ IMAGE TRANSFORMS
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

dataset = datasets.ImageFolder(DATASET_PATH, transform=transform)
loader = DataLoader(dataset, batch_size=8, shuffle=True)  # ✅ smaller batch for Mac

# ✅ LOAD MODEL
model = models.efficientnet_b4(weights="DEFAULT")
num_features = model.classifier[1].in_features
model.classifier[1] = nn.Linear(num_features, 2)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.0001)

# ✅ FAST TRAINING SETTINGS
EPOCHS = 2   # ✅ Only 2 epochs (fast & safe)

print("✅ Training started on:", device)

for epoch in range(EPOCHS):
    model.train()
    total_loss = 0

    for images, labels in loader:
        images, labels = images.to(device), labels.to(device)

        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        total_loss += loss.item()

    print(f"✅ Epoch {epoch+1}/{EPOCHS} | Loss: {total_loss:.4f}")

# ✅ SAVE TRAINED MODEL
torch.save(model.state_dict(), SAVE_PATH)
print("✅ Model trained and saved successfully!")
