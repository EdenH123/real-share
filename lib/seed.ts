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
  /** approximate map coordinates (district-level, illustrative) */
  lat: number;
  lng: number;
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
    lat: 47.503,
    lng: 19.07,
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
    lat: 47.532,
    lng: 19.055,
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
    lat: 37.963,
    lng: 23.728,
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
    lat: 37.987,
    lng: 23.733,
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
    lat: 41.15,
    lng: -8.595,
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
    lat: 32.808,
    lng: 34.989,
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
  {
    id: "bud-obuda",
    market: "budapest",
    cityKey: "market.budapest",
    countryKey: "market.hungary",
    district: "District III · Óbuda",
    districtHe: "רובע III · אובודה",
    title: "Garden-view 2-room, Óbuda",
    titleHe: "דירת 2 חדרים עם נוף לגן, אובודה",
    about:
      "A quiet garden-view flat in historic Óbuda, well connected by the HÉV line. Tenanted to a long-term family; tokens are live and paying rent.",
    aboutHe:
      "דירה שקטה עם נוף לגן באובודה ההיסטורית, מחוברת היטב בקו הרכבת HÉV. מושכרת למשפחה לטווח ארוך; הטוקנים פעילים ומניבים שכר דירה.",
    lat: 47.556,
    lng: 19.041,
    theme: 2,
    price: 128000,
    grossYield: 5.3,
    netYield: 2.9,
    monthlyRent: 565,
    tokenCount: 5120,
    tokenPrice: 25,
    status: "active",
    fundingRaised: 128000,
    fundingTarget: 128000,
    daysLeft: 0,
    appraisalValue: 132000,
    marketAppreciation: 13,
    tags: ["highYield"],
  },
  {
    id: "bud-district-ix",
    market: "budapest",
    cityKey: "market.budapest",
    countryKey: "market.hungary",
    district: "District IX · Ferencváros",
    districtHe: "רובע IX · פרנצווארוש",
    title: "Canalside new-build, District IX",
    titleHe: "בנייה חדשה לצד התעלה, רובע IX",
    about:
      "A new-build one-bedroom in fast-regenerating Ferencváros, near the river and the university. Funding round open with escrow protection.",
    aboutHe:
      "דירת חדר שינה בבנייה חדשה בפרנצווארוש המתחדשת במהירות, ליד הנהר והאוניברסיטה. סבב הגיוס פתוח עם הגנת נאמנות.",
    lat: 47.478,
    lng: 19.069,
    theme: 0,
    price: 142000,
    grossYield: 5.1,
    netYield: 2.7,
    monthlyRent: 604,
    tokenCount: 5680,
    tokenPrice: 25,
    status: "funding",
    fundingRaised: 58000,
    fundingTarget: 142000,
    daysLeft: 18,
    appraisalValue: 145000,
    marketAppreciation: 13,
    tags: ["hot"],
  },
  {
    id: "ath-pagrati",
    market: "athens",
    cityKey: "market.athens",
    countryKey: "market.greece",
    district: "Pagrati",
    districtHe: "פנגראטי",
    title: "Bright 3-room, Pagrati",
    titleHe: "דירת 3 חדרים מוארת, פנגראטי",
    about:
      "A bright top-floor flat in Pagrati, a residential favourite near the Panathenaic Stadium. Active and distributing rent.",
    aboutHe:
      "דירה מוארת בקומה עליונה בפנגראטי, שכונת מגורים אהובה ליד האצטדיון הפנאתנאי. פעילה ומחלקת שכר דירה.",
    lat: 37.968,
    lng: 23.752,
    theme: 3,
    price: 148000,
    grossYield: 5.2,
    netYield: 2.9,
    monthlyRent: 641,
    tokenCount: 5920,
    tokenPrice: 25,
    status: "active",
    fundingRaised: 148000,
    fundingTarget: 148000,
    daysLeft: 0,
    appraisalValue: 152000,
    marketAppreciation: 10,
    tags: ["highYield"],
  },
  {
    id: "ath-kolonaki",
    market: "athens",
    cityKey: "market.athens",
    countryKey: "market.greece",
    district: "Kolonaki",
    districtHe: "קולונאקי",
    title: "Prime flat, Kolonaki",
    titleHe: "דירה יוקרתית, קולונאקי",
    about:
      "A prime flat in upscale Kolonaki at the foot of Lycabettus. Lower yield, premium location; funding round open.",
    aboutHe:
      "דירה יוקרתית בקולונאקי המפואר למרגלות הליקאבטוס. תשואה נמוכה יותר, מיקום פרימיום; סבב הגיוס פתוח.",
    lat: 37.979,
    lng: 23.744,
    theme: 2,
    price: 189000,
    grossYield: 4.6,
    netYield: 2.6,
    monthlyRent: 725,
    tokenCount: 7560,
    tokenPrice: 25,
    status: "funding",
    fundingRaised: 121000,
    fundingTarget: 189000,
    daysLeft: 9,
    appraisalValue: 194000,
    marketAppreciation: 10,
    tags: ["hot"],
  },
  {
    id: "prt-cedofeita",
    market: "portugal",
    cityKey: "market.portugal",
    countryKey: "market.portugal",
    district: "Porto · Cedofeita",
    districtHe: "פורטו · סדופייטה",
    title: "Design loft, Cedofeita",
    titleHe: "לופט מעוצב, סדופייטה",
    about:
      "A converted design loft in Porto's artsy Cedofeita district. Active and distributing rent; Portugal leads the corridor on appreciation.",
    aboutHe:
      "לופט מעוצב משופץ ברובע האמנותי סדופייטה בפורטו. פעיל ומחלק שכר דירה; פורטוגל מובילה במסדרון בעליית ערך.",
    lat: 41.157,
    lng: -8.62,
    theme: 4,
    price: 178000,
    grossYield: 4.4,
    netYield: 2.5,
    monthlyRent: 653,
    tokenCount: 7120,
    tokenPrice: 25,
    status: "active",
    fundingRaised: 178000,
    fundingTarget: 178000,
    daysLeft: 0,
    appraisalValue: 188000,
    marketAppreciation: 15,
    tags: ["hot"],
  },
  {
    id: "prt-foz",
    market: "portugal",
    cityKey: "market.portugal",
    countryKey: "market.portugal",
    district: "Porto · Foz do Douro",
    districtHe: "פורטו · פוז דו דורו",
    title: "Coastal 2-room, Foz do Douro",
    titleHe: "דירת 2 חדרים על החוף, פוז דו דורו",
    about:
      "A coastal flat where the Douro meets the Atlantic — Porto's most sought-after seafront. Funding round open with escrow protection.",
    aboutHe:
      "דירה על החוף במקום שבו הדורו נפגש עם האוקיינוס האטלנטי — קו החוף המבוקש ביותר בפורטו. סבב הגיוס פתוח עם הגנת נאמנות.",
    lat: 41.15,
    lng: -8.64,
    theme: 3,
    price: 232000,
    grossYield: 4.0,
    netYield: 2.3,
    monthlyRent: 773,
    tokenCount: 9280,
    tokenPrice: 25,
    status: "funding",
    fundingRaised: 96000,
    fundingTarget: 232000,
    daysLeft: 24,
    appraisalValue: 240000,
    marketAppreciation: 15,
    tags: [],
  },
  {
    id: "isr-carmel",
    market: "israel",
    cityKey: "market.israel",
    countryKey: "market.israel",
    district: "Haifa · Carmel",
    districtHe: "חיפה · הכרמל",
    title: "Sea-view flat, Carmel",
    titleHe: "דירה עם נוף לים, הכרמל",
    about:
      "A sea-view flat high on the Carmel ridge. The home market: lower yields, priced for lifestyle. Active and distributing rent.",
    aboutHe:
      "דירה עם נוף לים גבוה על רכס הכרמל. השוק הביתי: תשואות נמוכות יותר, מתומחר לאיכות חיים. פעילה ומחלקת שכר דירה.",
    lat: 32.813,
    lng: 34.984,
    theme: 1,
    price: 545000,
    grossYield: 3.3,
    netYield: 2.0,
    monthlyRent: 1499,
    tokenCount: 10900,
    tokenPrice: 50,
    status: "active",
    fundingRaised: 545000,
    fundingTarget: 545000,
    daysLeft: 0,
    appraisalValue: 558000,
    marketAppreciation: 9,
    tags: [],
  },
  {
    id: "isr-german-colony",
    market: "israel",
    cityKey: "market.israel",
    countryKey: "market.israel",
    district: "Haifa · German Colony",
    districtHe: "חיפה · המושבה הגרמנית",
    title: "Restored Templer house, German Colony",
    titleHe: "בית טמפלרי משוחזר, המושבה הגרמנית",
    about:
      "A restored 19th-century Templer stone house on the German Colony axis below the Bahá'í Gardens. Funding round open.",
    aboutHe:
      "בית אבן טמפלרי משוחזר מהמאה ה־19 על ציר המושבה הגרמנית מתחת לגני הבהאים. סבב הגיוס פתוח.",
    lat: 32.818,
    lng: 34.988,
    theme: 2,
    price: 610000,
    grossYield: 3.5,
    netYield: 2.1,
    monthlyRent: 1779,
    tokenCount: 12200,
    tokenPrice: 50,
    status: "funding",
    fundingRaised: 232000,
    fundingTarget: 610000,
    daysLeft: 15,
    appraisalValue: 620000,
    marketAppreciation: 9,
    tags: ["highYield"],
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

// ---- Map view presets (leaflet center/zoom) ----
export type MapPreset = { center: [number, number]; zoom: number };

// All-markets overview: roughly centered over the Mediterranean corridor.
export const ALL_MARKETS_VIEW: MapPreset = { center: [41.5, 15], zoom: 4.3 };

export const MARKET_VIEWS: Record<MarketId, MapPreset> = {
  budapest: { center: [47.5175, 19.0625], zoom: 12 },
  athens: { center: [37.975, 23.7305], zoom: 12.5 },
  portugal: { center: [41.15, -8.595], zoom: 13 },
  israel: { center: [32.808, 34.989], zoom: 13 },
};

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
  { propertyId: "bud-obuda", tokens: 30, costBasisPerToken: 25 },
  { propertyId: "prt-cedofeita", tokens: 20, costBasisPerToken: 25 },
];

// ---- Distributions (rent history + upcoming), per token ----
export type Distribution = {
  propertyId: string;
  date: string; // ISO
  amountPerToken: number; // €
  paid: boolean;
};

// A rolling year of monthly rent distributions. The most recent month is
// still "upcoming" (scheduled, not yet paid); everything before it is paid.
const HISTORY_MONTHS = [
  "2025-08", "2025-09", "2025-10", "2025-11", "2025-12",
  "2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06", "2026-07",
];
const UPCOMING_MONTH = "2026-07";

// Deterministic per-token monthly amount with a small seasonal wobble
// (no Math.random → stable across renders/SSR).
function monthlySeries(propertyId: string, base: number): Distribution[] {
  return HISTORY_MONTHS.map((m, i) => ({
    propertyId,
    date: `${m}-01`,
    amountPerToken: Math.round((base + ((i % 3) - 1) * 0.01) * 100) / 100,
    paid: m !== UPCOMING_MONTH,
  }));
}

export const SEED_DISTRIBUTIONS: Distribution[] = [
  ...monthlySeries("bud-district-xiii", 0.29),
  ...monthlySeries("ath-koukaki", 0.33),
  ...monthlySeries("bud-obuda", 0.27),
  ...monthlySeries("prt-cedofeita", 0.22),
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

// A depth book is generated around each tradeable property's NAV-anchored
// estimated price, so every selectable market on the Trade screen has a
// populated order book (3 bids below, 3 asks above).
function orderBook(p: Property): Order[] {
  const mid = estimatedTokenPrice(p);
  const r2 = (n: number) => Math.round(n * 100) / 100;
  const bidTokens = [40, 75, 130];
  const askTokens = [30, 60, 105];
  const bidOff = [0.27, 0.5, 0.82];
  const askOff = [0.3, 0.62, 1.0];
  const orders: Order[] = [];
  bidOff.forEach((off, i) =>
    orders.push({
      id: `${p.id}-b${i}`,
      propertyId: p.id,
      side: "buy",
      tokens: bidTokens[i],
      price: r2(mid - off),
    })
  );
  askOff.forEach((off, i) =>
    orders.push({
      id: `${p.id}-a${i}`,
      propertyId: p.id,
      side: "sell",
      tokens: askTokens[i],
      price: r2(mid + off),
    })
  );
  return orders;
}

export const SEED_ORDERS: Order[] = PROPERTIES.filter(
  (p) => p.status === "active" || p.status === "funding"
).flatMap(orderBook);

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
    id: "n5",
    type: "payout",
    titleEn: "June rent distributed",
    titleHe: "שכר הדירה של יוני חולק",
    bodyEn: "€30.72 in June rent across your 4 holdings has been distributed to your demo balance.",
    bodyHe: "€30.72 שכר דירה של יוני על פני 4 ההחזקות שלכם חולקו ליתרת ההדגמה שלכם.",
    date: "2026-06-01",
    read: true,
  },
  {
    id: "n6",
    type: "system",
    titleEn: "New listing: Kolonaki, Athens",
    titleHe: "נכס חדש: קולונאקי, אתונה",
    bodyEn: "A prime Kolonaki flat just opened for funding — €189,000, 4.6% gross yield (illustrative).",
    bodyHe: "דירה יוקרתית בקולונאקי נפתחה לגיוס — €189,000, תשואה ברוטו 4.6% (להמחשה).",
    date: "2026-05-22",
    read: true,
  },
  {
    id: "n7",
    type: "system",
    titleEn: "Appraisal update: District XIII",
    titleHe: "עדכון הערכת שמאי: רובע XIII",
    bodyEn: "The District XIII studio was re-appraised upward; your estimated token price rose to €25.64 (illustrative).",
    bodyHe: "הסטודיו ברובע XIII הוערך מחדש כלפי מעלה; מחיר הטוקן המשוער שלכם עלה ל־€25.64 (להמחשה).",
    date: "2026-05-04",
    read: true,
  },
  {
    id: "n8",
    type: "payout",
    titleEn: "May rent distributed",
    titleHe: "שכר הדירה של מאי חולק",
    bodyEn: "€30.66 in May rent has been distributed across your holdings.",
    bodyHe: "€30.66 שכר דירה של מאי חולקו על פני ההחזקות שלכם.",
    date: "2026-05-01",
    read: true,
  },
  {
    id: "n9",
    type: "round",
    titleEn: "Óbuda round fully funded",
    titleHe: "סבב אובודה גויס במלואו",
    bodyEn: "The Óbuda garden-view flat reached 100% funding — tokens are now active and paying rent.",
    bodyHe: "דירת הגן באובודה הגיעה ל־100% גיוס — הטוקנים פעילים כעת ומניבים שכר דירה.",
    date: "2026-03-18",
    read: true,
  },
  {
    id: "n10",
    type: "system",
    titleEn: "Your automated tax report is ready",
    titleHe: "דו״ח המס האוטומטי שלכם מוכן",
    bodyEn: "Your 2025 Israeli tax report has been pre-filled from your distributions (mock, illustrative).",
    bodyHe: "דו״ח המס הישראלי שלכם ל־2025 מולא מראש מתוך החלוקות שלכם (הדמיה, להמחשה).",
    date: "2026-02-11",
    read: true,
  },
];
