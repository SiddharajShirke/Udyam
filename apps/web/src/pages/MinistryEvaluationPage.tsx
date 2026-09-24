import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { ClipboardCheck } from "lucide-react";

export default function MinistryEvaluationPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Evaluation"
        description="Track and manage evaluations"
      />
      <Card>
        <CardHeader>
          <h2 className="text-card-title text-gov-text-primary">Evaluations</h2>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={ClipboardCheck}
            title="No evaluations"
            description="Evaluation results will appear here once the backend is connected."
          />
        </CardContent>
      </Card>
    </div>
  );
}
