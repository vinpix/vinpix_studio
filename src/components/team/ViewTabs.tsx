"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { VIEW_TABS } from "@/lib/teamConstants";
import type { TeamView } from "@/types/team";

export function ViewTabs({ active }: { active: TeamView }) {
  const router = useRouter();
  return (
    <div className="inline-flex border-2 border-black bg-white" role="tablist" aria-label="Chế độ xem">
      {VIEW_TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => router.push(`/team/${tab.key}`)}
            className={`relative px-3.5 py-2 text-xs font-bold uppercase tracking-wide transition-colors sm:px-5 ${
              isActive ? "text-white" : "text-black/55 hover:text-black"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="teamViewActive"
                className="absolute inset-0 bg-black"
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
