---
name: project-app-build
description: Plan to build the RealShare app in a NEW GitHub repo/session — locked decisions + handoff brief location
metadata: 
  node_type: memory
  type: project
  originSessionId: ca0c288b-0f3d-4fc5-9572-fbfb0b73df04
---

Founder is building the **RealShare app** in a **new GitHub repo** (a fresh session/path — this project's memory will NOT carry over, so the handoff is file-based). A self-contained **`BUILD-BRIEF.md`** was written at the repo root of the current workspace (`/Users/edenheiser/Desktop/realshare/BUILD-BRIEF.md`) to be copied into the new repo along with the deck (`RealShare-Advisor-Deck.pptx` + `-HE`), `docs/`, and `prototype/index.html` (reference only).

**Locked build decisions (2026-06-29):**
- **PWA** — Next.js (App Router) + React + TypeScript + Tailwind; installable, mobile-first.
- **Realistic MVP: seed data + waitlist.** Production-grade UI, seeded data, working waitlist email capture; **NO real money / no real securities transactions** — "invest"/"trade" are clearly-labeled simulations (legally gated, pre-ISA/ITA clearance).
- **Hebrew (RTL) primary + English toggle**, full i18n.
- **Upgraded deck design system** (navy `#0F2233` / gold `#E0A458`, amber-text-on-light `#A56B2A` / teal `#1F6675`; green `#2E7D5B`, red `#A8493D`; gold icon medallions; editorial serif headers + Hebrew-capable sans body).

Screens: onboarding · home · map/properties · property detail (with cost→net waterfall, worked example €150k→2.65% net) · simulated invest flow · secondary marketplace (bid/ask + estimated price) · portfolio · profile (mock auto tax report = the moat) · notifications · waitlist. Legal disclaimers persistent ("preview/illustrative, not an offer, capital at risk, classification & tax pending ITA/ISA"). See [[realshare-overview]] and BUILD-BRIEF.md for full detail.
