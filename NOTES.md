# NOTES.md — Architecture Decisions & Known Issues

Running log of decisions, findings, and context for anyone working on this project.

---

## Commit Convention

This project uses [gitmoji](https://gitmoji.dev/) prefixes on all commit messages.

| Gitmoji | Code | When to use |
|---|---|---|
| ⬆️ | `:arrow_up:` | Upgrade dependencies |
| ⬇️ | `:arrow_down:` | Downgrade dependencies |
| 📝 | `:memo:` | Add or update documentation |
| 🔧 | `:wrench:` | Config files |
| ✨ | `:sparkles:` | New feature |
| 🐛 | `:bug:` | Bug fix |
| 🔥 | `:fire:` | Remove code or files |
| ♻️ | `:recycle:` | Refactor |
| 💚 | `:green_heart:` | Fix CI build |
| 👷 | `:construction_worker:` | CI/CD pipeline changes |
| 🔒️ | `:lock:` | Security fixes |
| 🔍️ | `:mag:` | SEO improvements |
| 🎨 | `:art:` | Code structure / formatting |
| ⚡ | `:zap:` | Performance improvements |
| 💥 | `:boom:` | Breaking changes |
| 🚀 | `:rocket:` | Deploy related |
| 🩹 | `:adhesive_bandage:` | Simple/minor fix |
| ⚰️ | `:coffin:` | Remove dead code |
| 🛂 | `:passport_control:` | Auth, privacy, consent |

Full reference: https://gitmoji.dev/

---

## Stack Decisions

### Gatsby v5 (upgraded 2026-02-28)
Upgraded from v4 → v5.
- **Why:** Netlify deprecated legacy prerendering used by v4. v5 ships the Gatsby Head API, better partial hydration, improved build perf.
- **Breaking changes handled:**
  - GraphQL sort syntax: `sort: { fields: [...], order: DESC }` → `sort: { publishDate: DESC }`
  - `react-helmet` removed; replaced with `export const Head` pattern
  - `reading-time` removed (Node stream polyfill issue with Webpack 5); replaced with inline word count (`Math.ceil(words / 200)`)

### Gatsby Head API
Each page/template exports a `Head` component alongside the default. The `Seo` component (`src/components/seo.js`) returns raw meta tags — no Helmet wrapper. This is the Gatsby v5 recommended pattern and avoids hydration issues.

### Contentful as CMS
Content lives in Contentful, fetched at build time via `gatsby-source-contentful`. Content editors don't touch code or git. Contentful webhooks trigger CF Pages rebuilds on publish. Local dev requires `.env.development` with API credentials (never committed).

### CSS Modules
Plain CSS Modules (`.module.css`) co-located with components. No Tailwind, no styled-components. Intentional — keeps things simple.

### Inter Variable Font (self-hosted)
Inter is self-hosted in `/static/fonts/` as WOFF2. Preloaded in the `Seo` component (`<link rel="preload">`) to avoid render-blocking. Only the roman variant is preloaded (italic is rare, deferred).

---

## Hosting Migration: Netlify → Cloudflare Pages (2026-02-28)

**Why moved:**
- Domain already on Cloudflare DNS — seamless integration
- Cloudflare Web Analytics is cookieless and GDPR compliant (no consent banner needed)
- Faster edge network globally
- GitHub Actions gives more control over CI/CD than Netlify's built-in CI

**What changed:**
- CF Pages project: `fantastic-octo-goggles`
- Build command: `npx gatsby build` (not `gatsby build` — CF Pages doesn't install gatsby globally)
- Repo transferred from `thelittlestcto` org → `axshaw` personal account (required for CF Pages org access)
- Local git remote updated to `git@github.com:axshaw/fantastic-octo-goggles.git`
- Netlify env vars migrated to CF Pages dashboard + GitHub Actions secrets
- Cloudflare Web Analytics enabled (auto-injects beacon, no code changes needed)

**DNS:** `thelittlestcto.com` nameservers updated to Cloudflare (`may.ns.cloudflare.com`, `apollo.ns.cloudflare.com`). Propagated ~4 hours after change.

---

## Analytics: GA4 + Clarity Removed (2026-02-28)

Both GA4 and Microsoft Clarity were firing unconditionally — no cookie consent, GDPR violation for UK/EU visitors.

- **GA4 (`G-CWS43VLQ2P`):** removed from `src/components/layout.js`
- **Clarity (`eulfh7sro3`):** `gatsby-plugin-clarity` uninstalled and removed from `gatsby-config.js`
- **Replaced with:** Cloudflare Web Analytics (cookieless, no personal data, GDPR safe by design)

**Remaining gap:** ConvertKit newsletter form collects email addresses — needs a Privacy Policy page.

---

## CI/CD Pipeline (added 2026-02-28)

GitHub Actions workflow: `.github/workflows/ci.yml`

**Jobs:** Lint → Build → Lighthouse CI → Deploy (main only)

**ESLint:**
- Flat config format (`eslint.config.mjs`) — required for ESLint 10
- `eslint-plugin-react`, `eslint-plugin-jsx-a11y`, `@eslint/js`
- `React` import pattern ignored (Gatsby v5 uses new JSX transform, React doesn't need importing)
- `--max-warnings=0` — zero tolerance

**Lighthouse CI:**
- Uses `@lhci/cli` (not `lhci` — different package, wrong one)
- Serves built `public/` via `gatsby serve` on port 9000
- Reports saved as GitHub Actions artifact (`lighthouse-report`, 7 day retention)
- Thresholds: Perf/BP on `warn`, A11y/SEO on `error` (tighten as scores improve)

**Deploy:**
- `cloudflare/wrangler-action@v3`
- `wrangler pages deploy public --project-name=fantastic-octo-goggles`
- Only runs on `main` branch push, not PRs

---

## SEO Improvements (2026-03-01)

### Sitemap
`gatsby-plugin-sitemap` generates `/sitemap/sitemap-index.xml` at build time.
- Homepage: priority 1.0, weekly
- Blog posts: priority 0.8, monthly
- Other pages: priority 0.6, monthly

Submit to Google Search Console: `sitemap/sitemap-index.xml`

### Canonical URLs
Added `<link rel="canonical">` to all pages via the `Seo` component. Pages pass `canonicalPath` prop (e.g. `canonicalPath="/about/"`). Blog posts use `location.pathname` from Gatsby's `Head` props.

### JSON-LD Structured Data
- Blog posts: `Article` schema (headline, description, url, image, datePublished, author, publisher)
- Other pages: `WebSite` schema (name, url, description)
- Author: `Person` → Alex Shaw, `https://thelittlestcto.com/about/`

### Open Graph / Twitter
- `og:image:width` and `og:image:height` added (1200×630)
- `article:published_time` added to blog posts
- `article:author` added to blog posts
- `twitter:site` added

---

## Performance Improvements (2026-03-01)

| Fix | Impact |
|---|---|
| Inter font preload (`<link rel="preload">`) | Eliminates render-blocking font |
| `text-rendering: optimizeSpeed` (was `optimizeLegibility`) | Reduces layout cost |
| Hero image `loading="eager"` | Faster LCP — above-fold image no longer lazy |
| LinkedIn URL typo fixed (`hhttps://` → `https://`) | Best Practices score |
| `rel="noopener noreferrer"` on external links | Best Practices + security |
| `aria-label` + `aria-hidden` on SVG icon links | Accessibility |

**Lighthouse baseline (2026-03-01 pre-fixes):** Perf 74, BP 79  
**Expected post-fixes:** Perf 80+, BP 90+

**Remaining perf limiters:**
- ConvertKit loads a third-party script — unavoidable without removing newsletter
- Gatsby bundle size — could be improved by removing lodash (uses optional chaining instead)
- Hero image is large (Contentful-sourced) — Gatsby image handles responsive sizes but the source is big

---

## Removed Dependencies

| Package | Reason |
|---|---|
| `gatsby-plugin-react-helmet` | Replaced by Gatsby v5 Head API |
| `react-helmet` | Same |
| `reading-time` | Node stream polyfill issue with Webpack 5; replaced inline |
| `gh-pages` | Unused — deploys via CF Pages |
| `gatsby-provision-contentful` | Stale provisioning tool, not needed |
| `gatsby-plugin-clarity` | Removed — GDPR violation, replaced with CF Web Analytics |
| `netlify-cli` | No longer deploying to Netlify |

---

## Known Bugs & Limitations

| Issue | Status | Notes |
|---|---|---|
| Missing image prop warnings | Open | 2× `[gatsby-plugin-image] Missing image prop` at build — cosmetic, doesn't break build |
| ConvertKit needs privacy policy | Open | Email collection requires Privacy Policy page + link from form |
| Class components | Open | All pages/templates use class syntax — could be refactored to hooks |
| Lodash dependency | Open | Only uses `get()` — can be replaced with optional chaining |
| No Contentful webhook to CF Pages | Open | Content publishes don't auto-trigger rebuilds yet |
