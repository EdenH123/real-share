import { cn } from "@/lib/cn";

/**
 * Tinted placeholder block with a shimmer sweep (shimmer only under
 * prefers-reduced-motion: no-preference). Use `dark` on navy surfaces.
 */
export function Skeleton({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn("skeleton", dark && "skeleton-dark", className)}
      aria-hidden
    />
  );
}
