import { useState, useMemo } from "react";
import {
  Eye,
  CheckCircle,
  XCircle,
  Search,
  X,
  FileText,
  Download,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { StatusBadge } from "../components/ui/StatusBadge";
import type { StatusType } from "../components/ui/StatusBadge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { DataTable } from "../components/ui/DataTable";
import type { Column } from "../components/ui/DataTable";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type OrgType = "All" | "Ministry" | "Evaluator" | "Startup";

interface Registration {
  id: string;
  organisation: string;
  type: Exclude<OrgType, "All">;
  contact: string;
  email: string;
  submitted: string;
  status: StatusType;
  documents: string[];
}

/* ------------------------------------------------------------------ */
/*  Demo data                                                           */
/* ------------------------------------------------------------------ */

const INITIAL_DATA: Registration[] = [
  {
    id: "reg-001",
    organisation: "Ministry of Commerce & Industry",
    type: "Ministry",
    contact: "Shri Arvind Patel",
    email: "arvind.patel@commerce.gov.in",
    submitted: "22 Sep 2026",
    status: "pending",
    documents: ["Ministry_Authorization_Letter.pdf", "Scope_of_Procurement.pdf"],
  },
  {
    id: "reg-002",
    organisation: "InnovateTech Pvt Ltd",
    type: "Startup",
    contact: "Ms. Sneha Raju",
    email: "sneha@innovatetech.in",
    submitted: "21 Sep 2026",
    status: "approved",
    documents: ["DPIIT_Certificate.pdf", "Incorporation_Certificate.pdf", "PAN_Card.pdf"],
  },
  {
    id: "reg-003",
    organisation: "Dr. Ramesh Gupta",
    type: "Evaluator",
    contact: "Dr. Ramesh Gupta",
    email: "ramesh.gupta@iitd.ac.in",
    submitted: "20 Sep 2026",
    status: "approved",
    documents: ["Credentials.pdf", "NDA_Signed.pdf"],
  },
  {
    id: "reg-004",
    organisation: "GreenLeaf Solutions",
    type: "Startup",
    contact: "Mr. Arjun Mehta",
    email: "arjun@greenleaf.co.in",
    submitted: "19 Sep 2026",
    status: "rejected",
    documents: ["DPIIT_Certificate.pdf"],
  },
  {
    id: "reg-005",
    organisation: "Ministry of Agriculture",
    type: "Ministry",
    contact: "Ms. Kavya Nair",
    email: "kavya.nair@agri.gov.in",
    submitted: "18 Sep 2026",
    status: "pending",
    documents: ["Ministry_Authorization_Letter.pdf"],
  },
  {
    id: "reg-006",
    organisation: "SmartBridge Technologies",
    type: "Startup",
    contact: "Mr. Vikram Singh",
    email: "vikram@smartbridge.io",
    submitted: "17 Sep 2026",
    status: "pending",
    documents: ["DPIIT_Certificate.pdf", "Pitch_Deck.pdf"],
  },
  {
    id: "reg-007",
    organisation: "Prof. Anita Desai",
    type: "Evaluator",
    contact: "Prof. Anita Desai",
    email: "anita.desai@iimb.ac.in",
    submitted: "16 Sep 2026",
    status: "pending",
    documents: ["Credentials.pdf"],
  },
  {
    id: "reg-008",
    organisation: "Ministry of Health",
    type: "Ministry",
    contact: "Dr. S.K. Sharma",
    email: "sk.sharma@health.gov.in",
    submitted: "15 Sep 2026",
    status: "approved",
    documents: ["Ministry_Authorization_Letter.pdf", "Scope_of_Procurement.pdf"],
  },
  {
    id: "reg-009",
    organisation: "EcoFuture Labs",
    type: "Startup",
    contact: "Ms. Pooja Iyer",
    email: "pooja@ecofuture.in",
    submitted: "14 Sep 2026",
    status: "rejected",
    documents: ["DPIIT_Certificate.pdf", "Incorporation_Certificate.pdf"],
  },
  {
    id: "reg-010",
    organisation: "Mr. Rohit Verma",
    type: "Evaluator",
    contact: "Mr. Rohit Verma",
    email: "rohit.verma@tifr.res.in",
    submitted: "13 Sep 2026",
    status: "approved",
    documents: ["Credentials.pdf", "NDA_Signed.pdf"],
  },
];

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

const TYPE_OPTIONS = [
  { value: "", label: "All Types" },
  { value: "Ministry", label: "Ministry" },
  { value: "Evaluator", label: "Evaluator" },
  { value: "Startup", label: "Startup" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function AdminRegistrationsPage() {
  const [data, setData] = useState<Registration[]>(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selected, setSelected] = useState<Registration | null>(null);

  /* Live-filter over local data */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter((r) => {
      const matchQ =
        !q ||
        r.organisation.toLowerCase().includes(q) ||
        r.contact.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q);
      const matchStatus = !statusFilter || r.status === statusFilter;
      const matchType = !typeFilter || r.type === typeFilter;
      return matchQ && matchStatus && matchType;
    });
  }, [data, search, statusFilter, typeFilter]);

  function handleAction(id: string, action: "approved" | "rejected") {
    setData((prev) => prev.map((r) => (r.id === id ? { ...r, status: action } : r)));
    if (selected?.id === id) {
      setSelected((prev) => (prev ? { ...prev, status: action } : null));
    }
  }

  const columns: Column<Registration>[] = [
    {
      key: "organisation",
      header: "Organisation",
      render: (r) => (
        <span className="font-medium text-gov-text-primary">{r.organisation}</span>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (r) => <OrgTypePill type={r.type} />,
    },
    {
      key: "contact",
      header: "Contact",
      render: (r) => (
        <div>
          <p className="text-gov-text-primary">{r.contact}</p>
          <p className="text-caption text-gov-text-muted">{r.email}</p>
        </div>
      ),
    },
    {
      key: "submitted",
      header: "Submitted",
      render: (r) => (
        <span className="text-caption text-gov-text-muted whitespace-nowrap">{r.submitted}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (r) => (
        <div className="flex items-center gap-1.5 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelected(r)}
            aria-label={`View ${r.organisation}`}
          >
            <Eye className="h-3.5 w-3.5" />
            View
          </Button>
          {r.status === "pending" && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-gov-success hover:bg-gov-success-light"
                onClick={() => handleAction(r.id, "approved")}
                aria-label={`Approve ${r.organisation}`}
              >
                <CheckCircle className="h-3.5 w-3.5" />
                Approve
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gov-danger hover:bg-gov-danger-light"
                onClick={() => handleAction(r.id, "rejected")}
                aria-label={`Reject ${r.organisation}`}
              >
                <XCircle className="h-3.5 w-3.5" />
                Reject
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Registration Requests"
          description="Review and manage requests from ministries, evaluators, and participating organisations."
        />

        <Card>
          {/* Filters */}
          <CardContent className="pb-0">
            <div className="flex flex-col sm:flex-row gap-3 py-2">
              <div className="relative flex-1 min-w-0">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gov-text-muted pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  placeholder="Search organisation, contact, or email…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-body bg-white border border-gov-border rounded-gov
                    placeholder:text-gov-text-muted
                    focus:outline-none focus:ring-2 focus:ring-gov-blue-accent/40 focus:border-gov-blue-accent"
                  aria-label="Search registrations"
                />
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Select
                  options={STATUS_OPTIONS}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter by status"
                  className="min-w-[140px]"
                />
                <Select
                  options={TYPE_OPTIONS}
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  aria-label="Filter by organisation type"
                  className="min-w-[140px]"
                />
              </div>
            </div>
            <p className="text-caption text-gov-text-muted pb-3">
              Showing {filtered.length} of {data.length} registrations
            </p>
          </CardContent>

          <DataTable
            columns={columns}
            data={filtered}
            keyExtractor={(r) => r.id}
            emptyMessage="No registrations match the selected filters."
          />
        </Card>
      </div>

      {/* Detail Modal */}
      {selected && (
        <RegistrationModal
          registration={selected}
          onClose={() => setSelected(null)}
          onApprove={() => handleAction(selected.id, "approved")}
          onReject={() => handleAction(selected.id, "rejected")}
        />
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Modal                                                               */
/* ------------------------------------------------------------------ */

interface ModalProps {
  registration: Registration;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

function RegistrationModal({ registration: r, onClose, onApprove, onReject }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Registration details: ${r.organisation}`}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-gov shadow-gov-md overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-gov-border-light">
          <div>
            <h2 className="text-section-title text-gov-text-primary">{r.organisation}</h2>
            <p className="text-caption text-gov-text-muted mt-0.5">Registration Details</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-gov hover:bg-gov-surface transition-colors text-gov-text-secondary"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-body">
            <InfoRow label="Organisation Type" value={<OrgTypePill type={r.type} />} />
            <InfoRow label="Status" value={<StatusBadge status={r.status} />} />
            <InfoRow label="Contact Person" value={r.contact} />
            <InfoRow label="Email Address" value={<a href={`mailto:${r.email}`} className="text-gov-blue-accent hover:underline">{r.email}</a>} />
            <InfoRow label="Submission Date" value={r.submitted} />
          </dl>

          {/* Documents */}
          <div>
            <p className="text-caption font-semibold text-gov-text-secondary uppercase tracking-wider mb-2">
              Submitted Documents
            </p>
            <ul className="space-y-1.5">
              {r.documents.map((doc) => (
                <li key={doc}>
                  <button
                    className="flex items-center gap-2 text-body text-gov-blue-accent hover:underline w-full text-left"
                    aria-label={`Download ${doc}`}
                    onClick={() => {/* UI-only */}}
                  >
                    <FileText className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    {doc}
                    <Download className="h-3.5 w-3.5 ml-auto text-gov-text-muted" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gov-border-light bg-gov-surface/50">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
          {r.status === "pending" && (
            <>
              <Button
                variant="danger"
                size="sm"
                onClick={() => { onReject(); onClose(); }}
              >
                <XCircle className="h-4 w-4" />
                Reject
              </Button>
              <Button
                size="sm"
                className="bg-gov-success hover:bg-green-700 text-white"
                onClick={() => { onApprove(); onClose(); }}
              >
                <CheckCircle className="h-4 w-4" />
                Approve
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function OrgTypePill({ type }: { type: Exclude<OrgType, "All"> }) {
  const cls: Record<Exclude<OrgType, "All">, string> = {
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

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-caption text-gov-text-muted font-medium">{label}</dt>
      <dd className="mt-0.5 text-gov-text-primary">{value}</dd>
    </div>
  );
}
