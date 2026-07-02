"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/cn";

/** HE / EN segmented toggle. */
export function LanguageToggle({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const { locale, setLocale } = useI18n();
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full p-0.5 text-xs font-bold",
        isDark ? "bg-white/10" : "bg-tint",
        className
      )}
      role="group"
      aria-label="language"
    >
      {(["he", "en"] as const).map((l) => {
        const active = locale === l;
        return (
          <button
            key={l}
            onClick={() => setLocale(l)}
            className={cn(
              "rounded-full px-3 py-1 transition-colors",
              active
                ? "bg-gold text-navy"
                : isDark
                ? "text-white/70"
                : "text-muted"
            )}
            aria-pressed={active}
          >
            {l === "he" ? "עב" : "EN"}
          </button>
        );
      })}
    </div>
  );
}
