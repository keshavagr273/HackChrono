import pandas as pd

# Read the CSV file
df = pd.read_csv('data/district wise rainfall normal.csv')

# Show all unique states
print("AVAILABLE STATES:")
print("=" * 50)
states = df['STATE_UT_NAME'].unique()
for state in sorted(states):
    print(f"  - {state}")

print("\n" + "=" * 50)
print("\nPUNJAB DISTRICTS:")
print("=" * 50)
punjab = df[df['STATE_UT_NAME'].str.contains('PUNJAB', case=False, na=False)]
print(punjab[['STATE_UT_NAME', 'DISTRICT']])

print("\n" + "=" * 50)
print("\nCOLUMN NAMES:")
print("=" * 50)
print(df.columns.tolist())

print("\n" + "=" * 50)
print("\nSAMPLE DATA FOR TESTING:")
print("=" * 50)
print("State: PUNJAB")
print("District: LUDHIANA")
print("Month columns: JAN, FEB, MAR, ..., Jan-Feb, Mar-May, Jun-Sep, Oct-Dec")
print("\nTry this in your frontend:")
ludhiana = df[(df['STATE_UT_NAME'] == 'PUNJAB') & (df['DISTRICT'] == 'LUDHIANA')]
if not ludhiana.empty:
    print("✓ PUNJAB + LUDHIANA found!")
    print(f"  Jun-Sep rainfall: {ludhiana['Jun-Sep'].values[0]} mm")
else:
    print("✗ Not found with exact case")
    # Try case-insensitive
    ludhiana = df[(df['STATE_UT_NAME'].str.upper() == 'PUNJAB') & 
                  (df['DISTRICT'].str.upper() == 'LUDHIANA')]
    if not ludhiana.empty:
        print("✓ Found with case-insensitive search")

