#!/usr/bin/env node
const mode = process.argv.includes('--tool') ? 'tool' : 'home';

const homePrompt = `Design a premium, conversion-focused landing page for RemovePDFPages — a browser-based PDF toolkit with free tools (Remove Pages, Merge, Compress, Sign) and a one-time Full Editor license that adds PDF to Word conversion.

Goal:
- Make the product feel polished, fast, and trustworthy.
- Highlight the core action: pick a free PDF tool, upload, and download.
- Keep the interface simple enough for mobile users.

Audience:
- Office workers and students who need quick PDF edits
- People who want to avoid subscription PDF software
- Users who occasionally need to convert PDF to Word

Content structure (top to bottom):
1. Sticky header
   - Left: product logo/name "RemovePDFPages"
   - Right: simple nav to Tools, Pricing, FAQ, Contact
   - CTA: "Get Full Editor — $19 Launch Special" → /checkout
   - Keep it lightweight and readable

2. Hero section
   - H1: "Free PDF Tools. Full Editor for One Price."
   - Short supporting paragraph about Remove Pages, Merge, Compress, Sign in the browser; upgrade once for Convert to Word.
   - Primary CTA: "Try Free Tools" → /remove-pages
   - Secondary CTA: "Get Full Editor — $19 Launch Special" → /checkout
   - Trust strip: "No signup required", "No watermark on free tools", "Files stay in your browser by default", "One-time payment, no subscription"

3. Tools grid
   - 5 tool cards: Remove Pages, Merge PDFs, Compress PDF, Sign PDF, Convert to Word
   - Each card shows title, short description, and "Currently free" or "Full Editor" badge
   - Convert to Word card is marked "Full Editor" and links to /pricing

4. How it works
   - 3 simple steps: Upload your file, make your changes, download the result

5. Bottom upgrade section
   - H2: "Get the Full Editor for $19"
   - Body: "One purchase. All current features. Use on up to 5 personal devices. 14-day refund policy."
   - CTA: "Get Full Editor — $19 Launch Special"
   - Show "$29" only as a strikethrough original price anchor next to "$19 Launch Special"

6. Footer
   - Product summary: "Free PDF tools in your browser. One-time Full Editor license. No subscription."
   - Legal links: Privacy Policy (/privacy), Terms of Service (/terms), Refund Policy (/refund)
   - Tool links and Support links
   - Copyright note: not affiliated with Adobe/Foxit

Visual direction:
- Premium editorial utility, not a generic SaaS template
- Clean but distinctive
- Avoid overused purple-gradient AI startup styling
- Indigo + olive accent; light background; dark text
- Use high-contrast typography and generous spacing
- Use Material Symbols icons, not emoji

Constraints:
- Preserve browser-only, no-signup positioning for free tools
- Keep the page fast and easy to scan
- Make the CTA obvious without making the page feel loud
- Do not use "unlimited", "free forever", "perfect", "guaranteed", "AI-powered", "official"

Deliverable:
- Desktop homepage concept
- Mobile companion concept
- Clean, production-ready layout that can be handed off to frontend`;

const toolPrompt = `Design a focused PDF tool page for RemovePDFPages — a browser-based utility page where users upload a PDF and perform a single action (remove pages, merge, compress, sign, or convert to Word).

Goal:
- Make the upload → action → download workflow immediate and obvious.
- Keep the page usable on small screens.
- Include an upgrade prompt for the Full Editor where appropriate.

Content structure (top to bottom):
1. Header with product name "RemovePDFPages" and a small link back to home
2. Tool hero with H1 matching the tool name and a brief trust statement
3. Main workspace area
   - Upload dropzone / button
   - Tool-specific controls (page thumbnails for remove-pages, file list for merge, compression slider for compress, signature canvas for sign, format options for convert-to-word)
   - Download button
4. Step-by-step instructions (3 steps)
5. Feature/benefit bullets
6. Compliance notice (required):
   - Remove/Merge/Compress/Sign: "Processed in your browser by default. Files stay on your device."
   - Convert to Word: "Files are temporarily uploaded for conversion and deleted within 1 hour."
   - Sign: "This tool creates a visual signature image on the PDF. It is not a digital certificate signature and is not legally binding for regulated electronic-signing requirements."
7. Upgrade CTA for Convert to Word / Sign where appropriate: "Get Full Editor — $19 Launch Special"
8. Footer with legal links (/privacy, /terms, /refund), tool links, support links

Visual direction:
- Clean utility UI with a premium finish
- Strong spacing and crisp cards
- Avoid overly decorative effects that reduce readability
- Use subtle surfaces and one strong accent color
- Workspace-first: the upload/interaction area should dominate the page

Constraints:
- Keep interaction areas very readable
- Make upload and download actions visually obvious
- Prioritize mobile usability and tap targets
- Keep it fast, lightweight, and production-ready
- Do not use "unlimited", "free forever", "perfect", "guaranteed", "AI-powered", "official"`;

const prompt = mode === 'tool' ? toolPrompt : homePrompt;

console.log(prompt);
