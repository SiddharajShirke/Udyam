// TODO: Teammate C — sign/verify JWTs, issue access + refresh tokens

export function signToken(payload: Record<string, unknown>): string {
  void payload;
  throw new Error("Not implemented");
}

export function verifyToken(token: string): Record<string, unknown> {
  void token;
  throw new Error("Not implemented");
}
