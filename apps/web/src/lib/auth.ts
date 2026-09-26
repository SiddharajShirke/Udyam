// Demo-only session boundary. Replace this module with real auth integration later.

export type Role = "ADMIN" | "MINISTRY" | "EVALUATOR" | "STARTUP";

export interface Session {
  userId: string;
  role: Role;
  email: string;
  displayName: string;
}

const DEMO_SESSION_KEY = "udyam.demo.session";

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  const rawSession = window.localStorage.getItem(DEMO_SESSION_KEY) ?? window.sessionStorage.getItem(DEMO_SESSION_KEY);
  if (!rawSession) return null;

  try {
    return JSON.parse(rawSession) as Session;
  } catch {
    window.localStorage.removeItem(DEMO_SESSION_KEY);
    window.sessionStorage.removeItem(DEMO_SESSION_KEY);
    return null;
  }
}

export function setDemoSession(role: Exclude<Role, "STARTUP">, remember = true): Session {
  const profiles: Record<Exclude<Role, "STARTUP">, Omit<Session, "role">> = {
    ADMIN: { userId: "demo-admin", email: "admin@gov.in", displayName: "Government Administrator" },
    MINISTRY: { userId: "demo-ministry", email: "ministry@gov.in", displayName: "Ministry Officer" },
    EVALUATOR: { userId: "demo-evaluator", email: "evaluator@gov.in", displayName: "Government Evaluator" },
  };
  const session = { role, ...profiles[role] };

  if (typeof window !== "undefined") {
    const storage = remember ? window.localStorage : window.sessionStorage;
    storage.setItem(DEMO_SESSION_KEY, JSON.stringify(session));
    (remember ? window.sessionStorage : window.localStorage).removeItem(DEMO_SESSION_KEY);
  }

  return session;
}

export function clearDemoSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DEMO_SESSION_KEY);
  window.sessionStorage.removeItem(DEMO_SESSION_KEY);
}
