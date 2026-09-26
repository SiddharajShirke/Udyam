export interface DemoChallenge {
  id: string;
  title: string;
  department: string;
  category: string;
  status: "draft" | "active" | "pending" | "completed";
  published: string;
  participants: number;
  evaluation: string;
  description: string;
  outcome: string;
  technicalRequirements: string;
  eligibility: string;
  constraints: string;
  submissionOpen: string;
  submissionClose: string;
  evaluationStart: string;
  evaluationEnd: string;
}

export interface DemoParticipant {
  name: string;
  solutionTitle: string;
  solutionSummary: string;
  approach: string;
  submitted: string;
  status: "pending" | "active" | "completed";
  score: number | null;
  progress: number;
  lastRun: string;
}

export const DEMO_CHALLENGE: DemoChallenge = {
  id: "PRB-1042",
  title: "Smart Water Distribution Monitoring",
  department: "Ministry of Jal Shakti",
  category: "Water & Sanitation",
  status: "active",
  published: "12 Sep 2026",
  participants: 28,
  evaluation: "6 in evaluation",
  description: "Build a reliable monitoring workflow for public water networks that helps district teams identify pressure changes, leakage, and service interruptions early.",
  outcome: "A clear, low-cost monitoring view with timely alerts and actionable information for water officers.",
  technicalRequirements: "Five-second telemetry latency, low-power field sensors, offline-tolerant operation, and an auditable alert history.",
  eligibility: "DPIIT-recognised innovators with proven IoT, edge analytics, or public-utility deployment experience.",
  constraints: "The solution must work with intermittent connectivity, protect infrastructure data, and support existing field operations.",
  submissionOpen: "12 Sep 2026",
  submissionClose: "30 Oct 2026",
  evaluationStart: "03 Nov 2026",
  evaluationEnd: "20 Nov 2026",
};

export const DEMO_PARTICIPANT: DemoParticipant = {
  name: "Demo Innovation Labs",
  solutionTitle: "JalNet Monitor",
  solutionSummary: "A low-cost sensor and operations dashboard that gives district water teams an explainable view of pipeline pressure, leakage risk, and service continuity.",
  approach: "Low-power sensors, edge anomaly detection, offline event capture, and a role-based monitoring console for district officers.",
  submitted: "13 Nov 2026",
  status: "active",
  score: 91,
  progress: 92,
  lastRun: "Today, 10:42",
};

export const DEMO_MODE_NOTICE = "Demo data — backend integration pending";
