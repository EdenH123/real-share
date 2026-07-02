"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { useI18n } from "@/lib/i18n";
import { CloudOff } from "lucide-react";

const CARTO_URL =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const TRANSPARENT_TILE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const BUILDING_GLYPH = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M6 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16"/><path d="M14 10h4a1 1 0 0 1 1 1v10"/><path d="M9 8h1.5M9 12h1.5M9 16h1.5"/></svg>`;

/** Non-interactive single-pin map for the property detail page. */
export function MiniMap({
  lat,
  lng,
  zoom = 13,
}: {
  lat: number;
  lng: number;
  zoom?: number;
}) {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [tilesOffline, setTilesOffline] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom,
      zoomControl: false,
      attributionControl: true,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      touchZoom: false,
      keyboard: false,
    });

    L.tileLayer(CARTO_URL, {
      subdomains: "abcd",
      maxZoom: 19,
      errorTileUrl: TRANSPARENT_TILE,
      attribution: t("map.attribution"),
      crossOrigin: true,
    })
      .on("tileerror", () => setTilesOffline(true))
      .addTo(map);

    L.marker([lat, lng], {
      keyboard: false,
      interactive: false,
      icon: L.divIcon({
        className: "rs-pin",
        html: `<div class="rs-pin__dot">${BUILDING_GLYPH}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      }),
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng, zoom]);

  return (
    <div className="relative h-36 overflow-hidden rounded-card">
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

export default MiniMap;
