"""Fixtures: a real /api/v1/home response and a clock inside it."""

from __future__ import annotations

from collections.abc import Generator
import json
from pathlib import Path
from typing import Any

import pytest

from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er
from pytest_homeassistant_custom_component.common import MockConfigEntry
from pytest_homeassistant_custom_component.test_util.aiohttp import AiohttpClientMocker

from custom_components.strompreis_verstehen.const import DEFAULT_API_URL, DOMAIN, HOME_PATH

FIXTURES = Path(__file__).parent / "fixtures"
HOME_URL = DEFAULT_API_URL + HOME_PATH
# 12:07 in Berlin on the fixture's "today" (2026-09-15), inside the quarter 12:00-12:15
NOW = "2026-09-15T10:07:00+00:00"


def entity_id(hass: HomeAssistant, ref: str) -> str:
    """"sensor:exchange_price" -> its entity id via the unique id (entity ids follow the instance language)."""
    platform, key = ref.split(":")
    registry = er.async_get(hass)
    entry = hass.config_entries.async_entries(DOMAIN)[0]
    found = registry.async_get_entity_id(platform, DOMAIN, f"{entry.entry_id}_{key}")
    assert found is not None, ref
    return found


def load_home(name: str = "home_with_tomorrow") -> dict[str, Any]:
    return json.loads((FIXTURES / f"{name}.json").read_text(encoding="utf-8"))


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations: None) -> Generator[None]:
    yield


@pytest.fixture
def home() -> dict[str, Any]:
    return load_home()


@pytest.fixture
def mock_api(aioclient_mock: AiohttpClientMocker, home: dict[str, Any]) -> AiohttpClientMocker:
    aioclient_mock.get(HOME_URL, json=home, headers={"ETag": '"abc"'})
    return aioclient_mock


@pytest.fixture
def config_entry() -> MockConfigEntry:
    return MockConfigEntry(domain=DOMAIN, title="Strompreis verstehen", data={}, options={})


@pytest.fixture
async def setup_integration(
    hass: HomeAssistant, config_entry: MockConfigEntry, mock_api: AiohttpClientMocker, freezer
) -> MockConfigEntry:
    freezer.move_to(NOW)
    await hass.config.async_set_time_zone("Europe/Berlin")
    config_entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(config_entry.entry_id)
    await hass.async_block_till_done()
    return config_entry
