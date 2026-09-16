"""The price rules without Home Assistant around them."""

from __future__ import annotations

from datetime import date, datetime, timedelta, timezone

from custom_components.strompreis_verstehen.const import BERLIN, DEFAULT_BASE_CT, KIND_TOU
from custom_components.strompreis_verstehen.model import (
    HomeData,
    Slot,
    Tariff,
    TariffWindow,
    ceil_quarter,
    cheapest_window,
    floor_quarter,
    fmt_de,
    price_level,
    text_to_ct,
)

from .conftest import load_home

UTC = timezone.utc


def test_price_levels_match_the_website() -> None:
    assert price_level(-0.1) == "negativ"
    assert price_level(0) == "sehr_guenstig"
    assert price_level(79.9) == "sehr_guenstig"
    assert price_level(80) == "guenstig"
    assert price_level(179.9) == "mittel"
    assert price_level(230) == "sehr_teuer"


def test_texts_are_rewritten_to_ct() -> None:
    assert text_to_ct("Zwischen 98 €/MWh um 13 Uhr und 1.254,5 €/MWh") == "Zwischen 9,8 ct/kWh um 13 Uhr und 125,5 ct/kWh"
    assert text_to_ct("-3 €/MWh") == "-0,3 ct/kWh"
    assert fmt_de(-0.04, 1) == "0,0"
    assert text_to_ct(None) is None


def test_default_tariff_is_the_website_default() -> None:
    tariff = Tariff()
    assert DEFAULT_BASE_CT == 19.69
    at = datetime(2026, 9, 15, 10, 0, tzinfo=UTC)
    # 100 €/MWh = 10 ct net, 11.9 ct gross, plus the surcharge
    assert round(tariff.end_price_ct(100, at), 2) == 31.59
    assert tariff.own is False


def test_tariff_windows_span_midnight_and_the_last_one_wins() -> None:
    window = TariffWindow(22, 6, 25)
    assert window.contains(23) and window.contains(0) and window.contains(5)
    assert not window.contains(6) and not window.contains(21)
    assert not TariffWindow(4, 4, 1).contains(4)
    tou = Tariff(kind=KIND_TOU, base_ct=32, windows=(TariffWindow(22, 6, 25), TariffWindow(0, 2, 20)), own=True)
    # 01:00 Berlin (23:00 UTC in summer): both windows match, the second counts; the exchange price does not
    assert tou.end_price_ct(500, datetime(2026, 9, 14, 23, 0, tzinfo=UTC)) == 20
    assert tou.end_price_ct(500, datetime(2026, 9, 15, 10, 0, tzinfo=UTC)) == 32


def test_tariff_options_round_trip() -> None:
    options = {"kind": "dynamic", "base_ct": 18.5, "vat": 19, "windows": [{"from_hour": 0, "to_hour": 6, "ct": 12.0}]}
    tariff = Tariff.from_options(options)
    assert tariff.own and tariff.windows == (TariffWindow(0, 6, 12.0),)
    assert Tariff.from_options({}) == Tariff()


def test_home_data_finds_slots_hours_and_phases() -> None:
    data = HomeData.parse(load_home())
    assert data.date == date(2026, 9, 15)
    assert len(data.slots) == 3 * 96
    at = datetime(2026, 9, 15, 10, 7, tzinfo=UTC)
    slot = data.slot_at(at)
    assert slot is not None and slot.start == datetime(2026, 9, 15, 10, 0, tzinfo=UTC) and slot.eur_mwh == 60.7
    assert data.hour_at(at)["ts"] == "2026-09-15T10:00:00.000Z"
    assert data.phase_at(at)["name"] == "Mittagstal"
    stats = data.day_stats(date(2026, 9, 15))
    assert stats is not None
    assert (stats.minimum.eur_mwh, stats.maximum.eur_mwh) == (26.4, 312.4)
    assert data.slot_at(datetime(2026, 9, 20, tzinfo=UTC)) is None
    assert HomeData.parse(load_home()) == data


def test_cheapest_window_agrees_with_the_api() -> None:
    raw = load_home()
    data = HomeData.parse(raw)
    for day in (raw["today"], raw["tomorrow"]):
        start = datetime.fromisoformat(day["start"].replace("Z", "+00:00"))
        for expected in day["windows"]:
            found = cheapest_window(
                data.day_slots(start.astimezone(BERLIN).date()),
                timedelta(hours=expected["hours"]),
                start,
            )
            assert found is not None
            assert found.start.isoformat().replace("+00:00", ".000Z") == expected["from"]
            assert round(found.average, 1) == expected["avgEurMwh"]


def test_cheapest_window_respects_bounds_and_gaps() -> None:
    t0 = datetime(2026, 9, 15, 0, 0, tzinfo=UTC)
    q = timedelta(minutes=15)
    prices = [50, 10, 10, 50, 5, 5]
    slots = [Slot(t0 + q * i, p) for i, p in enumerate(prices)]
    assert cheapest_window(slots, timedelta(minutes=30), t0).start == t0 + q * 4
    assert cheapest_window(slots, timedelta(minutes=30), t0, latest_end=t0 + q * 4).start == t0 + q
    # a missing quarter breaks a run
    gap = [s for s in slots if s.start != t0 + q * 5]
    assert cheapest_window(gap, timedelta(minutes=30), t0).start == t0 + q
    # 20 minutes need two quarters
    assert cheapest_window(slots, timedelta(minutes=20), t0 + q * 5) is None


def test_quarter_rounding() -> None:
    at = datetime(2026, 9, 15, 10, 7, 30, tzinfo=UTC)
    assert floor_quarter(at) == datetime(2026, 9, 15, 10, 0, tzinfo=UTC)
    assert ceil_quarter(at) == datetime(2026, 9, 15, 10, 15, tzinfo=UTC)
    assert ceil_quarter(datetime(2026, 9, 15, 10, 15, tzinfo=UTC)) == datetime(2026, 9, 15, 10, 15, tzinfo=UTC)
