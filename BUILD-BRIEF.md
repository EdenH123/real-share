# RealShare — App Build Brief

> **Portable handoff.** This file is written to be dropped into a new repo and read by a fresh Claude Code session that has NO prior context. Everything needed to start building is here. Author: prior session, 2026-06-29.

## 0. How to use this

This file is the **primary spec**. Everything else you need is already in this repo under `reference/`:
- `reference/deck/` — the pitch deck (`RealShare-Advisor-Deck.pptx` + `-HE.pptx`) and its spec (`pitch-deck-advisor-spec.md`). **The deck is the source of current product thinking** (multi-market, tokens, marketplace, the 4 revenue streams, the honest framing).
- `reference/docs/` — deeper detail: `SPEC.md`, `financial-model.md` (+ `.xlsx`), `competitive-landscape.md`, `regulatory-strategy.md`, `counsel-brief.md`, `CONTEXT.md`, `DECISIONS.md`.
- `reference/prototype/index.html` — the existing clickable prototype (Hebrew mobile UI). **Reference for screens/flows only** — the new app is a fresh, production-grade rebuild, not a port.
- `reference/context/` — synthesized background notes (who the founder is, product overview, operating preferences).

**To start building:** open this repo in Claude Code and say *"Read BUILD-BRIEF.md and build the RealShare PWA."* Then scaffold per §9 and work the milestones in order.

## 1. Product in one page

**RealShare** lets **Israeli retail investors** buy **fractional, tokenized shares of rental property** — at home in Israel and abroad (prototype market: Budapest; also modeling Athens / Portugal / Israel; geography is an open strategic question). A holder owns a **token = a contractual claim** to that specific property's **proportional net rent + sale proceeds** (not title, not company equity). Positioned as *"Blink for real estate"* — the wedge is **automated Israeli tax reporting** (like the Blink stock app). There is an **in-app secondary marketplace** to trade tokens.

**Deal lifecycle:** list → independent appraisal → time-boxed funding round (funds in escrow; refund + interest if it fails) → property bought, tokens activate → monthly rent collected & paid out proportionally → exit by supermajority holder vote (whole-property sale).

## 2. Build decisions (LOCKED — do not re-litigate)

- **Platform:** installable **PWA** — Next.js (App Router) + React + TypeScript + Tailwind CSS. Mobile-first; add manifest + service worker so it's "add to home screen."
- **Scope:** **Realistic MVP with seed data + waitlist.** Production-grade UI, real navigation, seeded property/portfolio/market data. A working **waitlist / early-access email capture**. **NO real money movement, no real securities transactions** (see §7 — legally gated). "Invest" and "trade" actions are **simulated** (update local/seed state + optionally join waitlist), clearly labeled as a preview.
- **Language:** **Hebrew (RTL) primary + English toggle.** Full i18n, `dir="rtl"` by default, logical CSS properties, mirrored layouts. (The deck was built both EN + fully RTL Hebrew — match that discipline.)
- **Design:** the **upgraded deck design system** (§3) — navy + gold + teal, editorial headers, gold icon medallions. Brand-consistent with the pitch deck.

## 3. Design system (from the deck, v3)

**Palette (hex):**
- Ink / navy (dark sections, headings): `#0F2233`; card-on-navy: `#1B3A5B`
- Teal (secondary/brand, structural): `#1F6675`
- Gold/amber accent (medallions, CTAs, hero numbers on dark): `#E0A458`; **amber TEXT on light must be** `#A56B2A` (AA contrast)
- Surfaces: white `#FFFFFF`, light card tint `#F1F5F7`, hairline `#D8E0E5`
- Text: `#1E2A36`; muted `#5A6B78`
- Semantic: positive/green `#2E7D5B`, negative/red `#A8493D`

**Rules:** amber = accent/CTA/hero-number only (never "positive" — that's green). Every text-on-fill must clear WCAG AA. Dark "sandwich": dark navy for hero/emotional/honest sections, light for content.

**Typography:** editorial serif for headers + clean sans for body. Web recommendation (better than the deck's Office fonts): headers = a serif display webfont (e.g. **Fraunces** or **Playfair Display**) for English; body/UI = a font with excellent **Hebrew + Latin** coverage (**Assistant**, **Heebo**, or **Rubik**). For Hebrew headers, use the same Hebrew font at bold/heavy weight (Hebrew display serifs are scarce). Big stat numbers in the serif. Small "eyebrow" kicker: uppercase, letter-spaced, in `#A56B2A`.

**Motif / components:** icon **medallion = gold filled circle + dark navy glyph** (~52% glyph size), used consistently everywhere. Rounded cards (radius ~12px) with soft shadow; light cards on light bg, `#1B3A5B` cards on navy. No decorative accent stripes/bars. Use a solid icon set (e.g. lucide-react or Font Awesome solid).

## 4. App structure & screens

Bottom tab bar (RTL): **בית / Home · מפה / Map · מסחר / Trade · תיק / Portfolio · פרופיל / Profile**. Screens (see `prototype/index.html` for reference layouts):

1. **Onboarding** — 3 slides: "own real estate a slice at a time · from ₪100 · no mortgages, no management." Skip/next. Ends → Home.
2. **Home / dashboard** — greeting, portfolio snapshot, featured properties, "hot" / "high-yield" filters, funding-round states (open-funding / active / sale-vote).
3. **Map / Properties** — browse listings (Budapest first; markets filter), each card: photo, city/district, price, gross yield, funding progress, status chip.
4. **Property detail** — photos, key figures (price, gross/net yield, monthly rent), the **cost→net waterfall / proportion** (see deck slide "The Numbers": €150k flat → €7,500 gross → €3,981 net = 2.65%), token price, funding progress, "Invest" CTA (simulated), documents/appraisal, **disclaimers**.
5. **Invest flow** (simulated) — choose amount / # tokens (min = 1 token), review fees, confirm → success screen ("investment received" — but flagged as preview / joins waitlist for real launch). Escrow + refund-if-unfunded explained.
6. **Trade / Secondary marketplace** — order book / list of tokens for sale; **estimated price per token** (NAV, re-based on appraisal) shown as a reference; place bid / ask (simulated); honest note: liquidity is being built, no over-promise.
7. **Portfolio** — holdings, value, accrued/next payout, per-property breakdown, simple performance.
8. **Profile** — user, KYC status (mock), **auto tax report** (the moat — show a mock generated Israeli tax statement), settings, language toggle (HE/EN), notifications.
9. **Notifications** — payouts, round updates, sale votes.
10. **Waitlist / early access** — real email capture (the one genuinely functional backend touchpoint). Surface on onboarding end + invest attempt.

## 5. Core flows to model

- **Funding round:** states = `funding` (progress bar, days left, escrow), `funded/active` (tokens live, paying rent), `failed` (refund + interest), `exit-vote` (supermajority to sell). Seed examples of each.
- **Rent distribution:** monthly, proportional to tokens held; show history + next payout.
- **Marketplace:** bid/ask, RealShare **estimated price** as anchor, ~2% trade fee. Simulated matching.
- **Exit vote:** supermajority (e.g. ⅔) triggers whole-property sale; proceeds distributed; tokens burned.

## 6. Data model (seed data — no real DB required for MVP; JSON/TS seed + local state)

- **Property**: id, city, country, district, title, images[], price (€), grossYield %, netYield %, monthlyRent, tokenCount, tokenPrice, status, fundingRaised/target, appraisalValue, marketAppreciation %.
- **TokenHolding**: userId, propertyId, tokens, costBasis, currentValue.
- **Order** (marketplace): propertyId, side (buy/sell), tokens, price, status.
- **Distribution**: propertyId, date, amountPerToken.
- **User**: id, name, email, kycStatus (mock), locale (he/en), waitlistJoined.
- **VoteProposal**: propertyId, type (sell), forPct, threshold, deadline.

Seed with real deck numbers (see §8). Persist user actions to `localStorage` so the demo feels stateful.

## 7. NON-NEGOTIABLE constraints (legal — from the securities-lawyer review)

The app is **pre-regulatory-clearance**. It must NOT:
- Move real money, take real investments, or execute real securities/token transactions.
- Present itself as an active securities offer to the public.

It MUST:
- Treat "Invest" / "Trade" as **clearly-labeled simulations / previews**, funneling real intent to the **waitlist**.
- Show a persistent, plain disclaimer legend: **"Preview / illustrative — not an offer or investment/tax advice · figures are illustrative · capital at risk · token classification & tax are pending ITA/ISA determination."** (Hebrew + English.)
- Label all yield/return figures **"illustrative."**
- Avoid asserting the token "is a security" or "taxes like a stock" as fact — frame as *intended, pending ruling*.

See `docs/regulatory-strategy.md` (DEC-02 securities, DEC-04 tax) for why.

## 8. Content to seed (pull from the deck / docs)

- **Worked example (property detail):** €150,000 Budapest flat · €7,500 gross rent (5.0%) · − operating costs €3,125 · − 9% Hungarian CIT €394 · = **€3,981 net = 2.65% net yield**. €1,000 over 5 yr: rent +€133; appreciation +€338 (6%/yr) to +€611 (10%/yr); total +€471–€744 (~8–12%/yr). All **illustrative**, appreciation-driven, before Israeli investor tax + FX + ~2% exit.
- **Markets (Map filters / a "where we're exploring" view):** Budapest ~13% appr / 5.0–5.6% yield / €100–170K entry; Athens ~10% / 5.0–5.4% / €90–170K; Portugal ~15% / 3.8–4.7% / €130–320K; Israel ~9% / 3.1–3.6% / €500–650K (home market, priced out). Figures illustrative, local-currency nominal.
- **Blink analogy / moat:** commission-free fractional investing normal for Israelis; RealShare automates the Israeli tax report → show a mock tax statement in Profile.
- **Revenue model (internal / optional "about" only, not customer-facing):** setup fee (one-time ~2%); platform fee (~7% of rent); property-management margin; secondary trading fees (~2%). 3 of 4 recurring.

## 9. Suggested repo structure & milestones

```
/app            Next.js App Router routes (per screen)
/components     UI components (Card, Medallion, StatWaterfall, TokenPrice, TabBar…)
/lib           i18n (he/en), seed data, formatters (₪/€/%), localStorage store
/styles        Tailwind config w/ the palette + fonts + RTL
/public         manifest.json, icons, service worker, seed images
```

**Milestones:** (1) scaffold Next.js PWA + Tailwind + RTL + i18n + design tokens; (2) design-system components + tab shell; (3) Home + Map + Property detail (with waterfall) on seed data; (4) Invest flow (simulated) + waitlist capture; (5) Marketplace + Portfolio; (6) Profile (mock tax report) + Notifications + language toggle; (7) disclaimers pass + PWA install + polish; (8) deploy (Vercel).

## 10. Open product questions (decide with founder as they come up)

- Geography: which market(s) to feature first (Budapest is the prototype; Athens is a strong contender). Deck leaves this open.
- How far to take the "simulated invest" vs. pure waitlist.
- Real backend for waitlist (e.g. a form service / simple API route + DB) vs. email link.

---
*Founder: Eden Heiser (eden@tennasys.com), solo, data-scientist background (not a software engineer) — explain infra/dev choices clearly; keep the stack simple enough for one non-engineer to run.*
