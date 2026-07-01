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
    <div className="flex min-h-[100dvh] items-stretch justify-center bg-[#e9eef1] sm:py-6">
      <div className="relative flex w-full max-w-app flex-col overflow-hidden bg-[#e9eef1] shadow-cardHover sm:min-h-[860px] sm:rounded-[40px] sm:ring-1 sm:ring-black/5 min-h-[100dvh]">
        {/* Scrollable content */}
        <main className="app-scroll no-scrollbar flex-1">{children}</main>

        {/* Persistent disclaimer legend (always visible) */}
        <DisclaimerBar />

        {/* Bottom tab bar on main routes */}
        {showTabs && <TabBar />}

        {/* Onboarding overlay on first visit */}
        <OnboardingGate />
      </div>
    </div>
  );
}
