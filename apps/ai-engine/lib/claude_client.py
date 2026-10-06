"""Thin wrapper around the Anthropic SDK shared by every agent.

Lazily constructs the client (so importing this module never fails just
because ANTHROPIC_API_KEY isn't set yet), and routes every call through
lib.retry.call_with_retry per Section 8.
"""

import os

from anthropic import AsyncAnthropic

from lib.retry import call_with_retry

DEFAULT_MODEL = "claude-sonnet-5"

_client: AsyncAnthropic | None = None


def get_claude_client() -> AsyncAnthropic:
    global _client
    if _client is None:
        api_key = os.environ.get("ANTHROPIC_API_KEY")
        if not api_key:
            raise RuntimeError(
                "ANTHROPIC_API_KEY is not set — fill it into apps/ai-engine/.env"
            )
        _client = AsyncAnthropic(api_key=api_key)
    return _client


async def ask_claude_text(
    system: str,
    user: str,
    model: str = DEFAULT_MODEL,
    max_tokens: int = 2048,
) -> str:
    client = get_claude_client()

    async def _call():
        return await client.messages.create(
            model=model,
            max_tokens=max_tokens,
            system=system,
            messages=[{"role": "user", "content": user}],
        )

    response = await call_with_retry(_call, retries=1)
    return "".join(block.text for block in response.content if block.type == "text")
