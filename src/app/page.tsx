import WorkShowcase from "@/components/WorkShowcase";
import Dither from "@/components/Dither";
import Image from "next/image";
import fashineLogoPng from "@/../public/fashine_logo.png";
import springboardLogoPng from "@/../public/springboard.jpeg";

export default function Home() {
  return (
    <main className="snap-y snap-mandatory h-screen overflow-y-auto">
      <section
        id="hero"
        className="relative min-h-screen snap-start pt-16 bg-black"
      >
        <div className="absolute inset-0">
          <Dither
            waveColor={[1.0, 1.0, 1.0]}
            disableAnimation={false}
            enableMouseInteraction={true}
            mouseRadius={0.3}
            colorNum={2}
            pixelSize={3}
            waveAmplitude={0.3}
            waveFrequency={3}
            waveSpeed={0.025}
          />
        </div>
        <div className="relaive z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-6 select-none max-w-3xl mx-auto gap-3 pointer-events-none text-black">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-6 shadow-lg border border-black/10">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
              VINPIX STUDIO
            </h1>
            <p className="mt-4 text-base sm:text-lg opacity-90">
              I make games just for fun and of course... for money
            </p>
          </div>
        </div>
      </section>

      <section
        id="work"
        className="snap-start min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6 flex items-center"
      >
        <div className="mx-auto w-full max-w-4xl">
          <h2 className="text-center text-4xl font-bold tracking-tight">
            GAMES
          </h2>
          <p className="mt-2 text-center opacity-80">
            A selection of games I have built.
          </p>
          <div className="mt-6">
            <WorkShowcase />
          </div>
        </div>
      </section>

      <section
        id="website"
        className="snap-start min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6 flex items-center"
      >
        <div className="mx-auto w-full max-w-2xl">
          <h2 className="text-center text-4xl font-bold tracking-tight">
            WEBSITE
          </h2>
          <p className="mt-2 text-center opacity-80">
            A standalone website project separate from my games.
          </p>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 items-center rounded-xl border border-foreground/15 bg-background/70 backdrop-blur-md p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
            <div className="flex justify-center lg:justify-start">
              <Image
                src={fashineLogoPng}
                alt="Fashine logo"
                width={200}
                height={200}
                className="rounded-lg shadow-md"
                priority
              />
            </div>
            <div className="flex flex-col items-center lg:items-start gap-2 text-center lg:text-left max-w-prose justify-self-start">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                FASHINE
              </h2>
              <p className="mt-1 text-base sm:text-lg opacity-90 leading-snug">
                Digitize your wardrobe with an AI powered app that simplifies
                style decisions. Snap a photo of your outfit for instant color
                breakdowns, style scores, and personalized tips. Plan looks,
                match new pieces effortlessly, and find fresh inspiration — all
                in one app.
              </p>
              <a
                href="https://www.fashine.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:opacity-70 underline-offset-4 hover:underline text-base"
              >
                Visit Website
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="education"
        className="snap-start min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6 flex items-center"
      >
        <div className="mx-auto w-full max-w-2xl">
          <h2 className="text-center text-4xl font-bold tracking-tight">
            EDUCATION PLATFORM
          </h2>
          <p className="mt-2 text-center opacity-80">
            English learning and exam preparation platform for Vietnamese
            students.
          </p>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 items-center rounded-xl border border-foreground/15 bg-background/70 backdrop-blur-md p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
            <div className="flex justify-center lg:justify-start">
              <Image
                src={springboardLogoPng}
                alt="Springboard English logo"
                width={200}
                height={200}
                className="rounded-lg shadow-md"
                priority
              />
            </div>
            <div className="flex flex-col items-center lg:items-start gap-2 text-center lg:text-left max-w-prose justify-self-start">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                SPRINGBOARD ENGLISH
              </h2>
              <p className="mt-1 text-base sm:text-lg opacity-90 leading-snug">
                Leading English learning platform for Vietnamese students
                preparing for specialized English exams and competitions.
                Features intelligent online practice system with automatic
                scoring, progress tracking, rankings, and personalized learning
                paths for Chuyên Anh, HSG provincial/city, and national
                competitions.
              </p>
              <a
                href="https://app.springboard.vn/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:opacity-70 underline-offset-4 hover:underline text-base"
              >
                Visit Platform
              </a>
            </div>
          </div>
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
              <div className="flex items-center gap-6 text-foreground text-xl">
                <a
                  href="https://www.facebook.com/quoc.kiet.310772/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Facebook
                </a>
                <span className="opacity-50">|</span>
                <a
                  href="https://www.instagram.com/anh_luomm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Instagram
                </a>
                <span className="opacity-50">|</span>
                <a
                  href="https://x.com/QucKiet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
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
