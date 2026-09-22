import os
import sys
from pathlib import Path

# Make the ai-engine package root importable when pytest is run from
# apps/ai-engine (as documented in README.md / CI).
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

os.environ.setdefault("INTERNAL_SECRET", "test-secret")
