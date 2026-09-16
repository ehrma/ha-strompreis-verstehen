"""Serves the bundled Lovelace cards and loads them into every dashboard."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant
from homeassistant.loader import async_get_integration

from .const import DOMAIN

CARDS_FILE = "strompreis-cards.js"
URL_BASE = f"/{DOMAIN}"


async def async_register_cards(hass: HomeAssistant) -> None:
    """Once per Home Assistant start (async_setup), never per config entry: a path cannot be registered twice."""
    directory = Path(__file__).parent / "frontend"
    if not (directory / CARDS_FILE).is_file():
        return
    await hass.http.async_register_static_paths([StaticPathConfig(URL_BASE, str(directory), cache_headers=True)])
    # the version in the URL makes browsers fetch the new file after an update despite the cache headers
    version = (await async_get_integration(hass, DOMAIN)).version
    add_extra_js_url(hass, f"{URL_BASE}/{CARDS_FILE}?v={version}")
