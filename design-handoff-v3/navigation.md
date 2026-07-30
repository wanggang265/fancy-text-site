# Navigation & Footer Spec

## Header (sticky, 68px desktop / 60px mobile)

- Left: logo mark + wordmark `RemovePDFPages` → `/`
- Center / Left-of-CTA (desktop):
  - `Tools` dropdown — 列表 5 个工具：
    - Remove Pages → `/remove-pages`
    - Merge PDFs → `/merge`
    - Compress PDF → `/compress`
    - Sign PDF → `/sign`
    - Convert to Word → `/convert-to-word` (with `Full Editor` badge)
  - Pricing → `/pricing`
  - FAQ → `/faq`
  - Blog → `/blog`
- Right:
  - Secondary text link: `Sign in` (placeholder only, no account system in MVP; hidden until needed)
  - Primary CTA button: `Get Full Editor — $19/month Launch Special` → `/pricing`
- Mobile (≤768px): hamburger opens right drawer (300px), groups:
  - Free tools
  - Full Editor tools
  - Support (Pricing, FAQ, Contact, Blog)
  - Legal (Privacy, Terms, Refund, Cookie)
  - Bottom CTA same as desktop

## Footer

- Background: `--rpp-brand-indigo-900`
- 4-column desktop, 2-column tablet, 1-column mobile
- Column 1: Brand
  - Logo wordmark `RemovePDFPages`
  - Tagline: `Free PDF tools in your browser. Subscribe or buy once.`
- Column 2: Legal
  - Privacy Policy → `/privacy`
  - Terms of Service → `/terms`
  - Refund Policy → `/refund`
  - Cookie Policy → `/cookie-policy`
- Column 3: Tools
  - Remove Pages → `/remove-pages`
  - Merge PDFs → `/merge`
  - Compress PDF → `/compress`
  - Sign PDF → `/sign`
  - Convert to Word → `/convert-to-word`
- Column 4: Support
  - Pricing → `/pricing`
  - FAQ → `/faq`
  - Contact → `/contact`
  - Blog → `/blog`
- Bottom row:
  - Left: `© 2026 RemovePDFPages. All rights reserved.`
  - Right: `RemovePDFPages is a standalone tool and is not affiliated with Adobe, Foxit, or any other PDF software company.`

## Active Link State

- Current page nav link: color `--rpp-brand-indigo-600`, underline 2px.
- Footer current page link: color white, opacity 1.

## Accessibility

- Focus ring: 2px `--rpp-brand-indigo-500` with 2px offset.
- Drawer: `aria-modal="true"`, focus trap, close on Esc.
- Skip-to-content link hidden until focused.
