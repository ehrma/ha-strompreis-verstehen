"""Base entity for Strompreis verstehen."""

from __future__ import annotations

from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.entity import EntityDescription
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import ATTRIBUTION, DOMAIN, NAME, SITE_URL
from .coordinator import StrompreisCoordinator


class StrompreisEntity(CoordinatorEntity[StrompreisCoordinator]):
    """All entities belong to one service device."""

    _attr_has_entity_name = True
    _attr_attribution = ATTRIBUTION

    def __init__(self, coordinator: StrompreisCoordinator, description: EntityDescription) -> None:
        super().__init__(coordinator)
        self.entity_description = description
        entry_id = coordinator.config_entry.entry_id
        self._attr_unique_id = f"{entry_id}_{description.key}"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry_id)},
            entry_type=DeviceEntryType.SERVICE,
            name=NAME,
            manufacturer=NAME,
            model="Börsenstrompreis Deutschland",
            configuration_url=SITE_URL,
        )
