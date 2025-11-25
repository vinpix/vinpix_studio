"use client";

import React from "react";
import Dither from "@/components/Dither";
import { Reveal } from "@/components/ui/Reveal";
import SidebarSection from "@/components/ui/SidebarSection";
import ExpandableSection from "@/components/ui/ExpandableSection";
import Link from "next/link";
import { Download } from "lucide-react";

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

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-[#F0F0F0] text-black selection:bg-black selection:text-white font-sans">
      <ExportPDFButton />
      
      {/* HERO SECTION */}
      <section className="relative h-[60vh] w-full flex flex-col justify-end pb-12 px-6 sm:px-12 border-b-2 border-black overflow-hidden bg-white print:h-auto print:min-h-0 print:py-12">
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
          <Reveal>
            <h1 className="text-[8vw] leading-[0.85] font-black tracking-tighter uppercase mix-blend-multiply mb-4">
              Execution Plan
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl sm:text-2xl font-bold max-w-2xl leading-tight uppercase tracking-tight opacity-60">
              Detailed Implementation Timeline • Kitchen Together x Lisk
            </p>
          </Reveal>
        </div>
      </section>

      {/* METRICS SECTION */}
      <section className="border-b-2 border-black bg-[#F0F0F0]">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r-2 border-black h-full">
            <SidebarSection className="h-full p-6 sm:p-12">
              <div className="sticky top-24">
                <Reveal>
                  <span className="text-lg font-black tracking-widest uppercase mb-2 block opacity-100 underline decoration-2 decoration-black">
                    <span className="bg-black text-white px-2 py-1">KPI</span>
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight">
                    Traction
                  </h2>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          <div className="md:col-span-9 p-6 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  label: "Downloads",
                  value: "100K",
                  desc: "Organic Growth via UGC",
                },
                {
                  label: "D1 Retention",
                  value: "> 30%",
                  desc: "Top 25% Benchmark",
                },
                {
                  label: "D7 Retention",
                  value: "> 20%",
                  desc: "Strong Engagement Metric",
                  highlight: true,
                },
                {
                  label: "Crash Rate",
                  value: "< 1%",
                  desc: "Google Vitals Compliant",
                },
              ].map((item, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div
                    className={`flex flex-col gap-2 border-l-4 ${
                      item.highlight
                        ? "border-black bg-black text-white pl-6 pr-6 py-4"
                        : "border-black pl-6"
                    }`}
                  >
                    <span
                      className={`text-6xl font-black tracking-tighter whitespace-nowrap ${
                        item.highlight ? "text-white" : ""
                      }`}
                    >
                      {item.value}
                    </span>
                    <span
                      className={`text-lg font-bold uppercase ${
                        item.highlight ? "text-white" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                    <span
                      className={`font-mono text-sm ${
                        item.highlight ? "text-white/80" : "opacity-60"
                      }`}
                    >
                      {item.desc}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <div className="mt-16 border-t-2 border-black pt-8">
                <h4 className="text-xl font-bold uppercase mb-4">
                  Growth Engine
                </h4>
                <p className="max-w-3xl text-lg leading-relaxed opacity-80 mb-8">
                  Instead of burning cash on ads, we use a{" "}
                  <span className="font-bold underline">UGC viral loop</span>.
                  Every creator becomes a micro-influencer, sharing their maps
                  to earn revenue, effectively acquiring new users for free.
                </p>
                <Link
                  href="/pitch"
                  className="inline-block border-2 border-black px-6 py-3 text-sm font-bold uppercase hover:bg-black hover:text-white transition-colors"
                >
                  ← Back to Pitch Deck
                </Link>
              </div>
            </Reveal>

            {/* COMPLETED FEATURES SECTION */}
            <Reveal delay={0.5}>
              <div className="mt-16 border-2 border-black bg-white p-8">
                <h4 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
                  <span className="bg-black text-white px-3 py-1 text-lg">
                    ✓
                  </span>
                  Completed Features Checklist
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-lg font-bold uppercase mb-3 border-b-2 border-black pb-2">
                      🗺️ Map Editor{" "}
                      <span className="text-sm bg-green-500 text-white px-2 py-0.5 ml-2">
                        COMPLETED
                      </span>
                    </h5>
                    <ul className="space-y-2 font-mono text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>
                          Map Editor / Build Map feature fully implemented
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>Fixed camera rotation functionality</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>
                          Improved screenshot preview and lighting during map
                          creation
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>
                          Fixed issue where some objects couldn&apos;t be
                          deleted
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>
                          Automatic sink counter when adding plate counter
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>Edit published maps functionality</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>All maps now have review images</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>Removed &quot;stuck flag&quot; in edit mode</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-lg font-bold uppercase mb-3 border-b-2 border-black pb-2">
                      🕹️ Gameplay Improvements
                    </h5>
                    <ul className="space-y-2 font-mono text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>Added 3 new levels</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>Improved overall performance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>Player ping display feature</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>Chat box auto-moves when keyboard appears</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>Fixed sink counter progress bar display</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>
                          Fixed multiple crashes and sync issues between players
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>Fixed stove counter fire display bug</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>
                          Fixed Pizza map bug and added missing counters
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>Fixed Level 13</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ROADMAP SECTION */}
      <section className="bg-white min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r-2 border-black h-full">
            <SidebarSection className="h-full p-6 sm:p-12">
              <div className="sticky top-24">
                <Reveal>
                  <span className="text-sm font-bold tracking-widest uppercase mb-2 block opacity-50">
                    Timeline
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight">
                    Roadmap
                  </h2>
                  <p className="mt-4 text-sm opacity-60 max-w-[200px]">
                    A 3-month journey from proven game to Web3 powerhouse. Core
                    product development with clear milestones.
                  </p>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          <div className="md:col-span-9 p-6 sm:p-12">
            <div className="space-y-16">
              {/* PHASE 1 */}
              <Phase
                number="01"
                title="Foundation"
                weeks="Month 1"
                focus="Stability & Compliance"
                items={[
                  { text: "Code cleanup & Multiplayer Fixes", status: "done" },
                  { text: "Legal Structure & License G1-G4", status: "wip" },
                  { text: "Lisk SDK & Smart Contract Research", status: "wip" },
                  { text: "IAP Security Upgrade", status: "todo" },
                ]}
              />

              {/* PHASE 2 */}
              <Phase
                number="02"
                title="Invisible Bridge"
                weeks="Month 1-2"
                focus="Onboarding & Identity"
                items={[
                  { text: "Google Login Integration", status: "todo" },
                  { text: "Account Abstraction (Auto-Wallet)", status: "todo" },
                  { text: "Cloud Save & Profile Sync", status: "todo" },
                  { text: "On-chain Profile Mapping", status: "todo" },
                ]}
              />

              {/* PHASE 3 */}
              <Phase
                number="03"
                title="Creator Economy"
                weeks="Month 2"
                focus="Content & Verification"
                items={[
                  { text: "Daily Missions & Achievements", status: "todo" },
                  { text: "Map Hashing (Proof of Creation)", status: "todo" },
                  { text: "Ad Network Integration", status: "todo" },
                  { text: "Revenue Oracle Setup", status: "todo" },
                ]}
              />

              {/* PHASE 4 */}
              <Phase
                number="04"
                title="Marketplace Launch"
                weeks="Month 3"
                focus="Trading & Liquidity"
                items={[
                  { text: "Premium Content Update", status: "todo" },
                  {
                    text: "Map Trading Logic (Auction/Buyout)",
                    status: "todo",
                  },
                  { text: "Web3 Security Audit", status: "todo" },
                  { text: "Mainnet Beta Launch", status: "todo" },
                ]}
              />
            </div>

            {/* $300K GRANT ROADMAP SECTION */}
            <Reveal delay={0.6}>
              <div className="mt-24 border-t-2 border-black pt-12">
                <div className="mb-12">
                  <span className="text-sm font-bold tracking-widest uppercase mb-2 block opacity-50">
                    Separate Initiative
                  </span>
                  <h3 className="text-4xl font-black uppercase mb-4">
                    $300K Grant Roadmap
                  </h3>
                  <p className="text-lg opacity-70 max-w-3xl">
                    Blockchain integration and team expansion initiative.
                    Focused on Lisk L2 integration, scaling the development
                    team, and ecosystem growth beyond the core 3-month product
                    roadmap.
                  </p>
                </div>

                <div className="space-y-12 mt-12">
                  {/* TEAM EXPANSION PHASE */}
                  <div className="bg-white">
                    <div className="border-2 border-black p-8 mb-0">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="bg-black text-white px-3 py-1 text-lg">
                          👥
                        </span>
                        <h4 className="text-2xl font-black uppercase">
                          Team Expansion
                        </h4>
                        <span className="ml-auto text-2xl font-black">
                          $70K (23%)
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-lg font-bold uppercase mb-3">
                            Hiring & Scaling
                          </h5>
                          <ul className="space-y-2 font-mono text-sm">
                            <li>• Senior blockchain developers (2x)</li>
                            <li>• DevOps engineer</li>
                            <li>• Community manager</li>
                            <li>• Marketing specialist</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-lg font-bold uppercase mb-3">
                            Budget Overview
                          </h5>
                          <ul className="space-y-2 font-mono text-sm opacity-70">
                            <li>• Salaries (6 months): $50K</li>
                            <li>• Recruitment: $10K</li>
                            <li>• Training & onboarding: $10K</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <ExpandableSection title="View Detailed Hiring Timeline & Breakdown">
                      <div className="space-y-8">
                        <div>
                          <h5 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                            Hiring Timeline
                          </h5>
                          <div className="space-y-6">
                            <div className="border-l-4 border-black pl-4">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="bg-black text-white px-2 py-1 text-xs font-bold uppercase">
                                  Month 1
                                </span>
                                <span className="font-bold">
                                  Senior Blockchain Developers (2x) — $20K
                                </span>
                              </div>
                              <ul className="space-y-1 font-mono text-sm ml-4 opacity-80">
                                <li>• Week 1-2: Job postings & sourcing</li>
                                <li>
                                  • Week 3-4: Interviews & technical assessments
                                </li>
                                <li>• Week 5-6: Onboarding & training</li>
                                <li>• Salary: $8K/month each (2 developers)</li>
                              </ul>
                            </div>
                            <div className="border-l-4 border-black pl-4">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="bg-black text-white px-2 py-1 text-xs font-bold uppercase">
                                  Month 2
                                </span>
                                <span className="font-bold">
                                  DevOps Engineer — $10K
                                </span>
                              </div>
                              <ul className="space-y-1 font-mono text-sm ml-4 opacity-80">
                                <li>• Week 1-2: Recruitment</li>
                                <li>• Week 3-4: Interviews</li>
                                <li>• Week 5-6: Onboarding</li>
                                <li>• Salary: $5K/month</li>
                              </ul>
                            </div>
                            <div className="border-l-4 border-black pl-4">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="bg-black text-white px-2 py-1 text-xs font-bold uppercase">
                                  Month 3
                                </span>
                                <span className="font-bold">
                                  Community Manager — $8K
                                </span>
                              </div>
                              <ul className="space-y-1 font-mono text-sm ml-4 opacity-80">
                                <li>• Week 1-2: Recruitment</li>
                                <li>• Week 3-4: Interviews</li>
                                <li>• Week 5-6: Onboarding</li>
                                <li>• Salary: $4K/month</li>
                              </ul>
                            </div>
                            <div className="border-l-4 border-black pl-4">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="bg-black text-white px-2 py-1 text-xs font-bold uppercase">
                                  Month 4
                                </span>
                                <span className="font-bold">
                                  Marketing Specialist — $12K
                                </span>
                              </div>
                              <ul className="space-y-1 font-mono text-sm ml-4 opacity-80">
                                <li>• Week 1-2: Recruitment</li>
                                <li>• Week 3-4: Interviews</li>
                                <li>• Week 5-6: Onboarding</li>
                                <li>• Salary: $6K/month</li>
                              </ul>
                            </div>
                            <div className="border-l-4 border-black pl-4">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="bg-black text-white px-2 py-1 text-xs font-bold uppercase">
                                  Months 5-6
                                </span>
                                <span className="font-bold">
                                  Continued Salaries — $20K
                                </span>
                              </div>
                              <ul className="space-y-1 font-mono text-sm ml-4 opacity-80">
                                <li>• All team members: $20K total</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                            Role Descriptions & Impact
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border-2 border-black p-4">
                              <h6 className="font-bold uppercase mb-2">
                                Senior Blockchain Developers
                              </h6>
                              <p className="font-mono text-xs opacity-70 mb-2">
                                Required Skills:
                              </p>
                              <ul className="space-y-1 font-mono text-xs opacity-80 mb-3">
                                <li>• Lisk SDK expertise</li>
                                <li>• Smart contract development</li>
                                <li>• Web3 integration experience</li>
                              </ul>
                              <p className="font-mono text-xs opacity-70">
                                Impact: Supports Phases 2-4 roadmap milestones
                              </p>
                            </div>
                            <div className="border-2 border-black p-4">
                              <h6 className="font-bold uppercase mb-2">
                                DevOps Engineer
                              </h6>
                              <p className="font-mono text-xs opacity-70 mb-2">
                                Required Skills:
                              </p>
                              <ul className="space-y-1 font-mono text-xs opacity-80 mb-3">
                                <li>• Cloud infrastructure</li>
                                <li>• CI/CD pipelines</li>
                                <li>• Blockchain node management</li>
                              </ul>
                              <p className="font-mono text-xs opacity-70">
                                Impact: Ensures scalability & reliability
                              </p>
                            </div>
                            <div className="border-2 border-black p-4">
                              <h6 className="font-bold uppercase mb-2">
                                Community Manager
                              </h6>
                              <p className="font-mono text-xs opacity-70 mb-2">
                                Required Skills:
                              </p>
                              <ul className="space-y-1 font-mono text-xs opacity-80 mb-3">
                                <li>• Discord/Telegram management</li>
                                <li>• Content creation</li>
                                <li>• Community engagement</li>
                              </ul>
                              <p className="font-mono text-xs opacity-70">
                                Impact: Drives ecosystem growth
                              </p>
                            </div>
                            <div className="border-2 border-black p-4">
                              <h6 className="font-bold uppercase mb-2">
                                Marketing Specialist
                              </h6>
                              <p className="font-mono text-xs opacity-70 mb-2">
                                Required Skills:
                              </p>
                              <ul className="space-y-1 font-mono text-xs opacity-80 mb-3">
                                <li>• Web3 marketing</li>
                                <li>• Partnership development</li>
                                <li>• Growth strategies</li>
                              </ul>
                              <p className="font-mono text-xs opacity-70">
                                Impact: Accelerates user acquisition
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ExpandableSection>
                  </div>

                  {/* BLOCKCHAIN INTEGRATION PHASE */}
                  <div className="bg-[#F0F0F0]">
                    <div className="border-2 border-black p-8 mb-0">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="bg-black text-white px-3 py-1 text-lg">
                          🔗
                        </span>
                        <h4 className="text-2xl font-black uppercase">
                          Blockchain Integration
                        </h4>
                        <span className="ml-auto text-2xl font-black">$0</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-lg font-bold uppercase mb-3">
                            Lisk L2 Integration
                          </h5>
                          <ul className="space-y-2 font-mono text-sm">
                            <li>• Advanced smart contract deployment</li>
                            <li>• Cross-chain bridge development</li>
                            <li>• Tokenomics implementation</li>
                            <li>• DeFi integration features</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-lg font-bold uppercase mb-3">
                            Budget Overview
                          </h5>
                          <ul className="space-y-2 font-mono text-sm opacity-70">
                            <li>• Internal development resources</li>
                            <li>• No additional funding required</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <ExpandableSection title="Why $0? Detailed Explanation">
                      <div className="space-y-8">
                        <div>
                          <h5 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                            Why No Additional Budget Required?
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border-2 border-black p-4 bg-white">
                              <h6 className="font-bold uppercase mb-3">
                                Internal Resources
                              </h6>
                              <ul className="space-y-2 font-mono text-sm">
                                <li>✓ Team already has blockchain expertise</li>
                                <li>
                                  ✓ Development covered by existing capacity
                                </li>
                                <li>✓ No external contractors needed</li>
                                <li>
                                  ✓ Smart contract templates available from Lisk
                                  ecosystem
                                </li>
                              </ul>
                            </div>
                            <div className="border-2 border-black p-4 bg-white">
                              <h6 className="font-bold uppercase mb-3">
                                Lisk Infrastructure
                              </h6>
                              <ul className="space-y-2 font-mono text-sm">
                                <li>
                                  ✓ Lisk SDK is open-source (no licensing fees)
                                </li>
                                <li>
                                  ✓ Free development tools & documentation
                                </li>
                                <li>✓ Community support & resources</li>
                                <li>✓ Integration timeline: 3-month roadmap</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                            Traditional vs Our Approach
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border-2 border-red-500 p-4 bg-red-50">
                              <h6 className="font-bold uppercase mb-3 text-red-700">
                                Traditional Approach
                              </h6>
                              <ul className="space-y-2 font-mono text-sm text-red-700">
                                <li>
                                  • External blockchain consultants: $50K+
                                </li>
                                <li>• Licensing fees for proprietary tools</li>
                                <li>
                                  • Extended timeline due to learning curve
                                </li>
                                <li>• Higher risk of integration issues</li>
                              </ul>
                            </div>
                            <div className="border-2 border-green-500 p-4 bg-green-50">
                              <h6 className="font-bold uppercase mb-3 text-green-700">
                                Our Approach
                              </h6>
                              <ul className="space-y-2 font-mono text-sm text-green-700">
                                <li>• Leverage existing team expertise</li>
                                <li>
                                  • Use Lisk&apos;s free open-source
                                  infrastructure
                                </li>
                                <li>
                                  • Faster integration with familiar tools
                                </li>
                                <li>• Lower risk with internal knowledge</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                            Technical Readiness Checklist
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="border-2 border-black p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-green-600 font-bold">
                                  ✓
                                </span>
                                <span className="font-bold">
                                  Team Experience
                                </span>
                              </div>
                              <p className="font-mono text-xs opacity-70">
                                Blockchain development expertise already
                                in-house
                              </p>
                            </div>
                            <div className="border-2 border-black p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-green-600 font-bold">
                                  ✓
                                </span>
                                <span className="font-bold">
                                  Lisk SDK Research
                                </span>
                              </div>
                              <p className="font-mono text-xs opacity-70">
                                Completed in Phase 1 of roadmap
                              </p>
                            </div>
                            <div className="border-2 border-black p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-green-600 font-bold">
                                  ✓
                                </span>
                                <span className="font-bold">
                                  Smart Contracts
                                </span>
                              </div>
                              <p className="font-mono text-xs opacity-70">
                                Templates available from Lisk ecosystem
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="border-2 border-black p-4 bg-yellow-50">
                          <h6 className="font-bold uppercase mb-2">
                            Risk Mitigation
                          </h6>
                          <p className="font-mono text-sm opacity-80">
                            If complexity increases beyond initial scope, we
                            have a contingency plan that can be funded from the
                            ecosystem growth budget allocation.
                          </p>
                        </div>
                      </div>
                    </ExpandableSection>
                  </div>

                  {/* ECOSYSTEM GROWTH PHASE */}
                  <div className="bg-[#F0F0F0]">
                    <div className="border-2 border-black p-8 mb-0">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="bg-black text-white px-3 py-1 text-lg">
                          🌱
                        </span>
                        <h4 className="text-2xl font-black uppercase">
                          Ecosystem & Community Growth
                        </h4>
                        <span className="ml-auto text-2xl font-black">
                          $230K (77%)
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-lg font-bold uppercase mb-3">
                            Growth Initiatives
                          </h5>
                          <ul className="space-y-2 font-mono text-sm">
                            <li>• Partnership development</li>
                            <li>• Community building programs</li>
                            <li>• International expansion</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-lg font-bold uppercase mb-3">
                            Budget Overview
                          </h5>
                          <ul className="space-y-2 font-mono text-sm opacity-70">
                            <li>• Marketing & partnerships: $100K</li>
                            <li>• Community programs: $50K</li>
                            <li>• Pool allocation: $80K</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <ExpandableSection title="View Detailed Budget Breakdown & Timeline">
                      <div className="space-y-8">
                        <div>
                          <h5 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                            Detailed Budget Breakdown
                          </h5>
                          <div className="space-y-6">
                            <div className="border-2 border-black p-6 bg-white">
                              <div className="flex items-center justify-between mb-4">
                                <h6 className="text-lg font-bold uppercase">
                                  Marketing & Partnerships
                                </h6>
                                <span className="text-2xl font-black">
                                  $100K (43%)
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <p className="font-mono text-xs opacity-70 mb-2">
                                    Allocation:
                                  </p>
                                  <ul className="space-y-2 font-mono text-sm">
                                    <li>• Influencer partnerships: $30K</li>
                                    <li>
                                      • Content creation & UGC campaigns: $25K
                                    </li>
                                    <li>• PR & media outreach: $15K</li>
                                    <li>
                                      • Event sponsorships (gaming conventions):
                                      $20K
                                    </li>
                                    <li>
                                      • Performance marketing (paid ads): $10K
                                    </li>
                                  </ul>
                                </div>
                                <div className="border-l-2 border-black pl-4">
                                  <p className="font-mono text-xs opacity-70 mb-2">
                                    Timeline:
                                  </p>
                                  <ul className="space-y-2 font-mono text-sm opacity-80">
                                    <li>
                                      • Month 1-2: Initial campaigns ($40K)
                                    </li>
                                    <li>
                                      • Month 3-4: Scaling partnerships ($40K)
                                    </li>
                                    <li>
                                      • Month 5-6: Sustained growth ($20K)
                                    </li>
                                  </ul>
                                  <p className="font-mono text-xs opacity-70 mt-4">
                                    Expected ROI: 3-5x user acquisition
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="border-2 border-black p-6 bg-white">
                              <div className="flex items-center justify-between mb-4">
                                <h6 className="text-lg font-bold uppercase">
                                  Community Programs
                                </h6>
                                <span className="text-2xl font-black">
                                  $50K (22%)
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <p className="font-mono text-xs opacity-70 mb-2">
                                    Allocation:
                                  </p>
                                  <ul className="space-y-2 font-mono text-sm">
                                    <li>• Creator rewards program: $20K</li>
                                    <li>
                                      • Community contests & tournaments: $15K
                                    </li>
                                    <li>• Ambassador program: $10K</li>
                                    <li>
                                      • Discord/Telegram moderation &
                                      engagement: $5K
                                    </li>
                                  </ul>
                                </div>
                                <div className="border-l-2 border-black pl-4">
                                  <p className="font-mono text-xs opacity-70 mb-2">
                                    Timeline:
                                  </p>
                                  <ul className="space-y-2 font-mono text-sm opacity-80">
                                    <li>• Month 1: Program setup ($10K)</li>
                                    <li>
                                      • Month 2-3: Active campaigns ($25K)
                                    </li>
                                    <li>
                                      • Month 4-6: Sustained engagement ($15K)
                                    </li>
                                  </ul>
                                  <p className="font-mono text-xs opacity-70 mt-4">
                                    Expected ROI: Increased retention &
                                    engagement
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="border-2 border-black p-6 bg-white">
                              <div className="flex items-center justify-between mb-4">
                                <h6 className="text-lg font-bold uppercase">
                                  Pool Allocation
                                </h6>
                                <span className="text-2xl font-black">
                                  $80K (35%)
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <p className="font-mono text-xs opacity-70 mb-2">
                                    Allocation:
                                  </p>
                                  <ul className="space-y-2 font-mono text-sm">
                                    <li>
                                      • Liquidity pool for marketplace: $50K
                                    </li>
                                    <li>
                                      • Staking rewards for early adopters: $20K
                                    </li>
                                    <li>• Emergency reserve fund: $10K</li>
                                  </ul>
                                </div>
                                <div className="border-l-2 border-black pl-4">
                                  <p className="font-mono text-xs opacity-70 mb-2">
                                    Timeline:
                                  </p>
                                  <ul className="space-y-2 font-mono text-sm opacity-80">
                                    <li>
                                      • Month 3: Marketplace launch ($50K)
                                    </li>
                                    <li>• Month 4-6: Staking rewards ($20K)</li>
                                    <li>
                                      • Reserve: Available as needed ($10K)
                                    </li>
                                  </ul>
                                  <p className="font-mono text-xs opacity-70 mt-4">
                                    Expected ROI: Marketplace liquidity & user
                                    incentives
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                            Budget Allocation Chart
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="border-2 border-black p-4 bg-white text-center">
                              <div className="text-4xl font-black mb-2">
                                43%
                              </div>
                              <div className="font-bold uppercase mb-2">
                                Marketing
                              </div>
                              <div className="font-mono text-xs opacity-70">
                                $100K
                              </div>
                            </div>
                            <div className="border-2 border-black p-4 bg-white text-center">
                              <div className="text-4xl font-black mb-2">
                                22%
                              </div>
                              <div className="font-bold uppercase mb-2">
                                Community
                              </div>
                              <div className="font-mono text-xs opacity-70">
                                $50K
                              </div>
                            </div>
                            <div className="border-2 border-black p-4 bg-white text-center">
                              <div className="text-4xl font-black mb-2">
                                35%
                              </div>
                              <div className="font-bold uppercase mb-2">
                                Pool
                              </div>
                              <div className="font-mono text-xs opacity-70">
                                $80K
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border-2 border-black p-4 bg-yellow-50">
                          <h6 className="font-bold uppercase mb-2">
                            Total Allocation: $230K (77% of Grant)
                          </h6>
                          <p className="font-mono text-sm opacity-80">
                            This high percentage reflects our focus on
                            sustainable growth through community-driven
                            initiatives and marketplace liquidity, rather than
                            expensive external marketing agencies.
                          </p>
                        </div>
                      </div>
                    </ExpandableSection>
                  </div>
                </div>

                <div className="mt-12 border-2 border-black p-8 bg-black text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-2xl font-black uppercase mb-2">
                        Total Grant Allocation
                      </h4>
                      <p className="opacity-70">
                        Blockchain integration, team expansion, and ecosystem
                        growth
                      </p>
                    </div>
                    <div className="text-5xl font-black">$300K</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

function Phase({
  number,
  title,
  weeks,
  focus,
  items,
}: {
  number: string;
  title: string;
  weeks: string;
  focus: string;
  items: { text: string; status: "done" | "wip" | "todo" }[];
}) {
  return (
    <Reveal>
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 border-l-2 border-black pl-8 relative">
        <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black rounded-full" />

        <div className="sm:w-1/3">
          <span className="text-6xl font-black opacity-10 absolute -top-8 left-4 select-none">
            {number}
          </span>
          <h4 className="text-2xl font-bold uppercase">{title}</h4>
          <p className="font-mono text-sm opacity-60 mt-1">{weeks}</p>
          <span className="inline-block mt-2 bg-black text-white text-xs font-bold uppercase px-2 py-0.5">
            {focus}
          </span>
        </div>

        <div className="sm:w-2/3 space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span
                className={`mt-1 w-4 h-4 border-2 border-black flex items-center justify-center text-[10px] font-bold ${
                  item.status === "done"
                    ? "bg-black text-white"
                    : item.status === "wip"
                    ? "bg-black/20"
                    : ""
                }`}
              >
                {item.status === "done" && "✓"}
              </span>
              <span
                className={`text-lg font-medium leading-tight ${
                  item.status === "done" ? "line-through opacity-40" : ""
                }`}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
