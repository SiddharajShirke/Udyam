import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck, FilePlus2, FileSignature, FileText, FlaskConical } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { StatusBadge } from "../components/ui/StatusBadge";
import { Button } from "../components/ui/Button";
import { MinistryStatCard } from "../components/ministry/MinistryStatCard";
import { ActivityFeed } from "../components/ministry/ActivityFeed";
import { MINISTRY_ACTIVITIES, MINISTRY_PROBLEMS } from "../lib/ministryData";

export default function MinistryDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Ministry Portal"
        description="Manage government challenges, monitor innovation programs, and review evaluation progress."
        actions={
          <Link to="/ministry/problems/new">
            <Button><FilePlus2 className="h-4 w-4" aria-hidden="true" />Create Problem</Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MinistryStatCard label="Active Problems" value="12" detail="3 published this month" icon={FileText} tone="orange" />
        <MinistryStatCard label="Draft Problems" value="04" detail="2 awaiting review" icon={FilePlus2} tone="blue" />
        <MinistryStatCard label="Active Evaluations" value="06" detail="18 submissions in review" icon={ClipboardCheck} tone="green" />
        <MinistryStatCard label="Contracts in Progress" value="03" detail="1 ready for approval" icon={FileSignature} tone="amber" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)]">
        <Card>
          <CardHeader className="flex items-center justify-between gap-3">
            <div>
              <p className="text-caption font-bold uppercase tracking-widest text-brand-orange">PROGRAMME VIEW</p>
              <h2 className="mt-1 text-xl font-bold text-[#162b47]">Problem Overview</h2>
            </div>
            <Link to="/ministry/problems" className="flex items-center gap-1 text-caption font-semibold text-brand-orange hover:gap-2 transition-all">
              View all <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-body">
                <thead>
                  <tr className="border-b border-gov-border-light">
                    {['Problem', 'Department', 'Status', 'Participants', 'Evaluation', 'Action'].map((heading) => (
                      <th key={heading} className="px-5 py-3 text-left text-caption font-semibold uppercase tracking-wider text-gov-text-secondary">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gov-border-light">
                  {MINISTRY_PROBLEMS.slice(0, 5).map((problem) => (
                    <tr key={problem.id} className="transition-colors hover:bg-gov-surface/50">
                      <td className="max-w-[240px] px-5 py-3"><Link to={`/ministry/problems/${problem.id}`} className="font-semibold text-gov-text-primary hover:text-brand-orange">{problem.title}</Link><span className="mt-0.5 block text-caption text-gov-text-muted">{problem.id}</span></td>
                      <td className="max-w-[170px] px-5 py-3 text-caption text-gov-text-secondary">{problem.department}</td>
                      <td className="px-5 py-3"><StatusBadge status={problem.status} label={problem.status === "active" ? "Published" : problem.status === "pending" ? "Evaluation" : undefined} /></td>
                      <td className="px-5 py-3 text-gov-text-primary">{problem.participants}</td>
                      <td className="px-5 py-3 text-caption text-gov-text-secondary">{problem.evaluation}</td>
                      <td className="px-5 py-3"><Link to={`/ministry/problems/${problem.id}`} className="text-caption font-semibold text-brand-orange hover:underline">Manage</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-caption font-bold uppercase tracking-widest text-brand-orange">LIVE UPDATES</p>
            <h2 className="mt-1 text-xl font-bold text-[#162b47]">Recent Activity</h2>
          </CardHeader>
          <CardContent className="pt-0"><ActivityFeed items={MINISTRY_ACTIVITIES} compact /></CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden border-0 bg-[#162b47] text-white">
        <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-brand-orange"><FlaskConical className="h-4 w-4" aria-hidden="true" /><span className="text-caption font-bold uppercase tracking-widest">NEXT STAGE</span></div>
            <h2 className="mt-2 text-2xl font-bold">Review sandbox performance</h2>
            <p className="mt-1 max-w-xl text-sm text-white/65">Six active evaluations are ready for ministry review. Compare KPI progress before selecting the next procurement step.</p>
          </div>
          <Link to="/ministry/sandbox/PRB-1042"><Button variant="secondary">Open sandbox <ArrowRight className="h-4 w-4" aria-hidden="true" /></Button></Link>
        </CardContent>
      </Card>
    </div>
  );
}
