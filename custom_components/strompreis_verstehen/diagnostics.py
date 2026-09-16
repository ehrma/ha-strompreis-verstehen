"""Diagnostics: public market data only, nothing to redact but the data size."""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant

from .coordinator import StrompreisConfigEntry


async def async_get_config_entry_diagnostics(hass: HomeAssistant, entry: StrompreisConfigEntry) -> dict[str, Any]:
    coordinator = entry.runtime_data
    data = coordinator.data
    return {
        "entry": {"data": dict(entry.data), "options": dict(entry.options)},
        "tariff": coordinator.tariff.as_dict(),
        "last_update_success": coordinator.last_update_success,
        "update_interval_seconds": coordinator.update_interval.total_seconds() if coordinator.update_interval else None,
        "data": None
        if data is None
        else {
            "date": data.raw["date"],
            "data_updated_at": data.raw["meta"].get("dataUpdatedAt"),
            "slots": len(data.slots),
            "first_slot": data.slots[0].start.isoformat() if data.slots else None,
            "last_slot": data.slots[-1].start.isoformat() if data.slots else None,
            "tomorrow_available": data.tomorrow is not None,
            "explained_hours_today": len(data.today["hours"]),
            "week_days": [d["date"] for d in data.raw["week"]],
        },
    }
