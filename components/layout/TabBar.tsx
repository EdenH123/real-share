"use client";

import { usePathname } from "next/navigation";
import { Home, Map, ArrowLeftRight, Wallet, User } from "lucide-react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import { useViewTransitionRouter } from "@/components/fx/transitions";
import type { LucideIcon } from "lucide-react";

const TABS: { href: string; icon: LucideIcon; key: string }[] = [
  { href: "/", icon: Home, key: "nav.home" },
  { href: "/map", icon: Map, key: "nav.map" },
  { href: "/trade", icon: ArrowLeftRight, key: "nav.trade" },
  { href: "/portfolio", icon: Wallet, key: "nav.portfolio" },
  { href: "/profile", icon: User, key: "nav.profile" },
];

export function TabBar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const navigate = useViewTransitionRouter();

  const activeIdx = TABS.findIndex(({ href }) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)
  );

  return (
    <nav className="relative flex items-stretch justify-around border-t border-hairline bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      {/* sliding active pill (logical inset → RTL-correct) */}
      {activeIdx >= 0 && (
        <span
          className="tab-pill"
          aria-hidden
          style={{ insetInlineStart: `${activeIdx * 20}%` }}
        />
      )}
      {TABS.map(({ href, icon: Icon, key }, i) => {
        const active = i === activeIdx;
        return (
          <button
            key={href}
            onClick={() => !active && navigate(href)}
            className={cn(
              "relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-semibold transition-colors",
              active ? "text-teal" : "text-muted"
            )}
            aria-current={active ? "page" : undefined}
            aria-label={t(key)}
          >
            <span
              key={active ? "on" : "off"}
              className={cn(
                "grid h-8 w-8 place-items-center rounded-full",
                active && "tab-pop"
              )}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
            </span>
            {t(key)}
          </button>
        );
      })}
    </nav>
  );
}
