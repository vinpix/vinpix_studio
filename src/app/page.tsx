import WorkShowcase from "@/components/WorkShowcase";
import Image from "next/image";
import fashineLogoPng from "@/../public/fashine_logo.png";
import springboardLogoPng from "@/../public/springboard.jpeg";
import apiePiePng from "@/../public/apie_pie.png";
import { Reveal, RevealImage } from "@/components/ui/Reveal";
import SidebarSection from "@/components/ui/SidebarSection";
import DitherWrapper from "@/components/DitherWrapper";

const trustSignals = [
  "Vietnam-based delivery",
  "English-first communication",
  "Fast pilot, clear handoff",
  "AI workflow and internal-tool focus",
] as const;

const serviceCards = [
  {
    title: "AI Workflow Automation",
    description:
      "We remove repetitive manual steps with practical AI workflows for intake, review, routing, and reporting.",
  },
  {
    title: "Internal Tools",
    description:
      "We build focused internal products that help small teams work faster without bloated software rollouts.",
  },
  {
    title: "System Integration",
    description:
      "We connect forms, dashboards, content pipelines, and back-office workflows into one usable operating layer.",
  },
  {
    title: "Rapid Pilot Delivery",
    description:
      "We scope tightly, ship quickly, and hand over a working system your team can actually use and extend.",
  },
] as const;

const proofProjects = [
  {
    id: "fashine",
    label: "AI Product",
    title: "Fashine",
    description:
      "An AI-powered consumer experience that turns image input into structured, useful guidance. Relevant proof for applied AI, image workflow thinking, and polished product delivery.",
    href: "https://www.fashine.app/",
    cta: "Visit Website",
    image: fashineLogoPng,
    imageAlt: "Fashine",
  },
  {
    id: "springboard",
    label: "EdTech Platform",
    title: "Spring Board",
    description:
      "A full learning platform built from scratch with progress tracking and guided learning paths. Relevant proof for product engineering, backend logic, and user-facing workflow design.",
    href: "https://app.springboard.vn/",
    cta: "Visit Platform",
    image: springboardLogoPng,
    imageAlt: "Springboard",
  },
  {
    id: "apie",
    label: "AI Learning Product",
    title: "APIE",
    description:
      "An AI-powered German learning product that combines speaking practice, structured study direction, and personalization. Relevant proof for AI-assisted product flows and focused user journeys.",
    href: "https://apie.vn/",
    cta: "Visit Website",
    image: apiePiePng,
    imageAlt: "APIE",
  },
] as const;

const processSteps = [
  {
    step: "01",
    title: "Discover",
    description:
      "We define the bottleneck, the current workflow, and the smallest useful pilot.",
  },
  {
    step: "02",
    title: "Scope",
    description:
      "We turn the problem into a short implementation plan with concrete handoff and timeline.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "We ship the workflow, internal tool, or integration with fast feedback loops and pragmatic execution.",
  },
  {
    step: "04",
    title: "Handoff",
    description:
      "We document the system, transfer context, and make sure your team can use it after launch.",
  },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F0F0F0] text-black selection:bg-black selection:text-white font-sans">
      <section
        id="hero"
        className="relative min-h-screen w-full flex flex-col justify-end pb-12 sm:pb-20 px-6 sm:px-12 border-b-2 border-black overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none grayscale contrast-125">
          <DitherWrapper
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
          <div className="flex flex-col gap-10">
            <div className="space-y-6">
              <Reveal>
                <span className="inline-block border-2 border-black bg-white px-3 py-1 text-sm font-bold uppercase tracking-widest">
                  Vinpix Studio
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="max-w-6xl text-[10vw] leading-[0.88] font-black tracking-tighter uppercase mix-blend-multiply sm:text-[8vw]">
                  AI Workflow
                  <br />
                  Automation
                  <br />
                  And Internal Tools
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="max-w-3xl text-lg sm:text-2xl font-medium leading-tight">
                  We help growing teams remove manual bottlenecks with focused
                  software, practical AI, and fast pilot delivery.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 gap-8 border-t-2 border-black pt-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <Reveal delay={0.3}>
                <div className="max-w-3xl space-y-6">
                  <p className="text-sm font-bold uppercase tracking-widest opacity-50">
                    Best fit
                  </p>
                  <p className="text-lg sm:text-xl leading-relaxed">
                    Small and mid-sized teams that need a fast, scoped build for
                    workflow automation, internal operations, or AI-assisted
                    tooling.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="mailto:kietle@vinpixstudio.com?subject=Intro%20Call%20-%20Vinpix%20Studio"
                      className="inline-block border-2 border-black bg-black px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
                    >
                      Book A Fit Call
                    </a>
                    <a
                      href="#proof"
                      className="inline-block border-2 border-black px-6 py-3 text-sm font-bold uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
                    >
                      See Relevant Work
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex flex-col items-start gap-3 md:items-end">
                  <span className="inline-block bg-black px-3 py-1 text-sm font-bold uppercase tracking-widest text-white">
                    Vietnam-Based Partner
                  </span>
                  <p className="text-sm font-mono uppercase tracking-widest opacity-60">
                    Product Engineering • Fast Pilots • Clear Handoff
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 md:grid-cols-4">
              {trustSignals.map((signal, index) => (
                <Reveal key={signal} delay={0.15 * (index + 1)}>
                  <div className="border border-black/30 bg-white/70 px-4 py-4 text-sm font-bold uppercase tracking-wide">
                    {signal}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="border-b-2 border-black bg-white">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r-2 border-black md:sticky md:top-0 h-full">
            <SidebarSection className="h-full p-6 sm:p-12">
              <div className="sticky top-24">
                <Reveal>
                  <span className="text-sm font-bold tracking-widest uppercase mb-2 block opacity-50">
                    Services
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight">
                    What We
                    <br />
                    Build
                  </h2>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          <div className="md:col-span-9 p-6 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {serviceCards.map((service, index) => (
                <Reveal key={service.title} delay={0.1 * (index + 1)}>
                  <div className="h-full border-2 border-black bg-[#F0F0F0] p-6 sm:p-8">
                    <p className="text-sm font-bold uppercase tracking-widest opacity-50 mb-3">
                      Service {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-4">
                      {service.title}
                    </h3>
                    <p className="text-lg leading-relaxed opacity-75">
                      {service.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="proof" className="border-b-2 border-black bg-[#F0F0F0]">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r-2 border-black md:sticky md:top-0 h-full">
            <SidebarSection className="h-full p-6 sm:p-12">
              <div className="sticky top-24">
                <Reveal>
                  <span className="text-sm font-bold tracking-widest uppercase mb-2 block opacity-50">
                    Proof
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight">
                    Relevant
                    <br />
                    Work
                  </h2>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          <div className="md:col-span-9 p-6 sm:p-12">
            <div className="space-y-12">
              {proofProjects.map((project, index) => {
                const imageOrderClass =
                  index % 2 === 0
                    ? "order-1 lg:order-2"
                    : "order-1 lg:order-1";
                const contentOrderClass =
                  index % 2 === 0
                    ? "order-2 lg:order-1"
                    : "order-2 lg:order-2";

                return (
                  <div
                    key={project.id}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-b border-black/15 pb-12 last:border-b-0 last:pb-0"
                  >
                    <RevealImage
                      className={`relative aspect-square bg-black/5 w-full max-w-md ${imageOrderClass}`}
                    >
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    </RevealImage>

                    <div
                      className={`flex flex-col gap-8 pt-4 lg:pt-0 ${contentOrderClass}`}
                    >
                      <div className="space-y-4">
                        <Reveal delay={0.1}>
                          <span className="text-sm font-bold tracking-widest uppercase block opacity-50">
                            {project.label}
                          </span>
                        </Reveal>
                        <Reveal delay={0.2}>
                          <h3 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight">
                            {project.title}
                          </h3>
                        </Reveal>
                      </div>

                      <div className="space-y-6">
                        <Reveal delay={0.3}>
                          <p className="text-lg opacity-75 max-w-prose leading-relaxed">
                            {project.description}
                          </p>
                        </Reveal>
                        <Reveal delay={0.4}>
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block border-2 border-black px-6 py-3 text-lg font-bold uppercase hover:bg-black hover:text-white transition-colors"
                          >
                            {project.cta}
                          </a>
                        </Reveal>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="border-b-2 border-black bg-white">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r-2 border-black md:sticky md:top-0 h-full">
            <SidebarSection className="h-full p-6 sm:p-12">
              <div className="sticky top-24">
                <Reveal>
                  <span className="text-sm font-bold tracking-widest uppercase mb-2 block opacity-50">
                    Process
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight">
                    How We
                    <br />
                    Work
                  </h2>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          <div className="md:col-span-9 p-6 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {processSteps.map((step, index) => (
                <Reveal key={step.step} delay={0.1 * (index + 1)}>
                  <div className="h-full border-b-2 border-black py-6">
                    <p className="text-sm font-bold uppercase tracking-widest opacity-40 mb-3">
                      Step {step.step}
                    </p>
                    <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg leading-relaxed opacity-75">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="border-b-2 border-black bg-[#F0F0F0]">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r-2 border-black md:sticky md:top-0 h-full md:h-screen">
            <SidebarSection className="h-full p-6 sm:p-12" viewportAmount={0.2}>
              <div className="sticky top-24">
                <Reveal>
                  <span className="text-sm font-bold tracking-widest uppercase mb-2 block opacity-50">
                    Extra Proof
                  </span>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase md:[writing-mode:vertical-rl] md:rotate-180">
                    Shipped
                    <br />
                    Products
                  </h2>
                </Reveal>
              </div>

              <div className="hidden md:block mt-auto pt-12">
                <Reveal delay={0.2}>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-40 mb-2">
                    Why it matters
                  </p>
                  <p className="text-lg font-medium leading-snug">
                    We ship real products,
                    <br />
                    not just mockups or decks.
                  </p>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          <div className="md:col-span-9 p-6 sm:p-12 flex items-center">
            <WorkShowcase />
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="min-h-[50vh] bg-black text-white p-6 sm:p-12 flex flex-col justify-between"
      >
        <div className="max-w-[1920px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <Reveal>
              <h2 className="text-6xl sm:text-8xl font-black tracking-tighter uppercase mb-8">
                Start With
                <br />
                A Small Pilot
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl opacity-70 max-w-xl leading-relaxed">
                If you have a manual workflow, internal-tool backlog, or an
                AI-assisted process that needs to move from idea to working
                software, we can scope a focused pilot and take it from there.
              </p>
            </Reveal>
          </div>
          <div className="flex flex-col justify-between">
            <div className="space-y-8">
              <Reveal delay={0.2}>
                <a
                  href="mailto:kietle@vinpixstudio.com?subject=Workflow%20Automation%20Pilot"
                  className="block text-2xl sm:text-3xl font-bold uppercase hover:underline decoration-2 underline-offset-8"
                >
                  kietle@vinpixstudio.com
                </a>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="grid grid-cols-1 gap-3 text-sm sm:text-base uppercase tracking-wide">
                  <p>Best for: SMEs, product teams, and partner studios</p>
                  <p>Focus: AI workflows, internal tools, custom operations software</p>
                  <p>Engagement: scoped pilots, implementation support, clear handoff</p>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <a
                  href="mailto:kietle@vinpixstudio.com?subject=Intro%20Call%20-%20Vinpix%20Studio"
                  className="inline-block border-2 border-white px-6 py-3 text-sm font-bold uppercase tracking-widest transition-colors hover:bg-white hover:text-black"
                >
                  Book A Fit Call
                </a>
              </Reveal>
            </div>
            <Reveal delay={0.6}>
              <div className="mt-12 flex flex-col items-start gap-1 opacity-40">
                <span className="text-xs uppercase tracking-widest">
                  Built by Vinpix Studio
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
