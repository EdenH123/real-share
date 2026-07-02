import type { MarketId } from "@/lib/seed";

/**
 * Hand-crafted layered city scenes — each market gets a recognizable skyline
 * (Budapest's parliament dome, the Acropolis, Porto's arched bridge, Haifa's
 * port cranes) over a signature sky, with glowing windows. Pure SVG: crisp at
 * any size, zero network, themeable. Rendered inside PropertyImage.
 */

type Scene = {
  sky: [string, string, string];
  glow: { cx: number; cy: number; r: number; color: string; opacity: number };
};

const SCENES: Record<MarketId, Scene> = {
  budapest: {
    sky: ["#0F2233", "#2b4160", "#9a6530"],
    glow: { cx: 300, cy: 118, r: 70, color: "#E0A458", opacity: 0.55 },
  },
  athens: {
    sky: ["#0e3540", "#1F6675", "#8fb8c9"],
    glow: { cx: 110, cy: 40, r: 46, color: "#fff6e0", opacity: 0.8 },
  },
  portugal: {
    sky: ["#2b1a2e", "#5a2f3f", "#c07a4a"],
    glow: { cx: 210, cy: 120, r: 78, color: "#e8a05c", opacity: 0.6 },
  },
  israel: {
    sky: ["#081c2b", "#143654", "#8a6a33"],
    glow: { cx: 90, cy: 46, r: 34, color: "#f2ead1", opacity: 0.85 },
  },
};

const NAVY = "#0F2233";
const FAR = "#16324a";
const WIN = "#E0A458";

/** Deterministic pseudo-random from an index (no Math.random). */
function jitter(seed: number, i: number, mod: number) {
  return ((seed * 37 + i * 101) % mod) - mod / 2;
}

function Windows({
  xs,
  y,
  rows = 2,
  seed = 0,
}: {
  xs: number[];
  y: number;
  rows?: number;
  seed?: number;
}) {
  return (
    <>
      {xs.map((x, i) =>
        Array.from({ length: rows }).map((_, r) => (
          <rect
            key={`${i}-${r}`}
            x={x + jitter(seed, i + r, 3)}
            y={y + r * 9}
            width="3.4"
            height="4.6"
            rx="0.8"
            fill={WIN}
            opacity={(seed + i + r) % 3 === 0 ? 0.35 : 0.85}
          />
        ))
      )}
    </>
  );
}

function Budapest({ seed }: { seed: number }) {
  return (
    <g>
      {/* far bank rooftops */}
      <g fill={FAR} opacity={0.55}>
        <rect x="0" y="118" width="60" height="60" />
        <rect x="64" y="108" width="34" height="70" />
        <polygon points="64,108 81,96 98,108" />
        <rect x="318" y="112" width="40" height="70" />
        <rect x="362" y="120" width="50" height="62" />
      </g>
      {/* parliament: central dome + spire + wings */}
      <g fill={NAVY}>
        <rect x="120" y="132" width="172" height="46" />
        {/* dome */}
        <circle cx="206" cy="126" r="22" />
        <rect x="184" y="126" width="44" height="18" />
        <rect x="203.5" y="92" width="5" height="18" rx="2" />
        <circle cx="206" cy="90" r="2.6" />
        {/* flanking towers */}
        <rect x="136" y="112" width="12" height="66" />
        <polygon points="132,114 142,96 152,114" />
        <rect x="264" y="112" width="12" height="66" />
        <polygon points="260,114 270,96 280,114" />
        {/* arched colonnade hints */}
        <rect x="156" y="140" width="96" height="38" />
      </g>
      {/* windows + arches */}
      <Windows xs={[162, 176, 190, 222, 236, 250]} y={148} rows={2} seed={seed} />
      {/* Danube reflection */}
      <rect x="0" y="178" width="412" height="20" fill={NAVY} opacity="0.9" />
      <g opacity="0.25">
        <rect x="150" y="180" width="3" height="14" fill={WIN} />
        <rect x="205" y="181" width="3" height="12" fill={WIN} />
        <rect x="252" y="180" width="3" height="13" fill={WIN} />
      </g>
    </g>
  );
}

function Athens({ seed }: { seed: number }) {
  return (
    <g>
      {/* city blocks below */}
      <g fill={FAR} opacity={0.5}>
        <rect x="0" y="132" width="52" height="66" />
        <rect x="58" y="140" width="44" height="60" />
        <rect x="322" y="136" width="42" height="62" />
        <rect x="370" y="128" width="42" height="70" />
      </g>
      {/* acropolis hill */}
      <path d="M96 178 Q150 118 216 122 Q294 126 316 178 Z" fill={NAVY} />
      {/* parthenon columns on plateau */}
      <g fill={NAVY}>
        <rect x="164" y="98" width="86" height="6" rx="2" />
        <polygon points="163,98 207,86 251,98" />
        {[170, 182, 194, 206, 218, 230, 240].map((x) => (
          <rect key={x} x={x} y={104} width="5" height="20" />
        ))}
        <rect x="164" y="122" width="86" height="5" rx="2" />
      </g>
      {/* town windows */}
      <Windows xs={[8, 22, 36, 66, 84, 330, 348, 378, 396]} y={146} rows={2} seed={seed} />
      <rect x="0" y="182" width="412" height="16" fill={NAVY} opacity="0.9" />
    </g>
  );
}

function Portugal({ seed }: { seed: number }) {
  return (
    <g>
      {/* stacked ribeira houses */}
      <g fill={NAVY}>
        <rect x="0" y="110" width="30" height="70" />
        <rect x="32" y="122" width="26" height="58" />
        <rect x="60" y="104" width="30" height="76" />
        <rect x="92" y="118" width="24" height="62" />
        <rect x="330" y="116" width="28" height="64" />
        <rect x="360" y="104" width="26" height="76" />
        <rect x="388" y="120" width="24" height="60" />
      </g>
      <Windows xs={[6, 18, 40, 66, 80, 98, 336, 350, 366, 394]} y={126} rows={3} seed={seed} />
      {/* Dom Luís arch bridge */}
      <g fill="none" stroke={NAVY} strokeWidth="7">
        <path d="M118 128 Q224 34 330 128" />
      </g>
      <rect x="104" y="120" width="240" height="8" fill={NAVY} />
      <g fill={NAVY}>
        {[140, 176, 212, 248, 284].map((x) => (
          <rect key={x} x={x} y={128} width="5" height="46" />
        ))}
      </g>
      {/* Douro water */}
      <rect x="0" y="172" width="412" height="26" fill={NAVY} opacity="0.92" />
      <g opacity="0.22">
        <rect x="150" y="176" width="3" height="16" fill={WIN} />
        <rect x="226" y="178" width="3" height="14" fill={WIN} />
        <rect x="300" y="176" width="3" height="15" fill={WIN} />
      </g>
    </g>
  );
}

function Israel({ seed }: { seed: number }) {
  return (
    <g>
      {/* Carmel slope with houses */}
      <path d="M0 84 L120 108 L412 96 L412 0 L0 0 Z" fill="none" />
      <path d="M0 96 Q90 78 180 104 L180 198 L0 198 Z" fill={FAR} opacity="0.55" />
      <g fill={NAVY}>
        <rect x="16" y="96" width="26" height="84" />
        <rect x="48" y="108" width="22" height="72" />
        <rect x="76" y="88" width="28" height="92" />
        <rect x="110" y="112" width="22" height="68" />
      </g>
      <Windows xs={[22, 34, 54, 82, 96, 116]} y={104} rows={3} seed={seed} />
      {/* port cranes */}
      <g stroke={NAVY} strokeWidth="6" fill="none">
        <path d="M250 178 L250 108 L318 96" />
        <path d="M318 178 L318 96" />
        <path d="M330 178 L330 118 L392 108" />
        <path d="M392 178 L392 108" />
      </g>
      <g stroke={NAVY} strokeWidth="2.4" opacity="0.8">
        <line x1="284" y1="102" x2="284" y2="130" />
        <line x1="362" y1="113" x2="362" y2="138" />
      </g>
      {/* containers */}
      <g>
        <rect x="238" y="164" width="26" height="14" fill={NAVY} />
        <rect x="268" y="164" width="26" height="14" fill="#1F6675" />
        <rect x="298" y="164" width="26" height="14" fill="#A8493D" opacity="0.85" />
        <rect x="352" y="164" width="26" height="14" fill={NAVY} />
      </g>
      {/* bay */}
      <rect x="0" y="178" width="412" height="20" fill={NAVY} opacity="0.92" />
      <g opacity="0.22">
        <rect x="260" y="181" width="3" height="12" fill={WIN} />
        <rect x="340" y="182" width="3" height="11" fill={WIN} />
      </g>
    </g>
  );
}

const CITY: Record<MarketId, (p: { seed: number }) => JSX.Element> = {
  budapest: Budapest,
  athens: Athens,
  portugal: Portugal,
  israel: Israel,
};

export function CitySkyline({
  market,
  seed = 0,
  className,
}: {
  market: MarketId;
  seed?: number;
  className?: string;
}) {
  const scene = SCENES[market];
  const City = CITY[market];
  const gid = `sky-${market}`;
  return (
    <svg
      viewBox="0 0 412 198"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={scene.sky[0]} />
          <stop offset="0.55" stopColor={scene.sky[1]} />
          <stop offset="1" stopColor={scene.sky[2]} />
        </linearGradient>
        <radialGradient id={`${gid}-glow`}>
          <stop offset="0" stopColor={scene.glow.color} stopOpacity={scene.glow.opacity} />
          <stop offset="1" stopColor={scene.glow.color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="412" height="198" fill={`url(#${gid})`} />
      <circle
        cx={scene.glow.cx + jitter(seed, 1, 24)}
        cy={scene.glow.cy}
        r={scene.glow.r}
        fill={`url(#${gid}-glow)`}
      />
      {/* faint stars for night scenes */}
      {(market === "budapest" || market === "israel") && (
        <g fill="#fff" opacity="0.5">
          {[30, 90, 150, 250, 330, 390].map((x, i) => (
            <circle key={x} cx={x + jitter(seed, i, 20)} cy={18 + ((i * 13) % 34)} r="0.9" />
          ))}
        </g>
      )}
      <City seed={seed} />
    </svg>
  );
}
