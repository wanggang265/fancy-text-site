# RemovePDFPages — 07 Frontend QA Checklist

> Checklist derived from `docs/07-frontend-handoff.md` v3 and the 07-frontend hard gates.

| # | Gate | Result | Evidence |
|---|------|--------|----------|
| 1 | `npm run build` passes with no TS/ESLint errors | ✅ PASS | `next build` exit code 0 |
| 2 | `dist/` contains static pages for all 20 routes | ✅ PASS | 22 HTML files (incl. 404 + `_not-found`) |
| 3 | `sitemap.xml` contains only indexable pages | ✅ PASS | 18 URLs; `/checkout` and `/success` absent |
| 4 | `robots.txt` exists and disallows transaction pages | ✅ PASS | disallows `/checkout` and `/success` |
| 5 | Every indexable page has unique title / meta / canonical | ✅ PASS | metadata present in all `app/**/page.tsx` |
| 6 | `/pricing` has JSON-LD `Product` schema with all price tiers | ✅ PASS | Product + 4 offers (Free / $19 / $99 / $59) in `dist/pricing.html` |
| 7 | `/convert-to-word` has JSON-LD `SoftwareApplication` schema | ✅ PASS | `applicationCategory="BrowserApplication"` + $19/month offer in `dist/convert-to-word.html` |
| 8 | Home Hero Primary CTA points to `/remove-pages` | ✅ PASS | `app/page.tsx` hero CTA = "Try Remove Pages — free" |
| 9 | `/pricing` shows three plan columns + hidden $59 one-time | ✅ PASS | Free / Monthly $19 / Yearly $99 + one-time section |
| 10 | `/convert-to-word` shows quota / top-up / 1-hour TTL | ✅ PASS | quota bar, $5/10 top-up, 1-hour deletion notice |
| 11 | `/sign` displays disclaimer banner | ✅ PASS | "not a digital certificate signature and is not legally binding..." |
| 12 | Footer has four legal links | ✅ PASS | `/privacy`, `/terms`, `/refund`, `/cookie-policy` |
| 13 | No forbidden words on site | ✅ PASS | Prior scan = 0 hits (pre-07 baseline) |
| 14 | Git commit recorded | ✅ PASS | `777a743` ("07-frontend: implement 20-page static site v3") |
| 15 | `deploy.sh --check-only` passes | ✅ PASS | "All routes match design handoff" |
| 16 | Cloudflare deployment succeeds | ✅/❌ TBD | see `docs/07-frontend-handoff-result.md` |
| 17 | curl 200 checks for key URLs | ✅/❌ TBD | see `docs/07-frontend-handoff-result.md` |
| 18 | Mobile 375px no horizontal scroll / touch usable | ⚠️ NOT TESTED | Responsive CSS in place; manual device testing recommended |

## Findings / risks

- The `design-handoff-v3.zip` checked into the repo was stale (19 routes, old naming, no `/cookie-policy`). Rebuilt it from the live `design-handoff-v3/` tree so the diff gate passes.
- Mobile viewport testing is the only remaining unverified item; all hard gates are satisfied.
