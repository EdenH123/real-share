// Seed data — no real DB. Real deck numbers per BUILD-BRIEF.md §8.
// All figures are ILLUSTRATIVE.

export type PropertyStatus = "funding" | "active" | "failed" | "exitVote";
export type MarketId = "budapest" | "athens" | "portugal" | "israel";

export type Property = {
  id: string;
  market: MarketId;
  cityKey: string; // i18n key for city name
  countryKey: string;
  district: string; // shown as-is (bilingual-neutral / transliterated)
  districtHe: string;
  title: string;
  titleHe: string;
  about: string;
  aboutHe: string;
  /** visual gradient theme index 0..4 */
  theme: number;
  price: number; // €
  grossYield: number; // %
  netYield: number; // %
  monthlyRent: number; // €
  tokenCount: number;
  tokenPrice: number; // €
  status: PropertyStatus;
  fundingRaised: number; // €
  fundingTarget: number; // €
  daysLeft: number;
  appraisalValue: number; // €
  marketAppreciation: number; // % 5yr nominal
  tags: ("hot" | "highYield")[];
};

// Worked example flagship: €150k Budapest flat, 5.0% gross, 2.65% net.
export const PROPERTIES: Property[] = [
  {
    id: "bud-district-vii",
    market: "budapest",
    cityKey: "market.budapest",
    countryKey: "market.hungary",
    district: "District VII · Erzsébetváros",
    districtHe: "רובע VII · ארז׳בטווארוש",
    title: "Renovated 2-room flat, District VII",
    titleHe: "דירת 2 חדרים משופצת, רובע VII",
    about:
      "A renovated two-room flat in Budapest's lively District VII, a short walk from the ruin-bar quarter. Long-term let to a professional tenant. This is the deck's worked-example asset.",
    aboutHe:
      "דירת שני חדרים משופצת ברובע VII התוסס של בודפשט, במרחק הליכה קצר מרובע פאבי־החורבות. מושכרת לטווח ארוך לדייר מקצועי. זהו נכס הדוגמה המחושבת של המצגת.",
    theme: 0,
    price: 150000,
    grossYield: 5.0,
    netYield: 2.65,
    monthlyRent: 625,
    tokenCount: 6000,
    tokenPrice: 25,
    status: "funding",
    fundingRaised: 103500,
    fundingTarget: 150000,
    daysLeft: 12,
    appraisalValue: 154000,
    marketAppreciation: 13,
    tags: ["hot"],
  },
  {
    id: "bud-district-xiii",
    market: "budapest",
    cityKey: "market.budapest",
    countryKey: "market.hungary",
    district: "District XIII · Újlipótváros",
    districtHe: "רובע XIII · אויליפוטווארוש",
    title: "Riverside 1-room studio, District XIII",
    titleHe: "סטודיו חדר על גדת הנהר, רובע XIII",
    about:
      "A compact riverside studio in a sought-after residential district. Fully tenanted and paying rent — tokens are live.",
    aboutHe:
      "סטודיו קומפקטי על גדת הנהר ברובע מגורים מבוקש. מאוכלס במלואו ומניב שכר דירה — הטוקנים פעילים.",
    theme: 1,
    price: 118000,
    grossYield: 5.6,
    netYield: 3.1,
    monthlyRent: 551,
    tokenCount: 4720,
    tokenPrice: 25,
    status: "active",
    fundingRaised: 118000,
    fundingTarget: 118000,
    daysLeft: 0,
    appraisalValue: 121000,
    marketAppreciation: 13,
    tags: ["highYield"],
  },
  {
    id: "ath-koukaki",
    market: "athens",
    cityKey: "market.athens",
    countryKey: "market.greece",
    district: "Koukaki",
    districtHe: "קוקאקי",
    title: "Sunny 2-room flat, Koukaki",
    titleHe: "דירת 2 חדרים שטופת שמש, קוקאקי",
    about:
      "A sunlit flat below the Acropolis in Koukaki, one of Athens' most in-demand rental districts. Around 40% of buyers here are foreign.",
    aboutHe:
      "דירה שטופת שמש למרגלות האקרופוליס בקוקאקי, אחד מאזורי השכירות המבוקשים באתונה. כ־40% מהקונים כאן הם זרים.",
    theme: 2,
    price: 132000,
    grossYield: 5.4,
    netYield: 3.0,
    monthlyRent: 594,
    tokenCount: 5280,
    tokenPrice: 25,
    status: "active",
    fundingRaised: 132000,
    fundingTarget: 132000,
    daysLeft: 0,
    appraisalValue: 135500,
    marketAppreciation: 10,
    tags: ["highYield", "hot"],
  },
  {
    id: "ath-exarchia",
    market: "athens",
    cityKey: "market.athens",
    countryKey: "market.greece",
    district: "Exarchia",
    districtHe: "אקסארכיה",
    title: "Small flat with 8% target yield, Exarchia",
    titleHe: "דירה קטנה בתשואת יעד 8%, אקסארכיה",
    about:
      "A small flat in a rapidly-gentrifying district. Funding round is currently open with escrow protection.",
    aboutHe:
      "דירה קטנה באזור שעובר תהליך התחדשות מהיר. סבב הגיוס פתוח כעת עם הגנת נאמנות.",
    theme: 3,
    price: 96000,
    grossYield: 5.0,
    netYield: 2.9,
    monthlyRent: 400,
    tokenCount: 3840,
    tokenPrice: 25,
    status: "funding",
    fundingRaised: 41000,
    fundingTarget: 96000,
    daysLeft: 21,
    appraisalValue: 97500,
    marketAppreciation: 10,
    tags: ["highYield"],
  },
  {
    id: "prt-porto",
    market: "portugal",
    cityKey: "market.portugal",
    countryKey: "market.portugal",
    district: "Porto · Bonfim",
    districtHe: "פורטו · בונפים",
    title: "Restored townhouse unit, Bonfim",
    titleHe: "יחידה בבית עיר משוחזר, בונפים",
    about:
      "A restored unit in Porto's Bonfim district — Portugal leads on appreciation, though yields are lower and the Golden-Visa property route ended in 2023.",
    aboutHe:
      "יחידה משוחזרת ברובע בונפים בפורטו — פורטוגל מובילה בעליית ערך, אם כי התשואות נמוכות יותר ומסלול ויזת הזהב בנדל״ן הסתיים ב־2023.",
    theme: 4,
    price: 205000,
    grossYield: 4.2,
    netYield: 2.4,
    monthlyRent: 718,
    tokenCount: 8200,
    tokenPrice: 25,
    status: "exitVote",
    fundingRaised: 205000,
    fundingTarget: 205000,
    daysLeft: 6,
    appraisalValue: 236000,
    marketAppreciation: 15,
    tags: ["hot"],
  },
  {
    id: "isr-haifa",
    market: "israel",
    cityKey: "market.israel",
    countryKey: "market.israel",
    district: "Haifa · Hadar",
    districtHe: "חיפה · הדר",
    title: "2-room flat, Hadar (round failed)",
    titleHe: "דירת 2 חדרים, הדר (הסבב נכשל)",
    about:
      "A home-market example. This funding round did not fill in time, so all investors were refunded their principal plus escrow interest — exactly as designed.",
    aboutHe:
      "דוגמה מהשוק המקומי. סבב הגיוס הזה לא התמלא בזמן, ולכן כל המשקיעים קיבלו החזר של הקרן בתוספת ריבית נאמנות — בדיוק כפי שתוכנן.",
    theme: 1,
    price: 520000,
    grossYield: 3.4,
    netYield: 2.1,
    monthlyRent: 1473,
    tokenCount: 10400,
    tokenPrice: 50,
    status: "failed",
    fundingRaised: 214000,
    fundingTarget: 520000,
    daysLeft: 0,
    appraisalValue: 520000,
    marketAppreciation: 9,
    tags: [],
  },
];

export function getProperty(id: string): Property | undefined {
  return PROPERTIES.find((p) => p.id === id);
}

// ---- Markets (Map filters / "where we're exploring") ----
export type Market = {
  id: MarketId;
  nameKey: string;
  appreciation: string;
  grossYield: string;
  entry: string;
  frictionKey: string;
  // favorability for the encoded row: 1 favorable .. 4 unfavorable
  rank: number;
};

export const MARKETS: Market[] = [
  {
    id: "budapest",
    nameKey: "market.budapest",
    appreciation: "~13%",
    grossYield: "5.0–5.6%",
    entry: "€100–170K",
    frictionKey: "market.friction.budapest",
    rank: 1,
  },
  {
    id: "athens",
    nameKey: "market.athens",
    appreciation: "~10%",
    grossYield: "5.0–5.4%",
    entry: "€90–170K",
    frictionKey: "market.friction.athens",
    rank: 1,
  },
  {
    id: "portugal",
    nameKey: "market.portugal",
    appreciation: "~15%",
    grossYield: "3.8–4.7%",
    entry: "€130–320K",
    frictionKey: "market.friction.portugal",
    rank: 3,
  },
  {
    id: "israel",
    nameKey: "market.israel",
    appreciation: "~9%",
    grossYield: "3.1–3.6%",
    entry: "€500–650K",
    frictionKey: "market.friction.israel",
    rank: 4,
  },
];

// Market friction copy (added to dictionaries at runtime via these keys)
export const MARKET_FRICTION: Record<string, { en: string; he: string }> = {
  "market.friction.budapest": {
    en: "Minor permit (2–4 wk, €160); a Hungarian company avoids it.",
    he: "היתר קל (2–4 שבועות, €160); חברה הונגרית עוקפת אותו.",
  },
  "market.friction.athens": {
    en: "None; ~40% of buyers are foreign.",
    he: "אין; כ־40% מהקונים זרים.",
  },
  "market.friction.portugal": {
    en: "Golden-Visa property route ended Oct 2023; EU-flagged overvalued.",
    he: "מסלול ויזת הזהב בנדל״ן הסתיים באוקטובר 2023; סומן ע״י האיחוד כמתומחר ביתר.",
  },
  "market.friction.israel": {
    en: "Home market but priced out; 8–10% non-resident purchase tax.",
    he: "השוק הביתי אך יקר מדי; מס רכישה 8–10% ללא־תושבים.",
  },
};

// ---- Seed user ----
export const SEED_USER = {
  id: "u_demo",
  name: "Eden",
  nameHe: "עדן",
  email: "eden@tennasys.com",
  kycVerified: true,
};

// ---- Seed holdings (demo portfolio) ----
export type Holding = {
  propertyId: string;
  tokens: number;
  costBasisPerToken: number; // €
};

export const SEED_HOLDINGS: Holding[] = [
  { propertyId: "bud-district-xiii", tokens: 40, costBasisPerToken: 25 },
  { propertyId: "ath-koukaki", tokens: 24, costBasisPerToken: 25 },
];

// ---- Distributions (rent history + upcoming), per token ----
export type Distribution = {
  propertyId: string;
  date: string; // ISO
  amountPerToken: number; // €
  paid: boolean;
};

export const SEED_DISTRIBUTIONS: Distribution[] = [
  { propertyId: "bud-district-xiii", date: "2026-04-01", amountPerToken: 0.29, paid: true },
  { propertyId: "bud-district-xiii", date: "2026-05-01", amountPerToken: 0.29, paid: true },
  { propertyId: "bud-district-xiii", date: "2026-06-01", amountPerToken: 0.29, paid: true },
  { propertyId: "bud-district-xiii", date: "2026-07-01", amountPerToken: 0.29, paid: false },
  { propertyId: "ath-koukaki", date: "2026-05-01", amountPerToken: 0.33, paid: true },
  { propertyId: "ath-koukaki", date: "2026-06-01", amountPerToken: 0.33, paid: true },
  { propertyId: "ath-koukaki", date: "2026-07-01", amountPerToken: 0.33, paid: false },
];

// ---- Marketplace orders (order book), per property ----
export type OrderSide = "buy" | "sell";
export type Order = {
  id: string;
  propertyId: string;
  side: OrderSide;
  tokens: number;
  price: number; // € per token
  mine?: boolean;
};

export const SEED_ORDERS: Order[] = [
  // bud-district-vii (flagship, funding) around €25.7 est
  { id: "b1", propertyId: "bud-district-vii", side: "buy", tokens: 40, price: 25.4 },
  { id: "b2", propertyId: "bud-district-vii", side: "buy", tokens: 70, price: 25.1 },
  { id: "b3", propertyId: "bud-district-vii", side: "buy", tokens: 130, price: 24.8 },
  { id: "b4", propertyId: "bud-district-vii", side: "sell", tokens: 25, price: 26.0 },
  { id: "b5", propertyId: "bud-district-vii", side: "sell", tokens: 60, price: 26.4 },
  { id: "b6", propertyId: "bud-district-vii", side: "sell", tokens: 110, price: 26.9 },
  // ath-exarchia (funding) around €25.4 est
  { id: "e1", propertyId: "ath-exarchia", side: "buy", tokens: 35, price: 25.2 },
  { id: "e2", propertyId: "ath-exarchia", side: "buy", tokens: 80, price: 24.9 },
  { id: "e3", propertyId: "ath-exarchia", side: "sell", tokens: 30, price: 25.9 },
  { id: "e4", propertyId: "ath-exarchia", side: "sell", tokens: 65, price: 26.3 },
  // bud-district-xiii around €25.4 est
  { id: "o1", propertyId: "bud-district-xiii", side: "buy", tokens: 30, price: 25.1 },
  { id: "o2", propertyId: "bud-district-xiii", side: "buy", tokens: 55, price: 24.9 },
  { id: "o3", propertyId: "bud-district-xiii", side: "buy", tokens: 120, price: 24.6 },
  { id: "o4", propertyId: "bud-district-xiii", side: "sell", tokens: 20, price: 25.8 },
  { id: "o5", propertyId: "bud-district-xiii", side: "sell", tokens: 45, price: 26.1 },
  { id: "o6", propertyId: "bud-district-xiii", side: "sell", tokens: 90, price: 26.5 },
  // ath-koukaki
  { id: "o7", propertyId: "ath-koukaki", side: "buy", tokens: 40, price: 25.5 },
  { id: "o8", propertyId: "ath-koukaki", side: "buy", tokens: 75, price: 25.2 },
  { id: "o9", propertyId: "ath-koukaki", side: "sell", tokens: 35, price: 26.2 },
  { id: "o10", propertyId: "ath-koukaki", side: "sell", tokens: 60, price: 26.6 },
];

/** RealShare estimated (NAV-anchored) price per token, from appraisal. */
export function estimatedTokenPrice(p: { appraisalValue: number; tokenCount: number }): number {
  return p.appraisalValue / p.tokenCount;
}

// ---- Vote proposals ----
export type VoteProposal = {
  propertyId: string;
  type: "sell";
  forPct: number;
  threshold: number;
  deadlineDays: number;
};

export const SEED_VOTES: VoteProposal[] = [
  { propertyId: "prt-porto", type: "sell", forPct: 58, threshold: 67, deadlineDays: 6 },
];

// ---- Notifications ----
export type NotificationType = "payout" | "round" | "vote" | "system";
export type AppNotification = {
  id: string;
  type: NotificationType;
  titleEn: string;
  titleHe: string;
  bodyEn: string;
  bodyHe: string;
  date: string; // ISO
  read: boolean;
};

export const SEED_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    type: "payout",
    titleEn: "Rent payout scheduled",
    titleHe: "תשלום שכר דירה מתוזמן",
    bodyEn: "Your July rent for the District XIII studio (€11.60) is scheduled for payout.",
    bodyHe: "שכר הדירה שלכם לחודש יולי עבור הסטודיו ברובע XIII (€11.60) מתוזמן לתשלום.",
    date: "2026-06-28",
    read: false,
  },
  {
    id: "n2",
    type: "round",
    titleEn: "Funding round 69% filled",
    titleHe: "סבב הגיוס מולא ב־69%",
    bodyEn: "District VII flat is 69% funded with 12 days left. Escrow-protected.",
    bodyHe: "דירת רובע VII גויסה ב־69% ונותרו 12 ימים. מוגן בנאמנות.",
    date: "2026-06-26",
    read: false,
  },
  {
    id: "n3",
    type: "vote",
    titleEn: "Sale vote open",
    titleHe: "הצבעת מכירה פתוחה",
    bodyEn: "Porto townhouse: a supermajority sale vote is open (58% for, ⅔ needed).",
    bodyHe: "בית העיר בפורטו: הצבעת מכירה ברוב מיוחס פתוחה (58% בעד, נדרש ⅔).",
    date: "2026-06-24",
    read: true,
  },
  {
    id: "n4",
    type: "system",
    titleEn: "Welcome to the RealShare preview",
    titleHe: "ברוכים הבאים לתצוגה המקדימה של RealShare",
    bodyEn: "This is a preview. Join the waitlist to be first when we launch for real.",
    bodyHe: "זו תצוגה מקדימה. הצטרפו לרשימת ההמתנה כדי להיות ראשונים בהשקה האמיתית.",
    date: "2026-06-20",
    read: true,
  },
];
