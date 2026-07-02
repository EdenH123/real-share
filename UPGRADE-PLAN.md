# RealShare v2 — Upgrade Plan (Map · Design · Data · Flows)

> Working doc for the v2 implementation agents. v1 shipped (see PROGRESS.md).
> v2 goal: a real map, richer data storytelling, motion & UX elevation — while
> preserving everything that made v1 pass: bilingual HE-RTL/EN, WCAG AA, legal
> disclaimers (§7), zero build/console errors, installable PWA.

## Ground rules (apply to every phase)

- **Never regress the legal layer**: DisclaimerBar stays on every screen; every
  yield/return/price figure keeps its Illustrative tag; invest/trade stay
  clearly-labeled simulations.
- **Bilingual always**: every new string goes into BOTH `lib/locales/en.ts` and
  `lib/locales/he.ts` (same keys). Layouts must mirror correctly in RTL —
  use logical properties (`start`/`end`), never bare left/right.
- **No new console errors**, `npm run build` must stay zero-error.
- **Design tokens only**: navy `#0F2233`/`#1B3A5B`, teal `#1F6675`, gold
  `#E0A458` (text-on-light `#A56B2A`), positive `#2E7D5B`, negative `#A8493D`,
  tint `#F1F5F7`, hairline `#D8E0E5`. Amber = accent/CTA only, never "positive".
- **Numbers**: always wrap in `.num` (LTR-isolated tabular figures).
- **Reduced motion**: all new animation must respect `prefers-reduced-motion`.
- **Offline-safe**: the app is a PWA. Anything that fetches externally (map
  tiles) needs a designed fallback state, not a broken gray box.
- The sandbox blocks external hosts — map tiles WILL fail here. That's the
  state screenshots get verified in. Production users get real tiles.

## Phase A — Real map

1. `npm i leaflet` (+ `@types/leaflet` dev). Import CSS from the package
   (`leaflet/dist/leaflet.css`) — no CDN.
2. Add real coordinates to each property in `lib/seed.ts`:
   - bud-district-vii: 47.5030, 19.0700 · bud-district-xiii: 47.5320, 19.0550
   - ath-koukaki: 37.9630, 23.7280 · ath-exarchia: 37.9870, 23.7330
   - prt-porto: 41.1500, -8.5950 · isr-haifa: 32.8080, 34.9890
   And market center/zoom presets (all-markets view ≈ center 41.5, 15 @ z4.3).
3. `components/map/MapView.tsx` — client-only (`next/dynamic`, ssr:false),
   plain leaflet (no react-leaflet). Custom `divIcon` pins: gold medallion dot
   with navy building glyph + price chip; selected state grows + ring.
   Popups: navy card (title, city, price, gross yield w/ illustrative note,
   "view details" link). RTL-aware (popup text direction follows locale).
   Tile layer: CARTO light_all (`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`,
   OSM attribution). **Fallback**: map container styled as navy-tinted "sea"
   with a faint grid + coastline-suggesting radial glows, so failed tiles still
   look intentional; listen to tile `tileerror` → add `.tiles-offline` class
   that shows a small "map tiles unavailable offline" chip (i18n).
4. `/map` page: map becomes the default hero view (~46dvh) with the market
   filter chips overlaid on top; list below scrolls; existing list/map toggle
   becomes map-size toggle (collapse/expand). Selecting a market flies the map
   to that market's preset. Tapping a pin highlights + scrolls to its card.
5. Property detail: `MiniMap` card (non-interactive, single pin, ~h-36,
   rounded-card) between "about" and appraisal cards.
6. Attribution line + i18n strings for everything new.

Acceptance: build clean; `/map` + property detail render in he+en; zero
console errors with tiles blocked; pins/popups keyboard-accessible.

## Phase B — Design & UX elevation

1. **Motion system** in `app/globals.css` + tiny helpers:
   - `.reveal` stagger-fade-up on section entry (IntersectionObserver hook
     `useReveal`), `.press` spring scale on tap for cards/buttons.
   - Count-up hook for hero numbers (portfolio value, net figures) — animates
     once on mount, disabled under reduced-motion.
   - Skeleton shimmer components for home hero + property cards (used during
     store hydration instead of "—").
2. **Property art v2**: give each city a distinct gradient identity
   (Budapest: navy→amber dusk; Athens: teal→aegean; Porto: plum→terracotta;
   Haifa: deep sea→gold) + varied skyline silhouettes so cards feel distinct.
3. **Search + sort** on `/map` list: search box (title/district match, both
   locales) + sort menu (price ↑↓, gross yield ↓, status). i18n.
4. **Install prompt card**: listen for `beforeinstallprompt`; show a dismissible
   gold-medallion card on Home ("Install RealShare") that triggers the prompt;
   hide when installed/dismissed (persist dismissal in store). iOS fallback:
   brief "Share → Add to Home Screen" hint.
5. **Empty/404/loading polish**: nicer NotFound illustration reuse, portfolio
   empty state with arrow to featured property, `loading.tsx` skeletons for
   property/invest routes.
6. **Disclaimer presentation**: keep persistent bar but tighten to one line +
   chevron (full text unchanged in sheet); ensure it never overlaps content.
7. Onboarding: subtle parallax/float on the medallion, slide transition between
   steps (translate+fade), progress dots animate width smoothly.

Acceptance: AA contrast intact, both locales screenshot-verified, no console
errors, reduced-motion honored.

## Phase C — Data storytelling + flows

> Load the `dataviz` skill BEFORE writing any chart code and follow it.
> All charts inline SVG (no chart lib), design-token colors, RTL-safe,
> illustrative-tagged.

1. **Portfolio**: donut of allocation by market (gold/teal/navy-card slices,
   center = total value), income area chart (accrued rent by month from
   SEED_DISTRIBUTIONS incl. upcoming as dashed), per-holding sparkline.
2. **Trade**: cumulative depth chart (bids gold-tinted from start, asks
   negative-tinted from end, est-price marker line) above the order book.
3. **Property detail**: 5-yr scenario chart — two smooth lines (base 6%, bull
   10%) over €1,000, filled subtly, endpoint labels +€471/+€744; replaces the
   static rows (keep the totals row + footnote).
4. **Funding thermometer**: animate progress fill on reveal; add escrow icon
   ticks at 25/50/75/100%.
5. **Exit-vote simulation**: on `prt-porto` detail (status exitVote) add a
   voting card — current 58% for / ⅔ threshold bar, "cast demo vote" buttons
   (for/against) that update a persisted demo tally in the store (clearly
   labeled simulation), deadline countdown days.
6. **Invest success moment**: brief gold particle/confetti burst (CSS only,
   reduced-motion safe) + count-up of tokens added.
7. **Tax report print layout**: `@media print` styles → clean A4 statement
   (hide nav/disclaimer bar, keep footer disclaimer text), "Download PDF" now
   triggers `window.print()`.
8. **Notifications**: mark-read animates (ring fades), unread dot pulses once.

Acceptance: charts legible in both locales & AA-compliant, figures labeled
illustrative, build + console clean.

## Verification & ship (orchestrator)

- `scripts/shoot.mjs` all screens × he/en — zero console errors, visual review.
- `npm run build` zero errors. PWA still installable (manifest + SW active).
- Commit per phase → push branch → PR → merge → Vercel auto-deploys `main`.
