# Regulatory & Structuring Strategy

> **Not legal advice.** Strategic orientation for planning and for walking into counsel prepared. Produced by the `legal-advisor` agent (2026-06-01) and synthesized here. Every structural decision must be confirmed with licensed counsel in the relevant jurisdiction. Feeds directly into [DECISIONS.md](../DECISIONS.md) (DEC-01–04).

## TL;DR for the founder

- **The securities-classification opinion is the master blocker.** Until an Israeli securities lawyer tells you whether the token is a regulated "security," product design, marketing, and fundraising all sit on sand. Start this in the first 60 days. → **DEC-02**
- **Three-entity structure is the likely answer:** Israeli operating subsidiary (customer-facing) + Hungarian *Kft.* per property (owns the real estate, solves foreign-ownership cleanly) + a holding company (Israeli to start; add Cyprus layer only when external investment makes tax optimization worth the substance cost). → **DEC-01**
- **SPV-per-property (Hungarian Kft.) is the recommended bankruptcy-remote structure** — industry standard and scalable, but only "remote" if you keep strict corporate hygiene (no parent guarantees, no commingled cash, separate accounts). → **DEC-03**
- **File for an advance tax ruling (pre-ruling, ~3–6 months) early**, and withhold at the highest plausible rate in the interim to avoid under-withholding liability. → **DEC-04**
- **Defer the secondary marketplace launch** until classification is resolved — running a P2P trading venue may itself require a trading-platform license, a second regulatory burden on top of issuance.
- **MiCA vs MiFID:** if the token is a "financial instrument" under EU securities law, MiCA likely doesn't apply (but document that classification carefully). If not, you may need an EU-domiciled issuer.

---

## 1. Israeli securities regulation (ISA) — DEC-02

**Question:** Is a tokenized contractual right to rental income + sale proceeds a "security" / "investment unit" under the Securities Law 5728-1968 or the Joint Investment Trusts Law 5754-1994? Does running the secondary market or publishing yields trigger separate licensing?

**Options**
- **A — Full prospectus / registered offering.** Maximum certainty and scalability; likely operationally fatal at seed stage (cost, months of lead time, ongoing reporting).
- **B — Rely on an exemption** (the "35 offerees in 12 months" rule, the sophisticated/accredited-investor exemption, or small-offering exemption). Defers the prospectus but caps early growth; exceeding limits creates retroactive non-compliance exposure.
- **C — Argue the token falls outside the statutory "security" definition** (closer to a profit-sharing loan or membership interest). Aggressive and untested for blockchain instruments in Israel; regulators tend to look through form to economic substance.
- **D — Engage the ISA Fintech Lab / sandbox proactively** for informal guidance. Adds timeline but cuts enforcement risk during the critical early window.

**Recommendation:** Pursue **D in parallel with a formal classification opinion**. Structure the first round inside the sophisticated-investor exemption and keep the initial cohort well under 35 investors to preserve optionality. **Delay the secondary market.** Don't publish specific yield projections until counsel reviews investment-marketing licensing implications (Regulation of Investment Advice/Marketing/Portfolio Management Law 5755-1995).

**Ask counsel:** (1) Does this token meet the statutory "security"/"investment unit" definition under current ISA guidance/case law? (2) Does a bilateral P2P marketplace constitute a licensable trading platform under the Trading in Financial Instruments Law 5761-2001? (3) Current thresholds/conditions for the sophisticated-investor and small-offering exemptions for tokenized instruments? (4) Current ISA Fintech Lab posture/guidance post-2024? (5) Does publishing yields require investment-marketing licensing?

## 2. Hungarian & EU dimension

**AIFMD:** If RealShare/SPV is a "collective investment undertaking raising capital to invest per a defined policy," AIFMD authorization/depositary/reporting applies. A single-property SPV that isn't actively managed in the fund sense and offers no redemption rights may argue it's outside scope — but regulators interpret broadly. Commission a formal AIFMD scoping opinion before the first acquisition.

**MiCA (in force across EU since Dec 2024):** A token that is a "claim on the issuer" (RealShare's clearly is) may fall in scope — **unless** it's already a MiFID-II financial instrument, which is excluded. Document the classification carefully; a non-EU issuer under MiCA is genuinely complex and may require an EU-domiciled issuer entity.

**Hungarian property ownership:** A non-EU (Israeli) entity owning Hungarian residential property directly may face restrictions. **Standard workaround: a Hungarian *Kft.* (LLC) as the direct owner.** This doubles as the SPV (below).

**Ask counsel:** AIFMD scope + sub-threshold manager exemption at early scale; MiFID-II vs MiCA classification in Hungary; non-EU direct ownership vs Kft.; any MNB (Hungarian regulator) notification obligations.

## 3. Bankruptcy remoteness (CRITICAL) — DEC-03

**Question:** Today token holders are unsecured creditors of RealShare. How do you genuinely ring-fence property assets if RealShare fails?

**Options**
- **A — SPV per property (Hungarian Kft.).** Industry standard, scalable. "Remote" only with disciplined hygiene: no cross-default with parent, no parent guarantees, independent management, no cash commingling, audited separate accounts.
- **B — Trust structure** (Israeli or English-law trustee holding for token-holder beneficiaries). Stronger legal separation; needs a regulated trustee (ongoing cost + counterparty risk).
- **C — Foundation (Liechtenstein/Dutch Stiftung).** No shareholders → eliminates parent-claim risk; expensive to run.
- **D — Contractual ring-fencing only** (segregated accounts + lien, no separate entity). Weakest; will *not* survive insolvency.

**Recommendation:** **SPV-per-property (A)** as the default, with an insolvency specialist reviewing the documents against Israeli *and* Hungarian insolvency law, and an internal corporate-hygiene policy reviewed annually. Consider giving token holders a registered charge/pledge over the property or SPV shares as a backstop if feasible under Hungarian law.

## 4. Israeli tax classification — DEC-04

**Question:** How does the Israel Tax Authority (ITA) classify (a) monthly distributions and (b) capital gains on secondary token sales? What's needed to withhold at source and issue compliant annual reports?

**Reality:** No definitive ITA ruling on tokenized real-estate rights. Likely axes: rental income (marginal vs the reduced rental tracks), capital gains (~25% for individuals, or business income if a "dealer"), crypto-asset treatment (property since Circular 5/2018 → capital gains but restricted loss-netting), or re-characterization as interest income. Source withholding for secondary trades — where RealShare isn't a party — is genuinely novel.

**Recommendation:** **File for a binding advance/pre-ruling (Sec. 158B; ~3–6 months) before launch.** Interim: withhold at the highest plausible rate (25%) and reconcile at annual reporting to avoid under-withholding liability. Engage a Big-4 Israeli tax group with a digital-assets practice.

## 5. Incorporation jurisdiction — DEC-01

| Jurisdiction | Pros | Cons |
| --- | --- | --- |
| **Israel** | Close to customers/investors; avoids foreign-entity registration for IL-facing ops | Two-tier with HU sub → inter-company withholding; full ISA reach |
| **Hungary** | — | Holding here is unusual; may pull AIFMD obligations more directly. Not recommended as primary holdco |
| **Estonia (OÜ)** | Cheap/fast; low tax on undistributed profit; EU-domiciled (MiCA) | BEPS substance scrutiny; may be re-characterized as Israeli-resident if no real ops |
| **Cyprus** | Common for Israeli founders; IL treaty; 12.5% tax; EU-domiciled; active crypto licensing (CySEC) | ITA scrutiny on Cyprus holdcos; treaty benefits need genuine substance |

**Recommended structure:**
1. **Israeli operating subsidiary (Ltd.)** — customers, staff, the app; ISA-regulated as required.
2. **Hungarian *Kft.* per property** — owns real estate, collects rent, distributes to holders.
3. **Holding company** — Israeli to start (lowest cost for a solo pre-seed founder); add a **Cyprus** layer only when external investment makes tax optimization material (and you can fund real substance).

---

## 6. STR licensing & operating structure (DEC-09)

If properties run as short-term rentals (founder's direction), the licence to operate ("szálláshely-szolgáltató" registration) is district-level and is the structural chokepoint. Four paths:

1. **Kft. (SPV) self-registers as operator — RECOMMENDED.** In a company-permissive district (≈**District XIII**, parts of outer VIII/IX), the property-owning Kft. holds the licence directly; the third-party service company runs operations under a services contract. **Cleanest income characterization, strongest bankruptcy-remoteness, clearest investor disclosure.**
2. **Service company holds the licence.** The 20% operator registers as szálláshely-szolgáltató; the Kft. receives net income by contract. *Works but second-best* — adds counterparty risk (operator insolvency/licence loss halts revenue), and a "natural-persons-only" district rule may exclude a corporate operator too, so it isn't a guaranteed sidestep.
3. **Natural-person licence + mandate to the Kft.** — *avoid.* The income licence sits in a person's name; their insolvency/withdrawal halts revenue, the licence isn't transferable on sale, and it degrades bankruptcy-remoteness to an unsecured contractual claim.
4. (Underlying choice) **pooled Kft. vs SPV-per-property** — see below; STR pushes toward SPV-per-property.

**The per-building gate (biggest single-property risk):** Hungarian condominium law requires a **~two-thirds supermajority vote of the building's társasház (condominium assembly)** to authorize commercial STR use, unless the deed of foundation already permits it. This is a *building-by-building* gate even in a permissive district, can be conditioned/revoked, and must be a **condition precedent in every acquisition** (secure the vote — and ideally the licence — *before* closing, not after).

**STR ⇄ structure interaction (feeds DEC-03):** STR is *active commercial* activity. A **pooled** Kft. running STR across many units more strongly triggers AIFMD "collective investment undertaking" classification (capital-raising + management + active operation) and MNB scrutiny under the Kbftv./Bszt. **SPV-per-property** both reduces that AIF risk and isolates STR's higher volatility (a bad season or a district ban in one property shouldn't impair others). → STR **weakens the case for the founder's pooled lean** and strengthens SPV-per-property.

**Recommended default:** District XIII + **Kft.-as-operator** + service company under contract + condominium approval as a closing condition + acquire the licence pre-closing. Disclose district-regulatory-change risk prominently.

**Pre-commitment checklist for Hungarian counsel:** (1) does the district STR rule bind corporate entities or only natural persons (cite current ordinance)? (2) can a corporate service company hold the licence as fallback? (3) review the specific building's deed of foundation + prior assembly resolutions; (4) NTAK + tourism-tax obligation allocation when operator ≠ owner; (5) income characterization (rental vs commercial) for NAV; (6) MNB/Kbftv. exposure from token issuance + active STR; (7) fire-safety/building permits for the unit.

## Critical path to launch (sequencing)

1. **0–60 days:** Formal Israeli securities classification opinion *(blocks everything)*. Stand up the Israeli operating entity + a Hungarian Kft. shell.
2. **Months 1–3:** Engage ISA Fintech Lab; **start the ITA advance tax ruling** (long lead); commission AIFMD scoping opinion. **[BLOCKS LAUNCH]** — tax ruling + ISA position needed before taking investor funds.
3. **Months 2–4:** Draft token subscription agreements + secondary-market terms from the classification opinion; design SPV documents with bankruptcy-remoteness review.
4. **Months 3–5:** Finalize source-withholding mechanics + annual tax-certificate pipeline. **[BLOCKS LAUNCH]** if withholding from day one.
5. **Post first close:** Re-check MiCA once the token is live; reassess holdco jurisdiction after first external funding.

## Verify (knowledge may be dated)
ISA Fintech Lab current status/posture · ESMA MiCA implementing guidance post-Jan 2025 · ITA guidance on tokenized instruments 2025–2026 · Hungarian foreign-ownership rules post-2024 · CySEC's current crypto licensing under MiCA.
