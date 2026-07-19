#!/usr/bin/env node
const mode = process.argv.includes('--tool') ? 'tool' : 'home';

const homePrompt = `Design a premium, conversion-focused landing page for Fancy Text Generator — a Unicode text transformer for social media bios, captions, usernames, and posts.

Goal:
- Make the product feel polished, fast, and trustworthy.
- Highlight the core action: type text, transform it, copy it instantly.
- Keep the interface simple enough for mobile users.

Audience:
- Social media users
- Creators and meme users
- Anyone who wants stylish Unicode text for Instagram, TikTok, Twitter/X, Discord

Content structure (top to bottom):
1. Sticky header
   - Left: product logo/name
   - Right: simple nav to key generators
   - Keep it lightweight and readable

2. Hero section
   - Strong headline about turning plain text into stylish Unicode text instantly
   - Short supporting paragraph about copy/paste use cases
   - Primary CTA should lead into the text transformer
   - Include a subtle visual cue that the product is about text styles, not generic AI

3. Interactive transformer section
   - Large text input
   - Style category pills
   - Grid of transformed outputs
   - Copy buttons on each result
   - Show character count and platform limit warnings
   - Make the transform interaction the star of the page

4. How it works
   - 3 simple steps: type, choose style, copy & paste

5. Popular styles
   - Feature the most useful text styles as cards or links
   - Keep emphasis on clarity and selection speed

6. FAQ
   - Address free usage, compatibility, privacy, and mobile support

7. Footer
   - Product summary
   - Tool links
   - Privacy and terms links

Visual direction:
- Premium editorial utility, not a generic SaaS template
- Clean but distinctive
- Asymmetric where helpful
- Avoid overused purple-gradient AI startup styling
- Use a controlled violet accent, but not as the only visual note
- Use high-contrast typography and generous spacing
- Use SVG/material-style icons, not emoji icons

Color direction:
- Light background
- Dark text
- Violet accent for interactive elements
- Soft neutral borders and subtle surface contrast

Typography:
- Distinctive headline face
- Highly legible body text
- Strong hierarchy for mobile scanning

Constraints:
- Preserve the product’s browser-only, no-signup positioning
- Do not remove the legal pages
- Keep the page fast and easy to scan
- Make the CTA obvious without making the page feel loud

Deliverable:
- Desktop homepage concept
- Mobile companion concept
- Clean, production-ready layout that can be handed off to frontend`;

const toolPrompt = `Design a focused generator tool page for Fancy Text Generator — a Unicode text transformer that converts input into copyable stylish text.

Goal:
- Make the transformation workflow immediate and obvious.
- Emphasize the input → results → copy loop.
- Keep the page usable on small screens.

Content structure (top to bottom):
1. Header with product name and a small link back to home
2. Tool hero with one-line explanation and a brief trust statement
3. Main transformer area
   - Text input
   - Category filter pills
   - Results grid of transformed text
   - Copy buttons
   - Platform limit notice
4. Trust strip
   - Works on iPhone / Android / Desktop
   - Fast loading
   - Browser-only privacy claim
5. Related tools or generator links
6. Footer links

Visual direction:
- Clean utility UI with a premium finish
- Strong spacing and crisp cards
- Avoid overly decorative effects that reduce readability
- Use subtle surfaces and one strong accent color

Constraints:
- Keep the transformation results very readable
- Make copy actions visually obvious
- Prioritize mobile usability and tap targets
- Keep it fast, lightweight, and production-ready`;

const prompt = mode === 'tool' ? toolPrompt : homePrompt;

console.log(prompt);
