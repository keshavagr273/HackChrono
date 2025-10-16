"""
Start the Plant Disease Detection API server
Run with: python start_disease_server.py
"""
import uvicorn

if __name__ == "__main__":
    print("=" * 60)
    print("Starting Plant Disease Detection API Server")
    print("=" * 60)
    print("Server will run on: http://localhost:8002")
    print("API docs available at: http://localhost:8002/docs")
    print("=" * 60)
    print("\n⚠️  IMPORTANT:")
    print("Make sure you have downloaded the model file:")
    print("plant_disease_model_1.pt")
    print("\nDownload from:")
    print("https://drive.google.com/drive/folders/1ewJWAiduGuld_9oGSrTuLumg9y62qS6A")
    print("\nPlace it in the crop-prediction folder")
    print("=" * 60)
    
    uvicorn.run("disease_api:app", host="0.0.0.0", port=8002, reload=True)

