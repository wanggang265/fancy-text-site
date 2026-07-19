# Precision PDF — Front-End Handoff

This note captures the *current* homepage and workspace implementation target.
It is intentionally narrow: keep the product as a single-function PDF page remover.

## What is in scope
- Homepage at `/`
- Workspace at `/workspace`
- Shared header/footer/navigation
- Privacy and terms pages staying in the same visual system
- Delivery pack at `/docs/precision-pdf-delivery-pack`

## Product boundary
Only this workflow:
**Upload PDF → select pages to remove → delete selected pages → download result**

Do *not* expand into a PDF suite.
No merge, split, compress, OCR, sign, annotate, or convert features.

## Homepage: final shape
### Goal
Make it obvious in one glance that this is a single-purpose PDF page remover.

### Core content blocks
1. Hero
2. Workspace preview
3. 3-step workflow
4. Limits / FAQ
5. Final CTA

### Homepage copy direction
- Title: `Remove PDF pages without friction`
- Subtitle: `Upload a PDF, select the pages you want removed, and download the cleaned file.`
- Primary CTA: `Upload PDF`
- Secondary CTA: `See workspace`

### Supporting copy rules
- Keep copy short and direct
- Avoid marketing fluff
- Avoid broad claims about anonymity or processing guarantees
- Keep privacy and usage details visible but lightweight

### Visual rules
- White / slate background
- Blue accent only for primary actions and selected state
- Rounded cards with subtle borders and soft shadow
- Card-based layout, generous spacing, calm hierarchy

### Homepage preview card
Keep the preview card focused on:
- filename
- file size
- page count
- selected vs kept pages
- ready / processing badge

## Workspace: final shape
### Goal
Make the editing state feel like the same product as the homepage.

### Core content blocks
1. Hero
2. Primary upload/load actions
3. Trust / clarity cards
4. File + page grid editor
5. Workflow state panel
6. Selection summary
7. Export result panel
8. Design pack link

### Workspace behaviors
- Clicking a page toggles selected / unselected state
- `Select all`, `Clear selection`, `Invert selection` stay visible
- `Delete selected pages` is the primary action
- Button disables while processing
- Success state swaps in download-ready copy
- `Start over` resets to demo state

### Workspace copy direction
- Hero title: `Remove PDF pages without friction`
- Hero subtitle: `Upload a PDF, inspect the page map, choose the pages you want removed, and export the cleaned file.`
- Keep the UI language aligned with the homepage
- Use `Workflow state`, `Selection summary`, and `Export result` as section labels

## Consistency rules
- Homepage and workspace should feel like one design system
- Keep the same border radius and shadow language
- Keep the same blue accent
- Do not introduce a second style vocabulary
- Do not reintroduce legacy generator copy anywhere

## Acceptance check
- A new user understands the product in under 5 seconds
- The next action is always clear
- Build passes
- The product still reads as a single-function PDF page remover
