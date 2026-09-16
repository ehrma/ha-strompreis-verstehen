"""Constants for Strompreis verstehen."""

from __future__ import annotations

from datetime import timedelta
from typing import Final
from zoneinfo import ZoneInfo

DOMAIN: Final = "strompreis_verstehen"
NAME: Final = "Strompreis verstehen"

DEFAULT_API_URL: Final = "https://strompreis-verstehen.de"
HOME_PATH: Final = "/api/v1/home"
SITE_URL: Final = "https://strompreis-verstehen.de"

CONF_API_URL: Final = "api_url"

# Tariff options, the same model as "Mein Tarif" on the website
CONF_KIND: Final = "kind"
CONF_BASE_CT: Final = "base_ct"
CONF_VAT: Final = "vat"
CONF_WINDOWS: Final = "windows"
KIND_DYNAMIC: Final = "dynamic"
KIND_TOU: Final = "tou"
MAX_WINDOWS: Final = 3

# Default surcharge of the website: net grid fee, electricity tax, levies, concession fee and supplier margin plus VAT
DEFAULT_VAT: Final = 19.0
DEFAULT_BASE_CT: Final = round((9.5 + 2.05 + 1.8 + 1.7 + 1.5) * (1 + DEFAULT_VAT / 100), 2)

BERLIN: Final = ZoneInfo("Europe/Berlin")
QUARTER: Final = timedelta(minutes=15)

# Polling: the data changes a few times a day; the ETag makes an unchanged poll a 304 without a body
UPDATE_INTERVAL: Final = timedelta(minutes=15)
# the day-ahead auction result for tomorrow is published shortly after 12:40 Berlin time
UPDATE_INTERVAL_WAITING_TOMORROW: Final = timedelta(minutes=3)
# the explanations need actual generation data, which usually arrives around 18:00
UPDATE_INTERVAL_WAITING_EXPLANATIONS: Final = timedelta(minutes=5)
# a poll that still returned the previous day (a copy from the server's cache) is repeated soon, not in 15 minutes
UPDATE_INTERVAL_NEW_DAY: Final = timedelta(minutes=1)
# The server caches responses for 30 seconds, so a poll right at midnight can still get the previous day. The refresh
# for the new day waits a random 35-95 seconds instead: past that cache, and not every installation in the same second.
DAY_CHANGE_DELAY_MIN_S: Final = 35
DAY_CHANGE_DELAY_MAX_S: Final = 95

# Price level bands in EUR/MWh, upper bound exclusive (packages/core/src/day.ts)
PRICE_LEVELS: Final[list[tuple[str, float]]] = [
    ("negativ", 0),
    ("sehr_guenstig", 80),
    ("guenstig", 130),
    ("mittel", 180),
    ("teuer", 230),
    ("sehr_teuer", float("inf")),
]

PRICE_SETTERS: Final = ["ueberschuss", "erneuerbare", "kohle", "gas", "knappheit", "unklar"]

ATTRIBUTION: Final = "Daten: Bundesnetzagentur | SMARD.de (CC BY 4.0), aufbereitet von strompreis-verstehen.de"
