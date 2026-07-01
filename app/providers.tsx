"use client";

import { I18nProvider } from "@/lib/i18n";
import { StoreProvider } from "@/lib/store";
import { useEffect } from "react";

function ServiceWorkerRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const onLoad = () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {
          /* SW registration failing is non-fatal for the preview */
        });
      };
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider initialLocale="he">
      <StoreProvider>
        <ServiceWorkerRegistration />
        {children}
      </StoreProvider>
    </I18nProvider>
  );
}
