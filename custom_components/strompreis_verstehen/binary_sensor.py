"""Binary sensors for automations: negative price, inside the cheapest window, tomorrow's prices published."""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
from datetime import datetime

from homeassistant.components.binary_sensor import BinarySensorEntity, BinarySensorEntityDescription
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback
from homeassistant.util import dt as dt_util

from .coordinator import StrompreisConfigEntry, StrompreisCoordinator
from .entity import StrompreisEntity

PARALLEL_UPDATES = 0


@dataclass(frozen=True, kw_only=True)
class StrompreisBinaryDescription(BinarySensorEntityDescription):
    is_on_fn: Callable[[StrompreisCoordinator, datetime], bool | None]


def _negative(c: StrompreisCoordinator, now: datetime) -> bool | None:
    slot = c.data.slot_at(now)
    return slot.eur_mwh < 0 if slot else None


def _in_window(c: StrompreisCoordinator, now: datetime) -> bool | None:
    window = c.best_window(now)
    return window.contains(now) if window else False


BINARY_SENSORS: tuple[StrompreisBinaryDescription, ...] = (
    StrompreisBinaryDescription(key="negative_price", translation_key="negative_price", is_on_fn=_negative),
    StrompreisBinaryDescription(key="cheapest_window_active", translation_key="cheapest_window_active", is_on_fn=_in_window),
    StrompreisBinaryDescription(
        key="tomorrow_available",
        translation_key="tomorrow_available",
        is_on_fn=lambda c, _now: c.data.tomorrow is not None,
    ),
)


async def async_setup_entry(
    hass: HomeAssistant, entry: StrompreisConfigEntry, async_add_entities: AddConfigEntryEntitiesCallback
) -> None:
    coordinator = entry.runtime_data
    async_add_entities(StrompreisBinarySensor(coordinator, description) for description in BINARY_SENSORS)


class StrompreisBinarySensor(StrompreisEntity, BinarySensorEntity):
    entity_description: StrompreisBinaryDescription

    @property
    def is_on(self) -> bool | None:
        return self.entity_description.is_on_fn(self.coordinator, dt_util.utcnow())
