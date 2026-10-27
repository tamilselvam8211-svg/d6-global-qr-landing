import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The page is served under /qr/ so that the same build works both on its own
// host (https://<site>/qr/, with / redirecting there) and behind a path proxy
// on the main domain (https://d6globalmedia.com/qr/ -> https://<site>/qr/),
// where asset URLs must stay inside /qr/ and never collide with the main site.
//
//   BASE_PATH  public path the page lives under (default "/qr/")
//   OUT_DIR    build output directory (default "dist" + BASE_PATH)
//   SITE_URL   final public URL of the page, e.g. https://qr.d6globalmedia.com/qr/
//              When set, canonical / og:url / absolute og:image are added.
//              Leave unset until the URL is live and verified.
const BASE = process.env.BASE_PATH || "/qr/";
const OUT_DIR = process.env.OUT_DIR || `dist${BASE}`.replace(/\/$/, "");
const SITE_URL = (process.env.SITE_URL || "").trim();

const absoluteMeta = () => ({
  name: "absolute-meta",
  transformIndexHtml() {
    // Without a verified public URL, keep a base-relative image only.
    if (!SITE_URL) {
      return [{ tag: "meta", attrs: { property: "og:image", content: `${BASE}brand/og-image.jpg` }, injectTo: "head" }];
    }
    const url = SITE_URL.endsWith("/") ? SITE_URL : `${SITE_URL}/`;
    return [
      { tag: "link", attrs: { rel: "canonical", href: url }, injectTo: "head" },
      { tag: "meta", attrs: { property: "og:url", content: url }, injectTo: "head" },
      { tag: "meta", attrs: { property: "og:image", content: `${url}brand/og-image.jpg` }, injectTo: "head" },
      { tag: "meta", attrs: { name: "twitter:image", content: `${url}brand/og-image.jpg` }, injectTo: "head" },
    ];
  },
});

// When the page is nested under /qr/, also write a root _redirects file so the
// site root and /qr land on /qr/ on hosts that read it (Netlify, Cloudflare
// Pages). netlify.toml repeats the same rules for Netlify.
const rootRedirects = () => ({
  name: "root-redirects",
  apply: "build",
  writeBundle() {
    if (BASE === "/" || !OUT_DIR.endsWith(BASE.replace(/\/$/, ""))) return;
    const root = path.resolve(OUT_DIR, "..");
    fs.writeFileSync(path.join(root, "_redirects"), `/      ${BASE}  301\n${BASE.replace(/\/$/, "")}  ${BASE}  301\n`);
  },
});

export default defineConfig({
  base: BASE,
  plugins: [react(), absoluteMeta(), rootRedirects()],
  build: {
    outDir: OUT_DIR,
    emptyOutDir: true,
    assetsInlineLimit: 4096,
  },
});
