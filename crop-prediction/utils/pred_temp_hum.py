import requests
import os


# Default temperature and humidity values for major regions in India
REGION_DEFAULTS = {
    # Punjab region
    'LUDHIANA': (25.0, 65), 'AMRITSAR': (24.0, 70), 'JALANDHAR': (25.0, 68),
    'PATIALA': (25.5, 66), 'BATHINDA': (26.0, 60), 'GURDASPUR': (24.5, 72),
    
    # Haryana region
    'KARNAL': (25.0, 65), 'AMBALA': (24.5, 68), 'HISAR': (27.0, 55),
    'ROHTAK': (26.0, 60), 'PANIPAT': (25.5, 62),
    
    # UP region
    'LUCKNOW': (26.5, 70), 'KANPUR': (27.0, 68), 'VARANASI': (27.5, 72),
    'AGRA': (27.0, 65), 'MEERUT': (26.0, 68),
    
    # Maharashtra
    'MUMBAI': (28.0, 75), 'PUNE': (26.0, 65), 'NAGPUR': (28.5, 60),
    'NASHIK': (27.0, 62),
    
    # Karnataka
    'BANGALORE': (24.0, 65), 'MYSORE': (25.0, 68),
    
    # Tamil Nadu
    'CHENNAI': (29.0, 75), 'COIMBATORE': (27.0, 70),
    
    # Default for unknown districts
    'DEFAULT': (26.0, 65)
}


def get_temp_hum(district, state=None, month=None):
    """
    Get temperature and humidity for a district.
    First tries OpenWeatherMap API, falls back to default values if API fails.
    """
    
    # Try API first if key exists
    if os.path.exists(".api_key.txt"):
        try:
            with open(".api_key.txt", "r") as file:
                API_KEY = file.read().strip()
            
            # Skip if API key is placeholder or empty
            if API_KEY and API_KEY != "your_api_key_here" and len(API_KEY) > 10:
                url = f"https://api.openweathermap.org/data/2.5/weather?q={district},IN&appid={API_KEY}"
                response = requests.get(url, timeout=5)
                
                if response.status_code == 200:
                    data = response.json()
                    humidity = data['main']['humidity']
                    temp = (data['main']['temp_min'] + data['main']['temp_max']) / 2 - 273.15
                    print(f"✓ Using live weather data for {district}: {temp:.1f}°C, {humidity}% humidity")
                    return (temp, humidity)
                else:
                    print(f"⚠ API call failed (status {response.status_code}), using default values")
        except Exception as e:
            print(f"⚠ API error: {e}, using default values")
    
    # Fallback to default values
    district_upper = district.upper()
    temp, humidity = REGION_DEFAULTS.get(district_upper, REGION_DEFAULTS['DEFAULT'])
    print(f"✓ Using default climate data for {district}: {temp}°C, {humidity}% humidity")
    return (temp, humidity)
