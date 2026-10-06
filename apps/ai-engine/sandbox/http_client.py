"""HTTP status requests that can use DNS addresses pinned by URL validation."""

import aiohttp
import httpx

from sandbox.url_security import ValidatedExternalUrl


async def get_status_code(
    url: str | ValidatedExternalUrl, timeout: float
) -> int:
    if isinstance(url, ValidatedExternalUrl):
        connector = aiohttp.TCPConnector(resolver=url.resolver(), use_dns_cache=False)
        client_timeout = aiohttp.ClientTimeout(total=timeout)
        async with aiohttp.ClientSession(
            connector=connector,
            timeout=client_timeout,
            trust_env=False,
        ) as client:
            async with client.get(url.url, allow_redirects=False) as response:
                return response.status

    async with httpx.AsyncClient(follow_redirects=False, trust_env=False) as client:
        response = await client.get(url, timeout=timeout)
        return response.status_code
