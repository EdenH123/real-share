"use client";

import { useStore } from "@/lib/store";
import { Onboarding } from "./Onboarding";

/** Shows the onboarding overlay on first visit (until dismissed/finished). */
export function OnboardingGate() {
  const { ready, onboarded, setOnboarded } = useStore();

  if (!ready || onboarded) return null;

  return (
    <div className="absolute inset-0 z-[90]">
      <Onboarding onFinish={() => setOnboarded(true)} />
    </div>
  );
}
