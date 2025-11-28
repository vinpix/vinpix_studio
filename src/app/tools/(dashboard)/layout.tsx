"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { logoutAdmin, AdminUser } from "@/lib/auth";
import {
  Video,
  Mic,
  FileText,
  FileSignature,
  LogOut,
  LayoutGrid,
  Settings,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

// --- Context ---
const AdminContext = createContext<AdminUser | null>(null);

export const useAdminUser = () => useContext(AdminContext);

// --- Components ---

const SidebarItem = ({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 border-b border-black/5 ${
      active
        ? "bg-black text-white"
        : "hover:bg-black/5 text-black/60 hover:text-black"
    }`}
  >
    <Icon size={18} />
    {label}
    {active && (
      <motion.div
        layoutId="activeIndicator"
        className="ml-auto w-1.5 h-1.5 bg-white rounded-full"
      />
    )}
  </button>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    // Just load user profile for display
    // Security is handled by Middleware, so we don't need verification logic here
    const storedUser = localStorage.getItem("vinpix_admin_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
  }, []);

  const handleLogout = async () => {
    await logoutAdmin();
    localStorage.removeItem("vinpix_admin_user");
    router.push("/tools/login");
  };

  const isContractActive = pathname?.startsWith("/tools/contract");
  const isDashboardActive = pathname === "/tools";

  // Determine title based on path
  const getPageTitle = () => {
    if (isDashboardActive) return "Overview";
    if (isContractActive) return "Contracts";
    if (pathname?.includes("video")) return "Video Tools";
    if (pathname?.includes("audio")) return "Audio Tools";
    if (pathname?.includes("text")) return "Text Tools";
    if (pathname?.includes("settings")) return "Settings";
    return "Tools";
  };

  return (
    <AdminContext.Provider value={user}>
      <div className="min-h-screen bg-[#F0F0F0] text-black font-sans flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r-2 border-black flex flex-col z-10 shrink-0 print:hidden">
          <div className="p-6 border-b-2 border-black bg-black text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-black text-xl leading-none">
                V
              </div>
              <div>
                <h1 className="font-black uppercase tracking-tight text-lg leading-none">
                  Vinpix
                </h1>
                <p className="text-[10px] font-mono opacity-70 tracking-widest">
                  STUDIO TOOLS
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-4 mb-2 text-xs font-bold text-black/40 uppercase tracking-widest">
              Core
            </div>
            <SidebarItem
              icon={LayoutGrid}
              label="Dashboard"
              active={isDashboardActive}
              onClick={() => router.push("/tools")}
            />

            <div className="px-4 mb-2 mt-6 text-xs font-bold text-black/40 uppercase tracking-widest">
              Modules
            </div>
            <SidebarItem
              icon={Video}
              label="Video Tools"
              active={pathname === "/tools/video"}
              onClick={() => router.push("/tools/video")}
            />
            <SidebarItem
              icon={Mic}
              label="Audio Tools"
              active={pathname === "/tools/audio"}
              onClick={() => router.push("/tools/audio")}
            />
            <SidebarItem
              icon={FileText}
              label="Text Tools"
              active={pathname === "/tools/text"}
              onClick={() => router.push("/tools/text")}
            />
            <SidebarItem
              icon={FileSignature}
              label="Contracts"
              active={Boolean(isContractActive)}
              onClick={() => router.push("/tools/contract")}
            />

            <div className="px-4 mb-2 mt-6 text-xs font-bold text-black/40 uppercase tracking-widest">
              System
            </div>
            <SidebarItem
              icon={Settings}
              label="Settings"
              active={pathname === "/tools/settings"}
              onClick={() => router.push("/tools/settings")}
            />
          </nav>

          <div className="p-4 border-t-2 border-black bg-gray-50">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide hover:text-red-600 transition-colors"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
          {/* Decorative Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Header */}
          <header className="h-16 border-b-2 border-black bg-white flex items-center justify-between px-8 z-10 shrink-0">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="text-black/40">TOOLS</span>
              <ChevronRight size={14} className="text-black/40" />
              <span className="font-bold uppercase tracking-wide">
                {getPageTitle()}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-[#F0F0F0] rounded-full border border-black/10">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase">
                  System Online
                </span>
              </div>
              {user && (
                <div className="text-xs font-bold uppercase bg-black text-white px-2 py-1 rounded">
                  {user.displayName || user.email}
                </div>
              )}
            </div>
          </header>

          {/* Content Scroll Area */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-6xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </AdminContext.Provider>
  );
}

