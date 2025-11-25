"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin, registerAdmin } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isRegister) {
        const result = await registerAdmin(email, password, displayName);
        setSuccess(
          result.message || "Registration successful! You can now login."
        );
        setIsRegister(false);
        setDisplayName("");
      } else {
        const result = await loginAdmin(email, password);
        console.log("Login successful:", result);
        console.log("Lambda URL:", result.lambdaUrl);
        router.push("/tools");
      }
    } catch (err: any) {
      setError(
        err.message || (isRegister ? "Registration failed" : "Login failed")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white border-2 border-black rounded">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black uppercase tracking-tight">
            {isRegister ? "Register" : "Login"}
          </h1>
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
              setSuccess("");
              setDisplayName("");
            }}
            className="text-sm font-bold uppercase tracking-wide hover:underline"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label
                htmlFor="displayName"
                className="block text-sm font-bold uppercase tracking-wide mb-2"
              >
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Admin Name"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold uppercase tracking-wide mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="admin@vinpix.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold uppercase tracking-wide mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 border-2 border-red-500 rounded text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-100 border-2 border-green-500 rounded text-green-700">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-black text-white font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? isRegister
                ? "Registering..."
                : "Logging in..."
              : isRegister
              ? "Register"
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
