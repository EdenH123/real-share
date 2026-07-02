// Formatters for ₪ / € / % — locale-aware, always LTR-isolated numerals.
import type { Locale } from "./i18n";

const EUR_TO_ILS = 4.0; // illustrative fixed rate for the demo

export function formatEUR(value: number, opts?: { decimals?: number }): string {
  const decimals = opts?.decimals ?? 0;
  return (
    "€" +
    value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );
}

export function formatILS(value: number, opts?: { decimals?: number }): string {
  const decimals = opts?.decimals ?? 0;
  return (
    "₪" +
    value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );
}

export function eurToIls(eur: number): number {
  return eur * EUR_TO_ILS;
}

export function formatPct(value: number, opts?: { decimals?: number; sign?: boolean }): string {
  const decimals = opts?.decimals ?? 1;
  const sign = opts?.sign && value > 0 ? "+" : "";
  return `${sign}${value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}%`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

/** Format a date for the given locale. */
export function formatDate(iso: string, locale: Locale): string {
  const d = new Date(iso);
  return d.toLocaleDateString(locale === "he" ? "he-IL" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatMonthYear(iso: string, locale: Locale): string {
  const d = new Date(iso);
  return d.toLocaleDateString(locale === "he" ? "he-IL" : "en-GB", {
    month: "short",
    year: "numeric",
  });
}
