---
name: realshare-overview
description: "What RealShare is — the product concept, target market, and the biggest unresolved risks"
metadata: 
  node_type: memory
  type: project
  originSessionId: 054655c3-88c4-4007-ba97-90140de8bdf0
---

**RealShare** = mobile-first (web-supported) platform letting Israeli retail investors buy fractional shares of Budapest residential real estate, represented as tokens on a private/permissioned blockchain. Users hold tokenized *contractual financial rights* against RealShare (not direct property ownership) → proportional monthly rental income + capital gains on sale.

**Core mechanics:** Seller lists property → independent appraisal → funding round (funds held in interest-bearing locked account) → if funded, RealShare buys property, tokens activate; if not, investors refunded principal + interest. Ongoing: rent collected → deductions → proportional payouts. Secondary P2P marketplace for liquidity. Property-sale votes (supermajority) for exit. Platform auto-handles Israeli tax (Blink-style).

**Why:** Democratize real estate investing for Israeli millennials/Gen-Z priced out of Tel Aviv property.

**Biggest unresolved risks (NOT engineering — these gate launch):**
- Securities regulation (ISA) — token rights may be regulated securities; founder's own spec says this "could block launch entirely."
- Bankruptcy remoteness — needs SPV-per-property or trust so investors aren't unsecured creditors if RealShare fails.
- Tax classification of tokenized real-estate rights under Israeli law — unruled.
- Incorporation jurisdiction (Israel / Hungary / Estonia / Cyprus).

**How to apply:** When advising, treat the legal/regulatory/structuring questions as the critical path, not the app build. The full source spec lives in Google Drive — see [[realshare-spec-source]].

**Update 2026-06-28 (founder direction, supersedes Budapest-only framing above):**
- **Scope is multi-market, not Budapest-only.** RealShare = fractional rental property for Israeli investors **at home in Israel AND abroad**. Budapest is the *prototype/first modeled market*, not the scope.
- **Geography is an OPEN strategic question.** Working comparison (5-yr nominal appreciation / gross yield / investor-flat entry): Budapest ~13% / 5.0–5.6% / €100–170K; Athens ~10% / 5.0–5.4% / €90–170K; Portugal ~15% / 3.8–4.7% / €130–320K (Golden-Visa RE route ended Oct 2023, EU-flagged overvalued); Israel/Tel Aviv ~9% / 3.1–3.6% / €500–650K. Read: **Budapest & Athens lead on yield+appreciation+entry; Israel is the "why" (motivation) not the "where"; Portugal has the most caveats.** (Sourced baselines — verify live.)
- **Tax strategy: aim for STOCK-LIKE / securities treatment**, not real-estate treatment (founder-confirmed). Clean flat ~25% CG, automatable at source → preserves the Blink tax-automation moat; adds no new regulation beyond the securities path already assumed (DEC-02); real-estate treatment is likely unavailable (token = contractual claim on foreign property, not Israeli title), automation-hostile, and doesn't escape ISA anyway. Lock via the ITA advance ruling (DEC-04). → Worth reflecting in repo DECISIONS.md DEC-04.
- **Deliverable built:** advisor pitch deck `RealShare-Advisor-Deck.pptx` (14 slides) + spec `docs/pitch-deck-advisor-spec.md`. Audience = an Israeli investor-operator with real estate in Portugal/Greece/Israel; posture = honest sanity-check + advisor, geography handed to him as the collaborative question.

**Workspace & current state (as of 2026-06-01):** A strategy + product workspace exists at `/Users/edenheiser/Desktop/realshare/` (README, CONTEXT, SPEC, AGENTS, DECISIONS + docs/regulatory-strategy, competitive-landscape, financial-model). **Docs-only, no app code by deliberate choice** until launch-gating decisions resolve. Read AGENTS.md + CONTEXT.md to ramp. Key non-obvious finding (now backed by a live model with real Budapest data, `docs/financial-model.xlsx`): with a €150K flat at ~5% gross yield, after Hungary's 9% CIT + közös költség, **net yield to the investor is only ~2.65%**, and **RealShare's steady-state per-property margin is slightly NEGATIVE (~−€75/yr)** while Year-1 is positive (~+€605) — i.e. it's a front-loaded *transaction* business, not an AUM business, as configured. Viability hinges on lifting recurring economics (raise the mgmt skim f_m, cut per-property oversight, real secondary volume). Also: property tax ~0, ~6% acquisition costs, Airbnb restricted (model long-term), Kft route avoids the non-EU buyer permit. Securities classification (DEC-02) is the master legal blocker. (Snapshots — verify against the current workspace docs, which are authoritative.)
