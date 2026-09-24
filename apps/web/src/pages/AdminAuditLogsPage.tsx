import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { ScrollText } from "lucide-react";

export default function AdminAuditLogsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Logs"
        description="Track system activity and changes"
      />
      <Card>
        <CardHeader>
          <h2 className="text-card-title text-gov-text-primary">System Audit Trail</h2>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={ScrollText}
            title="No audit entries"
            description="Audit log entries will appear here once the backend is connected."
          />
        </CardContent>
      </Card>
    </div>
  );
}
