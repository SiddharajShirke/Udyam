"""External URL validation must pin requests to validated public DNS answers."""

import socket

from aiohttp import web
from aiohttp.test_utils import TestServer
import pytest

from sandbox.http_client import get_status_code
from sandbox.url_security import (
    PinnedResolver,
    ValidatedExternalUrl,
    validate_external_url,
)


def _dns_answers(*addresses: str):
    def resolve(host: str, port: int, **kwargs):
        return [
            (socket.AF_INET6 if ":" in address else socket.AF_INET,
             socket.SOCK_STREAM, socket.IPPROTO_TCP, "", (address, port))
            for address in addresses
        ]

    return resolve


def test_rejects_non_https():
    with pytest.raises(ValueError, match="HTTPS"):
        validate_external_url("http://example.com/")


def test_rejects_localhost_hostname():
    with pytest.raises(ValueError, match="blocked internal address"):
        validate_external_url("https://localhost/")


def test_rejects_metadata_endpoint_hostname():
    with pytest.raises(ValueError, match="blocked internal address"):
        validate_external_url("https://169.254.169.254/")


def test_rejects_private_ip_after_dns_resolution(monkeypatch):
    monkeypatch.setattr(socket, "getaddrinfo", _dns_answers("10.0.0.5"))
    with pytest.raises(ValueError, match="private/internal address"):
        validate_external_url("https://sneaky-domain.example/")


def test_rejects_loopback_ip_after_dns_resolution(monkeypatch):
    monkeypatch.setattr(socket, "getaddrinfo", _dns_answers("127.0.0.1"))
    with pytest.raises(ValueError, match="private/internal address"):
        validate_external_url("https://sneaky-domain.example/")


def test_accepts_public_ip_after_dns_resolution(monkeypatch):
    monkeypatch.setattr(socket, "getaddrinfo", _dns_answers("8.8.8.8"))
    target = validate_external_url("https://my-space.hf.space/")
    assert target.url == "https://my-space.hf.space/"
    assert target.addresses == ("8.8.8.8",)


def test_rejects_dns_answer_set_containing_private_address(monkeypatch):
    monkeypatch.setattr(socket, "getaddrinfo", _dns_answers("8.8.8.8", "10.0.0.5"))
    with pytest.raises(ValueError, match="private/internal address"):
        validate_external_url("https://mixed.example/")


@pytest.mark.asyncio
async def test_pinned_resolver_does_not_resolve_hostname_again(monkeypatch):
    calls = 0

    def resolve(host: str, port: int, **kwargs):
        nonlocal calls
        calls += 1
        address = "8.8.8.8" if calls == 1 else "127.0.0.1"
        return _dns_answers(address)(host, port, **kwargs)

    monkeypatch.setattr(socket, "getaddrinfo", resolve)
    target = validate_external_url("https://rebinding.example/")
    records = await PinnedResolver(target).resolve(
        "rebinding.example", 443, socket.AF_UNSPEC
    )

    assert calls == 1
    assert [record["host"] for record in records] == ["8.8.8.8"]


@pytest.mark.asyncio
async def test_pinned_http_client_does_not_follow_redirects():
    redirected = False

    async def redirect(_request):
        raise web.HTTPFound("/internal")

    async def internal(_request):
        nonlocal redirected
        redirected = True
        return web.Response(text="unexpected")

    app = web.Application()
    app.router.add_get("/redirect", redirect)
    app.router.add_get("/internal", internal)
    async with TestServer(app) as server:
        url = server.make_url("/redirect")
        target = ValidatedExternalUrl(
            url=str(url),
            hostname=url.host,
            port=url.port,
            addresses=("127.0.0.1",),
        )

        assert await get_status_code(target, timeout=2) == 302
        assert redirected is False


def test_unresolvable_hostname_rejected(monkeypatch):
    def _raise(host):
        raise socket.gaierror("no such host")

    monkeypatch.setattr(socket, "gethostbyname", _raise)
    with pytest.raises(ValueError, match="Could not resolve"):
        validate_external_url("https://does-not-exist.invalid/")
