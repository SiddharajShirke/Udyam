import { DEMO_CHALLENGE, DEMO_PARTICIPANT } from "../mocks/demoData";

export const MINISTRY_OPTIONS = [
  "Ministry of Agriculture & Farmers Welfare",
  "Ministry of Commerce & Industry (DPIIT)",
  "Ministry of Communications",
  "Ministry of Defence",
  "Ministry of Education",
  "Ministry of Electronics & Information Technology (MeitY)",
  "Ministry of Environment, Forest & Climate Change",
  "Ministry of Finance",
  "Ministry of Food Processing Industries",
  "Ministry of Health & Family Welfare",
  "Ministry of Home Affairs",
  "Ministry of Housing & Urban Affairs",
  "Ministry of Jal Shakti",
  "Ministry of Micro, Small & Medium Enterprises (MSME)",
  "Ministry of Mines",
  "Ministry of New & Renewable Energy (MNRE)",
  "Ministry of Petroleum & Natural Gas",
  "Ministry of Power",
  "Ministry of Railways",
  "Ministry of Road Transport & Highways",
  "Ministry of Rural Development",
  "Ministry of Science & Technology",
  "Ministry of Skill Development & Entrepreneurship",
  "Ministry of Tourism",
  "Ministry of Women & Child Development",
  "Other Central / State Department",
];

export type ProblemStatus = "draft" | "active" | "pending" | "completed";

export interface MinistryProblem {
  id: string;
  title: string;
  department: string;
  category: string;
  status: ProblemStatus;
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

export interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  time: string;
  tone: "orange" | "blue" | "green" | "amber";
}

export const MINISTRY_PROBLEMS: MinistryProblem[] = [
  {
    ...DEMO_CHALLENGE,
  },
  {
    id: "PRB-1038",
    title: "Real-time water quality telemetry for rural pipelines",
    department: "Ministry of Jal Shakti",
    category: "Water & Sanitation",
    status: "pending",
    published: "01 Sep 2026",
    participants: 19,
    evaluation: "4 in evaluation",
    description: "Create a low-cost sensor and analytics network for pH, turbidity, and contamination alerts in rural water infrastructure.",
    outcome: "Reliable telemetry with clear escalation signals for district water officers.",
    technicalRequirements: "Five-second telemetry latency, three-year battery life, solar charging, and tamper detection.",
    eligibility: "Startups with proven IoT, edge analytics, or public-utility deployment experience.",
    constraints: "Hardware must withstand outdoor conditions and intermittent connectivity.",
    submissionOpen: "01 Sep 2026",
    submissionClose: "15 Nov 2026",
    evaluationStart: "18 Nov 2026",
    evaluationEnd: "05 Dec 2026",
  },
  {
    id: "PRB-1031",
    title: "Cold-chain expiry prediction for horticulture transit",
    department: "Ministry of Food Processing Industries",
    category: "Food & Nutrition",
    status: "active",
    published: "22 Aug 2026",
    participants: 16,
    evaluation: "3 in evaluation",
    description: "Use smart indicators and supply-chain tracking to reduce perishable loss during storage and transit.",
    outcome: "An explainable expiry-risk model that can be used by logistics and warehouse teams.",
    technicalRequirements: "Temperature and humidity logging, NFC tagging, and at least 90% expiry prediction accuracy.",
    eligibility: "Startups with food, logistics, or supply-chain technology experience.",
    constraints: "Solution should integrate with existing warehouse workflows without specialist hardware operators.",
    submissionOpen: "22 Aug 2026",
    submissionClose: "20 Nov 2026",
    evaluationStart: "24 Nov 2026",
    evaluationEnd: "12 Dec 2026",
  },
  {
    id: "PRB-1026",
    title: "Accessible grievance triage for district offices",
    department: "Ministry of Electronics & Information Technology",
    category: "Digital Governance",
    status: "completed",
    published: "05 Jul 2026",
    participants: 31,
    evaluation: "Completed",
    description: "Route citizen grievances to the right district team with multilingual classification and clear service-level visibility.",
    outcome: "A transparent triage layer that improves response times without replacing officer judgment.",
    technicalRequirements: "Support for 12 Indian languages, explainable classification, and role-based dashboards.",
    eligibility: "Startups with demonstrated civic technology or language AI deployments.",
    constraints: "No automated rejection of citizen claims; every classification must remain reviewable.",
    submissionOpen: "05 Jul 2026",
    submissionClose: "02 Aug 2026",
    evaluationStart: "08 Aug 2026",
    evaluationEnd: "30 Aug 2026",
  },
  {
    id: "PRB-1019",
    title: "Last-mile cold storage energy optimisation",
    department: "Ministry of New and Renewable Energy",
    category: "Climate & Energy",
    status: "draft",
    published: "Not published",
    participants: 0,
    evaluation: "Not started",
    description: "Optimise energy usage for rural cold storage units while maintaining reliable temperature thresholds.",
    outcome: "A measurable reduction in energy cost and spoilage risk for local producer groups.",
    technicalRequirements: "Predictive load balancing, solar integration, and a clear operator alert model.",
    eligibility: "Startups working in energy management, IoT, or rural infrastructure.",
    constraints: "Must work with existing equipment and support manual override by local operators.",
    submissionOpen: "Pending approval",
    submissionClose: "Pending approval",
    evaluationStart: "Pending approval",
    evaluationEnd: "Pending approval",
  },
  {
    id: "PRB-1011",
    title: "Urban flood risk mapping for municipal response",
    department: "Ministry of Housing and Urban Affairs",
    category: "Urban Resilience",
    status: "active",
    published: "18 Jun 2026",
    participants: 22,
    evaluation: "5 in evaluation",
    description: "Combine drainage, rainfall, and citizen-reported data to help city teams prioritise flood response.",
    outcome: "A live map and prioritisation workflow usable by control rooms during heavy rainfall.",
    technicalRequirements: "Near-real-time ingestion, map-layer exports, and a sub-10-minute alert cycle.",
    eligibility: "Startups with geospatial, civic, or climate-risk products.",
    constraints: "Data sources must be traceable and sensitive citizen information must remain protected.",
    submissionOpen: "18 Jun 2026",
    submissionClose: "25 Jul 2026",
    evaluationStart: "28 Jul 2026",
    evaluationEnd: "14 Aug 2026",
  },
  {
    id: "PRB-1004",
    title: "Portable diagnostics for primary health centres",
    department: "Ministry of Health and Family Welfare",
    category: "Health Technology",
    status: "completed",
    published: "02 May 2026",
    participants: 14,
    evaluation: "Completed",
    description: "Support primary health centres with portable diagnostics and structured referral recommendations.",
    outcome: "Faster, more consistent screening support for frontline health workers.",
    technicalRequirements: "Offline-first workflow, secure patient data handling, and calibrated device readings.",
    eligibility: "Health technology startups with clinical validation or public health pilots.",
    constraints: "The system must support clinician review and cannot present a diagnosis as a final decision.",
    submissionOpen: "02 May 2026",
    submissionClose: "31 May 2026",
    evaluationStart: "04 Jun 2026",
    evaluationEnd: "28 Jun 2026",
  },
  {
    id: "PRB-0998",
    title: "Digital inventory for public school laboratories",
    department: "Ministry of Education",
    category: "Education & Skills",
    status: "draft",
    published: "Not published",
    participants: 0,
    evaluation: "Not started",
    description: "Create a simple inventory and maintenance workflow for laboratory equipment across public schools.",
    outcome: "Higher equipment availability and transparent maintenance ownership.",
    technicalRequirements: "QR inventory, low-connectivity support, and district-level reporting.",
    eligibility: "Startups with education, asset management, or field-service products.",
    constraints: "The workflow must be usable by non-technical school staff on entry-level devices.",
    submissionOpen: "Pending approval",
    submissionClose: "Pending approval",
    evaluationStart: "Pending approval",
    evaluationEnd: "Pending approval",
  },
];

export const MINISTRY_ACTIVITIES: ActivityItem[] = [
  { id: "a1", title: "Evaluation report generated", detail: "PRB-1026 · Digital grievance triage", time: "18 min ago", tone: "green" },
  { id: "a2", title: "Sandbox run completed", detail: `${DEMO_CHALLENGE.title} · Run #18`, time: "42 min ago", tone: "blue" },
  { id: "a3", title: "Startup submitted a solution", detail: `${DEMO_CHALLENGE.id} · ${DEMO_PARTICIPANT.name}`, time: "2 hrs ago", tone: "orange" },
  { id: "a4", title: "New problem published", detail: "Cold-chain expiry prediction", time: "Yesterday", tone: "amber" },
];

export const KPI_RESULTS = [
  { label: "Performance", value: 78, detail: "Target 75%" },
  { label: "Accuracy", value: 91, detail: "Target 85%" },
  { label: "Response time", value: 84, detail: "Target 80%" },
  { label: "Reliability", value: 88, detail: "Target 90%" },
];

export const PARTICIPANTS = [
  DEMO_PARTICIPANT,
  { name: "AgriSense Technologies", status: "active", score: 84, progress: 82, lastRun: "Today, 09:18" },
  { name: "FieldFrame AI", status: "pending", score: 76, progress: 64, lastRun: "Yesterday, 17:20" },
  { name: "Bharat Crop Systems", status: "active", score: 72, progress: 58, lastRun: "Yesterday, 14:06" },
];

export const EVALUATION_CRITERIA = [
  { label: "Technical performance", weight: 35, description: "Accuracy, latency, reliability, and implementation quality." },
  { label: "Field usability", weight: 25, description: "Ease of adoption for frontline and ministry users." },
  { label: "Scalability", weight: 20, description: "Readiness for multi-region deployment and support." },
  { label: "Data responsibility", weight: 20, description: "Privacy, auditability, and responsible data handling." },
];

export const MILESTONES = [
  { label: "Sandbox validation", dueDate: "20 Nov 2026", status: "completed", progress: 100 },
  { label: "Ministry review", dueDate: "28 Nov 2026", status: "active", progress: 62 },
  { label: "Contract finalisation", dueDate: "05 Dec 2026", status: "pending", progress: 20 },
  { label: "Pilot deployment", dueDate: "15 Dec 2026", status: "pending", progress: 0 },
];

export function getProblem(id?: string) {
  return MINISTRY_PROBLEMS.find((problem) => problem.id === id) ?? MINISTRY_PROBLEMS[0];
}
