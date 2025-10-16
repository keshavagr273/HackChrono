"""
Start the Crop Yield Prediction API server
Run with: python start_yield_server.py
"""
import uvicorn

if __name__ == "__main__":
    print("=" * 60)
    print("Starting Crop Yield Prediction API Server")
    print("=" * 60)
    print("Server will run on: http://localhost:8001")
    print("API docs available at: http://localhost:8001/docs")
    print("Press Ctrl+C to stop")
    print("=" * 60)
    
    uvicorn.run("yield_api:app", host="0.0.0.0", port=8001, reload=True)

