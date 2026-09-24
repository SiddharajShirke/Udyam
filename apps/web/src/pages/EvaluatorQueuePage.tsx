import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { ListChecks } from "lucide-react";

export default function EvaluatorQueuePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Review Queue"
        description="Pending evaluation reviews"
      />
      <Card>
        <CardHeader>
          <h2 className="text-card-title text-gov-text-primary">Pending Reviews</h2>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={ListChecks}
            title="No pending reviews"
            description="Review items will appear here once the backend is connected."
          />
        </CardContent>
      </Card>
    </div>
  );
}
