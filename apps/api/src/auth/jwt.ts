// TODO: Teammate C — sign/verify JWTs, issue access + refresh tokens

export function signToken(_payload: Record<string, unknown>): string {
  void _payload;
  throw new Error("Not implemented");
}

export function verifyToken(_token: string): Record<string, unknown> {
  void _token;
  throw new Error("Not implemented");
}