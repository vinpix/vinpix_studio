"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  Coins,
  Copy,
  Gem,
  GraduationCap,
  Layers3,
  Loader2,
  Map as MapIcon,
  Minus,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ktaCall, loadRecent, pushRecent, type KtMap, type KtUser, type KtUserResult } from "@/features/game-design/admin/api";

type LogEntry = { id: number; at: string; fn: string; ok: boolean; text: string };

const LEVEL_PRESETS = [5, 10, 20, 30, 50];
const COIN_PRESETS = [100, 500, 1000, 5000];
const GEM_PRESETS = [10, 50, 100, 500];

function fmt(n: number) {
  return n.toLocaleString("vi-VN");
}

function Section({ title, icon: Icon, hint, children, tone }: { title: string; icon: React.ComponentType<{ className?: string }>; hint?: string; children: React.ReactNode; tone?: "danger" }) {
  return (
    <section className={cn("panel flex flex-col", tone === "danger" && "border-red-600")}>
      <header className={cn("h-9 px-3 flex items-center gap-2 border-b-2 border-black", tone === "danger" && "border-red-600 text-red-700")}>
        <Icon className="w-4 h-4" />
        <span className="text-[12px] font-bold uppercase tracking-wider">{title}</span>
        {hint && <span className="ml-auto text-[11px] text-gray-500 normal-case tracking-normal font-medium truncate">{hint}</span>}
      </header>
      <div className="p-3 flex flex-col gap-3">{children}</div>
    </section>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: React.ReactNode; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="border border-black px-3 py-2 min-w-0">
      <div className="label-caps flex items-center gap-1">{Icon && <Icon className="w-3 h-3" />}{label}</div>
      <div className="text-lg font-bold tabular-nums truncate">{value}</div>
    </div>
  );
}

function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-semibold text-gray-500 hover:text-black"
      onClick={() => {
        void navigator.clipboard?.writeText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1200);
      }}
      title="Copy"
    >
      {done ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {done ? "Đã copy" : "Copy"}
    </button>
  );
}

export default function AdminTool() {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const [user, setUser] = useState<KtUser | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);
  const logId = useRef(0);

  const [coinDelta, setCoinDelta] = useState("100");
  const [gemDelta, setGemDelta] = useState("10");
  const [coinExact, setCoinExact] = useState("");
  const [gemExact, setGemExact] = useState("");
  const [upTo, setUpTo] = useState("10");
  const [stars, setStars] = useState(3);
  const [mapQuery, setMapQuery] = useState("");
  const [mapResults, setMapResults] = useState<KtMap[] | null>(null);
  const [mapSearching, setMapSearching] = useState(false);

  useEffect(() => {
    setRecent(loadRecent());
  }, []);

  useEffect(() => {
    if (user) {
      setCoinExact(String(user.wallet.coin));
      setGemExact(String(user.wallet.gem));
      setUpTo(String(Math.max(user.maxLevel, 1)));
    }
  }, [user]);

  const pushLog = useCallback((fn: string, ok: boolean, text: string) => {
    logId.current += 1;
    const entry: LogEntry = { id: logId.current, at: new Date().toLocaleTimeString("vi-VN"), fn, ok, text };
    setLog((l) => [entry, ...l].slice(0, 40));
  }, []);

  /** Run a kta* op that returns {user,...}; updates the user card. */
  const run = useCallback(
    async (fn: Parameters<typeof ktaCall>[0], params: Record<string, unknown>, label: string) => {
      setBusy(label);
      setError(null);
      try {
        const r = await ktaCall<KtUserResult>(fn, params);
        setUser(r.user);
        pushLog(fn, true, r.message ?? "OK");
        return r;
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        setError(msg);
        pushLog(fn, false, msg);
        return null;
      } finally {
        setBusy(null);
      }
    },
    [pushLog],
  );

  const lookup = useCallback(
    async (raw: string) => {
      const q = raw.trim();
      if (!q) return;
      const looksLikeUid = /^[A-Za-z0-9_-]{20,}$/.test(q) && !q.includes(" ");
      const r = await run("ktaLookup", looksLikeUid ? { uid: q } : { username: q }, "lookup");
      if (r) setRecent(pushRecent(r.user.username || q));
    },
    [run],
  );

  const target = user ? { uid: user.uid } : null;

  const wallet = async (mode: "add" | "set", coin?: number, gem?: number) => {
    if (!target) return;
    if (mode === "set" && !window.confirm(`Đặt ví của ${user!.username} thành coin ${coin ?? user!.wallet.coin}, gem ${gem ?? user!.wallet.gem}?`)) return;
    await run("ktaSetWallet", { ...target, mode, coin, gem }, "wallet");
  };

  const unlock = async () => {
    if (!target) return;
    const n = parseInt(upTo, 10);
    if (!Number.isFinite(n) || n < 1) return setError("Level phải ≥ 1");
    await run("ktaUnlockLevels", { ...target, upTo: n, stars }, "unlock");
  };

  const resetLevels = async (level?: number) => {
    if (!target) return;
    const msg = level ? `Xoá level ${level} của ${user!.username}?` : `Xoá TOÀN BỘ level của ${user!.username}? Người chơi sẽ bắt đầu lại từ đầu.`;
    if (!window.confirm(msg)) return;
    await run("ktaResetLevels", level ? { ...target, level } : target, "resetLevels");
  };

  const grantMap = async (mapId: string) => {
    if (!target) return;
    await run("ktaGrantMap", { ...target, mapId }, "grant:" + mapId);
  };
  const revokeMap = async (m: KtMap) => {
    if (!target) return;
    if (!window.confirm(`Thu hồi map "${m.title || m.mapId}" khỏi ${user!.username}?`)) return;
    await run("ktaRevokeMap", { ...target, mapId: m.mapId }, "revoke:" + m.mapId);
  };

  const resetTutorial = async () => {
    if (!target) return;
    if (!window.confirm(`Reset tutorial cho ${user!.username}? Lần mở game tới sẽ chạy lại hướng dẫn.`)) return;
    await run("ktaResetTutorial", target, "tutorial");
  };

  const searchMaps = async () => {
    const q = mapQuery.trim();
    if (q.length < 2) return setError("Nhập ít nhất 2 ký tự để tìm map");
    setMapSearching(true);
    setError(null);
    try {
      const r = await ktaCall<{ maps: KtMap[]; truncated: boolean }>("ktaSearchMaps", { q, limit: 20 });
      setMapResults(r.maps);
      pushLog("ktaSearchMaps", true, `${r.maps.length} map${r.truncated ? " (đã dừng sớm, thu hẹp từ khoá)" : ""}`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      pushLog("ktaSearchMaps", false, msg);
    } finally {
      setMapSearching(false);
    }
  };

  const ownedIds = useMemo(() => new Set((user?.ownedMaps ?? []).map((m) => m.mapId)), [user]);
  const levelsDesc = useMemo(() => [...(user?.levels ?? [])].sort((a, b) => b.level - a.level), [user]);

  return (
    <div className="h-full flex flex-col min-h-0">
      <header className="h-12 px-4 flex items-center gap-3 border-b-2 border-black bg-white shrink-0">
        <ShieldAlert className="w-4 h-4" />
        <div className="leading-tight">
          <div className="font-bold uppercase tracking-wider text-[13px]">Admin Tool</div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wider">Kitchen Together · sửa trực tiếp dữ liệu người chơi (production)</div>
        </div>
        <form
          className="ml-auto flex items-center gap-2 w-[420px]"
          onSubmit={(e) => {
            e.preventDefault();
            void lookup(query);
          }}
        >
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              className="field !pl-7"
              placeholder="Username hoặc UID người chơi"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              spellCheck={false}
            />
          </div>
          <button type="submit" className="btn-solid" disabled={!query.trim() || busy === "lookup"}>
            {busy === "lookup" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />} Tra cứu
          </button>
          {user && (
            <button type="button" className="btn-outline" title="Tải lại" onClick={() => void run("ktaLookup", { uid: user.uid }, "lookup")}>
              <RefreshCw className={cn("w-3.5 h-3.5", busy === "lookup" && "animate-spin")} />
            </button>
          )}
        </form>
      </header>

      {recent.length > 0 && (
        <div className="px-4 h-8 flex items-center gap-1.5 border-b border-black/15 bg-white shrink-0 overflow-x-auto">
          <span className="label-caps mr-1">Gần đây</span>
          {recent.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                setQuery(n);
                void lookup(n);
              }}
              className={cn("px-2 h-6 text-[12px] font-semibold border border-black/30 hover:border-black hover:bg-black hover:text-white whitespace-nowrap", user?.username === n && "bg-black text-white border-black")}
            >
              {n}
            </button>
          ))}
        </div>
      )}

      {error && (
        <div className="px-4 py-2 bg-red-50 border-b border-red-300 text-red-700 text-sm flex items-center gap-2 shrink-0">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span className="flex-1">{error}</span>
          <button type="button" onClick={() => setError(null)} className="p-1 hover:bg-red-100" aria-label="Đóng">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="flex-1 min-h-0 flex">
        <div className="flex-1 min-w-0 overflow-y-auto p-4">
          {!user ? (
            <div className="h-full grid place-items-center text-center text-gray-500">
              <div>
                <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <div className="text-sm">Nhập username hoặc UID để xem và chỉnh ví, level, map, tutorial.</div>
                <div className="text-[11px] mt-1 text-gray-400">Mọi thay đổi áp dụng ngay lên server game. Không cần admin key.</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 max-w-6xl">
              {/* User card */}
              <section className="panel xl:col-span-2">
                <div className="p-3 flex flex-wrap items-start gap-3">
                  <div className="min-w-0">
                    <div className="label-caps">Người chơi</div>
                    <div className="text-xl font-bold truncate">{user.username || "(không tên)"}</div>
                    <div className="text-[12px] text-gray-500 font-mono flex items-center gap-2">
                      <span className="truncate">{user.uid}</span> <CopyBtn text={user.uid} />
                    </div>
                  </div>
                  <div className="ml-auto flex flex-wrap gap-2">
                    <Stat label="Coin" value={fmt(user.wallet.coin)} icon={Coins} />
                    <Stat label="Gem" value={fmt(user.wallet.gem)} icon={Gem} />
                    <Stat label="Level cao nhất" value={user.maxLevel} icon={Layers3} />
                    <Stat label="Map đã mua" value={user.ownedMaps.length} icon={MapIcon} />
                  </div>
                </div>
                <div className="px-3 pb-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-gray-600">
                  <span>Trạng thái: <b className="text-black">{user.accountStatus || "—"}</b></span>
                  <span>Tutorial: <b className="text-black">{user.isPassTutorial ? "đã qua" : "chưa qua"}</b></span>
                  <span>Mật khẩu: <b className="text-black">{user.hasPassword ? "có" : "không"}</b></span>
                  {user.referralCode && <span>Referral: <b className="text-black font-mono">{user.referralCode}</b></span>}
                  {user.skin && <span>Skin: <b className="text-black">{user.skin}</b></span>}
                  {(user.walletLocked.coin > 0 || user.walletLocked.gem > 0) && (
                    <span className="text-amber-700">Đang khoá (đấu giá): {fmt(user.walletLocked.coin)} coin · {fmt(user.walletLocked.gem)} gem</span>
                  )}
                </div>
              </section>

              {/* Wallet */}
              <Section title="Ví · Coin & Gem" icon={Coins} hint="Cộng / trừ hoặc đặt số chính xác">
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      { key: "coin", label: "Coin", Icon: Coins, delta: coinDelta, setDelta: setCoinDelta, presets: COIN_PRESETS, exact: coinExact, setExact: setCoinExact },
                      { key: "gem", label: "Gem", Icon: Gem, delta: gemDelta, setDelta: setGemDelta, presets: GEM_PRESETS, exact: gemExact, setExact: setGemExact },
                    ] as const
                  ).map((c) => {
                    const d = parseInt(c.delta, 10);
                    const ok = Number.isFinite(d) && d > 0;
                    const ex = parseInt(c.exact, 10);
                    return (
                      <div key={c.key} className="border border-black p-2 flex flex-col gap-2">
                        <div className="label-caps flex items-center gap-1"><c.Icon className="w-3 h-3" />{c.label}</div>
                        <div className="flex gap-1">
                          <input className="field tabular-nums" inputMode="numeric" value={c.delta} onChange={(e) => c.setDelta(e.target.value.replace(/[^\d]/g, ""))} />
                          <button type="button" className="btn-solid" disabled={!ok || !!busy} title={`Cộng ${c.delta} ${c.label}`} onClick={() => void wallet("add", c.key === "coin" ? d : undefined, c.key === "gem" ? d : undefined)}>
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <button type="button" className="btn-outline" disabled={!ok || !!busy} title={`Trừ ${c.delta} ${c.label}`} onClick={() => void wallet("add", c.key === "coin" ? -d : undefined, c.key === "gem" ? -d : undefined)}>
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {c.presets.map((p) => (
                            <button key={p} type="button" onClick={() => c.setDelta(String(p))} className={cn("px-1.5 h-5 text-[11px] font-semibold border border-black/30 hover:border-black", c.delta === String(p) && "bg-black text-white border-black")}>
                              {fmt(p)}
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-1 items-center pt-1 border-t border-black/15">
                          <span className="label-caps whitespace-nowrap">Đặt =</span>
                          <input className="field tabular-nums" inputMode="numeric" value={c.exact} onChange={(e) => c.setExact(e.target.value.replace(/[^\d]/g, ""))} />
                          <button type="button" className="btn-outline" disabled={!Number.isFinite(ex) || !!busy} onClick={() => void wallet("set", c.key === "coin" ? ex : undefined, c.key === "gem" ? ex : undefined)}>
                            Đặt
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Section>

              {/* Levels */}
              <Section title="Level" icon={Layers3} hint={`${user.levels.length} level đã có · cao nhất ${user.maxLevel}`}>
                <div className="flex flex-wrap items-end gap-2">
                  <label className="flex flex-col gap-1">
                    <span className="label-caps">Mở tới level</span>
                    <input className="field w-24 tabular-nums" inputMode="numeric" value={upTo} onChange={(e) => setUpTo(e.target.value.replace(/[^\d]/g, ""))} />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="label-caps">Sao</span>
                    <div className="flex border border-black h-8">
                      {[0, 1, 2, 3].map((s) => (
                        <button key={s} type="button" onClick={() => setStars(s)} className={cn("w-8 grid place-items-center text-[12px] font-bold border-r border-black last:border-r-0", stars === s ? "bg-black text-white" : "hover:bg-gray-100")} title={`${s} sao`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </label>
                  <button type="button" className="btn-solid" disabled={!!busy} onClick={() => void unlock()}>
                    {busy === "unlock" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Layers3 className="w-3.5 h-3.5" />} Mở level 1 → {upTo || "?"}
                  </button>
                  <div className="flex flex-wrap gap-1">
                    {LEVEL_PRESETS.map((p) => (
                      <button key={p} type="button" onClick={() => setUpTo(String(p))} className={cn("px-1.5 h-5 text-[11px] font-semibold border border-black/30 hover:border-black", upTo === String(p) && "bg-black text-white border-black")}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-[11px] text-gray-500">Level đã có giữ số sao cao hơn. Admin mở level không cộng coin thưởng.</div>
                {levelsDesc.length > 0 ? (
                  <div className="flex flex-wrap gap-1 max-h-40 overflow-y-auto">
                    {levelsDesc.map((l) => (
                      <div key={l.level} className="group inline-flex items-center border border-black h-7 text-[12px]">
                        <span className="px-2 font-bold tabular-nums">{l.level}</span>
                        <span className="px-1 inline-flex items-center gap-px border-l border-black/20 text-amber-500">
                          {Array.from({ length: 3 }, (_, i) => (
                            <Star key={i} className={cn("w-3 h-3", i < l.stars ? "fill-current" : "text-gray-300")} />
                          ))}
                        </span>
                        <button type="button" onClick={() => void resetLevels(l.level)} className="w-6 h-full grid place-items-center border-l border-black/20 text-gray-400 hover:bg-red-600 hover:text-white" title={`Xoá level ${l.level}`}>
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">Chưa có level nào.</div>
                )}
                <div>
                  <button type="button" className="btn-outline !border-red-600 !text-red-700 hover:!bg-red-600 hover:!text-white" disabled={!!busy || user.levels.length === 0} onClick={() => void resetLevels()}>
                    <Trash2 className="w-3.5 h-3.5" /> Xoá toàn bộ level
                  </button>
                </div>
              </Section>

              {/* Maps */}
              <Section title="Map · mở khoá map người chơi" icon={MapIcon} hint="Thêm map vào danh sách đã mua, không trừ tiền">
                <form
                  className="flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    void searchMaps();
                  }}
                >
                  <input className="field" placeholder="Tìm theo tên map, người tạo hoặc map_id" value={mapQuery} onChange={(e) => setMapQuery(e.target.value)} spellCheck={false} />
                  <button type="submit" className="btn-outline" disabled={mapSearching || mapQuery.trim().length < 2}>
                    {mapSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />} Tìm
                  </button>
                </form>
                {mapResults && (
                  <div className="border border-black max-h-48 overflow-y-auto">
                    {mapResults.length === 0 && <div className="p-2 text-sm text-gray-500">Không thấy map nào.</div>}
                    {mapResults.map((m) => {
                      const owned = ownedIds.has(m.mapId);
                      return (
                        <div key={m.mapId} className="flex items-center gap-2 px-2 h-9 border-b border-black/10 last:border-b-0 text-[12px]">
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold truncate">{m.title || "(không tên)"} <span className="text-gray-400 font-normal">· {m.creator}</span></div>
                            <div className="text-[10px] text-gray-400 font-mono truncate">{m.mapId}</div>
                          </div>
                          <span className="text-[11px] text-gray-500 whitespace-nowrap tabular-nums">{m.priceCoins ? `${fmt(m.priceCoins)}c` : ""}{m.priceCoins && m.priceGems ? " · " : ""}{m.priceGems ? `${fmt(m.priceGems)}g` : ""}{!m.priceCoins && !m.priceGems ? "free" : ""}</span>
                          <button type="button" className="btn-solid !h-6 !px-2 !text-[10px]" disabled={owned || !!busy} onClick={() => void grantMap(m.mapId)}>
                            {owned ? <><Check className="w-3 h-3" /> Đã có</> : <><Plus className="w-3 h-3" /> Mở</>}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div>
                  <div className="label-caps mb-1">Đã mua / được mở ({user.ownedMaps.length})</div>
                  {user.ownedMaps.length === 0 ? (
                    <div className="text-sm text-gray-500">Chưa có map nào.</div>
                  ) : (
                    <div className="border border-black max-h-48 overflow-y-auto">
                      {user.ownedMaps.map((m) => (
                        <div key={m.mapId} className="flex items-center gap-2 px-2 h-9 border-b border-black/10 last:border-b-0 text-[12px]">
                          <div className="min-w-0 flex-1">
                            <div className={cn("font-semibold truncate", m.missing && "text-gray-400 italic")}>{m.missing ? "(map đã bị xoá)" : m.title || "(không tên)"} {m.creator && <span className="text-gray-400 font-normal">· {m.creator}</span>}</div>
                            <div className="text-[10px] text-gray-400 font-mono truncate">{m.mapId}</div>
                          </div>
                          <button type="button" className="w-7 h-7 grid place-items-center border border-black/30 text-gray-500 hover:bg-red-600 hover:text-white hover:border-red-600" disabled={!!busy} onClick={() => void revokeMap(m)} title="Thu hồi map">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Section>

              {/* Tutorial */}
              <Section title="Tutorial" icon={GraduationCap} tone="danger" hint="Người chơi sẽ chạy lại hướng dẫn">
                <div className="flex items-center gap-3">
                  <div className="text-sm">Hiện tại: <b>{user.isPassTutorial ? "đã qua tutorial" : "chưa qua tutorial"}</b></div>
                  <button type="button" className="btn-outline !border-red-600 !text-red-700 hover:!bg-red-600 hover:!text-white ml-auto" disabled={!!busy || !user.isPassTutorial} onClick={() => void resetTutorial()}>
                    <RefreshCw className="w-3.5 h-3.5" /> Reset tutorial
                  </button>
                </div>
              </Section>
            </div>
          )}
        </div>

        {/* Log */}
        <aside className="w-72 shrink-0 border-l-2 border-black bg-white flex flex-col min-h-0">
          <div className="h-9 px-3 flex items-center border-b-2 border-black">
            <span className="text-[12px] font-bold uppercase tracking-wider">Nhật ký</span>
            {log.length > 0 && (
              <button type="button" className="ml-auto text-[11px] uppercase tracking-wider font-semibold text-gray-400 hover:text-black" onClick={() => setLog([])}>
                Xoá
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto">
            {log.length === 0 ? (
              <div className="p-3 text-[12px] text-gray-400">Kết quả mỗi thao tác hiện ở đây.</div>
            ) : (
              log.map((e) => (
                <div key={e.id} className={cn("px-3 py-2 border-b border-black/10 text-[12px]", !e.ok && "bg-red-50")}>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                    <span>{e.at}</span>
                    <span className="truncate">{e.fn}</span>
                    {e.ok ? <Check className="w-3 h-3 text-green-600 ml-auto" /> : <X className="w-3 h-3 text-red-600 ml-auto" />}
                  </div>
                  <div className={cn("mt-0.5", !e.ok && "text-red-700")}>{e.text}</div>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
