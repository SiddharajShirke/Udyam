// TODO: Teammate C — wire up real auth (JWT storage, role checks, session handling)

export type Role = "ADMIN" | "MINISTRY" | "EVALUATOR" | "STARTUP";

export interface Session {
  userId: string;
  role: Role;
  email: string;
}

export function getSession(): Session | null {
  // TODO: Teammate C — read/validate session token
  return null;
}
