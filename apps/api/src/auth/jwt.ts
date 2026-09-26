import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export interface JwtPayload {
  id: string;
  role: string;
  ministry_id?: string;
  startup_id?: string;
}

function getJwtSecret(): string {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not configured");
  }

  return JWT_SECRET;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: "24h",
  });
}

export function verifyToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, getJwtSecret());

  if (typeof decoded === "string") {
    throw new Error("Invalid JWT payload");
  }

  return decoded as unknown as JwtPayload;
}