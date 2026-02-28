# NOTES.md — Architecture Decisions & Known Issues

## Commit Convention

This project uses [gitmoji](https://gitmoji.dev/) prefixes on all commit messages.

| Gitmoji | Code | When to use |
|---|---|---|
| ⬆️ | `:arrow_up:` | Upgrade dependencies |
| ⬇️ | `:arrow_down:` | Downgrade dependencies |
| 📝 | `:memo:` | Add or update documentation |
| 🔧 | `:wrench:` | Config files (netlify.toml, gatsby-config.js etc.) |
| ✨ | `:sparkles:` | New feature |
| 🐛 | `:bug:` | Bug fix |
| 🔥 | `:fire:` | Remove code or files |
| ♻️ | `:recycle:` | Refactor |
| 💚 | `:green_heart:` | Fix CI build |
| 👷 | `:construction_worker:` | CI/CD pipeline changes |
| 🔒️ | `:lock:` | Security fixes |
| 🔍️ | `:mag:` | SEO improvements |
| 🎨 | `:art:` | Code structure / formatting |
| 💥 | `:boom:` | Breaking changes |
| 🚀 | `:rocket:` | Deploy related |
| 🩹 | `:adhesive_bandage:` | Simple/minor fix |
| ⚰️ | `:coffin:` | Remove dead code |
| 🛂 | `:passport_control:` | Auth, privacy, consent |

Full reference: https://gitmoji.dev/

---

Running log of decisions, findings, and context for anyone working on this project.

---

## Stack Decisions

### Gatsby v5
Upgraded from v4 → v5 on 2026-02-28.
- **Why:** Netlify deprecated the legacy prerendering used by Gatsby v4. v5 also ships the Gatsby Head API (replacing `react-helmet`), better partial hydration, and improved build performance.
- **Breaking changes handled:**
  - GraphQL sort syntax: `sort: { fields: [...], order: DESC }` → `sort: { publishDate: DESC }`
  - `react-helmet` / `gatsby-plugin-react-helmet` removed; replaced with `export const Head` pattern
  - `reading-time` package removed (Node stream polyfill issue with Webpack 5); replaced with inline word count

### Gatsby Head API (vs react-helmet)
Each page/template now exports a `Head` component alongside the default page component. The `Seo` component (`src/components/seo.js`) returns raw `<meta>` tags rather than wrapping `<Helmet>`. This is the Gatsby v5 recommended approach and avoids hydration issues.

### Contentful as CMS
Content lives in Contentful, not in the repo. Gatsby pulls it at build time via `gatsby-source-contentful`. This means:
- Content editors don't need to touch code or git
- Contentful webhooks trigger Netlify rebuilds on publish
- Local dev requires a `.env.development` file with API credentials (never committed)

### CSS Modules
Styling uses plain CSS Modules (`.module.css` files co-located with components). No Tailwind, no styled-components. Intentional — keeps things simple and avoids toolchain complexity.

---

## Analytics — Current State (Needs Attention)

Two analytics tools are currently firing **unconditionally** — no cookie consent, no user opt-out. This is a **GDPR compliance problem** for UK/EU visitors.

### Microsoft Clarity
- Configured via `gatsby-plugin-clarity` (project ID: `eulfh7sro3`)
- Collects session recordings and heatmaps
- Requires explicit consent under GDPR

### Google Analytics
- GA4 tag `G-CWS43VLQ2P` hardcoded in `src/components/layout.js` via Gatsby `<Script>`
- Fires on every page load, no consent gate

### Options
1. **Recommended:** Switch to privacy-first analytics (Plausible or Fathom) — no cookie consent banner needed, GDPR compliant by default
2. **Alternative:** Keep GA/Clarity but gate both behind a consent banner using [Cookie Consent by Orestbida](https://cookieconsent.orestbida.com/)
3. **Minimum viable:** Disable Clarity, keep GA but add a cookie notice + privacy policy

### ConvertKit Newsletter
- Script injected dynamically in `src/components/newsletter.js`
- Loads `https://winning-composer-4657.ck.page/b81919f49a/index.js` unconditionally
- ConvertKit processes email addresses — needs a privacy policy reference

---

## Known Bugs

### Footer LinkedIn link typo
`src/components/footer.js` line ~28: `hhttps://uk.linkedin.com/in/axshaw` — double `h`. LinkedIn link is broken.

### Missing image prop warnings
Two `[gatsby-plugin-image] Missing image prop` warnings appear at build time. Likely in `hero.js` or `article-preview.js` where `heroImage` may be undefined for some Contentful entries. Needs investigation.

### siteMetadata description
Original description was "Things to know about How to be a successful CTO" — updated to something better but should be reviewed for tone/accuracy.

---

## Deployment Notes

### Netlify
- Auto-deploys from `main` branch
- Build command: `npx gatsby build`
- Node version: 22 (pinned in `.nvmrc`, `netlify.toml`, and Netlify dashboard `NODE_VERSION` env var)
- Legacy prerendering: **disabled** in Netlify dashboard (redundant for Gatsby v5 static builds)
- Security headers configured in `netlify.toml` (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- JS assets cached immutably (`max-age=31536000, immutable`) — Gatsby content-hashes filenames so this is safe

### Environment Variables (Netlify)
Must be set in Netlify dashboard → Site configuration → Environment variables:
- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN`
- `CONTENTFUL_PREVIEW_ACCESS_TOKEN`
- `NODE_VERSION` = `22` — **important:** Netlify's dashboard env var takes precedence over `.nvmrc`; must be kept in sync

### Contentful Webhooks
To auto-rebuild when content is published: Contentful → Space settings → Webhooks → add Netlify build hook URL.

---

## Removed Dependencies

| Package | Reason |
|---|---|
| `gatsby-plugin-react-helmet` | Replaced by Gatsby v5 Head API |
| `react-helmet` | Same |
| `reading-time` | Node stream polyfill issue with Webpack 5; replaced inline |
| `gh-pages` | Unused — site deploys via Netlify, not GitHub Pages |
| `gatsby-provision-contentful` | Stale provisioning tool, pinned to `0.0.3`, not needed |
