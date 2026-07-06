# RealShare

Fractional, tokenized ownership of rental property for Israeli investors — at home in Israel and abroad. Buy a slice of a vetted rental property, earn proportional rent + capital gains, trade on an in-app secondary market. Positioned as **"Blink for real estate,"** with automated Israeli tax reporting as the wedge.

> **Status: v1 built.** A production-grade, installable **PWA** — bilingual (Hebrew RTL + English), on seed data, with a working early-access waitlist. See **[PROGRESS.md](PROGRESS.md)** for the milestone checklist.

> **This is a preview.** No real money moves and no securities transactions happen. "Invest" and "Trade" are clearly-labeled **simulations**; the **waitlist** is the only real action. All figures are **illustrative**. Token classification & tax are pending ITA/ISA determination. See §7 of [BUILD-BRIEF.md](BUILD-BRIEF.md) and the in-app **Legal & disclaimers** screen.

## Run it locally

You need [Node.js](https://nodejs.org) 18.18+ (22 recommended). Then, from this folder:

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the dev server
```

Open **http://localhost:3000**. It looks best in a narrow / mobile-sized window (it's a phone-first app). Use the **עב / EN** toggle in the header to switch language — Hebrew (right-to-left) is the default.

To run the optimized production build locally:

```bash
npm run build    # must finish with zero errors
npm run start    # serve the production build on http://localhost:3000
```

## Install it as an app (PWA)

Open the site in a browser and choose **"Add to Home Screen"** (mobile) or the **install** icon in the address bar (desktop Chrome/Edge). It installs as a standalone app with its own icon and works offline.

## Deploy to the web (one command)

The app is a standard Next.js project — [Vercel](https://vercel.com) is the simplest host and needs no configuration.

```bash
npm i -g vercel   # once
vercel            # from this folder — follow the prompts, then `vercel --prod`
```

That's it. Vercel auto-detects Next.js, builds it, and gives you a live URL. (You can also click **"Import Project"** on vercel.com and point it at this Git repo — every push then deploys automatically.)

- **Waitlist storage:** signups POST to `/api/waitlist`, which validates the email and records it (server logs + a best-effort JSON file). On a serverless host like Vercel the file write is skipped gracefully — to store signups durably, swap the one function in `app/api/waitlist/route.ts` for a form service or database (e.g. Resend, Supabase, or a Google-Sheet webhook).

## Project structure

```
app/            Next.js App Router routes (one folder per screen) + /api/waitlist
components/     UI + layout components (Card, IconMedallion, StatWaterfall, TabBar, DisclaimerBar…)
lib/            i18n (he/en dictionaries), seed data, formatters (₪/€/%), localStorage store
public/         PWA manifest, service worker, generated icons
scripts/        icon generation + screenshot verification helpers
reference/      original spec, deck, prototype, background docs
```

## Design system (deck v3)

- **Palette:** navy `#0F2233` / card `#1B3A5B`, teal `#1F6675`, gold `#E0A458` (amber text on light `#A56B2A`), green `#2E7D5B`, red `#A8493D`.
- **Type:** editorial serif (Fraunces) for English headers + hero numbers; Assistant (Hebrew + Latin) for body/UI; heavy Assistant for Hebrew display.
- **Motif:** gold icon medallion (gold circle + navy glyph); rounded cards, soft shadows; amber is accent/CTA only, never "positive."

## What's in the repo (reference)

- **[BUILD-BRIEF.md](BUILD-BRIEF.md)** — the primary, self-contained build spec.
- **[BUILD-PROMPT.md](BUILD-PROMPT.md)** — the autonomous `/goal` prompt used to build this.
- **`reference/`** — pitch deck (EN + HE), product/financial/regulatory docs, the original clickable prototype, founder/context notes.

## Turning on the POC funnel (5 minutes)

The preview measures real demand: every waitlist signup (with a stated,
non-binding investment amount) and every funnel event (property views,
invest-intents with € amounts, trade-intents) can land in a **Google Sheet you
own**.

### 1. Create the Sheet + webhook
1. Create a new Google Sheet → **Extensions → Apps Script**.
2. Replace the code with:
   ```js
   function doPost(e) {
     var d = JSON.parse(e.postData.contents);
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     sheet.appendRow([
       d.at || new Date().toISOString(), d.type || "", d.event || "",
       d.email || "", d.amountEur || "", d.propertyId || "", d.tokens || "",
       d.market || "", d.name || "", d.locale || "", d.src || "", d.anon || "",
       JSON.stringify(d.props || {}),
     ]);
     return ContentService.createTextOutput("ok");
   }
   ```
3. **Deploy → New deployment → Web app** → Execute as *Me*, access
   *Anyone* → **Deploy** → copy the web-app URL.

### 2. Connect it to the app
In Vercel: **Project → Settings → Environment Variables** → add
`POC_WEBHOOK_URL` = the URL you copied → **Redeploy**.

That's it. Rows appear in your Sheet as people use the app. Until you set the
variable, everything still works — events are only in the server logs.

### 3. Read the results
- **Demand**: filter `type = signup` — each row has an email + stated amount
  (non-binding) + the property that triggered it.
- **Funnel**: count `view_property` → `invest_intent` → `signup` per `anon` id.
- **Channels**: share links as `https://your-app.vercel.app/?src=whatsapp`
  (or `src=linkedin`, `src=family`…) — the `src` column shows which channel
  each signup came from.
- Also enable **Vercel Analytics** (Project → Analytics → Enable) for
  visitor/pageview counts — the app already includes the snippet.
