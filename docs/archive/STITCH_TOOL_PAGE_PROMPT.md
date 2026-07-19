# PDF Page Remover — Stitch Prompt for Tool Page

Use this prompt to generate the core operation page for the PDF Page Remover product.

```text
Please generate a high-fidelity tool page for PDF Page Remover, a single-function PDF utility that only removes pages.

Project context:
- Product: PDF Page Remover
- Core flow: Upload PDF → Select pages to delete → Download result
- Audience: office workers, students, freelancers, and light document-processing users
- Design style: clean, trust-first, lightweight, practical
- Do not turn this into an all-in-one PDF platform or a marketing-heavy SaaS page

Primary goal:
- Make the page feel like a real document-processing workspace
- Keep the main action path linear and obvious
- Make page selection the center of the experience
- Keep compliance, limits, and anonymous usage visible without overpowering the main flow

Page structure:
1. Header / brand strip
   - Small utility brand at the top
   - Keep it light and compact
   - Avoid a big nav

2. Main upload state
   - Large upload dropzone
   - Clear instructions
   - PDF only
   - One dominant action: Upload PDF
   - Show the supported file limits inline in a subtle way

3. Uploading / scanning state
   - Progress indicator or skeleton
   - File name, size, and page count area
   - Copy such as: “Uploading file…” or “Scanning PDF…”

4. Preview / page selection state
   - Show PDF page thumbnails in a compact grid
   - Each thumbnail should have:
     - page number
     - selected / unselected state
     - delete badge or mark when selected
     - clear hover / focus states
   - Show a summary line above the thumbnails:
     - “3 pages selected for deletion”
   - Make the delete action obvious but not aggressive

5. Action area
   - Primary CTA: Delete selected pages
   - Secondary CTA: Clear selection or Review limits
   - The main CTA should remain the most visually prominent action

6. Processing state
   - Loader and concise status text
   - “Removing selected pages…”
   - Keep the animation subtle and utility-like

7. Success state
   - A ready-to-download result card
   - Primary CTA: Download result
   - Secondary CTA: Remove more pages

8. Error / warning states
   - Over limit: file too large or too many pages
   - Unsupported: password-protected or encrypted PDF not supported
   - Invalid file: wrong format or unreadable file
   - Credit insufficient: neutral explanation, no plan/upgrade language
   - Keep messages practical and short

9. Trust and limits block
   - Free: up to 20MB and 200 pages
   - Max: up to 100MB and 500 pages
   - Free for small files; Credits may be required for heavier jobs
   - Anonymous use available
   - Session tracking may use anon_id
   - Do not overstate privacy or local processing

10. Compliance block
   - Privacy
   - Terms
   - Cookie
   - Analytics off by default
   - Cookie consent visible and lightweight
   - Keep this area readable but not dominant

11. FAQ link
   - Obvious link to /faq
   - It should feel like a support/help link, not a marketing CTA

Visual direction:
- Light background, dark text
- Soft borders, subtle shadows, restrained radius
- One stable accent color for CTA and processing states
- Document-utility feel with low noise
- No emoji icons
- No decorative 3D illustrations
- No generic SaaS dashboard look

Layout notes:
- The hero / top area should feel like a tool screen, not a landing page hero
- Keep a simple left-to-right structure on desktop
- On mobile, keep the primary CTA above the fold
- The upload area and page thumbnails must adapt cleanly to narrow viewports
- Compliance should stay visible but not block the workflow

States to show clearly:
- upload before
- uploading
- scanning
- preview ready
- page selected
- processing
- success / download
- over-limit
- encrypted unsupported
- credit insufficient
- cookie consent

Final requirement:
- The result should feel like a trustworthy, focused PDF page-removal utility
- Do not add unsupported features like merge, split, compress, OCR, sign, convert, or editing tools
- Keep the main path singular and obvious
```

## Optional refinement prompt
If the first result is too marketing-heavy or too generic, use this follow-up:

```text
Make the page feel more like a focused document-processing workspace and less like a marketing landing page.

Reduce the size and visual weight of the hero area.
Make the page thumbnails and delete-selection interaction more central.
Make the compliance and limits blocks quieter and more compact.
Keep only one primary CTA visible at a time.
```

## Practical review checklist
Use this to review the generated screen:
- Does the page feel like a single-function tool?
- Is page selection visually central?
- Is the main CTA unique and obvious?
- Are file limits visible but not noisy?
- Are anonymous use and TTL shown without overclaiming?
- Does the page avoid all-in-one PDF platform vibes?
- Do error and credit states feel practical and neutral?
- Does the mobile layout keep the main action above the fold?
