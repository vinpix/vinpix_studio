"use client";

import { Suspense } from "react";
import { ToastProvider, useToast } from "@/components/team/shared/Toast";
import { TeamDataProvider } from "@/hooks/useTeamData";
import { TaskPanelProvider } from "@/components/team/shared/TaskPanel";
import { TeamShell } from "@/components/team/TeamShell";

function BoardInner({ children }: { children: React.ReactNode }) {
  const { notify } = useToast();
  return (
    <TeamDataProvider onToast={notify}>
      <TaskPanelProvider>
        <TeamShell>{children}</TeamShell>
      </TaskPanelProvider>
    </TeamDataProvider>
  );
}

export default function BoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <Suspense fallback={null}>
        <BoardInner>{children}</BoardInner>
      </Suspense>
    </ToastProvider>
  );
}
