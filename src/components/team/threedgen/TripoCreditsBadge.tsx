"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import type { TripoStatus } from "@/types/batch";
import { getTripoStatus } from "@/lib/batchApi";

const REFRESH_MS = 60_000;
const CREDITS_PER_MODEL = 55; // Tripo HD v3.1

/**
 * Live Tripo credits chip for the 3D Gen board. The VPS worker pushes the
 * wallet snapshot to the lambda (hourly + after every generation); this badge
 * just reads it — no one has to open studio.tripo3d.ai to check the balance.
 */
export function TripoCreditsBadge() {
  const [status, setStatus] = useState<TripoStatus | null>(null);

  useEffect(() => {
    let alive = true;
    const load = () =>
      getTripoStatus()
        .then((s) => alive && setStatus(s))
        .catch(() => {});
    load();
    const t = setInterval(load, REFRESH_MS);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  if (!status) return null;

  const models = Math.floor(status.credits / CREDITS_PER_MODEL);
  const tone =
    status.credits < CREDITS_PER_MODEL
      ? "bg-red-100 text-red-700"
      : status.credits < CREDITS_PER_MODEL * 3
        ? "bg-amber-100"
        : "bg-white";
  const updated = new Date(status.updatedAt);
  const tooltip = [
    `Tripo ${status.plan || "?"} · còn ${status.credits} credits (~${models} model HD)`,
    status.expiringCredit
      ? `${status.expiringCredit} credits hết hạn ${status.expiringDate}`
      : "",
    `Đồng bộ lúc ${updated.toLocaleString("vi-VN")}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div
      title={tooltip}
      className={`flex shrink-0 cursor-default items-center gap-1.5 border-2 border-black px-2.5 py-1 font-mono text-[11px] font-bold tabular-nums ${tone}`}
    >
      <Zap size={12} className="fill-amber-400 text-black" />
      {status.credits.toLocaleString()} credits · ~{models} model
    </div>
  );
}
