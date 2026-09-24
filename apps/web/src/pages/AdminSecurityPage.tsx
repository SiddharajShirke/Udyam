import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { Shield } from "lucide-react";

export default function AdminSecurityPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Security"
        description="Security settings and access controls"
      />
      <Card>
        <CardHeader>
          <h2 className="text-card-title text-gov-text-primary">Security Overview</h2>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Shield}
            title="Security dashboard"
            description="Security controls and settings will be available once the backend is connected."
          />
        </CardContent>
      </Card>
    </div>
  );
}
