"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { Database, Download, RefreshCw, Users } from "lucide-react";
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

type FlatRecord = Record<string, string>;

const PRIORITY_COLUMNS = [
  "uid",
  "email",
  "displayName",
  "avatarUrl",
  "createAt",
  "fuid",
  "isInitExample",
  "languageCode",
  "countryCode",
  "age",
  "gender",
  "refCode",
  "addRefRes",
  "total_login_days",
  "pinStyle",
  "additionalInfo",
  "stat",
  "login_streak.last_login",
  "login_streak.current_streak",
  "login_streak.max_streak",
  "receipt",
  "authData.email",
  "authData.tempToken",
];

function stringifyValue(value: unknown): string {
  if (value === undefined || value === null || value === "") return "-";
  if (typeof value === "string") return value;
  if (typeof value === "number") return formatNumber(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  if (Array.isArray(value)) {
    return value.length === 0 ? "-" : JSON.stringify(value);
  }
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
}

function flattenValue(
  value: unknown,
  prefix = "",
  target: Record<string, unknown> = {}
): Record<string, unknown> {
  if (value === undefined) {
    return target;
  }

  if (
    value === null ||
    typeof value !== "object" ||
    value instanceof Date ||
    Array.isArray(value)
  ) {
    if (prefix) {
      target[prefix] = value;
    }
    return target;
  }

  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length === 0 && prefix) {
    target[prefix] = value;
    return target;
  }

  for (const [key, nestedValue] of entries) {
    const nextPrefix = prefix ? `${prefix}.${key}` : key;
    flattenValue(nestedValue, nextPrefix, target);
  }

  return target;
}

function flattenUser(user: FashineUser): FlatRecord {
  const record: Record<string, unknown> = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    createAt: user.createAt,
    fuid: user.fuid,
    isInitExample: user.isInitExample,
    languageCode: user.languageCode,
    countryCode: user.countryCode,
    additionalInfo: user.additionalInfo,
    pinStyle: user.pinStyle,
    age: user.age,
    gender: user.gender,
    refCode: user.refCode,
    addRefRes: user.addRefRes,
    stat: user.stat,
    login_streak: user.login_streak,
    total_login_days: user.total_login_days,
    receipt: user.receipt,
    authData: user.authData,
  };

  const flattened = flattenValue(record);
  const raw = flattenValue(user.raw ?? {}, "raw");

  return Object.fromEntries(
    Object.entries({ ...flattened, ...raw }).map(([key, value]) => [
      key,
      stringifyValue(value),
    ])
  );
}

function escapeCsvValue(value: string): string {
  const safeValue = value ?? "";
  if (/[",\n]/.test(safeValue)) {
    return `"${safeValue.replace(/"/g, '""')}"`;
  }
  return safeValue;
}

function toCsv(columns: string[], rows: FlatRecord[]): string {
  const header = columns.map(escapeCsvValue).join(",");
  const body = rows.map((row) =>
    columns.map((column) => escapeCsvValue(row[column] ?? "")).join(",")
  );
  return [header, ...body].join("\n");
}

function downloadCsv(content: string, fileName: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
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
  const flatUsers = useMemo(() => users.map(flattenUser), [users]);
  const columns = useMemo(() => {
    const discovered = new Set<string>();

    for (const user of flatUsers) {
      Object.keys(user).forEach((key) => discovered.add(key));
    }

    const orderedPriority = PRIORITY_COLUMNS.filter((column) =>
      discovered.has(column)
    );
    const remaining = Array.from(discovered)
      .filter((column) => !PRIORITY_COLUMNS.includes(column))
      .sort((left, right) => left.localeCompare(right));

    return ["rowNumber", ...orderedPriority, ...remaining];
  }, [flatUsers]);
  const totalColumns = Math.max(columns.length - 1, 0);

  const loadFashineUsers = async () => {
    setLoading(true);
    setUsers([]);
    setSourceTable("-");
    setStatusMessage("Loading users from Fashine...");

    try {
      const response = await getAllFashineUsers(
        (loadedCount, tableName) => {
          setStatusMessage(
            `Loading users from Fashine... ${loadedCount} loaded${
              tableName ? ` (table: ${tableName})` : ""
            }`
          );
        },
        { includeRaw: true }
      );
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

  const handleExportCsv = () => {
    if (flatUsers.length === 0) return;

    const exportColumns = columns.filter((column) => column !== "rowNumber");
    const csvRows = flatUsers.map((user, index) => ({
      rowNumber: String(index + 1),
      ...user,
    }));
    const csvContent = toCsv(["rowNumber", ...exportColumns], csvRows);
    const safeTableName = (sourceTable || "fashine-user").replace(/[^a-z0-9-_]+/gi, "_");
    const dateStamp = new Date().toISOString().slice(0, 10);

    downloadCsv(csvContent, `${safeTableName}-${dateStamp}.csv`);
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

          <button
            onClick={handleExportCsv}
            disabled={loading || flatUsers.length === 0}
            className="h-12 px-5 bg-white text-black border-2 border-black font-bold uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Export CSV
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
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-black text-white px-3 py-1.5">
              Columns: {totalColumns.toLocaleString()}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-black text-white">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    className="px-4 py-3 text-left font-bold uppercase tracking-wider whitespace-nowrap"
                  >
                    {column === "rowNumber" ? "#" : column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && !loading ? (
                <tr>
                  <td
                    colSpan={columns.length || 1}
                    className="px-4 py-10 text-center text-black/50 font-medium"
                  >
                    No users loaded.
                  </td>
                </tr>
              ) : (
                flatUsers.map((user, index) => (
                  <tr
                    key={user.uid || user.email || `${index}`}
                    className={index % 2 === 0 ? "bg-white" : "bg-black/[0.02]"}
                  >
                    {columns.map((column) => {
                      const value =
                        column === "rowNumber"
                          ? String(index + 1)
                          : user[column] ?? "-";
                      const isDateColumn =
                        column.toLowerCase().includes("date") ||
                        column.toLowerCase().includes("time") ||
                        column.toLowerCase().includes("login") ||
                        column.toLowerCase().includes("createat");

                      return (
                        <td
                          key={`${index}-${column}`}
                          className="px-4 py-3 align-top font-mono text-xs whitespace-pre-wrap min-w-[180px] break-words"
                        >
                          {isDateColumn ? formatDate(value) : value}
                        </td>
                      );
                    })}
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
