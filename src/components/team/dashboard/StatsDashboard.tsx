"use client";

import { useMemo } from "react";
import { AlertTriangle } from "lucide-react";
import { useTeamData } from "@/hooks/useTeamData";
import { computeStats, memberMap } from "@/lib/teamUtils";
import {
  STATUS_ORDER,
  STATUS_META,
  PRIORITY_ORDER,
  PRIORITY_META,
  MEMBER_CAPACITY,
} from "@/lib/teamConstants";
import { DeadlinePill } from "../shared/badges";

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-black/45">{title}</h3>
      {children}
    </section>
  );
}

function StatCard({ value, label, alert }: { value: number; label: string; alert?: boolean }) {
  return (
    <div
      className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      style={{ borderLeftWidth: alert && value > 0 ? 6 : 2, borderLeftColor: alert && value > 0 ? "#DC2626" : "#000" }}
    >
      <div
        className="font-mono text-4xl font-black tabular-nums leading-none"
        style={{ color: alert && value > 0 ? "#DC2626" : "#000" }}
      >
        {value}
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-black/45">{label}</div>
    </div>
  );
}

function Donut({ percent }: { percent: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <svg viewBox="0 0 100 100" className="h-36 w-36 -rotate-90">
      <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="12" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="#059669"
        strokeWidth="12"
        strokeDasharray={c}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.6s ease-out" }}
      />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        className="rotate-90 fill-black font-mono text-[20px] font-black"
        style={{ transformOrigin: "center" }}
      >
        {percent}%
      </text>
    </svg>
  );
}

function BarMeter({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = max ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0 truncate text-xs font-bold">{label}</span>
      <div className="relative h-3.5 flex-1 border border-black bg-black/5">
        <div className="h-full border-r border-black" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="w-6 shrink-0 text-right font-mono text-[11px] tabular-nums text-black/60">
        {value}
      </span>
    </div>
  );
}

export function StatsDashboard() {
  const { tasks, members } = useTeamData();
  const stats = useMemo(() => computeStats(tasks), [tasks]);
  const mMap = useMemo(() => memberMap(members), [members]);

  const maxStatus = Math.max(1, ...STATUS_ORDER.map((s) => stats.byStatus[s]));

  const workload = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const t of tasks) {
      if (t.status === "hoan_thanh") continue;
      const keys = t.assigneeIds.length > 0 ? t.assigneeIds : ["__unassigned__"];
      for (const key of keys) counts[key] = (counts[key] ?? 0) + 1;
    }
    return Object.entries(counts)
      .map(([id, count]) => ({
        id,
        name: id === "__unassigned__" ? "Chưa giao" : mMap[id]?.name ?? "—",
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [tasks, mMap]);

  const totalPriority = PRIORITY_ORDER.reduce((s, p) => s + stats.byPriority[p], 0);

  return (
    <div className="space-y-5">
      {/* stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard value={stats.total} label="Tổng công việc" />
        <StatCard value={stats.done} label="Hoàn thành" />
        <StatCard value={stats.inProgress} label="Đang làm" />
        <StatCard value={stats.overdue} label="Quá hạn" alert />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* progress donut */}
        <Panel title="Tiến độ dự án">
          <div className="flex flex-col items-center gap-3">
            <Donut percent={stats.completionRate} />
            <p className="font-mono text-[11px] text-black/55">
              {stats.done}/{stats.total} hoàn thành
            </p>
          </div>
        </Panel>

        {/* status distribution */}
        <Panel title="Theo trạng thái">
          <div className="space-y-2.5">
            {STATUS_ORDER.map((s) => (
              <BarMeter
                key={s}
                label={STATUS_META[s].label}
                value={stats.byStatus[s]}
                max={maxStatus}
                color={STATUS_META[s].accent}
              />
            ))}
          </div>
        </Panel>

        {/* upcoming deadlines */}
        <Panel title="Hạn sắp tới">
          {stats.upcoming.length === 0 ? (
            <p className="font-mono text-[11px] text-black/40">Không có hạn sắp tới</p>
          ) : (
            <ul className="space-y-2.5">
              {stats.upcoming.map((t) => (
                <li key={t.task_id} className="flex items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="font-mono text-[10px] text-black/40">{t.code}</span>
                    <span className="truncate text-xs font-medium">{t.name}</span>
                  </span>
                  <DeadlinePill deadline={t.deadline} done={false} />
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* workload */}
        <Panel title="Khối lượng / thành viên (đang mở)">
          {workload.length === 0 ? (
            <p className="font-mono text-[11px] text-black/40">Chưa có dữ liệu</p>
          ) : (
            <div className="space-y-2.5">
              {workload.map((w) => (
                <BarMeter
                  key={w.id}
                  label={w.name}
                  value={w.count}
                  max={Math.max(MEMBER_CAPACITY, ...workload.map((x) => x.count))}
                  color={w.count > MEMBER_CAPACITY ? "#DC2626" : "#2563EB"}
                />
              ))}
            </div>
          )}
        </Panel>

        {/* priority distribution */}
        <Panel title="Phân bố ưu tiên">
          <div className="flex h-7 w-full overflow-hidden border-2 border-black">
            {PRIORITY_ORDER.map((p) =>
              stats.byPriority[p] > 0 ? (
                <div
                  key={p}
                  className="flex items-center justify-center border-r border-black text-[11px] font-black text-white last:border-r-0"
                  style={{
                    width: `${(stats.byPriority[p] / totalPriority) * 100}%`,
                    background: PRIORITY_META[p].accent,
                  }}
                  title={`${PRIORITY_META[p].label}: ${stats.byPriority[p]}`}
                >
                  {stats.byPriority[p]}
                </div>
              ) : null
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            {PRIORITY_ORDER.map((p) => (
              <span key={p} className="flex items-center gap-1.5 text-xs font-medium">
                <span className="h-3 w-3 border border-black" style={{ background: PRIORITY_META[p].accent }} />
                {PRIORITY_META[p].label} ({stats.byPriority[p]})
              </span>
            ))}
          </div>
          {stats.overdue > 0 && (
            <p className="mt-4 flex items-center gap-1.5 font-mono text-[11px] font-bold text-red-600">
              <AlertTriangle size={13} /> {stats.overdue} công việc quá hạn cần xử lý
            </p>
          )}
        </Panel>
      </div>
    </div>
  );
}
