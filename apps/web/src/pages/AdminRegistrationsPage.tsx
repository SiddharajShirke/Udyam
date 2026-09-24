import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { FileCheck } from "lucide-react";

export default function AdminRegistrationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Registration Requests"
        description="Review and manage startup registration applications"
      />
      <Card>
        <CardHeader>
          <h2 className="text-card-title text-gov-text-primary">Pending Requests</h2>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={FileCheck}
            title="No registration requests"
            description="Registration requests will appear here once the backend is connected."
          />
        </CardContent>
      </Card>
    </div>
  );
}
