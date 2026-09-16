#!/usr/bin/env bash
# Build the Lovelace cards in the website's repository and copy the bundle into the integration.
# ENERGY_INSPECTOR_DIR points to that repository; the default is a sibling folder.
set -euo pipefail
cd "$(dirname "$0")/.."
source_dir="${ENERGY_INSPECTOR_DIR:-../Energy-Inspector}"
if [[ ! -f "$source_dir/apps/ha-cards/package.json" ]]; then
  echo "cards source not found in $source_dir (set ENERGY_INSPECTOR_DIR)" >&2
  exit 1
fi
(cd "$source_dir" && npm run build -w @strom/core && npm run build -w @strom/ha-cards)
cp "$source_dir/apps/ha-cards/dist/strompreis-cards.js" custom_components/strompreis_verstehen/frontend/strompreis-cards.js
echo "cards copied ($(wc -c < custom_components/strompreis_verstehen/frontend/strompreis-cards.js) bytes)"
