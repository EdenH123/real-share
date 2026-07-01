# Advisor Pitch Deck — Spec

> Spec for a read-alone slide deck introducing RealShare to a real-estate domain expert.
> Status: **approved, ready to build.** Created 2026-06-28.

## Purpose & audience

- **Audience:** an Israeli investor-operator who owns residential real estate in **Portugal (most), Greece, and Israel**. He *is* the customer archetype (an Israeli investing in European property) and an operator who knows the frictions firsthand.
- **Goal:** an honest **sanity-check + advisor** conversation — earn a sharp critique and possibly an ongoing advisory relationship. **Not a sales pitch.**
- **Delivery:** sent ahead / read alone → deck must be **self-explanatory** (headline assertion + one visual/number + short annotation per slide). **14 slides** (post-v2 revisions; see bottom of doc).
- **Language:** Built in **both English and Hebrew**. English (`RealShare-Advisor-Deck.pptx`) for reuse with other advisors/investors; Hebrew (`RealShare-Advisor-Deck-HE.pptx`) is fully **RTL-mirrored** (right-aligned text, mirrored layouts/tables, flipped arrows, Arial for Hebrew glyph coverage). Both generated from one source: `deck/build.js` (toggle via `build('en'|'he', ...)`).
- **Posture:** peer-to-peer, intellectually honest, model-backed. Name our own weak points first — for this audience, honesty is the trust move. Geography is presented as an **open question** we want his help on (his expertise is exactly Portugal/Greece/Israel).

## Narrative arc (original 15-slide plan — superseded; see "v2 revisions" at bottom for the current 14-slide order)

1. **Title + one-liner.** "RealShare — fractional ownership of rental property for Israeli investors, at home in Israel and abroad." Subtitle framing: *"A working draft I'd value your honest read on."*
2. **The problem & why it exists.** Israelis want real-estate exposure but direct ownership is high-friction: big ticket, one property = concentrated risk, remote management, illiquid, messy cross-border tax. Frame as *the friction you already deal with*.
3. **Rising appetite.** Young Israelis increasingly want to invest; retail-investing awareness surged this past decade. Stat (locked): **161,000 new Israeli brokerage accounts in 2024 — 3× 2023; <100K/yr before 2020; +87K in H1 2025**, millennials & Gen-Z leading. Source: TASE / CNBC (2025), ISRAEL21c (2021).
4. **The capital barrier.** Real estate is the one asset class small investors can't touch — entry tickets are €100K+. That gate is what RealShare removes.
5. **The solution.** RealShare: buy fractions of a vetted rental property → proportional rent + capital gains → no management, low entry. Simple lifecycle diagram: list → independent appraisal → escrowed funding round → if funded buy + activate / if not refund + interest → rent collected → proportional payouts → exit by supermajority vote.
6. **How ownership is recorded — the token** (dedicated slide, per founder). Each "share" = **one token on a permissioned blockchain**; the token encodes the holder's **financial rights (proportional net rent + sale proceeds) to that specific property** — not title, not company equity, a contractual claim. Frame the blockchain as **plumbing / the legal-and-record wrapper for your share**, NOT a hype slide. Key line: *the token is designed to behave like a security ("like a stock") so taxes and reporting are clean and automatable — pending an ITA advance ruling.* This sets up the marketplace + Blink slides.
7. **The marketplace** (added per founder). An **in-app exchange** to buy/sell tokens — "a stock market for property shares." Sell anytime (list or accept an offer); the **market sets the price** (buyers bid, sellers ask, P2P); **RealShare publishes an estimated per-token price, re-based on independent property revaluations over time** as a NAV anchor. Honest caveat on-slide: *phased in as holder depth + licensing allow; we won't over-promise liquidity* — keeps it consistent with the honest slide (the secondary-market launch is regulated/deferred per `regulatory-strategy.md`).
8. **Origin — "Blink for real estate."** Blink (founded **2023**) made commission-free fractional *stock* investing normal for Israelis and won by **auto-generating the Israeli annual tax report**. Because RealShare's token is designed to tax **like a stock**, it can replicate exactly that — tax automation is our moat too.
9. **vs. REIT.** A REIT/eREIT (e.g. Fundrise) is a *blind pooled fund — no property selection*. RealShare lets you **pick the specific asset**, hold a tokenized claim on *that* property, and trade it on a secondary market. Direct, transparent, selectable.
10. **US precedent — proven but early.** RealT (~$100M, ~15K holders, since 2019), Lofty (500+ properties), Arrived (Bezos-backed, Reg A+). Tokenized fractional residential is **validated but still early — and nobody serves the Israel corridor.** White space, not "nobody does this."
11. **Numbers — worked example** (deal waterfall on top, "your €1,000" underneath). See locked figures below.
12. **The honest part — where it's thin.** Front-loaded economics (Year-1 CM +€605, steady-state ~−€75/yr as configured → fee/cost design is make-or-break); secondary-market liquidity unproven (the category's #1 failure mode is overselling liquidity); securities classification (ISA) is the master regulatory gate; bankruptcy-remoteness / SPV structure still open. **This slide is the single biggest trust-builder for this audience.**
13. **Geography — open question.** The mechanism is market-agnostic; Budapest was just the prototype. Four-market comparison (Israel / Portugal / Greece / Budapest) on the dimensions he cares about, with the explicit ask: *where should this launch?* See data below.
14. **The ask.** Pressure-test the model, the geography read, and whether his peers would actually use this vs. buying directly — and whether he'd consider an ongoing advisory role.
15. **Appendix.** Full model assumptions + data sources for the analytically curious.

## Tax strategy (informs slides 6, 7, 11)

**Decision (founder-confirmed 2026-06-28): aim for stock-like / securities tax treatment**, not real-estate treatment.
- Stock-like = clean flat ~25% capital gains + dividend/interest distributions, **automatable at source** → preserves the Blink tax-automation moat. Adds no new regulatory burden beyond the securities path already assumed in DEC-02.
- Real-estate treatment is likely **unavailable** (investors hold a contractual token against a foreign-property-holding Kft., not Israeli title), **automation-hostile** (per-investor filing), and **does not escape ISA** anyway.
- Nuance: 9% Hungarian CIT already applies at the Kft. level before distribution; stock-like/dividend framing is more likely to permit treaty / foreign-tax-credit relief.
- This is an *aspiration to lock via the ITA advance ruling (DEC-04)*, honestly flagged in the deck as pending. Risk: ITA could re-characterize (interest, dealer/business income, or crypto under Circular 5/2018). → consider reflecting in `DECISIONS.md` DEC-04.

## Locked figures — Slide 9 (worked example)

Deal-level (from `financial-model.md`, real Budapest inputs):
- €150,000 flat → €7,500 gross rent (5.0% gross) → after PM/turnover/maint/vacancy/RealShare skim + közös költség + insurance + 9% Hungarian CIT → **€3,981/yr net distributable = 2.65% net yield.**

Investor view — a **€1,000 stake, 5-year hold**, appreciation shown as two scenarios:

| Component | Base (6%/yr) | Bull (10%/yr) |
|---|---|---|
| Rent income (5yr @ ~2.65% net) | +€133 | +€133 |
| Capital appreciation (5yr) | +€338 | +€611 |
| **Total 5-yr return** | **+€471 (≈47%)** | **+€744 (≈74%)** |
| **≈ annualized** | **~8%/yr** | **~12%/yr** |

Honest footnotes (must appear on slide): before ~2% exit/secondary fee + sale transaction costs; before HUF/EUR FX risk; rent held flat for conservatism; appreciation is a forward assumption, not a guarantee — historical Budapest was ~13%/yr nominal (~7% real) over the last 5 years.

## Locked data — Slide 11 (geography)

5-yr nominal appreciation CAGR / gross yield / investor-flat entry / friction for an Israeli buyer:

| Market | Appreciation (5yr) | Gross yield | Entry (investor flat) | Friction for an Israeli |
|---|---|---|---|---|
| **Budapest** | ~13% (≈7% real; HUF FX risk) | 5.0–5.6% | €100–170K | Minor permit (2–4wk, €160); Kft avoids it |
| **Athens** | ~10% | 5.0–5.4% (small flats up to ~8%) | €90–170K | None; ~40% of buyers foreign |
| **Portugal (Lisbon/Porto)** | ~15% (highest) | 3.8–4.7% | €130–320K | None, but Golden-Visa RE route ended Oct 2023; EU-flagged overvalued |
| **Israel (Tel Aviv)** | ~9% (war-year volatility) | 3.1–3.6% (lowest) | €500–650K | Home market but priced out; 8–10% non-resident purchase tax |

Strategic read to convey: **Budapest & Athens** lead on the yield + appreciation + entry-price combination; **Israel is the "why" (motivation), not the "where"**; **Portugal** is highest-appreciation but has the most caveats (GV gone, overvaluation, low yield).

All figures are sourced (KSH/Eurostat, Bank of Greece, CBS, INE) but **CAGR figures are derived from index data, not published directly** — flag as such, and mark "verify live" consistent with the rest of the workspace.

## Key sources (for footnotes)

- Budapest appreciation: KSH Housing Price Index Q2 2024; Eurostat HPI; MNB Housing Market Report.
- Greece: Bank of Greece quarterly residential price indices (2019–2024).
- Israel: CBS Housing Price Index.
- Portugal: INE; Eurostat HPI.
- Yields/entry: Global Property Guide + Investropa district data (2025–2026, asking-price based — lower reliability than transaction data).
- Competitive/precedent + REIT framing: `docs/competitive-landscape.md`.
- Deal economics: `docs/financial-model.md` / `financial-model.xlsx`.

## Design notes

- Read-alone density: each slide stands on its own; no reliance on narration.
- Hebrew or English? **TBD with Eden** — likely English (deck may be reused), but audience is Israeli.
- Visual tone: clean, data-forward, professional. Honesty slides (10) and geography (11) are the spine — give them weight, don't bury them.
- The two honesty/geography slides turn the deck from a pitch into a collaboration. Do not soften them.

## v2 — 10-reviewer panel revisions (applied 2026-06-29)

Ran the English deck past 10 independent Opus personas (advisor, VC, customer, RealShare-CEO, securities lawyer, RE fund manager, red-team skeptic, pitch/narrative, Israeli tax expert, quant analyst). Avg ≈ 5.9/10; context-aware lenses scored highest (CEO/advisor/craft/quant 7.5/6.5), harshest were VC 4.5 and tax 4.0. **All actionable deck fixes applied to both EN + HE.** Deck is now **14 slides** (slide 4 cut, Blink moved up).

**Current order (14):** 1 Title · 2 Problem · 3 Rising appetite · 4 Solution · 5 Blink ("Blink for real estate") · 6 The token · 7 Marketplace · 8 vs REIT · 9 US precedent · 10 Numbers · 11 The honest part · 12 Geography · 13 The ask · 14 Appendix.

**Fixes applied:**
- **Numbers integrity:** appendix now reconciles the €3,125 opex (added letting/turnover 4% line; explicit "Operating costs total €3,125"); slide 3 chart shows 2019/2020/2023/2024 so the "3× 2023" claim is supported; slide 10 footnote now states "appreciation-driven — at 0% growth, 5-yr return ≈ rent only" + "before Israeli investor-side tax."
- **Legal/tax wording (lawyer + tax expert):** "behaves like a security / taxes like a stock / tradeable share / stock market / the moat" → softened to "intended to be treated like a security… pending an ITA ruling," "tax automation is the *prize* if confirmed," "tradeable unit," "marketplace for your tokens." Disclaimer legend added to title slide; figure slides carry "illustrative / not an offer" caveats; appendix disclaimer strengthened (capital at risk; classification & tax pending ITA/ISA).
- **Honest slide (11):** bankruptcy-remoteness resolved → "each property ring-fenced in its own SPV"; securities item now shows a *plan/path* (counsel, ISA Fintech-Lab, exemption) not just the risk.
- **Liquidity:** marketplace price card labeled "illustrative mock — not live market data."
- **Yield framing:** slide 10 adds "Why fractional, not a deposit?" answering the deck's own slide-13 question.
- **Geography:** appreciation labeled local-currency nominal CAGR, not FX-adjusted.
- **Narrative/de-jargon (pitch expert):** cut the redundant "capital barrier" slide (folded "start with one token" into the solution); moved Blink up as the comprehension anchor; "eREIT"→"REIT", "Kft."→"a Hungarian company", "STR"→"short-term/Airbnb", "közös költség"→"building service charge".

**Not deck-fixable (strategic, for you, not the slides):** VC's "re-architect around recurring AUM revenue vs front-loaded origination"; the customer's "make a separate customer-facing version"; resolving the geography decision before any *investor* (vs advisor) use. Tracked here as open strategic items.

## v3 — 5-discipline design upgrade (applied 2026-06-29)

Ran the deck past 5 independent Opus design agents (colour/identity, typography, layout/composition, data-viz, iconography/motif). Reconciled and applied to both EN + HE. Visual QA: all 14 slides clean both languages.

- **Colour system → AA-legible 3-colour:** amber TEXT on light is now `#A56B2A` (was `#E0A458`/`#C8893C`, ~2.5:1 — the most-repeated legibility failure); teal darkened to `#1F6675`, green `#2E7D5B`, red `#A8493D`, muted `#5A6B78` (all clear WCAG AA); dark-on-dark cards lightened to `#1B3A5B`. Amber reserved for accent/eyebrow/hero-number + CTA only; green = positive, red = negative.
- **Typography:** header face Cambria → **Georgia** (EN) — drops the "Office default" look; hero numbers set in Georgia too. (HE stays Arial for glyph coverage. NB: LibreOffice QA shows a substitute serif; true Georgia ships with the user's PowerPoint.)
- **Iconography/motif:** one unified medallion — **gold circle + navy solid glyph, 52% glyph scale** — on every concept icon (was 4 different fill logics). Numbered step circles (navy+gold) and semantic check/✗ (green/red) kept as distinct components. Icon swaps: eggs→`FaExclamationTriangle`, claim→`FaFileContract`, blockchain→`FaLink`, liquidity→`FaUsers`.
- **Data-viz:** slide 3 chart highlights 2024 in gold + forced zero baseline (proportional bars); slide 10 left card rebuilt as a **cost/net proportion bar** ("53% of gross survives costs") with the €3,981 net as hero; returns table gets a gold-tint hero row (Total) + muted annualized row; slide 12 geography table unified to one green=favorable / red=unfavorable scale with a **legend** and an encoded friction row — Israel now reads as a red "don't launch here" stripe; teal dropped as a data colour (reserved for brand: the token grid).
- **Misc polish:** uniform card corner radius token; gave teal a real job (the token-grid squares on slide 6).

## v4 — business-model slide (applied 2026-06-29)

Added a **"How RealShare makes money"** slide (now slide 11; deck = **15 slides**) — directly answers the VC/advisor critique that the model looked front-loaded/non-recurring. Shows four revenue streams tagged one-time vs recurring: **Setup fee** (one-time) · **Platform fee ~7% of rent** (recurring) · **Management margin** — RealShare contracts local property management and keeps a few % on top, founder decision 2026-06-29 (recurring) · **Trading fees ~2%/buy-sell** (recurring). Takeaway: 3 of 4 recur and compound with scale + trading volume; honest caveat that recurring revenue must out-scale per-property oversight. The honest slide's "front-loaded economics" card was reworded to "recurring revenue must scale" so the two slides agree. New revenue lever also recorded in `docs/financial-model.md`.

Current order (15): 1 Title · 2 Problem · 3 Rising appetite · 4 Solution · 5 Blink · 6 Token · 7 Marketplace · 8 vs REIT · 9 US precedent · 10 Numbers · 11 How RealShare makes money · 12 Honest part · 13 Geography · 14 The ask · 15 Appendix.
