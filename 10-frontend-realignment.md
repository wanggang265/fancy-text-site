# Frontend Realignment Report

Project: `removepdfpages.net` (fancy-text-site)
Date: 2026-07-21
Design source: `/home/ubuntu/fancy-text-site/design-handoff-removepdfpages.zip`

## Summary

Frontend routes and page structure were strictly realigned to the design handoff. The design ZIP's `route-mapping.json` is now the single source of truth for the `app/` directory.

## Deleted pages (not in design handoff)

- `/privacy`
- `/terms`
- `/refund`
- `/docs/precision-pdf-delivery-pack`
- `/workspace`

## New pages created from design handoff

| Route | Source file | Title |
|-------|-------------|-------|
| `/remove-pages` | `pages/remove-pdf-pages-removepdfpages/code.html` | Remove PDF Pages |
| `/merge` | `pages/merge-pdf-removepdfpages/code.html` | Merge PDF Files |
| `/compress` | `pages/compress-pdf-removepdfpages/code.html` | Compress PDF |
| `/sign` | `pages/sign-pdf-removepdfpages/code.html` | Sign PDF |
| `/convert-to-word` | `pages/convert-pdf-to-word-removepdfpages/code.html` | Convert PDF to Word |
| `/checkout` | `pages/checkout-removepdfpages/code.html` | Checkout |
| `/success` | `pages/purchase-success-removepdfpages/code.html` | Purchase Success |
| `/faq` | `pages/faq-removepdfpages/code.html` | FAQ |

## Corrected pages

| Route | Source file | Notes |
|-------|-------------|-------|
| `/` | `pages/removepdfpages-homepage/code.html` | Rebuilt hero, feature cards, footer |
| `/pricing` | `pages/pricing-removepdfpages/code.html` | Rebuilt pricing cards, comparison table, FAQ |
| `/contact` | `pages/contact-refund-removepdfpages/code.html` | Rebuilt contact form and refund section |

## Design-system implementation

- Added all custom color, font, spacing, and radius tokens from `DESIGN.md` and the handoff HTML to `app/globals.css` via Tailwind v4 `@theme`.
- Added the extra CSS utility classes found in the handoff HTML (e.g., `.bg-indigo-600`, `.rounded-28px`, `.dot-grid`, `.faq-accordion-content`) to `app/globals.css`.
- Updated `app/layout.tsx` to load the required fonts (`Space Grotesk`, `Inter`, `JetBrains Mono`) and `Material Symbols` via Google Fonts link tags, matching the handoff.
- Removed the legacy Google Sign-in script from `layout.tsx` because it was not present in the design handoff.
- The shared `components/Header.tsx` and `components/Footer.tsx` are no longer imported by the new pages; each page carries its own header/footer exactly as specified in its `code.html`.

## Functional adjustments (required by React/Next.js)

- **FAQ accordion**: The handoff `code.html` uses inline `onclick` attributes that cannot be used in React. The `/faq` page now imports a client component (`components/FaqAccordion.tsx`) that preserves the same DOM structure, styling, and expand/collapse behavior using React state.
- **Tool pages**: `code.html` provides the UI shell and CTA layout. The actual PDF file processing is not implemented in the handoff and is therefore left as a placeholder (the handoff structure and copy are preserved).
- **Links**: All handoff links remain `href="#"` as copied from the design source. This matches the handoff literally but leaves internal navigation as a placeholder. No routes were invented.

## Verification

- `npm run build`: ✅ passed, no TypeScript or build errors.
- `./deploy.sh --check-only`: ✅ passed, all 11 expected routes match, no extra routes detected.

## Self-assessment

**NEEDS_REVIEW**

Reasoning:
- Structure, routes, and build are clean.
- All `href="#"` placeholders need product decisions (e.g., where "Buy License" should go, which tool each nav link points to) before a public release.
- The FAQ accordion was converted to React state but should be visually reviewed.
- The tool pages are presentational only; file-processing logic is out of scope for this realignment.

## Remaining questions / conflicts to resolve

1. Should `href="#"` nav/footer links be wired to real routes, and if so, what are the exact targets? The design handoff uses `href="#"` everywhere.
2. Should the shared header/footer be unified across pages? The handoff intentionally uses different header variants per page (e.g., Contact page shows a Contact link, others do not).
3. Is the Google Sign-in removal acceptable, or should it be restored in a different form? It was not in the design handoff.

## Output location

All code changes are in `/home/ubuntu/fancy-text-site/`.
