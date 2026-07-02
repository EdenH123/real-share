"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { PROPERTIES, MARKET_VIEWS, type MarketId } from "@/lib/seed";
import { propTitle, propArea } from "@/lib/property";
import { formatEUR, formatPct } from "@/lib/format";
import { CloudOff } from "lucide-react";

const CARTO_URL =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
// 1×1 truly-transparent GIF — used for failed tiles so the browser never
// renders a broken-image glyph (or an opaque pixel) over the "sea" fallback.
const TRANSPARENT_TILE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const BUILDING_GLYPH = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M6 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16"/><path d="M14 10h4a1 1 0 0 1 1 1v10"/><path d="M9 8h1.5M9 12h1.5M9 16h1.5"/></svg>`;

// Bounds enclosing every pin — the "all markets" view fits these so no market
// is ever clipped, regardless of viewport size.
const ALL_PINS_BOUNDS = L.latLngBounds(
  PROPERTIES.map((p) => [p.lat, p.lng] as [number, number])
);
const BOUNDS_PADDING: L.FitBoundsOptions = { padding: [44, 44], maxZoom: 6 };

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

type Props = {
  market: MarketId | "all";
  selectedId: string | null;
  onSelect: (id: string) => void;
  expanded?: boolean;
  className?: string;
};

export function MapView({
  market,
  selectedId,
  onSelect,
  expanded = true,
  className,
}: Props) {
  const { t, locale, dir } = useI18n();
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const onSelectRef = useRef(onSelect);
  const routerRef = useRef(router);
  onSelectRef.current = onSelect;
  routerRef.current = router;

  const [tilesOffline, setTilesOffline] = useState(false);

  // Create the map once.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      zoomSnap: 0.1,
      zoomControl: false, // avoid colliding with the overlaid filter chips
      attributionControl: true,
      scrollWheelZoom: false, // avoid trapping page scroll; +/- and pinch still zoom
    });
    map.fitBounds(ALL_PINS_BOUNDS, BOUNDS_PADDING);

    L.tileLayer(CARTO_URL, {
      subdomains: "abcd",
      maxZoom: 19,
      minZoom: 3,
      errorTileUrl: TRANSPARENT_TILE,
      attribution: t("map.attribution"),
      crossOrigin: true,
    })
      .on("tileerror", () => setTilesOffline(true))
      .addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Build (and rebuild on locale change) the pins + popups.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    for (const p of PROPERTIES) {
      const icon = L.divIcon({
        className: "rs-pin",
        html: `<div class="rs-pin__dot">${BUILDING_GLYPH}</div><div class="rs-pin__chip">${formatEUR(
          p.tokenPrice
        )}</div>`,
        iconSize: [56, 52],
        iconAnchor: [28, 34],
        popupAnchor: [0, -34],
      });

      const title = propTitle(p, locale);
      const loc = `${t(p.cityKey)} · ${propArea(p, locale)}`;
      const price = formatEUR(p.price);
      const yieldStr = `${formatPct(p.grossYield)} · ${t("map.grossYieldNote")}`;
      const popupHtml = `
        <div class="rs-popup" dir="${dir}" style="text-align:${
        dir === "rtl" ? "right" : "left"
      }">
          <div class="rs-popup__title">${title}</div>
          <div class="rs-popup__loc">${loc}</div>
          <div class="rs-popup__row">
            <span class="rs-popup__price num-lat">${price}</span>
            <span class="rs-popup__yield num-lat">${yieldStr}</span>
          </div>
          <div class="rs-popup__ill">${t("common.illustrative")}</div>
          <div><a class="rs-popup__link" href="/property/${p.id}">${t(
        "map.viewDetails"
      )} ${dir === "rtl" ? "←" : "→"}</a></div>
        </div>`;

      const marker = L.marker([p.lat, p.lng], {
        icon,
        title,
        keyboard: true,
        riseOnHover: true,
      })
        .bindPopup(popupHtml, {
          className: "rs-popup-wrap",
          closeButton: true,
          minWidth: 200,
          maxWidth: 240,
          autoPanPadding: [24, 24],
        })
        .on("click", () => onSelectRef.current(p.id))
        .on("keypress", () => onSelectRef.current(p.id));

      marker.addTo(map);
      markersRef.current.set(p.id, marker);
    }

    // Intercept popup link clicks for client-side navigation.
    const onPopupOpen = (e: L.PopupEvent) => {
      const el = e.popup.getElement();
      const link = el?.querySelector<HTMLAnchorElement>(".rs-popup__link");
      if (!link) return;
      link.onclick = (ev) => {
        ev.preventDefault();
        routerRef.current.push(link.getAttribute("href") || "/");
      };
    };
    map.on("popupopen", onPopupOpen);

    // Re-apply selected styling after a rebuild.
    if (selectedId) {
      markersRef.current
        .get(selectedId)
        ?.getElement()
        ?.classList.add("rs-pin--selected");
    }

    return () => {
      map.off("popupopen", onPopupOpen);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  // Fly to the active market preset ("all" fits every pin).
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const reduce = prefersReducedMotion();
    if (market === "all") {
      if (reduce) map.fitBounds(ALL_PINS_BOUNDS, BOUNDS_PADDING);
      else map.flyToBounds(ALL_PINS_BOUNDS, { ...BOUNDS_PADDING, duration: 0.8 });
      return;
    }
    // Fit the bounds of this market's pins (handles several properties per
    // market); fall back to the preset if a market has a single pin.
    const pins = PROPERTIES.filter((p) => p.market === market).map(
      (p) => [p.lat, p.lng] as [number, number]
    );
    if (pins.length >= 2) {
      const b = L.latLngBounds(pins).pad(0.15);
      const opts: L.FitBoundsOptions = { padding: [56, 56], maxZoom: 13.5 };
      if (reduce) map.fitBounds(b, opts);
      else map.flyToBounds(b, { ...opts, duration: 0.8 });
    } else {
      const preset = MARKET_VIEWS[market];
      if (reduce) map.setView(preset.center, preset.zoom);
      else map.flyTo(preset.center, preset.zoom, { duration: 0.8 });
    }
  }, [market]);

  // Reflect the selected pin: gold ring + open popup.
  useEffect(() => {
    markersRef.current.forEach((m, id) => {
      m.getElement()?.classList.toggle("rs-pin--selected", id === selectedId);
    });
    if (selectedId) {
      markersRef.current.get(selectedId)?.openPopup();
    }
  }, [selectedId]);

  // Recompute size when the container is resized (collapse/expand).
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const id = window.setTimeout(() => map.invalidateSize(), 320);
    return () => window.clearTimeout(id);
  }, [expanded]);

  return (
    <div className={`relative h-full w-full ${className ?? ""}`}>
      <div ref={containerRef} dir="ltr" className="rs-map h-full w-full" />
      {tilesOffline && (
        <div className="rs-tiles-chip">
          <CloudOff size={11} />
          {t("map.tilesOffline")}
        </div>
      )}
    </div>
  );
}

export default MapView;
