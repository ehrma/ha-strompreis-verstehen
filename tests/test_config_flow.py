"""Setup and the tariff options."""

from __future__ import annotations

from homeassistant.config_entries import SOURCE_USER
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import MockConfigEntry
from pytest_homeassistant_custom_component.test_util.aiohttp import AiohttpClientMocker

from custom_components.strompreis_verstehen.const import DOMAIN

from .conftest import HOME_URL, entity_id


async def test_user_flow_creates_entry(hass: HomeAssistant, mock_api: AiohttpClientMocker) -> None:
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": SOURCE_USER})
    assert result["type"] is FlowResultType.FORM
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"development": {}})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "Strompreis verstehen"
    # the public server is the default and not stored
    assert result["data"] == {}


async def test_user_flow_cannot_connect(hass: HomeAssistant, aioclient_mock: AiohttpClientMocker) -> None:
    aioclient_mock.get(HOME_URL, status=502)
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": SOURCE_USER})
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"development": {}})
    assert result["type"] is FlowResultType.FORM
    assert result["errors"] == {"base": "cannot_connect"}


async def test_only_one_entry(hass: HomeAssistant, config_entry: MockConfigEntry) -> None:
    config_entry.add_to_hass(hass)
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": SOURCE_USER})
    assert result["type"] is FlowResultType.ABORT
    assert result["reason"] == "single_instance_allowed"


async def test_options_store_the_tariff(hass: HomeAssistant, setup_integration: MockConfigEntry) -> None:
    entry = setup_integration
    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] is FlowResultType.FORM

    result = await hass.config_entries.options.async_configure(
        result["flow_id"],
        {"kind": "dynamic", "base_ct": 18.0, "vat": 19, "time_windows": {"window_1_ct": 10.0, "window_1_from": 0}},
    )
    assert result["type"] is FlowResultType.FORM
    assert result["errors"] == {"base": "window_incomplete"}

    result = await hass.config_entries.options.async_configure(
        result["flow_id"],
        {
            "kind": "dynamic",
            "base_ct": 18.0,
            "vat": 19,
            "time_windows": {"window_1_from": 22, "window_1_to": 6, "window_1_ct": 10.0},
        },
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()
    assert entry.options == {
        "kind": "dynamic",
        "base_ct": 18.0,
        "vat": 19.0,
        "windows": [{"from_hour": 22, "to_hour": 6, "ct": 10.0}],
    }
    # the reload applied the tariff: 12:07 Berlin is outside the window, 60.7 €/MWh -> 7.22 ct gross + 18 ct
    state = hass.states.get(entity_id(hass, "sensor:my_price"))
    assert state is not None
    assert float(state.state) == round((60.7 / 10 * 1.19 + 18.0) / 100, 5)
    assert state.attributes["tariff_configured"] is True
