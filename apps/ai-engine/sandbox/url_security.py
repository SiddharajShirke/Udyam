"""Validate external HTTPS targets and pin their connections to public DNS results."""

import ipaddress
import socket
from dataclasses import dataclass
from urllib.parse import urlparse

from aiohttp.abc import AbstractResolver, ResolveResult

BLOCKED_HOSTS = {"localhost", "127.0.0.1", "0.0.0.0", "169.254.169.254", "::1"}


@dataclass(frozen=True)
class ValidatedExternalUrl:
    url: str
    hostname: str
    port: int
    addresses: tuple[str, ...]

    def resolver(self) -> "PinnedResolver":
        return PinnedResolver(self)


class PinnedResolver(AbstractResolver):
    """Return only the public addresses validated with the submitted URL."""

    def __init__(self, target: ValidatedExternalUrl):
        self.target = target

    async def resolve(
        self, host: str, port: int = 0, family: int = socket.AF_INET
    ) -> list[ResolveResult]:
        normalized_host = host.encode("idna").decode("ascii").lower().rstrip(".")
        if normalized_host != self.target.hostname or port != self.target.port:
            raise OSError("Unexpected host or port during pinned URL connection")

        records = []
        for address in self.target.addresses:
            address_family = socket.AF_INET6 if ":" in address else socket.AF_INET
            if family not in (socket.AF_UNSPEC, address_family):
                continue
            records.append(
                {
                    "hostname": host,
                    "host": address,
                    "port": port,
                    "family": address_family,
                    "proto": 0,
                    "flags": socket.AI_NUMERICHOST,
                }
            )
        if not records:
            raise OSError("No validated addresses available for requested address family")
        return records

    async def close(self) -> None:
        return None


def validate_external_url(url: str) -> ValidatedExternalUrl:
    try:
        parsed = urlparse(url)
        hostname = parsed.hostname
        port = parsed.port if parsed.port is not None else 443
    except ValueError as exc:
        raise ValueError("Invalid URL") from exc

    if parsed.scheme != "https":
        raise ValueError("Only HTTPS URLs are accepted")
    if not hostname:
        raise ValueError("Invalid URL - no hostname")
    if parsed.username is not None or parsed.password is not None:
        raise ValueError("URLs containing credentials are not accepted")
    if port < 1 or port > 65535:
        raise ValueError("Invalid URL port")
    if "%" in hostname:
        raise ValueError("Scoped IP addresses are not accepted")

    try:
        normalized_host = hostname.encode("idna").decode("ascii").lower().rstrip(".")
    except UnicodeError as exc:
        raise ValueError("Invalid URL hostname") from exc
    if normalized_host in BLOCKED_HOSTS:
        raise ValueError("URL points to a blocked internal address")

    try:
        results = socket.getaddrinfo(
            normalized_host, port, type=socket.SOCK_STREAM
        )
    except socket.gaierror as exc:
        raise ValueError("Could not resolve hostname") from exc

    addresses = tuple(dict.fromkeys(result[4][0] for result in results))
    if not addresses:
        raise ValueError("Could not resolve hostname")

    for address in addresses:
        if "%" in address:
            raise ValueError("Scoped IP addresses are not accepted")
        try:
            parsed_address = ipaddress.ip_address(address)
        except ValueError as exc:
            raise ValueError("Hostname resolved to an invalid IP address") from exc
        if not parsed_address.is_global:
            raise ValueError("URL resolves to a private/internal address - rejected")

    return ValidatedExternalUrl(
        url=url,
        hostname=normalized_host,
        port=port,
        addresses=addresses,
    )
