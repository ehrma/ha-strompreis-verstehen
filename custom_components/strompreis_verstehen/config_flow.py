"""Setup without any input, and the tariff as options (the model of "Mein Preis" on the website)."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigEntry, ConfigFlow, ConfigFlowResult, OptionsFlowWithReload
from homeassistant.core import callback
from homeassistant.data_entry_flow import section
from homeassistant.helpers.aiohttp_client import SERVER_SOFTWARE, async_get_clientsession
from homeassistant.helpers.selector import (
    NumberSelector,
    NumberSelectorConfig,
    NumberSelectorMode,
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
    TextSelector,
    TextSelectorConfig,
    TextSelectorType,
)

from .api import ApiError, StrompreisApi
from .const import (
    CONF_API_URL,
    CONF_BASE_CT,
    CONF_KIND,
    CONF_VAT,
    CONF_WINDOWS,
    DEFAULT_API_URL,
    DEFAULT_BASE_CT,
    DEFAULT_VAT,
    DOMAIN,
    KIND_DYNAMIC,
    KIND_TOU,
    MAX_WINDOWS,
    NAME,
)

SECTION_WINDOWS = "time_windows"
SECTION_DEVELOPMENT = "development"

HOUR = NumberSelector(NumberSelectorConfig(min=0, max=24, step=1, mode=NumberSelectorMode.BOX, unit_of_measurement="h"))
CT = NumberSelector(
    NumberSelectorConfig(min=-100, max=200, step=0.01, mode=NumberSelectorMode.BOX, unit_of_measurement="ct/kWh")
)


def _window_keys(n: int) -> tuple[str, str, str]:
    return f"window_{n}_from", f"window_{n}_to", f"window_{n}_ct"


def tariff_schema() -> vol.Schema:
    windows: dict[Any, Any] = {}
    for n in range(1, MAX_WINDOWS + 1):
        start, end, ct = _window_keys(n)
        windows[vol.Optional(start)] = HOUR
        windows[vol.Optional(end)] = HOUR
        windows[vol.Optional(ct)] = CT
    return vol.Schema(
        {
            vol.Required(CONF_KIND, default=KIND_DYNAMIC): SelectSelector(
                SelectSelectorConfig(
                    options=[KIND_DYNAMIC, KIND_TOU], mode=SelectSelectorMode.LIST, translation_key="tariff_kind"
                )
            ),
            vol.Required(CONF_BASE_CT, default=DEFAULT_BASE_CT): CT,
            vol.Required(CONF_VAT, default=DEFAULT_VAT): NumberSelector(
                NumberSelectorConfig(min=0, max=100, step=0.1, mode=NumberSelectorMode.BOX, unit_of_measurement="%")
            ),
            vol.Required(SECTION_WINDOWS): section(vol.Schema(windows), {"collapsed": True}),
        }
    )


def options_from_input(user_input: dict[str, Any]) -> tuple[dict[str, Any], dict[str, str]]:
    """Flatten the form into stored options; a window counts once it has a price."""
    errors: dict[str, str] = {}
    windows: list[dict[str, Any]] = []
    section_input = user_input.get(SECTION_WINDOWS, {})
    for n in range(1, MAX_WINDOWS + 1):
        start, end, ct = _window_keys(n)
        if section_input.get(ct) is None:
            continue
        if section_input.get(start) is None or section_input.get(end) is None:
            errors["base"] = "window_incomplete"
            continue
        if int(section_input[start]) % 24 == int(section_input[end]) % 24:
            errors["base"] = "window_empty"
            continue
        windows.append({"from_hour": int(section_input[start]), "to_hour": int(section_input[end]), "ct": float(section_input[ct])})
    options = {
        CONF_KIND: user_input[CONF_KIND],
        CONF_BASE_CT: float(user_input[CONF_BASE_CT]),
        CONF_VAT: float(user_input[CONF_VAT]),
        CONF_WINDOWS: windows,
    }
    return options, errors


def input_from_options(options: dict[str, Any]) -> dict[str, Any]:
    windows: dict[str, Any] = {}
    for n, window in enumerate(options.get(CONF_WINDOWS, []), start=1):
        start, end, ct = _window_keys(n)
        windows.update({start: window["from_hour"], end: window["to_hour"], ct: window["ct"]})
    return {
        CONF_KIND: options.get(CONF_KIND, KIND_DYNAMIC),
        CONF_BASE_CT: options.get(CONF_BASE_CT, DEFAULT_BASE_CT),
        CONF_VAT: options.get(CONF_VAT, DEFAULT_VAT),
        SECTION_WINDOWS: windows,
    }


class StrompreisConfigFlow(ConfigFlow, domain=DOMAIN):
    """One click: the prices are public and the same for everyone in Germany."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        errors: dict[str, str] = {}
        if user_input is not None:
            url = (user_input.get(SECTION_DEVELOPMENT, {}).get(CONF_API_URL) or DEFAULT_API_URL).rstrip("/")
            api = StrompreisApi(async_get_clientsession(self.hass), url, f"StrompreisVerstehen-HA/setup {SERVER_SOFTWARE}")
            try:
                await api.home()
            except ApiError:
                errors["base"] = "cannot_connect"
            else:
                data = {CONF_API_URL: url} if url != DEFAULT_API_URL else {}
                return self.async_create_entry(title=NAME, data=data)
        # another server only for development, e.g. a local copy of the API; folded away for everyone else
        schema = vol.Schema(
            {
                vol.Required(SECTION_DEVELOPMENT): section(
                    vol.Schema(
                        {vol.Optional(CONF_API_URL, default=DEFAULT_API_URL): TextSelector(TextSelectorConfig(type=TextSelectorType.URL))}
                    ),
                    {"collapsed": True},
                )
            }
        )
        return self.async_show_form(step_id="user", data_schema=schema, errors=errors)

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> StrompreisOptionsFlow:
        return StrompreisOptionsFlow()


class StrompreisOptionsFlow(OptionsFlowWithReload):
    """The tariff; saving it reloads the entry so every price follows at once."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        errors: dict[str, str] = {}
        if user_input is not None:
            options, errors = options_from_input(user_input)
            if not errors:
                return self.async_create_entry(data=options)
        suggested = user_input if user_input is not None else input_from_options(dict(self.config_entry.options))
        return self.async_show_form(
            step_id="init",
            data_schema=self.add_suggested_values_to_schema(tariff_schema(), suggested),
            errors=errors,
        )
