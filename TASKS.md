# TASKS.md — thelittlestcto.com

Work tracker for the site rebuild and improvement project.

---

## Current Priority

- [ ] **Privacy Policy page** — required for ConvertKit newsletter (email collection = personal data)
- [ ] **Contentful → CF Pages webhook** — content publishes don't currently trigger rebuilds
- [ ] **Tighten Lighthouse thresholds** — once scores stabilise post perf fixes, raise Perf ≥0.85 and BP ≥0.90
- [ ] **Branch protection on `main`** — require PR + passing CI before merge

---

## Backlog

### GDPR & Privacy
- [ ] Add Privacy Policy page (required for ConvertKit, link from newsletter form and footer)
- [ ] Add privacy policy link to ConvertKit form embed
- [ ] Review ConvertKit double opt-in — verify it's enabled in ConvertKit dashboard

### Performance
- [ ] Remove `lodash` — only uses `get()`, replace with optional chaining (`?.`)
- [ ] Investigate Gatsby bundle size — run `gatsby build --verbose` and review chunk sizes
- [ ] Fix `[gatsby-plugin-image] Missing image prop` warnings (2 occurrences at build time)
- [ ] Add default OG image for pages without a heroImage

### Code Quality
- [ ] Convert class components → function components + hooks (all pages/templates)
- [ ] Add Prettier config for consistent formatting
- [ ] Add Dependabot for automated dependency PRs

### SEO
- [ ] Set up Google Search Console — submit `sitemap/sitemap-index.xml`
- [ ] Add `og:image` for homepage (currently no default social share image)
- [ ] Review blog post descriptions for SEO — some may be too long for meta snippets

### Infrastructure
- [ ] Set up Contentful webhook → CF Pages build hook (auto-rebuild on content publish)
- [ ] Preview deploy environments for PRs
- [ ] Raise Lighthouse CI thresholds once scores improve

### Content
- [ ] Review and update homepage hero text
- [ ] Review `siteMetadata.description` for tone and accuracy
- [ ] Consider adding featured posts or categories to homepage
- [ ] Write new blog posts

---

## Completed ✅

### 2026-03-01 — Performance, SEO & CI/CD

- [x] **GitHub Actions CI/CD pipeline** (`.github/workflows/ci.yml`)
  - Lint (ESLint) → Build (Gatsby + Contentful) → Lighthouse CI → Deploy (CF Pages)
  - Lint and build required to pass before deploy; Lighthouse warns on low scores
  - Deploy only runs on `main` branch push, not PRs
  - Lighthouse reports saved as GitHub Actions artifacts (7 day retention)
- [x] **ESLint** — flat config (`eslint.config.mjs`) for ESLint 10; `npm run lint` script added
  - `eslint-plugin-react`, `eslint-plugin-jsx-a11y`, `@eslint/js`
  - Zero warnings allowed (`--max-warnings=0`)
  - Fixed: removed unused `plainTextDescription` variable in `blog-post.js` render()
- [x] **Lighthouse CI** — `@lhci/cli` with `.lighthouserc.json`
  - Fixed wrong package (`lhci` → `@lhci/cli`)
  - Reports saved to `./lhci-reports/` as filesystem artifacts
  - Thresholds: Perf ≥0.70 (warn), A11y ≥0.85 (error), BP ≥0.75 (warn), SEO ≥0.85 (error)
- [x] **GitHub Actions secrets** configured: `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_PREVIEW_ACCESS_TOKEN`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- [x] **SEO — Sitemap** (`gatsby-plugin-sitemap`)
  - Auto-generates `/sitemap/sitemap-index.xml` at build
  - Homepage priority 1.0/weekly, blog posts 0.8/monthly, other pages 0.6/monthly
- [x] **SEO — Canonical URLs** — `<link rel="canonical">` added to all pages via `Seo` component
- [x] **SEO — JSON-LD structured data**
  - Blog posts: `Article` schema (headline, description, url, image, datePublished, author, publisher)
  - Other pages: `WebSite` schema
- [x] **SEO — Open Graph improvements**
  - `og:image:width` / `og:image:height` added (1200×630)
  - `article:published_time` and `article:author` on blog posts
  - `twitter:site` added
  - About page now has unique meta description
- [x] **Performance — font preload** — `<link rel="preload">` for Inter roman WOFF2 in `Seo` component
- [x] **Performance — text-rendering** — changed from `optimizeLegibility` to `optimizeSpeed`
- [x] **Performance — hero image** — `loading="eager"` for faster LCP
- [x] **Bug fix — LinkedIn URL** — `hhttps://` → `https://` in `footer.js`
- [x] **Bug fix — email typo** — `thelittlescto.com` → `thelittlestcto.com` in footer email link
- [x] **Security — external links** — `rel="noopener noreferrer"` + `target="_blank"` on all footer external links
- [x] **Accessibility — SVG icons** — `aria-label` on link, `aria-hidden="true"` + `focusable="false"` on SVGs in footer
- [x] **Documentation** — fully rewrote README.md, NOTES.md, TASKS.md with architecture diagrams, CI/CD docs, local test instructions

### 2026-02-28 — Hosting migration & Gatsby upgrade

- [x] **Migrated from Netlify → Cloudflare Pages**
  - Repo transferred from `thelittlestcto` org → `axshaw` personal account
  - CF Pages project created: `fantastic-octo-goggles`
  - Build command: `npx gatsby build` (not `gatsby build` — CF Pages PATH issue)
  - Domain nameservers updated to Cloudflare; propagated same evening
  - Custom domains `thelittlestcto.com` + `www.thelittlestcto.com` added to CF Pages
  - SSL auto-provisioned by Cloudflare
- [x] **GDPR — Removed GA4** (`G-CWS43VLQ2P`) from `layout.js`
- [x] **GDPR — Removed Microsoft Clarity** (`eulfh7sro3`) — uninstalled `gatsby-plugin-clarity`
- [x] **Enabled Cloudflare Web Analytics** — cookieless, GDPR compliant, auto-injected
- [x] **SEO audit** — identified: no sitemap, no canonicals, no JSON-LD, og:image URL issues
- [x] **Gatsby v4 → v5 upgrade**
  - GraphQL sort syntax updated across all pages
  - `react-helmet` → Gatsby v5 Head API (`export const Head`)
  - `reading-time` → inline word count
  - `og:image` URL protocol fixed (`http:` → `https:`)
  - `siteUrl` added to `siteMetadata`
- [x] **Node 22 throughout** — `.nvmrc`, `package.json` engines, CF Pages `NODE_VERSION` env var
- [x] **Dev server LAN binding** — `npm run dev` → `http://192.168.42.209:8000`
- [x] **Cloned repo, configured Contentful credentials** (`.env.development`, `.env.production`)
- [x] **Rewrote README.md, NOTES.md, added TASKS.md**
- [x] Deleted stale boilerplate files (`WHATS-NEXT.md`, `app.json`, `static.json`, `screenshot.png`)
