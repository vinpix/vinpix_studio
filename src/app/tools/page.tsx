"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifySession, helloWorld, logoutAdmin } from "@/lib/auth";
import {
  Video,
  Mic,
  FileText,
  FileSignature,
  LogOut,
  Activity,
  Terminal,
  ChevronRight,
  Settings,
  LayoutGrid,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

const Card = ({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white border-2 border-black p-6 ${className} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
  >
    {title && (
      <div className="mb-4 pb-2 border-b-2 border-black/10 flex justify-between items-center">
        <h3 className="font-bold uppercase tracking-wide text-lg">{title}</h3>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-black/20" />
          <div className="w-2 h-2 rounded-full bg-black/20" />
        </div>
      </div>
    )}
    {children}
  </div>
);

// --- Main Page Component ---

export default function ToolsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [testResult, setTestResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const authenticated = await verifySession();
      setIsAuthenticated(authenticated);
      if (!authenticated) {
        router.push("/tools/login");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
      router.push("/tools/login");
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/tools/login");
  };

  const handleTestHelloWorld = async () => {
    setIsLoading(true);
    try {
      setTestResult("Executing Lambda function...");
      const result = await helloWorld("Vinpix Admin");
      console.log("Hello World Result:", result);
      // specific formatting for the expected result structure
      setTestResult(JSON.stringify(result, null, 2));
    } catch (error: unknown) {
      console.error("Hello World Error:", error);
      if (error instanceof Error) {
        setTestResult(`Error: ${error.message}`);
      } else {
        setTestResult("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F0F0F0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
          <div className="font-mono text-sm uppercase">Authenticating...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-black font-sans flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r-2 border-black flex flex-col z-10 shrink-0">
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
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />

          <div className="px-4 mb-2 mt-6 text-xs font-bold text-black/40 uppercase tracking-widest">
            Modules
          </div>
          <SidebarItem
            icon={Video}
            label="Video Tools"
            active={activeTab === "video"}
            onClick={() => setActiveTab("video")}
          />
          <SidebarItem
            icon={Mic}
            label="Audio Tools"
            active={activeTab === "audio"}
            onClick={() => setActiveTab("audio")}
          />
          <SidebarItem
            icon={FileText}
            label="Text Tools"
            active={activeTab === "text"}
            onClick={() => setActiveTab("text")}
          />
          <SidebarItem
            icon={FileSignature}
            label="Contracts"
            active={activeTab === "contract"}
            onClick={() => setActiveTab("contract")}
          />

          <div className="px-4 mb-2 mt-6 text-xs font-bold text-black/40 uppercase tracking-widest">
            System
          </div>
          <SidebarItem
            icon={Settings}
            label="Settings"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
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
              {activeTab}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#F0F0F0] rounded-full border border-black/10">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase">System Online</span>
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-4xl font-black uppercase tracking-tight mb-2">
                {activeTab === "dashboard"
                  ? "Overview"
                  : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
              </h2>
              <p className="text-lg text-black/60 font-medium max-w-2xl">
                Manage your{" "}
                {activeTab === "dashboard" ? "Vinpix Studio" : activeTab}{" "}
                operations and configurations.
              </p>
            </div>

            {activeTab === "dashboard" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card
                  title="Quick Actions"
                  className="col-span-1 md:col-span-2"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "New Project", icon: LayoutGrid },
                      { label: "Upload Video", icon: Video },
                      { label: "Transcribe", icon: Mic },
                      { label: "Gen Contract", icon: FileSignature },
                    ].map((action, idx) => (
                      <button
                        key={idx}
                        className="flex flex-col items-center justify-center gap-3 p-4 bg-gray-50 hover:bg-black hover:text-white transition-all duration-200 border border-black/10 rounded group"
                      >
                        <action.icon
                          size={24}
                          className="group-hover:scale-110 transition-transform"
                        />
                        <span className="text-xs font-bold uppercase">
                          {action.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </Card>

                <Card title="System Health">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-black/60">
                        API Status
                      </span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold uppercase rounded">
                        Operational
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-black/60">
                        Lambda
                      </span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold uppercase rounded">
                        Ready
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-black/60">
                        Storage
                      </span>
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-bold uppercase rounded">
                        78% Full
                      </span>
                    </div>
                  </div>
                </Card>

                <Card
                  title="Lambda Connectivity"
                  className="col-span-1 md:col-span-3"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-1">
                      <p className="text-sm mb-4">
                        Test the connection to the AWS Lambda backend services.
                        This verifies that your authentication tokens are
                        working and the backend is responsive.
                      </p>
                      <button
                        onClick={handleTestHelloWorld}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-6 py-3 bg-black text-white font-bold uppercase tracking-wide hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:translate-y-1"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{" "}
                            Testing...
                          </>
                        ) : (
                          <>
                            <Terminal size={18} /> Run Diagnostics
                          </>
                        )}
                      </button>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="bg-[#111] text-green-400 p-4 rounded font-mono text-sm min-h-[120px] overflow-auto border border-black/20 shadow-inner">
                        <div className="opacity-50 mb-2 border-b border-white/10 pb-1 text-xs">
                          TERMINAL OUTPUT
                        </div>
                        {testResult ? (
                          <pre className="whitespace-pre-wrap">
                            {testResult}
                          </pre>
                        ) : (
                          <div className="text-white/30 italic">
                            Ready to test...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab !== "dashboard" && (
              <Card>
                <div className="flex flex-col items-center justify-center py-20 opacity-50">
                  <Settings size={48} className="mb-4" />
                  <h3 className="text-xl font-bold uppercase">
                    Work in Progress
                  </h3>
                  <p className="mt-2">
                    The {activeTab} module is currently under development.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
