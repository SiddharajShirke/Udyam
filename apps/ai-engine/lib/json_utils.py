"""Shared helper for parsing Claude's JSON responses.

Claude sometimes wraps JSON in ```json ... ``` fences despite being told
not to — strip those before parsing rather than failing on them.
"""

import json
import re

_FENCE_RE = re.compile(r"^```(?:json)?\s*(.*?)\s*```$", re.DOTALL)


def extract_json(text: str):
    stripped = text.strip()
    match = _FENCE_RE.match(stripped)
    if match:
        stripped = match.group(1).strip()
    return json.loads(stripped)
