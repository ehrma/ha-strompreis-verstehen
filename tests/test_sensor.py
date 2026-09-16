"""Entity states at a fixed time, and the switch to the next quarter without a new poll."""

from __future__ import annotations

from datetime import datetime, timedelta, timezone

from freezegun.api import FrozenDateTimeFactory

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockConfigEntry, async_fire_time_changed
from pytest_homeassistant_custom_component.test_util.aiohttp import AiohttpClientMocker

from custom_components.strompreis_verstehen.model import HomeData, cheapest_window

from .conftest import entity_id, load_home

UTC = timezone.utc


def state(hass: HomeAssistant, ref: str):
    """"sensor:exchange_price" -> the state of that entity, whatever language named it."""
    s = hass.states.get(entity_id(hass, ref))
    assert s is not None, ref
    return s


async def test_prices_now(hass: HomeAssistant, setup_integration: MockConfigEntry) -> None:
    # 12:00-12:15 Berlin costs 60.7 €/MWh
    price = state(hass, "sensor:exchange_price")
    assert float(price.state) == 6.07
    assert price.attributes["unit_of_measurement"] == "ct/kWh"
    assert price.attributes["level"] == "sehr_guenstig"
    assert len(price.attributes["data"]) == 2 * 96
    assert price.attributes["data"][0] == {
        "start_time": "2026-09-14T22:00:00+00:00",
        "end_time": "2026-09-14T22:15:00+00:00",
        "price_per_kwh": round(load_home()["today"]["price"][0] / 1000, 5),
    }
    assert float(state(hass, "sensor:next_exchange_price").state) == 4.34
    assert state(hass, "sensor:price_level").state == "sehr_guenstig"

    my_price = state(hass, "sensor:my_price")
    assert my_price.attributes["unit_of_measurement"] == "€/kWh"
    assert float(my_price.state) == round((60.7 / 10 * 1.19 + 19.69) / 100, 5)
    assert my_price.attributes["tariff_configured"] is False


async def test_day_statistics(hass: HomeAssistant, setup_integration: MockConfigEntry) -> None:
    home = load_home()
    today = home["today"]["price"]
    assert float(state(hass, "sensor:today_average").state) == round(sum(today) / 960, 2)
    low = state(hass, "sensor:today_min")
    assert float(low.state) == 2.64
    assert low.attributes["start"] == "2026-09-15T11:45:00+00:00"
    assert float(state(hass, "sensor:today_max").state) == 31.24
    tomorrow = home["tomorrow"]["price"]
    assert float(state(hass, "sensor:tomorrow_average").state) == round(sum(tomorrow) / 960, 2)
    assert state(hass, "binary_sensor:tomorrow_available").state == "on"
    assert state(hass, "binary_sensor:negative_price").state == "off"


async def test_story_of_the_hour(hass: HomeAssistant, setup_integration: MockConfigEntry) -> None:
    home = load_home()
    hour = next(h for h in home["today"]["hours"] if h["ts"] == "2026-09-15T10:00:00.000Z")
    explanation = state(hass, "sensor:explanation")
    assert explanation.state == hour["headline"]
    assert "€/MWh" not in explanation.attributes["text"]
    assert state(hass, "sensor:price_setter").state == hour["priceSetter"]
    phase = state(hass, "sensor:phase")
    assert phase.state == "Mittagstal"
    assert phase.attributes["from_hour"] == 11
    assert state(hass, "sensor:day_verdict").state == home["today"]["verdict"]["headline"]


async def test_cheapest_window(hass: HomeAssistant, setup_integration: MockConfigEntry) -> None:
    data = HomeData.parse(load_home())
    now = datetime(2026, 9, 15, 10, 0, tzinfo=UTC)
    expected = cheapest_window(data.slots, timedelta(hours=3), now)
    assert expected is not None
    window = state(hass, "sensor:cheapest_window")
    assert dt_util.parse_datetime(window.state) == expected.start
    assert window.attributes["end"] == expected.end.isoformat()
    active = state(hass, "binary_sensor:cheapest_window_active").state
    assert active == ("on" if expected.start <= datetime(2026, 9, 15, 10, 7, tzinfo=UTC) else "off")


async def test_state_follows_the_clock_without_polling(
    hass: HomeAssistant, setup_integration: MockConfigEntry, mock_api: AiohttpClientMocker, freezer: FrozenDateTimeFactory
) -> None:
    calls = mock_api.call_count
    freezer.move_to("2026-09-15T10:15:00+00:00")
    async_fire_time_changed(hass)
    await hass.async_block_till_done()
    assert float(state(hass, "sensor:exchange_price").state) == 4.34
    assert mock_api.call_count == calls


async def test_price_lists_are_not_recorded(hass: HomeAssistant, setup_integration: MockConfigEntry) -> None:
    entity = hass.data["sensor"].get_entity(entity_id(hass, "sensor:exchange_price"))
    assert "data" in entity._Entity__combined_unrecorded_attributes
