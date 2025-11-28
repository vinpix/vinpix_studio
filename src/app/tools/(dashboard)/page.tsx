"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { helloWorld } from "@/lib/auth";
import {
  Video,
  Mic,
  FileSignature,
  LayoutGrid,
  Terminal,
} from "lucide-react";

// --- Components ---

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

export default function ToolsDashboard() {
  const router = useRouter();
  const [testResult, setTestResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTestHelloWorld = async () => {
    setIsLoading(true);
    try {
      setTestResult("Executing Lambda function...");
      const result = await helloWorld("Vinpix Admin");
      console.log("Hello World Result:", result);
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

  return (
    <>
      <div className="mb-8">
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">
          Overview
        </h2>
        <p className="text-lg text-black/60 font-medium max-w-2xl">
          Manage your Vinpix Studio operations and configurations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Quick Actions" className="col-span-1 md:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "New Project",
                icon: LayoutGrid,
                action: () => {},
              },
              {
                label: "Upload Video",
                icon: Video,
                action: () => router.push("/tools/video"),
              },
              {
                label: "Transcribe",
                icon: Mic,
                action: () => router.push("/tools/audio"),
              },
              {
                label: "Gen Contract",
                icon: FileSignature,
                action: () => router.push("/tools/contract"),
              },
            ].map((action, idx) => (
              <button
                key={idx}
                onClick={action.action}
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
    </>
  );
}

