"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { PROPERTIES, getProperty, estimatedTokenPrice, type OrderSide } from "@/lib/seed";
import { propTitle, propArea } from "@/lib/property";
import { formatEUR } from "@/lib/format";
import { Header } from "@/components/layout/Header";
import { HeroShell } from "@/components/layout/HeroShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { IconMedallion } from "@/components/ui/IconMedallion";
import { IllustrativeTag } from "@/components/ui/IllustrativeTag";
import { Sheet } from "@/components/ui/Sheet";
import { DepthChart } from "@/components/charts/DepthChart";
import { cn } from "@/lib/cn";
import { Info, TrendingUp, Coins, CheckCircle2 } from "lucide-react";

// Only active/funding properties are tradeable in the demo.
const TRADEABLE = PROPERTIES.filter((p) => p.status === "active" || p.status === "funding");

function TradeInner() {
  const { t, locale } = useI18n();
  const { orders, placeOrder } = useStore();
  const searchParams = useSearchParams();
  const initial = searchParams.get("property");

  const initialId =
    initial && TRADEABLE.some((p) => p.id === initial)
      ? initial
      : TRADEABLE[0].id;
  const [selId, setSelId] = useState(initialId);
  const [sheet, setSheet] = useState<null | OrderSide>(null);
  const [placed, setPlaced] = useState(false);
  const [qty, setQty] = useState(10);

  const p = getProperty(selId)!;
  const est = estimatedTokenPrice(p);
  const [price, setPrice] = useState(Number(est.toFixed(2)));

  const book = useMemo(() => {
    const all = orders.filter((o) => o.propertyId === selId);
    const bids = all.filter((o) => o.side === "buy").sort((a, b) => b.price - a.price);
    const asks = all.filter((o) => o.side === "sell").sort((a, b) => a.price - b.price);
    const bestBid = bids[0]?.price;
    const bestAsk = asks[0]?.price;
    const spread = bestBid && bestAsk ? bestAsk - bestBid : 0;
    return { bids, asks, spread };
  }, [orders, selId]);

  const myOrders = useMemo(
    () => orders.filter((o) => o.mine),
    [orders]
  );

  function openSheet(side: OrderSide) {
    setPrice(Number(est.toFixed(2)));
    setQty(10);
    setPlaced(false);
    setSheet(side);
  }

  function submitOrder() {
    if (!sheet) return;
    placeOrder(selId, sheet, qty, price);
    setPlaced(true);
  }

  const maxBar = Math.max(
    ...book.bids.map((b) => b.tokens),
    ...book.asks.map((a) => a.tokens),
    1
  );

  return (
    <HeroShell
      className="pb-8"
      hero={
        <>
          <Header title={t("trade.title")} subtitle={t("trade.subtitle")} onDark />
          <div className="px-5 pt-1">
            {/* property selector — glass chips on navy */}
            <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {TRADEABLE.map((tp) => (
                <button
                  key={tp.id}
                  onClick={() => setSelId(tp.id)}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                    selId === tp.id
                      ? "bg-gold text-navy"
                      : "bg-white/[.08] text-white/75 ring-1 ring-white/[.14]"
                  )}
                >
                  {t(tp.cityKey)} · {propArea(tp, locale)}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <IconMedallion icon={Coins} size={46} shine />
              <div className="flex-1">
                <div className="eyebrow !text-gold">{t("trade.estPrice")}</div>
                <div className="num font-display text-[34px] font-semibold leading-tight text-white">
                  {formatEUR(est, { decimals: 2 })}
                </div>
              </div>
              <div className="text-end">
                <div className="max-w-[130px] truncate text-[11px] text-white/60">
                  {propTitle(p, locale)}
                </div>
                <div className="mt-1 flex items-center justify-end gap-1 text-xs text-white/70">
                  <TrendingUp size={13} className="text-[#5fc493]" />
                  {t("trade.spread")}: <span className="num">{formatEUR(book.spread, { decimals: 2 })}</span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-white/55">
              {t("trade.estPriceNote")}
            </p>
          </div>
        </>
      }
    >
      <div className="space-y-4 px-4">
        {/* sim badge */}
        <div className="flex items-center gap-2 rounded-card bg-gold/12 px-3 py-2 text-xs font-semibold text-gold-text">
          <Info size={15} />
          {t("trade.simBadge")}
        </div>

        {/* market depth */}
        <Card className="p-4">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-ink">
              {t("trade.depth")}
            </h2>
            <IllustrativeTag />
          </div>
          <DepthChart bids={book.bids} asks={book.asks} est={est} />
        </Card>

        {/* order book */}
        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-ink">
              {t("trade.orderBook")}
            </h2>
            <IllustrativeTag />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* bids */}
            <div>
              <div className="mb-1.5 text-xs font-semibold text-positive">{t("trade.bids")}</div>
              <div className="space-y-1">
                {book.bids.map((o) => (
                  <div key={o.id} className="relative overflow-hidden rounded-md">
                    <div
                      className="absolute inset-y-0 end-0 bg-positive/10"
                      style={{ width: `${(o.tokens / maxBar) * 100}%` }}
                    />
                    <div className="relative flex justify-between px-2 py-1 text-xs">
                      <span className="num font-semibold text-positive">
                        {formatEUR(o.price, { decimals: 2 })}
                      </span>
                      <span className="num text-muted">{o.tokens}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* asks */}
            <div>
              <div className="mb-1.5 text-xs font-semibold text-negative">{t("trade.asks")}</div>
              <div className="space-y-1">
                {book.asks.map((o) => (
                  <div key={o.id} className="relative overflow-hidden rounded-md">
                    <div
                      className="absolute inset-y-0 start-0 bg-negative/10"
                      style={{ width: `${(o.tokens / maxBar) * 100}%` }}
                    />
                    <div className="relative flex justify-between px-2 py-1 text-xs">
                      <span className="num text-muted">{o.tokens}</span>
                      <span className="num font-semibold text-negative">
                        {formatEUR(o.price, { decimals: 2 })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-[1fr,1fr] gap-2 text-[10px] text-muted">
            <span>{t("trade.price")} · {t("trade.qty")}</span>
            <span className="text-end">{t("trade.qty")} · {t("trade.price")}</span>
          </div>
        </Card>

        {/* actions */}
        <div className="flex gap-2">
          <Button variant="primary" size="md" className="flex-1" onClick={() => openSheet("buy")}>
            {t("trade.placeBid")}
          </Button>
          <Button variant="secondary" size="md" className="flex-1" onClick={() => openSheet("sell")}>
            {t("trade.placeAsk")}
          </Button>
        </div>

        {/* liquidity honesty note */}
        <Card variant="tint" className="p-4">
          <p className="text-xs leading-relaxed text-muted">{t("trade.liquidityNote")}</p>
        </Card>

        {/* my orders */}
        <div>
          <h2 className="mb-2 font-display text-base font-semibold text-ink">
            {t("trade.myOrders")}
          </h2>
          {myOrders.length === 0 ? (
            <Card variant="tint" className="p-4 text-center text-sm text-muted">
              {t("trade.noOrders")}
            </Card>
          ) : (
            <Card className="divide-y divide-hairline">
              {myOrders.map((o) => (
                <div key={o.id} className="flex items-center justify-between p-3 text-sm">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-bold",
                      o.side === "buy" ? "bg-positive/12 text-positive" : "bg-negative/12 text-negative"
                    )}
                  >
                    {o.side === "buy" ? t("trade.buy") : t("trade.sell")}
                  </span>
                  <span className="text-muted">{t(getProperty(o.propertyId)?.cityKey ?? "")}</span>
                  <span className="num text-ink">
                    {o.tokens} × {formatEUR(o.price, { decimals: 2 })}
                  </span>
                </div>
              ))}
            </Card>
          )}
        </div>
      </div>

      {/* place order sheet */}
      <Sheet
        open={sheet !== null}
        onClose={() => setSheet(null)}
        title={sheet === "buy" ? t("trade.placeBid") : t("trade.placeAsk")}
      >
        {placed ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center animate-scale-in">
            <IconMedallion icon={CheckCircle2} size={56} className="!bg-positive" tone="teal" />
            <h3 className="font-display text-xl font-semibold text-ink">
              {t("trade.orderPlaced")}
            </h3>
            <p className="max-w-xs text-sm text-muted">{t("trade.orderPlacedBody")}</p>
            <Button variant="secondary" size="md" onClick={() => setSheet(null)} className="mt-2">
              {t("common.done")}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-card bg-tint px-4 py-3">
              <span className="text-sm text-muted">{propTitle(p, locale)}</span>
              <span className="num text-sm font-semibold text-teal">
                {formatEUR(est, { decimals: 2 })}
              </span>
            </div>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-ink">{t("trade.qty")}</span>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                className="w-full rounded-xl border border-hairline px-4 py-3 text-ink outline-none focus:border-teal"
                dir="ltr"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-ink">
                {t("trade.price")} ({t("common.perToken")})
              </span>
              <input
                type="number"
                step="0.01"
                min={0}
                value={price}
                onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-hairline px-4 py-3 text-ink outline-none focus:border-teal"
                dir="ltr"
              />
            </label>

            <div className="flex items-center justify-between rounded-card bg-tint px-4 py-3 text-sm">
              <span className="text-muted">{t("invest.total")} · {t("trade.tradeFee")}</span>
              <span className="num font-semibold text-ink">
                {formatEUR(qty * price * 1.02, { decimals: 2 })}
              </span>
            </div>

            <Button size="lg" onClick={submitOrder}>
              {sheet === "buy" ? t("trade.placeBid") : t("trade.placeAsk")} ({t("common.preview")})
            </Button>
          </div>
        )}
      </Sheet>
    </HeroShell>
  );
}

export default function TradePage() {
  return (
    <Suspense fallback={null}>
      <TradeInner />
    </Suspense>
  );
}
