import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { FileSignature } from "lucide-react";

export default function MinistryContractsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Contracts"
        description="Draft and manage procurement contracts"
      />
      <Card>
        <CardHeader>
          <h2 className="text-card-title text-gov-text-primary">Contracts</h2>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={FileSignature}
            title="No contracts"
            description="Contract details will appear here once the backend is connected."
          />
        </CardContent>
      </Card>
    </div>
  );
}
