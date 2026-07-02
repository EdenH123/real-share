# RealShare — Build Progress

## v5 (2026-07-01) — richer mock data ("over time")

Expanded the seed data so the app feels full and lived-in: 14 properties
(from 6) across Budapest / Athens / Porto / Haifa, clustered near each city so
skyline art + map views stay coherent; 4 portfolio holdings across 3 markets
(3-slice allocation donut); a rolling 12-month rent-distribution history via a
generator (income chart now spans a full year with thinned labels); auto-built
order books for every tradeable property; 10 notifications spanning ~5 months.
Map per-market view now fits that market's pins. Build clean, no console errors.

## v4 (2026-07-01) — "Editorial fintech" shell redesign

Full visual-architecture redesign (Fable): immersive navy aurora header bands
on every main screen with the content rising over them as a rounded light
sheet (HeroShell); hand-crafted layered SVG city scenes as property art
(Budapest parliament dusk, the Acropolis, Porto's arch bridge, Haifa's port
cranes — glowing windows, signature skies); floating glass dock navigation
with the sliding gold pill; gold-ringed avatar medallions; frosted-glass stat
tiles; bigger editorial hero numbers. RTL fix for the depth chart axis.
AA, RTL, reduced-motion, and the legal layer intact; zero new dependencies.

## v3 (2026-07-01) — "Gold dust & deep water" living design layer

Full-app design elevation (designed + implemented by Fable): aurora ambient
surfaces with film grain + drifting gold dust on every navy hero, orbiting
particles + shine sweeps on hero medallions, sheened gold CTAs, View
Transitions page navigation (progressive), sliding gold tab-bar pill with icon
pop, scroll parallax on property heroes, breathing art blooms, liquid-gold
funding thermometer, map pin drop-in + selected sonar pulse, springy sheets,
card lift, swipeable onboarding cosmos. All motion gated behind
prefers-reduced-motion; AA contrast, RTL, and the legal layer untouched;
zero new dependencies.

## v2 (2026-07-01) — Map · Design · Data storytelling

All three phases of `UPGRADE-PLAN.md` implemented (by Opus agents, orchestrated + verified by Fable), verified in he-RTL + en with zero build errors and no console errors beyond sandbox-blocked map-tile fetches:

- [x] **Phase A — Real map**: interactive Leaflet map (CARTO tiles, no API key) with gold-medallion pins + price chips at real coordinates, locale-aware navy popups, flyTo per market / fitBounds all-markets, collapse/expand map hero on /map, pin→card highlight+scroll, non-interactive MiniMap on property detail, designed offline fallback (navy sea + grid) with i18n chip.
- [x] **Phase B — Design & UX**: reveal/count-up/press motion system (reduced-motion + no-JS safe), skeleton shimmer loading, per-market gradient art identities, search + sort on properties, install-prompt card (beforeinstallprompt + iOS hint, persisted dismissal), route loading skeletons, onboarding float/slide polish, one-line disclaimer bar.
- [x] **Phase C — Data storytelling + flows** (dataviz-skill compliant, hand-rolled SVG): portfolio allocation donut + cumulative income chart (paid solid / upcoming dashed) + per-holding sparklines, trade market-depth chart with est-price marker, 5-yr base/bull scenario chart on property detail, animated funding thermometer with escrow ticks, exit-vote demo simulation (persisted), invest success gold burst + count-up, print-ready tax report (window.print), notification read transitions.

# RealShare v1 — Build Progress

Status: **v1 complete and pushed.** Production-grade, installable PWA built per
`BUILD-BRIEF.md`. All milestones done, verified visually in Hebrew (RTL) **and**
English, `npm run build` passes with zero errors, no runtime console errors on
any screen. Pushed to `origin/claude/realshare-v1-build-ship-q1bw1y` (commit
`6734a01`, 92 files).

Last verified: 2026-07-01.

**Deploy:** no Vercel credentials in the build environment, so deployment is
documented rather than executed (per the completion condition). To go live:
import `EdenH123/real-share` on vercel.com (zero-config Next.js, auto-deploys on
push) or run `vercel --prod` locally. See README → "Deploy to the web".

## Milestones (BUILD-BRIEF.md §9)

- [x] **M1 — Scaffold Next.js PWA + Tailwind + RTL + i18n + design tokens**
  - Next.js 14 (App Router) + TypeScript + Tailwind CSS.
  - Installable PWA: `public/manifest.webmanifest` + `public/sw.js` (offline app shell), generated PNG icons (192/512/maskable/apple-touch).
  - i18n: lightweight `I18nProvider` (`lib/i18n.tsx`) with full `he`/`en` dictionaries (`lib/locales/`). **Hebrew RTL is the default**; language persists to `localStorage`; `<html dir/lang>` updates live.
  - Design tokens in `tailwind.config.ts`: navy `#0F2233`/`#1B3A5B`, teal `#1F6675`, gold `#E0A458` (text `#A56B2A`), semantic green/red, surfaces. Fonts via `next/font`: Fraunces (serif display, EN) + Assistant (Hebrew+Latin body).

- [x] **M2 — Design-system components + tab shell**
  - `IconMedallion` (gold circle + navy glyph ~52%), `Card`, `Button`/`ButtonLink`, `Eyebrow`, `StatusChip`, `ProgressBar`, `IllustrativeTag`, `Sheet` (bottom sheet), `DisclaimerBar`, `SectionTitle`, `NotFoundInline`.
  - `AppFrame` phone-frame shell (viewport-locked, internal scroll), `TabBar` (RTL: בית · מפה · מסחר · תיק · פרופיל), `Header`, `LanguageToggle`.

- [x] **M3 — Home + Map + Property detail (waterfall) on seed data**
  - Onboarding (3 slides → waitlist/home), Home dashboard (portfolio snapshot, filters, featured, how-it-works, markets, waitlist CTA).
  - Map/Properties (market filter, list + stylized map view, cards).
  - Property detail with the cost→net **StatWaterfall** (€7,500 gross → −€3,125 opex → −€394 CIT → **€3,981 net = 2.65%**), key figures, token price card, "your €1,000 over 5yr" returns, documents, escrow note.

- [x] **M4 — Invest flow (simulated) + waitlist capture**
  - `/invest/[id]`: choose tokens (min 1, slider + quick-add), review (subtotal, ~2% setup fee, total, illustrative est. income), escrow explainer, confirm → success (flagged preview, adds to demo portfolio) → waitlist offer.
  - Real waitlist capture: `WaitlistForm` → `POST /api/waitlist` (validates email, records signup; best-effort file persistence with graceful fallback).

- [x] **M5 — Marketplace + Portfolio**
  - `/trade`: per-property order book (bids/asks with depth bars), RealShare estimated (NAV) price, spread, simulated bid/ask placement, honest liquidity note, your simulated orders.
  - `/portfolio`: total value/return, invested/accrued/next-payout, holdings breakdown, rent distributions (paid/upcoming), empty state.

- [x] **M6 — Profile (mock tax report) + Notifications + language toggle**
  - `/profile`: user + KYC (mock), language toggle, links, reset demo.
  - `/profile/tax`: auto-generated **mock Israeli tax report** (dividend-like distributions, capital gains, creditable 9% foreign tax, 25% estimated Israeli tax, net, Form 1301 pre-fill) — the Blink-style moat.
  - `/notifications`: payouts, funding rounds, sale votes, system; read-state persisted.

- [x] **M7 — Disclaimers pass + PWA install + polish**
  - Persistent plain-language disclaimer legend (HE+EN) on **every** screen via `DisclaimerBar`, opening the full legal disclaimer. Dedicated `/legal` + `/about`.
  - All yield/return/price/tax figures carry an **Illustrative** tag; "Invest"/"Trade" carry simulation badges; token classification & tax framed as *pending ITA/ISA*, never asserted as fact.
  - PWA verified installable: valid manifest (standalone, icons, start_url, theme), service worker **registered + active + controlling** the page, iOS apple-touch tags.

- [x] **M8 — Build passes + deploy docs + PROGRESS.md + push**
  - `npm run build`: **zero errors**, 13 routes. Playwright verification of 12 screens × 2 languages: **no console/page errors**.
  - `README.md` documents install/run and the one-command Vercel deploy for a solo non-engineer.
  - Committed and pushed to the working branch.

## Key decisions & assumptions

- **Deploy branch:** work is committed to `claude/realshare-v1-build-ship-q1bw1y` (the designated feature branch), which tracks to `origin`. Open a PR to `main` to merge.
- **Vercel:** no deploy credentials were present in the environment, so deployment is documented (one command) rather than executed — see README.
- **Property imagery:** the environment has no outbound access to image CDNs, so property "photos" are on-brand generated gradients + skyline silhouettes. This keeps the PWA fully offline-capable and free of runtime console/network errors. Swap in real photos by pointing `PropertyImage` at real URLs (remote host already allow-listed in `next.config.mjs`).
- **Waitlist persistence:** the API route validates and records signups (logs + best-effort JSON file). On read-only/serverless hosts the file write is skipped gracefully. For durable production storage, connect a form service / DB (Resend, Supabase, a Google-Sheet webhook) — one function swap in `app/api/waitlist/route.ts`.
- **i18n approach:** a small custom provider (not `next-intl` routing) keeps the stack simple for a solo non-engineer while still delivering full RTL mirroring via CSS logical properties.
- **Seed numbers** are the real deck figures (BUILD-BRIEF §8): worked example €150k→€3,981 net/2.65%; markets Budapest/Athens/Portugal/Israel; funding/active/failed/exit-vote lifecycle states; mock auto tax report in Profile.
- **FX:** an illustrative fixed €→₪ rate is used only where ₪ framing appears; all headline figures are shown in € as in the deck.

## How verified

- `npm run build` → compiled successfully, 13 routes, no type/lint errors.
- Production server + Playwright screenshots of every screen in `he` and `en`; console-error listener attached — **none fired**.
- PWA: manifest + SW served with correct content types; SW registered/active/controlling confirmed programmatically.
