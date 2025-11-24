"use client";

import type { CreatorPulseSummary } from "@/lib/types/map";

interface MapStatsProps {
  stats: CreatorPulseSummary["body"];
  className?: string;
}

export default function MapStats({ stats, className = "" }: MapStatsProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      <div className="border-2 border-black p-4 bg-[#F0F0F0]">
        <p className="text-sm font-bold uppercase opacity-60">Total Plays</p>
        <p className="text-3xl font-black">
          {stats.totals.plays.toLocaleString()}
        </p>
      </div>
      <div className="border-2 border-black p-4 bg-[#F0F0F0]">
        <p className="text-sm font-bold uppercase opacity-60">Total Likes</p>
        <p className="text-3xl font-black">
          {stats.totals.likes.toLocaleString()}
        </p>
      </div>
      <div className="border-2 border-black p-4 bg-white">
        <p className="text-sm font-bold uppercase opacity-60">Revenue (Gems)</p>
        <p className="text-3xl font-black">
          {stats.totals.revenue_gems.toLocaleString()}
        </p>
      </div>
      <div className="border-2 border-black p-4 bg-white">
        <p className="text-sm font-bold uppercase opacity-60">
          Revenue (Coins)
        </p>
        <p className="text-3xl font-black">
          {stats.totals.revenue_coins.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
