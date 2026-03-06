import { callLambdaFunction } from "./auth";

export interface FashineUser {
  uid: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  createAt?: string;
  fuid?: string;
  isInitExample?: boolean;
  languageCode?: string;
  countryCode?: string;
  additionalInfo?: Record<string, unknown>;
  pinStyle?: string[];
  age?: number | null;
  gender?: string;
  refCode?: string;
  addRefRes?: boolean;
  stat?: Record<string, number>;
  login_streak?: {
    last_login?: string;
    current_streak?: number | null;
    max_streak?: number | null;
  } | null;
  total_login_days?: number | null;
  receipt?: unknown;
  authData?: {
    email?: string;
    tempToken?: string;
    [key: string]: unknown;
  };
  raw?: Record<string, unknown>;
}

interface GetUsersResponse {
  users?: FashineUser[];
  count?: number;
  lastKey?: string | null;
  sourceTable?: string;
}

const PAGE_LIMIT = 100;
const MAX_PAGES = 500;

export async function getFashineUsersPage(
  lastKey?: string | null,
  options?: { includeRaw?: boolean }
): Promise<GetUsersResponse> {
  const result = await callLambdaFunction("getFashineUsers", {
    limit: PAGE_LIMIT,
    lastKey: lastKey || undefined,
    includeRaw: options?.includeRaw ?? false,
  });

  return (result as GetUsersResponse) || {};
}

export async function getAllFashineUsers(
  onProgress?: (loadedCount: number, sourceTable?: string) => void,
  options?: { includeRaw?: boolean }
): Promise<{ users: FashineUser[]; sourceTable?: string }> {
  const usersByUid = new Map<string, FashineUser>();
  let lastKey: string | null | undefined = null;
  let page = 0;
  let sourceTable: string | undefined;

  do {
    page += 1;
    if (page > MAX_PAGES) {
      throw new Error(
        "Reached fetch limit while loading users. Please narrow the scope and retry."
      );
    }

    const response = await getFashineUsersPage(lastKey, options);
    const users = response.users || [];
    sourceTable = sourceTable || response.sourceTable;

    for (const user of users) {
      if (!user?.uid) continue;
      usersByUid.set(user.uid, user);
    }

    onProgress?.(usersByUid.size, sourceTable);
    lastKey = response.lastKey;
  } while (lastKey);

  const sortedUsers = Array.from(usersByUid.values()).sort((a, b) => {
    const left = Date.parse(a.createAt || "");
    const right = Date.parse(b.createAt || "");
    const leftTime = Number.isNaN(left) ? 0 : left;
    const rightTime = Number.isNaN(right) ? 0 : right;
    return rightTime - leftTime;
  });

  return {
    users: sortedUsers,
    sourceTable,
  };
}
