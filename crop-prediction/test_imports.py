"""
Test if all required packages are installed correctly
Run with: python test_imports.py
"""

print("Testing imports...")
print("-" * 50)

try:
    import fastapi
    print("✓ fastapi imported successfully - version:", fastapi.__version__)
except ImportError as e:
    print("✗ fastapi import failed:", e)

try:
    import uvicorn
    print("✓ uvicorn imported successfully - version:", uvicorn.__version__)
except ImportError as e:
    print("✗ uvicorn import failed:", e)

try:
    import pydantic
    print("✓ pydantic imported successfully - version:", pydantic.__version__)
except ImportError as e:
    print("✗ pydantic import failed:", e)

try:
    import numpy
    print("✓ numpy imported successfully - version:", numpy.__version__)
except ImportError as e:
    print("✗ numpy import failed:", e)

try:
    import pandas
    print("✓ pandas imported successfully - version:", pandas.__version__)
except ImportError as e:
    print("✗ pandas import failed:", e)

try:
    import torch
    print("✓ torch imported successfully - version:", torch.__version__)
except ImportError as e:
    print("✗ torch import failed:", e)

try:
    import sklearn
    print("✓ scikit-learn imported successfully - version:", sklearn.__version__)
except ImportError as e:
    print("✗ scikit-learn import failed:", e)

try:
    import requests
    print("✓ requests imported successfully - version:", requests.__version__)
except ImportError as e:
    print("✗ requests import failed:", e)

print("-" * 50)
print("\nIf all imports succeeded, you can start the server with:")
print("  python start_server.py")

