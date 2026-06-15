/**
 * Client helpers for the /team shared-passcode gate.
 * The httpOnly cookie (vinpix_team_session) is set/cleared by the API routes;
 * middleware checks its presence.
 */

export async function loginTeam(password: string): Promise<void> {
  const res = await fetch("/api/team-auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
    credentials: "include",
  });
  if (!res.ok) {
    let message = "Đăng nhập thất bại";
    try {
      const data = await res.json();
      message = data.error || message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }
}

export async function logoutTeam(): Promise<void> {
  await fetch("/api/team-auth/logout", {
    method: "POST",
    credentials: "include",
  });
}
