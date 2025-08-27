import Dither from "@/components/Dither";
import ScrambledText from "@/components/ScrambledText";
import WorkShowcase from "@/components/WorkShowcase";

export default function Home() {
  return (
    <main className="snap-y snap-mandatory h-screen overflow-y-auto">
      <section id="hero" className="relative min-h-screen snap-start pt-16">
        <div className="absolute inset-0">
          <Dither
            waveColor={[0.5, 0.5, 0.5]}
            disableAnimation={false}
            enableMouseInteraction={true}
            mouseRadius={0.3}
            colorNum={4}
            waveAmplitude={0.2}
            waveFrequency={3}
            waveSpeed={0.025}
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-6 select-none max-w-3xl mx-auto gap-3">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            <ScrambledText
              className="scrambled-text-demo"
              radius={100}
              duration={1.2}
              speed={0.5}
              scrambleChars={".:"}
            >
              VINPIX STUDIO
            </ScrambledText>
          </h1>
          <p className="mt-4 text-base sm:text-lg opacity-90">
            <ScrambledText
              className="scrambled-text-demo"
              radius={100}
              duration={1.2}
              speed={0.5}
              scrambleChars={".:"}
            >
              I make games just for fun and of course... for money
            </ScrambledText>
          </p>
        </div>
      </section>

      <section
        id="work"
        className="snap-start min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6 flex items-center"
      >
        <div className="mx-auto w-full max-w-5xl">
          <WorkShowcase />
        </div>
      </section>

      {/* Contact section (last) */}
      <section
        id="contact"
        className="snap-start min-h-[calc(100vh-4rem)] px-6 sm:px-10 py-10"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-4xl font-bold tracking-tight">
            CONTACT ME
          </h2>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <img
                src="/art.png"
                alt="art"
                className="w-[380px] max-w-full rounded-xl opacity-90"
              />
            </div>
            <div className="space-y-6">
              <p className="text-2xl">Please feel free to contact me</p>
              <div className="flex items-center gap-6 text-teal-400 text-xl">
                <a href="#" className="hover:underline">
                  Facebook
                </a>
                <span className="opacity-50">|</span>
                <a href="#" className="hover:underline">
                  Instagram
                </a>
                <span className="opacity-50">|</span>
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </div>
              <p className="text-3xl">
                Email:{" "}
                <span className="font-semibold">kiet57441@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
