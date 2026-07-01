# RealShare — Decision Log

> The launch-gating open questions, tracked to resolution. Each entry: **status · the question · options · recommendation · what's needed to close**. Recommendations marked _(agent-informed)_ draw on [docs/regulatory-strategy.md](docs/regulatory-strategy.md) and [docs/financial-model.md](docs/financial-model.md). None is final until the owner confirms — and the legal ones until counsel confirms.

**Legend:** 🔴 blocks launch · 🟠 important, not blocking · 🟢 resolved
**Status values:** `OPEN` · `RESEARCHING` · `RECOMMENDATION` (proposed, awaiting decision) · `DECIDED` · `CLOSED`

| ID | Decision | Sev | Status |
|---|---|:--:|---|
| [DEC-01](#dec-01) | Incorporation jurisdiction / entity structure | 🔴 | RECOMMENDATION |
| [DEC-02](#dec-02) | Securities regulation (ISA) approach | 🔴 | RECOMMENDATION |
| [DEC-03](#dec-03) | Ownership vehicle & bankruptcy remoteness | 🔴 | RESEARCHING (founder leaning A) |
| [DEC-04](#dec-04) | Israeli tax classification of tokens | 🔴 | RECOMMENDATION |
| [DEC-05](#dec-05) | Blockchain platform | 🟠 | OPEN |
| [DEC-06](#dec-06) | Exit-vote rules (threshold / holding period / cooldown) | 🟠 | OPEN |
| [DEC-07](#dec-07) | Funding-window duration | 🟠 | OPEN |
| [DEC-08](#dec-08) | Fee structure (the levers that decide viability) | 🔴 | RESEARCHING |
| [DEC-09](#dec-09) | Rental strategy: long-term vs short-term (Airbnb) | 🔴 | RESEARCHING (founder leaning STR) |

---

<a name="dec-01"></a>
## DEC-01 — Incorporation jurisdiction / entity structure 🔴

**Status:** RECOMMENDATION _(agent-informed)_

**Question:** Where to incorporate the parent/holding entity, given Israeli customer-facing ops + Hungarian property ownership + token issuance?

**Options:** Israel · Hungary · Estonia · Cyprus · multi-entity structure.

**Recommendation:** A **three-entity structure** — (1) Israeli operating subsidiary (customers, staff, app; ISA-regulated), (2) Hungarian *Kft.* per property (owns real estate — also solves foreign-ownership and serves as the SPV, see DEC-03), (3) holding company **Israeli to start** (lowest cost for a solo pre-seed founder), adding a **Cyprus** layer only when external investment makes tax optimization worth the substance requirement.

**To close:** Corporate/tax counsel confirms the structure; decide Israeli vs Cyprus holdco timing. Depends on DEC-02 outcome.

<a name="dec-02"></a>
## DEC-02 — Securities regulation (ISA) approach 🔴 _(master blocker)_

**Status:** RECOMMENDATION _(agent-informed)_

**Question:** Is the token a regulated "security"/"investment unit" under Israeli law? Does the secondary market or publishing yields require separate licensing?

**Options:** Full prospectus · rely on exemption (≤35 offerees / sophisticated-investor / small-offering) · argue outside the "security" definition · engage the ISA Fintech Lab.

**Recommendation:** Engage the **ISA Fintech Lab in parallel with a formal classification opinion**; structure the first round inside the sophisticated-investor exemption, keep the initial cohort <35; **defer the secondary marketplace** until classification resolves; don't publish specific yields until marketing-licensing is cleared.

**To close:** Written classification opinion from an Israeli securities lawyer. **This blocks product design, marketing, and fundraising — start within 60 days.**

<a name="dec-03"></a>
## DEC-03 — Ownership vehicle & bankruptcy remoteness 🔴

**Status:** RESEARCHING — **founder leaning Option A**, pending counsel.

**Confirmed model:** A Hungarian company holds legal title to the property; investors hold **tokenized contractual financial rights** to the property's income + sale proceeds (not the deed). The open question is *how many* property-owning companies, and *against whom* the investor rights run.

**Question:** How to structure the property-owning vehicle so token holders aren't merely unsecured creditors if a company fails?

**Options:**
- **A — One pooled Hungarian company owns all properties.** _(Founder's current leaning.)_ Cheap, simple, near-zero per-property legal setup. **Risk:** no isolation — one property's liability (lawsuit, debt, tax) can reach assets backing *all* investors; a single failure exposes everyone together; more likely to be treated as a collective fund (AIFMD).
- **B — One company (SPV/Kft.) per property.** _(Legal-agent recommendation.)_ Each property walled off / bankruptcy-remote; clean per-property failure story. **Cost:** per-property legal setup, and "remote" only with strict hygiene (no parent guarantees, no cash commingling, audited separate accounts).
- C — Trust · D — Foundation (Stiftung) · E — contractual-only (insufficient).

**Open tension:** Founder's leaning (A) optimizes cost/simplicity; the legal/competitive analysis recommends (B) for investor protection. This is the core trade-off to resolve with counsel. A middle path exists (e.g. SPVs only above a property-value threshold, or pooled now → migrate to SPVs at scale).

**Update (STR, [DEC-09](#dec-09)):** running short-term rentals is *active commercial* activity — a *pooled* Kft. doing STR more strongly triggers AIFMD "collective investment" classification + MNB scrutiny, and pools STR's higher (seasonal/regulatory) volatility across all investors. **This pushes further toward Option B (SPV-per-property)** and weakens the pooled lean.

**Hard requirement regardless of A/B:** Investor financial rights must run **against the Hungarian property-owning company** (ideally secured by a registered charge/pledge over the property), **not against RealShare the platform** — so that a platform bankruptcy doesn't strand investors even though a Hungarian entity holds the building.

**To close:** Hungarian insolvency/structured-finance counsel reviews A vs B against IL + HU insolvency law and AIFMD exposure; confirm the charge/pledge mechanism is feasible; founder picks the structure given the cost/protection trade-off.

<a name="dec-04"></a>
## DEC-04 — Israeli tax classification of tokens 🔴

**Status:** RECOMMENDATION _(agent-informed)_

**Question:** How does the ITA classify monthly distributions and secondary-sale gains? What's needed to withhold at source and issue compliant annual reports?

**Recommendation:** **File a binding advance/pre-ruling (Sec. 158B, ~3–6 months) before launch.** Interim: withhold at the highest plausible rate (25%) and reconcile annually. Engage a Big-4 IL tax group with a digital-assets practice.

**To close:** Pre-ruling filed; withholding + annual-certificate pipeline designed. **[BLOCKS LAUNCH if withholding from day one.]**

<a name="dec-05"></a>
## DEC-05 — Blockchain platform 🟠

**Status:** OPEN

**Question:** Which private/permissioned chain (Hyperledger Fabric / Corda / custom / other)?

**Considerations:** dev timeline, scalability, cost; competitive note — a private chain concentrates custody risk (if the platform dies, holders rely on contracts not crypto guarantees), so it must be paired with strong legal/escrow architecture and disclosed plainly. *Lower urgency: this is not on the launch critical path and can follow DEC-02.*

**To close:** Technical evaluation (proposed agent: `blockchain-developer`) once the legal model is settled, since classification may constrain the design.

<a name="dec-06"></a>
## DEC-06 — Exit-vote rules 🟠

**Status:** OPEN

**Question:** Supermajority threshold (e.g. 67%?), minimum holding period before a sale can be proposed (2–3 yrs?), voting-window length (7–14 days?), and cooldown before a new vote.

**Note:** Deferred feature (not in MVP), but the rules belong in the token terms drafted under DEC-02/03. Document in plain language (competitive best practice).

**To close:** Founder sets defaults; counsel confirms enforceability in the token contract.

<a name="dec-07"></a>
## DEC-07 — Funding-window duration 🟠

**Status:** OPEN

**Question:** How long should a funding round stay open (days / 2–4 weeks / longer)?

**Trade-off:** Longer window → more escrow interest (bigger seller bonus / failed-round refund) but slower capital velocity and longer user wait. Interacts with the escrow-interest economics in DEC-08.

**To close:** Founder picks a starting value (suggest 2–4 weeks) to test; revisit with real data.

<a name="dec-08"></a>
## DEC-08 — Fee structure 🔴 _(decides viability)_

**Status:** RESEARCHING _(agent-informed)_

**Question:** Primary txn fee (1–3%), secondary txn fee (1–3%), monthly management skim `f_m`, premium-subscription pricing.

**What the model says** ([docs/financial-model.md](docs/financial-model.md)): under base assumptions per-property economics are **negative in Year 1** and break-even needs ~1,500 properties. Viability levers:
- **Capitalize the ~€6K onboarding cost into the raise** (flips Year-1 margin positive).
- **Primary fee ≈ 3%** is roughly the first-year profitability floor.
- **Higher `f_m`** raises revenue but *lowers advertised investor yield* — the central tension.
- **Real secondary turnover** matters but is the most speculative input.

**Recommendation (provisional):** Capitalize onboarding into the raise; primary fee toward 3%; set `f_m` deliberately against a target net investor yield; treat secondary-fee revenue as upside, not base.

**To close:** Validate Budapest market inputs (price, gross yield, PM fee) with a local advisor; build the live spreadsheet model; pick fee levels against a target net yield. **Do before any investor conversation.**

<a name="dec-09"></a>
## DEC-09 — Rental strategy: long-term vs short-term (Airbnb) 🔴

**Status:** RESEARCHING — **founder leaning short-term (STR)** to maximize yield.

**Question:** Do acquired properties run as long-term rentals or short-term (Airbnb-style) lets?

**Why it matters:** It roughly **doubles investor net yield and flips RealShare's recurring economics positive** — but it collides with Budapest regulation and changes the operating model.

**Operating model (DECIDED):** management via a **third-party service company at 20%** (incl. cleaning) — *not* in-house. (Resolves Q:S6.) RealShare's own 7% skim applies on top → ~27% to management layers combined.

**What the model shows** (full-cost STR, third-party 20%, see [docs/financial-model.xlsx](docs/financial-model.xlsx) STR sheet — initial "5.5%" estimate was corrected down after full costing):
- Investor **net yield ≈ 2.65% (STR, green-zone ADR €80/66% occ) ≈ 2.65% (long-term)** — essentially **the same** in a licensable district. STR only pulls ahead at high ADR+occ (~€110/75% → ~6.6%), which lives in the banned prime districts.
- RealShare **steady-state CM ≈ +€449/yr (STR) vs −€75/yr (long-term)** — STR *does* improve RealShare's own economics (bigger top line to skim). **Alignment tension:** the platform gains while the investor's net is no better than long-term.

**The gating risk (🔴):** Budapest curtailed new STR in 2024–25. **Zones:** RED = VI (new-licence ban), VII (near-ban), inner V. AMBER = inner VIII/IX (per-building, tightening). GREEN = **District XIII (Angyalföld/Váci corridor)**, outer VIII/IX, Buda II/III, agglomeration towns — lower ADR. Also: **some districts license only natural persons, not a Kft.** — a potential structural blocker for the fractional model.

**Other trade-offs:** STR income is **seasonal/lumpy** → complicates the monthly token-holder "dividend" (needs a smoothing reserve); higher operating intensity; commercial building-tax uplift; tourism tax (IFA 4%); VAT registration above ~€30k revenue.

**Recommendation:** With third-party management decided, the investor's STR net yield ≈ long-term in a licensable district — so **STR's case rests on capital appreciation + access + RealShare's better skim economics, not headline yield.** Be honest with investors that net ≈ long-term.

**Recommended operating structure (legal-advisor):** Target **District XIII** (company-permissive) and have the **property-owning Kft. itself register as the STR operator** ("szálláshely-szolgáltató"), with the service company running operations under a contract. This beats having the service company hold the licence (Option 2 — adds counterparty risk; a "natural-persons-only" district rule may exclude corporate operators anyway) and a natural-person licence (Option 3 — avoid; halts revenue on that person's insolvency, not transferable on sale).

**New per-building gate (biggest single-property risk):** Hungarian condominium law needs a **~⅔ supermajority vote of the building's társasház** to authorize commercial STR use. This is a *building-by-building* gate even in District XIII → make it a **condition precedent in every acquisition**, and secure the licence **before closing**, not after.

**Interaction with DEC-03:** STR is active commercial activity → a *pooled* Kft. running STR raises AIFMD "fund" classification + MNB risk. **STR strengthens the case for SPV-per-property over the founder's pooled lean.** See [DEC-03](#dec-03).

**To close:** (1) HU counsel confirms District XIII binds corporate entities (not natural-persons-only) + reviews the specific building's deed of foundation (Q:S1–S2) — *gating.* (2) Live ADR/occupancy from AirDNA (Q:S3). (3) Design seasonal distribution smoothing (Q:S5). (4) Confirm 20% service-company scope w/ 2–3 operators. (5) Confirm income characterization (rental vs commercial) for NAV + MNB/Kbftv. exposure.

---

## How to use this log
- When something changes, update the entry's **Status** and the summary-table row.
- When a decision is made, record the choice + date + rationale, set status `DECIDED`, and propagate the resolved value into [SPEC.md](SPEC.md) (replace the matching `TBD → DEC-NN`).
- New launch-gating questions get the next `DEC-NN` id.
