"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useI18n } from "@/lib/i18n";
import { PROPERTIES, MARKETS, getProperty, type MarketId } from "@/lib/seed";
import { Header } from "@/components/layout/Header";
import { PropertyCard } from "@/components/property/PropertyCard";
import { MarketsTable } from "@/components/home/MarketsTable";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";
import { ChevronUp, ChevronDown } from "lucide-react";

const MapView = dynamic(() => import("@/components/map/MapView"), {
  ssr: false,
  loading: () => (
    <div
      className="h-full w-full"
      style={{ background: "#0F2233" }}
      aria-hidden
    />
  ),
});

export default function MapPage() {
  const { t } = useI18n();
  const [market, setMarket] = useState<MarketId | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(true);

  const filtered = useMemo(
    () =>
      market === "all"
        ? PROPERTIES
        : PROPERTIES.filter((p) => p.market === market),
    [market]
  );

  function selectMarket(m: MarketId | "all") {
    setMarket(m);
    setSelectedId(null);
  }

  function handlePinSelect(id: string) {
    const p = getProperty(id);
    // Make sure the tapped property's card is present in the list.
    if (p && market !== "all" && p.market !== market) setMarket("all");
    setSelectedId(id);
  }

  // Scroll the selected property's card into view.
  useEffect(() => {
    if (!selectedId) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const id = window.setTimeout(() => {
      const el = document.getElementById(`prop-card-${selectedId}`);
      el?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "center",
      });
    }, 60);
    return () => window.clearTimeout(id);
  }, [selectedId, filtered]);

  const chips = (
    <>
      <button
        onClick={() => selectMarket("all")}
        className={cn(
          "shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold shadow-card transition-colors",
          market === "all" ? "bg-navy text-white" : "bg-surface text-muted"
        )}
      >
        {t("map.allMarkets")}
      </button>
      {MARKETS.map((m) => (
        <button
          key={m.id}
          onClick={() => selectMarket(m.id)}
          className={cn(
            "shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold shadow-card transition-colors",
            market === m.id ? "bg-navy text-white" : "bg-surface text-muted"
          )}
        >
          {t(m.nameKey)}
        </button>
      ))}
    </>
  );

  return (
    <div className="pb-6">
      <Header title={t("map.title")} subtitle={t("map.subtitle")} />

      {/* Map hero — default view. Filter chips overlay the top; a collapse/
          expand toggle sizes the map. */}
      <div className="relative">
        <div
          className={cn(
            "overflow-hidden transition-[height] duration-300 ease-out",
            expanded ? "h-[46dvh]" : "h-0"
          )}
        >
          <MapView
            market={market}
            selectedId={selectedId}
            onSelect={handlePinSelect}
            expanded={expanded}
          />
        </div>

        <div
          className={cn(
            "flex items-center gap-2",
            expanded ? "absolute inset-x-0 top-0 z-[600] p-3" : "px-4 pt-3"
          )}
        >
          <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto">
            {chips}
          </div>
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? t("map.collapse") : t("map.expand")}
            aria-expanded={expanded}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy text-white shadow-card"
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* results count */}
      <div className="mt-3 px-4">
        <span className="text-sm font-semibold text-muted">
          {t("map.results", { count: filtered.length })}
        </span>
      </div>

      {/* list */}
      <div className="mt-3 space-y-4 px-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            id={`prop-card-${p.id}`}
            className={cn(
              "scroll-mt-24 rounded-card transition-shadow",
              selectedId === p.id &&
                "ring-2 ring-gold ring-offset-2 ring-offset-[#e9eef1]"
            )}
          >
            <PropertyCard p={p} />
          </div>
        ))}
      </div>

      <div className="mt-8 px-4">
        <SectionTitle>{t("map.exploreMarkets")}</SectionTitle>
        <MarketsTable />
      </div>
    </div>
  );
}
