# RealShare — Autonomous Build Prompt

> **How to use:** open this repo in a fresh Claude Code session and paste the entire block below (from `/goal` to the end) as your first message. `/goal` keeps working until the completion condition is met, so the session will build autonomously through every milestone without further input. If it ever stops on a genuine blocker, answer that one point and it resumes.

---

/goal Build and ship RealShare v1 — a production-grade, installable PWA per `BUILD-BRIEF.md`. **Completion condition (all must be true):** every milestone in BUILD-BRIEF.md §9 is complete; all screens (onboarding, home, map/properties, property detail, simulated invest flow, secondary marketplace, portfolio, profile, notifications, waitlist) are navigable on seed data in **both Hebrew (RTL) and English**; the design matches BUILD-BRIEF.md §3 (navy/gold/teal, serif headers, gold icon medallions); it is an installable PWA (valid manifest + service worker) that works on mobile; the waitlist captures an email; the legal disclaimers from §7 are present and all figures are labeled illustrative; `npm run build` passes with **zero errors and no console errors** at runtime; a `PROGRESS.md` shows every milestone checked; and all work is committed and pushed to `origin/main` (deploy to Vercel if credentials are available, otherwise document the one-command deploy step). Do not consider the goal met until you have visually verified the key screens.

You are the lead engineer building RealShare. Work autonomously and take pride in the craft.

## Read first (before any code)
1. `BUILD-BRIEF.md` — the primary spec (read in full).
2. `reference/deck/pitch-deck-advisor-spec.md` and open `reference/deck/RealShare-Advisor-Deck.pptx` — the current product thinking and the design system.
3. `reference/prototype/index.html` — screens/flows reference only (do **not** port it; rebuild production-grade).
4. Skim `reference/docs/` (SPEC, financial-model, regulatory-strategy) and `reference/context/` (founder profile, operating notes).

## Working loop (repeat until the goal condition is met)
Go milestone by milestone through BUILD-BRIEF.md §9. For **each** milestone:
1. **Plan** the slice briefly (what screens/components/data).
2. **Build** it.
3. **Verify** — run the dev server and confirm: it renders, Hebrew RTL *and* English both look right, layout is responsive/mobile, contrast passes, and there are **no console/build errors**. Use the browser-preview / screenshot tools to *see* it, don't assume.
4. **Commit + push** to `origin/main` with a clear message.
5. **Update `PROGRESS.md`** (check the milestone, note any assumptions/decisions).
6. Continue to the next milestone **without waiting for confirmation.**

## Non-negotiables
- **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS; installable **PWA** (manifest + service worker); deploy target Vercel.
- **Bilingual:** Hebrew **RTL by default** + English toggle. Full i18n, CSS logical properties, mirrored layouts, a Hebrew-capable font (Assistant/Heebo/Rubik) + serif display for headers.
- **Design system:** use the exact palette, fonts, and gold-medallion motif in BUILD-BRIEF.md §3. Brand-consistent with the deck.
- **Legal (BUILD-BRIEF.md §7):** NO real money and NO real securities transactions. "Invest" and "Trade" are **clearly-labeled simulations**; the **waitlist** is the only real capture. Persistent disclaimer legend (HE+EN): *preview/illustrative · not an offer or investment/tax advice · capital at risk · token classification & tax pending ITA/ISA.* Never assert the token "is a security"/"taxes like a stock" as fact — frame as intended, pending ruling.
- **Seed content:** use the real deck numbers in BUILD-BRIEF.md §8 (worked example €150k→€3,981 net/2.65%; markets Budapest/Athens/Portugal/Israel; Blink analogy; mock auto tax report in Profile).

## Autonomy & decisions
- Make reasonable engineering and product-detail decisions yourself; prefer shipping working software over asking. Record assumptions in `PROGRESS.md`.
- **Only pause** for a true blocker that cannot be defaulted (e.g., a required secret/credential, or a genuine product contradiction). Ask one crisp question, then continue.
- Keep it runnable by a **solo non-engineer**: simple structure, a clear `README` with install/run/deploy steps, sensible defaults.

## Quality bar
- Match the deck's visual polish; build reusable components (Card, IconMedallion, StatWaterfall, TokenPriceCard, TabBar, DisclaimerBar…).
- Accessible (WCAG AA contrast), responsive, fast. Verify visually (screenshots) before checking a milestone done.

## First actions
1. Create `PROGRESS.md` from the BUILD-BRIEF.md §9 milestones (as a checklist).
2. Scaffold the Next.js PWA (milestone 1: project + Tailwind + RTL/i18n + design tokens), commit, push.
3. Continue the loop through every milestone until the completion condition above is fully met, then post a final summary with the live/deploy URL and a screenshot of the home screen in both languages.
