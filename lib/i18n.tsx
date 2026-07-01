"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { en } from "./locales/en";
import { he } from "./locales/he";

export type Locale = "he" | "en";
export type Dir = "rtl" | "ltr";

const DICTS: Record<Locale, Record<string, string>> = { en, he };

export function dirFor(locale: Locale): Dir {
  return locale === "he" ? "rtl" : "ltr";
}

type I18nValue = {
  locale: Locale;
  dir: Dir;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  /** translate by dot-path key with optional {var} interpolation */
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

const STORAGE_KEY = "realshare.locale";

function interpolate(str: string, vars?: Record<string, string | number>) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) =>
    vars[k] !== undefined ? String(vars[k]) : `{${k}}`
  );
}

export function I18nProvider({
  children,
  initialLocale = "he",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved === "he" || saved === "en") {
        setLocaleState(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // reflect locale onto <html> and persist
  useEffect(() => {
    const dir = dirFor(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const toggleLocale = useCallback(
    () => setLocaleState((prev) => (prev === "he" ? "en" : "he")),
    []
  );

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const dict = DICTS[locale];
      const val = dict[key] ?? DICTS.en[key] ?? key;
      return interpolate(val, vars);
    },
    [locale]
  );

  return (
    <I18nContext.Provider
      value={{ locale, dir: dirFor(locale), setLocale, toggleLocale, t }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
