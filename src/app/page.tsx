import WorkShowcase from "@/components/WorkShowcase";
import Image from "next/image";
import fashineLogoPng from "@/../public/fashine_logo.png";
import springboardLogoPng from "@/../public/springboard.jpeg";
import { Reveal, RevealImage } from "@/components/ui/Reveal";
import SidebarSection from "@/components/ui/SidebarSection";
import DitherWrapper from "@/components/DitherWrapper";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F0F0F0] text-black selection:bg-black selection:text-white font-sans">
      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative h-screen w-full flex flex-col justify-end pb-12 sm:pb-24 px-6 sm:px-12 border-b-2 border-black overflow-hidden"
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
          <div className="flex flex-col">
            <Reveal>
              <h1 className="text-[12vw] leading-[0.85] font-black tracking-tighter uppercase mix-blend-multiply">
                Vinpix
              </h1>
            </Reveal>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-8 border-t-2 border-black pt-6 max-w-5xl">
              <Reveal delay={0.4}>
                <p className="text-xl sm:text-3xl font-bold max-w-xl leading-tight uppercase tracking-tight">
                  Independent game development & digital experiences.
                  {/* <span className="opacity-50 block mt-2">Making fun things for money and glory.</span> */}
                </p>
              </Reveal>
              <Reveal delay={0.6}>
                <div className="flex flex-col items-start sm:items-end">
                  <span className="inline-block bg-black text-white px-3 py-1 text-sm font-bold uppercase tracking-widest mb-1">
                    Solo Developer
                  </span>
                  <p className="text-sm font-mono opacity-60 uppercase tracking-widest">
                    EST. 202X — VIETNAM
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* GAMES SECTION */}
      <section id="work" className="border-b-2 border-black bg-[#F0F0F0]">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
          {/* Sidebar Title */}
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r-2 border-black md:sticky md:top-0 h-full md:h-screen">
            <SidebarSection className="h-full p-6 sm:p-12" viewportAmount={0.2}>
              <div className="sticky top-24">
                <Reveal>
                  <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase writing-mode-vertical md:[writing-mode:vertical-rl] md:rotate-180">
                    Games
                  </h2>
                </Reveal>
              </div>

              <div className="hidden md:block mt-auto pt-12">
                <Reveal delay={0.2}>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-40 mb-2">
                    Philosophy
                  </p>
                  <p className="text-lg font-medium leading-snug">
                    One person.
                    <br />
                    Zero compromise.
                    <br />
                    Pure fun.
                  </p>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          {/* Content */}
          <div className="md:col-span-9 p-6 sm:p-12 flex items-center">
            <WorkShowcase />
          </div>
        </div>
      </section>

      {/* WEBSITE SECTION */}
      <section id="website" className="border-b-2 border-black bg-white">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r-2 border-black md:sticky md:top-0 h-full">
            <SidebarSection className="h-full p-6 sm:p-12">
              <div className="sticky top-24">
                <Reveal>
                  <span className="text-sm font-bold tracking-widest uppercase mb-2 block opacity-50">
                    Side Project
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight">
                    Fashine
                  </h2>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          <div className="md:col-span-9 p-6 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <RevealImage className="relative aspect-square bg-black/5 w-full max-w-md">
                <Image
                  src={fashineLogoPng}
                  alt="Fashine"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </RevealImage>
              <div className="flex flex-col gap-8 pt-4 lg:pt-0">
                <Reveal delay={0.2}>
                  <p className="text-2xl sm:text-3xl font-medium leading-tight">
                    Style decisions, simplified.
                  </p>
                </Reveal>
                <div className="space-y-6">
                  <Reveal delay={0.4}>
                    <p className="text-lg opacity-70 max-w-prose">
                      AI-powered wardrobe manager. Because even solo devs need
                      to dress well sometimes. Snap a photo, get a breakdown,
                      look good.
                    </p>
                  </Reveal>
                  <Reveal delay={0.6}>
                    <a
                      href="https://www.fashine.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block border-2 border-black px-6 py-3 text-lg font-bold uppercase hover:bg-black hover:text-white transition-colors"
                    >
                      Visit Website
                    </a>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education" className="border-b-2 border-black bg-[#F0F0F0]">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r-2 border-black md:sticky md:top-0 h-full">
            <SidebarSection className="h-full p-6 sm:p-12">
              <div className="sticky top-24">
                <Reveal>
                  <span className="text-sm font-bold tracking-widest uppercase mb-2 block opacity-50">
                    EdTech
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight">
                    Spring
                    <br />
                    Board
                  </h2>
                </Reveal>
              </div>
            </SidebarSection>
          </div>

          <div className="md:col-span-9 p-6 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <RevealImage className="relative aspect-square bg-black/5 w-full max-w-md order-1 lg:order-2">
                <Image
                  src={springboardLogoPng}
                  alt="Springboard"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </RevealImage>
              <div className="flex flex-col gap-8 pt-4 lg:pt-0 order-2 lg:order-1">
                <Reveal delay={0.2}>
                  <p className="text-2xl sm:text-3xl font-medium leading-tight">
                    Empowering the next generation.
                  </p>
                </Reveal>
                <div className="space-y-6">
                  <Reveal delay={0.4}>
                    <p className="text-lg opacity-70 max-w-prose">
                      An entire EdTech platform built from scratch. Helping
                      Vietnamese students crush their English exams with
                      intelligent tracking and personalized paths.
                    </p>
                  </Reveal>
                  <Reveal delay={0.6}>
                    <a
                      href="https://app.springboard.vn/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block border-2 border-black px-6 py-3 text-lg font-bold uppercase hover:bg-black hover:text-white transition-colors"
                    >
                      Visit Platform
                    </a>
                  </Reveal>
                </div>
              </div>
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
              <h2 className="text-6xl sm:text-8xl font-black tracking-tighter uppercase mb-8">
                Let&apos;s
                <br />
                Talk
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl opacity-60 max-w-md leading-relaxed">
                I&apos;m always open to discussing game design, code
                architecture, or potential collaborations. Just don&apos;t ask
                me to fix your printer.
              </p>
            </Reveal>
          </div>
          <div className="flex flex-col justify-between">
            <div className="space-y-8 text-2xl sm:text-3xl font-bold uppercase">
              <Reveal delay={0.2}>
                <a
                  href="mailto:kiet57441@gmail.com"
                  className="block hover:underline decoration-2 underline-offset-8"
                >
                  kiet57441@gmail.com
                </a>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex flex-col gap-2 text-lg sm:text-xl font-normal opacity-80">
                  <a
                    href="https://www.facebook.com/quoc.kiet.310772/"
                    className="hover:text-white transition-colors"
                  >
                    Facebook ↗
                  </a>
                  <a
                    href="https://www.instagram.com/anh_luomm/"
                    className="hover:text-white transition-colors"
                  >
                    Instagram ↗
                  </a>
                  <a
                    href="https://x.com/QucKiet"
                    className="hover:text-white transition-colors"
                  >
                    Twitter / X ↗
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.6}>
              <div className="mt-12 flex flex-col items-start gap-1 opacity-40">
                <span className="text-xs uppercase tracking-widest">
                  Designed & Built by Kiet Le
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
