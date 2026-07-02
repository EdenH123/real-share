"use client";

import { useStore } from "@/lib/store";
import { Onboarding } from "./Onboarding";

/** Shows the onboarding overlay on first visit (until dismissed/finished). */
export function OnboardingGate() {
  const { ready, onboarded, setOnboarded } = useStore();

  if (!ready || onboarded) return null;

  return (
    <div className="absolute inset-0 z-[90] bg-[#0F2233] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <Onboarding onFinish={() => setOnboarded(true)} />
    </div>
  );
}
