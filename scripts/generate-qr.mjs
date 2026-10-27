// Print-ready QR code for the landing page.
//
//   npm run qr -- https://qr.d6globalmedia.com/qr/
//
// Only run this AFTER the URL is deployed and verified on a phone using
// mobile data. Writes qr-output/d6-global-qr.png (2000px — sharp up to
// ~16 cm at 300 dpi) and qr-output/d6-global-qr.svg (vector, for print).

import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const url = process.argv[2];
if (!url) {
  console.error("Usage: npm run qr -- <verified public https URL>");
  process.exit(1);
}

let parsed;
try {
  parsed = new URL(url);
} catch {
  console.error(`Not a valid URL: ${url}`);
  process.exit(1);
}

const host = parsed.hostname;
const isPrivate =
  /^(localhost|0\.0\.0\.0|\[::1\])$/.test(host) ||
  /^(127|10)\./.test(host) ||
  /^192\.168\./.test(host) ||
  /^172\.(1[6-9]|2\d|3[01])\./.test(host) ||
  host.endsWith(".local");
// Netlify deploy previews / branch deploys are not stable production URLs.
const isPreview = /^(deploy-preview-\d+|[a-f0-9]{24})--/.test(host);

if (parsed.protocol !== "https:" || isPrivate || isPreview) {
  console.error(`Refusing to encode a non-public or temporary URL: ${url}`);
  process.exit(1);
}

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "qr-output");
await mkdir(outDir, { recursive: true });

// Black on white with the standard 4-module quiet zone; medium error
// correction keeps the modules large (no logo overlay is used).
const options = { errorCorrectionLevel: "M", margin: 4, color: { dark: "#000000", light: "#FFFFFF" } };
await QRCode.toFile(path.join(outDir, "d6-global-qr.png"), url, { ...options, type: "png", width: 2000 });
await QRCode.toFile(path.join(outDir, "d6-global-qr.svg"), url, { ...options, type: "svg" });

console.log(`Encoded: ${url}`);
console.log(`Written: ${path.relative(process.cwd(), outDir)}/d6-global-qr.png and .svg`);
