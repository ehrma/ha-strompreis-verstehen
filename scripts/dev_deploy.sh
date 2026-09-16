#!/usr/bin/env bash
# Copy the integration to a Home Assistant instance over SSH, check the configuration and restart Core.
# Needs .env.local with HA_URL, HA_TOKEN and HA_SSH (e.g. root@192.168.178.144), and the Terminal & SSH add-on.
set -euo pipefail
cd "$(dirname "$0")/.."
set -a
. ./.env.local
set +a
HA_SSH="${HA_SSH:-root@$(echo "$HA_URL" | sed -E 's#^https?://([^:/]+).*#\1#')}"
DOMAIN=strompreis_verstehen

echo "copying to $HA_SSH:/config/custom_components/$DOMAIN"
tar -C custom_components --exclude=__pycache__ -czf - "$DOMAIN" |
  ssh -o BatchMode=yes "$HA_SSH" "rm -rf /config/custom_components/$DOMAIN && tar -C /config/custom_components -xzf -"

if [[ "${1:-}" == "--no-restart" ]]; then
  exit 0
fi

echo "checking configuration"
ssh -o BatchMode=yes "$HA_SSH" "ha core check"

echo "restarting Home Assistant Core"
ssh -o BatchMode=yes "$HA_SSH" "ha core restart" >/dev/null
for _ in $(seq 1 90); do
  sleep 2
  if [[ "$(curl -s -m 3 -o /dev/null -w '%{http_code}' -H "Authorization: Bearer $HA_TOKEN" "$HA_URL/api/")" == "200" ]]; then
    state=$(curl -s -m 3 -H "Authorization: Bearer $HA_TOKEN" "$HA_URL/api/config" | sed -E 's/.*"state":"([A-Z_]+)".*/\1/')
    if [[ "$state" == "RUNNING" ]]; then
      echo "Home Assistant is running"
      exit 0
    fi
  fi
done
echo "Home Assistant did not come back within 3 minutes" >&2
exit 1
