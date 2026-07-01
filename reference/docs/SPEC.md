# RealShare — Product Specification

> Canonical single source of product truth. Derived and refined from the original Google-Doc spec ([source pointer](#source)). Where this file and the Drive doc diverge, **this file is current intent**.
>
> Every unresolved choice is marked **`TBD → DEC-NN`** and tracked in [DECISIONS.md](DECISIONS.md). Context/"why" lives in [CONTEXT.md](CONTEXT.md).

**Status:** Draft v0.1 · 2026-06-01 · pre-build (no code by design)

---

## 1. Product Overview

**What it is:** A mobile-first platform (with web support) for Israeli retail investors to invest in residential real estate in Budapest, Hungary by purchasing fractional shares represented as tokens on a private/permissioned blockchain. Users hold **tokenized contractual financial rights** against RealShare — not direct property ownership — entitling them to proportional rental income and capital gains on sale.

**Value proposition**
- *For investors:* real-estate exposure from any amount, monthly rental income, freely tradable shares, and exit via peer-to-peer trading or property-sale votes — with none of the property-law, tenant, or maintenance burden.
- *For sellers:* access to a new buyer pool, full appraised value **plus** the interest earned on escrowed funds during the funding window, and a faster sale than traditional channels.

**Mission:** Democratize real-estate investment — make property ownership accessible and affordable to everyone.
**Vision:** Become the leading fractional real-estate investment platform, helping users build wealth through diversified ownership of real assets.

---

## 2. Design System

**Brand personality:** Trustworthy, modern, accessible, transparent. Should feel like a premium fintech app — clean and professional but approachable to first-time investors, robust enough for experienced ones.

**Logo direction:** Clean "RealShare" wordmark; subtle icon merging a building/property silhouette with a share/token symbol; modern sans-serif.

### Color palette
| Role | Hex | Use |
| --- | --- | --- |
| Primary (Confident Blue) | `#1A73E8` | Main CTAs, active states, links |
| Primary Dark | `#1557B0` | Pressed states, headers |
| Primary Light | `#E8F0FE` | Backgrounds, selected states |
| Accent (Growth Green) | `#00C48C` | Gains, success, funded indicators |
| Warning (Amber) | `#FFB020` | Pending, funding-in-progress, caution |
| Error (Red) | `#E53E3E` | Losses, errors, declined states |
| Background | `#F8F9FC` | App background |
| Surface | `#FFFFFF` | Cards, sheets, popups |
| Text Primary | `#1A1D26` | Headings, primary text |
| Text Secondary | `#6B7280` | Captions, descriptions |
| Text Tertiary | `#9CA3AF` | Placeholders, disabled |
| Border | `#E5E7EB` | Card borders, dividers |
| Divider | `#F3F4F6` | Subtle separators |

**Map pin colors:** Funding Open = Green `#00C48C` · Active = Blue `#1A73E8` · Sale Vote = Amber `#FFB020`.

### Typography
**Family:** Inter (primary), Heebo for Hebrew, system-ui fallback. Chosen for readability at small sizes + full Hebrew support.

Scale: Display 32/Bold · H1 24/Bold · H2 20/SemiBold · H3 17/SemiBold · Body Large 16 · Body 14 · Body Small 13 · Caption 12/Medium · Micro 10/SemiBold/uppercase.

**Number formatting:** Currency `₪1,234.56` (ILS, right-aligned in tables). Percentages `8.5%` (1 decimal for yields), `+12.3%` / `-4.2%` with sign + color. Dates `DD/MM/YYYY` (Hebrew) / `MM/DD/YYYY` (English). Token counts comma-separated.

### Spacing & layout
Base-4 scale: xs 4 · sm 8 · md 12 · lg 16 · xl 24 · 2xl 32 · 3xl 48. Screen padding 16 horizontal. Card radius 12, button radius 8 (24 for pills). Card shadow `0 1px 3px rgba(0,0,0,0.08)`. Bottom nav 56 + safe area.

### Components (summary)
- **Buttons:** Primary (blue, 48h, white text), Secondary (white/blue border), Ghost (text only), Destructive (red, sparing).
- **Cards:** white, 12 radius, subtle shadow, 16 padding. Property cards = 16:9 photo + content. Stat cards = icon left, value+label right.
- **Badges (pill, 24h):** Funding Open (green), Active (blue), Sale Vote (amber), Closed/Failed (gray).
- **Progress bars:** 8h, 4 radius; funding fill = blue→green gradient with subtle shimmer on active rounds.
- **Charts:** smooth line w/ gradient area fill; green up / red down; blue monthly-income bars; donut for portfolio allocation.
- **Loading:** skeleton screens (not spinners), gray shimmer.
- **Errors:** inline (red text + border), page-level (icon + retry), toasts (slide from top, auto-dismiss 4s, colored left border).
- **Navigation:** bottom tab bar (outlined inactive / filled active 24px icons); white header, centered title, left back, right actions.

### RTL (Hebrew)
Full RTL mirroring when Hebrew selected; text + directional icons flip; **charts stay LTR** (financial convention); numbers stay LTR within RTL flow.

### Dark mode
Out of v1 scope, but use CSS variables / theme tokens so it drops in later.

### Iconography
Outlined icons (2px stroke, 24px), **Lucide** (open-source, RN-compatible).

---

## 3. Business Model

### Revenue streams
| Stream | Description | Rate |
| --- | --- | --- |
| Transaction fee | On every primary token purchase and every secondary P2P trade | 1–3% **`TBD → DEC-08`** |
| Management fee | Monthly skim from rental income before distribution | **`TBD → DEC-08`** |
| Premium subscription | Advanced analytics, early listing access, market reports | **`TBD → DEC-08`** |

### Cost structure
Budapest property-management fees · blockchain infra · app dev & maintenance · payment processing (Stripe) · legal & compliance (IL + HU) · customer support · marketing/acquisition. *(Quantified in [docs/financial-model.md](docs/financial-model.md).)*

---

## 4. User Flows

### 4.1 Property listing & crowdfunded acquisition
```
Seller submits property
  → RealShare assigns appraiser from approved pool (seller does NOT choose — conflict-of-interest control)
  → Appraiser produces valuation report
  → RealShare reviews & approves listing
  → Property goes LIVE (funding round opens)
  → Users browse & buy tokens (funds → interest-bearing locked escrow)
  → Funding window counts down (duration TBD → DEC-07)
      ├─ 100% funded ───────────► Deal closes:
      │                            • RealShare buys property from seller
      │                            • Seller paid: appraised price + escrow interest (the incentive)
      │                            • Tokens activate in buyers' portfolios
      │                            • Property management assigned
      ├─ 85–99% funded (discretion)► RealShare covers the remainder → same as 100% flow
      └─ Below threshold / expired ► Deal cancelled:
                                     • Users refunded: principal + their share of interest earned
                                     • Seller bears appraisal cost
                                     • Property removed
```
**No minimum investment.** Users may buy any amount. Zero financial downside to participating in a failed round.

### 4.2 Ongoing property operations (monthly cycle)
```
Tenant pays rent → management company
  → Management reports to RealShare
  → Deduction waterfall: property taxes · management fee · RealShare platform fee · maintenance/repairs · insurance · reserve contribution
  → Net distributable computed
  → Proportional distribution to token holders
  → Monthly statement issued (gross, each deduction, net payout)
  → Israeli tax withheld
  → Net deposited to user's linked bank account
```
A licensed Budapest property manager handles tenants, rent collection, maintenance, inspections, and 24/7 emergencies. **Large repair months may sharply reduce or zero out payouts — users must understand this upfront.**

### 4.3 Secondary market (token trading)
```
SELLER: owns tokens → "Sell" → pick quantity → set asking price → confirm → listed
        → match → tokens transfer → proceeds (minus fee) credited
BUYER:  browses marketplace → picks property → views sell orders → selects/enters amount
        → reviews cost + fees → pays → tokens transfer into portfolio → future income flows to new owner
```
Market-driven price discovery; RealShare charges a per-trade fee; transfers recorded on the private chain. Provides liquidity so users aren't locked in. **In MVP this is deferred (see §11).**

### 4.4 Property exit (whole-property sale)
```
Token holder proposes sale (minimum holding period must be met: TBD → DEC-06)
  → Vote opens to all of that property's holders (window ~7–14 days, TBD → DEC-06)
      ├─ Threshold met (supermajority, TBD → DEC-06) → PASSES
      │     → RealShare lists property on open market → sells
      │     → proceeds minus closing costs distributed to holders
      │     → all that property's tokens burned
      └─ Threshold not met → FAILS → property continues; new vote allowed after cooldown (TBD → DEC-06)
```
**Deferred in MVP (see §11).**

### 4.5 Tax handling (Blink model)
```
User earns income (rental payout or token-sale profit)
  → RealShare computes tax: rental → investment-income rate; token-sale profit → capital-gains (crypto-asset classification, TBD → DEC-04)
  → FX conversion HUF/EUR → ILS at time of event
  → Tax withheld at source from payout/proceeds
  → User receives net amount
  → Annual tax summary generated (Jan–Feb for prior year), compatible with מס הכנסה
  → User downloads → files with Israel Tax Authority
```
**Caveat:** the classification of tokenized real-estate rights under Israeli tax law is **unruled** — confirm with counsel before launch (**`DEC-04`**).

### 4.6 Onboarding
```
Download → Welcome carousel (3–4 screens) → Get Started
  New user → Registration (name, email, phone, password) → Email verification
           → KYC: (1) ID front+back  (2) selfie  (3) address + proof doc → Submitted (pending review)
           → (24–48h, push) KYC approved → Payment method setup (skippable) → Home ✓
  Existing user → Login (email+password or SSO) → Home ✓
```

---

## 5. Legal & Ownership Structure

- **A Hungarian company holds legal title to each property** — investors never hold the deed. (Whether *one pooled* Hungarian company owns all properties or *one company per property* is `TBD → DEC-03`; founder currently leans pooled.)
- **Users hold tokenized contractual financial rights** — a contract entitling them to proportional rental income + sale proceeds, governed by a user agreement defining rights, obligations, and risk disclosures.
- **Investor rights must run against the Hungarian property-owning company** (ideally secured by a registered charge over the property), **not against RealShare the platform** — so a platform failure can't strand investors. `→ DEC-03`
- **Blockchain:** private/permissioned (platform **`TBD → DEC-05`**). Purpose: immutable, transparent record of ownership, transfers, and history. Only KYC-verified users can participate; RealShare controls network access. Each property = its own token series; metadata = property ID, token number, creation date, current owner, transaction history.
- **Incorporation jurisdiction: `TBD → DEC-01`.** Likely structure (pending counsel): holding company in a favorable jurisdiction + Hungarian property subsidiary + Israeli customer-facing subsidiary.
- **Bankruptcy protection (CRITICAL, `DEC-03`):** Open trade-off between a single pooled Hungarian company (cheap, simple, but no isolation between properties) and an SPV-per-property (walled-off, bankruptcy-remote, but costlier to set up). Regardless of which, investor rights must be secured against the property-owning company per the point above. **Must be resolved before launch.**

---

## 6. Risk Disclosures (user-facing)

Users must acknowledge before investing:
1. **Rental income risk** — tenants may not pay; payouts may be zero in some periods; no guarantee.
2. **Property damage risk** — repairs deducted from rent; major repairs can sharply cut payouts.
3. **Market value risk** — property/token value can fall below purchase price; no appreciation guarantee.
4. **Liquidity risk** — no guarantee a secondary-market buyer exists at the desired price/time.
5. **Regulatory risk** — IL/HU/blockchain regulatory changes could impact operations.
6. **Platform risk** — startup operational/financial risk (mitigated by SPV structure if implemented).
7. **Currency risk** — income in HUF/EUR, payouts in ILS; FX swings affect returns.

---

## 7. Technical Architecture

| Layer | Technology | Purpose |
| --- | --- | --- |
| Mobile | React Native | Cross-platform iOS/Android |
| Web | React (Next.js) | Desktop access |
| Backend API | Node.js + Express | RESTful API |
| Database | MongoDB | Users, listings, transactions |
| Blockchain | Private/permissioned (**`TBD → DEC-05`**) | Token ownership, transfers, audit trail |
| Hosting | AWS | Infra, scaling, CDN |
| Payments | Stripe | Fiat processing |
| File storage | AWS S3 | Images, documents, reports |
| Auth | JWT + OAuth2 | Authentication, sessions |
| Notifications | Firebase Cloud Messaging | Push |
| Maps | Mapbox or Google Maps SDK | Property map + pins |
| Charts | Victory Native / react-native-chart-kit | Portfolio & price charts |
| i18n | react-i18next | Hebrew/English + RTL |

**Languages:** Hebrew (primary), English (secondary); full i18n from day one.

### Core data models
- **User** — id, name, email, phone, KYC status + documents, blockchain wallet address, payout bank account, language, notification prefs, created date.
- **Property** — id, address, city, country, description, images[], appraised value, appraiser id, total tokens, token price, funding status, window start/end, occupancy, monthly rent, management company id, created date.
- **Token** — id, property id, token number, owner user id, purchase price, purchase date, transaction history[], status (active / listed / burned).
- **Transaction** — id, type (primary / secondary / payout / exit), from/to user id, token id, amount, currency, fee, timestamp, blockchain tx hash.
- **Funding Round** — id, property id, target, current amount, escrow account id, interest earned, start/end, status (active / success / failed / partial), participants[].
- **Vote** — id, property id, type, proposed-by, start/end, threshold, votes for/against, status.
- **Monthly Statement** — id, property id, month/year, gross rent, deductions[], net distributable, per-token payout, distribution status.

### Key API endpoints (high level)
- **Auth:** `POST /auth/register` · `POST /auth/login` · `POST /auth/verify-kyc`
- **Properties:** `GET /properties` · `GET /properties/:id` · `GET /properties/:id/financials` · `GET /properties/:id/statements`
- **Tokens:** `POST /tokens/purchase` · `GET /tokens/my` · `GET /tokens/market/:propertyId` · `POST /tokens/list-for-sale` · `POST /tokens/buy` · `DELETE /tokens/cancel-listing`
- **Funding:** `GET /funding/:propertyId` · `GET /funding/:propertyId/interest`
- **Voting:** `POST /votes/propose` · `POST /votes/:id/cast` · `GET /votes/:propertyId`
- **Payouts:** `GET /payouts/history` · `GET /payouts/upcoming`
- **Portfolio:** `GET /portfolio/summary` · `GET /portfolio/performance`

---

## 8. Screens

**Bottom nav (5 tabs):** Home · Map · Marketplace · Portfolio · Profile.

Every screen below specifies loading / empty / error states. (Full per-screen detail preserved from the original spec; summarized here.)

- **Onboarding:** Welcome carousel → Registration → Login → KYC (ID / selfie / address / pending) → Payment method setup. Inline + toast error handling; KYC step indicator and retake-on-blur prompts.
- **Home tab:** Greeting + notification bell; quick-stats banner (portfolio value, monthly income, # properties); Featured (horizontal scroll); Funding Now (cards with progress bar + countdown); Recently Funded. Distinct empty states for "no properties on platform yet" vs "user has no investments." Skeleton loading; pull-to-refresh.
- **Property List (filtered):** filter bar (status, sort, price range); skeleton cards; "no results" empty state.
- **Property Detail:** swipeable gallery; key metrics row; funding section (progress, investors, countdown, *Invest Now*) **or** secondary-market section (price + chart + *Buy Tokens*); financial projections; property details; map; management info; expandable risk disclosure; downloadable documents (appraisal, inspection, contract). Progressive loading; per-section error fallback.
- **Token Purchase Flow (primary):** amount → payment → confirmation (escrow + refund-with-interest explainer + risk acknowledgment) → success. Disable double-tap on confirm; on network error during payment show "status unknown — check portfolio, do not retry" to prevent double-charge.
- **Map tab:** full-screen Budapest map; color-coded pins (green funding / blue active / amber sale-vote); clustering; filters; list-view toggle; legend. Pin popup card → Property Detail.
- **Marketplace tab (secondary):** search; Hot Properties; tradeable property cards (price, change %, # listed, sparkline); sort. **Marketplace Property View:** interactive price chart (7d/30d/3m/1y/All), order-book summary, listings, *Buy*; "your holdings" with *Sell*. **Buy Flow** + **Sell Flow** with price-changed and listing-gone edge cases.
- **Portfolio tab:** total value (Display), monthly income (MoM compare), performance line chart, allocation donut, per-property cards, pending-investments section. **Property Portfolio Detail:** position, income-history bars, latest + past statements (PDF), token transactions, actions (sell / vote / view). **Payout History:** chronological, filters, annual-summary download.
- **Voting:** Active Votes list → Vote Detail (proposal, results bar with threshold line, participation, vote weight, For/Against) → Vote Results. Irreversible vote; ensure no double-record on retry.
- **Notifications:** grouped feed (new listing, funding progress, funded, failed+refund, payout, vote opened/results, token sold, price alert, maintenance, tax report).
- **Profile tab:** Personal Info · KYC Status · Payment Methods · Bank Account · Tax Documents · Notification Prefs · Language (HE/EN) · Security (password, 2FA, sessions) · Help & Support · Legal · About · Log Out.

---

## 9. Marketing & Go-to-Market

**Positioning:** "Invest in real estate like you invest in stocks. Starting from any amount."
**Audience:** see [CONTEXT.md](CONTEXT.md).
**Launch:** pre-launch waitlist (lower fees / early listing access) → Hebrew content marketing (RE education, Budapest market analysis) → social (IG/TikTok/FB) → Israeli finance influencers → referral program (fee discounts / bonus tokens) → PR (Globes, Calcalist, TheMarker, Geektime).
**Retention:** monthly payout notifications, portfolio insights, education, long-hold loyalty rewards, Hebrew-speaking support.

> Competitive positioning detail: [docs/competitive-landscape.md](docs/competitive-landscape.md).

---

## 10. Open Decisions

All launch-gating choices are tracked in **[DECISIONS.md](DECISIONS.md)**: incorporation jurisdiction (DEC-01), securities regulation (DEC-02), bankruptcy/SPV structure (DEC-03), tax classification (DEC-04), blockchain platform (DEC-05), exit-vote rules (DEC-06), funding-window duration (DEC-07), fee structure (DEC-08).

---

## 11. MVP Scope (recommended)

Strip to the minimum needed to list the first property and prove the core loop:

**In v1:** registration · KYC · single/few property listings · primary-market token purchase · basic portfolio · monthly payout + statement.
**Deferred:** secondary marketplace · exit voting · premium subscription · advanced analytics.

> Detailed MVP slicing and build sequencing will be produced after the critical-path decisions (DEC-01–05) clear. See [DECISIONS.md](DECISIONS.md) and the recommended first steps in [CONTEXT.md](CONTEXT.md).

---

<a name="source"></a>
## Source

Refined from the original **"RealShare — Complete Product Specification"** Google Doc (fileId `1txgAShhJat48HZmpBDWfTbxeY4lYoQAADn1SlpKjwVg`). That doc remains the historical origin; this file is the current product reference.
