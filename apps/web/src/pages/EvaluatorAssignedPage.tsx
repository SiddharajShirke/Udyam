import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { ClipboardList } from "lucide-react";

export default function EvaluatorAssignedPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Assigned Reviews"
        description="Reviews assigned to you"
      />
      <Card>
        <CardHeader>
          <h2 className="text-card-title text-gov-text-primary">Your Assignments</h2>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={ClipboardList}
            title="No assigned reviews"
            description="Assigned reviews will appear here once the backend is connected."
          />
        </CardContent>
      </Card>
    </div>
  );
}
