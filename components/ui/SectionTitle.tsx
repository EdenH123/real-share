"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

export function SectionTitle({
  children,
  link,
  linkHref,
  className,
}: {
  children: React.ReactNode;
  link?: string;
  linkHref?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-3 flex items-center justify-between px-1", className)}>
      <h2 className="font-display text-lg font-semibold text-ink">{children}</h2>
      {link && linkHref && (
        <Link href={linkHref} className="text-[13px] font-semibold text-teal">
          {link}
        </Link>
      )}
    </div>
  );
}
