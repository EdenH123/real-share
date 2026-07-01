# RealShare — Context

> The "why" behind RealShare. Read this first. For *what we're building*, see [SPEC.md](SPEC.md). For *how we work*, see [AGENTS.md](AGENTS.md). For *open questions gating launch*, see [DECISIONS.md](DECISIONS.md).

---

## One-line pitch

**Invest in real estate like you invest in stocks — starting from any amount.**

RealShare lets Israeli retail investors buy fractional shares of Budapest residential apartments, represented as tokens, and earn proportional monthly rental income plus capital gains on sale — without ever dealing with property law, tenants, or maintenance.

## The problem

Israeli millennials and Gen-Z are largely priced out of domestic real estate (especially Tel Aviv). Real estate remains the asset class they most associate with wealth-building, but the entry ticket is enormous, the process is illiquid and opaque, and cross-border property investment is intimidating and operationally heavy.

## The solution

A mobile-first platform (web-supported) that:

1. **Fractionalizes** Budapest residential property into affordable tokens (no minimum investment).
2. **Crowdfunds** each acquisition through a time-boxed funding round, with investor money held in interest-bearing escrow and refunded *with interest* if the round fails — so participating carries zero financial downside.
3. **Distributes** net rental income monthly, proportional to holdings.
4. **Provides liquidity** through an in-app peer-to-peer secondary marketplace, so investors aren't locked in.
5. **Handles the hard parts** — property management, currency conversion (HUF/EUR→ILS), and Israeli tax withholding/reporting — on the investor's behalf (modeled on how the Israeli app *Blink* abstracts tax for Israelis investing in US stocks).

## Who it's for

- **Primary:** Israeli millennials/Gen-Z (25–40) who want real-estate exposure but can't afford whole properties.
- **Secondary:** Israeli investors already interested in Budapest real estate who want a simpler, fractional route.
- **Tertiary:** Diversification-seekers looking beyond stocks and crypto.

## Why Budapest, why now

Budapest offers comparatively low entry prices and attractive gross rental yields versus Tel Aviv, inside the EU, with an established expat-rental market. The "Israel→Budapest" corridor is a deliberate, defensible niche rather than a generic global play. *(Specific yield/price figures are being researched — see [docs/financial-model.md](docs/financial-model.md) and [docs/competitive-landscape.md](docs/competitive-landscape.md).)*

## The founder

Solo founder, **data-scientist background**. Strong on quantitative analysis, modeling, and product thinking; leaning on the AI agent team (see [AGENTS.md](AGENTS.md)) for legal, engineering, and infrastructure depth. Operating philosophy: resolve the idea's biggest risks *before* writing code.

## Current state (2026-06-01)

- A complete first-draft product specification exists (originated as a Google Doc; now refined into [SPEC.md](SPEC.md)).
- **No code yet — by deliberate choice.** Several launch-gating decisions (securities regulation, bankruptcy-remote structure, tax classification, incorporation jurisdiction) are unresolved, and building before resolving them risks baking in wrong assumptions. See [DECISIONS.md](DECISIONS.md).
- This workspace is the **strategy + product foundation**: a single source of truth for the idea, the open decisions, and the de-risking analysis, set up so execution can proceed cleanly once the critical path clears.

## What success looks like (near-term)

Not "an app." Near-term success is **a defensible, investor-grade plan**: a clear regulatory/structuring path validated by counsel, a financial model that holds up to scrutiny, a sharp competitive position, and a scoped MVP ready to build the moment the legal critical path clears.

## The critical insight

> RealShare's hardest risks are **legal and structural, not technical.** The spec itself flags that securities regulation "could block launch entirely." So the work is sequenced accordingly: de-risk the structure first, model the economics, sharpen the position — *then* build the narrowest viable slice.

---

## Glossary

| Term | Meaning |
| --- | --- |
| **Token** | A unit representing a fractional, tokenized *contractual financial right* against RealShare (or a property SPV) — **not** direct property ownership. Entitles the holder to proportional net rental income + sale proceeds. |
| **Funding round / primary market** | The time-boxed window in which investors buy a new property's tokens. Funds sit in interest-bearing escrow until the round closes. |
| **Locked escrow** | The interest-bearing account holding investor funds during a funding round. Interest becomes the seller's bonus (if funded) or the investors' bonus (if refunded). |
| **Secondary market** | The in-app peer-to-peer marketplace where token holders trade with each other at market-discovered prices. |
| **SPV (Special Purpose Vehicle)** | A separate legal entity that owns a single property, intended to be *bankruptcy-remote* from RealShare so investors aren't exposed if RealShare fails. See [DECISIONS.md](DECISIONS.md). |
| **Exit vote** | A supermajority vote among a property's token holders to force a sale of the whole property. |
| **Net distributable** | Rent remaining after the deduction waterfall (taxes, management fee, platform fee, maintenance/reserve, insurance) — the amount split among token holders. |
| **KYC/AML** | Know-Your-Customer / Anti-Money-Laundering identity verification required before investing. |
| **ISA** | Israel Securities Authority — the regulator whose treatment of RealShare's tokens is a launch-gating question. |
| **Blink** | An Israeli investing app cited as the model for automated tax handling of foreign investments. |
