"use client";

import { useRouter } from "next/navigation";
import { Plus, LogOut, RefreshCw } from "lucide-react";
import { useTeamData } from "@/hooks/useTeamData";
import { useTeamView } from "@/hooks/useTeamView";
import { useTaskPanel } from "./shared/TaskPanel";
import { FilterBar } from "./shared/FilterBar";
import { ViewTabs } from "./ViewTabs";
import { logoutTeam } from "@/lib/teamAuth";
import { computeStats } from "@/lib/teamUtils";

export function TeamShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { tasks, members, refetch } = useTeamData();
  const { view } = useTeamView();
  const { openCreate } = useTaskPanel();
  const stats = computeStats(tasks);

  // Smart Chat is a full-screen app (own sidebar + scroll regions); give it the
  // whole viewport below the header and drop the task-specific header controls.
  const isChat = view === "smart-chat";

  const handleLogout = async () => {
    await logoutTeam();
    router.push("/team/login");
  };

  return (
    <div
      className={`relative flex flex-col bg-[#F0F0F0] text-black ${
        isChat ? "h-screen overflow-hidden" : "min-h-screen"
      }`}
    >
      {/* grid texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03] print:hidden"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {isChat ? (
        /* Slim header for Smart Chat — maximize vertical space for the chat. */
        <header className="relative z-10 border-b-2 border-black bg-white px-5 py-2 sm:px-8">
          <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex shrink-0 items-baseline gap-2">
              <span className="text-lg font-black uppercase leading-none tracking-tight">
                Nhóm
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/40">
                Smart Chat
              </span>
            </div>
            <ViewTabs active={view} />
            <button
              onClick={handleLogout}
              className="ml-auto flex h-8 w-8 items-center justify-center border-2 border-black bg-white transition-colors hover:bg-red-50 hover:text-red-600"
              title="Đăng xuất"
              aria-label="Đăng xuất"
            >
              <LogOut size={14} />
            </button>
          </div>
        </header>
      ) : (
        <header className="relative z-10 border-b-2 border-black bg-white px-5 py-4 sm:px-8">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/45">
                  Vinpix Studio · Kitchen Together
                </p>
                <h1 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
                  Nhóm
                </h1>
                <p className="mt-0.5 font-mono text-[11px] text-black/55">
                  {members.length} thành viên · {stats.total} công việc ·{" "}
                  <span style={{ color: stats.overdue ? "#DC2626" : undefined }}>
                    {stats.overdue} quá hạn
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => refetch()}
                  className="flex h-9 w-9 items-center justify-center border-2 border-black bg-white transition-colors hover:bg-black/5"
                  title="Tải lại"
                  aria-label="Tải lại"
                >
                  <RefreshCw size={15} />
                </button>
                <button
                  onClick={openCreate}
                  className="flex items-center gap-1.5 border-2 border-black bg-black px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-white transition-transform active:translate-y-0.5"
                >
                  <Plus size={15} /> Công việc
                </button>
                <button
                  onClick={handleLogout}
                  className="flex h-9 w-9 items-center justify-center border-2 border-black bg-white transition-colors hover:bg-red-50 hover:text-red-600"
                  title="Đăng xuất"
                  aria-label="Đăng xuất"
                >
                  <LogOut size={15} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <ViewTabs active={view} />
              {view !== "dashboard" && view !== "notes" && view !== "3d-gen" && (
                <FilterBar members={members} />
              )}
            </div>
          </div>
        </header>
      )}

      {isChat ? (
        <main className="relative z-10 min-h-0 flex-1 overflow-hidden px-5 pb-5 sm:px-8 sm:pb-8">
          <div className="mx-auto h-full max-w-[1600px]">{children}</div>
        </main>
      ) : (
        <main className="relative z-10 flex-1 overflow-x-hidden px-5 py-6 sm:px-8">
          <div className="mx-auto max-w-[1600px]">{children}</div>
        </main>
      )}
    </div>
  );
}
