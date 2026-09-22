"""Section 9.2 / 9.6 — SSRF-safe URL validation.

DNS resolution is monkeypatched rather than hitting the real network, so
these tests are deterministic and CI-safe (no flaky network dependency),
while still exercising the exact resolved-IP check the real code path uses.
"""

import socket

import pytest

from sandbox.submission import validate_external_url


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
    # Simulates DNS rebinding: a domain that looks external but resolves to
    # a private address.
    monkeypatch.setattr(socket, "gethostbyname", lambda host: "10.0.0.5")
    with pytest.raises(ValueError, match="private/internal address"):
        validate_external_url("https://sneaky-domain.example/")


def test_rejects_loopback_ip_after_dns_resolution(monkeypatch):
    monkeypatch.setattr(socket, "gethostbyname", lambda host: "127.0.0.1")
    with pytest.raises(ValueError, match="private/internal address"):
        validate_external_url("https://sneaky-domain.example/")


def test_accepts_public_ip_after_dns_resolution(monkeypatch):
    # 8.8.8.8 is a real, publicly routable address (Google Public DNS) —
    # unlike 203.0.113.0/24 (RFC 5737 TEST-NET-3), it isn't in a reserved
    # documentation range, so it correctly passes every check.
    monkeypatch.setattr(socket, "gethostbyname", lambda host: "8.8.8.8")
    assert validate_external_url("https://my-space.hf.space/") == "https://my-space.hf.space/"


def test_unresolvable_hostname_rejected(monkeypatch):
    def _raise(host):
        raise socket.gaierror("no such host")

    monkeypatch.setattr(socket, "gethostbyname", _raise)
    with pytest.raises(ValueError, match="Could not resolve"):
        validate_external_url("https://does-not-exist.invalid/")
