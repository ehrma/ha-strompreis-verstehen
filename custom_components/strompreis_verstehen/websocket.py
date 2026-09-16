"""WebSocket command for the bundled cards: the whole /api/v1/home response plus the tariff, pushed on change.

The cards could read entity attributes, but a day with its generation mix is far bigger than attributes should be,
and every state change would send it again. Over this subscription it is sent once and then only when it changes.
"""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from .const import DOMAIN

SIGNAL_UPDATED = f"{DOMAIN}_updated"


@callback
def async_setup_websocket(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_subscribe)


@callback
def _payload(hass: HomeAssistant) -> dict[str, Any]:
    entries = hass.config_entries.async_loaded_entries(DOMAIN)
    if not entries or entries[0].runtime_data.data is None:
        return {"home": None, "tariff": None, "last_update_success": False}
    coordinator = entries[0].runtime_data
    return {
        "home": coordinator.data.raw,
        "tariff": coordinator.tariff.as_dict(),
        "last_update_success": coordinator.last_update_success,
    }


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/subscribe"})
@callback
def ws_subscribe(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Sends the data now and again whenever the coordinator has new data, a new tariff or lost the API.

    Follows the signal rather than one coordinator, so the subscription survives the reload after an options change.
    """
    last: dict[str, Any] = {}

    @callback
    def send() -> None:
        payload = _payload(hass)
        # the coordinator also notifies on every quarter-hour tick; unchanged data is not sent again
        if payload == last:
            return
        last.clear()
        last.update(payload)
        connection.send_message(websocket_api.event_message(msg["id"], payload))

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(hass, SIGNAL_UPDATED, send)
    connection.send_result(msg["id"])
    send()
