import os
import sys

# Ensure repository root is in sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from backend.main import app

__all__ = ["app"]
