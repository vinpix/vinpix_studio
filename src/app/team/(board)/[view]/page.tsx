"use client";

import { useParams } from "next/navigation";
import type { TeamView } from "@/types/team";
import { useTeamData } from "@/hooks/useTeamData";
import { KanbanBoard } from "@/components/team/kanban/KanbanBoard";
import { TaskTable } from "@/components/team/table/TaskTable";
import { StatsDashboard } from "@/components/team/dashboard/StatsDashboard";
import { MemberBoard } from "@/components/team/members/MemberBoard";
import { EmptyState } from "@/components/team/shared/EmptyState";

const VALID: TeamView[] = ["kanban", "table", "dashboard", "members"];

export default function TeamViewPage() {
  const params = useParams<{ view: string }>();
  const view = (VALID.includes(params.view as TeamView) ? params.view : "kanban") as TeamView;
  const { state, error } = useTeamData();

  if (state === "loading") {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent" />
      </div>
    );
  }

  if (state === "error") {
    return <EmptyState message={`Lỗi tải dữ liệu: ${error ?? ""}`} />;
  }

  switch (view) {
    case "table":
      return <TaskTable />;
    case "dashboard":
      return <StatsDashboard />;
    case "members":
      return <MemberBoard />;
    default:
      return <KanbanBoard />;
  }
}
