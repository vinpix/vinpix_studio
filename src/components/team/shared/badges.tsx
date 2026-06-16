"use client";

/** Small presentational primitives: status badge, priority chip, progress bar, deadline pill, avatar. */
import type { Task, Member, TaskStatus, TaskPriority } from "@/types/team";
import { STATUS_META, PRIORITY_META, OVERDUE_COLOR, SOON_COLOR } from "@/lib/teamConstants";
import { getDeadlineInfo, initials } from "@/lib/teamUtils";

export function StatusDot({ status, size = 9 }: { status: TaskStatus; size?: number }) {
  return (
    <span
      className="inline-block shrink-0 rounded-full"
      style={{ width: size, height: size, background: STATUS_META[status].accent }}
    />
  );
}

export function StatusBadge({ status }: { status: TaskStatus }) {
  const m = STATUS_META[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 border border-black px-2 py-0.5 text-[11px] font-bold whitespace-nowrap"
      style={{ background: m.tint }}
    >
      <StatusDot status={status} />
      {m.label}
    </span>
  );
}

export function PriorityChip({ priority, showLabel = true }: { priority: TaskPriority; showLabel?: boolean }) {
  const m = PRIORITY_META[priority];
  return (
    <span
      className="inline-flex items-center gap-1 border border-black px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide whitespace-nowrap"
      style={{ background: m.bg, color: m.text }}
    >
      {showLabel ? m.label : m.emoji}
    </span>
  );
}

export function ProgressBar({ value, status }: { value: number; status: TaskStatus }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-2.5 flex-1 border border-black bg-black/5">
        <div
          className="h-full border-r border-black transition-[width] duration-300"
          style={{ width: `${v}%`, background: STATUS_META[status].accent }}
        />
      </div>
      <span className="font-mono text-[10px] tabular-nums text-black/60">{v}%</span>
    </div>
  );
}

export function DeadlinePill({ deadline, done }: { deadline: string; done: boolean }) {
  const info = getDeadlineInfo(deadline, done);
  if (info.state === "none") return <span className="font-mono text-[11px] text-black/30">—</span>;
  const color =
    info.state === "overdue" ? OVERDUE_COLOR : info.state === "soon" ? SOON_COLOR : "rgba(0,0,0,0.6)";
  const tag =
    info.state === "overdue"
      ? `⚠ ${info.label}`
      : info.days === 0
      ? "Hôm nay"
      : info.label;
  return (
    <span
      className="font-mono text-[11px] font-bold whitespace-nowrap"
      style={{ color }}
    >
      {tag}
    </span>
  );
}

export function MemberAvatar({
  member,
  size = 24,
}: {
  member?: Member;
  size?: number;
}) {
  const label = member ? initials(member.name) : "?";
  const animCls =
    "transition-transform duration-200 ease-out hover:z-10 hover:-translate-y-0.5 hover:scale-110 hover:-rotate-3 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
  if (member?.avatar) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={member.avatar}
        alt={member.name}
        width={size}
        height={size}
        className={`relative inline-block shrink-0 border border-black object-cover ${animCls}`}
        style={{ width: size, height: size }}
        title={member.name}
      />
    );
  }
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center border border-black bg-black font-mono font-bold text-white ${animCls}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      title={member?.name ?? "Chưa giao"}
    >
      {label}
    </span>
  );
}

export function AssigneeTag({ member }: { member?: Member }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-black/70">
      <MemberAvatar member={member} size={20} />
      <span className="truncate">{member?.name ?? "Chưa giao"}</span>
    </span>
  );
}

/** Overlapping avatars for a task's multiple assignees. */
export function AvatarGroup({
  members,
  size = 20,
  max = 3,
}: {
  members: Member[];
  size?: number;
  max?: number;
}) {
  if (members.length === 0) return <MemberAvatar size={size} />;
  const shown = members.slice(0, max);
  const extra = members.length - shown.length;
  const overlap = Math.round(size * 0.32);
  return (
    <span className="inline-flex items-center">
      {shown.map((m, i) => (
        <span key={m.member_id} style={{ marginLeft: i === 0 ? 0 : -overlap }} className="relative">
          <MemberAvatar member={m} size={size} />
        </span>
      ))}
      {extra > 0 && (
        <span
          className="relative inline-flex items-center justify-center border border-black bg-white font-mono font-bold"
          style={{ marginLeft: -overlap, width: size, height: size, fontSize: size * 0.38 }}
          title={`+${extra}`}
        >
          +{extra}
        </span>
      )}
    </span>
  );
}

/** Resolve a task's assignee ids to member objects via a lookup map. */
export function assigneesOf(
  ids: string[],
  map: Record<string, Member>
): Member[] {
  return ids.map((id) => map[id]).filter((m): m is Member => Boolean(m));
}
