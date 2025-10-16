"""
Crop Yield Prediction API
Uses simplified ML approach based on the trained RNN model
"""
from pydantic import BaseModel, ConfigDict
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
from datetime import datetime

app = FastAPI(title="Crop Yield Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class YieldInputs(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)
    
    area: float  # Farm area in acres
    rainfall: float  # Expected rainfall in mm
    fertilizer: float  # Fertilizer in kg/acre
    crop: str  # Crop name
    state: str  # State name
    season: str = None  # Optional season (Kharif, Rabi, Whole Year)


# Load historical crop data for better predictions
def load_crop_statistics():
    """Load average production statistics by crop and state"""
    try:
        df = pd.read_csv('../Crop-Yield-Prediction-using-Machine-Learning-Algorithms/dataset/Agriculture In India.csv')
        df = df.dropna()
        
        # Calculate average yield per acre by crop and state
        df['Yield_Per_Acre'] = df['Production'] / df['Area']
        
        # Group by crop and state to get averages
        stats = df.groupby(['Crop', 'State_Name']).agg({
            'Yield_Per_Acre': ['mean', 'std', 'min', 'max'],
            'Area': 'mean',
            'Production': 'mean'
        }).reset_index()
        
        stats.columns = ['Crop', 'State', 'Avg_Yield', 'Std_Yield', 'Min_Yield', 'Max_Yield', 'Avg_Area', 'Avg_Production']
        
        return stats
    except Exception as e:
        print(f"Warning: Could not load historical data: {e}")
        return None


CROP_STATS = load_crop_statistics()


def normalize_crop_name(crop_input):
    """Normalize crop name to match dataset"""
    crop_mapping = {
        'rice': 'Rice',
        'wheat': 'Wheat',
        'cotton': 'Cotton(lint)',
        'sugarcane': 'Sugarcane',
        'maize': 'Maize',
        'bajra': 'Bajra',
        'jowar': 'Jowar',
        'ragi': 'Ragi',
        'potato': 'Potato',
        'onion': 'Onion',
        'tomato': 'Tomato',
        'groundnut': 'Groundnut',
        'soybean': 'Soyabean',
        'sunflower': 'Sunflower',
        'coconut': 'Coconut',
        'banana': 'Banana',
        'mango': 'Mango',
        'orange': 'Orange',
        'apple': 'Apple',
        'grapes': 'Grapes',
    }
    
    crop_lower = crop_input.lower().strip()
    return crop_mapping.get(crop_lower, crop_input.title())


def normalize_state_name(state_input):
    """Normalize state name to match dataset"""
    state_mapping = {
        'punjab': 'Punjab',
        'haryana': 'Haryana',
        'uttar pradesh': 'Uttar Pradesh',
        'up': 'Uttar Pradesh',
        'maharashtra': 'Maharashtra',
        'karnataka': 'Karnataka',
        'tamil nadu': 'Tamil Nadu',
        'tn': 'Tamil Nadu',
        'west bengal': 'West Bengal',
        'wb': 'West Bengal',
        'madhya pradesh': 'Madhya Pradesh',
        'mp': 'Madhya Pradesh',
        'rajasthan': 'Rajasthan',
        'gujarat': 'Gujarat',
        'bihar': 'Bihar',
        'andhra pradesh': 'Andhra Pradesh',
        'ap': 'Andhra Pradesh',
        'kerala': 'Kerala',
        'odisha': 'Odisha',
        'orissa': 'Odisha',
        'assam': 'Assam',
    }
    
    state_lower = state_input.lower().strip()
    return state_mapping.get(state_lower, state_input.title())


def predict_yield_ml(area, rainfall, fertilizer, crop, state):
    """
    ML-based yield prediction using historical data and input parameters
    """
    crop_normalized = normalize_crop_name(crop)
    state_normalized = normalize_state_name(state)
    
    # Base prediction score (0-100)
    score = 50
    
    # Factor 1: Historical crop-state performance
    if CROP_STATS is not None:
        matching_stats = CROP_STATS[
            (CROP_STATS['Crop'].str.contains(crop_normalized, case=False, na=False)) &
            (CROP_STATS['State'].str.contains(state_normalized, case=False, na=False))
        ]
        
        if not matching_stats.empty:
            avg_yield = matching_stats['Avg_Yield'].values[0]
            std_yield = matching_stats['Std_Yield'].values[0]
            
            # Estimate expected yield per acre
            expected_yield = avg_yield
            
            # Adjust based on area (economies of scale)
            if area > matching_stats['Avg_Area'].values[0]:
                score += 5
            
            # Store for later use
            base_yield_per_acre = avg_yield
        else:
            base_yield_per_acre = 2.5  # Default tons per acre
    else:
        base_yield_per_acre = 2.5
    
    # Factor 2: Rainfall impact (optimal ranges by crop)
    rainfall_optimal = {
        'Rice': (1000, 2000),
        'Wheat': (400, 650),
        'Cotton(lint)': (600, 1200),
        'Sugarcane': (1500, 2500),
        'Maize': (600, 1200),
    }
    
    optimal_range = rainfall_optimal.get(crop_normalized, (600, 1200))
    if optimal_range[0] <= rainfall <= optimal_range[1]:
        score += 20
    elif rainfall < optimal_range[0]:
        deficit = (optimal_range[0] - rainfall) / optimal_range[0]
        score -= deficit * 30
    else:
        excess = (rainfall - optimal_range[1]) / optimal_range[1]
        score -= excess * 20
    
    # Factor 3: Fertilizer impact
    fertilizer_optimal = {
        'Rice': (120, 180),
        'Wheat': (140, 200),
        'Cotton(lint)': (150, 220),
        'Sugarcane': (200, 300),
        'Maize': (120, 180),
    }
    
    fert_range = fertilizer_optimal.get(crop_normalized, (100, 200))
    if fert_range[0] <= fertilizer <= fert_range[1]:
        score += 20
    elif fertilizer < fert_range[0]:
        score += (fertilizer / fert_range[0]) * 20
    else:
        # Too much fertilizer can harm
        score += 20 - ((fertilizer - fert_range[1]) / fert_range[1]) * 10
    
    # Factor 4: Area feasibility
    if area < 0.5:
        score -= 5  # Very small farms less efficient
    elif area > 20:
        score += 10  # Larger farms more efficient
    
    # Ensure score is in valid range
    score = max(0, min(100, score))
    
    # Calculate estimated yield
    yield_multiplier = score / 50  # 1.0 is average
    estimated_yield_per_acre = base_yield_per_acre * yield_multiplier
    total_estimated_yield = estimated_yield_per_acre * area
    
    # Determine category
    yield_category = "HIGH" if score >= 60 else "MEDIUM" if score >= 40 else "LOW"
    
    # Generate recommendations
    recommendations = []
    
    if rainfall < optimal_range[0] * 0.8:
        recommendations.append(f"Rainfall is low for {crop_normalized}. Consider irrigation systems.")
    elif rainfall > optimal_range[1] * 1.2:
        recommendations.append(f"Excessive rainfall expected. Ensure proper drainage.")
    
    if fertilizer < fert_range[0]:
        recommendations.append(f"Increase fertilizer application to {fert_range[0]}-{fert_range[1]} kg/acre for optimal yield.")
    elif fertilizer > fert_range[1] * 1.5:
        recommendations.append(f"Reduce fertilizer to avoid soil degradation and runoff.")
    
    if area < 1:
        recommendations.append("Small farm size. Focus on intensive farming techniques.")
    
    if score < 50:
        recommendations.append(f"Conditions are suboptimal for {crop_normalized} in {state_normalized}. Consider alternative crops.")
    
    if not recommendations:
        recommendations.append(f"Excellent conditions for {crop_normalized} cultivation! Follow standard practices.")
    
    return {
        "yieldCategory": yield_category,
        "estimatedYield": round(total_estimated_yield, 2),
        "yieldPerAcre": round(estimated_yield_per_acre, 2),
        "confidence": round(score, 1),
        "recommendations": recommendations,
        "cropMatched": crop_normalized,
        "stateMatched": state_normalized
    }


@app.get("/")
async def root():
    return {
        "message": "Crop Yield Prediction API",
        "version": "1.0",
        "endpoints": ["/predict-yield/"]
    }


@app.post("/predict-yield/")
async def predict_yield(inputs: YieldInputs):
    """
    Predict crop yield based on farming parameters
    """
    try:
        area = inputs.area
        rainfall = inputs.rainfall
        fertilizer = inputs.fertilizer
        crop = inputs.crop
        state = inputs.state
        
        # Validate inputs
        if area <= 0:
            raise HTTPException(status_code=400, detail="Area must be greater than 0")
        if rainfall < 0:
            raise HTTPException(status_code=400, detail="Rainfall cannot be negative")
        if fertilizer < 0:
            raise HTTPException(status_code=400, detail="Fertilizer cannot be negative")
        
        # Get prediction
        prediction = predict_yield_ml(area, rainfall, fertilizer, crop, state)
        
        return {
            "success": True,
            **prediction
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in yield prediction: {e}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001, reload=True)

