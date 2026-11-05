"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertTriangle, Check, CloudUpload, Globe2, Loader2, Map as MapIcon, RotateCcw, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { loadStudio, studio, useStudioStatus } from "@/features/game-design/studio/store";
import { syncQueue, useSyncStatus } from "@/features/game-design/studio/sync";

const NAV = [
  { href: "/game_design/worlds", label: "Worlds", icon: Globe2, hint: "Quốc gia · level · món" },
  { href: "/game_design/map_studio", label: "Map Studio", icon: MapIcon, hint: "Thư viện map · vẽ 2D · xem 3D" },
  { href: "/game_design/admin", label: "Admin Tool", icon: ShieldAlert, hint: "Người chơi: coin · gem · level · map" },
];

function SyncBadge() {
  const sync = useSyncStatus();
  if (sync.status === "error") {
    return (
      <button onClick={() => void syncQueue.flush()} className="w-full flex items-center gap-2 px-2 h-8 text-[11px] uppercase tracking-wider font-semibold text-red-600 hover:underline" title={sync.error ?? "Lưu thất bại"}>
        <AlertTriangle className="w-3.5 h-3.5" /> Lưu lỗi · thử lại
      </button>
    );
  }
  if (sync.status === "saving") {
    return (
      <div className="w-full flex items-center gap-2 px-2 h-8 text-[11px] uppercase tracking-wider font-semibold text-gray-500">
        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang lưu…
      </div>
    );
  }
  if (sync.status === "saved") {
    return (
      <div className="w-full flex items-center gap-2 px-2 h-8 text-[11px] uppercase tracking-wider font-semibold text-gray-500">
        <Check className="w-3.5 h-3.5" /> Đã lưu lên server
      </div>
    );
  }
  return (
    <div className="w-full flex items-center gap-2 px-2 h-8 text-[11px] uppercase tracking-wider font-semibold text-gray-400">
      <CloudUpload className="w-3.5 h-3.5" /> Tự lưu khi chỉnh
    </div>
  );
}

function LoadGate({ children }: { children: React.ReactNode }) {
  const st = useStudioStatus();
  useEffect(() => {
    void loadStudio();
  }, []);
  if (st.status === "ready") return <>{children}</>;
  if (st.status === "error") {
    return (
      <div className="h-full grid place-items-center p-6">
        <div className="bg-white border-2 border-black p-5 max-w-md w-full">
          <div className="label-caps text-red-600">Không tải được dữ liệu</div>
          <p className="text-sm mt-1">{st.error}</p>
          <div className="mt-3 flex gap-2">
            <button className="btn-solid" onClick={() => void loadStudio()}>Thử lại</button>
            <Link href={`/team/login?next=${encodeURIComponent("/game_design/worlds")}`} className="btn-outline">Đăng nhập lại</Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="h-full grid place-items-center text-sm text-gray-500">
      <span className="inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Đang tải dữ liệu từ server…</span>
    </div>
  );
}

export default function StudioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [resetting, setResetting] = useState(false);
  const onReset = async () => {
    if (!window.confirm("Xoá toàn bộ dữ liệu trên server (worlds, levels, món, map) và nạp lại dữ liệu mẫu?")) return;
    setResetting(true);
    try {
      await studio.reset();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : "Reset thất bại");
    } finally {
      setResetting(false);
    }
  };
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f0f0f0] text-black font-sans flex">
      <nav className="w-52 shrink-0 bg-white border-r-2 border-black flex flex-col">
        <div className="h-12 px-3 flex items-center gap-2 border-b-2 border-black">
          <span className="w-2.5 h-2.5 bg-black" />
          <div className="leading-tight">
            <div className="font-bold uppercase tracking-wider text-[13px]">Kitchen Together</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Design Studio</div>
          </div>
        </div>
        <div className="p-2 flex flex-col gap-0.5">
          {NAV.map((n) => {
            const active = pathname === n.href || pathname.startsWith(n.href + "/");
            const Icon = n.icon;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn("flex items-center gap-2 px-2 h-9 text-sm font-semibold border border-transparent", active ? "bg-black text-white" : "hover:border-black")}
                title={n.hint}
              >
                <Icon className="w-4 h-4" />
                <span>{n.label}</span>
              </Link>
            );
          })}
        </div>
        <div className="mt-auto p-2 border-t border-black/15">
          <SyncBadge />
          <button
            onClick={() => void onReset()}
            disabled={resetting}
            className="w-full flex items-center gap-2 px-2 h-8 text-[11px] uppercase tracking-wider font-semibold text-gray-500 hover:text-black disabled:opacity-50"
            title="Xoá dữ liệu trên server và nạp lại dữ liệu mẫu"
          >
            <RotateCcw className={cn("w-3.5 h-3.5", resetting && "animate-spin")} /> Nạp lại dữ liệu mẫu
          </button>
          <div className="px-2 pt-1 text-[10px] text-gray-400">Vinpix Studio · internal tool · dữ liệu lưu trên server</div>
        </div>
      </nav>
      <main className="flex-1 min-w-0 min-h-0 flex flex-col">
        <LoadGate>{children}</LoadGate>
      </main>
    </div>
  );
}
