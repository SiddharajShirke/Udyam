import { http, HttpResponse } from "msw";

// TODO: add per-feature mock handlers here as branches build against docs/api.yaml
export const handlers = [
  http.get("*/health", () => HttpResponse.json({ status: "ok" })),
];
