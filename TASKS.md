# TASKS.md — thelittlestcto.com

Work tracker for the site rebuild and improvement project.

---

## Current Priority

- [ ] **GitHub Actions CI** — lint + build check on PRs; block merges to `main` without passing build
- [ ] **GDPR / Analytics** — gate GA4 and Clarity behind consent, or replace with privacy-first analytics (Plausible/Fathom)
- [ ] **Privacy Policy page** — required for ConvertKit, GA, Clarity

---

## Backlog

### Infrastructure
- [ ] GitHub Actions CI pipeline (lint → build → deploy preview)
- [ ] Dependabot — automated dependency PRs
- [ ] Branch protection on `main` — require PR + passing CI before merge

### GDPR & Privacy
- [ ] Decide analytics strategy: replace GA+Clarity with Plausible/Fathom, OR add consent banner
- [ ] Add cookie consent banner if keeping GA/Clarity
- [ ] Add Privacy Policy page (required for any third-party data processing)
- [ ] Review ConvertKit data processing — link to privacy policy from newsletter form

### Performance & SEO
- [ ] Add `sitemap.xml` (gatsby-plugin-sitemap)
- [ ] Add `robots.txt`
- [ ] Audit Lighthouse scores — fix any Performance/SEO/Accessibility issues
- [ ] Fix missing `alt` text on any images
- [ ] Fix `[gatsby-plugin-image] Missing image prop` warnings (2 occurrences at build time)
- [ ] Add Open Graph image for homepage (currently no default OG image)
- [ ] Canonical URLs

### Code Quality
- [ ] Convert class components → function components + hooks (all pages and templates currently use class syntax)
- [ ] Remove `lodash` — only used for `get()` which can be replaced with optional chaining (`?.`)
- [ ] Add ESLint + Prettier config
- [ ] Fix missing image prop warnings in `hero.js` / `article-preview.js`

### Bug Fixes
- [ ] Fix LinkedIn URL typo in footer: `hhttps://` → `https://`
- [ ] Audit all footer social links for accuracy

### Content
- [ ] Review and update homepage hero text and bio
- [ ] Review `siteMetadata.description` — used in SEO and should be compelling
- [ ] Review all blog post tags for consistency
- [ ] Consider adding an "About" section to the homepage

### Hosting
- [ ] Evaluate Vercel vs Netlify for Gatsby v5 (Vercel has first-class Gatsby support)
- [ ] Set up preview deploy environments for `development` branch

---

## Completed ✅

### 2026-02-28 — Initial upgrade session

- [x] Cloned repo and audited full codebase
- [x] Added `.env.development` and `.env.production` with Contentful credentials
- [x] **Gatsby v4 → v5 upgrade**
  - [x] Updated: gatsby, gatsby-plugin-image, gatsby-plugin-sharp, gatsby-transformer-sharp, gatsby-source-contentful
  - [x] Removed: gatsby-plugin-react-helmet, react-helmet, gh-pages, gatsby-provision-contentful, reading-time
  - [x] Fixed GraphQL sort syntax on all pages (`fields/order` → object syntax)
  - [x] Replaced `react-helmet` with Gatsby v5 Head API (`export const Head`) on all pages and blog post template
  - [x] Fixed `og:image` URL protocol (`http:` → `https:`)
  - [x] Added Twitter handle (`@axshaw`) to SEO component
  - [x] Added `siteUrl` to `siteMetadata`
  - [x] Updated Node engine requirement `>=14` → `>=20`
- [x] **Rewrote `netlify.toml`** — proper build command, Node 20, security headers, immutable JS cache headers
- [x] **Confirmed build passing** — Gatsby v5 builds clean, all pages generated
- [x] **Rewrote README** — accurate stack, local dev setup, project structure, content model, deployment
- [x] **Added NOTES.md** — architecture decisions, known issues, analytics concerns, removed dependencies
- [x] **Added TASKS.md** — this file
- [x] Deleted stale `WHATS-NEXT.md` (Contentful starter boilerplate)
- [x] Deleted stale `app.json` (Heroku deploy config — not used)
- [x] Deleted stale `static.json` (superseded by `netlify.toml`)
