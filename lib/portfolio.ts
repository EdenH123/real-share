import {
  getProperty,
  estimatedTokenPrice,
  SEED_DISTRIBUTIONS,
  type Holding,
} from "./seed";

export type HoldingView = {
  holding: Holding;
  propertyId: string;
  tokens: number;
  invested: number; // €
  currentValue: number; // €
  gain: number; // €
  gainPct: number;
  accrued: number; // € paid to date
  nextPayout: number; // € upcoming (unpaid)
};

export type PortfolioSummary = {
  invested: number;
  currentValue: number;
  gain: number;
  gainPct: number;
  accrued: number;
  nextPayout: number;
  monthlyIncome: number;
  views: HoldingView[];
};

export function computePortfolio(holdings: Holding[]): PortfolioSummary {
  const views: HoldingView[] = [];
  let invested = 0;
  let currentValue = 0;
  let accrued = 0;
  let nextPayout = 0;
  let monthlyIncome = 0;

  for (const h of holdings) {
    const p = getProperty(h.propertyId);
    if (!p) continue;
    const est = estimatedTokenPrice(p);
    const hInvested = h.tokens * h.costBasisPerToken;
    const hValue = h.tokens * est;

    const dists = SEED_DISTRIBUTIONS.filter((d) => d.propertyId === h.propertyId);
    const hAccrued = dists
      .filter((d) => d.paid)
      .reduce((s, d) => s + d.amountPerToken * h.tokens, 0);
    const hNext = dists
      .filter((d) => !d.paid)
      .reduce((s, d) => s + d.amountPerToken * h.tokens, 0);

    // monthly income estimate from net yield
    const hMonthly = (hValue * (p.netYield / 100)) / 12;

    invested += hInvested;
    currentValue += hValue;
    accrued += hAccrued;
    nextPayout += hNext;
    monthlyIncome += hMonthly;

    views.push({
      holding: h,
      propertyId: h.propertyId,
      tokens: h.tokens,
      invested: hInvested,
      currentValue: hValue,
      gain: hValue - hInvested,
      gainPct: hInvested > 0 ? ((hValue - hInvested) / hInvested) * 100 : 0,
      accrued: hAccrued,
      nextPayout: hNext,
    });
  }

  const gain = currentValue - invested + accrued;
  return {
    invested,
    currentValue,
    gain,
    gainPct: invested > 0 ? (gain / invested) * 100 : 0,
    accrued,
    nextPayout,
    monthlyIncome,
    views,
  };
}
