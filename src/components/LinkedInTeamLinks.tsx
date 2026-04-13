import Image from "next/image";

const teamLinkedInProfiles = [
  {
    name: "Kiet Le",
    role: "Founder",
    href: "https://www.linkedin.com/in/anhluom/",
    avatarSrc: "/founder_avatar.gif",
    avatarAlt: "Kiet Le avatar",
  },
  {
    name: "Daisy Bui",
    role: "Project Manager",
    href: "https://www.linkedin.com/in/maithuongbui172/",
    avatarSrc: "/daisy-bui-avatar.jpg",
    avatarAlt: "Daisy Bui avatar",
  },
] as const;

type LinkedInTeamLinksProps = {
  eyebrow?: string;
  className?: string;
};

export default function LinkedInTeamLinks({
  eyebrow = "Team on LinkedIn",
  className = "",
}: LinkedInTeamLinksProps) {
  return (
    <div className={["flex flex-col gap-3", className].filter(Boolean).join(" ")}>
      {eyebrow ? (
        <span className="text-xs font-bold uppercase tracking-[0.28em] text-white/40">
          {eyebrow}
        </span>
      ) : null}

      {teamLinkedInProfiles.map((profile) => (
        <a
          key={profile.href}
          href={profile.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-full border border-white/15 bg-white/5 px-3 py-3 text-white transition-all duration-300 hover:border-white/35 hover:bg-white/10"
        >
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-white/20 bg-white/10">
            <Image
              src={profile.avatarSrc}
              alt={profile.avatarAlt}
              fill
              sizes="56px"
              className="object-cover"
              unoptimized={profile.avatarSrc.endsWith(".gif")}
            />
          </div>

          <div className="min-w-0 flex-1">
            <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-white/45">
              {profile.role}
            </span>
            <span className="mt-1 flex items-center gap-2 text-sm font-medium sm:text-base">
              <span className="truncate">{profile.name}</span>
              <span className="text-white/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
