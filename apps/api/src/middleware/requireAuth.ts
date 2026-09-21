import type { Request, Response, NextFunction } from "express";

// TODO: Teammate C — validate bearer token, attach req.user, enforce role checks

export function requireAuth(_req: Request, _res: Response, next: NextFunction) {
  next();
}
