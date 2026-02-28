# thelittlestcto.com

Personal site and blog for Alex Shaw — engineering leadership, CTO insights, and practical advice for technical leaders.

**Live:** [thelittlestcto.com](https://thelittlestcto.com)  
**Hosting:** Netlify (auto-deploy from `main`)  
**CMS:** Contentful (content managed via [app.contentful.com](https://app.contentful.com))

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Gatsby v5](https://www.gatsbyjs.com/) |
| Language | React 18 (JSX) |
| CMS | [Contentful](https://www.contentful.com/) |
| Styling | CSS Modules |
| Analytics | Microsoft Clarity + Google Analytics *(consent pending — see NOTES.md)* |
| Newsletter | ConvertKit |
| Hosting | Netlify |
| Node | ≥20 |

---

## Project Structure

```
.
├── src/
│   ├── components/       # Shared React components
│   │   ├── seo.js        # Gatsby Head API SEO component
│   │   ├── layout.js     # Page wrapper (nav + footer)
│   │   ├── navigation.js # Top nav
│   │   ├── footer.js     # Footer with social links + newsletter
│   │   ├── newsletter.js # ConvertKit embed
│   │   ├── hero.js       # Homepage hero
│   │   ├── article-preview.js  # Blog card grid
│   │   ├── article-hero.js     # Blog post hero
│   │   ├── tags.js       # Tag pills
│   │   └── ...
│   ├── pages/
│   │   ├── index.js          # Homepage
│   │   ├── blog.js           # Blog listing
│   │   ├── about.js          # About page
│   │   ├── agile-principles.js  # Agile content listing
│   │   ├── confirmation.js   # Newsletter confirmation
│   │   └── 404.js            # 404 page
│   └── templates/
│       └── blog-post.js      # Individual blog post template
├── contentful/
│   └── export.json       # Contentful content model export
├── gatsby-config.js      # Gatsby + plugin configuration
├── gatsby-node.js        # Page generation from Contentful data
├── netlify.toml          # Netlify build + headers config
├── NOTES.md              # Architecture decisions and known issues
└── TASKS.md              # Backlog and work tracker
```

---

## Local Development

### Prerequisites

- Node ≥20
- A Contentful account with access to the `thelittlestcto` space

### 1. Clone and install

```bash
git clone git@github.com:thelittlestcto/fantastic-octo-goggles.git
cd fantastic-octo-goggles
npm install
```

### 2. Configure environment

Create `.env.development` in the project root:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_api_token
```

Get these from [Contentful → Settings → API Keys](https://app.contentful.com).  
The `.gitignore` already excludes all `.env*` files.

### 3. Run locally

```bash
npm run dev
```

Site available at `http://localhost:8000`  
GraphQL explorer at `http://localhost:8000/___graphql`

---

## Build & Deploy

### Production build (local)

```bash
npm run build   # outputs to ./public
npm run serve   # preview the production build locally
```

### Deployment

Netlify auto-deploys from the `main` branch on every push.  
Build command: `gatsby build`  
Publish directory: `public`  
Node version: 20 (set in `netlify.toml`)

### Content updates

Content is managed in Contentful. Publishing a change in Contentful triggers a Netlify webhook → rebuild → deploy. No code changes needed for content-only updates.

---

## Branches

| Branch | Purpose |
|---|---|
| `main` | Production — auto-deploys to Netlify |
| `development` | Feature work — merge to `main` via PR |

---

## Content Model (Contentful)

| Type | Fields | Used by |
|---|---|---|
| `BlogPost` | title, slug, publishDate, heroImage, description, body, tags, author | Blog listing + post template |
| `Person` | name, title, company, shortBio, longBio, image, imageAlternative, twitter, email | Homepage hero, About page |

---

## Known Issues & TODOs

See [TASKS.md](./TASKS.md) for the full backlog.  
See [NOTES.md](./NOTES.md) for architecture decisions.
