import type { Metadata } from "next";
import { Lexend, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ParallaxGridController from "@/components/ParallaxGridController";
import ConditionalSplashCursor from "@/components/ConditionalSplashCursor";
import SmoothScroll from "@/components/SmoothScroll";
import {
  buildOrganizationJsonLd,
  company,
  serializeJsonLd,
} from "@/lib/company";

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

const SITE_DESCRIPTION = company.tagline;

export const metadata: Metadata = {
  // Align with live production host (apex redirects to www).
  metadataBase: new URL(company.urls.canonicalHost),
  title: {
    default: "VINPIX STUDIO",
    template: "%s — Vinpix Studio",
  },
  description: SITE_DESCRIPTION,
  applicationName: company.brandName,
  keywords: [
    "Vinpix Studio",
    "software studio",
    "indie games",
    "AI workflow automation",
    "Next.js",
    "Vietnam",
    "Ho Chi Minh City",
  ],
  authors: [{ name: "Kiet Le" }],
  icons: {
    icon: "/Vinpix.png",
    shortcut: "/Vinpix.png",
    apple: "/Vinpix.png",
  },
  openGraph: {
    type: "website",
    siteName: company.brandName,
    title: "VINPIX STUDIO",
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
    images: [
      {
        url: "/Vinpix.png",
        width: 1200,
        height: 630,
        alt: company.brandName,
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
  const organizationJsonLd = buildOrganizationJsonLd();

  return (
    <html lang="en">
      <body
        className={`${lexend.variable} ${geistMono.variable} ${dancingScript.variable} antialiased font-sans`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(organizationJsonLd),
          }}
        />
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
