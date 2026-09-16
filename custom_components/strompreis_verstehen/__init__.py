"""Strompreis verstehen: German day-ahead electricity prices, explained hour by hour."""

from __future__ import annotations

from homeassistant.const import Platform
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.aiohttp_client import SERVER_SOFTWARE, async_get_clientsession
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.typing import ConfigType
from homeassistant.loader import async_get_integration

from .api import StrompreisApi
from .const import CONF_API_URL, DEFAULT_API_URL, DOMAIN
from .coordinator import StrompreisConfigEntry, StrompreisCoordinator
from .frontend import async_register_cards
from .services import async_setup_services
from .websocket import SIGNAL_UPDATED, async_setup_websocket

PLATFORMS: list[Platform] = [Platform.SENSOR, Platform.BINARY_SENSOR]

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    async_setup_services(hass)
    async_setup_websocket(hass)
    await async_register_cards(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: StrompreisConfigEntry) -> bool:
    integration = await async_get_integration(hass, DOMAIN)
    api = StrompreisApi(
        async_get_clientsession(hass),
        entry.data.get(CONF_API_URL, DEFAULT_API_URL),
        # the site counts integration traffic separately; nothing here identifies the installation
        f"StrompreisVerstehen-HA/{integration.version} {SERVER_SOFTWARE}",
    )
    coordinator = StrompreisCoordinator(hass, entry, api)
    await coordinator.async_config_entry_first_refresh()
    entry.runtime_data = coordinator

    @callback
    def notify_cards() -> None:
        async_dispatcher_send(hass, SIGNAL_UPDATED)

    entry.async_on_unload(coordinator.async_add_listener(notify_cards))
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    notify_cards()
    return True


async def async_unload_entry(hass: HomeAssistant, entry: StrompreisConfigEntry) -> bool:
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
