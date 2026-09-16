"""Client for the public API of strompreis-verstehen.de."""

from __future__ import annotations

import asyncio
from http import HTTPStatus
from typing import Any

from aiohttp import ClientError, ClientSession, ClientTimeout

from .const import HOME_PATH

TIMEOUT = ClientTimeout(total=30)


class ApiError(Exception):
    """The API could not be reached or answered with an error."""


class ApiRateLimited(ApiError):
    """HTTP 429; retry_after in seconds when the server said so."""

    def __init__(self, retry_after: int | None) -> None:
        super().__init__("rate limited")
        self.retry_after = retry_after


class StrompreisApi:
    """Fetches /api/v1/home. Remembers the ETag, so an unchanged poll costs the server a 304 and no body."""

    def __init__(self, session: ClientSession, base_url: str, user_agent: str) -> None:
        self._session = session
        self._url = base_url.rstrip("/") + HOME_PATH
        self._user_agent = user_agent
        self._etag: str | None = None
        self._last: dict[str, Any] | None = None

    async def home(self) -> dict[str, Any]:
        """The current response; the previous one again when the server reports no change."""
        headers = {"User-Agent": self._user_agent, "Accept": "application/json"}
        if self._etag and self._last is not None:
            headers["If-None-Match"] = self._etag
        try:
            async with self._session.get(self._url, headers=headers, timeout=TIMEOUT) as resp:
                if resp.status == HTTPStatus.NOT_MODIFIED and self._last is not None:
                    return self._last
                if resp.status == HTTPStatus.TOO_MANY_REQUESTS:
                    retry = resp.headers.get("Retry-After")
                    raise ApiRateLimited(int(retry) if retry and retry.isdigit() else None)
                if resp.status != HTTPStatus.OK:
                    raise ApiError(f"HTTP {resp.status}")
                body = await resp.json()
                self._etag = resp.headers.get("ETag")
        except (ClientError, asyncio.TimeoutError, ValueError) as err:
            raise ApiError(str(err) or type(err).__name__) from err
        if not isinstance(body, dict) or "today" not in body:
            raise ApiError("unexpected response")
        self._last = body
        return body
