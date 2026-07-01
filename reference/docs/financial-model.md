# Financial Model

> **Live model:** [`financial-model.xlsx`](financial-model.xlsx) — edit the blue cells (Assumptions sheet) and everything recalculates. This doc is the narrative companion.
>
> Assumptions now use **real Budapest market data** from the `market-researcher` agent (training-knowledge baseline, ~Aug 2025 cutoff — **verify live with a broker/PM firm before investor use**). Logic verified independently in Python. Feeds [DECISIONS.md](../DECISIONS.md) (DEC-08) and [SPEC.md](../SPEC.md) §3.

## ⚠️ TL;DR — the headline finding (now sharper)

With realistic Budapest inputs (a **€150,000** flat at **5%** gross yield, after Hungary's **9% corporate tax** and the **közös költség** common charge):

- **Net yield to the investor ≈ 2.65%** — modest, and *below* what most retail investors expect from "real estate." This is the number to be honest about.
- **RealShare's per-property economics are FRONT-LOADED:** **Year-1 contribution margin ≈ +€605** (driven by the one-time primary fee on the raise) but **steady-state ≈ −€75/yr** — recurring revenue (mgmt skim €525 + secondary €600) doesn't quite cover ongoing oversight (€1,200). So on a *recurring* basis the model **never breaks even** at base assumptions.
- **Implication:** as configured, RealShare is a *transaction* business (earns when it onboards/raises), not an *AUM* business (earning on assets under management). That's fragile — it depends on a constant pipeline of new properties. To make it a durable AUM business you must lift recurring economics: **raise the management skim `f_m`** (e.g. 7%→10%+), **cut per-property oversight cost**, or **drive real secondary-market volume**. Each is a knob in the live model.

None of this says the idea is dead — it says the **fee/cost design is the make-or-break**, and you can now test fixes live.

> **Update 2026-06-29 (founder decision — new revenue lever):** RealShare will also capture a **property-management margin** — contract a local management company and bill investors a few % above its cost (same pattern as the STR third-party-operator setup). This adds a **third recurring stream** alongside the mgmt skim (`f_m`) and secondary trading fees, and is a direct lever to push steady-state CM positive. Revenue streams are now: **(1) setup/primary fee — one-time; (2) platform/mgmt skim ~7% of rent — recurring; (3) property-management margin — recurring [NEW]; (4) secondary trading fees ~2%/trade — recurring.** Model the management margin as an added recurring line; size of (4) still depends on real secondary-market turnover/liquidity. Reflected in the deck's new "How RealShare makes money" slide.

## Assumptions (Budapest data — verify live)

| Parameter | Base | Range | Conf. | Note |
|---|--:|---|:--:|---|
| Apartment size | 50 m² | 38–70 | Med | inner-district 1–2BR |
| Price per m² | €3,000 | €2,400–4,200 | Med | districts V/VI/VII/IX/XIII |
| **Property price (P)** | **€150,000** | €108–236K | — | = size × €/m² |
| Gross rental yield | 5.0% | 4.0–6.5% | Med | → €7,500 rent/yr |
| PM company fee | 10% rent | 8–15% | Med | full-service |
| Letting/turnover (amortized) | 4% rent | ~4% | Med | ~½ month/yr |
| Maintenance + reserve | 5% rent | 5%+ | Med | capex on old stock |
| Vacancy | 5% rent | 3–10% | Med | central districts tight |
| RealShare mgmt skim (`f_m`) | 7% rent | 3–12% | TBD | **lever** |
| Property tax | €0/yr | 0–€139 | High | inner residential usually **exempt** |
| Common charge (közös költség) | €600/yr | €300–1,500 | Med | building service charge |
| Insurance | €200/yr | €120–400 | Med | landlord cover |
| Hungarian CIT | 9% | — | High | lowest in EU |
| Primary / secondary fee | 2% / 2% | 1–3% | TBD | **levers** |
| Secondary turnover (τ) | 20%/yr | 5–50% | Low | speculative |
| Acquisition costs | 6% of price | 6% resale / 10.5% new | High | transfer duty 4% + notary/legal — capitalized into raise |
| Onboarding (appraisal+Kft+listing) | €2,500 | — | Med | Kft setup ~€1k + appraisal |
| Oversight / property / yr | €1,200 | — | Med | incl. Kft accounting ~€600 |
| Annual fixed-cost base (F) | €500,000 | €300–750K | Low | infra+dev+compliance+mktg |
| EUR→ILS | 3.95 | 3.7–4.2 | Low | volatile — use live |

## 1. Per-property waterfall (base case)
```
Gross annual rent (R_g) = €150,000 × 5%        = €7,500
− % deductions (PM10 + turnover4 + maint5 + vacancy5 + RealShare7 = 31%)  = €2,325
− fixed costs (tax €0 + közös €600 + insurance €200)                       = €800
= Net operating income (pre-CIT)                                            = €4,375
− Hungarian CIT @ 9%                                                        = €394
= NET distributable to holders                                             = €3,981
→ Effective NET yield = 3,981 / 150,000 = 2.65%
→ Per token (N=2,000, p_t=€75): €1.99/yr ≈ €0.166/mo ≈ ₪0.66/mo
```

## 2. Platform unit economics (per property)
```
Raise = P + acquisition costs (6%) = €150,000 + €9,000 = €159,000
Revenue:  primary fee (2% × raise) = €3,180 one-time
          mgmt skim (7% × €7,500)  = €525/yr
          secondary (20% × 2% × P) = €600/yr
          → Year-1 revenue €4,305 · steady-state €1,125/yr
Costs:    onboarding €2,500 one-time · oversight €1,200/yr
→ Year-1 CM = +€605   ·   Steady-state CM = −€75/yr
```

## 3. Break-even
Steady-state CM is **negative (−€75/yr)** at base assumptions → **no recurring break-even**: the property pool doesn't pay for the €500K fixed base on recurring economics. The business only works if (a) recurring CM is pushed positive (lever `f_m` / lower oversight / real `τ`), or (b) it's run as a high-volume origination/transaction business on the front-loaded primary fee. Use the live model to find the `f_m` that turns steady-state positive.

## 4. Sensitivity (from the live model)
- **Vacancy → net yield:** 0% → 2.88% · 5% → 2.65% · 10% → 2.43%.
- **Gross yield → net yield:** 4.0% → 2.03% · 5.0% → 2.65% · 6.5% → 3.60%.
- **Fee → Year-1 revenue/property:** 1% → €2,415 · 2% → €4,305 · 3% → €6,195.
- **FX (EUR→ILS) → ₪/token/mo:** 3.7 → ₪0.61 · 3.95 → ₪0.66 · 4.2 → ₪0.70.

## 5. Budapest-specific notes that matter
- **Property tax is effectively €0** for inner residential (big positive vs my original 3% guess).
- **Közös költség (common charge) ~€600/yr** is a real fixed drag — select buildings with low charges.
- **Hungarian CIT is 9%** (lowest in EU) — favorable, but still trims net before distribution.
- **Acquisition costs ~6%** (4% transfer duty + notary/legal) — must be capitalized into the raise; investors fund them like closing costs.
- **Short-term-rental (Airbnb) is heavily restricted** in districts V/VI/VII — **model long-term rent only.**
- **Buying via a Hungarian Kft. avoids the non-EU-buyer permit** that Israeli individuals would otherwise need (60–90 days) — a structural reason to use the company.

## 5b. Short-term rental (STR / Airbnb) scenario — see [DECISIONS.md](../DECISIONS.md) DEC-09
The live model has an **STR sheet** (full cost stack + ADR×occupancy grid). **Correction:** an initial estimate of ~5.5% net was *under-costed*; fully loaded, STR is far less of a slam-dunk. Operating model (decided): **third-party service company at 20%** incl. cleaning; RealShare's 7% skim on top.

| Metric | Long-term | STR — green-zone (ADR €80, 66% occ) | STR — premium (€110, 75% occ) |
|---|--:|--:|--:|
| Gross annual revenue | €7,500 | ~€19,300 | ~€30,100 |
| Investor **net yield** (after CIT) | **~2.65%** | **~2.65%** | **~6.6%** |
| RealShare **steady-state CM / property** | −€75/yr | **+€449/yr** | higher |

**Honest read:** STR maximizes *gross* yield but, after the full stack (platform 9% + IFA 4% + service-company management 20% incl. cleaning + RealShare 7% + commercial utilities + furnishing + wear + building-tax uplift — ~27% to management layers combined), **net yield to the investor is ~2.65% in a licensable district — essentially the same as long-term.** STR only wins at high ADR+occupancy (~6.6%), which lives in the **prime districts that are banned for new STR** (VI banned; V/VII restricted; green zone ≈ District XIII at lower ADR). Two more constraints: income is **seasonal/lumpy** (needs a smoothing reserve), and **some districts license only natural persons, not a Kft.** RealShare's *own* economics do improve under STR (it skims a bigger top line), creating an **alignment tension** (platform gains while investor net ≈ long-term). **Strategic implication:** with third-party management, STR's rationale for the investor is **capital appreciation + access, not headline yield** — be honest about that. *(market-researcher, 2026-06-01; ADR/occupancy need live AirDNA verification — QUESTIONS S1–S5.)*

## 6. Caveats & next steps
1. Figures are an Aug-2025 training-knowledge baseline — **verify €/m², yield, PM fee, közös költség live** (QUESTIONS M1–M4).
2. **Double FX** (HUF→EUR→ILS): rent is collected in HUF; budget 1–2%/yr conversion drag (not yet a separate line).
3. **Israeli-side investor tax** is *not* in this model (only the Hungarian corporate layer) — see [regulatory-strategy.md](regulatory-strategy.md) DEC-04; it will further reduce net-to-investor.
4. **Decide `f_m` against a target net yield**, and decide whether RealShare is a transaction or AUM business — that framing choice drives everything.

> Open the spreadsheet, change the blue cells, and watch the waterfall, unit economics, break-even, and sensitivity update. Best next input: 3–4 real listings + one PM-fee quote.
