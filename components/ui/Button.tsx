import { cn } from "@/lib/cn";
import Link from "next/link";

type Variant = "primary" | "gold" | "secondary" | "ghost" | "navy";
type Size = "md" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all active:scale-[.97] disabled:opacity-50 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  // gold CTA on dark or as primary action
  gold: "bg-gold text-navy hover:brightness-105 shadow-[0_6px_18px_-6px_rgba(224,164,88,.7)]",
  primary: "bg-teal text-white hover:brightness-110",
  navy: "bg-navy text-white hover:brightness-125",
  secondary: "bg-tint text-ink hover:bg-hairline",
  ghost: "bg-transparent text-teal hover:bg-tint",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 h-9",
  md: "text-[15px] px-5 h-11",
  lg: "text-base px-6 h-14 w-full",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "gold",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "gold",
  size = "md",
  className,
  children,
  href,
  ...rest
}: CommonProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
