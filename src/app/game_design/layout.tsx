import type { Metadata } from "next";
import StudioShell from "@/components/game-design/studio/StudioShell";
import "@/components/game-design/studio/studio.css";

export const metadata: Metadata = {
  title: "Game Design Studio · Kitchen Together",
  description: "Worlds, levels, map studio and recipes for Kitchen Together.",
  robots: { index: false, follow: false },
};

export default function GameDesignLayout({ children }: { children: React.ReactNode }) {
  return <StudioShell>{children}</StudioShell>;
}
