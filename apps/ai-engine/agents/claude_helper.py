"""Claude wrapper with one retry for transient failures."""

import os
from time import sleep


def ask_claude(prompt: str, system: str) -> str | None:
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        return None
    from anthropic import Anthropic

    client = Anthropic(api_key=api_key)
    for attempt in range(2):
        try:
            response = client.messages.create(model=os.getenv("ANTHROPIC_MODEL", "claude-3-5-haiku-latest"), max_tokens=300, system=system, messages=[{"role": "user", "content": prompt}])
            return "".join(block.text for block in response.content if getattr(block, "type", None) == "text").strip()
        except Exception:
            if attempt == 0:
                sleep(0.5)
    return None
