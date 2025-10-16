"""
Test script for Yield Prediction API
Run with: python test_yield_api.py
"""
import requests
import json

# API endpoint
BASE_URL = "http://localhost:8001"

def test_api():
    print("=" * 60)
    print("Testing Crop Yield Prediction API")
    print("=" * 60)
    
    # Test 1: Root endpoint
    print("\n1. Testing root endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Error: {e}")
        return
    
    # Test 2: Good yield conditions (Rice in Punjab)
    print("\n2. Testing HIGH yield prediction (Rice in Punjab)...")
    test_data_high = {
        "area": 5.0,
        "rainfall": 1200,
        "fertilizer": 150,
        "crop": "Rice",
        "state": "Punjab"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/predict-yield/",
            json=test_data_high,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        
        if result.get('success'):
            print(f"\n✓ Yield Category: {result['yieldCategory']}")
            print(f"✓ Estimated Yield: {result['estimatedYield']} tons")
            print(f"✓ Confidence: {result['confidence']}%")
    except Exception as e:
        print(f"Error: {e}")
    
    # Test 3: Poor yield conditions (low rainfall)
    print("\n3. Testing LOW yield prediction (low rainfall)...")
    test_data_low = {
        "area": 3.0,
        "rainfall": 300,
        "fertilizer": 80,
        "crop": "Wheat",
        "state": "Rajasthan"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/predict-yield/",
            json=test_data_low,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        
        if result.get('success'):
            print(f"\n✓ Yield Category: {result['yieldCategory']}")
            print(f"✓ Estimated Yield: {result['estimatedYield']} tons")
            print(f"✓ Recommendations: {len(result['recommendations'])} provided")
    except Exception as e:
        print(f"Error: {e}")
    
    # Test 4: Different crop (Cotton in Maharashtra)
    print("\n4. Testing Cotton in Maharashtra...")
    test_data_cotton = {
        "area": 10.0,
        "rainfall": 900,
        "fertilizer": 180,
        "crop": "Cotton",
        "state": "Maharashtra"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/predict-yield/",
            json=test_data_cotton,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status: {response.status_code}")
        result = response.json()
        
        if result.get('success'):
            print(f"✓ Yield Category: {result['yieldCategory']}")
            print(f"✓ Estimated Yield: {result['estimatedYield']} tons")
            print(f"✓ Yield per acre: {result.get('yieldPerAcre', 'N/A')} tons/acre")
    except Exception as e:
        print(f"Error: {e}")
    
    print("\n" + "=" * 60)
    print("Testing complete!")
    print("=" * 60)

if __name__ == "__main__":
    test_api()

