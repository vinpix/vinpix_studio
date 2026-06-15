"use client";

/** Reads/writes the active filters from the URL so filtered views are shareable. */
import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { TaskFilters, TaskStatus, TaskPriority, TeamView } from "@/types/team";

export function useTeamView() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const view = (pathname.split("/")[2] as TeamView) || "kanban";

  const filters = useMemo<TaskFilters>(
    () => ({
      assigneeId: params.get("assignee"),
      status: (params.get("status") as TaskStatus) || null,
      priority: (params.get("priority") as TaskPriority) || null,
      query: params.get("q") ?? "",
    }),
    [params]
  );

  const setFilter = useCallback(
    (key: keyof TaskFilters, value: string | null) => {
      const next = new URLSearchParams(params.toString());
      const urlKey = key === "assigneeId" ? "assignee" : key === "query" ? "q" : key;
      if (value) next.set(urlKey, value);
      else next.delete(urlKey);
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [params, pathname, router]
  );

  const clearFilters = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const hasActiveFilters =
    !!filters.assigneeId || !!filters.status || !!filters.priority || !!filters.query;

  return { view, filters, setFilter, clearFilters, hasActiveFilters };
}
