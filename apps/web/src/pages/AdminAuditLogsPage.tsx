import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent } from "../components/ui/Card";
import { StatusBadge } from "../components/ui/StatusBadge";
import type { StatusType } from "../components/ui/StatusBadge";
import { Button } from "../components/ui/Button";
import { Select } from "../components/ui/Select";
import { DataTable } from "../components/ui/DataTable";
import type { Column } from "../components/ui/DataTable";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type AuditRole = "Admin" | "Ministry" | "Evaluator" | "System";

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: AuditRole;
  action: string;
  resource: string;
  status: StatusType;
}

/* ------------------------------------------------------------------ */
/*  Demo data                                                           */
/* ------------------------------------------------------------------ */

const ALL_LOGS: AuditLog[] = [
  {
    id: "log-001",
    timestamp: "24 Sep 2026, 22:15 IST",
    user: "admin@gov.in",
    role: "Admin",
    action: "Registration approved",
    resource: "InnovateTech Pvt Ltd",
    status: "approved",
  },
  {
    id: "log-002",
    timestamp: "24 Sep 2026, 21:50 IST",
    user: "admin@gov.in",
    role: "Admin",
    action: "Registration rejected",
    resource: "GreenLeaf Solutions",
    status: "rejected",
  },
  {
    id: "log-003",
    timestamp: "24 Sep 2026, 21:30 IST",
    user: "superadmin@gov.in",
    role: "Admin",
    action: "Security policy viewed",
    resource: "Security Settings",
    status: "active",
  },
  {
    id: "log-004",
    timestamp: "24 Sep 2026, 20:45 IST",
    user: "superadmin@gov.in",
    role: "Admin",
    action: "Role assigned",
    resource: "Dr. Ramesh Gupta",
    status: "completed",
  },
  {
    id: "log-005",
    timestamp: "24 Sep 2026, 20:00 IST",
    user: "evaluator@iitd.ac.in",
    role: "Evaluator",
    action: "Contract viewed",
    resource: "Contract #CTR-2026-042",
    status: "active",
  },
  {
    id: "log-006",
    timestamp: "24 Sep 2026, 18:30 IST",
    user: "officer@commerce.gov.in",
    role: "Ministry",
    action: "User updated",
    resource: "Ministry of Commerce",
    status: "completed",
  },
  {
    id: "log-007",
    timestamp: "23 Sep 2026, 16:15 IST",
    user: "admin@gov.in",
    role: "Admin",
    action: "Registration approved",
    resource: "SmartBridge Technologies",
    status: "approved",
  },
  {
    id: "log-008",
    timestamp: "23 Sep 2026, 15:42 IST",
    user: "superadmin@gov.in",
    role: "Admin",
    action: "Security policy updated",
    resource: "Access Policy",
    status: "completed",
  },
  {
    id: "log-009",
    timestamp: "23 Sep 2026, 14:00 IST",
    user: "system",
    role: "System",
    action: "Role assigned",
    resource: "Ms. Priya Sharma",
    status: "completed",
  },
  {
    id: "log-010",
    timestamp: "22 Sep 2026, 11:20 IST",
    user: "admin@gov.in",
    role: "Admin",
    action: "Registration rejected",
    resource: "EcoFuture Labs",
    status: "rejected",
  },
  {
    id: "log-011",
    timestamp: "22 Sep 2026, 10:05 IST",
    user: "officer@agri.gov.in",
    role: "Ministry",
    action: "User updated",
    resource: "Ministry of Agriculture",
    status: "completed",
  },
  {
    id: "log-012",
    timestamp: "21 Sep 2026, 09:45 IST",
    user: "evaluator@iimb.ac.in",
    role: "Evaluator",
    action: "Contract viewed",
    resource: "Contract #CTR-2026-039",
    status: "active",
  },
];

const ACTION_OPTIONS = [
  { value: "", label: "All Actions" },
  { value: "Registration approved", label: "Registration approved" },
  { value: "Registration rejected", label: "Registration rejected" },
  { value: "User updated", label: "User updated" },
  { value: "Role assigned", label: "Role assigned" },
  { value: "Security policy viewed", label: "Security policy viewed" },
  { value: "Security policy updated", label: "Security policy updated" },
  { value: "Contract viewed", label: "Contract viewed" },
];

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "completed", label: "Completed" },
  { value: "active", label: "Active" },
];

const ROLE_OPTIONS = [
  { value: "", label: "All Roles" },
  { value: "Admin", label: "Admin" },
  { value: "Ministry", label: "Ministry" },
  { value: "Evaluator", label: "Evaluator" },
  { value: "System", label: "System" },
];

const PAGE_SIZE = 8;

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function AdminAuditLogsPage() {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ALL_LOGS.filter((log) => {
      const matchQ =
        !q ||
        log.user.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q) ||
        log.resource.toLowerCase().includes(q);
      const matchAction = !actionFilter || log.action === actionFilter;
      const matchStatus = !statusFilter || log.status === statusFilter;
      const matchRole = !roleFilter || log.role === roleFilter;
      return matchQ && matchAction && matchStatus && matchRole;
    });
  }, [search, actionFilter, statusFilter, roleFilter]);

  /* Reset to page 1 whenever filter changes */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageData = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function handleFilterChange(setter: (v: string) => void) {
    return (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      setter(e.target.value);
      setPage(1);
    };
  }

  const columns: Column<AuditLog>[] = [
    {
      key: "timestamp",
      header: "Timestamp",
      render: (log) => (
        <span className="text-caption text-gov-text-muted whitespace-nowrap">{log.timestamp}</span>
      ),
    },
    {
      key: "user",
      header: "User",
      render: (log) => (
        <span className="text-gov-text-primary font-medium whitespace-nowrap">{log.user}</span>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (log) => <RolePill role={log.role} />,
    },
    {
      key: "action",
      header: "Action",
      render: (log) => (
        <span className="text-gov-text-primary">{log.action}</span>
      ),
    },
    {
      key: "resource",
      header: "Resource",
      render: (log) => (
        <span className="text-gov-text-secondary">{log.resource}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (log) => <StatusBadge status={log.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Logs"
        description="Review platform actions and administrative activity."
      />

      <Card>
        {/* Filters */}
        <CardContent className="pb-0">
          <div className="flex flex-col gap-3 py-2">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gov-text-muted pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search by user, action, or resource…"
                value={search}
                onChange={handleFilterChange(setSearch)}
                className="w-full pl-9 pr-3 py-2 text-body bg-white border border-gov-border rounded-gov
                  placeholder:text-gov-text-muted
                  focus:outline-none focus:ring-2 focus:ring-gov-blue-accent/40 focus:border-gov-blue-accent"
                aria-label="Search audit logs"
              />
            </div>
            {/* Select filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Select
                options={ROLE_OPTIONS}
                value={roleFilter}
                onChange={handleFilterChange(setRoleFilter)}
                aria-label="Filter by role"
                className="flex-1"
              />
              <Select
                options={ACTION_OPTIONS}
                value={actionFilter}
                onChange={handleFilterChange(setActionFilter)}
                aria-label="Filter by action"
                className="flex-1"
              />
              <Select
                options={STATUS_OPTIONS}
                value={statusFilter}
                onChange={handleFilterChange(setStatusFilter)}
                aria-label="Filter by status"
                className="flex-1"
              />
            </div>
            <p className="text-caption text-gov-text-muted pb-2">
              {filtered.length} entries
              {filtered.length !== ALL_LOGS.length && ` (filtered from ${ALL_LOGS.length} total)`}
            </p>
          </div>
        </CardContent>

        <DataTable
          columns={columns}
          data={pageData}
          keyExtractor={(log) => log.id}
          emptyMessage="No audit log entries match the selected filters."
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gov-border-light">
            <p className="text-caption text-gov-text-muted">
              Page {safePage} of {totalPages}
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                aria-label="Next page"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Helper                                                              */
/* ------------------------------------------------------------------ */

function RolePill({ role }: { role: AuditRole }) {
  const cls: Record<AuditRole, string> = {
    Admin: "bg-gov-navy/5 text-gov-navy border-gov-navy/10",
    Ministry: "bg-gov-active-light text-gov-active border-gov-active/20",
    Evaluator: "bg-purple-50 text-purple-700 border-purple-200",
    System: "bg-gov-draft-light text-gov-draft border-gov-draft/20",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-caption font-medium rounded-full border ${cls[role]}`}>
      {role}
    </span>
  );
}
