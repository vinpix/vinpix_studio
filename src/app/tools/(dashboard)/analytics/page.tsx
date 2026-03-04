"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { Database, RefreshCw, Users } from "lucide-react";
import { FashineUser, getAllFashineUsers } from "@/lib/userAnalyticsApi";

function formatDate(value?: string): string {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function formatNumber(value?: number | null): string {
  if (value === undefined || value === null) return "-";
  return value.toLocaleString();
}

export default function AnalyticsPage() {
  const [selectedSource, setSelectedSource] = useState("");
  const [users, setUsers] = useState<FashineUser[]>([]);
  const [sourceTable, setSourceTable] = useState<string>("-");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "Select a data source to load users."
  );

  const canRefresh = selectedSource === "fashine" && !loading;

  const totalUsers = useMemo(() => users.length, [users]);

  const loadFashineUsers = async () => {
    setLoading(true);
    setUsers([]);
    setSourceTable("-");
    setStatusMessage("Loading users from Fashine...");

    try {
      const response = await getAllFashineUsers((loadedCount, tableName) => {
        setStatusMessage(
          `Loading users from Fashine... ${loadedCount} loaded${
            tableName ? ` (table: ${tableName})` : ""
          }`
        );
      });
      const allUsers = response.users || [];

      setUsers(allUsers);
      setSourceTable(response.sourceTable || "-");
      setStatusMessage(
        `Loaded ${allUsers.length} user(s) from Fashine${
          response.sourceTable ? ` (table: ${response.sourceTable})` : ""
        }.`
      );
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Failed to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSourceChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedSource(value);
    setUsers([]);

    if (value === "fashine") {
      await loadFashineUsers();
      return;
    }

    setStatusMessage("Select a data source to load users.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">
          Analytics
        </h2>
        <p className="text-lg text-black/60 font-medium max-w-3xl">
          Select a source to inspect user data directly from backend services.
        </p>
      </div>

      <section className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          <div className="flex-1">
            <label
              htmlFor="analytics-source"
              className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-2"
            >
              Data Source
            </label>
            <div className="relative">
              <Database
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40"
              />
              <select
                id="analytics-source"
                value={selectedSource}
                onChange={handleSourceChange}
                className="w-full border-2 border-black bg-white h-12 pl-10 pr-3 font-semibold focus:outline-none"
              >
                <option value="">Select source...</option>
                <option value="fashine">Fashine</option>
              </select>
            </div>
          </div>

          <button
            onClick={loadFashineUsers}
            disabled={!canRefresh}
            className="h-12 px-5 bg-black text-white font-bold uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p className="text-sm font-medium text-black/70 break-all">{statusMessage}</p>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-black text-white px-3 py-1.5">
              <Database size={14} />
              Table: {sourceTable}
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-black text-white px-3 py-1.5">
              <Users size={14} />
              Total: {totalUsers.toLocaleString()}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-wider">
                  UID
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-wider">
                  Display Name
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-wider">
                  FUID
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-wider">
                  Language
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-wider">
                  Country
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-wider">
                  Streak
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && !loading ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-4 py-10 text-center text-black/50 font-medium"
                  >
                    No users loaded.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr
                    key={user.uid || `${user.email}-${index}`}
                    className={index % 2 === 0 ? "bg-white" : "bg-black/[0.02]"}
                  >
                    <td className="px-4 py-3 font-mono">{index + 1}</td>
                    <td className="px-4 py-3 font-mono text-xs">{user.uid || "-"}</td>
                    <td className="px-4 py-3">{user.email || "-"}</td>
                    <td className="px-4 py-3">{user.displayName || "-"}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-black/5 border border-black/10 text-xs font-semibold uppercase">
                        {user.fuid || "None"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {formatDate(user.createAt)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {formatDate(user.login_streak?.last_login)}
                    </td>
                    <td className="px-4 py-3">{user.languageCode || "-"}</td>
                    <td className="px-4 py-3">{user.countryCode || "-"}</td>
                    <td className="px-4 py-3">
                      {formatNumber(user.login_streak?.current_streak ?? null)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
