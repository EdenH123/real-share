import { Fraunces, Assistant } from "next/font/google";

// Editorial serif display for English headers + hero numbers.
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

// Body / UI — excellent Hebrew + Latin coverage.
export const assistant = Assistant({
  subsets: ["latin", "hebrew"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});
