# RemovePDFPages — Design System v2

> Matured design system based on `07-design-system.md` and `07-page-designs.md`.  
> Goal: eliminate generic AI-SaaS template feel, establish a distinctive, trustworthy, and implementable visual identity.  
> Status: Final for handoff.

---

## 1. Visual Direction

### 1.1 Problem with v1

v1 used:
- **Inter everywhere** + pill buttons + indigo-600/emerald-500.
- Centered hero + two-column split + 3-column feature grid.
- Soft shadows, rounded-2xl cards, blur blobs.

Result: visually identical to dozens of generic AI/SaaS landing pages. No brand memory.

### 1.2 Visual Direction Options

#### Direction A: "Indigo + Olive Grotesk" (Selected)

- **Primary:** Deep indigo `#3730A3` (not the common `#4F46E5`).
- **Accent:** Olive green `#65A30D` as the heavy secondary accent — unexpected for PDF software, conveys grounded reliability.
- **Display font:** Space Grotesk (geometric, slightly quirky, modern but not generic).
- **Body font:** Inter (kept for readability, but no longer used for display).
- **Shape language:** Mix of large rounded corners (24px) on tool cards and sharp 0px corners on small badges/buttons. Asymmetric tension.
- **Texture:** Subtle dot-grid background in tool sections (1px `#E2E8F0` dots, 24px grid).
- **Why selected:** Keeps the blue/indigo requirement from the original brief, but the olive accent and Space Grotesk create a distinctive, professional-yet-approachable identity that feels like a real document utility rather than a startup template.

#### Direction B: "Ink & Paper"

- **Primary:** Warm charcoal `#292524`.
- **Accent:** Terracotta `#C2410C`.
- **Background:** Cream `#FAF9F6`.
- **Display font:** Fraunces (serif, editorial, document-like).
- **Shape language:** Sharp corners, paper-like cards, thin 1px borders.
- **Why not selected:** More editorial, but less web-native and may feel heavy for a tool page. Better suited for a content brand than a utility.

#### Direction C: "Graphite Workshop"

- **Primary:** Graphite `#334155`.
- **Accent:** Electric cyan `#06B6D4`.
- **Display font:** JetBrains Mono (monospace, workshop/tool aesthetic).
- **Shape language:** Rectangular, terminal-like, utilitarian.
- **Why not selected:** Too technical and cold for a mainstream PDF consumer product. Could alienate non-technical users.

### 1.3 Final Direction: Direction A

**Key differentiators vs. generic AI SaaS:**
1. **Space Grotesk display** — not Inter.
2. **Olive accent** — not emerald or teal.
3. **Asymmetric shape language** — 24px radius on large cards, 0px on small badges and buttons.
4. **Dot-grid texture** in tool workspaces — references drafting paper.
5. **Asymmetric hero** — text left-aligned, tool preview overlapping the right edge, not a centered two-column split.
6. **No blur blobs** — replaced with solid color blocks and dot patterns.

---

## 2. Color Tokens (Exact Values)

### 2.1 Brand Palette

| Token | HEX | RGB | Usage |
|-------|-----|-----|-------|
| `--brand-indigo-900` | `#1E1B4B` | 30, 27, 75 | Footer background, dark mode surfaces |
| `--brand-indigo-800` | `#312E81` | 49, 46, 129 | Emphasis headings |
| `--brand-indigo-700` | `#4338CA` | 67, 56, 202 | CTA hover |
| `--brand-indigo-600` | `#4F46E5` | 79, 70, 229 | Primary actions, links |
| `--brand-indigo-500` | `#6366F1` | 99, 102, 241 | Secondary accents |
| `--brand-indigo-100` | `#E0E7FF` | 224, 231, 255 | Soft backgrounds |
| `--brand-indigo-50` | `#EEF2FF` | 238, 242, 255 | Subtle tints |
| `--accent-olive-700` | `#4D7C0F` | 77, 124, 15 | Dark olive for text |
| `--accent-olive-600` | `#65A30D` | 101, 163, 13 | **Primary accent**: free badges, success states, hero highlights |
| `--accent-olive-500` | `#84CC16` | 132, 204, 22 | Lighter olive highlights |
| `--accent-olive-100` | `#ECFCCB` | 236, 252, 203 | Free badge background |
| `--accent-olive-50` | `#F7FEE7` | 247, 254, 231 | Subtle olive tint |
| `--accent-amber-500` | `#F59E0B` | 245, 158, 11 | Warning / trial hints |
| `--accent-amber-100` | `#FEF3C7` | 254, 243, 199 | Warning backgrounds |

### 2.2 Neutral Palette

| Token | HEX | Usage |
|-------|-----|-------|
| `--ink-900` | `#0F172A` | Primary headings, body text |
| `--ink-700` | `#334155` | Secondary text |
| `--ink-600` | `#475569` | Descriptions |
| `--ink-500` | `#64748B` | Meta text, captions |
| `--ink-400` | `#94A3B8` | Placeholders, disabled |
| `--ink-300` | `#CBD5E1` | Strong borders |
| `--ink-200` | `#E2E8F0` | Default borders, dividers, dot-grid |
| `--ink-100` | `#F1F5F9` | Subtle backgrounds |
| `--ink-50` | `#F8FAFC` | Page section backgrounds |
| `--paper` | `#FFFFFF` | Cards, surfaces |
| `--cream` | `#FDFCF8` | Alternate warm background (limited use) |

### 2.3 Semantic Palette

| Token | HEX | Usage |
|-------|-----|-------|
| `--success` | `--accent-olive-600` | Free badges, success states |
| `--success-bg` | `--accent-olive-100` | Free badge background |
| `--success-text` | `--accent-olive-700` | Free badge text |
| `--paid` | `--brand-indigo-600` | Paid badges, locked features |
| `--paid-bg` | `--brand-indigo-100` | Paid badge background |
| `--paid-text` | `--brand-indigo-800` | Paid badge text |
| `--info` | `--brand-indigo-500` | Info banners, server notes |
| `--info-bg` | `--brand-indigo-50` | Info banner background |
| `--warning` | `--accent-amber-500` | Warnings |
| `--warning-bg` | `--accent-amber-100` | Warning backgrounds |
| `--error` | `#DC2626` | Error messages |
| `--error-bg` | `#FEE2E2` | Error backgrounds |

---

## 3. Typography (Exact Tokens)

### 3.1 Font Stack

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Display / Headings | **Space Grotesk** | 500, 600, 700 | H1, H2, H3, pricing, hero, brand wordmark |
| Body | **Inter** | 400, 500, 600 | Paragraphs, UI labels, buttons, captions |
| Mono | **JetBrains Mono** | 400, 500 | License keys, file names, code snippets, stats |

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap
```

### 3.2 Type Scale (Desktop)

| Token | Size | Line Height | Weight | Letter Spacing | Usage |
|-------|------|-------------|--------|----------------|-------|
| `--display-xl` | 64px / 4rem | 1.05 | 700 | -0.03em | Hero H1 (desktop) |
| `--display` | 48px / 3rem | 1.1 | 700 | -0.02em | Page H1, pricing hero |
| `--heading-1` | 36px / 2.25rem | 1.15 | 700 | -0.02em | Section H2 |
| `--heading-2` | 28px / 1.75rem | 1.2 | 600 | -0.01em | Sub-section H3 |
| `--heading-3` | 22px / 1.375rem | 1.3 | 600 | 0 | Card titles |
| `--lead` | 18px / 1.5rem | 1.55 | 400 | 0 | Hero subheadline, lead paragraphs |
| `--body` | 16px / 1rem | 1.65 | 400 | 0 | Body copy |
| `--body-sm` | 14px / 0.875rem | 1.5 | 400 | 0 | Captions, meta, badges, labels |
| `--label` | 12px / 0.75rem | 1.4 | 600 | 0.04em | Uppercase labels, eyebrow text |
| `--mono` | 14px / 0.875rem | 1.4 | 500 | 0 | File names, keys, stats |

### 3.3 Responsive Type Scale

| Token | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| `--display-xl` | 40px | 52px | 64px |
| `--display` | 32px | 40px | 48px |
| `--heading-1` | 28px | 32px | 36px |
| `--heading-2` | 24px | 26px | 28px |
| `--heading-3` | 20px | 21px | 22px |
| `--lead` | 16px | 17px | 18px |
| `--body` | 15px | 16px | 16px |
| `--body-sm` | 13px | 14px | 14px |
| `--label` | 11px | 12px | 12px |

---

## 4. Spacing & Layout (Exact Tokens)

### 4.1 Base Grid

Base unit: **4px**. All values are multiples of 4.

### 4.2 Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-0` | 0px | |
| `--space-1` | 4px | Inline gaps, tight icon-text |
| `--space-2` | 8px | Small internal gaps |
| `--space-3` | 12px | Button vertical padding, badge padding |
| `--space-4` | 16px | Card padding mobile, grid gap mobile |
| `--space-5` | 20px | Card padding desktop, form gaps |
| `--space-6` | 24px | Section internal gaps, desktop grid gap |
| `--space-8` | 32px | Large internal gaps |
| `--space-10` | 40px | Section heading to content |
| `--space-12` | 48px | Hero internal spacing |
| `--space-16` | 64px | Section padding mobile |
| `--space-20` | 80px | Section padding desktop |
| `--space-24` | 96px | Hero section padding desktop |
| `--space-32` | 128px | Large section breaks |

### 4.3 Layout Grid

- **Container max-width:** 1200px (`max-w-6xl`).
- **Content max-width:** 720px (`max-w-3xl`) for text-heavy sections.
- **Tool workspace max-width:** 1080px (`max-w-5xl`).
- **Grid:** 12 columns, gap 24px desktop, 16px tablet, 12px mobile.
- **Container padding:** 16px mobile, 24px tablet, 32px desktop, 48px 2xl.

### 4.4 Breakpoints

| Token | Width | Target |
|-------|-------|--------|
| `--bp-sm` | 640px | Landscape phones |
| `--bp-md` | 768px | Tablets |
| `--bp-lg` | 1024px | Small laptops |
| `--bp-xl` | 1280px | Desktops |
| `--bp-2xl` | 1536px | Large screens |

### 4.5 Border Radius Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-none` | 0px | Badges, small buttons, pills, tags |
| `--radius-sm` | 4px | Inputs, small cards |
| `--radius-md` | 8px | Buttons, medium cards |
| `--radius-lg` | 12px | Feature cards, panels |
| `--radius-xl` | 20px | Large cards, tool cards |
| `--radius-2xl` | 28px | Hero tool card, pricing card |
| `--radius-pill` | 9999px | Not used in v2 (avoid pill cliche) |

**Asymmetric rule:** Large surfaces get `--radius-2xl` or `--radius-xl`; small interactive elements (badges, small buttons, status chips) get `--radius-none` or `--radius-sm`. This creates visual tension and avoids the "all rounded" look.

### 4.6 Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-none` | none | Flat surfaces |
| `--shadow-sm` | `0 1px 2px rgba(15,23,42,0.04)` | Subtle cards |
| `--shadow-md` | `0 4px 12px rgba(15,23,42,0.06)` | Elevated cards, hover |
| `--shadow-lg` | `0 8px 24px rgba(15,23,42,0.08)` | Tool cards, modals |
| `--shadow-xl` | `0 16px 40px rgba(15,23,42,0.10)` | Hero tool card, pricing highlight |

### 4.7 Borders

| Token | Value | Usage |
|-------|-------|-------|
| `--border-thin` | 1px solid `--ink-200` | Default card borders |
| `--border-medium` | 1px solid `--ink-300` | Input borders, focus |
| `--border-strong` | 2px solid `--brand-indigo-600` | Active pricing card, selected tool |
| `--border-accent` | 2px solid `--accent-olive-600` | Free section emphasis |

### 4.8 Background Textures

**Dot grid:**
- Used in tool workspace and some section backgrounds.
- Pattern: `radial-gradient(circle, #E2E8F0 1px, transparent 1px)`.
- Size: 24px × 24px.
- Opacity: 0.6.

---

## 5. Components (All States)

### 5.1 Buttons

#### Primary Button

- **Default:**
  - Background: `--brand-indigo-600`
  - Text: white, `--body` weight 600
  - Padding: 12px 24px (mobile), 14px 28px (desktop)
  - Border radius: `--radius-md` (8px) — NOT pill
  - Shadow: `--shadow-sm`
- **Hover:**
  - Background: `--brand-indigo-700`
  - Transform: `translateY(-1px)`
  - Shadow: `--shadow-md`
- **Active/Pressed:**
  - Background: `--brand-indigo-800`
  - Transform: `translateY(0)`
- **Focus:**
  - `ring: 2px solid --brand-indigo-500, offset 2px`
- **Disabled:**
  - Background: `--ink-200`
  - Text: `--ink-400`
  - No shadow, no hover

#### Secondary Button

- **Default:**
  - Background: white
  - Border: `--border-thin`
  - Text: `--brand-indigo-700`
  - Padding: same as primary
  - Border radius: `--radius-md`
- **Hover:**
  - Background: `--brand-indigo-50`
  - Border color: `--brand-indigo-200`
- **Focus:**
  - Same as primary
- **Disabled:**
  - Background: `--ink-50`
  - Text: `--ink-400`
  - Border: `--ink-200`

#### Tertiary / Text Link

- Text: `--brand-indigo-600`
- Hover: underline, color `--brand-indigo-700`
- Focus: outline 2px `--brand-indigo-500`

#### Small Button (CTA in nav)

- Padding: 8px 16px
- Border radius: `--radius-sm` (4px)
- Font: `--body-sm` weight 600
- Same primary colors

### 5.2 Badges

#### Free Badge

- **Default:**
  - Background: `--accent-olive-100`
  - Text: `--accent-olive-700`, `--body-sm` weight 600
  - Border radius: `--radius-none` (0px) — sharp, distinctive
  - Padding: 4px 10px
  - Icon: olive checkmark (16px)
- **Hover:**
  - Background: `#D9F99D` (slightly darker olive-100)

#### Paid Badge

- **Default:**
  - Background: `--brand-indigo-100`
  - Text: `--brand-indigo-800`, `--body-sm` weight 600
  - Border radius: `--radius-none`
  - Padding: 4px 10px
  - Icon: indigo lock (16px)

#### Server Badge

- **Default:**
  - Background: `--brand-indigo-50`
  - Text: `--brand-indigo-700`, `--body-sm`
  - Border radius: `--radius-none`
  - Icon: cloud (16px)

### 5.3 Cards

#### Feature Card (Homepage)

- **Default:**
  - Background: white
  - Border: `--border-thin`
  - Border radius: `--radius-xl` (20px)
  - Padding: 24px
  - Shadow: `--shadow-sm`
- **Hover:**
  - Border: 1px solid `--accent-olive-300` (free) or `--brand-indigo-300` (paid)
  - Shadow: `--shadow-md`
  - Transform: `translateY(-2px)`
- **Icon container:**
  - 40px × 40px
  - Background: `--accent-olive-100` (free) or `--brand-indigo-100` (paid)
  - Border radius: `--radius-md` (8px)
  - Icon: 20px, `--accent-olive-700` or `--brand-indigo-700`

#### Tool Workspace Card

- **Default:**
  - Background: white
  - Border: `--border-thin`
  - Border radius: `--radius-2xl` (28px)
  - Padding: 32px (desktop), 24px (mobile)
  - Shadow: `--shadow-lg`
  - Background texture: dot-grid pattern
- **States:**
  - Active/drop: border `--brand-indigo-600`, background `--brand-indigo-50`
  - Error: border `--error`, background `--error-bg`
  - Processing: opacity 0.7, overlay spinner

#### Pricing Card

- **Default:**
  - Background: white
  - Border: `--border-strong` (2px indigo) for recommended
  - Border: `--border-thin` for others
  - Border radius: `--radius-2xl` (28px)
  - Padding: 32px
  - Shadow: `--shadow-lg` for recommended, `--shadow-sm` for others
- **Hover:**
  - Shadow: `--shadow-xl` for recommended

### 5.4 Navigation

#### Main Nav

- **Default:**
  - Height: 68px desktop, 60px mobile
  - Background: white
  - Border bottom: 1px solid `--ink-200`
  - Container: max-width 1200px, centered
  - Left: Logo mark + wordmark (Space Grotesk 700, 18px)
  - Center: Tools dropdown, Pricing, FAQ
  - Right: "Buy License — $29" small primary button
- **Scroll state:**
  - Background: `rgba(255,255,255,0.95)`
  - Backdrop blur: 8px
  - Shadow: `--shadow-sm`

#### Mobile Drawer

- **Default:**
  - Width: 300px
  - Background: white
  - Shadow: `--shadow-xl`
  - Slide from right, 300ms ease-out
- **Sections:**
  - Header: Logo + close
  - Free tools list
  - Full license tools list
  - Legal links
  - Bottom CTA

#### Tools Dropdown

- **Default:**
  - Width: 320px
  - Background: white
  - Border: `--border-thin`
  - Border radius: `--radius-lg` (12px)
  - Shadow: `--shadow-lg`
  - Padding: 8px
- **Item:**
  - Padding: 10px 12px
  - Border radius: `--radius-md`
  - Hover: `--brand-indigo-50`

### 5.5 Footer

- **Default:**
  - Background: `--brand-indigo-900`
  - Text: white / `--ink-300`
  - Padding: 64px 0 32px
  - Border top: none
- **Layout:**
  - 4-column desktop, 2-column tablet, 1-column mobile
  - Column 1: Logo + tagline
  - Columns 2-4: Legal, Tools, Contact
- **Links:**
  - Color: `--ink-300`
  - Hover: white
- **Bottom row:**
  - Copyright + social placeholders

### 5.6 Upload Zone

- **Default:**
  - Border: 2px dashed `--ink-300`
  - Border radius: `--radius-xl` (20px)
  - Background: `--ink-50`
  - Padding: 48px 32px
- **Hover:**
  - Border: 2px solid `--brand-indigo-600`
  - Background: `--brand-indigo-50`
- **Active/drop:**
  - Border: 2px solid `--brand-indigo-600`
  - Background: `--brand-indigo-100`
- **Error:**
  - Border: 2px dashed `--error`
  - Background: `--error-bg`
- **Icon:**
  - Upload cloud, 48px
  - Default: `--ink-400`
  - Active: `--brand-indigo-600`

### 5.7 Page Preview Grid (Remove Pages)

- **Thumbnail container:**
  - Border: 1px solid `--ink-200`
  - Border radius: `--radius-md` (8px)
  - Background: white
  - Shadow: `--shadow-sm`
  - Aspect ratio: 1:√2 (A4)
- **Hover:**
  - Shadow: `--shadow-md`
  - Transform: `translateY(-2px)`
- **Selected:**
  - Ring: 2px solid `--brand-indigo-600`
  - Overlay: `rgba(79,70,229,0.10)`
  - Checkmark: top-right, white circle + indigo check
- **Page number:**
  - `--body-sm`, `--ink-500`, centered below

### 5.8 Paywall Banner (Inline, Non-Modal)

- **Default:**
  - Background: `--brand-indigo-50`
  - Border left: 4px solid `--brand-indigo-600`
  - Border radius: `--radius-md` (right side only, left flat)
  - Padding: 20px 24px
- **Icon:**
  - Lock, 24px, `--brand-indigo-600`
- **Title:**
  - `--heading-3`, `--brand-indigo-900`
- **Body:**
  - `--body`, `--ink-700`
- **CTA:**
  - Small primary button "Buy Full License — $29"
- **Secondary:**
  - Text link "Learn more" → `/pricing/`

### 5.9 FAQ Accordion

- **Item:**
  - Border bottom: 1px solid `--ink-200`
  - Padding: 20px 0
- **Question:**
  - `--body` weight 600, `--ink-900`
- **Answer:**
  - `--body`, `--ink-600`, max-width 680px
- **Hover:**
  - Question color: `--brand-indigo-600`
- **Open state:**
  - Chevron rotates 180°
  - Answer height animates 300ms

### 5.10 Toast / Alert

- **Success:**
  - Background: `--accent-olive-100`
  - Border left: 4px solid `--accent-olive-600`
  - Text: `--accent-olive-700`
- **Error:**
  - Background: `--error-bg`
  - Border left: 4px solid `--error`
  - Text: `--error`
- **Info:**
  - Background: `--info-bg`
  - Border left: 4px solid `--info`
  - Text: `--brand-indigo-800`
- **Position:**
  - Top center, fixed, z-index 100
  - Padding: 16px 24px
  - Border radius: `--radius-md`
  - Shadow: `--shadow-lg`
  - Auto-dismiss: 5s

---

## 6. States Design

### 6.1 License States

| State | Badge | CTA | Workspace |
|-------|-------|-----|-----------|
| Unknown | Skeleton shimmer | Disabled | Loading overlay |
| Unlicensed | "Full License" indigo | "Buy — $29" | Paywall banner, preview disabled or blurred |
| Licensed | "Unlocked" olive | "Download" / action | Full functionality |
| Error | "Check failed" amber | Retry | Error alert |

### 6.2 File Processing States

| State | Visual |
|-------|--------|
| Idle | Upload zone or preview ready |
| Uploading | Progress bar 0-100%, filename, cancel button |
| Processing | Spinner + status text, 50% overlay |
| Preview | Tool-specific UI active |
| Success | Olive checkmark + download button + stats |
| Error | Red alert + retry, preserve selection if possible |

### 6.3 Button States

All buttons have: default, hover, active, focus, disabled.

### 6.4 Input States

- **Default:** 1px `--ink-300`, `--radius-sm`, padding 12px 16px
- **Hover:** border `--ink-400`
- **Focus:** border `--brand-indigo-600`, ring 2px `--brand-indigo-500`
- **Error:** border `--error`, background `--error-bg`
- **Disabled:** background `--ink-100`, text `--ink-400`

---

## 7. Responsive Patterns

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Nav | Horizontal | Horizontal | Hamburger drawer |
| Hero | Left text + overlapping tool preview | Stacked | Stacked, text first |
| Split section | 2-column cards | 2-column | Stacked |
| Feature grid | 4 columns | 2 columns | 1 column |
| Tool workspace | 1080px centered | Full width | Edge-to-edge, stacked |
| Page grid | 4 columns | 3 columns | 2 columns |
| Pricing | 3 cards | 3 cards / stacked | Stacked, recommended first |
| Footer | 4 columns | 2 columns | 1 column stacked |

---

## 8. Dark Mode (Optional)

If implementing dark mode:
- Background: `--brand-indigo-900`
- Surface: `--brand-indigo-800`
- Text: white / `--ink-100`
- Primary: `--brand-indigo-500`
- Accent: `--accent-olive-500`
- Borders: `rgba(255,255,255,0.10)`
- Dot-grid texture: `rgba(255,255,255,0.05)`

For v1 launch, dark mode is optional. All components must be designed to support it if added later.

---

## 9. Accessibility

- Minimum contrast: 4.5:1 for body text, 3:1 for large text/UI.
- Focus rings: 2px solid `--brand-indigo-500` with 2px offset.
- Touch targets: minimum 44×44px.
- Icons paired with text labels.
- Decorative icons: `aria-hidden="true"`.
- Tool state announcements: `aria-live="polite"` regions.
- Reduced motion: disable transforms and animations.

---

## 10. File Naming & Token Conventions

- CSS variables: `--{category}-{name}-{variant}` (e.g., `--color-brand-indigo-600`)
- Tailwind: extend theme with custom colors/typography/spacing.
- Component classes: `rpp-{component}-{variant}-{state}`
- Icons: Lucide React components, 24px default, 16px small, 20px medium.

---

## 11. Design System v2 Changelog

| Version | Date | Notes |
|---------|------|-------|
| v2 | 2026-07-18 | Matured system: Space Grotesk display, olive accent, asymmetric radius, dot-grid texture, exact tokens, all component states. |


---

## 12. Frontend-Ready Token Reference

This section maps the design tokens documented above to the CSS custom properties
and component classes shipped in `shared.css` so the frontend team does not need to
reverse-engineer values.

| Token type | shared.css variable | Example value |
|------------|---------------------|---------------|
| Brand indigo | `--rpp-color-brand-indigo-600` | `#4F46E5` |
| Brand olive | `--rpp-color-accent-olive-600` | `#65A30D` |
| Text ink | `--rpp-color-ink-900` | `#0F172A` |
| Border | `--rpp-border-thin` | `1px solid #E2E8F0` |
| Shadow card | `--rpp-shadow-lg` | `0 8px 24px rgba(15,23,42,0.08)` |
| Radius card | `--rpp-radius-xl` | `20px` |
| Radius tool card | `--rpp-radius-2xl` | `28px` |
| Button primary | `.rpp-btn-primary` | documented in `shared.css` |
| Input | `.rpp-input` | documented in `shared.css` |
| Card | `.rpp-card` / `.rpp-tool-card` | documented in `shared.css` |
| Header | `.rpp-header` | documented in `shared.css` |
| Footer | `.rpp-footer` | documented in `shared.css` |

All page-specific overrides live in `pages/{page-name}/styles.css`.


---

# Appendix: v3 Design Freeze Updates

> Updated: 2026-07-22  
> Scope: pricing refactor, checkout/success refresh, new blog pages, restored legal pages, tool-page badge/disclaimer updates, footer restructure.  
> All changes preserve the v2 Design System tokens (colors, typography, spacing, shadows).

## A. New / Modified Screens in v3

| Screen | Route | Status | Notes |
|--------|-------|--------|-------|
| Homepage | `/` | Modified | Footer updated to new Legal/Tools/Support columns; all other sections remain unchanged. |
| Remove PDF Pages | `/remove-pages` | Modified | Added "Currently free" badge in hero; footer updated. |
| Merge PDFs | `/merge` | Modified | Added "Currently free" badge in hero; footer updated. |
| Compress PDF | `/compress` | Modified | Added "Currently free" badge; backend-fallback notice added; footer updated. |
| Sign PDF | `/sign` | Modified | Added "Currently free" badge; "not a digital certificate signature" disclaimer added; footer updated. |
| Convert PDF to Word | `/convert-to-word` | Modified | Added "Currently free" badge (for browser context); 1-hour deletion notice added; footer updated. |
| Pricing | `/pricing` | Rebuilt | Two-column layout: Free + $19 Launch Special. $29 is shown only as a strikethrough anchor. Comparison table + 5 pricing FAQs included. |
| Checkout | `/checkout` | Rebuilt | $19 Launch Special selected by default. $29 Standard preserved as fallback. Email field, Stripe security note, refund note. |
| Success | `/success` | Rebuilt | Purchase summary with $19 + $29 strikethrough. License key block, next-step cards, CTAs. |
| FAQ | `/faq` | Modified | Footer updated only. |
| Contact & Refund | `/contact` | Modified | Footer updated only. |
| Privacy | `/privacy` | New | Legal-page layout: max-w-3xl, dot-grid background, section H2 style. |
| Terms | `/terms` | New | Same legal-page layout. |
| Refund | `/refund` | New | Same legal-page layout. |
| Blog Index | `/blog` | New | 4 article cards, two-column grid. |
| Blog: Foxit Alternative | `/blog/foxit-alternative` | New | Article layout with H1, sections, CTA. |
| Blog: Replace Image in PDF | `/blog/replace-image-in-pdf` | New | Article layout with H1, sections, CTA. |
| Blog: One-Time Payment | `/blog/one-time-payment-pdf-editor` | New | Article layout with H1, sections, CTA. |
| Blog: No-Subscription | `/blog/no-subscription-pdf-editor` | New | Article layout with H1, sections, CTA. |

## B. Extended Components

### B.1 Pricing Card v3

Two-card layout (Free / Full Editor). No third column.

- **Free card**
  - Border: `--border-thin`
  - Radius: `--radius-2xl` (24px)
  - Badge: `Currently free` (olive badge)
  - Price: `$0` with "No account needed"
  - CTA: Secondary style → `/remove-pages`
- **Full Editor card**
  - Border: `--border-strong` (2px primary)
  - Radius: `--radius-2xl` (28px)
  - Badge: `Most popular` (olive, sharp corners)
  - Price: `$19` large, `$29` strikethrough beside it
  - Period: "One-time payment. No subscription."
  - Secondary note: "Launch price for a limited time. Standard price is $29."
  - CTA: Primary button → `/checkout`

### B.2 Comparison Table

- Container: white card, `--border-thin`, rounded 20px.
- Header: `Feature | Free | Full Editor`.
- Full Editor column has `--brand-indigo-50/50` background tint.
- Use olive check for Free, primary check for Full Editor, em-dash for missing.

### B.3 Pricing FAQ

- 5 questions in stacked cards.
- Card: white, border, rounded-xl, shadow-sm.
- H4 question in `--heading-sm` / font-heading.
- Answer in `--body` / `--on-surface-variant`.

### B.4 Checkout Plan Selector

- Two radio cards side by side (sm:grid-cols-2).
- $19 card: selected by default, border 2px primary, brand-indigo-50 background, `Recommended` olive badge.
- $29 card: unselected, border `--ink-200`, white background, changes to primary border when selected.
- Trust row below: lock/verified/mail icons + labels.
- Sticky order summary on right (desktop).

### B.5 License Key Card

- Used on `/success`.
- White card with dot-grid background, rounded 28px.
- Monospace key block in surface-container-low with border.
- Copy button primary.
- Next-step 3-column grid below.

### B.6 Blog Card

- White card, border, rounded 20px, hover shadow-md.
- Title as H2 font-heading, excerpt body-sm, CTA link primary.
- Two-column grid on desktop, single column on mobile.

### B.7 Legal Page Layout

- Max-width 3xl, centered.
- H1 `font-display` / primary color.
- Last-updated date in body-sm / ink-600.
- Section H2 `font-heading` / text-xl.
- Body paragraphs in `text-on-surface-variant` / leading-relaxed.
- Links primary + hover underline.

### B.8 Tool-Page Badge

- Positioned directly below the H1.
- Same `Currently free` olive badge used in homepage and pricing Free card.

### B.9 Disclaimer / Notice Banners

- Left accent border (4px).
- Background: `--accent-amber-100` for warning (Sign), `--brand-indigo-50` for info (Convert, Compress).
- Title in bold on-surface, body in on-surface-variant.
- Sharp left radius, rounded right.

### B.10 Footer v3

- Background: `--brand-indigo-900`.
- 4 columns on desktop: Brand, Legal, Tools, Support.
- Legal: Privacy / Terms / Refund.
- Tools: Remove Pages / Merge PDFs / Compress PDF / Sign PDF / Convert to Word.
- Support: Pricing / FAQ / Contact / Blog.
- Bottom row: copyright across full width.

## C. Navigation Updates

- Desktop nav: Logo, Tools dropdown, Pricing, FAQ, Blog, CTA.
- Tools dropdown lists all 5 tools.
- Mobile nav: not shown in design file, but front-end should implement same groups (Free Tools, Pro Tools, Support, Legal).

## D. Design Decisions Frozen

1. Only two pricing cards. The $29 card is not a standalone purchase option on `/pricing`.
2. Checkout keeps $29 Standard as a fallback radio option, but defaults to $19 Launch Special.
3. All 5 free tools use the `Currently free` badge.
4. Sign page clearly states the signature is not a digital certificate.
5. Convert page states the 1-hour deletion policy.
6. Compress page includes the backend fallback notice position.
7. Legal pages use the same max-w-3xl legal layout.
8. Blog index uses a 4-card two-column grid; blog posts use the same article template.
9. Footer structure is fixed: Legal, Tools, Support.

## E. Unresolved Design Questions

- Blog post thumbnails/hero images: not included. Front-end can use abstract pattern or omit.
- Mobile menu design: not included in this handoff; follow desktop nav structure.
- Whether `/success` should auto-redirect after N seconds: not designed; keep static.
- Whether checkout should collect billing address: not designed; current scope is email + card only.
- Whether legal pages should include a table of contents sidebar: not included; keep simple section stack.

## F. Handoff Checklist

- [x] route-mapping.json includes all 19 routes.
- [x] DESIGN.md updated with v3 components and pages.
- [x] code.html generated for all new and modified pages.
- [x] Footer links consistent across all pages.
- [x] Pricing/Checkout/Success copy aligned with copy-freeze.md.
- [ ] screen.png screenshots pending (to be generated or added by front-end if needed).
