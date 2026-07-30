# RemovePDFPages — 07 Frontend Build Log

> Date: 2026-07-30  
> Commit: `777a743` (initial build commit)  
> Follow-up commit after ZIP rebuild and doc updates: TBD

## Build command

```bash
cd /home/ubuntu/fancy-text-site
npm run build
```

## Build result

- Status: ✅ Success
- Next.js version: 16.2.9 (Turbopack)
- TypeScript check: finished without errors
- Static pages generated: 25 worker chunks (22 HTML files + `_not-found` + 404 + text data)

## Dist output

```
HTML files: 22
dist/404.html
dist/_not-found.html
dist/blog.html
dist/blog/foxit-alternative.html
dist/blog/no-subscription-pdf-editor.html
dist/blog/one-time-payment-pdf-editor.html
dist/blog/replace-image-in-pdf.html
dist/checkout.html
dist/compress.html
dist/contact.html
dist/convert-to-word.html
dist/cookie-policy.html
dist/faq.html
dist/index.html
dist/merge.html
dist/pricing.html
dist/privacy.html
dist/refund.html
dist/remove-pages.html
dist/sign.html
dist/success.html
dist/terms.html
```

## Sitemap / robots

- `dist/sitemap.xml`: 18 indexable URLs
- `dist/robots.txt`: disallows `/checkout` and `/success`, references sitemap

## JSON-LD schema fixes

- `dist/pricing.html`: ✅ Product schema with Free / $19/month / $99/year / $59 one-time offers
- `dist/convert-to-word.html`: ✅ SoftwareApplication schema with $19/month Launch Special offer

## Notes

- Rebuilt `design-handoff-v3.zip` from the current `design-handoff-v3/` directory so the design handoff diff gate includes the 20th route (`/cookie-policy`).
- Build re-run after ZIP update and schema injection succeeded.
