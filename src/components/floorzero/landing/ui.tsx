import Image from "next/image";
import type { ReactNode } from "react";
import { LANDING_ASSETS } from "./data";

/** Pixel-art image at an integer multiple of its native size. */
export function Sprite({
  dir,
  file,
  w,
  h,
  scale,
  alt = "",
  className = "",
  priority,
}: {
  dir: "roster" | "weapons" | "bosses" | "shots";
  file: string;
  w: number;
  h: number;
  scale: number;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={`${LANDING_ASSETS}/${dir}/${file}.png`}
      alt={alt}
      width={w * scale}
      height={h * scale}
      priority={priority}
      unoptimized
      className={`fz-px max-w-full ${className}`}
      style={{ imageRendering: "pixelated", height: "auto" }}
    />
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <p
        className="fz-pixel text-xs sm:text-sm uppercase tracking-[0.2em]"
        style={{ color: "var(--fz-yellow)" }}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className="fz-pixel mt-3 text-[1.7rem] leading-[1.15] sm:text-4xl font-bold uppercase"
        style={{ textShadow: "3px 3px 0 #000" }}
      >
        {title}
      </h2>
      {children ? (
        <div className="mt-4 text-base sm:text-lg leading-relaxed" style={{ color: "var(--fz-muted)" }}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function Section({
  id,
  labelledBy,
  children,
  className = "",
  tone = "dark",
}: {
  id?: string;
  labelledBy: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "panel";
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative scroll-mt-4 px-4 py-16 sm:px-6 sm:py-24 ${className}`}
      style={{
        background: tone === "panel" ? "var(--fz-panel)" : "transparent",
        borderTop: "4px solid #000",
      }}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
