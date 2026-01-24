"use client";

import React from "react";
import Image from "next/image";
import Dither from "@/components/Dither";
import Link from "next/link";
import PositionChart from "@/components/pitch/PositionChart";
import { Reveal } from "@/components/ui/Reveal";
import SidebarSection from "@/components/ui/SidebarSection";
import ExpandableSection from "@/components/ui/ExpandableSection";
import { ShoppingCart, Gem, Megaphone, Download } from "lucide-react";
import MapShowcase from "@/components/pitch/MapShowcase";

function ExportPDFButton() {
  const handleExport = () => {
    window.print();
  };

  return (
    <button
      onClick={handleExport}
      className="print:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-black text-white px-4 py-3 font-bold uppercase text-sm tracking-wider hover:bg-blue-600 transition-colors shadow-lg border-2 border-black"
    >
      <Download className="w-4 h-4" />
      Export PDF
    </button>
  );
}

export default function PitchPage() {
  return (
    <main className="min-h-screen bg-[#F0F0F0] text-black selection:bg-black selection:text-white font-sans print:bg-white">
      <ExportPDFButton />

      {/* 1. THE HOOK (HERO) */}
      <section className="relative h-screen w-full flex flex-col justify-end pb-12 sm:pb-24 px-6 sm:px-12 border-b-2 border-black overflow-hidden print:h-auto print:min-h-0 print:py-12">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none grayscale contrast-125 print:hidden">
          <Dither
            waveColor={[0, 0, 0]}
            disableAnimation={false}
            enableMouseInteraction={true}
            mouseRadius={0.3}
            colorNum={2}
            pixelSize={4}
            waveAmplitude={0.1}
            waveFrequency={2}
            waveSpeed={0.01}
          />
        </div>

        <div className="relative z-10 w-full max-w-[1920px] mx-auto">
          <div className="flex flex-col">
            <Reveal>
              <h1 className="text-[10vw] leading-[0.85] font-black tracking-tighter uppercase mix-blend-multiply">
                Kitchen
                <br />
                Together
              </h1>
            </Reveal>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-8 border-t-2 border-black pt-6 max-w-5xl">
              <Reveal delay={0.4}>
                <p className="text-xl sm:text-3xl font-bold max-w-2xl leading-tight uppercase tracking-tight">
                  &quot;Overcooked meets Ownership.&quot;
                  <span className="opacity-50 block mt-2 text-lg sm:text-xl normal-case font-medium">
                    The chaotic co-op game where players actually own the mess
                    they make.
                  </span>
                </p>
              </Reveal>
              <Reveal delay={0.6}>
                <div className="flex flex-col items-start sm:items-end">
                  <span className="inline-block bg-black text-white px-3 py-1 text-sm font-bold uppercase tracking-widest mb-1">
                    Vinpix Studio
                  </span>
                  <p className="text-sm font-mono opacity-60 uppercase tracking-widest">
                    Pitch Deck • 2025
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM */}
      <section className="border-b-2 border-black bg-[#F0F0F0]">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r-2 border-black md:sticky md:top-0 h-full">
            <SidebarSection className="h-full p-6 sm:p-12">
              <div className="sticky top-24">
                <Reveal>
                  <span className="text-sm font-bold tracking-widest uppercase mb-2 block opacity-50">
                    Why Now?
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-2xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight break-words hyphens-auto">
                    The Problem
                  </h2>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          <div className="md:col-span-8 p-6 sm:p-12">
            <Reveal>
              <h3 className="text-3xl sm:text-5xl font-black uppercase mb-12 leading-tight">
                Broken Incentives
              </h3>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Reveal delay={0.2}>
                <div className="border-2 border-black p-8 bg-white h-full">
                  <h4 className="text-2xl font-bold uppercase mb-4 text-red-600">
                    Web2 Games
                  </h4>
                  <p className="text-lg font-bold mb-2">
                    &quot;The Extraction Model&quot;
                  </p>
                  <ul className="list-disc list-inside space-y-2 opacity-80 font-mono text-sm">
                    <li>
                      Zero Ownership: Players spend billions, own nothing.
                    </li>
                    <li>Siloed Economy: Value is trapped in-game.</li>
                    <li>Unfair: Creators/Modders generate content for free.</li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="border-2 border-black p-8 bg-white h-full">
                  <h4 className="text-2xl font-bold uppercase mb-4 text-blue-600">
                    Web3 Games
                  </h4>
                  <p className="text-lg font-bold mb-2">
                    &quot;The Friction Model&quot;
                  </p>
                  <ul className="list-disc list-inside space-y-2 opacity-80 font-mono text-sm">
                    <li>
                      Boring Gameplay: &quot;Click-to-earn&quot; is not fun.
                    </li>
                    <li>High Barriers: Wallets, seed phrases, gas fees.</li>
                    <li>Ponzi-nomics: Unsustainable token models.</li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE SOLUTION */}
      <section className="border-b-2 border-black bg-white">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r-2 border-black md:sticky md:top-0 h-full">
            <SidebarSection className="h-full p-6 sm:p-12">
              <div className="sticky top-24">
                <Reveal>
                  <span className="text-sm font-bold tracking-widest uppercase mb-2 block opacity-50">
                    The Fix
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-2xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight break-words hyphens-auto">
                    Solution
                  </h2>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          <div className="md:col-span-8 p-6 sm:p-12">
            <Reveal>
              <h3 className="text-3xl sm:text-5xl font-black uppercase mb-12 leading-tight">
                Fun First. <br />
                <span className="text-blue-600">Invisible Web3.</span>
              </h3>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Reveal delay={0.2}>
                <div className="p-6 border-l-4 border-black">
                  <h4 className="text-2xl font-bold uppercase mb-2">
                    1. Gameplay First
                  </h4>
                  <p className="opacity-70 leading-relaxed">
                    A chaotic, shouting-at-your-friends co-op experience. High
                    retention because it&apos;s genuinely fun, not because of
                    APR.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="p-6 border-l-4 border-blue-600">
                  <h4 className="text-2xl font-bold uppercase mb-2 text-blue-600">
                    2. Map Tokenization
                  </h4>
                  <p className="opacity-70 leading-relaxed">
                    Turn your chaos into cash. Every user-created map can become
                    an NFT with built-in royalties. Content is the new currency.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.6}>
              <ExpandableSection
                title="Web3 Onboarding Strategy"
                className="mt-8"
              >
                <div className="space-y-6">
                  <div>
                    <h5 className="text-lg font-bold uppercase mb-3">
                      Phase 1: Invisible Onboarding
                    </h5>
                    <ul className="space-y-2 font-mono text-sm opacity-80">
                      <li>
                        • Account Abstraction: Auto-create wallet on
                        Google/Apple sign-in
                      </li>
                      <li>• No seed phrases, no manual setup</li>
                      <li>
                        • After 3 games → &quot;You just earned your first
                        NFT!&quot; popup
                      </li>
                      <li>• First map NFT airdropped automatically</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-lg font-bold uppercase mb-3">
                      Phase 2: Value Demonstration
                    </h5>
                    <ul className="space-y-2 font-mono text-sm opacity-80">
                      <li>• Show real value: Map plays → estimated worth</li>
                      <li>• Guided first sale experience</li>
                      <li>• Community building: Discord, creator spotlights</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-lg font-bold uppercase mb-3">
                      Phase 3: Full Engagement
                    </h5>
                    <ul className="space-y-2 font-mono text-sm opacity-80">
                      <li>• Staking unlocked after 10 maps created</li>
                      <li>• Governance voting after 1 month active</li>
                      <li>
                        • Referral program: invite friend → both get tokens
                      </li>
                    </ul>
                  </div>
                </div>
              </ExpandableSection>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. TRACTION */}
      <section className="border-b-2 border-black bg-white">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r-2 border-black md:sticky md:top-0 h-full">
            <SidebarSection className="h-full p-6 sm:p-12">
              <div className="sticky top-24">
                <Reveal>
                  <span className="text-sm font-bold tracking-widest uppercase mb-2 block opacity-50">
                    Validation
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-2xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight break-words hyphens-auto">
                    Traction
                  </h2>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          <div className="md:col-span-8 p-6 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Reveal delay={0.1} className="h-full">
                <div className="border-2 border-black p-6 bg-[#F0F0F0] h-full flex flex-col justify-between min-h-[180px]">
                  <div>
                    <p className="text-sm font-bold uppercase opacity-60 mb-2">
                      Downloads
                    </p>
                    <p className="text-4xl lg:text-5xl font-black tracking-tighter">
                      100K
                    </p>
                  </div>
                  <p className="text-xs font-mono mt-4 opacity-70 whitespace-nowrap">
                    Organic Growth via UGC
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.2} className="h-full">
                <div className="border-2 border-black p-6 bg-[#F0F0F0] h-full flex flex-col justify-between min-h-[180px]">
                  <div>
                    <p className="text-sm font-bold uppercase opacity-60 mb-2">
                      D1 Retention
                    </p>
                    <p className="text-4xl lg:text-5xl font-black tracking-tighter whitespace-nowrap">
                      &gt; 30%
                    </p>
                  </div>
                  <p className="text-xs font-mono mt-4 opacity-70 whitespace-nowrap">
                    Top 25% Benchmark
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.3} className="h-full">
                <div className="border-2 border-black bg-black text-white p-6 h-full flex flex-col justify-between min-h-[180px]">
                  <div>
                    <p className="text-sm font-bold uppercase opacity-80 text-white mb-2">
                      D7 Retention
                    </p>
                    <p className="text-4xl lg:text-5xl font-black text-white tracking-tighter whitespace-nowrap">
                      7%
                    </p>
                  </div>
                  <p className="text-xs font-mono text-white/80 mt-4 whitespace-nowrap">
                    Strong Engagement Metric
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.4} className="h-full">
                <div className="border-2 border-black p-6 bg-[#F0F0F0] h-full flex flex-col justify-between min-h-[180px]">
                  <div>
                    <p className="text-sm font-bold uppercase opacity-60 mb-2">
                      Crash Rate
                    </p>
                    <p className="text-4xl lg:text-5xl font-black tracking-tighter whitespace-nowrap">
                      &lt; 1%
                    </p>
                  </div>
                  <p className="text-xs font-mono mt-4 opacity-70 whitespace-nowrap">
                    Google Vitals Compliant
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.5}>
              <div className="border-2 border-black p-4 bg-white">
                <p className="text-sm font-bold uppercase tracking-widest mb-4">
                  Performance Metrics
                </p>
                <div className="w-full">
                  <Image
                    src="/tracktion_current.png"
                    alt="Traction Metrics"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5.5. WHY LISK */}
      <section className="border-b-2 border-black bg-[#F0F0F0]">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r-2 border-black md:sticky md:top-0 h-full">
            <SidebarSection className="h-full p-6 sm:p-12">
              <div className="sticky top-24">
                <Reveal>
                  <span className="text-sm font-bold tracking-widest uppercase mb-2 block opacity-50">
                    Strategic Choice
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-2xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight break-words hyphens-auto">
                    Why Lisk?
                  </h2>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          <div className="md:col-span-8 p-6 sm:p-12">
            <Reveal>
              <h3 className="text-3xl sm:text-5xl font-black uppercase mb-12 leading-tight">
                The Perfect Fit
              </h3>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Reveal delay={0.2}>
                <div className="border-2 border-black p-6 bg-white h-full">
                  <h4 className="text-xl font-bold uppercase mb-4 text-blue-600">
                    Technical Advantages
                  </h4>
                  <ul className="space-y-3 font-mono text-sm opacity-80">
                    <li>
                      • Low gas fees: Perfect for casual gaming
                      micro-transactions
                    </li>
                    <li>• Fast finality: Real-time gameplay without delays</li>
                    <li>
                      • EVM compatibility: Easy integration with existing
                      tooling
                    </li>
                    <li>
                      • Scalability: Handle millions of transactions from 100K+
                      users
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="border-2 border-black p-6 bg-white h-full">
                  <h4 className="text-xl font-bold uppercase mb-4 text-blue-600">
                    Ecosystem Fit
                  </h4>
                  <ul className="space-y-3 font-mono text-sm opacity-80">
                    <li>
                      • Lisk building gaming ecosystem → We can be flagship game
                    </li>
                    <li>• Active community support for adoption</li>
                    <li>• Clear grant program aligned with our vision</li>
                    <li>
                      • Developer-first approach matches &quot;invisible
                      Web3&quot;
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4}>
              <div className="border-2 border-black p-6 bg-white">
                <h4 className="text-xl font-bold uppercase mb-4">
                  Competitive Advantage
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-sm">
                  <div>
                    <p className="font-bold mb-2">Not Ethereum</p>
                    <p className="opacity-70">
                      Gas fees too high for casual gaming
                    </p>
                  </div>
                  <div>
                    <p className="font-bold mb-2">Not Polygon</p>
                    <p className="opacity-70">Too crowded, hard to stand out</p>
                  </div>
                  <div>
                    <p className="font-bold mb-2 text-blue-600">Lisk L2</p>
                    <p className="opacity-70">
                      Sweet spot: Mature but not saturated
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. MARKET SIZE */}
      <section className="border-b-2 border-black bg-[#F0F0F0]">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r-2 border-black md:sticky md:top-0 h-full">
            <SidebarSection className="h-full p-6 sm:p-12">
              <div className="sticky top-24">
                <Reveal>
                  <span className="text-sm font-bold tracking-widest uppercase mb-2 block opacity-50">
                    Opportunity
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-2xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight break-words hyphens-auto">
                    Market
                  </h2>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          <div className="md:col-span-8 p-6 sm:p-12">
            <Reveal>
              <h3 className="text-3xl sm:text-5xl font-black uppercase mb-8 leading-tight">
                Market Opportunity
              </h3>
              <p className="text-lg opacity-70 mb-12 max-w-3xl">
                Validated market size with credible sources. Our target market
                represents a significant opportunity in the rapidly growing Web3
                gaming space.
              </p>
            </Reveal>

            <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 mb-12">
              <Reveal delay={0.1}>
                <div className="w-[300px] sm:w-[350px] h-[300px] sm:h-[350px] rounded-full border-4 border-black bg-white flex flex-col items-center justify-center text-center p-8 relative z-10 shadow-lg">
                  <span className="text-lg font-bold uppercase opacity-50">
                    TAM
                  </span>
                  <span className="text-5xl font-black my-2">$146B</span>
                  <span className="font-mono text-sm font-bold">
                    Mobile Gaming Market
                  </span>
                  <span className="text-xs opacity-60 mt-1">2024 (Global)</span>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] rounded-full border-4 border-blue-600 bg-blue-50 flex flex-col items-center justify-center text-center p-6 -mt-12 lg:mt-0 lg:-ml-12 relative z-20 shadow-lg">
                  <span className="text-lg font-bold uppercase opacity-50 text-blue-600">
                    SAM
                  </span>
                  <span className="text-4xl font-black my-2 text-blue-600">
                    10M Users
                  </span>
                  <span className="font-mono text-sm text-blue-800 font-bold">
                    Target Players
                  </span>
                  <span className="text-xs opacity-60 mt-1 text-blue-800">
                    Global Market
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="w-[200px] sm:w-[250px] h-[200px] sm:h-[250px] rounded-full border-4 border-green-600 bg-green-50 flex flex-col items-center justify-center text-center p-6 -mt-12 lg:mt-0 lg:-ml-12 relative z-30 shadow-lg">
                  <span className="text-lg font-bold uppercase opacity-50 text-green-600">
                    SOM
                  </span>
                  <span className="text-3xl font-black my-2 text-green-600">
                    $50M
                  </span>
                  <span className="font-mono text-sm text-green-800 font-bold">
                    Year 1-3 Target
                  </span>
                  <span className="text-xs opacity-60 mt-1 text-green-800">
                    Target Achievement
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="border-2 border-black bg-white p-6">
                  <h4 className="text-lg font-bold uppercase mb-4">
                    Data Sources
                  </h4>
                  <div className="space-y-4 font-mono text-sm">
                    <div className="border-l-4 border-black pl-4">
                      <p className="font-bold text-xs mb-1">TAM: $146B</p>
                      <a
                        href="https://www.thebusinessresearchcompany.com/report/mobile-gaming-global-market-report"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs block truncate"
                      >
                        The Business Research Company (2025)
                      </a>
                    </div>
                    <div className="border-l-4 border-blue-600 pl-4">
                      <p className="font-bold text-xs mb-1 text-blue-600">
                        SAM: 10M Users
                      </p>
                      <p className="opacity-70 text-xs">
                        Targeting 10 million active players globally
                      </p>
                    </div>
                    <div className="border-l-4 border-green-600 pl-4">
                      <p className="font-bold text-xs mb-1 text-green-600">
                        SOM: $50M
                      </p>
                      <p className="opacity-70 text-xs">
                        Based on 10M users × $5 ARPU
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-black bg-[#F0F0F0] p-6">
                  <h4 className="text-lg font-bold uppercase mb-4">
                    Growth Drivers
                  </h4>
                  <ul className="space-y-3 font-mono text-sm">
                    <li className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <div>
                        <span className="font-bold">
                          Web3 Gaming CAGR: 22.1%
                        </span>
                        <p className="text-xs opacity-60">
                          Projected $125B by 2032
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <div>
                        <span className="font-bold">Mobile First</span>
                        <p className="text-xs opacity-60">
                          Steady growth to $165B (2025)
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <div>
                        <span className="font-bold">L2 Adoption</span>
                        <p className="text-xs opacity-60">
                          Low fees enabling mass adoption
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7. COMPETITION */}
      <section className="border-b-2 border-black bg-white">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r-2 border-black md:sticky md:top-0 h-full">
            <SidebarSection className="h-full p-6 sm:p-12 md:p-6 lg:p-12">
              <div className="sticky top-24">
                <Reveal>
                  <span className="text-sm font-bold tracking-widest uppercase mb-2 block opacity-50">
                    Landscape
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-2xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight break-words hyphens-auto">
                    Competition
                  </h2>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          <div className="md:col-span-8 p-6 sm:p-12">
            <Reveal width="100%">
              <div className="mb-12">
                <PositionChart />
                <p className="mt-4 text-xs font-mono opacity-50 text-center uppercase tracking-widest">
                  Market Positioning Matrix
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="space-y-4">
                  <h4 className="text-xl font-bold uppercase border-b-2 border-black pb-2">
                    vs. Web2 (Overcooked)
                  </h4>
                  <p className="opacity-80 text-sm leading-relaxed">
                    Overcooked perfected the chaotic co-op genre but lacks
                    long-term retention mechanics. Players burn out after
                    completing the campaign. <br />
                    <span className="font-bold text-black block mt-2">
                      Our Edge:
                    </span>{" "}
                    User-Generated Content (infinite replayability) + Ownership.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-bold uppercase border-b-2 border-black pb-2">
                    vs. Gen 1 Web3 (Axie/Pixels)
                  </h4>
                  <p className="opacity-80 text-sm leading-relaxed">
                    First-gen Web3 games focused on financialization (&quot;Play
                    to Earn&quot;), resulting in grindy, solitary experiences
                    that feel like work. <br />
                    <span className="font-bold text-black block mt-2">
                      Our Edge:
                    </span>{" "}
                    Genuine &quot;Fun-First&quot; Multiplayer gameplay on
                    Mobile. No upfront investment required.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-black font-mono text-sm sm:text-base">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="p-4 text-left uppercase">Feature</th>
                      <th className="p-4 text-center border-l-2 border-white/20">
                        Kitchen Together
                      </th>
                      <th className="p-4 text-center border-l-2 border-white/20 opacity-70">
                        Overcooked
                      </th>
                      <th className="p-4 text-center border-l-2 border-white/20 opacity-70">
                        Axie / Illuvium
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-black">
                      <td className="p-4 font-bold">Core Loop</td>
                      <td className="p-4 text-center bg-green-50 text-green-700 font-bold border-l-2 border-black">
                        Social Co-op
                      </td>
                      <td className="p-4 text-center border-l-2 border-black opacity-60">
                        Social Co-op
                      </td>
                      <td className="p-4 text-center border-l-2 border-black opacity-60">
                        Solo Grind / PvP
                      </td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-4 font-bold">Platform</td>
                      <td className="p-4 text-center bg-green-50 text-green-700 font-bold border-l-2 border-black">
                        Mobile First
                      </td>
                      <td className="p-4 text-center border-l-2 border-black opacity-60">
                        PC / Console
                      </td>
                      <td className="p-4 text-center border-l-2 border-black opacity-60">
                        PC / Browser
                      </td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-4 font-bold">Content Source</td>
                      <td className="p-4 text-center bg-green-50 text-green-700 font-bold border-l-2 border-black">
                        100% UGC
                      </td>
                      <td className="p-4 text-center border-l-2 border-black opacity-60">
                        Developer Only
                      </td>
                      <td className="p-4 text-center border-l-2 border-black opacity-60">
                        Developer Only
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">Ownership</td>
                      <td className="p-4 text-center bg-green-50 text-green-700 font-bold border-l-2 border-black">
                        Yes (Invisible)
                      </td>
                      <td className="p-4 text-center border-l-2 border-black opacity-60">
                        None
                      </td>
                      <td className="p-4 text-center border-l-2 border-black opacity-60">
                        Yes (Heavy)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 8. BUSINESS MODEL */}
      <section className="border-b-2 border-black bg-[#F0F0F0]">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r-2 border-black md:sticky md:top-0 h-full">
            <SidebarSection className="h-full p-6 sm:p-12">
              <div className="sticky top-24">
                <Reveal>
                  <span className="text-sm font-bold tracking-widest uppercase mb-2 block opacity-50">
                    Monetization
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-2xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight break-words hyphens-auto">
                    Business Model
                  </h2>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          <div className="md:col-span-8 p-6 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Reveal delay={0.1}>
                <div className="border-2 border-black p-6 bg-white h-full flex flex-col">
                  <div className="mb-4">
                    <ShoppingCart className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold uppercase mb-2">
                    Marketplace Fees
                  </h4>
                  <p className="opacity-70 text-sm grow">
                    5-10% transaction fee on every map trade, skin sale, and
                    item exchange.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="border-2 border-black p-6 bg-white h-full flex flex-col">
                  <div className="mb-4">
                    <Gem className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold uppercase mb-2">
                    In-Game Items
                  </h4>
                  <p className="opacity-70 text-sm grow">
                    Traditional IAP for cosmetics, speed-ups, and creator tools.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="border-2 border-black p-6 bg-white h-full flex flex-col">
                  <div className="mb-4">
                    <Megaphone className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold uppercase mb-2">
                    Brand Collabs
                  </h4>
                  <p className="opacity-70 text-sm grow">
                    Sponsored maps and kitchen sets from real-world F&B brands.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4}>
              <ExpandableSection title="Marketplace Liquidity Strategy">
                <div className="space-y-6">
                  <div>
                    <h5 className="text-lg font-bold uppercase mb-3">
                      Early Liquidity Incentives
                    </h5>
                    <ul className="space-y-2 font-mono text-sm opacity-80">
                      <li>
                        • First 100 maps minted → 100% royalty (instead of 10%)
                      </li>
                      <li>• Top 10 creators monthly → bonus token rewards</li>
                      <li>
                        • Featured maps → increased visibility + promotion
                      </li>
                      <li>
                        • Early adopters → discounted prices (first month)
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-lg font-bold uppercase mb-3">
                      Liquidity Pool Setup
                    </h5>
                    <ul className="space-y-2 font-mono text-sm opacity-80">
                      <li>• $50K from grant → provide liquidity for token</li>
                      <li>• $30K → seed marketplace with premium maps</li>
                      <li>
                        • 5% of all marketplace fees → go to liquidity pool
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-lg font-bold uppercase mb-3">
                      Volume Generation
                    </h5>
                    <ul className="space-y-2 font-mono text-sm opacity-80">
                      <li>
                        • Daily challenges: &quot;Play featured map&quot; → earn
                        tokens
                      </li>
                      <li>• Seasonal events: Map creation contests → prizes</li>
                      <li>
                        • Partnerships: Cross-game NFTs, brand collaborations
                      </li>
                    </ul>
                  </div>
                </div>
              </ExpandableSection>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 8.5. TOKENOMICS */}
      <section className="border-b-2 border-black bg-white">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r-2 border-black md:sticky md:top-0 h-full">
            <SidebarSection className="h-full p-6 sm:p-12">
              <div className="sticky top-24">
                <Reveal>
                  <span className="text-sm font-bold tracking-widest uppercase mb-2 block opacity-50">
                    Economics
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-2xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight break-words hyphens-auto">
                    Tokenomics
                  </h2>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          <div className="md:col-span-8 p-6 sm:p-12">
            <Reveal>
              <h3 className="text-3xl sm:text-5xl font-black uppercase mb-12 leading-tight">
                Lisk Token Integration
              </h3>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Reveal delay={0.1}>
                <div className="border-2 border-black p-6 bg-[#F0F0F0]">
                  <h4 className="text-xl font-bold uppercase mb-4">
                    Why Lisk Token?
                  </h4>
                  <p className="font-mono text-sm opacity-80 mb-4">
                    Instead of creating a separate token, we leverage the native
                    Lisk token for all in-game transactions. This approach
                    provides:
                  </p>
                  <ul className="space-y-3 font-mono text-sm opacity-80">
                    <li>• No token launch complexity or regulatory concerns</li>
                    <li>
                      • Immediate liquidity through existing Lisk ecosystem
                    </li>
                    <li>
                      • Stronger alignment with Lisk&apos;s long-term vision
                    </li>
                    <li>
                      • Reduced friction for users already holding Lisk tokens
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="border-2 border-black p-6 bg-[#F0F0F0]">
                  <h4 className="text-xl font-bold uppercase mb-4">
                    Token Utility
                  </h4>
                  <ul className="space-y-3 font-mono text-sm opacity-80">
                    <li>
                      • In-game currency: Buy/sell maps, purchase cosmetics
                    </li>
                    <li>• Staking rewards: Earn passive income (5-20% APY)</li>
                    <li>
                      • Governance: Vote on game features, propose new content
                    </li>
                    <li>
                      • Creator incentives: Earn tokens when maps are played
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3}>
              <ExpandableSection title="Staking Mechanism Details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-lg font-bold uppercase mb-3">
                      Staking Tiers
                    </h5>
                    <ul className="space-y-2 font-mono text-sm opacity-80">
                      <li>• Bronze (1K tokens): 5% APY</li>
                      <li>• Silver (10K tokens): 10% APY</li>
                      <li>• Gold (50K tokens): 15% APY</li>
                      <li>• Platinum (100K+ tokens): 20% APY</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-lg font-bold uppercase mb-3">
                      Lock Periods
                    </h5>
                    <ul className="space-y-2 font-mono text-sm opacity-80">
                      <li>• Flexible: Base APY</li>
                      <li>• 3 months: +2% APY bonus</li>
                      <li>• 6 months: +5% APY bonus</li>
                      <li>• 12 months: +10% APY bonus</li>
                    </ul>
                  </div>
                </div>
              </ExpandableSection>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 9. LISK INTEGRATION ROADMAP */}
      <section className="border-b-2 border-black bg-[#1a1a1a] text-white">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r-2 border-white/20 md:sticky md:top-0 h-full">
            <SidebarSection className="h-full p-6 sm:p-12">
              <div className="sticky top-24">
                <Reveal>
                  <span className="text-sm font-bold tracking-widest uppercase mb-2 block opacity-50">
                    Timeline
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-2xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight break-words hyphens-auto">
                    Lisk Integration
                  </h2>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          <div className="md:col-span-8 p-6 sm:p-12">
            <Reveal>
              <h3 className="text-3xl sm:text-5xl font-black uppercase mb-12 leading-tight">
                3-Month Roadmap
              </h3>
              <p className="text-lg opacity-70 mb-8 max-w-3xl">
                A 3-month journey from proven game to Web3 powerhouse. Core
                product development with clear milestones.
              </p>

              <div className="mt-8">
                <Link
                  href="/roadmap"
                  className="inline-block bg-black text-white px-8 py-4 text-lg font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors"
                >
                  View Full Roadmap →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 9.5. THE TEAM */}
      <section className="border-b-2 border-black bg-white">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r-2 border-black md:sticky md:top-0 h-full">
            <SidebarSection className="h-full p-6 sm:p-12">
              <div className="sticky top-24">
                <Reveal>
                  <span className="text-sm font-bold tracking-widest uppercase mb-2 block opacity-50">
                    Execution
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-2xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight break-words hyphens-auto">
                    The Team
                  </h2>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          <div className="md:col-span-8 p-6 sm:p-12">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Reveal>
                <div className="border-2 border-black p-8 bg-[#F0F0F0] h-full">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-24 h-24 rounded-full shrink-0 overflow-hidden border-2 border-black bg-white">
                      <Image
                        src="/founder_avatar.gif"
                        alt="Founder"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black uppercase mb-2">
                        Founder
                      </h3>
                      <p className="text-lg font-bold mb-2">
                        Solo Developer & Game Designer
                      </p>
                      <p className="text-sm opacity-70 mb-4 italic">
                        Full commitment to Kitchen Together post-grant period
                      </p>
                      <ul className="space-y-2 font-mono text-sm opacity-80">
                        <li className="flex items-center gap-2">
                          ✓ Shipped 3 successful mobile titles.
                        </li>
                        <li className="flex items-center gap-2">
                          ✓ 100K+ organic downloads achieved.
                        </li>
                        <li className="flex items-center gap-2">
                          ✓ Full-stack: Unity, Backend, Smart Contracts.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="hidden border-2 border-black border-dashed p-8 bg-white h-full relative group hover:bg-yellow-50 transition-colors cursor-pointer">
                  <div className="absolute top-4 right-4 rotate-12 bg-blue-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest animate-pulse">
                    We&apos;re Hiring!
                  </div>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-24 h-24 rounded-full shrink-0 border-2 border-black border-dashed flex items-center justify-center bg-[#F0F0F0] group-hover:bg-white transition-colors">
                      <span className="text-4xl font-black opacity-20">?</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black uppercase mb-2">
                        You?
                      </h3>
                      <p className="text-lg font-bold mb-4">
                        Join the Core Team
                      </p>
                      <ul className="space-y-2 font-mono text-sm opacity-80 mb-6">
                        <li className="flex items-center gap-2">
                          • Unity Developers (C#)
                        </li>
                        <li className="flex items-center gap-2">
                          • 3D Artists (Low Poly)
                        </li>
                        <li className="flex items-center gap-2">
                          • Growth / Community Manager
                        </li>
                      </ul>
                      <a
                        href="mailto:vinpix7@gmail.com"
                        className="inline-block bg-black text-white px-6 py-2 font-bold uppercase hover:bg-blue-600 transition-colors"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 9.7. RISK & MITIGATION */}
      <section className="border-b-2 border-black bg-[#F0F0F0]">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r-2 border-black md:sticky md:top-0 h-full">
            <SidebarSection className="h-full p-6 sm:p-12">
              <div className="sticky top-24">
                <Reveal>
                  <span className="text-sm font-bold tracking-widest uppercase mb-2 block opacity-50">
                    Transparency
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-2xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight break-words hyphens-auto">
                    Risk & Mitigation
                  </h2>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          <div className="md:col-span-8 p-6 sm:p-12">
            <Reveal>
              <h3 className="text-3xl sm:text-5xl font-black uppercase mb-12 leading-tight">
                We Know the Risks
              </h3>
            </Reveal>

            <div className="space-y-6">
              <Reveal delay={0.1}>
                <ExpandableSection title="Technical Risks" className="bg-white">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-bold uppercase mb-2 text-red-600">
                        Smart Contract Bugs
                      </h5>
                      <p className="font-mono text-sm opacity-80 mb-2">
                        Impact: High - Could lose funds or be exploited
                      </p>
                      <ul className="font-mono text-sm opacity-80 space-y-1 ml-4">
                        <li>• Multiple security audits (2-3 firms)</li>
                        <li>• Bug bounty program ($50K pool)</li>
                        <li>• Gradual rollout with limits</li>
                        <li>• Insurance coverage</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold uppercase mb-2 text-orange-600">
                        Lisk L2 Scalability Issues
                      </h5>
                      <p className="font-mono text-sm opacity-80 mb-2">
                        Impact: Medium - Could affect user experience
                      </p>
                      <ul className="font-mono text-sm opacity-80 space-y-1 ml-4">
                        <li>• Load testing before launch</li>
                        <li>• Fallback to L1 if needed</li>
                        <li>• Work closely with Lisk team</li>
                        <li>• Monitor metrics real-time</li>
                      </ul>
                    </div>
                  </div>
                </ExpandableSection>
              </Reveal>

              <Reveal delay={0.2}>
                <ExpandableSection title="Market Risks" className="bg-white">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-bold uppercase mb-2 text-red-600">
                        Low Web3 Adoption
                      </h5>
                      <p className="font-mono text-sm opacity-80 mb-2">
                        Impact: High - May not reach 1M Web3 users
                      </p>
                      <ul className="font-mono text-sm opacity-80 space-y-1 ml-4">
                        <li>• Hybrid model: Web2 users can still play</li>
                        <li>• Strong onboarding flow</li>
                        <li>• Incentive programs (airdrop, rewards)</li>
                        <li>• Marketing focus on benefits, not tech</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold uppercase mb-2 text-orange-600">
                        Regulatory Changes
                      </h5>
                      <p className="font-mono text-sm opacity-80 mb-2">
                        Impact: High - Could affect token model
                      </p>
                      <ul className="font-mono text-sm opacity-80 space-y-1 ml-4">
                        <li>• Legal consultation before launch</li>
                        <li>• Flexible tokenomics (can adjust)</li>
                        <li>• Compliance-first approach</li>
                        <li>• Geographic restrictions if needed</li>
                      </ul>
                    </div>
                  </div>
                </ExpandableSection>
              </Reveal>

              <Reveal delay={0.3}>
                <ExpandableSection
                  title="Operational Risks"
                  className="bg-white"
                >
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-bold uppercase mb-2 text-orange-600">
                        Team Scaling Issues
                      </h5>
                      <p className="font-mono text-sm opacity-80 mb-2">
                        Impact: Medium - May not hire right people
                      </p>
                      <ul className="font-mono text-sm opacity-80 space-y-1 ml-4">
                        <li>• Start hiring early</li>
                        <li>• Multiple recruitment channels</li>
                        <li>• Competitive compensation</li>
                        <li>• Remote-first approach</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold uppercase mb-2 text-orange-600">
                        Budget Overrun
                      </h5>
                      <p className="font-mono text-sm opacity-80 mb-2">
                        Impact: Medium - May not have enough funds
                      </p>
                      <ul className="font-mono text-sm opacity-80 space-y-1 ml-4">
                        <li>• Conservative estimates</li>
                        <li>• Monthly budget reviews</li>
                        <li>• Contingency fund (10%)</li>
                        <li>• Phased spending</li>
                      </ul>
                    </div>
                  </div>
                </ExpandableSection>
              </Reveal>

              <Reveal delay={0.4}>
                <ExpandableSection
                  title="Focus & Resource Risks"
                  className="bg-white"
                >
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-bold uppercase mb-2 text-orange-600">
                        Resource Dilution Risk
                      </h5>
                      <p className="font-mono text-sm opacity-80 mb-2">
                        Impact: Medium - Founder working on multiple projects
                      </p>
                      <ul className="font-mono text-sm opacity-80 space-y-1 ml-4">
                        <li>• Clear commitment: 100% focus post-grant</li>
                        <li>• Proven track record: 3 successful titles shipped</li>
                        <li>• Team expansion reduces single-person dependency</li>
                        <li>• Milestone-based accountability</li>
                      </ul>
                    </div>
                  </div>
                </ExpandableSection>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 10. THE ASK */}
      <section className="bg-black text-white min-h-[50vh] flex flex-col justify-center p-6 sm:p-12">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <Reveal>
              <div>
                <span className="text-blue-500 font-mono text-sm uppercase tracking-widest mb-4 block">
                  The Ask
                </span>
                <h2 className="text-6xl sm:text-9xl font-black tracking-tighter uppercase leading-none">
                  $300k
                </h2>
                <p className="text-xl mt-4 opacity-60 max-w-xl">
                  Ecosystem Grant to scale the team, integrate Lisk L2, and
                  acquire the first 10k Web3 users.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="w-full md:w-auto">
                <div className="border border-white/20 p-6 min-w-[300px]">
                  <h4 className="text-xl font-bold uppercase mb-4 border-b border-white/20 pb-2">
                    Use of Funds
                  </h4>
                  <ul className="space-y-4 font-mono text-sm mb-6">
                    <li className="flex justify-between">
                      <span>Team Expansion</span>
                      <span className="font-bold">$70K</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Blockchain Integration</span>
                      <span className="font-bold">$0</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Ecosystem & Community Growth</span>
                      <span className="font-bold">$230K</span>
                    </li>
                  </ul>

                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-bold uppercase hover:opacity-80 transition-opacity">
                      View Detailed Breakdown
                    </summary>
                    <div className="mt-4 pt-4 border-t border-white/20 space-y-4 text-xs">
                      <div>
                        <p className="font-bold mb-2">Team Expansion ($70K)</p>
                        <ul className="space-y-1 opacity-80 ml-4">
                          <li>• Salaries (6 months): $50K</li>
                          <li>• Recruitment: $10K</li>
                          <li>• Training & onboarding: $10K</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-bold mb-2">
                          Blockchain Integration ($0)
                        </p>
                        <ul className="space-y-1 opacity-80 ml-4">
                          <li>• Internal development resources</li>
                          <li>• No additional funding required</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-bold mb-2">
                          Ecosystem & Community Growth ($230K)
                        </p>
                        <ul className="space-y-1 opacity-80 ml-4">
                          <li>• Marketing & partnerships: $100K</li>
                          <li>• Community programs: $50K</li>
                          <li>• Pool allocation: $80K</li>
                        </ul>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
