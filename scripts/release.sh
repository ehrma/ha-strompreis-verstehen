#!/usr/bin/env bash
# Prepare a release: set the manifest version, rebuild the cards, commit and tag.
# Usage: scripts/release.sh 0.2.0   (then push the commit and the tag and publish the release on GitHub)
set -euo pipefail
cd "$(dirname "$0")/.."
version="${1:-}"
if [[ ! "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "usage: scripts/release.sh MAJOR.MINOR.PATCH" >&2
  exit 1
fi
if [[ -n "$(git status --porcelain)" ]]; then
  echo "working tree is not clean" >&2
  exit 1
fi
manifest=custom_components/strompreis_verstehen/manifest.json
node -e '
  const fs = require("fs");
  const [file, version] = process.argv.slice(1);
  const m = JSON.parse(fs.readFileSync(file, "utf8"));
  m.version = version;
  fs.writeFileSync(file, JSON.stringify(m, null, 2) + "\n");
' "$manifest" "$version"
scripts/build_cards.sh
git add "$manifest" custom_components/strompreis_verstehen/frontend/strompreis-cards.js
git commit -m "Release $version"
git tag "v$version"
echo "next: git push && git push origin v$version && gh release create v$version --generate-notes"
