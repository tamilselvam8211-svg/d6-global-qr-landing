# D6 Global Limited — QR Landing Page

A standalone static landing page opened from the D6 Global Limited QR code:
company identity, the service ecosystem (Digital Marketing, Event Management,
Business & Technology Solutions), the AuraWork showcase and contact links.

- React 19 + Vite 8, plain CSS, no backend, no environment secrets.
- Runtime dependencies: `react`, `react-dom` only. Inter (Latin subset, SIL OFL)
  is self-hosted; no third-party requests at runtime.
- All copy and links live in `src/data/content.js`.

The page is served under **`/qr/`** (for example `https://<site>/qr/`); the site
root and `/qr` redirect there. Because asset URLs stay inside `/qr/`, the same
build works on its own domain/subdomain *and* behind a `/qr` path proxy on the
main domain without colliding with the main site's `/assets/*`.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev        # http://localhost:5173/qr/
npm run build      # outputs dist/ (page in dist/qr/, root redirects in dist/_redirects)
npm run preview    # serves the production build at http://localhost:4173/qr/
```

Build options (environment variables at build time, all optional and non-secret):

| Variable | Default | Purpose |
|---|---|---|
| `BASE_PATH` | `/qr/` | Public path of the page |
| `OUT_DIR` | `dist` + `BASE_PATH` | Build output folder |
| `SITE_URL` | *(unset)* | Final public URL, e.g. `https://qr.d6globalmedia.com/qr/`. Adds canonical, `og:url` and absolute `og:image`. **Set only after the URL is live and verified.** |

`npm audit` reports one advisory in Vite's local development server (Windows
editor launcher). It affects `npm run dev` only, not the deployed static files.

## Project structure

```
index.html                 SEO title, description, Open Graph, favicons
vite.config.js             /qr/ base, absolute meta (SITE_URL), root _redirects
netlify.toml               Netlify build, redirects, cache + security headers
src/data/content.js        All copy, services and links
src/components/            SiteHeader, Hero, ServiceEcosystem, AuraWorkShowcase,
                           Contact, SiteFooter, BrandMark, Icon
src/styles.css             Design tokens, layout, responsive tree
src/assets/fonts/          Inter Latin subset + licence
public/brand/              D6 mark (from the official logo), OG image, 512px icon
public/favicon-32.png, public/apple-touch-icon.png
scripts/generate-qr.mjs    Print QR generator (refuses non-public/preview URLs)
```

## 1. Create the GitHub repository (personal account)

1. Sign in to GitHub with your **personal** account → **New repository** →
   name `d6-global-qr-landing`, **Private** or Public, and **do not** add a
   README, .gitignore or licence (the project already has them).
2. In this folder:

```bash
git init -b main
git add .
git commit -m "D6 Global Limited QR landing page"
git remote add origin https://github.com/<your-personal-username>/d6-global-qr-landing.git
git push -u origin main
```

`node_modules/`, `dist/`, `.env*` and `qr-output/` are git-ignored. The project
contains no tokens or credentials.

## 2. Deploy on Netlify (personal account)

1. Sign in to Netlify with your **personal** account → **Add new project →
   Import an existing project → GitHub** → authorise and pick
   `d6-global-qr-landing`.
2. Settings are read from `netlify.toml`: build command `npm run build`, publish
   directory `dist`, Node 22. Leave environment variables empty.
3. Deploy, then open `https://<your-site-name>.netlify.app/qr/` and check it on
   a phone. The site root redirects to `/qr/`.

Builds use Netlify build minutes. Check the personal account's plan and remaining
credits before relying on it.

### Alternative: Cloudflare Pages (free)

**Workers & Pages → Create → Pages → Connect to Git** → select the repo →
framework preset **None**, build command `npm run build`, output directory
`dist`, environment variable `NODE_VERSION=22`. The generated `dist/_redirects`
gives the same `/` → `/qr/` redirect. Page URL: `https://<project>.pages.dev/qr/`.

### Alternative: GitHub Pages (free)

A project site lives at `https://<username>.github.io/<repo>/`, so build with
that path:

```bash
BASE_PATH=/d6-global-qr-landing/ OUT_DIR=dist npm run build
```

Publish `dist/` with the **GitHub Actions → Static HTML** Pages workflow (set its
build step to the command above and its upload path to `dist`). GitHub Pages
ignores `_redirects` and `netlify.toml`.

## 3. Routing to d6globalmedia.com (verified setup, October 2026)

Read-only checks showed:

- `d6globalmedia.com` and `www.d6globalmedia.com` are served by **Netlify**
  (site `d6media`, the existing account with exhausted credits).
- The domain's DNS is **Netlify DNS** (`dns1–4.p01.nsone.net`), managed in that
  same existing Netlify account.
- `aurawork.d6globalmedia.com` is a separate server (nginx) and is unaffected.

A new site on another Netlify account (or another host) **cannot** take over
`d6globalmedia.com/qr` by itself. Options:

**Recommended — subdomain `qr.d6globalmedia.com`** (no change to the existing
website, no rebuild needed):

1. Personal Netlify site → **Domain management → Add a domain** →
   `qr.d6globalmedia.com`. Because the zone is on Netlify DNS in another team,
   Netlify may ask for a TXT verification record. Add exactly what it shows.
2. Existing Netlify account → **Domains → d6globalmedia.com → DNS records →
   Add record**: type `CNAME`, name `qr`, value `<your-site-name>.netlify.app`
   (plus the TXT record if requested). Editing DNS records doesn't trigger a
   build. Confirm in the dashboard that it is allowed on the current plan.
3. Wait for HTTPS to be provisioned on the personal site, then verify
   `https://qr.d6globalmedia.com/qr/` on a phone using mobile data.

**Later, optional — keep `https://d6globalmedia.com/qr` working too** (needs
a new deploy of the existing `d6media` site, so only once it has credits).
Add these lines to the main site's `public/_redirects`, **above** its
`/*  /index.html  200` catch-all:

```
/qr     /qr/   301!
/qr/*   https://<your-site-name>.netlify.app/qr/:splat   200!
```

This proxies only `/qr/…`. Every other route, `/assets/*`, login and the API
stay untouched. Asset URLs, canonical (`SITE_URL`) and caching keep working
because both sites use the same `/qr/` paths. Note that the main site's `main`
branch already contains an older React `/qr` page; the forced (`!`) rule above
takes precedence over it.

If neither is possible, the stable `https://<your-site-name>.netlify.app/qr/`
(or `pages.dev`) URL can be used as the QR destination. Never use a
`deploy-preview-…` URL.

After the final URL is live, rebuild with `SITE_URL` set to it (Netlify:
**Site configuration → Environment variables**) so canonical/Open Graph tags
are absolute.

## 4. QR code for print

Only after the final URL is deployed **and** verified on a phone using mobile data:

```bash
npm run qr -- https://qr.d6globalmedia.com/qr/
```

This writes `qr-output/d6-global-qr.png` (2000 × 2000 px) and `.svg`. The script
refuses `http://`, localhost, private IPs and Netlify preview URLs.

Print guidance:

- Size: at least **3 × 3 cm**; **4 × 4 cm or larger** recommended (bigger for
  scanning from a distance, roughly 1 cm per 10 cm of scanning distance).
- Black on white, keep the white quiet-zone border, no logo overlay, matte
  stock if possible to avoid glare.
- Test the printed proof with **an iPhone camera and an Android camera**, on
  mobile data (not office Wi-Fi), before the full print run.
