import type { Metadata } from "next";
import { Lexend, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ParallaxGridController from "@/components/ParallaxGridController";
import ConditionalSplashCursor from "@/components/ConditionalSplashCursor";
import SmoothScroll from "@/components/SmoothScroll";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Only used by the contract signature view; loaded here via next/font so it is
// self-hosted and non-render-blocking instead of a Google Fonts @import.
const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const SITE_DESCRIPTION =
  "Independent software studio for products, games, and AI-powered workflows.";

export const metadata: Metadata = {
  metadataBase: new URL("https://vinpixstudio.com"),
  title: {
    default: "VINPIX STUDIO",
    template: "%s — Vinpix Studio",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Vinpix Studio",
  keywords: [
    "Vinpix Studio",
    "software studio",
    "indie games",
    "AI workflow automation",
    "Next.js",
    "Vietnam",
  ],
  authors: [{ name: "Kiet Le" }],
  icons: {
    icon: "/Vinpix.png",
    shortcut: "/Vinpix.png",
    apple: "/Vinpix.png",
  },
  openGraph: {
    type: "website",
    siteName: "Vinpix Studio",
    title: "VINPIX STUDIO",
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
    images: [
      {
        url: "/Vinpix.png",
        width: 1200,
        height: 630,
        alt: "Vinpix Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VINPIX STUDIO",
    description: SITE_DESCRIPTION,
    creator: "@QucKiet",
    images: ["/Vinpix.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexend.variable} ${geistMono.variable} ${dancingScript.variable} antialiased font-sans`}
      >
        <SmoothScroll>
          <ParallaxGridController />
          <ConditionalSplashCursor
            ASCII_TILE_SIZE={17}
            SPLAT_FORCE={6500}
            DENSITY_DISSIPATION={3.0}
            SIM_RESOLUTION={128}
          />
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
