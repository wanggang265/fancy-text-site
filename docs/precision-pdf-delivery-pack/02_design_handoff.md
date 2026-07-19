# Precision PDF — Design Handoff

## Product goal
Build a single-function PDF page remover homepage that makes the flow obvious in one glance:
Upload PDF → select pages to remove → delete selected pages → download result

## Components
- `TopNav`
- `HeroSection`
- `FilePreviewCard`
- `PageThumbnailGrid`
- `SelectionSummary`
- `PrimaryActionBar`
- `LimitInfoCards`
- `PrivacyStrip`
- `FAQAccordion`
- `ResultCard`
- `StatusBanner`

## Key states
- Empty
- Uploading
- Scanning
- Preview ready
- Page selection
- Delete-selected
- Processing
- Success / download ready
- Over-limit
- Unsupported / encrypted PDF
- Credit insufficient
- Cookie consent

## Layout order
1. Minimal top bar
2. Hero with CTA
3. Utility preview card
4. Value props
5. How it works
6. Limits / usage
7. Anonymous use
8. Compliance strip
9. FAQ
10. Final CTA

## Visual direction
- Clean, light, professional
- Blue accent only for primary actions and status
- Card-based layout with subtle borders and rounded corners
- Tool-first, not marketing-first
