# thelittlestcto.com

Personal site and blog for Alex Shaw — engineering leadership, CTO insights, and practical advice for technical leaders.

**Live:** [thelittlestcto.com](https://thelittlestcto.com)  
**Staging:** [fantastic-octo-goggles.pages.dev](https://fantastic-octo-goggles.pages.dev)  
**Repo:** [github.com/axshaw/fantastic-octo-goggles](https://github.com/axshaw/fantastic-octo-goggles)  
**CMS:** [Contentful](https://app.contentful.com) (space: `s49e82c0u57f`)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CONTENT                              │
│                                                             │
│   Contentful CMS  ──────────────────────────────────────►  │
│   (app.contentful.com)   Webhook on publish                 │
└─────────────────────────────────────────────┬───────────────┘
                                              │
                                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        CI / CD                              │
│                                                             │
│   GitHub Push / PR                                          │
│         │                                                   │
│         ▼                                                   │
│   GitHub Actions                                            │
│   ┌─────────┐   ┌─────────┐   ┌───────────┐   ┌────────┐  │
│   │  Lint   │──►│  Build  │──►│ Lighthouse│──►│ Deploy │  │
│   │ ESLint  │   │ Gatsby  │   │    CI     │   │   CF   │  │
│   └─────────┘   └─────────┘   └───────────┘   └────────┘  │
│                      │                                      │
│                 Contentful API                              │
│               (fetched at build)                            │
└─────────────────────────────────────────────┬───────────────┘
                                              │
                                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       HOSTING                               │
│                                                             │
│   Cloudflare Pages                                          │
│   ├── thelittlestcto.com    (custom domain)                 │
│   ├── www.thelittlestcto.com                                │
│   ├── Cloudflare Web Analytics (cookieless, GDPR safe)      │
│   └── SSL auto-provisioned by Cloudflare                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Gatsby v5](https://www.gatsbyjs.com/) |
| Language | React 18 (JSX) |
| CMS | [Contentful](https://www.contentful.com/) (headless, build-time) |
| Styling | CSS Modules |
| Analytics | Cloudflare Web Analytics (cookieless, GDPR compliant) |
| Newsletter | ConvertKit |
| Hosting | Cloudflare Pages |
| CI/CD | GitHub Actions |
| Node | ≥22 |

---

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── ci.yml            # CI/CD: lint → build → lighthouse → deploy
├── src/
│   ├── components/
│   │   ├── seo.js            # Gatsby Head API — meta, OG, Twitter, JSON-LD, canonical
│   │   ├── layout.js         # Page wrapper (nav + footer)
│   │   ├── navigation.js     # Top nav
│   │   ├── footer.js         # Footer with social links + newsletter
│   │   ├── newsletter.js     # ConvertKit embed (lazy-loaded)
│   │   ├── hero.js           # Homepage hero (LCP image, eager loaded)
│   │   ├── article-preview.js  # Blog card grid
│   │   ├── article-hero.js   # Blog post hero image
│   │   ├── tags.js           # Tag pills
│   │   └── global.css        # Base styles + Inter variable font
│   ├── pages/
│   │   ├── index.js          # Homepage
│   │   ├── blog.js           # Blog listing
│   │   ├── about.js          # About page
│   │   ├── agile-principles.js
│   │   ├── confirmation.js   # Newsletter confirmation
│   │   └── 404.js
│   └── templates/
│       └── blog-post.js      # Individual blog post (Article JSON-LD)
├── static/
│   ├── fonts/                # Inter variable font (WOFF2, self-hosted)
│   ├── favicon.ico
│   └── robots.txt
├── contentful/
│   └── export.json           # Contentful content model export
├── eslint.config.mjs         # ESLint flat config (ESLint 10)
├── .lighthouserc.json        # Lighthouse CI thresholds
├── gatsby-config.js          # Gatsby plugins + siteMetadata
├── gatsby-node.js            # Page generation from Contentful
├── NOTES.md                  # Architecture decisions
└── TASKS.md                  # Work tracker
```

---

## Local Development

### Prerequisites

- Node ≥22 (use `nvm use` to pick up `.nvmrc`)
- Access to the Contentful space `s49e82c0u57f`

### 1. Clone and install

```bash
git clone git@github.com:axshaw/fantastic-octo-goggles.git
cd fantastic-octo-goggles
npm install --legacy-peer-deps
```

### 2. Configure environment

Create `.env.development` in the project root:

```env
CONTENTFUL_SPACE_ID=s49e82c0u57f
CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_api_token
```

Get tokens from [Contentful → Settings → API Keys](https://app.contentful.com).  
`.env*` files are gitignored — never commit them.

### 3. Run dev server

```bash
npm run dev
# → http://localhost:8000      (site)
# → http://localhost:8000/___graphql  (GraphQL explorer)
```

On LAN (e.g. from another device): `http://192.168.42.209:8000`

---

## Build & Deploy

### Production build (local)

```bash
npm run build    # Gatsby build → ./public
npm run serve    # Preview at http://localhost:9000
```

### Deployment

GitHub Actions auto-deploys `main` to Cloudflare Pages on every push, after lint + build + Lighthouse CI pass.

**Build command:** `npx gatsby build`  
**Output directory:** `public`  
**Node version:** 22

### Content updates

Publish content in Contentful → webhook triggers a new CF Pages build → auto-deploys. No code changes needed.

---

## Running Tests Locally

### Lint

```bash
npm run lint
# ESLint across src/**/*.{js,jsx} — must pass with 0 warnings
```

### Lighthouse CI

Requires the site to be built first:

```bash
npm run build
npx @lhci/cli autorun
# Serves from ./public on :9000, runs Lighthouse, checks thresholds
# Reports saved to ./lhci-reports/
```

Current thresholds (`.lighthouserc.json`):

| Category | Threshold | Mode |
|---|---|---|
| Performance | ≥0.70 | warn |
| Accessibility | ≥0.85 | error |
| Best Practices | ≥0.75 | warn |
| SEO | ≥0.85 | error |

`error` = blocks CI. `warn` = logged but pipeline continues.

---

## CI/CD Pipeline

```
Push to main / PR
       │
       ▼
  ┌─────────┐
  │  Lint   │  ESLint — 0 warnings allowed
  └────┬────┘
       │ pass
       ▼
  ┌─────────┐
  │  Build  │  npx gatsby build (with Contentful secrets)
  └────┬────┘
       │ pass
       ▼
  ┌───────────┐
  │ Lighthouse│  @lhci/cli autorun — serves public/ on :9000
  └─────┬─────┘
        │ pass
        ▼
  ┌────────┐
  │ Deploy │  wrangler pages deploy → Cloudflare Pages
  └────────┘  (main branch only, not PRs)
```

**Required GitHub Secrets:**

| Secret | Description |
|---|---|
| `CONTENTFUL_SPACE_ID` | Contentful space ID |
| `CONTENTFUL_ACCESS_TOKEN` | Contentful delivery token |
| `CONTENTFUL_PREVIEW_ACCESS_TOKEN` | Contentful preview token |
| `CLOUDFLARE_API_TOKEN` | CF API token with Pages:Edit permission |
| `CLOUDFLARE_ACCOUNT_ID` | CF account ID |
| `LHCI_GITHUB_APP_TOKEN` | Optional — enables Lighthouse PR comments |

---

## Content Model (Contentful)

| Type | Key Fields | Used by |
|---|---|---|
| `BlogPost` | title, slug, publishDate, heroImage, description, body, tags, author | Blog listing + post template |
| `Person` | name, title, shortBio, longBio, image, twitter, email | Homepage hero, About page |

---

## SEO

- **Sitemap:** auto-generated at `/sitemap/sitemap-index.xml` by `gatsby-plugin-sitemap`
- **Canonical URLs:** set per-page via `Seo` component
- **Open Graph:** title, description, image, url, type on all pages
- **Twitter Card:** `summary_large_image` with creator `@axshaw`
- **JSON-LD:** `Article` schema on blog posts, `WebSite` schema on other pages
- **robots.txt:** allows all crawlers, managed by Cloudflare

Submit sitemap to Google Search Console: `sitemap/sitemap-index.xml`

---

## GDPR Compliance

| Tool | Status | Notes |
|---|---|---|
| Cloudflare Web Analytics | ✅ Compliant | Cookieless, no personal data |
| Google Analytics (GA4) | ✅ Removed | Was `G-CWS43VLQ2P` |
| Microsoft Clarity | ✅ Removed | Was project `eulfh7sro3` |
| ConvertKit newsletter | ⚠️ Needs privacy policy | Collects email addresses |

**Outstanding:** Add a Privacy Policy page and link it from the newsletter form.

---

## Known Issues

See [TASKS.md](./TASKS.md) for the full backlog.  
See [NOTES.md](./NOTES.md) for architecture decisions and context.
