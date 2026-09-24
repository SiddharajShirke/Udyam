import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { FileText } from "lucide-react";

export default function MinistryProblemsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Problems"
        description="Manage problem statements for procurement"
      />
      <Card>
        <CardHeader>
          <h2 className="text-card-title text-gov-text-primary">Problem Statements</h2>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={FileText}
            title="No problem statements"
            description="Problem statements will appear here once the backend is connected."
          />
        </CardContent>
      </Card>
    </div>
  );
}
