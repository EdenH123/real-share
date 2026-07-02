// Rasterize the RealShare icon SVG to PNGs using the globally-installed Playwright.
import pw from "/opt/node22/lib/node_modules/playwright/index.js";
const { chromium } = pw;
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const svg = readFileSync(join(root, "public/icons/icon.svg"), "utf8");

// Maskable variant: fill the whole canvas with navy + larger medallion (safe-zone aware).
const maskableSvg = svg
  .replace('rx="112" fill="url(#bg)"', 'rx="0" fill="url(#bg)"')
  .replace('r="150"', 'r="132"');

async function render(browser, markup, size, out) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  const dataUrl =
    "data:image/svg+xml;base64," + Buffer.from(markup).toString("base64");
  await page.setContent(
    `<style>html,body{margin:0;padding:0}img{display:block;width:${size}px;height:${size}px}</style><img src="${dataUrl}">`
  );
  const el = await page.$("img");
  const buf = await el.screenshot({ omitBackground: true });
  writeFileSync(join(root, out), buf);
  await page.close();
  console.log("wrote", out, size);
}

const browser = await chromium.launch();
await render(browser, svg, 192, "public/icons/icon-192.png");
await render(browser, svg, 512, "public/icons/icon-512.png");
await render(browser, maskableSvg, 512, "public/icons/icon-maskable-512.png");
await render(browser, svg, 180, "public/icons/apple-touch-icon.png");
await render(browser, svg, 32, "public/favicon-32.png");
await browser.close();
console.log("done");
