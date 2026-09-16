"""Setup, polling, the card subscription and diagnostics."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry
from pytest_homeassistant_custom_component.test_util.aiohttp import AiohttpClientMocker
from pytest_homeassistant_custom_component.typing import WebSocketGenerator

from custom_components.strompreis_verstehen.coordinator import poll_interval
from custom_components.strompreis_verstehen.const import (
    UPDATE_INTERVAL,
    UPDATE_INTERVAL_WAITING_EXPLANATIONS,
    UPDATE_INTERVAL_WAITING_TOMORROW,
)
from custom_components.strompreis_verstehen.diagnostics import async_get_config_entry_diagnostics
from custom_components.strompreis_verstehen.model import HomeData, parse_ts

from .conftest import HOME_URL, load_home


async def test_setup_and_unload(hass: HomeAssistant, setup_integration: MockConfigEntry) -> None:
    entry = setup_integration
    assert entry.state is ConfigEntryState.LOADED
    assert await hass.config_entries.async_unload(entry.entry_id)
    assert entry.state is ConfigEntryState.NOT_LOADED


async def test_setup_retries_when_the_api_is_down(
    hass: HomeAssistant, config_entry: MockConfigEntry, aioclient_mock: AiohttpClientMocker
) -> None:
    aioclient_mock.get(HOME_URL, status=503)
    config_entry.add_to_hass(hass)
    await hass.config_entries.async_setup(config_entry.entry_id)
    assert config_entry.state is ConfigEntryState.SETUP_RETRY


async def test_integration_names_itself(
    hass: HomeAssistant, setup_integration: MockConfigEntry, mock_api: AiohttpClientMocker
) -> None:
    _method, _url, _data, headers = mock_api.mock_calls[-1]
    assert headers["User-Agent"].startswith("StrompreisVerstehen-HA/")


def test_poll_faster_while_waiting() -> None:
    with_tomorrow = HomeData.parse(load_home())
    without_tomorrow = HomeData.parse(load_home("home_without_tomorrow"))
    assert poll_interval(without_tomorrow, parse_ts("2026-09-16T10:00:00Z")) == UPDATE_INTERVAL  # 12:00 Berlin
    assert poll_interval(without_tomorrow, parse_ts("2026-09-16T10:50:00Z")) == UPDATE_INTERVAL_WAITING_TOMORROW
    assert poll_interval(without_tomorrow, parse_ts("2026-09-16T18:00:00Z")) == UPDATE_INTERVAL  # 20:00, give up
    assert poll_interval(with_tomorrow, parse_ts("2026-09-15T11:00:00Z")) == UPDATE_INTERVAL
    no_explanations = HomeData.parse({**load_home(), "today": {**load_home()["today"], "hours": []}})
    assert poll_interval(no_explanations, parse_ts("2026-09-15T16:00:00Z")) == UPDATE_INTERVAL_WAITING_EXPLANATIONS


async def test_card_subscription(
    hass: HomeAssistant, setup_integration: MockConfigEntry, hass_ws_client: WebSocketGenerator
) -> None:
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "strompreis_verstehen/subscribe"})
    result = await client.receive_json()
    assert result["success"] is True
    event = await client.receive_json()
    payload = event["event"]
    assert payload["home"]["date"] == "2026-09-15"
    assert payload["tariff"]["own"] is False
    assert payload["last_update_success"] is True


async def test_diagnostics(hass: HomeAssistant, setup_integration: MockConfigEntry) -> None:
    diagnostics = await async_get_config_entry_diagnostics(hass, setup_integration)
    assert diagnostics["data"]["slots"] == 288
    assert diagnostics["data"]["tomorrow_available"] is True
