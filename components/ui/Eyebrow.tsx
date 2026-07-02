import { cn } from "@/lib/cn";

/** Uppercase, letter-spaced kicker in amber-on-light. */
export function Eyebrow({
  children,
  className,
  onDark = false,
}: {
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <div className={cn("eyebrow", onDark && "!text-gold", className)}>{children}</div>
  );
}
