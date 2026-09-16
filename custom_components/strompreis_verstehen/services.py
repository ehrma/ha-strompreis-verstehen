"""Actions: the cheapest window for a given duration, and the prices of a day."""

from __future__ import annotations

from datetime import timedelta
from typing import Any

import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall, ServiceResponse, SupportsResponse, callback
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv, service
from homeassistant.helpers.selector import ConfigEntrySelector
from homeassistant.util import dt as dt_util

from .const import BERLIN, DOMAIN
from .coordinator import StrompreisConfigEntry
from .model import ceil_quarter, cheapest_window, floor_quarter, price_level

SERVICE_FIND_CHEAPEST_WINDOW = "find_cheapest_window"
SERVICE_GET_PRICES = "get_prices"

ATTR_CONFIG_ENTRY = "config_entry"
ATTR_DURATION = "duration"
ATTR_EARLIEST_START = "earliest_start"
ATTR_LATEST_END = "latest_end"
ATTR_PRICE = "price"
ATTR_DATE = "date"

PRICE_EXCHANGE = "exchange"
PRICE_MY_PRICE = "my_price"

_ENTRY = vol.Optional(ATTR_CONFIG_ENTRY)

FIND_SCHEMA = vol.Schema(
    {
        _ENTRY: ConfigEntrySelector({"integration": DOMAIN}),
        vol.Required(ATTR_DURATION): vol.All(
            cv.positive_time_period, vol.Range(min=timedelta(minutes=15), max=timedelta(hours=24))
        ),
        vol.Optional(ATTR_EARLIEST_START): cv.datetime,
        vol.Optional(ATTR_LATEST_END): cv.datetime,
        vol.Optional(ATTR_PRICE, default=PRICE_EXCHANGE): vol.In([PRICE_EXCHANGE, PRICE_MY_PRICE]),
    }
)

PRICES_SCHEMA = vol.Schema(
    {
        _ENTRY: ConfigEntrySelector({"integration": DOMAIN}),
        vol.Optional(ATTR_DATE): cv.date,
    }
)


def _entry(hass: HomeAssistant, call: ServiceCall) -> StrompreisConfigEntry:
    if entry_id := call.data.get(ATTR_CONFIG_ENTRY):
        return service.async_get_config_entry(hass, DOMAIN, entry_id)
    entries = hass.config_entries.async_loaded_entries(DOMAIN)
    if not entries:
        raise ServiceValidationError(translation_domain=DOMAIN, translation_key="not_loaded")
    return entries[0]


def _ct(value: float) -> float:
    return round(value, 2)


@callback
def async_setup_services(hass: HomeAssistant) -> None:
    async def find_cheapest_window(call: ServiceCall) -> ServiceResponse:
        coordinator = _entry(hass, call).runtime_data
        now = dt_util.utcnow()
        earliest = call.data.get(ATTR_EARLIEST_START)
        # an explicit start is a promise not to begin earlier; without one the current quarter may still be used
        start = ceil_quarter(dt_util.as_utc(earliest)) if earliest else floor_quarter(now)
        latest = call.data.get(ATTR_LATEST_END)
        end = dt_util.as_utc(latest) if latest else None
        if end is not None and end <= start:
            raise ServiceValidationError(translation_domain=DOMAIN, translation_key="end_before_start")
        use_my_price = call.data[ATTR_PRICE] == PRICE_MY_PRICE
        window = cheapest_window(
            coordinator.data.slots,
            call.data[ATTR_DURATION],
            start,
            end,
            price=coordinator.my_price_ct if use_my_price else lambda s: s.eur_mwh / 10,
        )
        if window is None:
            return {"found": False}
        slots = coordinator.data.slots_between(window.start, window.end)
        return {
            "found": True,
            "start": window.start.isoformat(),
            "end": window.end.isoformat(),
            "duration_minutes": int((window.end - window.start).total_seconds() // 60),
            "price": call.data[ATTR_PRICE],
            "average_ct_kwh": _ct(window.average),
            "average_exchange_ct_kwh": _ct(window.average_eur_mwh / 10),
            "prices": [
                {
                    "start": s.start.isoformat(),
                    "ct_kwh": _ct(coordinator.my_price_ct(s) if use_my_price else s.eur_mwh / 10),
                }
                for s in slots
            ],
        }

    async def get_prices(call: ServiceCall) -> ServiceResponse:
        coordinator = _entry(hass, call).runtime_data
        on = call.data.get(ATTR_DATE) or dt_util.utcnow().astimezone(BERLIN).date()
        slots = coordinator.data.day_slots(on)
        if not slots:
            raise ServiceValidationError(
                translation_domain=DOMAIN,
                translation_key="no_prices_for_date",
                translation_placeholders={"date": on.isoformat()},
            )
        prices: list[dict[str, Any]] = [
            {
                "start": s.start.isoformat(),
                "end": s.end.isoformat(),
                "exchange_ct_kwh": _ct(s.eur_mwh / 10),
                "my_price_ct_kwh": _ct(coordinator.my_price_ct(s)),
                "level": price_level(s.eur_mwh),
            }
            for s in slots
        ]
        return {"date": on.isoformat(), "prices": prices}

    hass.services.async_register(
        DOMAIN, SERVICE_FIND_CHEAPEST_WINDOW, find_cheapest_window, schema=FIND_SCHEMA, supports_response=SupportsResponse.ONLY
    )
    hass.services.async_register(
        DOMAIN, SERVICE_GET_PRICES, get_prices, schema=PRICES_SCHEMA, supports_response=SupportsResponse.ONLY
    )
