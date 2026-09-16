"""Keeps one copy of /api/v1/home and tells the entities when the quarter hour changes."""

from __future__ import annotations

from datetime import datetime, time, timedelta
import logging

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.event import async_track_utc_time_change
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
from homeassistant.util import dt as dt_util

from .api import ApiError, ApiRateLimited, StrompreisApi
from .const import (
    BERLIN,
    DOMAIN,
    UPDATE_INTERVAL,
    UPDATE_INTERVAL_WAITING_EXPLANATIONS,
    UPDATE_INTERVAL_WAITING_TOMORROW,
)
from .model import HomeData, PriceWindow, Slot, Tariff, cheapest_window, floor_quarter

_LOGGER = logging.getLogger(__package__)

type StrompreisConfigEntry = ConfigEntry[StrompreisCoordinator]

BEST_WINDOW = timedelta(hours=3)


def poll_interval(data: HomeData, now: datetime) -> timedelta:
    """Poll faster while something is due: tomorrow's prices after the auction, today's explanations in the evening."""
    local = now.astimezone(BERLIN)
    if data.tomorrow is None and time(12, 40) <= local.time() < time(20, 0):
        return UPDATE_INTERVAL_WAITING_TOMORROW
    explained = len(data.today["hours"])
    if explained < 12 and time(17, 30) <= local.time() < time(22, 0):
        return UPDATE_INTERVAL_WAITING_EXPLANATIONS
    return UPDATE_INTERVAL


class StrompreisCoordinator(DataUpdateCoordinator[HomeData]):
    """Fetches the prices every few minutes; entities work out the current quarter from the stored data."""

    config_entry: StrompreisConfigEntry

    def __init__(self, hass: HomeAssistant, entry: StrompreisConfigEntry, api: StrompreisApi) -> None:
        super().__init__(
            hass,
            _LOGGER,
            config_entry=entry,
            name=DOMAIN,
            update_interval=UPDATE_INTERVAL,
            always_update=False,
        )
        self.api = api
        self.tariff = Tariff.from_options(entry.options)
        self._window: PriceWindow | None = None

    async def _async_setup(self) -> None:
        # the state changes every quarter hour even when the data does not
        self.config_entry.async_on_unload(
            async_track_utc_time_change(self.hass, self._quarter_tick, minute=[0, 15, 30, 45], second=0)
        )

    async def _async_update_data(self) -> HomeData:
        try:
            raw = await self.api.home()
        except ApiRateLimited as err:
            raise UpdateFailed(
                retry_after=err.retry_after or 300, translation_domain=DOMAIN, translation_key="rate_limited"
            ) from err
        except ApiError as err:
            raise UpdateFailed(
                translation_domain=DOMAIN, translation_key="api_error", translation_placeholders={"error": str(err)}
            ) from err
        data = HomeData.parse(raw)
        self.update_interval = poll_interval(data, dt_util.utcnow())
        return data

    @callback
    def _quarter_tick(self, now: datetime) -> None:
        if self.data is not None and now.astimezone(BERLIN).date() != self.data.date:
            # a new Berlin day: yesterday, today and tomorrow move on
            self.hass.async_create_task(self.async_request_refresh())
        self.async_update_listeners()

    # -----------------------------------------------------------------------------------------------------------------

    def my_price_ct(self, slot: Slot) -> float:
        return self.tariff.end_price_ct(slot.eur_mwh, slot.start)

    def best_window(self, now: datetime) -> PriceWindow | None:
        """The cheapest three hours that have not ended yet. A running window stays until it ends, so automations
        do not see it jump away while it is active; after that the search starts again from the current quarter."""
        if self.data is None:
            return None
        # new data (e.g. tomorrow's prices) does not move a window that is already running either
        if self._window is None or not self._window.contains(now):
            self._window = cheapest_window(self.data.slots, BEST_WINDOW, floor_quarter(now))
        return self._window
