# RealShare

Fractional, tokenized ownership of rental property for Israeli investors — at home in Israel and abroad. Buy a slice of a vetted rental property, earn proportional rent + capital gains, trade on an in-app secondary market. Positioned as **"Blink for real estate,"** with automated Israeli tax reporting as the wedge.

> **Status: greenfield.** This repo contains the full build spec and reference material; the app itself is not built yet.

## Start building

Open this repo in a fresh Claude Code session. Two ways:

- **Autonomous (recommended):** paste the `/goal` block from **[BUILD-PROMPT.md](BUILD-PROMPT.md)** — it loops and builds the whole app to a deployable v1 on its own.
- **Interactive:** say **"Read BUILD-BRIEF.md and build the RealShare PWA."**

## What's here

- **[BUILD-BRIEF.md](BUILD-BRIEF.md)** — the primary, self-contained build spec (read this first). Locked decisions, design system, screens, flows, data model, seed content, legal constraints, milestones.
- **`reference/deck/`** — the pitch deck (English + Hebrew) and its spec — the source of current product thinking.
- **`reference/docs/`** — product spec, financial model, competitive landscape, regulatory/tax strategy, decisions log.
- **`reference/prototype/index.html`** — an existing clickable prototype (Hebrew mobile UI) — reference for screens/flows only.
- **`reference/context/`** — background notes (founder profile, product overview, working preferences).

## Locked build decisions

- **Installable PWA** — Next.js (App Router) + React + TypeScript + Tailwind CSS, mobile-first.
- **Realistic MVP: seed data + waitlist** — production-grade UI on seeded data, with a working early-access waitlist. **No real money / no real securities transactions** — invest/trade actions are clearly-labeled simulations (the product is pre-regulatory-clearance).
- **Hebrew (RTL) primary + English toggle**, full i18n.
- **Design system from the deck** — navy `#0F2233` / gold `#E0A458` / teal `#1F6675`, editorial serif headers, gold icon medallions.

## Important (legal)

RealShare is pre-clearance on Israeli securities/tax classification. The app must not move real money or present an active securities offer; all figures are **illustrative**; persistent disclaimers required (see BUILD-BRIEF.md §7).
