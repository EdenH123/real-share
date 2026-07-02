import type { Config } from "tailwindcss";

/**
 * RealShare design system (deck v3).
 * Palette, typography, and the gold-medallion motif per BUILD-BRIEF.md §3.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ink / navy
        navy: {
          DEFAULT: "#0F2233", // dark sections, headings
          card: "#1B3A5B", // card-on-navy
        },
        teal: {
          DEFAULT: "#1F6675", // secondary / structural brand
        },
        gold: {
          DEFAULT: "#E0A458", // medallions, CTAs, hero numbers on dark
          text: "#A56B2A", // amber TEXT on light (AA contrast)
        },
        // Surfaces
        surface: "#FFFFFF",
        tint: "#F1F5F7", // light card tint
        hairline: "#D8E0E5",
        // Text
        ink: "#1E2A36",
        muted: "#5A6B78",
        // Semantic
        positive: "#2E7D5B",
        negative: "#A8493D",
      },
      fontFamily: {
        // set via next/font CSS variables in app/layout.tsx
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        medallion: "9999px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(15,34,51,.08), 0 4px 16px rgba(15,34,51,.06)",
        cardHover: "0 8px 28px rgba(15,34,51,.14), 0 2px 8px rgba(15,34,51,.08)",
        nav: "0 -2px 16px rgba(15,34,51,.08)",
      },
      letterSpacing: {
        eyebrow: "0.14em",
      },
      maxWidth: {
        app: "480px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up .4s cubic-bezier(.22,.61,.36,1) both",
        "scale-in": "scale-in .3s cubic-bezier(.34,1.56,.64,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
