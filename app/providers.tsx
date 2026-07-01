"use client";

import { I18nProvider } from "@/lib/i18n";
import { StoreProvider } from "@/lib/store";
import { useEffect } from "react";

function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* SW registration failing is non-fatal for the preview */
      });
    };
    // If the page already finished loading (React often mounts after the
    // window 'load' event), register immediately; otherwise wait for load.
    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register);
      return () => window.removeEventListener("load", register);
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
