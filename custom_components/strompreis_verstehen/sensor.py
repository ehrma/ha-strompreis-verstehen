"""Sensors: prices, levels, the cheapest window and the explanation of the current hour."""

from __future__ import annotations

from collections.abc import Callable, Mapping
from dataclasses import dataclass
from datetime import datetime, timedelta
from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorEntityDescription,
    SensorStateClass,
)
from homeassistant.const import CURRENCY_EURO, PERCENTAGE, EntityCategory, UnitOfEnergy
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback
from homeassistant.helpers.typing import StateType
from homeassistant.util import dt as dt_util

from .const import BERLIN, PRICE_LEVELS, PRICE_SETTERS, QUARTER
from .coordinator import StrompreisConfigEntry, StrompreisCoordinator
from .entity import StrompreisEntity
from .model import price_attribute, price_level, text_to_ct

PARALLEL_UPDATES = 0

CT_PER_KWH = f"ct/{UnitOfEnergy.KILO_WATT_HOUR}"
EUR_PER_KWH = f"{CURRENCY_EURO}/{UnitOfEnergy.KILO_WATT_HOUR}"
MAX_STATE = 255

type ValueFn = Callable[[StrompreisCoordinator, datetime], StateType | datetime]
type AttrsFn = Callable[[StrompreisCoordinator, datetime], Mapping[str, Any] | None]


@dataclass(frozen=True, kw_only=True)
class StrompreisSensorDescription(SensorEntityDescription):
    value_fn: ValueFn
    attrs_fn: AttrsFn | None = None


def _ct(eur_mwh: float) -> float:
    return round(eur_mwh / 10, 2)


def _short(text: str | None) -> str | None:
    if text is None:
        return None
    return text if len(text) <= MAX_STATE else text[: MAX_STATE - 1] + "…"


def _exchange_now(c: StrompreisCoordinator, now: datetime) -> float | None:
    slot = c.data.slot_at(now)
    return _ct(slot.eur_mwh) if slot else None


def _exchange_attrs(c: StrompreisCoordinator, now: datetime) -> dict[str, Any]:
    slot = c.data.slot_at(now)
    today = now.astimezone(BERLIN).date()
    return {
        "level": price_level(slot.eur_mwh) if slot else None,
        "eur_mwh": slot.eur_mwh if slot else None,
        "start": slot.start.isoformat() if slot else None,
        "end": slot.end.isoformat() if slot else None,
        "data": price_attribute(
            c.data.day_slots(today) + c.data.day_slots(today + timedelta(days=1)), lambda s: s.eur_mwh / 1000
        ),
    }


def _my_price_now(c: StrompreisCoordinator, now: datetime) -> float | None:
    slot = c.data.slot_at(now)
    return round(c.my_price_ct(slot) / 100, 5) if slot else None


def _my_price_attrs(c: StrompreisCoordinator, now: datetime) -> dict[str, Any]:
    today = now.astimezone(BERLIN).date()
    slots = c.data.day_slots(today) + c.data.day_slots(today + timedelta(days=1))
    return {
        "tariff_configured": c.tariff.own,
        "data": price_attribute(slots, lambda s: c.my_price_ct(s) / 100),
    }


def _next_quarter(c: StrompreisCoordinator, now: datetime) -> float | None:
    slot = c.data.slot_at(now + QUARTER)
    return _ct(slot.eur_mwh) if slot else None


def _level(c: StrompreisCoordinator, now: datetime) -> str | None:
    slot = c.data.slot_at(now)
    return price_level(slot.eur_mwh) if slot else None


def _day_offset(days: int) -> Callable[[datetime], Any]:
    return lambda now: now.astimezone(BERLIN).date() + timedelta(days=days)


def _average(days: int) -> ValueFn:
    def value(c: StrompreisCoordinator, now: datetime) -> float | None:
        stats = c.data.day_stats(_day_offset(days)(now))
        return _ct(stats.average) if stats else None

    return value


def _extreme(which: str) -> tuple[ValueFn, AttrsFn]:
    def slot(c: StrompreisCoordinator, now: datetime):
        stats = c.data.day_stats(now.astimezone(BERLIN).date())
        return getattr(stats, which) if stats else None

    def value(c: StrompreisCoordinator, now: datetime) -> float | None:
        s = slot(c, now)
        return _ct(s.eur_mwh) if s else None

    def attrs(c: StrompreisCoordinator, now: datetime) -> dict[str, Any] | None:
        s = slot(c, now)
        return {"start": s.start.isoformat(), "end": s.end.isoformat()} if s else None

    return value, attrs


def _window_start(c: StrompreisCoordinator, now: datetime) -> datetime | None:
    w = c.best_window(now)
    return w.start if w else None


def _window_attrs(c: StrompreisCoordinator, now: datetime) -> dict[str, Any] | None:
    w = c.best_window(now)
    if w is None:
        return None
    return {"end": w.end.isoformat(), "average_ct_kwh": _ct(w.average_eur_mwh), "duration_hours": 3}


def _phase(c: StrompreisCoordinator, now: datetime) -> str | None:
    p = c.data.phase_at(now)
    return p["name"] if p else None


def _phase_attrs(c: StrompreisCoordinator, now: datetime) -> dict[str, Any] | None:
    p = c.data.phase_at(now)
    if p is None:
        return None
    return {
        "text": text_to_ct(p["text"]),
        "from_hour": p["fromHour"],
        "to_hour": p["toHour"],
        "shape": p["shape"],
        "relative_level": p["level"],
        "min_ct_kwh": _ct(p["minEurMwh"]),
        "max_ct_kwh": _ct(p["maxEurMwh"]),
        "average_ct_kwh": _ct(p["avgEurMwh"]),
        "forecast": p["forecast"],
    }


def _explanation(c: StrompreisCoordinator, now: datetime) -> str | None:
    h = c.data.hour_at(now)
    return _short(h["headline"]) if h else None


def _explanation_attrs(c: StrompreisCoordinator, now: datetime) -> dict[str, Any] | None:
    h = c.data.hour_at(now)
    if h is None:
        return None
    return {
        "text": text_to_ct(h["text"]),
        "price_setter": h["priceSetter"],
        "based_on_actuals": h["basedOnActuals"],
        "drivers": [
            {"label": d["label"], "direction": d["direction"], "detail": text_to_ct(d.get("detail"))}
            for d in h["facts"]["drivers"]
        ],
    }


def _verdict(c: StrompreisCoordinator, now: datetime) -> str | None:
    day = c.data.day_of(now)
    return _short(day["verdict"]["headline"]) if day and day["verdict"] else None


def _verdict_attrs(c: StrompreisCoordinator, now: datetime) -> dict[str, Any] | None:
    day = c.data.day_of(now)
    if not day or not day["verdict"]:
        return None
    v = day["verdict"]
    return {"detail": text_to_ct(v["detail"]), "flat": v["flat"], "compared_to_usual": v["vsUsual"]}


def _price_setter(c: StrompreisCoordinator, now: datetime) -> str | None:
    h = c.data.hour_at(now)
    return h["priceSetter"] if h else None


def _renewable_share(c: StrompreisCoordinator, now: datetime) -> float | None:
    h = c.data.hour_at(now)
    share = h["facts"]["renewableShare"] if h else None
    return round(share * 100, 1) if share is not None else None


_min_value, _min_attrs = _extreme("minimum")
_max_value, _max_attrs = _extreme("maximum")

SENSORS: tuple[StrompreisSensorDescription, ...] = (
    StrompreisSensorDescription(
        key="exchange_price",
        translation_key="exchange_price",
        native_unit_of_measurement=CT_PER_KWH,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_exchange_now,
        attrs_fn=_exchange_attrs,
    ),
    StrompreisSensorDescription(
        key="my_price",
        translation_key="my_price",
        # €/kWh: the Energy dashboard books whatever stands before "/kWh" in the main currency
        native_unit_of_measurement=EUR_PER_KWH,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=3,
        value_fn=_my_price_now,
        attrs_fn=_my_price_attrs,
    ),
    StrompreisSensorDescription(
        key="next_exchange_price",
        translation_key="next_exchange_price",
        native_unit_of_measurement=CT_PER_KWH,
        suggested_display_precision=1,
        value_fn=_next_quarter,
    ),
    StrompreisSensorDescription(
        key="price_level",
        translation_key="price_level",
        device_class=SensorDeviceClass.ENUM,
        options=[key for key, _ in PRICE_LEVELS],
        value_fn=_level,
    ),
    StrompreisSensorDescription(
        key="today_average",
        translation_key="today_average",
        native_unit_of_measurement=CT_PER_KWH,
        suggested_display_precision=1,
        value_fn=_average(0),
    ),
    StrompreisSensorDescription(
        key="today_min",
        translation_key="today_min",
        native_unit_of_measurement=CT_PER_KWH,
        suggested_display_precision=1,
        value_fn=_min_value,
        attrs_fn=_min_attrs,
    ),
    StrompreisSensorDescription(
        key="today_max",
        translation_key="today_max",
        native_unit_of_measurement=CT_PER_KWH,
        suggested_display_precision=1,
        value_fn=_max_value,
        attrs_fn=_max_attrs,
    ),
    StrompreisSensorDescription(
        key="tomorrow_average",
        translation_key="tomorrow_average",
        native_unit_of_measurement=CT_PER_KWH,
        suggested_display_precision=1,
        value_fn=_average(1),
    ),
    StrompreisSensorDescription(
        key="cheapest_window",
        translation_key="cheapest_window",
        device_class=SensorDeviceClass.TIMESTAMP,
        value_fn=_window_start,
        attrs_fn=_window_attrs,
    ),
    StrompreisSensorDescription(
        key="phase",
        translation_key="phase",
        value_fn=_phase,
        attrs_fn=_phase_attrs,
    ),
    StrompreisSensorDescription(
        key="explanation",
        translation_key="explanation",
        value_fn=_explanation,
        attrs_fn=_explanation_attrs,
    ),
    StrompreisSensorDescription(
        key="day_verdict",
        translation_key="day_verdict",
        value_fn=_verdict,
        attrs_fn=_verdict_attrs,
    ),
    StrompreisSensorDescription(
        key="price_setter",
        translation_key="price_setter",
        device_class=SensorDeviceClass.ENUM,
        options=PRICE_SETTERS,
        value_fn=_price_setter,
    ),
    StrompreisSensorDescription(
        key="renewable_share",
        translation_key="renewable_share",
        native_unit_of_measurement=PERCENTAGE,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_renewable_share,
    ),
    StrompreisSensorDescription(
        key="data_updated",
        translation_key="data_updated",
        device_class=SensorDeviceClass.TIMESTAMP,
        entity_category=EntityCategory.DIAGNOSTIC,
        value_fn=lambda c, _now: c.data.updated_at,
    ),
)


async def async_setup_entry(
    hass: HomeAssistant, entry: StrompreisConfigEntry, async_add_entities: AddConfigEntryEntitiesCallback
) -> None:
    coordinator = entry.runtime_data
    async_add_entities(StrompreisSensor(coordinator, description) for description in SENSORS)


class StrompreisSensor(StrompreisEntity, SensorEntity):
    entity_description: StrompreisSensorDescription
    # the quarter-hour price lists are for cards; the database does not need a copy every 15 minutes
    _unrecorded_attributes = frozenset({"data"})

    @property
    def native_value(self) -> StateType | datetime:
        return self.entity_description.value_fn(self.coordinator, dt_util.utcnow())

    @property
    def extra_state_attributes(self) -> Mapping[str, Any] | None:
        if self.entity_description.attrs_fn is None:
            return None
        return self.entity_description.attrs_fn(self.coordinator, dt_util.utcnow())
