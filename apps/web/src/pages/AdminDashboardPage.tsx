import { useState } from "react";
import {
  FileCheck,
  Building2,
  Users,
  ShieldAlert,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  ShieldCheck,
  UserPlus,
  RefreshCcw,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { StatusBadge } from "../components/ui/StatusBadge";
import type { StatusType } from "../components/ui/StatusBadge";
import { Button } from "../components/ui/Button";
import { AdminStatCard } from "../components/admin/AdminStatCard";

/* ------------------------------------------------------------------ */
/*  Demo data types                                                     */
/* ------------------------------------------------------------------ */

type OrgType = "Ministry" | "Evaluator" | "Startup";

interface RegistrationRow {
  id: string;
  organisation: string;
  type: OrgType;
  submitted: string;
  status: StatusType;
}

interface ActivityItem {
  id: string;
  description: string;
  time: string;
  icon: typeof CheckCircle;
  iconClass: string;
}

/* ------------------------------------------------------------------ */
/*  Static demo data                                                    */
/* ------------------------------------------------------------------ */

const DEMO_REGISTRATIONS: RegistrationRow[] = [
  { id: "r1", organisation: "Ministry of Commerce", type: "Ministry", submitted: "22 Sep 2026", status: "pending" },
  { id: "r2", organisation: "InnovateTech Pvt Ltd", type: "Startup", submitted: "21 Sep 2026", status: "approved" },
  { id: "r3", organisation: "Dr. Ramesh Gupta (Evaluator)", type: "Evaluator", submitted: "20 Sep 2026", status: "approved" },
  { id: "r4", organisation: "GreenLeaf Solutions", type: "Startup", submitted: "19 Sep 2026", status: "rejected" },
  { id: "r5", organisation: "Ministry of Agriculture", type: "Ministry", submitted: "18 Sep 2026", status: "pending" },
];

const DEMO_ACTIVITY: ActivityItem[] = [
  {
    id: "a1",
    description: "Ministry of Commerce registration submitted",
    time: "2 hours ago",
    icon: FileCheck,
    iconClass: "bg-gov-warning-light text-gov-warning",
  },
  {
    id: "a2",
    description: "Dr. Ramesh Gupta — Evaluator account approved",
    time: "5 hours ago",
    icon: CheckCircle,
    iconClass: "bg-gov-success-light text-gov-success",
  },
  {
    id: "a3",
    description: "Security policy updated by Administrator",
    time: "Yesterday, 15:42",
    icon: ShieldCheck,
    iconClass: "bg-gov-active-light text-gov-active",
  },
  {
    id: "a4",
    description: "GreenLeaf Solutions registration rejected",
    time: "Yesterday, 11:20",
    icon: XCircle,
    iconClass: "bg-gov-danger-light text-gov-danger",
  },
  {
    id: "a5",
    description: "New evaluator Ms. Priya Sharma onboarded",
    time: "2 days ago",
    icon: UserPlus,
    iconClass: "bg-gov-success-light text-gov-success",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                            */
/* ------------------------------------------------------------------ */

export default function AdminDashboardPage() {
  const [statuses, setStatuses] = useState<Record<string, StatusType>>(
    () => Object.fromEntries(DEMO_REGISTRATIONS.map((r) => [r.id, r.status])),
  );

  function handleAction(id: string, action: "approved" | "rejected") {
    setStatuses((prev) => ({ ...prev, [id]: action }));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Government Administration"
          description="Monitor registrations, platform activity, security, and governance operations."
        />
        <div className="flex items-center gap-1.5 text-caption text-gov-text-muted mt-2 sm:mt-0 flex-shrink-0">
          <RefreshCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Last updated: 24 Sep 2026, 22:30 IST</span>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          label="Pending Registrations"
          value={24}
          supporting="Awaiting review"
          icon={FileCheck}
          iconClass="bg-gov-warning-light text-gov-warning"
        />
        <AdminStatCard
          label="Approved Organisations"
          value={186}
          supporting="Across all categories"
          icon={Building2}
          iconClass="bg-gov-success-light text-gov-success"
        />
        <AdminStatCard
          label="Active Evaluators"
          value={42}
          supporting="Currently onboarded"
          icon={Users}
          iconClass="bg-gov-active-light text-gov-active"
        />
        <AdminStatCard
          label="Security Alerts"
          value={3}
          supporting="Require attention"
          icon={ShieldAlert}
          iconClass="bg-gov-danger-light text-gov-danger"
        />
      </div>

      {/* Two-column layout on lg+ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Registration overview — 2/3 width */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-card-title text-gov-text-primary">Registration Requests</h2>
              <Button variant="ghost" size="sm" className="text-gov-blue-accent hover:text-gov-blue">
                View all
              </Button>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-body">
                <thead>
                  <tr className="border-b border-gov-border-light">
                    {["Organisation", "Type", "Submitted", "Status", "Actions"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-caption font-semibold text-gov-text-secondary uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gov-border-light">
                  {DEMO_REGISTRATIONS.map((row) => {
                    const currentStatus = statuses[row.id];
                    return (
                      <tr key={row.id} className="hover:bg-gov-surface/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gov-text-primary whitespace-nowrap">
                          {row.organisation}
                        </td>
                        <td className="px-4 py-3 text-gov-text-secondary whitespace-nowrap">
                          <OrgTypePill type={row.type} />
                        </td>
                        <td className="px-4 py-3 text-gov-text-muted whitespace-nowrap text-caption">
                          {row.submitted}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <StatusBadge status={currentStatus} />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Button variant="ghost" size="sm" aria-label={`Review ${row.organisation}`}>
                              <Eye className="h-3.5 w-3.5" />
                              Review
                            </Button>
                            {currentStatus === "pending" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gov-success hover:bg-gov-success-light"
                                  aria-label={`Approve ${row.organisation}`}
                                  onClick={() => handleAction(row.id, "approved")}
                                >
                                  <CheckCircle className="h-3.5 w-3.5" />
                                  Approve
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gov-danger hover:bg-gov-danger-light"
                                  aria-label={`Reject ${row.organisation}`}
                                  onClick={() => handleAction(row.id, "rejected")}
                                >
                                  <XCircle className="h-3.5 w-3.5" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Recent activity — 1/3 width */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <h2 className="text-card-title text-gov-text-primary">Recent Activity</h2>
            </CardHeader>
            <CardContent className="pt-2 pb-4">
              <ol className="space-y-4" aria-label="Recent activity feed">
                {DEMO_ACTIVITY.map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full ${item.iconClass}`}
                      aria-hidden="true"
                    >
                      <item.icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-body text-gov-text-primary leading-snug">
                        {item.description}
                      </p>
                      <p className="flex items-center gap-1 mt-0.5 text-caption text-gov-text-muted">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        {item.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                       */
/* ------------------------------------------------------------------ */

function OrgTypePill({ type }: { type: OrgType }) {
  const cls: Record<OrgType, string> = {
    Ministry: "bg-gov-active-light text-gov-active",
    Evaluator: "bg-purple-50 text-purple-700",
    Startup: "bg-gov-success-light text-gov-success",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-caption font-medium rounded-full ${cls[type]}`}>
      {type}
    </span>
  );
}
