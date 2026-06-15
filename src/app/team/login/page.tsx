"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginTeam } from "@/lib/teamAuth";

export default function TeamLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginTeam(password);
      router.push("/team/kanban");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F0F0F0] px-4">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="relative w-full max-w-md border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="border-b-2 border-black bg-black px-6 py-5 text-white">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70">
            Vinpix Studio · Kitchen Together
          </p>
          <h1 className="mt-1 text-2xl font-black uppercase tracking-tight">Nhóm · Đăng nhập</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div>
            <label
              htmlFor="passcode"
              className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-black/50"
            >
              Mật khẩu nhóm
            </label>
            <input
              id="passcode"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="border-2 border-red-500 bg-red-100 px-3 py-2 text-sm font-bold text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 border-2 border-black bg-black px-6 py-3 font-bold uppercase tracking-wide text-white transition-transform active:translate-y-0.5 disabled:opacity-50"
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
