import { Building2 } from "lucide-react";
import { cn } from "@/lib/cn";

// On-brand generated "photos" — fully offline, no console errors.
const THEMES = [
  "from-[#123049] via-[#1B3A5B] to-[#1F6675]",
  "from-[#1F6675] via-[#194f5c] to-[#0F2233]",
  "from-[#0F2233] via-[#1B3A5B] to-[#2b4a63]",
  "from-[#294a5f] via-[#1F6675] to-[#123049]",
  "from-[#1B3A5B] via-[#123049] to-[#0F2233]",
];

export function PropertyImage({
  theme,
  label,
  className,
  rounded = "rounded-card",
  height = "h-44",
}: {
  theme: number;
  label?: string;
  className?: string;
  rounded?: string;
  height?: string;
}) {
  const grad = THEMES[theme % THEMES.length];
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-br",
        grad,
        rounded,
        height,
        className
      )}
    >
      {/* soft light blooms */}
      <div className="absolute -start-8 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -end-6 bottom-0 h-28 w-28 rounded-full bg-gold/20 blur-2xl" />
      {/* skyline silhouette */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-1 opacity-25">
        {[10, 16, 12, 22, 14, 18, 11, 20, 13].map((h, i) => (
          <div
            key={i}
            className="w-4 rounded-t-sm bg-navy"
            style={{ height: `${h * 3}px` }}
          />
        ))}
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <Building2 size={40} className="text-white/40" strokeWidth={1.5} />
      </div>
      {label && (
        <div className="absolute bottom-2 start-3 text-xs font-semibold text-white/85">
          {label}
        </div>
      )}
    </div>
  );
}
