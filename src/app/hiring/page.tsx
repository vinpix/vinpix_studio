import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Vinpix Studio | Hiring — Intern Cohort 2026",
  description:
    "Vinpix Studio is hiring builders to ship the next iteration of Kitchen Together — a live game with 100,000+ downloads. Open roles: Game Designer, QA, Game Artist.",
};

type Role = {
  index: string;
  slug: string;
  title: string;
  accent?: string;
  tags: string[];
  scope: string[];
  requirements: string[];
};

const INK = "#0A0A0A";
const HAIRLINE = "border-[#0A0A0A]/15";

const ROLES: Role[] = [
  {
    index: "01",
    slug: "role-01",
    title: "GAME DESIGNER",
    tags: ["HCMC", "PART-TIME", "INTERN", "NO EXP. REQUIRED", "≤ 4M VND/MO"],
    scope: [
      "Design gameplay, levels, characters, missions, and in-game mechanics",
      "Write design docs: gameplay flow, rules, balance, UI/UX flow, level design",
      "Work with Devs, Artists, and Testers to ship features",
      "Analyze player experience and propose gameplay improvements",
      "Tune difficulty, rewards, and operational logic",
    ],
    requirements: [
      "Strong taste in games across multiple genres",
      "Logical thinking, gameplay & player behavior analysis",
      "Can present ideas via docs, diagrams, or basic wireframes",
      "Plus: game jams, prototypes, board games, mods, portfolio",
      "Plus: Figma, Notion, Miro, Google Docs/Sheets",
    ],
  },
  {
    index: "02",
    slug: "role-02",
    title: "GAME TESTER / QA",
    accent: "text-[#E63946]",
    tags: [
      "HCMC",
      "PART-TIME",
      "INTERN",
      "VOLUNTEER",
      "NO EXP. REQUIRED",
      "≤ 4M VND/MO",
    ],
    scope: [
      "Play-test the game against checklists and test cases",
      "Log, describe, and report bugs clearly to the dev team",
      "Test gameplay, UI, audio, FX, mission logic, level, and player experience",
      "Re-test fixed issues and confirm results",
      "Suggest improvements to flow, difficulty, and clarity",
      "Cross-device / cross-platform testing when needed",
    ],
    requirements: [
      "Detail-oriented, patient, and observant",
      "Loves playing games and can spot what feels off",
      "Writes clear bug reports: repro steps, actual vs expected, screenshots/video",
      "Accountable, on deadline, willing to repeat-test",
      "Plus: Jira, Trello, Notion, Sheets, prior QA experience",
    ],
  },
  {
    index: "03",
    slug: "role-03",
    title: "GAME ARTIST 2D/3D",
    accent: "text-[#1D6FE0]",
    tags: [
      "HCMC",
      "FULL-TIME",
      "PART-TIME",
      "INTERN",
      "VOLUNTEER",
      "PORTFOLIO REQUIRED",
      "≤ 4M VND/MO",
    ],
    scope: [
      "Design game assets: characters, items, backgrounds, icons, UI, FX, 3D models",
      "Work with Designer & Dev to align visuals with gameplay",
      "Iterate on assets based on feedback and optimize for the build",
      "Help define visual style for the product",
      "Produce mockups, concept art, sprites, simple animation",
      "Hit specs on dimensions, format, and style",
    ],
    requirements: [
      "Strong eye for color, composition, and form",
      "Fluent in one or more: Photoshop, Illustrator, Procreate, Blender, Spine, Aseprite, Figma",
      "Portfolio is a strong priority / near-required",
      "Takes feedback well; iterates with product direction",
      "Proactive, creative, accountable for output quality",
      "Plus: shipped game assets, concept art, pixel art, UI, animation, 3D",
    ],
  },
];

const PERKS: string[] = [
  "Ship directly into Kitchen Together — a live game with 100,000+ downloads",
  "Work with real users, real feedback, real market signals",
  "Touch multiple layers: gameplay, level, UI, bugs, balance, assets, UX",
  "Propose and prototype your own ideas — not just side-tasks",
  "Learn the full pipeline: idea → prototype → test → polish → release",
  "Small, sharp team — built for people who like to dig in and learn fast",
  "Shippable work for your CV / portfolio after the internship",
  "Direct feedback from the team to sharpen your craft",
  "Path to full-time if you deliver",
  "Flexible hours, negotiated case by case",
  "Internship confirmation / stamp provided on request",
  "Allowance / pay negotiated based on capability and commitment",
];

function DocLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs tracking-[0.18em] uppercase text-[#0A0A0A]/70">
      {children}
    </span>
  );
}

function Tag({ children, solid }: { children: React.ReactNode; solid?: boolean }) {
  return (
    <span
      className={`inline-flex items-center font-mono text-[10px] sm:text-xs tracking-[0.15em] uppercase whitespace-nowrap px-2.5 py-1 border border-[#0A0A0A] transition-transform active:scale-[0.97] ${
        solid ? "bg-[#0A0A0A] text-white" : "bg-transparent text-[#0A0A0A]"
      }`}
    >
      {children}
    </span>
  );
}

function ArrowItem({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} duration={0.4} y={20} width="100%">
      <li className="flex gap-3 leading-snug list-none">
        <span className="font-mono text-[#0A0A0A]/60 select-none mt-[2px]">→</span>
        <span className="text-sm sm:text-base">{children}</span>
      </li>
    </Reveal>
  );
}

function buildMailto(roleLabel: string): string {
  const subject = encodeURIComponent(
    `[VINPIX-INTERN] ${roleLabel} — Your Name`
  );
  return `mailto:kietle@vinpixstudio.com?subject=${subject}`;
}

export default function HiringPage() {
  return (
    <main
      className="min-h-[100dvh] text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-white font-sans"
      style={{ backgroundColor: "#F0F0F0" }}
    >
      {/* ============================================================ */}
      {/* HERO */}
      {/* ============================================================ */}
      <section className={`px-6 sm:px-12 pt-32 sm:pt-40 pb-12 sm:pb-20 border-b ${HAIRLINE} max-w-[1920px] mx-auto`}>
        <div className="flex items-center justify-between mb-12 sm:mb-20">
          <DocLabel>// HIRING — INTERN COHORT 2026</DocLabel>
          <DocLabel>DOC 01 / 01</DocLabel>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-9">
            <Reveal>
              <h1 className="font-black tracking-tighter uppercase leading-[0.85] text-[clamp(3.25rem,15vw,11rem)]">
                Build
                <br />
                Real
                <br />
                <span className="inline-flex items-end gap-3 sm:gap-5">
                  <span>Games.</span>
                  <span
                    aria-hidden
                    className="inline-block bg-[#E63946] mb-[0.18em] h-[0.12em] w-[1.1em] sm:w-[1.4em]"
                  />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.35}>
              <p className="mt-8 sm:mt-10 max-w-2xl text-lg sm:text-2xl leading-snug">
                Independent software studio looking for builders to ship the
                next iteration of{" "}
                <span className="font-bold">Kitchen Together</span> — a live
                game with 100,000+ downloads.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.5}>
          <div className={`mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-4 border-t border-[#0A0A0A] pt-6`}>
            <div>
              <DocLabel>ROLES OPEN</DocLabel>
              <div className="mt-2 text-3xl sm:text-4xl font-black tracking-tight tabular-nums">
                03
              </div>
            </div>
            <div>
              <DocLabel>LOCATION</DocLabel>
              <div className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
                Ho Chi Minh
              </div>
            </div>
            <div>
              <DocLabel>COMMITMENT</DocLabel>
              <div className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
                Flexible
              </div>
            </div>
            <div>
              <DocLabel>DEADLINE</DocLabel>
              <div className="mt-2 text-2xl sm:text-3xl font-black tracking-tight tabular-nums">
                20.06.2026
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============================================================ */}
      {/* ABOUT */}
      {/* ============================================================ */}
      <section className="px-6 sm:px-12 py-12 sm:py-16 text-white" style={{ backgroundColor: INK }}>
        <div className="max-w-[1920px] mx-auto">
          <span className="font-mono text-xs tracking-[0.18em] uppercase text-white/60">
            // ABOUT THE STUDIO
          </span>
          <Reveal>
            <p className="mt-4 max-w-5xl text-xl sm:text-3xl leading-tight font-medium">
              Vinpix Studio is an{" "}
              <span className="font-black">independent software studio</span>{" "}
              building products, games, and AI-powered workflows. We ship things
              that real people use — and we want builders who like working
              hands-on with real code, real players, and real feedback.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* OPEN ROLES HEADER + ANCHOR NAV */}
      {/* ============================================================ */}
      <section className="px-6 sm:px-12 pt-14 sm:pt-20 pb-4 max-w-[1920px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 border-b-2 border-[#0A0A0A] pb-6">
          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase">
            Open Roles
          </h2>
          <DocLabel>03 POSITIONS · INTERN / PART-TIME / VOLUNTEER</DocLabel>
        </div>

        {/* Anchor jump nav */}
        <nav
          aria-label="Jump to role"
          className={`mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono tracking-[0.18em] uppercase pb-1`}
        >
          {ROLES.map((r) => (
            <a
              key={r.slug}
              href={`#${r.slug}`}
              className="text-[#0A0A0A]/60 hover:text-[#0A0A0A] transition-colors"
            >
              <span className="text-[#0A0A0A]">{r.index}</span> · {r.title}
            </a>
          ))}
        </nav>
      </section>

      {/* ============================================================ */}
      {/* ROLES LIST */}
      {/* ============================================================ */}
      <section className="px-6 sm:px-12 max-w-[1920px] mx-auto">
        {ROLES.map((role) => (
          <article
            key={role.index}
            id={role.slug}
            className={`scroll-mt-24 border-b ${HAIRLINE} py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12`}
          >
            <div className="lg:col-span-3">
              <DocLabel>ROLE {role.index} /</DocLabel>
              <h3
                className={`mt-3 text-4xl sm:text-5xl font-black tracking-tighter uppercase leading-[0.95] ${
                  role.accent ?? ""
                }`}
              >
                {role.title}
              </h3>

              <a
                href={buildMailto(role.title)}
                className="hidden lg:inline-flex mt-8 items-center gap-2 font-mono text-xs tracking-[0.18em] uppercase border border-[#0A0A0A] px-3 py-2 hover:bg-[#0A0A0A] hover:text-white transition-colors active:translate-y-[1px]"
              >
                Apply for this role <span aria-hidden>→</span>
              </a>
            </div>

            <div className="lg:col-span-9">
              {/* Tags — horizontal scroll on mobile to avoid wrapping mess */}
              <Reveal>
                <div
                  className="-mx-6 sm:mx-0 px-6 sm:px-0 mb-8 flex sm:flex-wrap gap-2 overflow-x-auto sm:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
                  style={{ scrollbarWidth: "none" }}
                >
                  {role.tags.map((tag, i) => (
                    <div key={tag} className="snap-start shrink-0">
                      <Tag solid={i === 0}>{tag}</Tag>
                    </div>
                  ))}
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                <div>
                  <DocLabel>// SCOPE</DocLabel>
                  <ul className={`mt-4 space-y-3 border-t ${HAIRLINE} pt-4`}>
                    {role.scope.map((item, i) => (
                      <ArrowItem key={item} delay={i * 0.04}>
                        {item}
                      </ArrowItem>
                    ))}
                  </ul>
                </div>
                <div>
                  <DocLabel>// REQUIREMENTS</DocLabel>
                  <ul className={`mt-4 space-y-3 border-t ${HAIRLINE} pt-4`}>
                    {role.requirements.map((item, i) => (
                      <ArrowItem key={item} delay={i * 0.04}>
                        {item}
                      </ArrowItem>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mobile-only apply button */}
              <a
                href={buildMailto(role.title)}
                className="lg:hidden mt-8 inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] uppercase border border-[#0A0A0A] px-3 py-2 hover:bg-[#0A0A0A] hover:text-white transition-colors active:translate-y-[1px]"
              >
                Apply for this role <span aria-hidden>→</span>
              </a>
            </div>
          </article>
        ))}
      </section>

      {/* ============================================================ */}
      {/* WHAT YOU GET — divide-line grid (anti-card) */}
      {/* ============================================================ */}
      <section className="px-6 sm:px-12 pt-14 sm:pt-20 pb-12 max-w-[1920px] mx-auto">
        <DocLabel>// WHAT YOU GET</DocLabel>
        <Reveal>
          <h2 className="mt-3 text-5xl sm:text-7xl font-black tracking-tighter uppercase">
            Real Product. Real Feedback.
          </h2>
        </Reveal>

        <div
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px border border-[#0A0A0A]/15"
          style={{ backgroundColor: "rgba(10,10,10,0.15)" }}
        >
          {PERKS.map((perk, i) => (
            <div
              key={perk}
              className="flex gap-5 py-5 sm:py-6 px-5 md:px-6"
              style={{ backgroundColor: "#F0F0F0" }}
            >
              <span className="font-mono text-xs tracking-[0.18em] text-[#0A0A0A]/45 pt-1 shrink-0 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm sm:text-base leading-snug">{perk}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* APPLY */}
      {/* ============================================================ */}
      <section className="px-6 sm:px-12 py-14 sm:py-20 text-white" style={{ backgroundColor: INK }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-7">
            <span className="font-mono text-xs tracking-[0.18em] uppercase text-white/60">
              // HOW TO APPLY
            </span>
            <Reveal>
              <h2 className="mt-4 font-black tracking-tighter uppercase leading-[0.9] text-[clamp(3.5rem,12vw,8rem)]">
                Apply
                <br />
                <span className="inline-flex items-end gap-3">
                  <span>Direct.</span>
                  <span
                    aria-hidden
                    className="inline-block bg-[#E63946] mb-[0.18em] h-[0.12em] w-[0.9em]"
                  />
                </span>
              </h2>
            </Reveal>

            <p className="mt-8 text-lg sm:text-xl max-w-xl leading-snug">
              Send CV and portfolio (if any) to{" "}
              <span className="font-bold">kietle@vinpixstudio.com</span>. Subject
              line:
            </p>
            <div className="mt-3 inline-block bg-white/10 border border-white/20 px-3 py-1.5 font-mono text-sm tracking-wide">
              [VINPIX-INTERN] Role — Your Name
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={buildMailto("Role")}
                className="inline-flex items-center justify-center gap-3 bg-[#E63946] hover:bg-white hover:text-[#0A0A0A] text-white font-bold uppercase tracking-widest px-6 sm:px-8 py-4 text-sm sm:text-base transition-colors active:translate-y-[1px] active:scale-[0.99]"
              >
                kietle@vinpixstudio.com
                <span aria-hidden>→</span>
              </a>
            </div>

            {/* Per-role quick apply */}
            <div className="mt-6 flex flex-wrap gap-2">
              {ROLES.map((r) => (
                <a
                  key={r.slug}
                  href={buildMailto(r.title)}
                  className="font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase border border-white/30 px-3 py-2 hover:bg-white hover:text-[#0A0A0A] transition-colors active:translate-y-[1px]"
                >
                  Apply · {r.index} {r.title}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-white/30 p-6 sm:p-8">
              <span className="font-mono text-xs tracking-[0.18em] uppercase text-white/60">
                SUBMISSION DEADLINE
              </span>
              <div className="mt-3 text-4xl sm:text-5xl font-black tracking-tight tabular-nums">
                20 · 06 · 2026
              </div>
              <div className="mt-2 font-mono text-xs tracking-[0.18em] text-white/60 uppercase">
                23:59 — Indochina Time (UTC+7)
              </div>
            </div>

            <p className="mt-6 text-xs sm:text-sm text-white/60 leading-snug max-w-md">
              Due to volume, Vinpix Studio may only respond to shortlisted
              candidates by email. Please monitor your Spam and Promotions
              folders so you don&apos;t miss our reply.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER */}
      {/* ============================================================ */}
      <footer className={`px-6 sm:px-12 py-8 border-t ${HAIRLINE} max-w-[1920px] mx-auto`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <DocLabel>© VINPIX STUDIO · VINPIXSTUDIO.COM</DocLabel>
          <DocLabel>
            KIETLE@VINPIXSTUDIO.COM · BUILD · SHIP · ITERATE
          </DocLabel>
        </div>
      </footer>
    </main>
  );
}
