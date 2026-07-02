import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fraunces, assistant } from "./fonts";
import { Providers } from "./providers";
import { AppFrame } from "@/components/layout/AppFrame";

export const metadata: Metadata = {
  title: "RealShare — fractional real estate (preview)",
  description:
    "RealShare lets Israeli investors own fractional, tokenized shares of rental property at home and abroad. This is a preview — figures are illustrative.",
  applicationName: "RealShare",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RealShare",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0F2233",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${fraunces.variable} ${assistant.variable}`}>
      <body>
        <Providers>
          <AppFrame>{children}</AppFrame>
        </Providers>
      </body>
    </html>
  );
}
