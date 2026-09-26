import { DEMO_CHALLENGE, DEMO_PARTICIPANT } from "../mocks/demoData";

export type ReviewStatus = "pending" | "active" | "completed";

export interface EvaluatorReview {
  id: string;
  problem: string;
  participant: string;
  category: string;
  assigned: string;
  deadline: string;
  status: ReviewStatus;
  score: number | null;
  statement: string;
  outcome: string;
  requirements: string;
  constraints: string;
  solutionTitle: string;
  solutionSummary: string;
  submitted: string;
  approach: string;
}

export const EVALUATOR_REVIEWS: EvaluatorReview[] = [
  {
    id: "REV-1042-KV",
    problem: DEMO_CHALLENGE.title,
    participant: DEMO_PARTICIPANT.name,
    category: DEMO_CHALLENGE.category,
    assigned: "14 Nov 2026",
    deadline: "20 Nov 2026",
    status: "pending",
    score: null,
    statement: DEMO_CHALLENGE.description,
    outcome: DEMO_CHALLENGE.outcome,
    requirements: DEMO_CHALLENGE.technicalRequirements,
    constraints: DEMO_CHALLENGE.constraints,
    solutionTitle: DEMO_PARTICIPANT.solutionTitle,
    solutionSummary: DEMO_PARTICIPANT.solutionSummary,
    submitted: DEMO_PARTICIPANT.submitted,
    approach: DEMO_PARTICIPANT.approach,
  },
  {
    id: "REV-1042-AS",
    problem: "Early crop blight detection for smallholder farmers",
    participant: "AgriSense Technologies",
    category: "Agriculture & Rural",
    assigned: "13 Nov 2026",
    deadline: "20 Nov 2026",
    status: "active",
    score: 84,
    statement: "Smallholder farmers need an accessible way to identify crop disease before visible spread, even where connectivity is limited.",
    outcome: "A validated detection workflow with regional-language guidance and actionable treatment recommendations.",
    requirements: "Computer vision inference under 300ms, offline support, Android-compatible deployment, and an auditable confidence score.",
    constraints: "The solution must work on low-bandwidth networks and protect farmer-submitted images and location data.",
    solutionTitle: "AgriSense Scout",
    solutionSummary: "A crop health assistant combining field imagery, local agronomy rules, and a cloud dashboard for district-level monitoring.",
    submitted: "12 Nov 2026",
    approach: "Mobile image classification, rule-based recommendations, and district aggregation through a low-bandwidth API.",
  },
  {
    id: "REV-1038-WQ",
    problem: "Real-time water quality telemetry for rural pipelines",
    participant: "AquaPulse Systems",
    category: "Water & Sanitation",
    assigned: "10 Nov 2026",
    deadline: "18 Nov 2026",
    status: "pending",
    score: null,
    statement: "Rural water teams need reliable, low-cost signals for pH, turbidity, and contamination across distributed pipelines.",
    outcome: "Reliable telemetry with clear escalation signals for district water officers.",
    requirements: "Five-second telemetry latency, three-year battery life, solar charging, and tamper detection.",
    constraints: "Hardware must withstand outdoor conditions and intermittent connectivity.",
    solutionTitle: "JalWatch Edge",
    solutionSummary: "A solar-assisted sensor network with edge anomaly detection and a clear escalation queue for district officers.",
    submitted: "09 Nov 2026",
    approach: "Low-power sensors, LoRa telemetry, edge anomaly detection, and a role-based monitoring console.",
  },
  {
    id: "REV-1031-FF",
    problem: "Cold-chain expiry prediction for horticulture transit",
    participant: "FieldFrame AI",
    category: "Food & Nutrition",
    assigned: "06 Nov 2026",
    deadline: "16 Nov 2026",
    status: "active",
    score: 76,
    statement: "Perishable supply chains need early warnings when temperature and humidity conditions indicate likely product loss.",
    outcome: "An explainable expiry-risk model usable by logistics and warehouse teams.",
    requirements: "Temperature and humidity logging, NFC tagging, and at least 90% expiry prediction accuracy.",
    constraints: "The solution should integrate with existing warehouse workflows without specialist hardware operators.",
    solutionTitle: "FreshRoute Signal",
    solutionSummary: "A telemetry layer that converts cold-chain readings into explainable expiry risk and route-level interventions.",
    submitted: "05 Nov 2026",
    approach: "Sensor fusion, time-series forecasting, NFC event markers, and operator alerts.",
  },
  {
    id: "REV-1026-GT",
    problem: "Accessible grievance triage for district offices",
    participant: "GovTech Bridge",
    category: "Digital Governance",
    assigned: "01 Nov 2026",
    deadline: "10 Nov 2026",
    status: "completed",
    score: 89,
    statement: "District offices need multilingual triage support without removing officer review or citizen visibility.",
    outcome: "A transparent triage layer that improves response times without replacing officer judgment.",
    requirements: "Support for 12 Indian languages, explainable classification, and role-based dashboards.",
    constraints: "No automated rejection of citizen claims; every classification must remain reviewable.",
    solutionTitle: "Nyaya Route",
    solutionSummary: "A multilingual triage assistant that recommends routing while preserving a clear officer review trail.",
    submitted: "30 Oct 2026",
    approach: "Language classification, explainable routing recommendations, and human-in-the-loop escalation.",
  },
  {
    id: "REV-1019-RE",
    problem: "Last-mile cold storage energy optimisation",
    participant: "Rural Energy Works",
    category: "Climate & Energy",
    assigned: "28 Oct 2026",
    deadline: "08 Nov 2026",
    status: "pending",
    score: null,
    statement: "Rural cold storage units need lower energy costs while maintaining stable temperature thresholds.",
    outcome: "A measurable reduction in energy cost and spoilage risk for local producer groups.",
    requirements: "Predictive load balancing, solar integration, and a clear operator alert model.",
    constraints: "Must work with existing equipment and support manual override by local operators.",
    solutionTitle: "GridKind",
    solutionSummary: "Predictive energy scheduling for mixed solar and grid-powered cold storage sites.",
    submitted: "27 Oct 2026",
    approach: "Load forecasting, inverter telemetry, and operator-first exception controls.",
  },
  {
    id: "REV-1011-UR",
    problem: "Urban flood risk mapping for municipal response",
    participant: "Monsoon Maps",
    category: "Urban Resilience",
    assigned: "22 Oct 2026",
    deadline: "04 Nov 2026",
    status: "completed",
    score: 92,
    statement: "City response teams need a live view of drainage, rainfall, and citizen reports to prioritise flood response.",
    outcome: "A live map and prioritisation workflow usable by control rooms during heavy rainfall.",
    requirements: "Near-real-time ingestion, map-layer exports, and a sub-10-minute alert cycle.",
    constraints: "Data sources must be traceable and sensitive citizen information must remain protected.",
    solutionTitle: "FloodLens Control Room",
    solutionSummary: "A map-based control room workflow that combines rain forecasts, drainage capacity, and verified reports.",
    submitted: "20 Oct 2026",
    approach: "Geospatial layers, alert prioritisation, and traceable data-source annotations.",
  },
  {
    id: "REV-1004-HD",
    problem: "Portable diagnostics for primary health centres",
    participant: "HealthBridge Devices",
    category: "Health Technology",
    assigned: "18 Oct 2026",
    deadline: "30 Oct 2026",
    status: "completed",
    score: 87,
    statement: "Primary health centres need portable diagnostic support and structured referral recommendations for frontline workers.",
    outcome: "Faster, more consistent screening support for frontline health workers.",
    requirements: "Offline-first workflow, secure patient data handling, and calibrated device readings.",
    constraints: "The system must support clinician review and cannot present a diagnosis as a final decision.",
    solutionTitle: "Swasthya Pocket",
    solutionSummary: "A portable screening companion that organises readings and flags referrals for clinician review.",
    submitted: "16 Oct 2026",
    approach: "Calibrated device integration, offline case records, and clinician-facing referral summaries.",
  },
];

export const EVALUATOR_ACTIVITY = [
  { id: "ea1", title: "Review completed", detail: "Urban flood risk mapping · Score 92", time: "Today, 09:42", tone: "green" },
  { id: "ea2", title: "New review assigned", detail: `${DEMO_CHALLENGE.title} · ${DEMO_PARTICIPANT.name}`, time: "Yesterday", tone: "orange" },
  { id: "ea3", title: "Sandbox results available", detail: "Cold-chain expiry prediction", time: "Yesterday", tone: "blue" },
  { id: "ea4", title: "Deadline approaching", detail: "Water quality telemetry · 2 days left", time: "2 days ago", tone: "amber" },
] as const;

export const EVALUATION_CRITERIA = [
  { id: "technical", label: "Technical Performance", weight: 30 },
  { id: "innovation", label: "Innovation", weight: 20 },
  { id: "feasibility", label: "Feasibility", weight: 20 },
  { id: "scalability", label: "Scalability", weight: 15 },
  { id: "impact", label: "Impact", weight: 15 },
];

export function getEvaluatorReview(id?: string) {
  return EVALUATOR_REVIEWS.find((review) => review.id === id) ?? EVALUATOR_REVIEWS[0];
}
