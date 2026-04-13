import { Reveal } from "@/components/ui/Reveal";
import DitherWrapper from "@/components/DitherWrapper";

export const metadata = {
  title: "Vinpix Studio | AI Workflow Automation for SMEs",
  description:
    "We help German SMEs and consulting teams automate manual workflows and build internal tools in 2-4 weeks.",
};

export default function ForBusiness() {
  return (
    <main className="min-h-screen bg-[#F0F0F0] text-black selection:bg-black selection:text-white font-sans">
      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-screen w-full flex flex-col justify-end pb-12 sm:pb-24 px-6 sm:px-12 border-b-2 border-black overflow-hidden pt-40"
      >
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none grayscale contrast-125">
          <DitherWrapper
            waveColor={[0, 0, 0]}
            disableAnimation={false}
            enableMouseInteraction={true}
            mouseRadius={0.3}
            colorNum={2}
            pixelSize={4}
            waveAmplitude={0.05}
            waveFrequency={2}
            waveSpeed={0.01}
          />
        </div>

        <div className="relative z-10 w-full max-w-[1920px] mx-auto">
          <div className="flex flex-col">
            <Reveal>
              <h1 className="text-5xl sm:text-[8vw] leading-[0.9] font-black tracking-tighter uppercase mix-blend-multiply max-w-5xl">
                We automate manual workflows in 2-4 weeks.
              </h1>
            </Reveal>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-8 border-t-2 border-black pt-6 max-w-5xl">
              <Reveal delay={0.4}>
                <p className="text-xl sm:text-2xl font-medium max-w-2xl leading-tight">
                  We help German SMEs and consulting teams turn AI concepts into working internal tools—without the bloat and risk of traditional outsourcing.
                </p>
              </Reveal>
              <Reveal delay={0.6}>
                <div className="flex flex-col items-start sm:items-end">
                  <span className="inline-block bg-black text-white px-3 py-1 text-sm font-bold uppercase tracking-widest mb-1">
                    B2B Delivery Partner
                  </span>
                  <a
                    href="#contact"
                    className="mt-4 inline-block border-2 border-black px-6 py-2 text-sm font-bold uppercase hover:bg-black hover:text-white transition-colors"
                  >
                    Book Discovery Call
                  </a>
                </div>
              </Reveal>
            </div>

            {/* TRUST STRIP */}
            <Reveal delay={0.8}>
              <div className="mt-12 pt-6 border-t-2 border-black/20 flex flex-wrap gap-x-6 gap-y-2 opacity-60 text-xs sm:text-sm font-mono uppercase tracking-widest max-w-5xl">
                <span>Vietnam-based delivery</span>
                <span className="hidden sm:inline">•</span>
                <span>English-first</span>
                <span className="hidden sm:inline">•</span>
                <span>GDPR-aware workflow design</span>
                <span className="hidden sm:inline">•</span>
                <span>Clear documentation & handoff</span>
                <span className="hidden sm:inline">•</span>
                <span>2-4 week pilot scope</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* THE PROBLEM SECTION */}
      <section id="problem" className="border-b-2 border-black bg-white">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[50vh]">
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r-2 border-black p-6 sm:p-12">
            <div className="sticky top-24">
              <Reveal>
                <h2 className="text-4xl font-black tracking-tighter uppercase">
                  Why Us?
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="md:col-span-9 p-6 sm:p-12 flex flex-col justify-center">
            <div className="max-w-3xl space-y-8">
              <Reveal delay={0.2}>
                <h3 className="text-3xl font-bold uppercase tracking-tight">
                  We don&apos;t just sell hours. We deliver measurable ROI.
                </h3>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-xl opacity-80 leading-relaxed">
                  Most businesses don&apos;t need a massive IT overhaul. They need to fix specific bottlenecks: manual document intake, messy approval workflows, or disconnected spreadsheets.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="text-xl opacity-80 leading-relaxed">
                  Whether you are an SME looking to digitalize, or an agency needing an overflow delivery partner to implement your strategy, we build scoped, functional tools that your team can actually use.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16 max-w-4xl">
              <Reveal delay={0.5}>
                <div className="border-l-4 border-black pl-6">
                  <h4 className="text-xl font-bold uppercase mb-2">For SMEs</h4>
                  <p className="opacity-70">
                    Stop drowning in manual ops. We build custom dashboards, automated data extraction pipelines, and internal tools so your team can focus on core work.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.6}>
                <div className="border-l-4 border-black pl-6">
                  <h4 className="text-xl font-bold uppercase mb-2">For Agencies</h4>
                  <p className="opacity-70">
                    White-label our delivery. You do the discovery and strategy; we provide the engineering muscle to ship Next.js/Node backends and AI agents for your clients.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="border-b-2 border-black bg-[#F0F0F0]">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[50vh]">
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r-2 border-black p-6 sm:p-12">
            <div className="sticky top-24">
              <Reveal>
                <h2 className="text-4xl font-black tracking-tighter uppercase">
                  Our Process
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="md:col-span-9 p-6 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl">
              <Reveal delay={0.2}>
                <div className="space-y-4">
                  <span className="text-6xl font-black opacity-10">01</span>
                  <h3 className="text-2xl font-bold uppercase">Define the Bottleneck</h3>
                  <p className="opacity-70 text-lg">
                    We start with a single, painful manual workflow. No sprawling scopes. We define exactly what needs to be automated and the expected ROI.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="space-y-4">
                  <span className="text-6xl font-black opacity-10">02</span>
                  <h3 className="text-2xl font-bold uppercase">Pilot in 2-4 Weeks</h3>
                  <p className="opacity-70 text-lg">
                    We build a functional prototype or MVP. We connect the APIs, setup the AI logic, and build a clean UI that your team can test immediately.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.6}>
                <div className="space-y-4">
                  <span className="text-6xl font-black opacity-10">03</span>
                  <h3 className="text-2xl font-bold uppercase">Handoff & Scale</h3>
                  <p className="opacity-70 text-lg">
                    Once the pilot proves its value, we refine it for production, handle security, and hand it over to your internal team with full documentation.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF SECTION */}
      <section id="proof" className="border-b-2 border-black bg-white">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r-2 border-black p-6 sm:p-12">
            <div className="sticky top-24">
              <Reveal>
                <h2 className="text-4xl font-black tracking-tighter uppercase">
                  Case Studies
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="md:col-span-9 p-6 sm:p-12">
            <div className="space-y-16 max-w-4xl">
              <Reveal delay={0.2}>
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 bg-black/5 text-sm font-bold uppercase tracking-widest">
                    EdTech Infrastructure
                  </span>
                  <h3 className="text-3xl font-bold uppercase">Spring Board Platform</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
                    <div>
                      <h4 className="font-bold opacity-50 uppercase text-sm mb-2">The Problem</h4>
                      <p className="opacity-80">Manual student tracking, disconnected data sources, and scattered learning materials slowing down scaling.</p>
                    </div>
                    <div>
                      <h4 className="font-bold opacity-50 uppercase text-sm mb-2">What we built</h4>
                      <p className="opacity-80">A centralized Next.js/Node platform with automated student progression tracking and internal admin dashboards.</p>
                    </div>
                    <div>
                      <h4 className="font-bold opacity-50 uppercase text-sm mb-2">Outcome</h4>
                      <p className="opacity-80">Reduced manual coordination across admins, centralized data flow, and enabled scalable operations without hiring more staff.</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 bg-black/5 text-sm font-bold uppercase tracking-widest">
                    AI Integration
                  </span>
                  <h3 className="text-3xl font-bold uppercase">APIE Interactive Authoring Tool</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
                    <div>
                      <h4 className="font-bold opacity-50 uppercase text-sm mb-2">The Problem</h4>
                      <p className="opacity-80">High manual effort required to prepare engaging lessons. Dry content led to more live teaching sessions to maintain quality.</p>
                    </div>
                    <div>
                      <h4 className="font-bold opacity-50 uppercase text-sm mb-2">What we built</h4>
                      <p className="opacity-80">A custom internal tool that transforms static knowledge into visually appealing, interactive exercises with automated formatting.</p>
                    </div>
                    <div>
                      <h4 className="font-bold opacity-50 uppercase text-sm mb-2">Outcome</h4>
                      <p className="opacity-80">Drastically reduced lesson prep time and required live teaching hours, while maintaining high student engagement and learning quality.</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="min-h-[50vh] bg-black text-white p-6 sm:p-12 flex flex-col justify-between"
      >
        <div className="max-w-[1920px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <Reveal>
              <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase mb-8">
                Let&apos;s automate<br />that workflow.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl opacity-60 max-w-md leading-relaxed">
                Whether you need a dedicated team to automate your manual processes, or an implementation partner for your consulting clients, we&apos;re ready.
              </p>
            </Reveal>
          </div>
          <div className="flex flex-col justify-between">
            <div className="space-y-8 text-2xl sm:text-3xl font-bold uppercase">
              <Reveal delay={0.2}>
                <a
                  href="mailto:hello@vinpix.studio"
                  className="block hover:underline decoration-2 underline-offset-8"
                >
                  hello@vinpix.studio
                </a>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex flex-col gap-2 text-lg sm:text-xl font-normal opacity-80 mt-4">
                  <a
                    href="https://cal.com/kiet-le" // Replace with actual cal link if available
                    target="_blank"
                    className="inline-block border-2 border-white px-6 py-3 text-sm font-bold uppercase hover:bg-white hover:text-black transition-colors w-fit mb-6"
                  >
                    Book a 15-min Call
                  </a>
                  <div className="flex flex-col gap-3 text-base sm:text-lg">
                    <span className="text-sm font-bold opacity-50 uppercase tracking-widest mb-1">Meet the Team</span>
                    <a href="https://www.linkedin.com/in/anhluom/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      Kiet Le - Technical Founder ↗
                    </a>
                    <a href="https://www.linkedin.com/in/maithuongbui172/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      Mai Thuong - Project Manager ↗
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.6}>
              <div className="mt-12 flex flex-col items-start gap-1 opacity-40">
                <span className="text-xs uppercase tracking-widest">
                  Vietnam-based Delivery Partner
                </span>
                <p className="text-sm uppercase tracking-widest">
                  © {new Date().getFullYear()} Vinpix Studio.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
