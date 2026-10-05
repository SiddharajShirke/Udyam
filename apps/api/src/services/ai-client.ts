// services/ai-client.ts
//
// Single doorway to the Python AI engine. Every call to the AI engine from
// anywhere in the Node service MUST go through this file — never a raw
// fetch() in a route handler.
//
// Responsibilities:
//   - Attaches X-Internal-Secret on every request
//   - Times out slow calls instead of hanging
//   - Retries once on a transient failure (network error / 5xx), never on 4xx
//   - Converts any unrecoverable failure into a clean, catchable AIEngineError
//     so route handlers can respond with 503 instead of crashing/hanging

const AI_ENGINE_URL = process.env.AI_ENGINE_URL; // e.g. http://localhost:8000
const INTERNAL_SECRET = process.env.INTERNAL_SECRET;
const DEFAULT_TIMEOUT_MS = 8000;
const AI_AGENT_TIMEOUT_MS = 120_000;
const FANOUT_TIMEOUT_MS = 240_000;

export class AIEngineError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "AIEngineError";
    this.status = status;
  }
}

function isTransientError(err: unknown): boolean {
  // Network-level failure (fetch throws) or a 5xx we tagged below.
  if (err instanceof AIEngineError) {
    return err.status === undefined || err.status >= 500;
  }
  return true; // TypeError from fetch (DNS, connection refused, abort) etc.
}

async function fetchWithTimeout<T>(
  path: string,
  body: object,
  timeoutMs: number
): Promise<T> {
  if (!AI_ENGINE_URL) {
    throw new AIEngineError("AI_ENGINE_URL is not configured");
  }
  if (!INTERNAL_SECRET) {
    throw new AIEngineError("INTERNAL_SECRET is not configured");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${AI_ENGINE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Internal-Secret": INTERNAL_SECRET,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!res.ok) {
      // 4xx = our request was bad, don't retry. 5xx = transient, do retry.
      const text = await res.text().catch(() => "");
      throw new AIEngineError(
        `AI engine returned ${res.status}: ${text}`,
        res.status
      );
    }

    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof AIEngineError) throw err;
    // AbortError (timeout) or network-level TypeError from fetch itself
    throw new AIEngineError(
      err instanceof Error ? err.message : "AI engine call failed"
    );
  } finally {
    clearTimeout(timer);
  }
}

async function callAI<T = any>(
  path: string,
  body: object,
  retries = 1,
  timeoutMs = DEFAULT_TIMEOUT_MS
): Promise<T> {
  try {
    return await fetchWithTimeout(path, body, timeoutMs);
  } catch (err) {
    if (retries > 0 && isTransientError(err)) {
      return callAI(path, body, retries - 1, timeoutMs);
    }
    throw err;
  }
}

// ---- Typed wrappers for the support and pipeline endpoints ----

export interface MatchmakingResult {
  startup_id: string;
  match_score: number;
  reason: string;
}

export async function getMatchmaking(problemId: string): Promise<{
  matches: MatchmakingResult[];
}> {
  return callAI("/ai/matchmaking", { problem_id: problemId });
}

export async function getLogAnomaly(entityId?: string): Promise<{
  anomaly_detected: boolean;
  summary: string;
  recommended_action: string;
}> {
  return callAI("/ai/log-anomaly", entityId ? { entity_id: entityId } : {});
}

export async function getQuickAssist(
  question: string,
  roleContext: "ministry" | "startup" | "evaluator" | "admin"
): Promise<{ answer: string }> {
  return callAI("/ai/quick-assist", { question, role_context: roleContext });
}

export async function getNextHardwareQuestion(
  answers: Record<string, unknown>
): Promise<{ id: string; text: string; options: string[] } | null> {
  return callAI("/ai/hardware/next-question", { answers });
}

export async function getHardwareScore(
  answers: Record<string, unknown>
): Promise<{ confidence_score: number; passed_layer_1: boolean }> {
  return callAI("/ai/hardware/score", { answers });
}

export interface FormattedProblem {
  title: string;
  outcome: string;
  domain_tags: string[];
  suggested_kpis: string[];
  scope: string;
}

export interface AiKpi {
  name: string;
  metric: string;
  threshold: string | number;
  weight: number;
}

export interface EvaluationReport {
  executive_summary: string;
  per_kpi_breakdown: Record<string, unknown>[];
  comparison_table: Record<string, unknown>[];
  recommendation: string;
  caveats: string[];
}

export interface ContractDraft {
  contract_text: string;
  ip_clause: string;
  milestones: {
    title: string;
    kpi_threshold: string;
    amount_lakhs: number;
  }[];
}

export interface FanOutStartup {
  id: string;
  domain_tags?: string[];
  submission_type: "e2b" | "external_url";
  submission_target: string;
}

export interface FanOutResult {
  candidates_considered: number;
  results: Record<
    string,
    { status: "ok" | "unreachable" | "error"; scores: object | null; error: string | null }
  >;
  ranked: { startup_id: string; total_score: number; rank: number }[];
  best_startup_id: string;
  per_startup_feedback: Record<string, string>;
}

export function formatProblem(
  rawInput: string,
  departmentType = "general"
): Promise<FormattedProblem> {
  return callAI(
    "/ai/format-problem",
    { raw_input: rawInput, department_type: departmentType },
    1,
    AI_AGENT_TIMEOUT_MS
  );
}

export function generateKpis(
  formattedProblem: FormattedProblem,
  domain = "general"
): Promise<AiKpi[]> {
  return callAI(
    "/ai/generate-kpis",
    { formatted_ps: formattedProblem, domain },
    1,
    AI_AGENT_TIMEOUT_MS
  );
}

export function evaluateSubmissions(
  sandboxScores: Record<string, Record<string, number>>,
  kpis: AiKpi[]
): Promise<EvaluationReport> {
  return callAI(
    "/ai/evaluate",
    { sandbox_scores: sandboxScores, kpis },
    1,
    AI_AGENT_TIMEOUT_MS
  );
}

export function draftContract(
  evaluation: EvaluationReport,
  winner: Record<string, unknown>,
  problem: Record<string, unknown>
): Promise<ContractDraft> {
  return callAI(
    "/ai/draft-contract",
    { evaluation, winner, problem },
    1,
    AI_AGENT_TIMEOUT_MS
  );
}

export function runFanout(
  problemId: string,
  formattedProblem: FormattedProblem,
  kpis: AiKpi[],
  startups: FanOutStartup[]
): Promise<FanOutResult> {
  return callAI(
    "/ai/fanout",
    {
      problem_id: problemId,
      formatted_ps: formattedProblem,
      kpis,
      startups,
    },
    0,
    FANOUT_TIMEOUT_MS
  );
}
