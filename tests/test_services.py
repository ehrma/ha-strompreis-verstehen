"""The actions."""

from __future__ import annotations

from datetime import timedelta

import pytest

from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ServiceValidationError
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.strompreis_verstehen.const import DOMAIN
from custom_components.strompreis_verstehen.model import HomeData, Tariff, cheapest_window, parse_ts

from .conftest import load_home


async def call(hass: HomeAssistant, service: str, data: dict) -> dict:
    return await hass.services.async_call(DOMAIN, service, data, blocking=True, return_response=True)


async def test_find_cheapest_window(hass: HomeAssistant, setup_integration: MockConfigEntry) -> None:
    result = await call(hass, "find_cheapest_window", {"duration": {"hours": 2}})
    data = HomeData.parse(load_home())
    expected = cheapest_window(data.slots, timedelta(hours=2), parse_ts("2026-09-15T10:00:00Z"))
    assert result["found"] is True
    assert result["start"] == expected.start.isoformat()
    assert result["duration_minutes"] == 120
    assert len(result["prices"]) == 8
    assert result["average_ct_kwh"] == round(expected.average / 10, 2)


async def test_find_cheapest_window_within_bounds(hass: HomeAssistant, setup_integration: MockConfigEntry) -> None:
    # evening of today until the next morning, in local time (the instance runs in Europe/Berlin)
    result = await call(
        hass,
        "find_cheapest_window",
        {"duration": "01:30:00", "earliest_start": "2026-09-15 18:05:00", "latest_end": "2026-09-16 07:00:00"},
    )
    assert result["found"] is True
    start, end = parse_ts(result["start"]), parse_ts(result["end"])
    assert start >= parse_ts("2026-09-15T16:15:00Z")  # 18:05 Berlin rounds up to 18:15
    assert end <= parse_ts("2026-09-16T05:00:00Z")


async def test_find_cheapest_window_with_my_price(hass: HomeAssistant, setup_integration: MockConfigEntry) -> None:
    result = await call(hass, "find_cheapest_window", {"duration": "01:00:00", "price": "my_price"})
    tariff = Tariff()
    first = result["prices"][0]
    slot = HomeData.parse(load_home()).slot_at(parse_ts(first["start"]))
    assert first["ct_kwh"] == round(tariff.end_price_ct(slot.eur_mwh, slot.start), 2)


async def test_find_nothing(hass: HomeAssistant, setup_integration: MockConfigEntry) -> None:
    result = await call(hass, "find_cheapest_window", {"duration": "01:00:00", "earliest_start": "2026-09-30 00:00:00"})
    assert result == {"found": False}
    with pytest.raises(ServiceValidationError):
        await call(
            hass,
            "find_cheapest_window",
            {"duration": "01:00:00", "earliest_start": "2026-09-15 20:00:00", "latest_end": "2026-09-15 19:00:00"},
        )


async def test_get_prices(hass: HomeAssistant, setup_integration: MockConfigEntry) -> None:
    result = await call(hass, "get_prices", {})
    assert result["date"] == "2026-09-15"
    assert len(result["prices"]) == 96
    assert result["prices"][48]["exchange_ct_kwh"] == 6.07
    assert result["prices"][48]["level"] == "sehr_guenstig"
    assert (await call(hass, "get_prices", {"date": "2026-09-16"}))["date"] == "2026-09-16"
    with pytest.raises(ServiceValidationError):
        await call(hass, "get_prices", {"date": "2026-01-01"})
