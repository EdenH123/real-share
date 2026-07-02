"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { PROPERTIES, MARKETS, type MarketId } from "@/lib/seed";
import { Header } from "@/components/layout/Header";
import { PropertyCard } from "@/components/property/PropertyCard";
import { MarketsTable } from "@/components/home/MarketsTable";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { MapPin, List, Map as MapIcon } from "lucide-react";
import { IllustrativeTag } from "@/components/ui/IllustrativeTag";

// Approximate pin positions on the stylized map (% within the card).
const PIN_POS: Record<MarketId, { top: string; start: string }> = {
  portugal: { top: "46%", start: "10%" },
  budapest: { top: "30%", start: "52%" },
  athens: { top: "58%", start: "60%" },
  israel: { top: "66%", start: "78%" },
};

export default function MapPage() {
  const { t } = useI18n();
  const [market, setMarket] = useState<MarketId | "all">("all");
  const [view, setView] = useState<"list" | "map">("list");

  const filtered = useMemo(
    () => (market === "all" ? PROPERTIES : PROPERTIES.filter((p) => p.market === market)),
    [market]
  );

  return (
    <div className="pb-6">
      <Header title={t("map.title")} subtitle={t("map.subtitle")} />

      {/* market filter */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-1">
        <button
          onClick={() => setMarket("all")}
          className={cn(
            "shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
            market === "all" ? "bg-navy text-white" : "bg-tint text-muted"
          )}
        >
          {t("map.allMarkets")}
        </button>
        {MARKETS.map((m) => (
          <button
            key={m.id}
            onClick={() => setMarket(m.id)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
              market === m.id ? "bg-navy text-white" : "bg-tint text-muted"
            )}
          >
            {t(m.nameKey)}
          </button>
        ))}
      </div>

      {/* view toggle + count */}
      <div className="mt-3 flex items-center justify-between px-4">
        <span className="text-sm font-semibold text-muted">
          {t("map.results", { count: filtered.length })}
        </span>
        <div className="inline-flex rounded-full bg-tint p-0.5 text-sm font-semibold">
          <button
            onClick={() => setView("list")}
            className={cn(
              "flex items-center gap-1 rounded-full px-3 py-1",
              view === "list" ? "bg-surface text-ink shadow-card" : "text-muted"
            )}
          >
            <List size={15} /> {t("map.listView")}
          </button>
          <button
            onClick={() => setView("map")}
            className={cn(
              "flex items-center gap-1 rounded-full px-3 py-1",
              view === "map" ? "bg-surface text-ink shadow-card" : "text-muted"
            )}
          >
            <MapIcon size={15} /> {t("map.mapView")}
          </button>
        </div>
      </div>

      {view === "map" && (
        <div className="mt-3 px-4">
          <Card className="overflow-hidden">
            <div className="relative h-64 bg-gradient-to-br from-[#123049] via-[#1B3A5B] to-[#1F6675]">
              {/* stylized landmass blobs */}
              <div className="absolute left-[6%] top-[38%] h-24 w-28 rounded-[40%] bg-white/5" />
              <div className="absolute left-[40%] top-[22%] h-28 w-40 rounded-[45%] bg-white/5" />
              <div className="absolute left-[62%] top-[52%] h-20 w-24 rounded-[45%] bg-white/5" />
              {MARKETS.map((m) => {
                const pos = PIN_POS[m.id];
                const count = PROPERTIES.filter((p) => p.market === m.id).length;
                const active = market === "all" || market === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMarket(m.id)}
                    className="absolute -translate-x-1/2 rtl:translate-x-1/2"
                    style={{ top: pos.top, insetInlineStart: pos.start }}
                  >
                    <span
                      className={cn(
                        "flex flex-col items-center transition-all",
                        active ? "opacity-100" : "opacity-40"
                      )}
                    >
                      <span className="flex items-center gap-1 rounded-full bg-gold px-2 py-1 text-xs font-bold text-navy shadow-lg">
                        <MapPin size={12} /> {t(m.nameKey)}
                        <span className="num rounded-full bg-navy/20 px-1">{count}</span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="text-[11px] text-muted">{t("map.mapNote")}</span>
              <IllustrativeTag />
            </div>
          </Card>
        </div>
      )}

      <div className="mt-4 space-y-4 px-4">
        {filtered.map((p) => (
          <PropertyCard key={p.id} p={p} />
        ))}
      </div>

      <div className="mt-8 px-4">
        <SectionTitle>{t("map.exploreMarkets")}</SectionTitle>
        <MarketsTable />
      </div>
    </div>
  );
}
