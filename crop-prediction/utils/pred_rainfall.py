import pandas as pd


def get_rainfall(state, district, month):
    df = pd.read_csv('data/district wise rainfall normal.csv')
    
    # Convert input to uppercase for case-insensitive matching
    state_upper = state.upper()
    district_upper = district.upper()
    
    # Try exact match first
    row = df[(df['STATE_UT_NAME'].str.upper() == state_upper) & 
             (df['DISTRICT'].str.upper() == district_upper)]
    
    if row.empty:
        # Get available districts for this state for better error message
        available_districts = df[df['STATE_UT_NAME'].str.upper() == state_upper]['DISTRICT'].unique()
        if len(available_districts) > 0:
            raise Exception(
                f"District '{district}' not found in state '{state}'. "
                f"Available districts: {', '.join(available_districts[:5])}..."
            )
        else:
            available_states = df['STATE_UT_NAME'].unique()[:10]
            raise Exception(
                f"State '{state}' not found. "
                f"Try: {', '.join(available_states)}..."
            )
    
    rainfall = row[month].values
    if rainfall.shape[0] == 0:
        raise Exception(
            f"Unable to match month:{month} with the state:{state} and district:{district}")
    
    return rainfall
