#!/usr/bin/env bash
set -euo pipefail

# Design-handoff-gated deployment for fancy-text-site / removepdfpages
# Usage: ./deploy.sh [--check-only]
# Steps: design handoff diff -> build frontend -> deploy (if not --check-only)

CHECK_ONLY=false
if [[ "${1:-}" == "--check-only" ]]; then
  CHECK_ONLY=true
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="${SCRIPT_DIR}"
WORKERS_DIR="${WORKERS_DIR:-/home/ubuntu/precision-pdf-pages-clone}"
DESIGN_ZIP="${FRONTEND_DIR}/design-handoff-removepdfpages.zip"

# Fallback to cache if not present in repo
if [[ ! -f "${DESIGN_ZIP}" ]]; then
  DESIGN_ZIP="/home/ubuntu/.hermes/profiles/wangduoyu/cache/documents/doc_709b53ace910_design-handoff-removepdfpages.zip"
fi

if [[ ! -f "${DESIGN_ZIP}" ]]; then
  echo "❌ design handoff ZIP not found. Expected at ${FRONTEND_DIR}/design-handoff-removepdfpages.zip or the cache path."
  exit 1
fi

echo "🔍 Running design handoff diff gate..."
echo "   Design ZIP: ${DESIGN_ZIP}"

python3 - "$DESIGN_ZIP" "$FRONTEND_DIR" <<'PY'
import json, os, sys, zipfile, tempfile

zip_path = sys.argv[1]
frontend_dir = sys.argv[2]
app_dir = os.path.join(frontend_dir, 'app')

with tempfile.TemporaryDirectory() as tmp:
    with zipfile.ZipFile(zip_path, 'r') as z:
        z.extractall(tmp)
    mapping_path = os.path.join(tmp, 'route-mapping.json')
    with open(mapping_path) as f:
        data = json.load(f)

    expected_routes = {s['route'] for s in data['screens']}

    # Collect current routes from app/ directory (Next.js app router)
    actual_routes = set()
    for root, dirs, files in os.walk(app_dir):
        if 'page.tsx' in files:
            rel = os.path.relpath(root, app_dir)
            if rel == '.':
                route = '/'
            else:
                route = '/' + rel.replace('\\', '/')
            actual_routes.add(route)

    missing = sorted(expected_routes - actual_routes)
    extra = sorted(actual_routes - expected_routes)

    print('\n## Design handoff diff result')
    print(f'Expected routes: {len(expected_routes)}')
    print(f'Actual routes:   {len(actual_routes)}')
    print()

    if missing:
        print('❌ Missing routes (design has them, code does not):')
        for r in missing:
            title = next((s['title'] for s in data['screens'] if s['route'] == r), '')
            print(f'   {r}  — {title}')
        print()

    if extra:
        print('❌ Extra routes (code has them, design does not):')
        for r in extra:
            print(f'   {r}')
        print()

    if not missing and not extra:
        print('✅ All routes match design handoff.')
        sys.exit(0)
    else:
        print('❌ Gate FAILED. Fix deviations before deploying.')
        sys.exit(1)
PY

if [[ "$CHECK_ONLY" == true ]]; then
  echo "✅ Design handoff gate passed. Check-only mode: skipping build and deploy."
  exit 0
fi

echo "🔧 Building frontend..."
cd "${FRONTEND_DIR}"
npm run build

echo "🚀 Deploying..."
cd "${WORKERS_DIR}"
if [[ -f /home/ubuntu/.cloudflare/load-cf-token.sh ]]; then
  source /home/ubuntu/.cloudflare/load-cf-token.sh
fi
npx wrangler deploy

echo "✅ Deployed successfully."
