"""
Plant Disease Detection API
Uses PyTorch CNN model to detect plant diseases from leaf images
"""
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from PIL import Image
import torch
from torchvision import transforms
import io
import os
import base64

app = FastAPI(title="Plant Disease Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Disease class names (39 classes from PlantVillage dataset)
disease_classes = [
    'Apple___Apple_scab',
    'Apple___Black_rot',
    'Apple___Cedar_apple_rust',
    'Apple___healthy',
    'Blueberry___healthy',
    'Cherry_(including_sour)___Powdery_mildew',
    'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
    'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight',
    'Corn_(maize)___healthy',
    'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)',
    'Peach___Bacterial_spot',
    'Peach___healthy',
    'Pepper,_bell___Bacterial_spot',
    'Pepper,_bell___healthy',
    'Potato___Early_blight',
    'Potato___Late_blight',
    'Potato___healthy',
    'Raspberry___healthy',
    'Soybean___healthy',
    'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch',
    'Strawberry___healthy',
    'Tomato___Bacterial_spot',
    'Tomato___Early_blight',
    'Tomato___Late_blight',
    'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato___Tomato_mosaic_virus',
    'Tomato___healthy'
]

# Treatment recommendations for each disease
disease_treatments = {
    'Apple___Apple_scab': 'Remove fallen leaves. Apply fungicide sprays. Use resistant varieties.',
    'Apple___Black_rot': 'Prune infected branches. Remove mummified fruits. Apply fungicide.',
    'Apple___Cedar_apple_rust': 'Remove nearby cedar trees. Apply fungicide in spring.',
    'Apple___healthy': 'Plant is healthy! Continue regular care and monitoring.',
    'Corn_(maize)___Northern_Leaf_Blight': 'Use resistant hybrids. Apply fungicide. Practice crop rotation.',
    'Corn_(maize)___Common_rust_': 'Plant resistant varieties. Apply fungicide if severe.',
    'Grape___Black_rot': 'Prune and destroy infected parts. Apply fungicide spray program.',
    'Potato___Early_blight': 'Use certified disease-free seed. Apply fungicide. Practice crop rotation.',
    'Potato___Late_blight': 'Apply protective fungicide. Remove infected plants. Improve air circulation.',
    'Tomato___Early_blight': 'Remove infected leaves. Apply fungicide. Mulch to prevent splash.',
    'Tomato___Late_blight': 'Apply fungicide. Remove infected plants. Avoid overhead watering.',
    'Tomato___Leaf_Mold': 'Improve air circulation. Reduce humidity. Apply fungicide.',
    'Tomato___Bacterial_spot': 'Use disease-free seeds. Apply copper-based bactericide.',
    'Tomato___healthy': 'Plant is healthy! Maintain good cultural practices.'
}

# Global variable for model
model = None

class PlantDiseaseModel(torch.nn.Module):
    """Custom CNN architecture for plant disease detection"""
    def __init__(self, num_classes=39):
        super(PlantDiseaseModel, self).__init__()
        
        # Convolutional layers
        self.conv_layers = torch.nn.Sequential(
            # Block 1
            torch.nn.Conv2d(3, 32, kernel_size=3, padding=1),
            torch.nn.ReLU(),
            torch.nn.BatchNorm2d(32),
            torch.nn.Conv2d(32, 32, kernel_size=3, padding=1),
            torch.nn.ReLU(),
            torch.nn.BatchNorm2d(32),
            torch.nn.MaxPool2d(2, 2),
            
            # Block 2
            torch.nn.Conv2d(32, 64, kernel_size=3, padding=1),
            torch.nn.ReLU(),
            torch.nn.BatchNorm2d(64),
            torch.nn.Conv2d(64, 64, kernel_size=3, padding=1),
            torch.nn.ReLU(),
            torch.nn.BatchNorm2d(64),
            torch.nn.MaxPool2d(2, 2),
            
            # Block 3
            torch.nn.Conv2d(64, 128, kernel_size=3, padding=1),
            torch.nn.ReLU(),
            torch.nn.BatchNorm2d(128),
            torch.nn.Conv2d(128, 128, kernel_size=3, padding=1),
            torch.nn.ReLU(),
            torch.nn.BatchNorm2d(128),
            torch.nn.MaxPool2d(2, 2),
            
            # Block 4
            torch.nn.Conv2d(128, 256, kernel_size=3, padding=1),
            torch.nn.ReLU(),
            torch.nn.BatchNorm2d(256),
            torch.nn.Conv2d(256, 256, kernel_size=3, padding=1),
            torch.nn.ReLU(),
            torch.nn.BatchNorm2d(256),
            torch.nn.MaxPool2d(2, 2)
        )
        
        # Dense/Fully connected layers
        self.dense_layers = torch.nn.Sequential(
            torch.nn.Dropout(0.4),
            torch.nn.Linear(256 * 14 * 14, 1024),
            torch.nn.ReLU(),
            torch.nn.Dropout(0.4),
            torch.nn.Linear(1024, num_classes)
        )
    
    def forward(self, x):
        x = self.conv_layers(x)
        x = x.view(x.size(0), -1)
        x = self.dense_layers(x)
        return x


def load_model():
    """Load the PyTorch model"""
    global model
    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(script_dir, "plant_disease_model_1.pt")
    
    print(f"Looking for model at: {model_path}")
    
    if not os.path.exists(model_path):
        print(f"⚠️  Model file not found at {model_path}")
        print("📥 Please download from: https://drive.google.com/drive/folders/1ewJWAiduGuld_9oGSrTuLumg9y62qS6A")
        return None
    
    try:
        checkpoint = torch.load(model_path, map_location=torch.device('cpu'), weights_only=False)
        model = PlantDiseaseModel(num_classes=39)
        
        if isinstance(checkpoint, dict):
            model.load_state_dict(checkpoint, strict=False)
            print("✓ Loaded state_dict into custom model")
        else:
            model = checkpoint
            print("✓ Loaded full model")
        
        model.eval()
        print("✓ Model loaded successfully!")
        return model
    except Exception as e:
        print(f"✗ Error loading model: {e}")
        import traceback
        traceback.print_exc()
        return None


# Image transformation pipeline
transform = transforms.Compose([
    transforms.Resize(255),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])


def predict_disease(image_bytes):
    """Predict disease from image bytes"""
    global model
    
    if model is None:
        model = load_model()
        if model is None:
            raise HTTPException(status_code=503, detail="Model not available. Please download the model file.")
    
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        image_tensor = transform(image).unsqueeze(0)
        
        with torch.no_grad():
            outputs = model(image_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probabilities, 1)
        
        predicted_class_idx = predicted.item()
        confidence_score = confidence.item() * 100
        
        disease_name = disease_classes[predicted_class_idx]
        parts = disease_name.split('___')
        plant_name = parts[0].replace('_', ' ')
        disease = parts[1].replace('_', ' ') if len(parts) > 1 else 'Unknown'
        
        treatment = disease_treatments.get(disease_name, 'Consult with agricultural expert for specific treatment recommendations.')
        
        if 'healthy' in disease.lower():
            severity = 'Healthy'
            color = 'green'
        elif confidence_score > 80:
            severity = 'High Confidence Detection'
            color = 'red' if 'healthy' not in disease.lower() else 'green'
        elif confidence_score > 60:
            severity = 'Moderate Confidence'
            color = 'orange'
        else:
            severity = 'Low Confidence - Further inspection needed'
            color = 'yellow'
        
        return {
            'success': True,
            'plant': plant_name,
            'disease': disease,
            'confidence': round(confidence_score, 2),
            'severity': severity,
            'color': color,
            'treatment': treatment,
            'raw_prediction': disease_name
        }
        
    except Exception as e:
        print(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@app.get("/")
async def root():
    return {
        "message": "Plant Disease Detection API",
        "version": "1.0",
        "model_status": "loaded" if model is not None else "not_loaded",
        "classes": len(disease_classes)
    }


@app.post("/detect/")
async def detect_disease(file: UploadFile = File(...)):
    """Detect plant disease from uploaded image file"""
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        image_bytes = await file.read()
        result = predict_disease(image_bytes)
        return result
    except HTTPException:
        raise
    except Exception as e:
        print(f"Detection error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


class ImageBase64(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)
    image: str


@app.post("/detect-base64/")
async def detect_disease_base64(data: ImageBase64):
    """Detect plant disease from base64 encoded image"""
    try:
        image_data = data.image
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        image_bytes = base64.b64decode(image_data)
        result = predict_disease(image_bytes)
        return result
    except Exception as e:
        print(f"Base64 detection error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/classes/")
async def get_classes():
    """Get list of all detectable diseases"""
    return {
        "total": len(disease_classes),
        "classes": disease_classes
    }


if __name__ == "__main__":
    import uvicorn
    print("=" * 60)
    print("Starting Plant Disease Detection API")
    print("=" * 60)
    print("Server will run on: http://localhost:8002")
    print("API docs available at: http://localhost:8002/docs")
    print("=" * 60)
    load_model()
    uvicorn.run(app, host="0.0.0.0", port=8002, reload=True)

