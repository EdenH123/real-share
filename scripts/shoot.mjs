import pw from "/opt/node22/lib/node_modules/playwright/index.js";
const { chromium } = pw;
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE || "http://localhost:3100";
const OUT = process.env.OUT || "/tmp/claude-0/-home-user-real-share/fcb3f3e8-c21d-5010-b1a8-12bb40e98138/scratchpad/shots";
mkdirSync(OUT, { recursive: true });

const onboardedStore = JSON.stringify({
  addedHoldings: [],
  addedOrders: [],
  readNotifIds: [],
  onboarded: true,
  waitlist: null,
});

// [name, path, onboarded?]
const SCREENS = [
  ["onboarding", "/", false],
  ["home", "/", true],
  ["map", "/map", true],
  ["property", "/property/bud-district-vii", true],
  ["invest", "/invest/bud-district-vii", true],
  ["trade", "/trade", true],
  ["portfolio", "/portfolio", true],
  ["profile", "/profile", true],
  ["tax", "/profile/tax", true],
  ["notifications", "/notifications", true],
  ["waitlist", "/waitlist", true],
  ["legal", "/legal", true],
];

const browser = await chromium.launch();
const errors = [];

for (const locale of ["he", "en"]) {
  for (const [name, path, onboarded] of SCREENS) {
    const context = await browser.newContext({
      viewport: { width: 412, height: 892 },
      deviceScaleFactor: 2,
    });
    const pageErrors = [];
    context.on("weberror", (e) => pageErrors.push(String(e.error())));
    const page = await context.newPage();
    page.on("console", (msg) => {
      if (msg.type() === "error") pageErrors.push("console: " + msg.text());
    });
    await page.addInitScript(
      ([loc, store, ob]) => {
        localStorage.setItem("realshare.locale", loc);
        if (ob) localStorage.setItem("realshare.store.v1", store);
      },
      [locale, onboardedStore, onboarded]
    );
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/${locale}-${name}.png` });
    if (pageErrors.length) errors.push({ locale, name, pageErrors });
    await context.close();
  }
}

await browser.close();
console.log("shots written to", OUT);
if (errors.length) {
  console.log("PAGE ERRORS:");
  console.log(JSON.stringify(errors, null, 2));
} else {
  console.log("NO console/page errors on any screen.");
}
