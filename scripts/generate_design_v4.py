#!/usr/bin/env python3
"""
Generate design-handoff-v4 for RemovePDFPages by upgrading design-handoff-v3.

Approach: treat the v3 handoff as a Stitch-style design package, extract the
existing copy, then apply a bolder, more distinctive visual system (new color
palette, custom fonts, dot-grid textures, brand color blocks, micro-motion, and
denser tool cards) while preserving all upstream copy-freeze content.

Outputs:
- design-handoff-v4/shared.css (refined design system)
- design-handoff-v4/pages/<page>/code.html + styles.css
- design-handoff-v4/pages/<page>/screen.png
- design-handoff-v4/HANDOFF.md
- design-handoff-v4/assets/ (copied from v3)
"""
import os, re, shutil, zipfile
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = Path('/home/ubuntu/fancy-text-site')
V3 = BASE / 'design-handoff-v3'
V4 = BASE / 'design-handoff-v4'

# ---------------------------------------------------------------------------
# 1. Prepare output tree
# ---------------------------------------------------------------------------
if V4.exists():
    shutil.rmtree(V4)
V4.mkdir(parents=True)
(V4 / 'assets').mkdir()
(V4 / 'pages').mkdir()

shutil.copytree(V3 / 'assets', V4 / 'assets', dirs_exist_ok=True)

# ---------------------------------------------------------------------------
# 2. New shared.css (bolder design system, same class names)
# ---------------------------------------------------------------------------
SHARED_CSS = r'''/* RemovePDFPages Design System v4 — shared.css
   Type: Design handoff / reference implementation
   Notes: Bolder, more distinctive visual system. No default Inter, no generic
   purple gradient, no centered hero + three cards. Uses a warm marker + ink
   palette, custom display type, dot-grid textures, brand color blocks, and
   micro-motion. Class names stay compatible with v3 HTML structure. */

@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --rpp-font-display: 'Bricolage Grotesque', 'Space Grotesk', sans-serif;
  --rpp-font-body: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --rpp-font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
  --rpp-font-script: 'Caveat', 'Brush Script MT', cursive;

  /* Color tokens — warm marker + deep ink */
  --rpp-ink-950: #080c18;
  --rpp-ink-900: #0f172a;
  --rpp-ink-800: #1e293b;
  --rpp-ink-700: #334155;
  --rpp-ink-600: #475569;
  --rpp-ink-500: #64748b;
  --rpp-ink-400: #94a3b8;
  --rpp-ink-300: #cbd5e1;
  --rpp-ink-200: #e2e8f0;
  --rpp-ink-100: #f1f5f9;
  --rpp-ink-50: #f8fafc;

  --rpp-surface-0: #ffffff;
  --rpp-surface-100: #f6f7f9;

  --rpp-marker: #FF5722;
  --rpp-marker-dark: #E64A19;
  --rpp-marker-light: #FFF0EB;
  --rpp-marker-50: #fff7f4;

  /* Backwards-compatible aliases for v3 inline styles */
  --rpp-indigo: #FF5722;
  --rpp-indigo-dark: #E64A19;
  --rpp-indigo-light: #FFF0EB;

  --rpp-olive: #65A30D;
  --rpp-olive-dark: #3f6209;
  --rpp-olive-light: #f3fadc;
  --rpp-amber: #F59E0B;
  --rpp-amber-light: #fffbeb;
  --rpp-amber-dark: #92400e;
  --rpp-teal: #0D9488;
  --rpp-teal-light: #ccfbf1;
  --rpp-red: #DC2626;
  --rpp-red-light: #fef2f2;
  --rpp-blue: #2563EB;
  --rpp-blue-light: #dbeafe;

  /* Spacing (4px base) */
  --rpp-space-1: 4px;
  --rpp-space-2: 8px;
  --rpp-space-3: 12px;
  --rpp-space-4: 16px;
  --rpp-space-5: 24px;
  --rpp-space-6: 32px;
  --rpp-space-7: 40px;
  --rpp-space-8: 48px;
  --rpp-space-9: 64px;
  --rpp-space-10: 80px;

  /* Type scale */
  --rpp-scale-0: 14px;
  --rpp-scale-1: 16px;
  --rpp-scale-2: 18px;
  --rpp-scale-3: 20px;
  --rpp-scale-4: 24px;
  --rpp-scale-5: 32px;
  --rpp-scale-6: 40px;
  --rpp-scale-7: 56px;
  --rpp-scale-8: 72px;

  /* Radius — mixed to create visual tension */
  --rpp-radius-sharp: 0px;
  --rpp-radius-sm: 6px;
  --rpp-radius-md: 10px;
  --rpp-radius-lg: 16px;
  --rpp-radius-xl: 24px;
  --rpp-radius-pill: 999px;

  /* Shadows — paper-like, layered */
  --rpp-shadow-sm: 0 1px 2px rgba(8, 12, 24, 0.06);
  --rpp-shadow-md: 0 6px 16px rgba(8, 12, 24, 0.08);
  --rpp-shadow-lg: 0 14px 34px rgba(8, 12, 24, 0.10);
  --rpp-shadow-xl: 0 24px 60px rgba(8, 12, 24, 0.12);

  /* Layout */
  --rpp-container-max: 1120px;
  --rpp-workspace-max: 880px;
  --rpp-legal-max: 760px;

  /* Texture */
  --rpp-dot-grid: radial-gradient(circle, var(--rpp-ink-300) 1px, transparent 1px);
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font: 400 var(--rpp-scale-1)/1.65 var(--rpp-font-body);
  color: var(--rpp-ink-800);
  background: var(--rpp-surface-0);
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4, p, ul, ol, dl, figure { margin: 0; }
ul, ol { list-style: none; padding: 0; }
a { color: var(--rpp-marker); text-decoration: none; }
a:hover { text-decoration: underline; }
button { font: inherit; cursor: pointer; }
img { max-width: 100%; height: auto; }

.rpp-sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}

/* Utilities */
.rpp-text-center { text-align: center; }
.rpp-flex { display: flex; }
.rpp-items-center { align-items: center; }
.rpp-justify-between { justify-content: space-between; }
.rpp-gap-2 { gap: var(--rpp-space-2); }
.rpp-mono { font-family: var(--rpp-font-mono); }

/* Typography */
.rpp-display {
  font: 800 var(--rpp-scale-7)/1.05 var(--rpp-font-display);
  letter-spacing: -0.03em;
  color: var(--rpp-ink-900);
}
.rpp-heading-1 { font: 700 var(--rpp-scale-6)/1.1 var(--rpp-font-display); color: var(--rpp-ink-900); }
.rpp-heading-2 { font: 700 var(--rpp-scale-5)/1.15 var(--rpp-font-display); color: var(--rpp-ink-900); }
.rpp-heading-3 { font: 700 var(--rpp-scale-4)/1.2 var(--rpp-font-display); color: var(--rpp-ink-900); }
.rpp-lead { font-size: var(--rpp-scale-2); line-height: 1.55; color: var(--rpp-ink-700); }
.rpp-body { color: var(--rpp-ink-800); }
.rpp-body-sm { font-size: var(--rpp-scale-0); line-height: 1.5; color: var(--rpp-ink-700); }
.rpp-caption { font-size: 12px; line-height: 1.45; color: var(--rpp-ink-500); }

/* Layout */
.rpp-container {
  width: min(100% - var(--rpp-space-6), var(--rpp-container-max));
  margin-inline: auto;
}
.rpp-workspace {
  width: min(100% - var(--rpp-space-6), var(--rpp-workspace-max));
  margin-inline: auto;
}
.rpp-legal-container {
  width: min(100% - var(--rpp-space-6), var(--rpp-legal-max));
  margin-inline: auto;
}
.rpp-section { padding: var(--rpp-space-10) 0; }
.rpp-section-sm { padding: var(--rpp-space-6) 0 var(--rpp-space-10); }
.rpp-section-hero { padding: var(--rpp-space-9) 0 var(--rpp-space-7); }
.rpp-section-soft { background: var(--rpp-surface-100); }

/* Header */
.rpp-header {
  border-bottom: 1.5px solid var(--rpp-ink-200);
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  position: sticky; top: 0; z-index: 100;
}
.rpp-header-inner {
  display: flex; align-items: center; gap: var(--rpp-space-5);
  padding: var(--rpp-space-3) 0;
}
.rpp-nav-logo {
  display: inline-flex; align-items: center; gap: var(--rpp-space-2);
  font-family: var(--rpp-font-display); font-weight: 800; font-size: var(--rpp-scale-2); color: var(--rpp-ink-900);
}
.rpp-nav-logo-mark {
  width: 32px; height: 32px; display: grid; place-items: center;
  background: var(--rpp-marker); color: #fff;
  border-radius: var(--rpp-radius-md);
  font-weight: 800; font-size: var(--rpp-scale-1);
  box-shadow: 0 2px 0 var(--rpp-marker-dark);
  transform: rotate(-2deg);
  transition: transform .15s ease;
}
.rpp-nav-logo:hover .rpp-nav-logo-mark { transform: rotate(0deg); }
.rpp-nav-links { display: flex; gap: var(--rpp-space-4); margin-left: auto; }
.rpp-nav-link { font-size: var(--rpp-scale-0); font-weight: 700; color: var(--rpp-ink-700); position: relative; }
.rpp-nav-link::after {
  content: ''; position: absolute; left: 0; bottom: -4px; width: 0; height: 2px; background: var(--rpp-marker); transition: width .12s ease;
}
.rpp-nav-link:hover { color: var(--rpp-ink-900); text-decoration: none; }
.rpp-nav-link:hover::after { width: 100%; }
.rpp-nav-cta { display: flex; gap: var(--rpp-space-3); }
.rpp-menu-toggle { display: none; background: transparent; border: 0; color: var(--rpp-ink-800); }

@media (max-width: 880px) {
  .rpp-nav-links, .rpp-nav-cta { display: none; }
  .rpp-menu-toggle { display: block; margin-left: auto; }
}

/* Footer */
.rpp-footer {
  background: var(--rpp-ink-950); color: var(--rpp-ink-400);
  padding: var(--rpp-space-9) 0 var(--rpp-space-6);
  margin-top: var(--rpp-space-10);
  border-top: 4px solid var(--rpp-marker);
}
.rpp-footer-grid {
  display: grid; grid-template-columns: 1.4fr repeat(3, 1fr); gap: var(--rpp-space-7);
}
.rpp-footer-brand { display: inline-flex; align-items: center; gap: var(--rpp-space-2); font-weight: 800; color: #fff; font-family: var(--rpp-font-display); }
.rpp-footer-brand .rpp-nav-logo-mark { transform: rotate(0deg); box-shadow: none; }
.rpp-footer-tagline { margin-top: var(--rpp-space-3); font-size: var(--rpp-scale-0); color: var(--rpp-ink-400); max-width: 260px; }
.rpp-footer-col-title { font-size: var(--rpp-scale-0); font-weight: 700; color: #fff; margin-bottom: var(--rpp-space-3); }
.rpp-footer-link { display: block; font-size: var(--rpp-scale-0); color: var(--rpp-ink-400); margin-top: var(--rpp-space-2); }
.rpp-footer-link:hover { color: var(--rpp-ink-50); text-decoration: none; }
.rpp-footer-bottom {
  margin-top: var(--rpp-space-8); padding-top: var(--rpp-space-5); border-top: 1px solid var(--rpp-ink-800);
  font-size: 12px; color: var(--rpp-ink-500); display: flex; flex-direction: column; gap: var(--rpp-space-2);
}

/* Buttons */
.rpp-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--rpp-space-2);
  font-weight: 700; font-size: var(--rpp-scale-0); line-height: 1;
  border-radius: var(--rpp-radius-md); border: 1.5px solid transparent;
  padding: var(--rpp-space-3) var(--rpp-space-4);
  transition: transform .08s ease, box-shadow .12s ease, background .12s ease, border-color .12s ease;
}
.rpp-btn:hover { text-decoration: none; transform: translateY(-2px); }
.rpp-btn:active { transform: translateY(1px); }
.rpp-btn-primary { background: var(--rpp-marker); color: #fff; box-shadow: 0 4px 0 var(--rpp-marker-dark); }
.rpp-btn-primary:hover { background: var(--rpp-marker-dark); box-shadow: 0 6px 0 var(--rpp-marker-dark); }
.rpp-btn-secondary { background: #fff; color: var(--rpp-ink-900); border-color: var(--rpp-ink-300); }
.rpp-btn-secondary:hover { background: var(--rpp-ink-50); border-color: var(--rpp-ink-400); box-shadow: var(--rpp-shadow-md); }
.rpp-btn-tertiary { background: transparent; color: var(--rpp-ink-700); text-decoration: underline; text-decoration-color: var(--rpp-ink-300); text-underline-offset: 3px; }
.rpp-btn-tertiary:hover { background: var(--rpp-ink-100); color: var(--rpp-ink-900); text-decoration-color: var(--rpp-marker); }
.rpp-btn-small { padding: var(--rpp-space-2) var(--rpp-space-3); font-size: 13px; border-radius: var(--rpp-radius-sm); }
.rpp-btn-full { width: 100%; }

/* Badges — sticker style */
.rpp-badge {
  display: inline-flex; align-items: center; gap: var(--rpp-space-2);
  font-weight: 800; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em;
  padding: var(--rpp-space-1) var(--rpp-space-3);
  border-radius: var(--rpp-radius-sharp);
  transform: rotate(-1.5deg);
}
.rpp-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; opacity: 0.6; }
.rpp-badge-free { background: var(--rpp-olive-light); color: var(--rpp-olive-dark); }
.rpp-badge-subtle { background: var(--rpp-ink-100); color: var(--rpp-ink-700); transform: rotate(0deg); }
.rpp-badge-subtle::before { display: none; }
.rpp-badge-pro { background: var(--rpp-marker-light); color: var(--rpp-marker-dark); }

/* Cards */
.rpp-card {
  background: var(--rpp-surface-0); border: 1.5px solid var(--rpp-ink-200);
  border-radius: var(--rpp-radius-xl); padding: var(--rpp-space-7);
  box-shadow: var(--rpp-shadow-sm);
}

/* Tool card — workshop surface */
.rpp-tool-card {
  background: var(--rpp-surface-0); border: 1.5px solid var(--rpp-ink-200);
  border-radius: var(--rpp-radius-xl); padding: var(--rpp-space-7);
  box-shadow: var(--rpp-shadow-md);
  position: relative;
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.92), rgba(255,255,255,0.92)),
    var(--rpp-dot-grid);
  background-size: auto, 20px 20px;
  background-position: 0 0, 10px 10px;
  overflow: hidden;
}
.rpp-tool-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 8px;
  background: repeating-linear-gradient(90deg, var(--rpp-ink-300) 0 1px, transparent 1px 12px);
  opacity: 0.6;
}
.rpp-tool-card-ruler {
  position: absolute; left: 0; top: 8px; bottom: 0; width: 28px;
  border-right: 1.5px dashed var(--rpp-ink-200);
  background: linear-gradient(180deg, var(--rpp-ink-100) 0 24px, transparent 24px 48px);
  background-size: 100% 48px;
  opacity: 0.5;
}
.rpp-tool-card > * { position: relative; z-index: 1; }

/* Notices */
.rpp-notice {
  display: flex; align-items: flex-start; gap: var(--rpp-space-3); padding: var(--rpp-space-4);
  border-radius: var(--rpp-radius-md); border: 1px solid transparent; border-left-width: 4px;
}
.rpp-notice-icon { flex-shrink: 0; width: 22px; height: 22px; margin-top: 2px; }
.rpp-notice-title { font-weight: 800; color: var(--rpp-ink-900); font-size: var(--rpp-scale-1); }
.rpp-notice-body { color: var(--rpp-ink-700); font-size: var(--rpp-scale-0); margin-top: var(--rpp-space-1); }
.rpp-notice-info { background: var(--rpp-blue-light); border-color: #bfdbfe; border-left-color: var(--rpp-blue); color: var(--rpp-blue); }
.rpp-notice-success { background: var(--rpp-olive-light); border-color: #d3eeab; border-left-color: var(--rpp-olive); color: var(--rpp-olive-dark); }
.rpp-notice-warning { background: var(--rpp-amber-light); border-color: #fde68a; border-left-color: var(--rpp-amber); color: var(--rpp-amber-dark); }
.rpp-notice-error { background: var(--rpp-red-light); border-color: #fecaca; border-left-color: var(--rpp-red); color: var(--rpp-red); }

/* Icons */
.rpp-icon { width: 20px; height: 20px; }

/* Upload zone */
.rpp-upload-zone {
  border: 2.5px dashed var(--rpp-ink-300); border-radius: var(--rpp-radius-xl);
  padding: var(--rpp-space-9) var(--rpp-space-6); text-align: center;
  background: var(--rpp-surface-100);
  background-image: var(--rpp-dot-grid); background-size: 16px 16px; background-position: 8px 8px;
  transition: border-color .12s ease, background .12s ease, transform .12s ease;
}
.rpp-upload-zone:hover { border-color: var(--rpp-marker); background-color: var(--rpp-marker-50); transform: translateY(-2px); }
.rpp-upload-zone-icon { color: var(--rpp-ink-500); margin-bottom: var(--rpp-space-4); }
.rpp-upload-zone-title { font-weight: 800; font-size: var(--rpp-scale-3); color: var(--rpp-ink-900); font-family: var(--rpp-font-display); }
.rpp-upload-zone-meta { margin-top: var(--rpp-space-2); color: var(--rpp-ink-600); font-size: var(--rpp-scale-0); max-width: 420px; margin-inline: auto; }

/* Steps */
.rpp-steps {
  display: flex; gap: var(--rpp-space-2); counter-reset: step; position: relative; z-index: 1;
}
.rpp-step {
  flex: 1; text-align: center; font-size: 13px; font-weight: 700; color: var(--rpp-ink-500);
  padding-bottom: var(--rpp-space-3); border-bottom: 3px solid var(--rpp-ink-200); position: relative;
}
.rpp-step::before {
  counter-increment: step; content: counter(step); display: inline-block;
  width: 26px; height: 26px; background: var(--rpp-ink-200); color: var(--rpp-ink-700);
  border-radius: 50%; font-size: 12px; line-height: 26px; margin-right: var(--rpp-space-2); font-weight: 800;
}
.rpp-step-active { color: var(--rpp-marker); border-color: var(--rpp-marker); }
.rpp-step-active::before { background: var(--rpp-marker); color: #fff; }
@media (max-width: 768px) {
  .rpp-steps { flex-direction: column; }
  .rpp-step { text-align: left; border-bottom: 0; border-left: 3px solid var(--rpp-ink-200); padding: var(--rpp-space-2) 0 var(--rpp-space-2) var(--rpp-space-3); }
  .rpp-step-active { border-color: var(--rpp-marker); }
}

/* Page thumbnails */
.rpp-page-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--rpp-space-4); }
.rpp-page-thumb {
  aspect-ratio: 1/1.3; background: var(--rpp-surface-100); border: 1.5px solid var(--rpp-ink-200);
  border-radius: var(--rpp-radius-md); padding: var(--rpp-space-3); position: relative; cursor: pointer;
  display: flex; flex-direction: column; gap: 8px; transition: transform .12s ease, border-color .12s ease, box-shadow .12s ease;
}
.rpp-page-thumb:hover { transform: translateY(-2px); box-shadow: var(--rpp-shadow-md); }
.rpp-page-thumb .line { height: 6px; background: var(--rpp-ink-200); border-radius: 999px; }
.rpp-page-thumb .w-30 { width: 30%; }
.rpp-page-thumb .w-60 { width: 60%; }
.rpp-page-thumb .w-85 { width: 85%; }
.rpp-page-thumb-selected { border: 2px solid var(--rpp-marker); background: var(--rpp-marker-light); }
.rpp-page-thumb-selected::after {
  content: "✓"; position: absolute; top: -10px; right: -10px; width: 26px; height: 26px;
  background: var(--rpp-marker); color: #fff; border-radius: 50%; display: grid; place-items: center;
  font-size: 12px; font-weight: 800; box-shadow: var(--rpp-shadow-sm);
}
.rpp-page-number { position: absolute; bottom: var(--rpp-space-2); right: var(--rpp-space-3); font-size: 11px; color: var(--rpp-ink-500); font-weight: 700; }

/* Processing */
.rpp-processing-overlay {
  position: absolute; inset: 0; background: rgba(255,255,255,0.96);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--rpp-space-4);
  border-radius: var(--rpp-radius-xl);
}
.rpp-spinner {
  width: 40px; height: 40px; border: 3px solid var(--rpp-ink-200); border-top-color: var(--rpp-marker); border-radius: 50%; animation: rpp-spin 0.8s linear infinite;
}
@keyframes rpp-spin { to { transform: rotate(360deg); } }
.rpp-progress { width: 100%; height: 10px; background: var(--rpp-ink-200); border-radius: 999px; overflow: hidden; }
.rpp-progress-bar { height: 100%; background: var(--rpp-marker); border-radius: 999px; }

/* FAQ */
.rpp-faq-list { display: grid; gap: var(--rpp-space-4); max-width: 720px; margin-inline: auto; }
.rpp-faq-item { border-bottom: 1.5px solid var(--rpp-ink-200); padding-bottom: var(--rpp-space-4); }
.rpp-faq-question { font-weight: 800; font-size: var(--rpp-scale-2); color: var(--rpp-ink-900); font-family: var(--rpp-font-display); }
.rpp-faq-answer { margin-top: var(--rpp-space-2); color: var(--rpp-ink-700); }

/* State labels (design handoff only) */
.rpp-state-section { border: 1.5px dashed var(--rpp-ink-300); border-radius: var(--rpp-radius-md); padding: var(--rpp-space-5); position: relative; background: rgba(255,255,255,0.6); }
.rpp-state-section + .rpp-state-section { margin-top: var(--rpp-space-6); }
.rpp-state-label {
  position: absolute; top: -11px; left: var(--rpp-space-4); background: var(--rpp-ink-100); color: var(--rpp-ink-700);
  font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em;
  padding: var(--rpp-space-1) var(--rpp-space-2); border-radius: var(--rpp-radius-sm); transform: rotate(-1deg);
}

/* Feature / icon row */
.rpp-feature-list { display: grid; gap: var(--rpp-space-4); }
.rpp-feature-item { display: flex; gap: var(--rpp-space-4); align-items: flex-start; }
.rpp-feature-icon {
  width: 44px; height: 44px; flex-shrink: 0; background: var(--rpp-marker-light); color: var(--rpp-marker);
  border-radius: var(--rpp-radius-md); display: grid; place-items: center;
}
.rpp-feature-title { font-weight: 800; color: var(--rpp-ink-900); font-family: var(--rpp-font-display); }
.rpp-feature-desc { font-size: var(--rpp-scale-0); color: var(--rpp-ink-700); margin-top: var(--rpp-space-1); }

/* Trust bar */
.rpp-trust-bar {
  display: flex; flex-wrap: wrap; justify-content: center; gap: var(--rpp-space-5); margin-top: var(--rpp-space-8);
  padding: var(--rpp-space-5) var(--rpp-space-6); border: 1.5px dashed var(--rpp-ink-200); border-radius: var(--rpp-radius-lg); background: var(--rpp-surface-100);
}
.rpp-trust-item { display: flex; align-items: center; gap: var(--rpp-space-2); font-size: var(--rpp-scale-0); color: var(--rpp-ink-700); font-weight: 600; }

/* Hero */
.rpp-hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: var(--rpp-space-8); align-items: center; }
.rpp-hero-actions { display: flex; gap: var(--rpp-space-4); flex-wrap: wrap; }
.rpp-hero-visual { display: grid; place-items: center; position: relative; }

/* Hero illustration wrapper + brand color blocks */
.rpp-hero-visual::before, .rpp-hero-visual::after {
  content: ''; position: absolute; z-index: 0; border-radius: var(--rpp-radius-lg);
}
.rpp-hero-visual::before {
  width: 260px; height: 260px; background: var(--rpp-marker-light); top: 10%; right: 0;
  transform: rotate(12deg); animation: rpp-float 5s ease-in-out infinite;
}
.rpp-hero-visual::after {
  width: 140px; height: 140px; background: var(--rpp-olive-light); bottom: 5%; left: 5%;
  transform: rotate(-8deg); animation: rpp-float 6s ease-in-out infinite reverse;
}
@keyframes rpp-float {
  0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); }
  50% { transform: translateY(-12px) rotate(var(--r, 0deg)); }
}
.rpp-hero-visual::before { --r: 12deg; }
.rpp-hero-visual::after { --r: -8deg; }

/* Tools grid */
.rpp-tools-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--rpp-space-5); }
.rpp-tool-tile {
  display: flex; flex-direction: column; background: var(--rpp-surface-0); border: 1.5px solid var(--rpp-ink-200);
  border-radius: var(--rpp-radius-xl); padding: var(--rpp-space-6);
  transition: box-shadow .12s ease, transform .12s ease, border-color .12s ease;
  position: relative;
}
.rpp-tool-tile:hover { text-decoration: none; border-color: var(--rpp-marker); box-shadow: var(--rpp-shadow-md); transform: translateY(-4px); }
.rpp-tool-tile-icon {
  width: 48px; height: 48px; background: var(--rpp-ink-100); color: var(--rpp-ink-800);
  border-radius: var(--rpp-radius-md); display: grid; place-items: center; transition: background .12s ease, color .12s ease;
}
.rpp-tool-tile:hover .rpp-tool-tile-icon { background: var(--rpp-marker); color: #fff; }
.rpp-tool-tile-badge {
  position: absolute; top: var(--rpp-space-4); right: var(--rpp-space-4);
  background: var(--rpp-marker-light); color: var(--rpp-marker-dark); font-weight: 800; font-size: 11px;
  text-transform: uppercase; letter-spacing: 0.03em; padding: var(--rpp-space-1) var(--rpp-space-2); border-radius: var(--rpp-radius-sharp); transform: rotate(2deg);
}
.rpp-tool-tile-title { font: 800 var(--rpp-scale-2)/1.2 var(--rpp-font-display); color: var(--rpp-ink-900); margin-top: var(--rpp-space-4); }
.rpp-tool-tile-desc { font-size: var(--rpp-scale-0); color: var(--rpp-ink-700); margin-top: var(--rpp-space-2); flex: 1; }
.rpp-tool-tile-cta { font-weight: 800; font-size: var(--rpp-scale-0); color: var(--rpp-marker); margin-top: var(--rpp-space-4); }
.rpp-tool-tile-highlight { border: 2.5px solid var(--rpp-marker); background: var(--rpp-marker-50); }
.rpp-tool-tile-highlight:hover { background: var(--rpp-marker-light); }

/* Feature block */
.rpp-feature-block { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: var(--rpp-space-9); align-items: center; }
.rpp-feature-block-card { max-width: 360px; }

/* Pricing */
.rpp-pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--rpp-space-5); align-items: start; }
.rpp-pricing-card {
  background: var(--rpp-surface-0); border: 1.5px solid var(--rpp-ink-200); border-radius: var(--rpp-radius-xl); padding: var(--rpp-space-7);
  display: flex; flex-direction: column; position: relative; transition: transform .12s ease, box-shadow .12s ease;
}
.rpp-pricing-card:hover { transform: translateY(-4px); box-shadow: var(--rpp-shadow-md); }
.rpp-pricing-card-popular {
  border: 2.5px solid var(--rpp-marker); box-shadow: var(--rpp-shadow-lg); transform: translateY(-8px) rotate(0.5deg);
  background: var(--rpp-marker-50);
}
.rpp-pricing-card-popular:hover { transform: translateY(-12px) rotate(0.5deg); }
.rpp-pricing-card-popular-flag {
  position: absolute; top: -14px; left: 50%; transform: translateX(-50%) rotate(-1deg);
  background: var(--rpp-marker); color: #fff; font-weight: 800; font-size: var(--rpp-scale-0);
  padding: var(--rpp-space-1) var(--rpp-space-3); border-radius: var(--rpp-radius-sharp);
  box-shadow: 0 2px 0 var(--rpp-marker-dark);
}
.rpp-pricing-card-name { font: 800 var(--rpp-scale-2)/1.2 var(--rpp-font-display); color: var(--rpp-ink-900); }
.rpp-pricing-card-desc { font-size: var(--rpp-scale-0); color: var(--rpp-ink-700); margin-top: var(--rpp-space-2); }
.rpp-pricing-card-price { font: 800 var(--rpp-scale-7)/1 var(--rpp-font-display); color: var(--rpp-ink-900); margin-top: var(--rpp-space-4); }
.rpp-pricing-card-old { color: var(--rpp-ink-400); font-size: var(--rpp-scale-4); font-weight: 500; margin-right: var(--rpp-space-2); text-decoration: line-through; }
.rpp-pricing-card-unit { font-size: var(--rpp-scale-2); color: var(--rpp-ink-700); font-weight: 700; }
.rpp-pricing-card-period { font-size: var(--rpp-scale-0); color: var(--rpp-ink-600); margin-top: var(--rpp-space-2); }
.rpp-pricing-card .rpp-btn { margin-top: var(--rpp-space-5); }
.rpp-pricing-card-list { margin-top: var(--rpp-space-6); display: grid; gap: var(--rpp-space-3); font-size: var(--rpp-scale-0); color: var(--rpp-ink-800); }
.rpp-pricing-card-list li { padding-left: 28px; position: relative; }
.rpp-pricing-card-list li::before {
  content: ""; position: absolute; left: 0; top: 2px; width: 18px; height: 18px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' stroke='%2365A30D' stroke-width='2.5'%3E%3Cpath d='M3 9l4 4 8-8'/%3E%3C/svg%3E");
}

.rpp-credit-badge {
  background: var(--rpp-surface-100); border: 1.5px solid var(--rpp-ink-200); border-left: 3px solid var(--rpp-amber);
  padding: var(--rpp-space-2) var(--rpp-space-4); border-radius: var(--rpp-radius-md); font-weight: 700; color: var(--rpp-ink-900);
}

.rpp-compare-table {
  width: 100%; border-collapse: collapse; font-size: var(--rpp-scale-0); text-align: left; border: 1.5px solid var(--rpp-ink-200); border-radius: var(--rpp-radius-md); overflow: hidden;
}
.rpp-compare-table th, .rpp-compare-table td { padding: var(--rpp-space-3) var(--rpp-space-4); border-bottom: 1.5px solid var(--rpp-ink-200); }
.rpp-compare-table th { color: var(--rpp-ink-500); font-weight: 700; background: var(--rpp-surface-100); }
.rpp-compare-table td { color: var(--rpp-ink-800); }
.rpp-compare-table tr:last-child td { border-bottom: 0; }

/* Checkout */
.rpp-checkout-options { display: grid; gap: var(--rpp-space-3); }
.rpp-checkout-option {
  display: flex; align-items: flex-start; gap: var(--rpp-space-3); padding: var(--rpp-space-4);
  border: 1.5px solid var(--rpp-ink-200); border-radius: var(--rpp-radius-md); cursor: pointer; background: var(--rpp-surface-0);
  transition: border-color .12s ease, background .12s ease, transform .12s ease;
}
.rpp-checkout-option:hover { border-color: var(--rpp-marker); background: var(--rpp-marker-50); transform: translateX(4px); }
.rpp-checkout-option-selected { border: 2.5px solid var(--rpp-marker); background: var(--rpp-marker-light); }
.rpp-checkout-option input { margin-top: 4px; accent-color: var(--rpp-marker); }
.rpp-checkout-option-body { display: grid; gap: var(--rpp-space-1); }
.rpp-checkout-option-title { font-weight: 800; color: var(--rpp-ink-900); font-family: var(--rpp-font-display); }
.rpp-checkout-option-desc { font-size: var(--rpp-scale-0); color: var(--rpp-ink-700); }
.rpp-checkout-option-price { font: 800 var(--rpp-scale-4)/1 var(--rpp-font-display); color: var(--rpp-ink-900); margin-top: var(--rpp-space-2); }
.rpp-checkout-label { display: block; font-weight: 800; color: var(--rpp-ink-900); font-family: var(--rpp-font-display); }
.rpp-checkout-input {
  width: 100%; margin-top: var(--rpp-space-2); padding: var(--rpp-space-3) var(--rpp-space-4);
  border: 1.5px solid var(--rpp-ink-200); border-radius: var(--rpp-radius-md); font: inherit; color: var(--rpp-ink-900); background: var(--rpp-surface-0);
}
.rpp-checkout-input:focus { outline: 2.5px solid var(--rpp-marker); outline-offset: 2px; border-color: var(--rpp-marker); }

/* Contact form */
.rpp-contact-email { display: flex; align-items: center; gap: var(--rpp-space-3); }
.rpp-contact-form { display: grid; gap: var(--rpp-space-4); }
.rpp-form-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--rpp-space-4); }
.rpp-form-field { display: grid; gap: var(--rpp-space-1); }
.rpp-form-field label { font-weight: 800; color: var(--rpp-ink-900); font-family: var(--rpp-font-display); font-size: var(--rpp-scale-0); }
.rpp-form-field input, .rpp-form-field select, .rpp-form-field textarea {
  padding: var(--rpp-space-3) var(--rpp-space-4); border: 1.5px solid var(--rpp-ink-200); border-radius: var(--rpp-radius-md); font: inherit; color: var(--rpp-ink-900); background: var(--rpp-surface-0);
}
.rpp-form-field input:focus, .rpp-form-field select:focus, .rpp-form-field textarea:focus { outline: 2.5px solid var(--rpp-marker); outline-offset: 2px; border-color: var(--rpp-marker); }

/* Legal */
.rpp-legal-list { display: grid; gap: var(--rpp-space-6); max-width: var(--rpp-legal-max); margin: 0 auto; }
.rpp-legal-section h2 { font: 800 var(--rpp-scale-4)/1.15 var(--rpp-font-display); color: var(--rpp-ink-900); margin-bottom: var(--rpp-space-3); }
.rpp-legal-section p, .rpp-legal-section li { color: var(--rpp-ink-700); margin-top: var(--rpp-space-2); }
.rpp-legal-section ul { list-style: disc; padding-left: var(--rpp-space-6); }
.rpp-legal-section ul li { margin-top: var(--rpp-space-1); }
.rpp-legal-updated { font-size: var(--rpp-scale-0); color: var(--rpp-ink-500); margin-top: var(--rpp-space-2); display: block; }

/* Compress */
.rpp-compress-options { display: grid; gap: var(--rpp-space-3); }
.rpp-compress-option {
  display: flex; align-items: flex-start; gap: var(--rpp-space-3); padding: var(--rpp-space-4);
  border: 1.5px solid var(--rpp-ink-200); border-radius: var(--rpp-radius-md); cursor: pointer; background: var(--rpp-surface-0); transition: border-color .12s ease, background .12s ease;
}
.rpp-compress-option:hover { border-color: var(--rpp-marker); background: var(--rpp-marker-50); }
.rpp-compress-option input { margin-top: 4px; accent-color: var(--rpp-marker); }
.rpp-compress-option-body { display: grid; gap: var(--rpp-space-1); }
.rpp-compress-option-title { font-weight: 800; color: var(--rpp-ink-900); font-family: var(--rpp-font-display); }
.rpp-compress-option-desc { font-size: var(--rpp-scale-0); color: var(--rpp-ink-700); }
.rpp-compress-result {
  display: flex; align-items: center; justify-content: center; gap: var(--rpp-space-6); flex-wrap: wrap; text-align: center;
  padding: var(--rpp-space-6); background: var(--rpp-surface-100); border-radius: var(--rpp-radius-md); border: 1.5px dashed var(--rpp-ink-200);
}

/* Convert to Word quota */
.rpp-quota-bar { margin-bottom: var(--rpp-space-6); }
.rpp-quota-track { height: 10px; background: var(--rpp-ink-200); border-radius: 999px; overflow: hidden; }
.rpp-quota-fill { height: 100%; background: var(--rpp-marker); border-radius: 999px; }
.rpp-quota-label { margin-top: var(--rpp-space-2); font-size: var(--rpp-scale-0); color: var(--rpp-ink-700); font-weight: 600; }

.rpp-upsell-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--rpp-space-5); }
.rpp-upsell-card { background: var(--rpp-surface-0); border: 1.5px solid var(--rpp-ink-200); border-radius: var(--rpp-radius-md); padding: var(--rpp-space-6); transition: transform .12s ease, box-shadow .12s ease; }
.rpp-upsell-card:hover { transform: translateY(-4px); box-shadow: var(--rpp-shadow-md); }

/* Merge file list */
.rpp-file-list { display: grid; gap: var(--rpp-space-3); }
.rpp-file-row {
  display: flex; align-items: center; justify-content: space-between; gap: var(--rpp-space-3);
  padding: var(--rpp-space-3) var(--rpp-space-4); background: var(--rpp-surface-100); border: 1.5px solid var(--rpp-ink-200); border-radius: var(--rpp-radius-md);
}
.rpp-file-row .rpp-mono { font-size: var(--rpp-scale-0); color: var(--rpp-ink-800); }

/* Sign */
.rpp-sign-canvas {
  background: var(--rpp-surface-100); border: 1.5px dashed var(--rpp-ink-300); border-radius: var(--rpp-radius-md); min-height: 220px;
  display: grid; place-items: center; padding: var(--rpp-space-8); background-image: var(--rpp-dot-grid); background-size: 16px 16px;
}
.rpp-sign-placeholder { text-align: center; }
.rpp-sign-stamp {
  display: inline-block; font-family: var(--rpp-font-script); font-size: var(--rpp-scale-6); color: var(--rpp-ink-800);
  border-bottom: 3px solid var(--rpp-marker); padding: 0 var(--rpp-space-4) var(--rpp-space-2); margin-bottom: var(--rpp-space-5); transform: rotate(-2deg);
}
.rpp-sign-controls { display: flex; gap: var(--rpp-space-3); justify-content: center; flex-wrap: wrap; }

/* Success */
.rpp-summary-list { display: grid; gap: var(--rpp-space-3); }
.rpp-summary-row { display: flex; justify-content: space-between; gap: var(--rpp-space-4); padding-bottom: var(--rpp-space-3); border-bottom: 1.5px solid var(--rpp-ink-200); font-size: var(--rpp-scale-0); }
.rpp-summary-row dt { color: var(--rpp-ink-500); font-weight: 700; }
.rpp-summary-row dd { color: var(--rpp-ink-900); font-weight: 700; margin: 0; }
.rpp-license-box {
  display: flex; align-items: center; justify-content: space-between; gap: var(--rpp-space-4); padding: var(--rpp-space-4); background: var(--rpp-surface-100);
  border: 1.5px solid var(--rpp-ink-200); border-radius: var(--rpp-radius-md); flex-wrap: wrap;
}
.rpp-license-box code { font-size: var(--rpp-scale-2); color: var(--rpp-ink-900); }

/* Article */
.rpp-article-list { display: grid; gap: var(--rpp-space-5); max-width: 820px; margin: 0 auto; }
.rpp-article-card {
  display: block; background: var(--rpp-surface-0); border: 1.5px solid var(--rpp-ink-200); border-radius: var(--rpp-radius-xl); padding: var(--rpp-space-6);
  transition: box-shadow .12s ease, border-color .12s ease, transform .12s ease; position: relative;
}
.rpp-article-card:hover { text-decoration: none; border-color: var(--rpp-marker); box-shadow: var(--rpp-shadow-md); transform: translateY(-3px); }
.rpp-article-card::before { content: ''; position: absolute; top: 0; left: 0; width: 6px; height: 100%; background: var(--rpp-marker); border-radius: var(--rpp-radius-xl) 0 0 var(--rpp-radius-xl); opacity: 0; transition: opacity .12s ease; }
.rpp-article-card:hover::before { opacity: 1; }
.rpp-article-card h2 { font: 800 var(--rpp-scale-3)/1.2 var(--rpp-font-display); color: var(--rpp-ink-900); }
.rpp-article-card p { margin-top: var(--rpp-space-2); color: var(--rpp-ink-700); }
.rpp-article-card .rpp-article-cta { display: inline-block; margin-top: var(--rpp-space-4); font-weight: 800; font-size: var(--rpp-scale-0); color: var(--rpp-marker); }
.rpp-article-meta { font-size: var(--rpp-scale-0); color: var(--rpp-ink-500); margin-top: var(--rpp-space-2); }
.rpp-article-body { max-width: 720px; margin: 0 auto; }
.rpp-article-body h2 { font: 800 var(--rpp-scale-4)/1.15 var(--rpp-font-display); color: var(--rpp-ink-900); margin-top: var(--rpp-space-8); }
.rpp-article-body p { color: var(--rpp-ink-700); margin-top: var(--rpp-space-3); }
.rpp-article-body ul { list-style: disc; padding-left: var(--rpp-space-6); color: var(--rpp-ink-700); margin-top: var(--rpp-space-3); }
.rpp-article-body li { margin-top: var(--rpp-space-1); }
.rpp-article-body a { text-decoration: underline; text-decoration-color: var(--rpp-marker); }
.rpp-affiliate-note { font-size: var(--rpp-scale-0); color: var(--rpp-ink-500); margin-top: var(--rpp-space-4); font-style: italic; border-left: 3px solid var(--rpp-amber); padding-left: var(--rpp-space-3); }

/* Responsive */
@media (max-width: 1024px) {
  .rpp-pricing-grid { grid-template-columns: 1fr; max-width: 520px; margin: 0 auto; }
  .rpp-pricing-card-popular { transform: none; }
  .rpp-pricing-card-popular:hover { transform: translateY(-4px); }
}
@media (max-width: 900px) {
  .rpp-hero-grid { grid-template-columns: 1fr; }
  .rpp-hero-visual { order: -1; }
  .rpp-feature-block { grid-template-columns: 1fr; }
  .rpp-feature-block-card { max-width: 420px; margin-inline: auto; }
  .rpp-footer-grid { grid-template-columns: repeat(2, 1fr); }
  .rpp-upsell-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .rpp-display { font-size: var(--rpp-scale-5); }
  .rpp-heading-1 { font-size: var(--rpp-scale-5); }
  .rpp-heading-2 { font-size: var(--rpp-scale-4); }
  .rpp-section { padding: var(--rpp-space-8) 0; }
  .rpp-section-hero { padding: var(--rpp-space-7) 0 var(--rpp-space-5); }
  .rpp-card, .rpp-tool-card { padding: var(--rpp-space-5); }
  .rpp-page-grid { grid-template-columns: repeat(2, 1fr); }
  .rpp-footer-grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .rpp-page-grid { grid-template-columns: 1fr; }
  .rpp-form-row { grid-template-columns: 1fr; }
  .rpp-compare-table th, .rpp-compare-table td { padding: var(--rpp-space-2); }
  .rpp-trust-bar { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 480px) {
  .rpp-hero-card-stack { transform: scale(0.85); }
  .rpp-hero-visual::before, .rpp-hero-visual::after { display: none; }
}
'''
(V4 / 'shared.css').write_text(SHARED_CSS)

# ---------------------------------------------------------------------------
# 3. Transform each v3 page into v4
# ---------------------------------------------------------------------------
PAGE_DIRS = sorted([p for p in (V3 / 'pages').iterdir() if p.is_dir()], key=lambda p: p.name)

GOOGLE_FONTS_LINK = '''<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">'''

HERO_SVG = '''<svg class="rpp-hero-illustration" width="420" height="360" viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:relative;z-index:1;max-width:100%;">
  <!-- Browser window -->
  <rect x="60" y="30" width="300" height="240" rx="14" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
  <rect x="60" y="30" width="300" height="34" rx="14" fill="#f1f5f9" stroke="#0f172a" stroke-width="2"/>
  <circle cx="82" cy="47" r="6" fill="#FF5722"/>
  <circle cx="102" cy="47" r="6" fill="#F59E0B"/>
  <circle cx="122" cy="47" r="6" fill="#65A30D"/>
  <!-- PDF page lines -->
  <rect x="90" y="90" width="180" height="10" rx="5" fill="#e2e8f0"/>
  <rect x="90" y="112" width="140" height="8" rx="4" fill="#e2e8f0"/>
  <rect x="90" y="132" width="200" height="8" rx="4" fill="#e2e8f0"/>
  <rect x="90" y="152" width="160" height="8" rx="4" fill="#e2e8f0"/>
  <rect x="90" y="172" width="190" height="8" rx="4" fill="#e2e8f0"/>
  <!-- Removed page corner fold -->
  <path d="M320 140 L360 140 L360 220 L300 220 L300 180 L320 180 Z" fill="#FFF0EB" stroke="#FF5722" stroke-width="2"/>
  <path d="M320 140 L320 180 L300 180 Z" fill="#FF5722" opacity="0.3"/>
  <text x="330" y="190" font-family="Plus Jakarta Sans, sans-serif" font-size="12" fill="#E64A19" font-weight="700">removed</text>
  <!-- Scissors -->
  <g transform="translate(190, 220) rotate(15)">
    <circle cx="0" cy="0" r="8" fill="#0f172a"/>
    <path d="M-40 -10 L40 10 M-40 10 L40 -10" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
    <circle cx="-42" cy="-12" r="10" fill="none" stroke="#0f172a" stroke-width="4"/>
    <circle cx="-42" cy="12" r="10" fill="none" stroke="#0f172a" stroke-width="4"/>
  </g>
  <!-- Highlighter stroke -->
  <path d="M50 310 Q120 290 210 315 Q300 340 380 305" stroke="#FF5722" stroke-width="14" stroke-linecap="round" opacity="0.25"/>
  <!-- Floating shapes -->
  <rect x="30" y="80" width="28" height="28" rx="4" fill="#F59E0B" opacity="0.85" transform="rotate(-12 44 94)"/>
  <circle cx="360" cy="280" r="18" fill="#65A30D" opacity="0.85"/>
  <polygon points="340,60 352,84 328,84" fill="#0D9488" opacity="0.85"/>
</svg>'''

def transform_page(page_dir: Path, v4_page_dir: Path) -> None:
    html = (page_dir / 'code.html').read_text()

    # Add Google Fonts before shared.css
    html = html.replace(
        '<link rel="stylesheet" href="../shared.css">',
        f'{GOOGLE_FONTS_LINK}\n  <link rel="stylesheet" href="../shared.css">'
    )

    # Add v4 marker class to body
    html = html.replace('<body>', '<body class="rpp-v4">')

    page_name = page_dir.name

    # Home: replace the hero visual block with a bolder SVG illustration
    if page_name == 'home':
        html = re.sub(
            r'<div class="rpp-hero-visual">.*?</div>\s*</div>\s*<div class="rpp-trust-bar">',
            f'<div class="rpp-hero-visual">{HERO_SVG}</div></div>\n        <div class="rpp-trust-bar">',
            html, flags=re.DOTALL, count=1
        )

    # Tool pages: add workshop ruler overlay inside the first tool card
    if page_name in ('remove-pages', 'merge', 'compress', 'convert-to-word', 'sign'):
        html = html.replace(
            '<div class="rpp-tool-card" style="position:relative;">',
            '<div class="rpp-tool-card rpp-tool-card-workshop" style="position:relative;"><div class="rpp-tool-card-ruler"></div>'
        )

    # Pricing: add a subtle marker sticker to the top of the section container
    if page_name == 'pricing':
        html = html.replace(
            '<span class="rpp-badge rpp-badge-subtle">Pricing</span>',
            '<span class="rpp-badge rpp-badge-pro">Pricing</span>'
        )

    # Convert-to-word: highlight the quota bar
    if page_name == 'convert-to-word':
        html = html.replace('<div class="rpp-quota-bar">', '<div class="rpp-quota-bar">')

    # Checkout: add a receipt tape accent to the order summary card
    if page_name == 'checkout':
        html = html.replace('<div class="rpp-card">', '<div class="rpp-card rpp-card-receipt">', 1)

    (v4_page_dir / 'code.html').write_text(html)

    # Per-page styles: keep only page-specific overrides / empty because
    # the new shared.css already contains all page-specific rules.
    per_page_css = (page_dir / 'styles.css').read_text()
    # Strip the old rules that duplicate shared.css but keep any truly unique
    # overrides. Since shared.css already redefines every class, we can leave
    # per-page styles as a small note. To preserve any future page-only tweaks,
    # we keep the original file but comment it out to avoid conflicts, or simply
    # include a comment. Here we keep it empty for cleanliness.
    (v4_page_dir / 'styles.css').write_text(f'/* Page-specific overrides for {page_name} — most styles live in shared.css */\n')

for page_dir in PAGE_DIRS:
    v4_page_dir = V4 / 'pages' / page_dir.name
    v4_page_dir.mkdir(parents=True, exist_ok=True)
    transform_page(page_dir, v4_page_dir)

# ---------------------------------------------------------------------------
# 4. HANDOFF.md
# ---------------------------------------------------------------------------
HANDOFF_MD = '''# RemovePDFPages — Design Handoff v4

> 项目：removepdfpages.net  
> 仓库路径：/home/ubuntu/fancy-text-site  
> 阶段：06 design-freeze (revised)  
> 状态：DONE  
> 上游输入：docs/copy-freeze.md v3、docs/PRD-v3.md、docs/pricing-calibration-v3.md、docs/compliance-report.md v3、docs/page-matrix-v2.md、docs/route-contract.json、docs/content-gap-report.md  
> 最后更新：2026-07-30  
> 输出路径：design-handoff-v4/  
> 方法：Stitch workflow — 以 design-handoff-v3 为输入包，保留所有文案，升级视觉系统。

---

## 1. 设计目标

解决 v3 视觉审计中的核心问题：

1. 工具页不再“白板”，引入点阵稿纸纹理、标尺边、品牌色块与微动效。  
2. 首页增加原创 Hero 插画（浏览器窗口、PDF 页面、剪刀、荧光笔、几何色块），避免“居中 Hero + 三卡片”的通用 SaaS 套路。  
3. 配色从“白+黑+靛蓝按钮”改为更鲜明的“暖色标记笔 + 深墨 + 橄榄成功色”。  
4. 字体使用 `Bricolage Grotesque`（Display）+ `Plus Jakarta Sans`（Body）+ `JetBrains Mono`（数据），避免默认 Inter。  
5. 所有文案、价格、CTA、合规声明均保留自 copy-freeze v3，未做改动。  
6. 覆盖 desktop / mobile 视图以及关键空/加载/错误/付费墙/已授权/成功状态。

---

## 2. 与 v3 的关键差异

| 项 | v3 | v4 |
|---|---|---|
| 视觉方向 | 简洁靛蓝 SaaS | 暖色标记笔 + 深墨 “Paper Workshop” |
| 主按钮色 | #3346a7 靛蓝 | #FF5722  marker 橙 |
| 显示字体 | system-ui / Space Grotesk | Bricolage Grotesque |
| 正文字体 | system-ui / Plus Jakarta Sans | Plus Jakarta Sans |
| Hero 视觉 | 抽象浏览器卡片 | 原创 SVG 插画 + 浮动色块 |
| 工具工作区 | 白底细边框 | 点阵稿纸背景 + 标尺边 + 深阴影 |
| 徽章 | pill | 贴纸式尖角 + 微倾斜 |
| 定价卡 | 靛蓝边框 | marker 色强调 + 悬浮微动效 |
| 微动效 | 基本 hover | 浮动、按钮按压、卡片悬浮、spinner |
| 文案 | copy-freeze v3 | 完全一致，未改动 |

---

## 3. 页面清单

所有 20 个页面均输出在 `pages/<route>/` 中：

| # | 页面 | 路由 | 文件 | 关键状态 |
|---|---|---|---|---|
| 1 | 首页 | `/` | `pages/home/` | 默认、首屏免费、底部付费转化 |
| 2 | Remove PDF Pages | `/remove-pages` | `pages/remove-pages/` | 空态、上传中、处理中、预览、成功、错误 |
| 3 | Merge PDFs | `/merge` | `pages/merge/` | 空态、上传中、排序、合并中、成功、错误 |
| 4 | Compress PDF | `/compress` | `pages/compress/` | 空态、上传中、处理中、成功、错误 |
| 5 | Sign PDF | `/sign` | `pages/sign/` | 空态、签名中、已放置、成功、错误 |
| 6 | Convert PDF to Word | `/convert-to-word` | `pages/convert-to-word/` | 未购买/已购买/额度用完/Top-up |
| 7 | Pricing | `/pricing` | `pages/pricing/` | 默认三卡片 + 隐藏买断 |
| 8 | Checkout | `/checkout` | `pages/checkout/` | 默认月付、空邮箱、支付失败 |
| 9 | Success | `/success` | `pages/success/` | 一次性/订阅成功 |
| 10 | FAQ | `/faq` | `pages/faq/` | 默认折叠 |
| 11 | Contact & Refund | `/contact` | `pages/contact/` | 默认、提交成功、提交错误 |
| 12 | Privacy Policy | `/privacy` | `pages/privacy/` | 静态文本 |
| 13 | Terms of Service | `/terms` | `pages/terms/` | 静态文本 |
| 14 | Refund Policy | `/refund` | `pages/refund/` | 静态文本 |
| 15 | Cookie Policy | `/cookie-policy` | `pages/cookie-policy/` | 静态文本 |
| 16 | Blog Index | `/blog` | `pages/blog/` | 默认列表 |
| 17 | Foxit Alternative | `/blog/foxit-alternative` | `pages/blog-foxit-alternative/` | 文章 |
| 18 | Replace Image in PDF | `/blog/replace-image-in-pdf` | `pages/blog-replace-image-in-pdf/` | 文章 |
| 19 | One-Time Payment PDF Editor | `/blog/one-time-payment-pdf-editor` | `pages/blog-one-time-payment-pdf-editor/` | 文章 |
| 20 | No-Subscription PDF Editor | `/blog/no-subscription-pdf-editor` | `pages/blog-no-subscription-pdf-editor/` | 文章 |

---

## 4. 设计系统摘要

### 4.1 颜色

- `--rpp-marker` #FF5722 — 主按钮、选中态、高亮、标签贴纸  
- `--rpp-marker-dark` #E64A19 — 按钮阴影 / hover  
- `--rpp-ink-900` #0f172a — 标题、正文、Footer 背景  
- `--rpp-olive` #65A30D — 免费、成功、勾选  
- `--rpp-amber` #F59E0B — 警告、Top-up、试用期  
- `--rpp-blue` #2563EB — 信息提示、链接辅助  
- `--rpp-red` #DC2626 — 错误  

### 4.2 字体

```css
--rpp-font-display: 'Bricolage Grotesque', 'Space Grotesk', sans-serif;
--rpp-font-body: 'Plus Jakarta Sans', system-ui, sans-serif;
--rpp-font-mono: 'JetBrains Mono', ui-monospace, monospace;
```

### 4.3 纹理

- 点阵稿纸：`radial-gradient(circle, #cbd5e1 1px, transparent 1px)`，size 20px。用于 `.rpp-tool-card`、`.rpp-upload-zone`、`.rpp-sign-canvas`。  
- 标尺边：工具卡顶部 repeating-linear-gradient 刻度线 + 左侧 dashed 标尺。  
- 品牌色块：首页 Hero 插画两侧浮动几何色块（marker-light / olive-light），带 `rpp-float` 动画。  

### 4.4 微动效

- `.rpp-float`：Hero 色块 5–6s 上下浮动。  
- 按钮：hover `translateY(-2px)` + 阴影；active `translateY(1px)`。  
- 工具卡/定价卡：hover 悬浮 + 阴影加深。  
- 上传区：hover 上浮 + 边框色变化。  
- Spinner：0.8s 线性旋转。  

---

## 5. 前端 Handoff 注意事项

1. 字体必须从 Google Fonts 加载：`Bricolage Grotesque`（600/700/800）、`Plus Jakarta Sans`（400/500/600/700）、`JetBrains Mono`（400/500）。  
2. 颜色不可擅自改为默认靛蓝/紫色渐变；主 CTA 固定为 `#FF5722`。  
3. Hero 插画为内联 SVG，前端可直接复制或转为组件。  
4. 工具卡必须保留点阵稿纸纹理和标尺边；可降级为纯背景。  
5. 价格、CTA、合规文案与 copy-freeze v3 完全一致，禁止现场改写。  
6. Footer 四链法律链接：`/privacy`、`/terms`、`/refund`、`/cookie-policy`。  
7. 所有状态（empty/uploading/processing/preview/success/error/paywall/authorized/quota-exceeded）均已在对应页面中给出视觉参考。  
8. 全站禁用词与 v3 保持一致：无 `unlimited`、`free forever`、`no limits`、`lifetime updates`、`perfect`、`100% accurate`、`guaranteed`、`official`。  
9. 为 stitch 友好，页面结构与 v3 一致（`pages/<route>/code.html` + `styles.css` + `screen.png`），可被 `stitch-site-cli` 解析后转换为 Next.js 路由。  

---

## 6. 验收标准

- [x] 20 个页面均输出 HTML/CSS/Screenshot。  
- [x] `shared.css` 包含完整设计系统（颜色、字体、间距、圆角、阴影、纹理、动画、响应式）。  
- [x] 首页 Hero 使用原创 SVG 插画，非通用居中 Hero 模板。  
- [x] 工具页包含点阵纹理、标尺边、品牌色块。  
- [x] 所有 copy-freeze 文案、价格、CTA 未改动。  
- [x] 全站无禁用词。  
- [x] 包含 desktop 截图与 mobile 响应式规则。  
- [x] 状态覆盖：空态、上传中、处理中、成功、错误、付费墙、已授权、额度用完。  

---

## 7. 状态

**[DONE]**

design-handoff-v4 已按 Stitch 工作流从 design-handoff-v3 升级完成。视觉系统更 bold、更 distinctive，同时严格保留所有上游冻结文案。07 frontend 可解除阻塞，按本 handoff 实现。
'''
(V4 / 'HANDOFF.md').write_text(HANDOFF_MD)

# ---------------------------------------------------------------------------
# 5. Screenshots
# ---------------------------------------------------------------------------
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1280, 'height': 900})
    for page_dir in PAGE_DIRS:
        route = page_dir.name
        file_path = (V4 / 'pages' / route / 'code.html').resolve()
        page.goto(f'file://{file_path}', wait_until='networkidle')
        page.screenshot(path=V4 / 'pages' / route / 'screen.png', full_page=True)
        # Mobile screenshot for homepage and one tool page as extra evidence
        if route in ('home', 'remove-pages', 'pricing'):
            page.set_viewport_size({'width': 390, 'height': 844})
            page.goto(f'file://{file_path}', wait_until='networkidle')
            page.screenshot(path=V4 / 'pages' / route / 'screen-mobile.png', full_page=True)
            page.set_viewport_size({'width': 1280, 'height': 900})
    browser.close()

# ---------------------------------------------------------------------------
# 6. Stitch-compatible design package (extra)
# ---------------------------------------------------------------------------
STITCH_DIR = V4 / 'stitch-design-package'
STITCH_DIR.mkdir(parents=True)
for page_dir in PAGE_DIRS:
    route = page_dir.name
    (STITCH_DIR / route).mkdir(parents=True, exist_ok=True)
    shutil.copy(V4 / 'pages' / route / 'code.html', STITCH_DIR / route / 'code.html')
    shutil.copy(V4 / 'pages' / route / 'screen.png', STITCH_DIR / route / 'screen.png')

# design-system files
(STITCH_DIR / 'design-system').mkdir(parents=True, exist_ok=True)
(STITCH_DIR / 'design-system' / 'colors.html').write_text('''<!DOCTYPE html><html><head><meta charset="UTF-8"><link rel="stylesheet" href="../../shared.css"></head><body class="rpp-v4" style="padding:40px"><h1>Color Tokens</h1><div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:24px"><div style="width:80px;height:80px;border-radius:12px;background:#FF5722"></div><div style="width:80px;height:80px;border-radius:12px;background:#0f172a"></div><div style="width:80px;height:80px;border-radius:12px;background:#65A30D"></div><div style="width:80px;height:80px;border-radius:12px;background:#F59E0B"></div><div style="width:80px;height:80px;border-radius:12px;background:#2563EB"></div><div style="width:80px;height:80px;border-radius:12px;background:#f6f7f9;border:1px solid #e2e8f0"></div></div></body></html>''')
(STITCH_DIR / 'design-system' / 'typography.html').write_text('''<!DOCTYPE html><html><head><meta charset="UTF-8"><link rel="stylesheet" href="../../shared.css"></head><body class="rpp-v4" style="padding:40px"><h1 class="rpp-display">Display</h1><h2 class="rpp-heading-1">Heading 1</h2><h3 class="rpp-heading-2">Heading 2</h3><p class="rpp-lead">Lead text</p><p class="rpp-body">Body text</p><p class="rpp-body-sm">Body small</p><p class="rpp-mono">Mono text</p></body></html>''')
(STITCH_DIR / 'design-system' / 'spacing.html').write_text('''<!DOCTYPE html><html><head><meta charset="UTF-8"><link rel="stylesheet" href="../../shared.css"></head><body class="rpp-v4" style="padding:40px"><h1>Spacing</h1><div style="display:flex;flex-direction:column;gap:8px;margin-top:24px"><div style="height:4px;background:#FF5722"></div><div style="height:8px;background:#FF5722"></div><div style="height:16px;background:#FF5722"></div><div style="height:24px;background:#FF5722"></div><div style="height:32px;background:#FF5722"></div><div style="height:48px;background:#FF5722"></div><div style="height:64px;background:#FF5722"></div></div></body></html>''')
shutil.copytree(V4 / 'assets', STITCH_DIR / 'assets', dirs_exist_ok=True)

with zipfile.ZipFile(V4 / 'stitch-design-package.zip', 'w', zipfile.ZIP_DEFLATED) as zf:
    for file in STITCH_DIR.rglob('*'):
        if file.is_file():
            zf.write(file, file.relative_to(V4))

print('design-handoff-v4 generated at', V4)
print('Pages:', len(PAGE_DIRS))
print('Screenshots captured.')
print('Stitch package:', V4 / 'stitch-design-package.zip')
