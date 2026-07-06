"use client";

/**
 * Tiny first-party funnel tracker for the POC. Sends events to /api/track,
 * which forwards them to your webhook (Google Sheet) when configured.
 * No cookies, no third parties; an anonymous per-device id + the ?src=
 * campaign tag let you count uniques and compare channels.
 */

const ID_KEY = "realshare.anon";
const SRC_KEY = "realshare.src";

export function getAnon(): string {
  return anonId();
}

function anonId(): string {
  try {
    let id = localStorage.getItem(ID_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID().slice(0, 13)
          : String(Date.now());
      localStorage.setItem(ID_KEY, id);
    }
    return id;
  } catch {
    return "unknown";
  }
}

/** Capture ?src=... once per device so you can compare channels. */
export function captureSrc() {
  try {
    const src = new URLSearchParams(window.location.search).get("src");
    if (src && !localStorage.getItem(SRC_KEY)) {
      localStorage.setItem(SRC_KEY, src.slice(0, 40));
    }
  } catch {
    /* ignore */
  }
}

export function getSrc(): string {
  try {
    return localStorage.getItem(SRC_KEY) ?? "";
  } catch {
    return "";
  }
}

export type FunnelEvent =
  | "view_home"
  | "view_property"
  | "invest_intent"
  | "trade_intent"
  | "waitlist_open";

export function track(event: FunnelEvent, props: Record<string, string | number> = {}) {
  try {
    const body = JSON.stringify({
      event,
      props,
      anon: anonId(),
      src: getSrc(),
      locale: document.documentElement.lang,
      path: window.location.pathname,
      at: new Date().toISOString(),
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    /* tracking must never break the app */
  }
}
