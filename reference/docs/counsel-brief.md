# RealShare — Counsel Briefing

> **Purpose:** a self-contained briefing to hand (or email ahead) to legal counsel so paid time is spent on *answers*, not explanation. Prepared by the founder. **Not itself legal advice.** Two specialists are needed: an **Israeli securities & tax lawyer** and a **Hungarian property/corporate/hospitality lawyer**; a few cross-border items need both.
>
> Source of truth for the underlying analysis: [regulatory-strategy.md](regulatory-strategy.md) and [DECISIONS.md](../DECISIONS.md). Each question references its decision ID (DEC-NN) / question ID (L#, S#).

**Prepared:** 2026-06-01 · founder: Eden Heiser (eden@tennasys.com)

---

## 1. The model in one page (so counsel has the facts)

RealShare lets **Israeli retail investors** buy fractional shares of **Budapest residential apartments**. Mechanics:
- A **Hungarian company (Kft.)** holds legal title to each property. Investors do **not** own the property or hold Kft. equity — they hold **tokenized contractual financial rights** (on a private/permissioned blockchain) entitling them to proportional **net rental income + sale proceeds**.
- **Primary market:** time-boxed crowdfunding rounds; investor funds sit in **interest-bearing escrow**; if the round fails, investors are refunded principal + interest; if it succeeds, the Kft. buys the property and tokens activate.
- **Secondary market:** an in-app **peer-to-peer marketplace** where token holders trade at market prices (RealShare takes a fee).
- **Exit:** a **supermajority token-holder vote** can force a whole-property sale; proceeds distributed; tokens burned.
- **Operations:** properties are run as **short-term rentals (Airbnb)** via a **third-party service company (~20% of revenue)**; RealShare takes a ~7% management skim + transaction fees.
- **Tax:** RealShare intends to **withhold and report Israeli tax** on investors' behalf (Blink-style).

**Decisions already taken (for context):** STR operations outsourced to a third-party service co at 20%; founder *leaning* toward a single pooled Hungarian company but aware STR/AIFMD may favour SPV-per-property; target district likely **XIII**.

---

## 2. For Israeli securities & tax counsel

### A1 — Securities classification *(DEC-02 · BLOCKING — gates product, marketing, fundraising)*
1. Does a **tokenized contractual right to rental income + sale proceeds** constitute a "security" / "investment unit" under the Securities Law 5728-1968 or the Joint Investment Trusts Law 5754-1994?
2. Does operating the **peer-to-peer secondary marketplace** require a trading-platform/exchange licence (Trading in Financial Instruments Law 5761-2001)?
3. Does publishing **expected-yield figures** in marketing trigger investment-marketing/advice licensing (Law 5755-1995)?
4. Which **exemptions** are realistically available (≤35 offerees / 12 mo; sophisticated-investor; small-offering), with current thresholds — and can we stage the first round inside one?
5. Is the **ISA Fintech Lab / sandbox** open to pre-launch engagement on this instrument, and is it worth doing before any public announcement?

### A2 — Tax classification & withholding *(DEC-04 · BLOCKING if withholding from day one; long lead time)*
6. How are **monthly distributions** characterized — rental income, dividend, or interest — and at what rate?
7. How are **secondary-market token-sale gains** taxed (capital gains ~25% vs business income; crypto-asset treatment under Circular 5/2018)?
8. Can RealShare lawfully **withhold at source** for (a) primary distributions and (b) secondary trades it isn't party to? What agent appointment is required?
9. Is a **binding advance/pre-ruling (Sec. 158B)** feasible and advisable, and what's the realistic timeline?
10. Format/filing requirements for **annual tax certificates** to investors compatible with מס הכנסה.

### A3 — Israeli-side structure *(DEC-01)*
11. Confirm an **Israeli operating subsidiary** (customer-facing) + holding-company arrangement; ISA implications of the Israeli entity.
12. If a **Cyprus** holding layer is added later, what substance is needed to avoid Israeli CFC re-characterization, and what are the **Hungary–Israel treaty** dividend-withholding rates (L8)?

---

## 3. For Hungarian property / corporate / hospitality counsel

### B1 — Entity, ownership & bankruptcy-remoteness *(DEC-01, DEC-03)*
13. Confirm a **Hungarian Kft.** as the property-owning vehicle (resolving the non-EU-buyer-permit issue for Israeli ownership).
14. **Pooled single Kft. vs SPV-per-property:** under Hungarian insolvency law, can a creditor of the parent reach assets in a separate Kft.? What provisions make a Kft. genuinely **bankruptcy-remote**?
15. Can token holders hold a **registered charge/pledge** over the property or Kft. shares as a backstop (L4)? 
16. Realistic **per-Kft. setup + annual cost** (L6).

### B2 — AIFMD / collective-investment & MNB *(DEC-03)*
17. Does the structure — capital-raising + asset management + (with STR) active commercial operation — constitute an **Alternative Investment Fund** under the Kbftv. (AIFMD)? Does a **pooled** vehicle trigger this more than SPV-per-property?
18. Does the sub-threshold-manager exemption apply at early scale, and what **MNB** notification/authorization is required?

### B3 — STR licensing & operations *(DEC-09 · gating for the STR model)*
19. In **District XIII** (and outer VIII/IX), does the "szálláshely-szolgáltató" STR licence bind **corporate entities**, or is it **natural-persons-only**? (Cite the current district ordinance.) *This is the structural make-or-break for a Kft.-operated STR model.*
20. Can the **property-owning Kft. itself register as the STR operator**, with the service company operating under contract? If a district is natural-persons-only, can a **corporate service company** hold the licence as fallback (S2)?
21. **Condominium (társasház) approval:** confirm the ~⅔ supermajority requirement to authorize commercial STR, how to review a building's **deed of foundation + prior resolutions**, and how to make approval a **condition precedent** to acquisition (S7).
22. When operator ≠ owner, who bears **NTAK reporting + tourism-tax (IFA)** obligations (S4)?
23. Does STR trigger **commercial building-tax** treatment and **VAT registration** (>~€30k revenue) (S4, S8)?
24. **Income characterization** (rental vs commercial) for NAV under Kft.-as-operator, and its effect on distributions (S8).

---

## 4. Cross-border (needs both)

25. Is the token a **financial instrument under MiFID II** (which would exclude **MiCA**), or in MiCA scope — and does that require an **EU-domiciled issuer**?
26. Optimal **group structure** (Israeli op-co + Hungarian property Kft(s) + holding co) for tax + regulatory efficiency, and inter-company **management-fee transfer pricing**.

---

## 5. Priority / sequencing

| Priority | Items | Why |
|---|---|---|
| **1 — start immediately** | A1 (securities classification), B3-19 (Kft STR-licence eligibility in XIII) | Both can *invalidate the model* as designed; everything else is downstream |
| **2 — long lead time, start early** | A2-9 (tax pre-ruling), B1/B2 (structure + AIFMD) | Pre-ruling takes 3–6 months; structure decisions precede the first round |
| **3 — before first acquisition** | B3-21 (condominium), A2 withholding mechanics | Per-deal and pre-launch conditions |
| **4 — before scaling / external funding** | A3/B1 jurisdiction, cross-border §4 | Optimize once the model is proven |

---

## 6. Our working assumptions (please confirm or correct)

So counsel can react rather than start cold, here's where our own analysis (see [regulatory-strategy.md](regulatory-strategy.md)) currently lands — **all to be validated**:
- Token is *likely* a regulated instrument → stage round inside the **sophisticated-investor exemption**, keep cohort <35, **defer the secondary market** until classification is settled, don't publish specific yields pre-clearance.
- **SPV-per-property (Hungarian Kft.)** for bankruptcy-remoteness; STR/AIFMD considerations push us *away* from a single pooled vehicle.
- **District XIII + Kft.-as-STR-operator**, service company under contract, condominium approval as a closing condition.
- **File an Israeli tax pre-ruling early**; withhold at the highest plausible rate in the interim.
- Group: Israeli op-co + Hungarian property Kft(s) + (later) a Cyprus or Israeli holdco.

*Disclaimer: this briefing reflects the founder's non-lawyer analysis and is for discussion only.*
