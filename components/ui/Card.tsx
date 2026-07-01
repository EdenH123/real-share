import { cn } from "@/lib/cn";

/** Rounded card with soft shadow. Light on light, navy card on navy. */
export function Card({
  children,
  className,
  variant = "light",
  as: Tag = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "navy" | "tint" | "outline";
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>) {
  const variants = {
    light: "bg-surface shadow-card",
    tint: "bg-tint",
    navy: "bg-navy-card text-white",
    outline: "bg-surface border border-hairline",
  };
  return (
    <Tag className={cn("rounded-card", variants[variant], className)} {...rest}>
      {children}
    </Tag>
  );
}
