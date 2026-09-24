import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { Box } from "lucide-react";

export default function MinistrySandboxPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Sandbox"
        description="Sandbox environments for startup solution testing"
      />
      <Card>
        <CardHeader>
          <h2 className="text-card-title text-gov-text-primary">Sandbox Environments</h2>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Box}
            title="No sandbox environments"
            description="Sandbox details will appear here once the backend is connected."
          />
        </CardContent>
      </Card>
    </div>
  );
}
