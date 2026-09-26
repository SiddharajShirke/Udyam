import {
  Monitor,
  AlertTriangle,
  ShieldAlert,
  KeyRound,
  Clock,
  Lock,
  ShieldCheck,
  UserX,
  LogIn,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { AdminStatCard } from "../components/admin/AdminStatCard";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type Severity = "low" | "medium" | "high";

interface SecurityEvent {
  id: string;
  event: string;
  user: string;
  ipDevice: string;
  time: string;
  severity: Severity;
}

interface AccessPolicy {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: typeof Clock;
}

/* ------------------------------------------------------------------ */
/*  Demo data                                                           */
/* ------------------------------------------------------------------ */

const SECURITY_EVENTS: SecurityEvent[] = [
  {
    id: "se1",
    event: "Failed login attempt",
    user: "unknown@domain.com",
    ipDevice: "103.21.56.78 / Chrome, Windows",
    time: "Today, 22:15 IST",
    severity: "high",
  },
  {
    id: "se2",
    event: "Failed login attempt",
    user: "admin@gov.in",
    ipDevice: "192.168.1.12 / Firefox, Ubuntu",
    time: "Today, 21:47 IST",
    severity: "high",
  },
  {
    id: "se3",
    event: "Successful admin login",
    user: "admin@gov.in",
    ipDevice: "10.0.0.5 / Chrome, macOS",
    time: "Today, 21:30 IST",
    severity: "low",
  },
  {
    id: "se4",
    event: "Security policy updated",
    user: "superadmin@gov.in",
    ipDevice: "10.0.0.1 / Chrome, Windows",
    time: "Yesterday, 15:42 IST",
    severity: "medium",
  },
  {
    id: "se5",
    event: "User role changed",
    user: "superadmin@gov.in",
    ipDevice: "10.0.0.1 / Chrome, Windows",
    time: "Yesterday, 14:30 IST",
    severity: "medium",
  },
  {
    id: "se6",
    event: "Account locked (5 failed attempts)",
    user: "officer@ministry.gov.in",
    ipDevice: "182.72.44.10 / Mobile, Android",
    time: "2 days ago",
    severity: "high",
  },
];

const ACCESS_POLICIES: AccessPolicy[] = [
  {
    id: "p1",
    label: "Session Timeout",
    value: "30 minutes",
    description: "Sessions expire after 30 minutes of inactivity",
    icon: Clock,
  },
  {
    id: "p2",
    label: "Password Policy",
    value: "Strong (12+ chars)",
    description: "Min 12 characters, must include symbols and numbers",
    icon: KeyRound,
  },
  {
    id: "p3",
    label: "MFA Requirement",
    value: "Mandatory",
    description: "All government officers must enable multi-factor authentication",
    icon: ShieldCheck,
  },
  {
    id: "p4",
    label: "Account Lockout",
    value: "5 attempts / 30 min",
    description: "Account locks after 5 failed attempts for 30 minutes",
    icon: UserX,
  },
];

/* ------------------------------------------------------------------ */
/*  Severity helpers                                                     */
/* ------------------------------------------------------------------ */

const severityStyles: Record<Severity, { badge: string; dot: string; label: string }> = {
  low: {
    badge: "bg-gov-success-light text-gov-success border-gov-success/20",
    dot: "bg-gov-success",
    label: "Low",
  },
  medium: {
    badge: "bg-gov-warning-light text-gov-warning border-gov-warning/20",
    dot: "bg-gov-warning",
    label: "Medium",
  },
  high: {
    badge: "bg-gov-danger-light text-gov-danger border-gov-danger/20",
    dot: "bg-gov-danger",
    label: "High",
  },
};

function SeverityBadge({ severity }: { severity: Severity }) {
  const s = severityStyles[severity];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-caption font-medium border rounded-full ${s.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden="true" />
      {s.label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function AdminSecurityPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Security & Access"
        description="Monitor access controls and security activity across the Udyam platform."
      />

      {/* A. Security Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          label="Active Sessions"
          value={31}
          supporting="Officers currently online"
          icon={Monitor}
          iconClass="bg-gov-active-light text-gov-active"
        />
        <AdminStatCard
          label="Failed Login Attempts"
          value={12}
          supporting="In the last 24 hours"
          icon={AlertTriangle}
          iconClass="bg-gov-warning-light text-gov-warning"
        />
        <AdminStatCard
          label="Security Alerts"
          value={3}
          supporting="Require immediate review"
          icon={ShieldAlert}
          iconClass="bg-gov-danger-light text-gov-danger"
        />
        <AdminStatCard
          label="MFA Enabled Users"
          value="94%"
          supporting="Of all active accounts"
          icon={KeyRound}
          iconClass="bg-gov-success-light text-gov-success"
        />
      </div>

      {/* B. Recent Security Events */}
      <Card>
        <CardHeader>
          <h2 className="text-card-title text-gov-text-primary">Recent Security Events</h2>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-body">
            <thead>
              <tr className="border-b border-gov-border-light">
                {["Event", "User", "IP / Device", "Time", "Severity"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-caption font-semibold text-gov-text-secondary uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gov-border-light">
              {SECURITY_EVENTS.map((ev) => (
                <tr key={ev.id} className="hover:bg-gov-surface/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <EventIcon severity={ev.severity} />
                      <span className="text-gov-text-primary font-medium">{ev.event}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gov-text-secondary whitespace-nowrap">
                    {ev.user}
                  </td>
                  <td className="px-4 py-3 text-caption text-gov-text-muted whitespace-nowrap">
                    {ev.ipDevice}
                  </td>
                  <td className="px-4 py-3 text-caption text-gov-text-muted whitespace-nowrap">
                    {ev.time}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <SeverityBadge severity={ev.severity} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* C. Access Policies */}
      <div>
        <h2 className="text-section-title text-gov-text-primary mb-4">Access Policies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ACCESS_POLICIES.map((policy) => (
            <Card key={policy.id}>
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-gov bg-gov-surface text-gov-blue">
                    <policy.icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-body font-semibold text-gov-text-primary">{policy.label}</p>
                      <span className="inline-flex items-center px-2 py-0.5 text-caption font-medium rounded-full bg-gov-navy/5 text-gov-navy border border-gov-navy/10">
                        {policy.value}
                      </span>
                    </div>
                    <p className="mt-0.5 text-caption text-gov-text-muted">{policy.description}</p>
                  </div>
                  <div className="flex-shrink-0 ml-auto">
                    <span className="flex items-center gap-1 text-caption text-gov-text-muted">
                      <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                      Enforced
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Helper                                                              */
/* ------------------------------------------------------------------ */

function EventIcon({ severity }: { severity: Severity }) {
  const iconProps: Record<Severity, { icon: typeof LogIn; cls: string }> = {
    low: { icon: LogIn, cls: "text-gov-success" },
    medium: { icon: AlertTriangle, cls: "text-gov-warning" },
    high: { icon: ShieldAlert, cls: "text-gov-danger" },
  };
  const { icon: Icon, cls } = iconProps[severity];
  return <Icon className={`h-4 w-4 flex-shrink-0 ${cls}`} aria-hidden="true" />;
}
