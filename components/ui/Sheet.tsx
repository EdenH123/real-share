"use client";

import { cn } from "@/lib/cn";
import { X } from "lucide-react";
import { useEffect } from "react";

/** Bottom sheet / modal overlay, RTL-safe, closes on backdrop + Esc. */
export function Sheet({
  open,
  onClose,
  children,
  title,
  className,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-navy/50 backdrop-blur-sm animate-[fade-up_.2s_ease]"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-app rounded-t-3xl bg-surface shadow-cardHover animate-[fade-up_.28s_cubic-bezier(.22,.61,.36,1)] max-h-[90dvh] overflow-y-auto no-scrollbar",
          className
        )}
      >
        <div className="sticky top-0 flex items-center justify-between gap-4 bg-surface/95 px-5 pt-4 pb-3 backdrop-blur">
          <div className="h-1 w-10 rounded-full bg-hairline absolute top-2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2" />
          {title ? (
            <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
          ) : (
            <span />
          )}
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-tint text-muted hover:text-ink"
            aria-label="close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-5 pb-8 pt-1">{children}</div>
      </div>
    </div>
  );
}
