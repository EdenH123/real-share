"use client";

import { usePathname } from "next/navigation";
import { TabBar } from "./TabBar";
import { DisclaimerBar } from "@/components/ui/DisclaimerBar";
import { OnboardingGate } from "@/components/onboarding/OnboardingGate";

// Routes that show the bottom tab bar.
const TAB_ROUTES = ["/", "/map", "/trade", "/portfolio", "/profile"];

export function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showTabs = TAB_ROUTES.includes(pathname);

  return (
    <div className="app-frame-outer flex min-h-[100dvh] items-stretch justify-center bg-[#e9eef1] sm:items-center sm:py-6">
      <div className="app-frame relative flex h-[100dvh] w-full max-w-app flex-col overflow-hidden bg-[#e9eef1] shadow-cardHover sm:h-[min(860px,calc(100dvh-48px))] sm:rounded-[40px] sm:ring-1 sm:ring-black/5">
        {/* Scrollable content */}
        <main className="app-scroll no-scrollbar min-h-0 flex-1">{children}</main>

        {/* Persistent disclaimer legend (always visible) */}
        <div className="no-print contents">
          <DisclaimerBar />
        </div>

        {/* Bottom tab bar on main routes */}
        {showTabs && (
          <div className="no-print contents">
            <TabBar />
          </div>
        )}

        {/* Onboarding overlay on first visit */}
        <OnboardingGate />
      </div>
    </div>
  );
}
