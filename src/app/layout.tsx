import type { Metadata } from "next";
import { Lexend, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ParallaxGridController from "@/components/ParallaxGridController";
import SplashCursor from "@/components/SplashCursor";
import SmoothScroll from "@/components/SmoothScroll";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VINPIX STUDIO",
  description: "Indie game studio — I make games for fun (and money).",
  icons: {
    icon: "/Vinpix.png",
    shortcut: "/Vinpix.png",
    apple: "/Vinpix.png",
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
        className={`${lexend.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <SmoothScroll>
          <ParallaxGridController />
          <SplashCursor
            ASCII_TILE_SIZE={17}
            SPLAT_FORCE={6500}
            DENSITY_DISSIPATION={3.0}
            SIM_RESOLUTION={256}
          />
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
