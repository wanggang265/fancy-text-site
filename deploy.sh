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
DESIGN_ZIP="${FRONTEND_DIR}/design-handoff-v4.zip"
DOMAIN="https://removepdfpages.net"

cd "${FRONTEND_DIR}"

# --- Gate 0: commit SHA ---
COMMIT_SHA="$(git rev-parse --short HEAD)"
echo "🔍 Gate 0: commit SHA: ${COMMIT_SHA}"

if [[ "$CHECK_ONLY" != true ]]; then
  if [[ -n "$(git status --short)" ]]; then
    echo "❌ Working tree is not clean. Commit or stash changes before deploying."
    git status --short
    exit 1
  fi
  echo "✅ Working tree clean."
fi

# Fallback to cache if not present in repo
if [[ ! -f "${DESIGN_ZIP}" ]]; then
  DESIGN_ZIP="/home/ubuntu/.hermes/profiles/wangduoyu/cache/documents/doc_709b53ace910_design-handoff-v4.zip"
fi

if [[ ! -f "${DESIGN_ZIP}" ]]; then
  echo "❌ design handoff ZIP not found. Expected at ${FRONTEND_DIR}/design-handoff-v4.zip or the cache path."
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
    # find route-mapping.json inside the extracted tree
    mapping_path = None
    for root, dirs, files in os.walk(tmp):
        if 'route-mapping.json' in files:
            mapping_path = os.path.join(root, 'route-mapping.json')
            break
    if not mapping_path:
        print("❌ route-mapping.json not found in design ZIP")
        sys.exit(1)
    with open(mapping_path) as f:
        data = json.load(f)

    if isinstance(data, dict) and 'screens' in data:
        screens = data['screens']
    elif isinstance(data, list):
        screens = data
    else:
        print("❌ route-mapping.json has unexpected structure")
        sys.exit(1)

    expected_routes = {s['route'] for s in screens}

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
            title = next((s['title'] for s in screens if s['route'] == r), '')
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
  echo "✅ Design handoff gate passed. Commit SHA: ${COMMIT_SHA}. Check-only mode: skipping build and deploy."
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

echo "🌐 Gate N: verifying live URLs..."
LIVE_URLS=(
  "${DOMAIN}/"
  "${DOMAIN}/remove-pages"
  "${DOMAIN}/merge"
  "${DOMAIN}/compress"
  "${DOMAIN}/sign"
  "${DOMAIN}/convert-to-word"
  "${DOMAIN}/pricing"
  "${DOMAIN}/checkout"
  "${DOMAIN}/success"
  "${DOMAIN}/faq"
  "${DOMAIN}/contact"
  "${DOMAIN}/privacy"
  "${DOMAIN}/terms"
  "${DOMAIN}/refund"
  "${DOMAIN}/cookie-policy"
  "${DOMAIN}/blog"
  "${DOMAIN}/blog/foxit-alternative"
  "${DOMAIN}/blog/replace-image-in-pdf"
  "${DOMAIN}/blog/one-time-payment-pdf-editor"
  "${DOMAIN}/blog/no-subscription-pdf-editor"
)
VERIFY_FAILED=false
for url in "${LIVE_URLS[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "${url}" || true)
  if [[ "$status" == "200" ]]; then
    echo "   ✅ ${url} → ${status}"
  else
    echo "   ❌ ${url} → ${status}"
    VERIFY_FAILED=true
  fi
done

if [[ "$VERIFY_FAILED" == true ]]; then
  echo "❌ Live URL verification failed. Deploy may be incomplete or CDN cache stale."
  exit 1
fi

echo "✅ Deployed successfully. Commit SHA: ${COMMIT_SHA}"
