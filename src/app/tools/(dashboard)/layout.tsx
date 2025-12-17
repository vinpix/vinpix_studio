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
  Menu,
  ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Context ---
const AdminContext = createContext<AdminUser | null>(null);

export const useAdminUser = () => useContext(AdminContext);

// --- Components ---

const SidebarItem = ({
  icon: Icon,
  label,
  active,
  onClick,
  isCollapsed,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
  isCollapsed: boolean;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 border-b border-black/5 ${
      active
        ? "bg-black text-white"
        : "hover:bg-black/5 text-black/60 hover:text-black"
    } ${isCollapsed ? "justify-center" : ""}`}
    title={isCollapsed ? label : undefined}
  >
    <Icon size={18} className="shrink-0" />
    {!isCollapsed && (
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        className="whitespace-nowrap overflow-hidden"
      >
        {label}
      </motion.span>
    )}
    {active && !isCollapsed && (
      <motion.div
        layoutId="activeIndicator"
        className="ml-auto w-1.5 h-1.5 bg-white rounded-full shrink-0"
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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

  // Auto-collapse sidebar when entering smart-chat
  useEffect(() => {
    if (pathname?.includes("/smart-chat")) {
      setIsSidebarCollapsed(true);
    } else {
      // Auto-expand when leaving chat (optional, but good for overview)
      setIsSidebarCollapsed(false);
    }
  }, [pathname]);

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
    if (pathname?.includes("smart-chat")) return "SMART Chat";
    if (pathname?.includes("settings")) return "Settings";
    return "Tools";
  };

  return (
    <AdminContext.Provider value={user}>
      <div className="min-h-screen bg-[#F0F0F0] text-black font-sans flex overflow-hidden">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: isSidebarCollapsed ? 80 : 288 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white border-r-2 border-black flex flex-col z-10 shrink-0 print:hidden overflow-hidden"
        >
          <div
            className={`p-6 border-b-2 border-black bg-black text-white flex items-center ${
              isSidebarCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-black text-xl leading-none shrink-0 rounded-sm">
                V
              </div>
              {!isSidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h1 className="font-black uppercase tracking-tight text-lg leading-none">
                    Vinpix
                  </h1>
                  <p className="text-[10px] font-mono opacity-70 tracking-widest whitespace-nowrap">
                    STUDIO TOOLS
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-hide">
            <div
              className={`px-4 mb-2 text-xs font-bold text-black/40 uppercase tracking-widest ${
                isSidebarCollapsed ? "text-center" : ""
              }`}
            >
              {isSidebarCollapsed ? "Core" : "Core"}
            </div>
            <SidebarItem
              icon={LayoutGrid}
              label="Dashboard"
              active={isDashboardActive}
              onClick={() => router.push("/tools")}
              isCollapsed={isSidebarCollapsed}
            />

            <div
              className={`px-4 mb-2 mt-6 text-xs font-bold text-black/40 uppercase tracking-widest ${
                isSidebarCollapsed ? "text-center" : ""
              }`}
            >
              {isSidebarCollapsed ? "Apps" : "Modules"}
            </div>
            <SidebarItem
              icon={Video}
              label="Video Tools"
              active={pathname === "/tools/video"}
              onClick={() => router.push("/tools/video")}
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarItem
              icon={Mic}
              label="Audio Tools"
              active={pathname === "/tools/audio"}
              onClick={() => router.push("/tools/audio")}
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarItem
              icon={FileText}
              label="SMART Chat"
              active={pathname === "/tools/smart-chat"}
              onClick={() => router.push("/tools/smart-chat")}
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarItem
              icon={FileSignature}
              label="Contracts"
              active={Boolean(isContractActive)}
              onClick={() => router.push("/tools/contract")}
              isCollapsed={isSidebarCollapsed}
            />

            <div
              className={`px-4 mb-2 mt-6 text-xs font-bold text-black/40 uppercase tracking-widest ${
                isSidebarCollapsed ? "text-center" : ""
              }`}
            >
              {isSidebarCollapsed ? "Sys" : "System"}
            </div>
            <SidebarItem
              icon={Settings}
              label="Settings"
              active={pathname === "/tools/settings"}
              onClick={() => router.push("/tools/settings")}
              isCollapsed={isSidebarCollapsed}
            />
          </nav>

          <div className="p-4 border-t-2 border-black bg-gray-50 flex flex-col gap-2">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wide hover:text-black transition-colors w-full p-2 hover:bg-gray-200 rounded ${
                isSidebarCollapsed ? "justify-center" : ""
              }`}
              title="Toggle Sidebar"
            >
              {isSidebarCollapsed ? (
                <ChevronRight size={16} />
              ) : (
                <ChevronLeft size={16} />
              )}
              {!isSidebarCollapsed && "Collapse"}
            </button>

            <button
              onClick={handleLogout}
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wide hover:text-red-600 transition-colors w-full p-2 hover:bg-red-50 rounded ${
                isSidebarCollapsed ? "justify-center" : ""
              }`}
              title="Sign Out"
            >
              <LogOut size={16} />
              {!isSidebarCollapsed && "Sign Out"}
            </button>
          </div>
        </motion.aside>

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

          {/* Content Scroll Area */}
          <div
            className={`flex-1 overflow-y-auto ${
              pathname?.includes("/smart-chat") ? "" : "p-8"
            }`}
          >
            <div
              className={`${
                pathname?.includes("/smart-chat")
                  ? "h-full"
                  : "max-w-6xl mx-auto"
              }`}
            >
              {children}
            </div>
          </div>
        </main>
      </div>
    </AdminContext.Provider>
  );
}
