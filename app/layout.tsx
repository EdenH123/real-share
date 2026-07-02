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
    // "default" keeps app content BELOW the iOS status bar (black-translucent
    // let the system clock overlay the app header when installed).
    statusBarStyle: "default",
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
      <head>
        {/* Mark that JS is available before first paint so reveal-on-scroll
            content is hidden only when it can be animated; without JS it
            renders visible by default. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <Providers>
          <AppFrame>{children}</AppFrame>
        </Providers>
      </body>
    </html>
  );
}
