import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { LayoutDashboard } from "lucide-react";

export default function MinistryDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Ministry procurement overview"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Problems" value="—" />
        <StatCard label="Under Evaluation" value="—" />
        <StatCard label="Active Sandboxes" value="—" />
        <StatCard label="Contracts Drafted" value="—" />
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-card-title text-gov-text-primary">Recent Problems</h2>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={LayoutDashboard}
            title="No problems yet"
            description="Problem statements will appear here once the backend is connected."
          />
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
