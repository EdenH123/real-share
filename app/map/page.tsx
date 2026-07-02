"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useI18n } from "@/lib/i18n";
import {
  PROPERTIES,
  MARKETS,
  getProperty,
  type MarketId,
  type PropertyStatus,
} from "@/lib/seed";
import { propTitle, propDistrict } from "@/lib/property";
import { Header } from "@/components/layout/Header";
import { HeroShell } from "@/components/layout/HeroShell";
import { PropertyCard } from "@/components/property/PropertyCard";
import { MarketsTable } from "@/components/home/MarketsTable";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";
import { ChevronUp, ChevronDown, Search } from "lucide-react";

type SortKey = "default" | "priceAsc" | "priceDesc" | "yieldDesc" | "status";

const STATUS_ORDER: Record<PropertyStatus, number> = {
  funding: 0,
  active: 1,
  exitVote: 2,
  failed: 3,
};

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
  const { t, locale } = useI18n();
  const [market, setMarket] = useState<MarketId | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(true);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("default");

  const filtered = useMemo(
    () =>
      market === "all"
        ? PROPERTIES
        : PROPERTIES.filter((p) => p.market === market),
    [market]
  );

  // Search (title + district, current locale) then sort.
  const displayed = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = filtered;
    if (q) {
      list = list.filter(
        (p) =>
          propTitle(p, locale).toLowerCase().includes(q) ||
          propDistrict(p, locale).toLowerCase().includes(q)
      );
    }
    const sorted = [...list];
    switch (sort) {
      case "priceAsc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "yieldDesc":
        sorted.sort((a, b) => b.grossYield - a.grossYield);
        break;
      case "status":
        sorted.sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);
        break;
      default:
        break;
    }
    return sorted;
  }, [filtered, query, sort, locale]);

  const sortOptions: { id: SortKey; label: string }[] = [
    { id: "default", label: t("map.sort.default") },
    { id: "priceAsc", label: t("map.sort.priceAsc") },
    { id: "priceDesc", label: t("map.sort.priceDesc") },
    { id: "yieldDesc", label: t("map.sort.yieldDesc") },
    { id: "status", label: t("map.sort.status") },
  ];

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
  }, [selectedId, displayed]);

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
    <HeroShell
      flush
      hero={<Header title={t("map.title")} subtitle={t("map.subtitle")} onDark />}
    >

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

      {/* search + sort */}
      <div className="mt-4 px-4">
        <div className="relative">
          <Search
            size={17}
            className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("map.searchPlaceholder")}
            aria-label={t("map.searchPlaceholder")}
            className="h-11 w-full rounded-full border border-hairline bg-surface ps-10 pe-4 text-sm text-ink shadow-card outline-none placeholder:text-muted focus:border-teal"
          />
        </div>
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
          {sortOptions.map((s) => (
            <button
              key={s.id}
              onClick={() => setSort(s.id)}
              aria-pressed={sort === s.id}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                sort === s.id ? "bg-navy text-white" : "bg-tint text-muted"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* results count */}
      <div className="mt-3 px-4">
        <span className="text-sm font-semibold text-muted">
          {t("map.results", { count: displayed.length })}
        </span>
      </div>

      {/* list */}
      <div className="mt-3 space-y-4 px-4">
        {displayed.map((p) => (
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
    </HeroShell>
  );
}
