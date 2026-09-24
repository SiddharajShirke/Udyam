import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { StatusBadge } from "../components/ui/StatusBadge";
import { EmptyState } from "../components/ui/EmptyState";
import { ShieldCheck } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Government administration overview"
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pending Registrations" value="—" />
        <StatCard label="Active Ministries" value="—" />
        <StatCard label="Total Startups" value="—" />
        <StatCard label="Audit Events" value="—" />
      </div>

      {/* Placeholder */}
      <Card>
        <CardHeader>
          <h2 className="text-card-title text-gov-text-primary">Recent Activity</h2>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={ShieldCheck}
            title="No activity yet"
            description="Dashboard data will appear once the backend is connected."
          />
        </CardContent>
      </Card>

      {/* Status badge demo row — small inline demo for shared components */}
      <Card>
        <CardHeader>
          <h2 className="text-card-title text-gov-text-primary">Status Indicators</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="pending" />
            <StatusBadge status="approved" />
            <StatusBadge status="rejected" />
            <StatusBadge status="draft" />
            <StatusBadge status="active" />
            <StatusBadge status="completed" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="py-5">
        <p className="text-caption text-gov-text-secondary font-medium uppercase tracking-wider">
          {label}
        </p>
        <p className="mt-1 text-page-title text-gov-text-primary">{value}</p>
      </CardContent>
    </Card>
  );
}
