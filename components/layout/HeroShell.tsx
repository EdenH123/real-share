"use client";

import { Aurora } from "@/components/fx/Aurora";
import { cn } from "@/lib/cn";

/**
 * Immersive screen shell: a deep-navy aurora header band that hosts the
 * screen's header + hero content, with the page content rising over it as a
 * rounded light "sheet". The signature layout of the app's main screens.
 */
export function HeroShell({
  hero,
  children,
  dust = true,
  flush = false,
  className,
}: {
  hero: React.ReactNode;
  children: React.ReactNode;
  /** float gold dust in the header band */
  dust?: boolean;
  /** sheet starts flush (no rounded overlap) — e.g. when a map sits beneath */
  flush?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("pb-6", className)}>
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-b from-[#0F2233] via-[#12293f] to-[#173654] text-white",
          !flush && "pb-12"
        )}
      >
        <Aurora dust={dust} intensity={0.85} />
        <div className="relative">{hero}</div>
      </div>
      <div
        className={cn(
          "relative bg-[#e9eef1]",
          !flush && "-mt-7 rounded-t-[28px] pt-6 shadow-[0_-8px_24px_-16px_rgba(15,34,51,.5)]"
        )}
      >
        {children}
      </div>
    </div>
  );
}

/** Frosted-glass stat tile for use on the navy hero band. */
export function GlassStat({
  label,
  value,
  gold = false,
  className,
}: {
  label: string;
  value: React.ReactNode;
  gold?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white/[.08] p-3 ring-1 ring-white/[.14] backdrop-blur-sm",
        className
      )}
    >
      <div className="text-[11px] text-white/65">{label}</div>
      <div
        className={cn(
          "num mt-0.5 text-sm font-semibold",
          gold ? "text-gold" : "text-white"
        )}
      >
        {value}
      </div>
    </div>
  );
}
