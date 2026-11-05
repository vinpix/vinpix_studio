/**
 * Kitchen Together Admin Tool client (web port of Unity "KT/Admin Tool").
 * No admin key: /api/game-design forwards kta* functions for team-cookie holders,
 * and the Lambda (vinpix_lambda/src/kt_admin.py) edits the game tables directly.
 */

export type KtLevel = { level: number; stars: number };
export type KtMap = {
  mapId: string;
  title: string;
  creator: string;
  priceCoins?: number;
  priceGems?: number;
  visibility?: string;
  missing?: boolean;
};
export type KtUser = {
  uid: string;
  username: string;
  wallet: { coin: number; gem: number };
  walletLocked: { coin: number; gem: number };
  levels: KtLevel[];
  maxLevel: number;
  ownedMaps: KtMap[];
  isPassTutorial: boolean;
  hasPassword: boolean;
  accountStatus: string;
  createdAt: string;
  referralCode: string;
  skin?: string | null;
  gender?: string | null;
};
export type KtUserResult = { user: KtUser; message?: string; change?: { coin: number; gem: number }; added?: number };

export type KtaFn =
  | "ktaLookup"
  | "ktaSetWallet"
  | "ktaUnlockLevels"
  | "ktaResetLevels"
  | "ktaGrantMap"
  | "ktaRevokeMap"
  | "ktaResetTutorial"
  | "ktaSearchMaps";

export async function ktaCall<T = unknown>(fn: KtaFn, params: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch("/api/game-design", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ function: fn, params }),
  });
  let data: { error?: string } | null = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON */
  }
  if (!res.ok) {
    if (res.status === 401) throw new Error("Phiên nhóm hết hạn, đăng nhập lại.");
    throw new Error(data?.error || `Backend lỗi (${res.status})`);
  }
  if (data && typeof data === "object" && "error" in data && data.error) throw new Error(String(data.error));
  return data as T;
}

const RECENT_KEY = "vinpix.ktAdmin.recent.v1";
const RECENT_MAX = 8;

export function loadRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((s) => typeof s === "string").slice(0, RECENT_MAX) : [];
  } catch {
    return [];
  }
}

export function pushRecent(name: string): string[] {
  const next = [name, ...loadRecent().filter((n) => n !== name)].slice(0, RECENT_MAX);
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  return next;
}
