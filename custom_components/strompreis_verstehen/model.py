"""The /api/v1/home response as Python objects, and the price logic of the website.

Nothing in here touches Home Assistant, so the rules can be tested on their own.
"""

from __future__ import annotations

from bisect import bisect_right
from collections.abc import Callable, Mapping
from dataclasses import dataclass, field
from datetime import date, datetime, timedelta
import math
import re
from typing import Any

from .const import (
    BERLIN,
    CONF_BASE_CT,
    CONF_KIND,
    CONF_VAT,
    CONF_WINDOWS,
    DEFAULT_BASE_CT,
    DEFAULT_VAT,
    KIND_DYNAMIC,
    PRICE_LEVELS,
    QUARTER,
)


def parse_ts(value: str) -> datetime:
    """An ISO instant from the API ("2026-09-16T12:00:00.000Z")."""
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def fmt_de(value: float, decimals: int = 1) -> str:
    """German number format: 1.234,5; never "-0,0"."""
    rounded = round(value, decimals)
    if rounded == 0:
        rounded = 0.0
    text = f"{abs(rounded):,.{decimals}f}".replace(",", "\x00").replace(".", ",").replace("\x00", ".")
    return f"-{text}" if rounded < 0 else text


_EUR_MWH_IN_TEXT = re.compile(r"(-?\d{1,3}(?:\.\d{3})*(?:,\d+)?) €/MWh")


def text_to_ct(text: str | None) -> str | None:
    """Rewrite every "1.234 €/MWh" in a generated sentence to ct/kWh, like the website does."""
    if text is None:
        return None
    return _EUR_MWH_IN_TEXT.sub(
        lambda m: f"{fmt_de(float(m.group(1).replace('.', '').replace(',', '.')) / 10, 1)} ct/kWh", text
    )


def price_level(eur_mwh: float) -> str:
    """The fixed price band of an exchange price (the same colours as on the website)."""
    for key, up_to in PRICE_LEVELS:
        if eur_mwh < up_to:
            return key
    return PRICE_LEVELS[-1][0]


# ---------------------------------------------------------------------------------------------------------------------
# tariff
# ---------------------------------------------------------------------------------------------------------------------


@dataclass(frozen=True, slots=True)
class TariffWindow:
    """A time window with its own price, e.g. a §14a module 3 window or the off-peak hours of an HT/NT tariff."""

    from_hour: int
    to_hour: int
    ct: float

    def contains(self, hour: int) -> bool:
        start, end = self.from_hour % 24, self.to_hour % 24
        if start == end:
            return False
        return start <= hour < end if start < end else hour >= start or hour < end


@dataclass(frozen=True, slots=True)
class Tariff:
    """The customer's contract. Prices in gross ct/kWh; the monthly base fee is not part of the hourly price."""

    kind: str = KIND_DYNAMIC
    base_ct: float = DEFAULT_BASE_CT
    vat: float = DEFAULT_VAT
    windows: tuple[TariffWindow, ...] = ()
    own: bool = False

    @classmethod
    def from_options(cls, options: Mapping[str, Any]) -> Tariff:
        if CONF_BASE_CT not in options:
            return cls()
        windows = tuple(
            TariffWindow(int(w["from_hour"]), int(w["to_hour"]), float(w["ct"])) for w in options.get(CONF_WINDOWS, [])
        )
        return cls(
            kind=options.get(CONF_KIND, KIND_DYNAMIC),
            base_ct=float(options[CONF_BASE_CT]),
            vat=float(options.get(CONF_VAT, DEFAULT_VAT)),
            windows=windows,
            own=True,
        )

    def contract_ct(self, hour: int) -> float:
        """The surcharge (dynamic) or the energy price (HT/NT) at a Berlin hour; the last matching window wins."""
        price = self.base_ct
        for window in self.windows:
            if window.contains(hour):
                price = window.ct
        return price

    def end_price_ct(self, eur_mwh: float, at: datetime) -> float:
        hour = at.astimezone(BERLIN).hour
        exchange = eur_mwh / 10 * (1 + self.vat / 100) if self.kind == KIND_DYNAMIC else 0.0
        return exchange + self.contract_ct(hour)

    def as_dict(self) -> dict[str, Any]:
        return {
            "kind": self.kind,
            "base_ct": self.base_ct,
            "vat": self.vat,
            "windows": [{"from_hour": w.from_hour, "to_hour": w.to_hour, "ct": w.ct} for w in self.windows],
            "own": self.own,
        }


# ---------------------------------------------------------------------------------------------------------------------
# prices
# ---------------------------------------------------------------------------------------------------------------------


@dataclass(frozen=True, slots=True)
class Slot:
    """One quarter hour with a price."""

    start: datetime
    eur_mwh: float

    @property
    def end(self) -> datetime:
        return self.start + QUARTER


@dataclass(frozen=True, slots=True)
class PriceWindow:
    """A block of consecutive quarter hours and its mean price."""

    start: datetime
    end: datetime
    average: float
    """mean in the unit of the price function that found it"""
    average_eur_mwh: float

    def contains(self, at: datetime) -> bool:
        return self.start <= at < self.end


def cheapest_window(
    slots: list[Slot],
    duration: timedelta,
    earliest_start: datetime,
    latest_end: datetime | None = None,
    price: Callable[[Slot], float] = lambda s: s.eur_mwh,
) -> PriceWindow | None:
    """The cheapest run of consecutive priced quarters of `duration`, starting on a quarter at or after
    `earliest_start` and ending by `latest_end`. Ties go to the earlier window."""
    length = max(1, math.ceil(duration / QUARTER))
    best: tuple[float, int] | None = None
    for i in range(len(slots) - length + 1):
        first, last = slots[i], slots[i + length - 1]
        if first.start < earliest_start:
            continue
        if latest_end is not None and last.end > latest_end:
            break
        if last.start - first.start != QUARTER * (length - 1):
            continue
        mean = sum(price(s) for s in slots[i : i + length]) / length
        if best is None or mean < best[0] - 1e-9:
            best = (mean, i)
    if best is None:
        return None
    mean, i = best
    run = slots[i : i + length]
    return PriceWindow(
        start=run[0].start,
        end=run[-1].end,
        average=mean,
        average_eur_mwh=sum(s.eur_mwh for s in run) / length,
    )


def ceil_quarter(at: datetime) -> datetime:
    floored = floor_quarter(at)
    return floored if floored == at else floored + QUARTER


def floor_quarter(at: datetime) -> datetime:
    return at.replace(minute=at.minute - at.minute % 15, second=0, microsecond=0)


@dataclass(slots=True)
class DayStats:
    average: float
    minimum: Slot
    maximum: Slot


@dataclass(slots=True)
class HomeData:
    """One /api/v1/home response."""

    raw: dict[str, Any]
    slots: list[Slot] = field(default_factory=list)
    _starts: list[datetime] = field(default_factory=list)
    _hours: dict[datetime, dict[str, Any]] = field(default_factory=dict)

    @classmethod
    def parse(cls, raw: dict[str, Any]) -> HomeData:
        data = cls(raw=raw)
        for day in data.days:
            start = parse_ts(day["start"])
            for i, value in enumerate(day["price"]):
                if value is not None:
                    data.slots.append(Slot(start + QUARTER * i, float(value)))
            for hour in day["hours"]:
                data._hours[parse_ts(hour["ts"])] = hour
        data.slots.sort(key=lambda s: s.start)
        data._starts = [s.start for s in data.slots]
        return data

    def __eq__(self, other: object) -> bool:
        # the coordinator skips entity updates when a poll returns the same data
        return isinstance(other, HomeData) and other.raw == self.raw

    @property
    def date(self) -> date:
        return date.fromisoformat(self.raw["date"])

    @property
    def days(self) -> list[dict[str, Any]]:
        return [d for d in (self.raw["yesterday"], self.raw["today"], self.raw["tomorrow"]) if d is not None]

    @property
    def today(self) -> dict[str, Any]:
        return self.raw["today"]

    @property
    def tomorrow(self) -> dict[str, Any] | None:
        return self.raw["tomorrow"]

    @property
    def updated_at(self) -> datetime | None:
        value = self.raw["meta"].get("dataUpdatedAt")
        return parse_ts(value) if value else None

    def day(self, on: date) -> dict[str, Any] | None:
        return next((d for d in self.days if d["date"] == on.isoformat()), None)

    def day_of(self, at: datetime) -> dict[str, Any] | None:
        return self.day(at.astimezone(BERLIN).date())

    def slot_at(self, at: datetime) -> Slot | None:
        i = bisect_right(self._starts, at) - 1
        if i >= 0 and self.slots[i].start <= at < self.slots[i].end:
            return self.slots[i]
        return None

    def slots_between(self, start: datetime, end: datetime) -> list[Slot]:
        return [s for s in self.slots if start <= s.start < end]

    def day_slots(self, on: date) -> list[Slot]:
        return [s for s in self.slots if s.start.astimezone(BERLIN).date() == on]

    def day_stats(self, on: date) -> DayStats | None:
        slots = self.day_slots(on)
        if not slots:
            return None
        return DayStats(
            average=sum(s.eur_mwh for s in slots) / len(slots),
            # the first of equal extremes, like the website
            minimum=min(slots, key=lambda s: s.eur_mwh),
            maximum=max(slots, key=lambda s: s.eur_mwh),
        )

    def hour_at(self, at: datetime) -> dict[str, Any] | None:
        """The explanation of the hour `at` falls in (Berlin offsets are whole hours, so the UTC hour floor)."""
        return self._hours.get(at.replace(minute=0, second=0, microsecond=0))

    def phase_at(self, at: datetime) -> dict[str, Any] | None:
        day = self.day_of(at)
        if day is None:
            return None
        return next((p for p in day["phases"] if parse_ts(p["from"]) <= at < parse_ts(p["to"])), None)


def price_attribute(slots: list[Slot], price: Callable[[Slot], float]) -> list[dict[str, Any]]:
    """Quarter prices in the format of the EPEX Spot integration (€/kWh), which popular price cards read."""
    return [
        {"start_time": s.start.isoformat(), "end_time": s.end.isoformat(), "price_per_kwh": round(price(s), 5)}
        for s in slots
    ]
