"use client";

import { useDrawn } from "./anim";

const POSITIVE = "#2E7D5B";
const NEGATIVE = "#A8493D";

/**
 * Tiny cost-basis → current-value trend. The 6-point series is synthesized
 * deterministically (smoothstep from invested to current, plus a fixed
 * seed-based ripple — never Math.random), so it renders identically every time.
 */
export function Sparkline({
  invested,
  current,
  seedKey,
  width = 56,
  height = 22,
  className,
}: {
  invested: number;
  current: number;
  seedKey: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const drawn = useDrawn();

  let seed = 0;
  for (let i = 0; i < seedKey.length; i++) seed += seedKey.charCodeAt(i);

  const N = 6;
  const span = current - invested;
  const amp = (Math.abs(span) || Math.max(1, current * 0.02)) * 0.14;
  const vals: number[] = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const ease = t * t * (3 - 2 * t); // smoothstep
    let v = invested + span * ease;
    if (i > 0 && i < N - 1) v += Math.sin((i + seed) * 1.3) * amp;
    vals.push(v);
  }
  vals[0] = invested;
  vals[N - 1] = current;

  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  const pad = 2;
  const x = (i: number) => pad + (i / (N - 1)) * (width - pad * 2);
  const y = (v: number) =>
    pad + (1 - (v - min) / range) * (height - pad * 2);

  const path = vals.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");
  const color = current >= invested ? POSITIVE : NEGATIVE;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
      className={className}
    >
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={drawn ? 0 : 100}
        className="chart-draw"
      />
      <circle cx={x(N - 1)} cy={y(vals[N - 1])} r={2.4} fill={color} />
    </svg>
  );
}
