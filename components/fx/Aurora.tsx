/**
 * Ambient "living" background for navy surfaces: slow-drifting light blooms
 * (teal / gold / deep blue), optional floating gold dust, and a film-grain
 * texture. Purely decorative (aria-hidden); all motion is CSS-gated behind
 * prefers-reduced-motion, so this renders as a static, tasteful glow there.
 *
 * Usage: place inside a `relative overflow-hidden` container.
 */
const DUST: { start: string; top: string; dur: string; delay: string; dx: string }[] = [
  { start: "14%", top: "68%", dur: "5.5s", delay: "0s", dx: "10px" },
  { start: "32%", top: "80%", dur: "7s", delay: "-2.2s", dx: "-8px" },
  { start: "58%", top: "74%", dur: "6.2s", delay: "-4.1s", dx: "12px" },
  { start: "76%", top: "82%", dur: "8s", delay: "-1.4s", dx: "-6px" },
  { start: "88%", top: "66%", dur: "5.8s", delay: "-3.3s", dx: "7px" },
];

export function Aurora({
  dust = false,
  intensity = 1,
}: {
  /** float a few gold dust particles */
  dust?: boolean;
  /** 0..1 opacity multiplier for the blooms */
  intensity?: number;
}) {
  return (
    <div aria-hidden className="grain pointer-events-none absolute inset-0 overflow-hidden">
      <span
        className="aurora-blob"
        style={{
          width: "55%",
          height: "70%",
          insetInlineStart: "-12%",
          top: "-25%",
          background: "#1F6675",
          opacity: 0.5 * intensity,
        }}
      />
      <span
        className="aurora-blob aurora-blob--2"
        style={{
          width: "45%",
          height: "60%",
          insetInlineEnd: "-10%",
          bottom: "-22%",
          background: "#E0A458",
          opacity: 0.32 * intensity,
        }}
      />
      <span
        className="aurora-blob aurora-blob--3"
        style={{
          width: "40%",
          height: "55%",
          insetInlineEnd: "18%",
          top: "-18%",
          background: "#2c6f92",
          opacity: 0.4 * intensity,
        }}
      />
      {dust && (
        <span className="dust absolute inset-0 block">
          {DUST.map((d, i) => (
            <i
              key={i}
              style={
                {
                  insetInlineStart: d.start,
                  top: d.top,
                  "--dur": d.dur,
                  "--delay": d.delay,
                  "--dx": d.dx,
                } as React.CSSProperties
              }
            />
          ))}
        </span>
      )}
    </div>
  );
}
