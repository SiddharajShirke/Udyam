import pytest

from lib.json_utils import extract_json


def test_plain_json():
    assert extract_json('{"a": 1}') == {"a": 1}


def test_fenced_json():
    text = '```json\n{"a": 1}\n```'
    assert extract_json(text) == {"a": 1}


def test_fenced_json_no_language_tag():
    text = '```\n{"a": 1}\n```'
    assert extract_json(text) == {"a": 1}


def test_invalid_json_raises():
    with pytest.raises(Exception):
        extract_json("not json at all")
