import { Link, useParams } from "react-router-dom";
import { ArrowRight, CalendarDays, CheckCircle2, Edit3, FileSignature, FlaskConical, Users } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { StatusBadge } from "../components/ui/StatusBadge";
import { Button } from "../components/ui/Button";
import { ActivityFeed } from "../components/ministry/ActivityFeed";
import { getProblem, EVALUATION_CRITERIA, MINISTRY_ACTIVITIES } from "../lib/ministryData";

export default function MinistryProblemDetailPage() {
  const { id } = useParams();
  const problem = getProblem(id);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Ministry", href: "/ministry" }, { label: "Problems", href: "/ministry/problems" }, { label: problem.id }]} />
      <PageHeader
        title={problem.title}
        description={`${problem.id} · ${problem.department}`}
        actions={<div className="flex flex-wrap gap-2"><StatusBadge status={problem.status} label={problem.status === "active" ? "Published" : problem.status === "pending" ? "Evaluation" : undefined} /><Link to={`/ministry/problems/${problem.id}/edit`}><Button variant="secondary" size="sm"><Edit3 className="h-3.5 w-3.5" aria-hidden="true" />Edit</Button></Link></div>}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.85fr)]">
        <div className="space-y-6">
          <Card><CardHeader><p className="text-caption font-bold uppercase tracking-widest text-brand-orange">PROBLEM SUMMARY</p><h2 className="mt-1 text-xl font-bold text-[#162b47]">A clear brief for measurable innovation</h2></CardHeader><CardContent className="space-y-5"><p className="text-sm leading-7 text-gov-text-secondary">{problem.description}</p><div className="grid grid-cols-1 gap-4 sm:grid-cols-3"><Info label="Ministry" value={problem.department.split(" & ")[0]} /><Info label="Department" value={problem.department} /><Info label="Category" value={problem.category} /></div></CardContent></Card>

          <Card><CardHeader><div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-brand-orange" aria-hidden="true" /><h2 className="text-xl font-bold text-[#162b47]">Timeline</h2></div></CardHeader><CardContent><div className="grid grid-cols-1 gap-0 sm:grid-cols-4">{[["Submission opens", problem.submissionOpen], ["Submission closes", problem.submissionClose], ["Evaluation begins", problem.evaluationStart], ["Evaluation ends", problem.evaluationEnd]].map(([label, value], index) => <div key={label} className="relative border-l border-gov-border px-4 py-2 first:border-l-0 sm:border-l"><span className={`absolute -left-[5px] top-3 hidden h-2 w-2 rounded-full sm:block ${index < 2 ? "bg-brand-orange" : "bg-gov-blue-accent"}`} /><p className="text-caption font-semibold uppercase tracking-wider text-gov-text-muted">{label}</p><p className="mt-1 text-sm font-semibold text-gov-text-primary">{value}</p></div>)}</div></CardContent></Card>

          <Card><CardHeader><div className="flex items-center gap-2"><Users className="h-4 w-4 text-brand-orange" aria-hidden="true" /><h2 className="text-xl font-bold text-[#162b47]">Participation</h2></div></CardHeader><CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4"><Metric label="Total participants" value={String(problem.participants)} /><Metric label="Submissions" value="18" /><Metric label="Under evaluation" value="6" /><Metric label="Completed evaluations" value={problem.status === "completed" ? "12" : "4"} /></CardContent></Card>

          <Card><CardHeader><h2 className="text-xl font-bold text-[#162b47]">Evaluation Criteria</h2></CardHeader><CardContent className="space-y-4">{EVALUATION_CRITERIA.map((criterion) => <div key={criterion.label} className="flex flex-col gap-2 border-b border-gov-border-light pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold text-gov-text-primary">{criterion.label}</p><p className="mt-0.5 text-caption text-gov-text-secondary">{criterion.description}</p></div><span className="w-fit bg-brand-orange-tint px-2 py-1 font-display text-xl font-bold text-brand-orange">{criterion.weight}%</span></div>)}</CardContent></Card>
        </div>

        <div className="space-y-6">
          <Card><CardHeader><p className="text-caption font-bold uppercase tracking-widest text-brand-orange">PROBLEM ACTIVITY</p><h2 className="mt-1 text-xl font-bold text-[#162b47]">Recent updates</h2></CardHeader><CardContent className="pt-0"><ActivityFeed items={MINISTRY_ACTIVITIES.slice(0, 3)} compact /></CardContent></Card>
          <Card><CardHeader><h2 className="text-xl font-bold text-[#162b47]">Quick Actions</h2></CardHeader><CardContent className="grid gap-2"><Link to={`/ministry/problems/${problem.id}/edit`}><Button variant="secondary" className="w-full justify-between">Edit Problem <Edit3 className="h-4 w-4" aria-hidden="true" /></Button></Link><Link to={`/ministry/sandbox/${problem.id}`}><Button variant="secondary" className="w-full justify-between">View Sandbox <FlaskConical className="h-4 w-4" aria-hidden="true" /></Button></Link><Link to={`/ministry/evaluation/${problem.id}`}><Button variant="secondary" className="w-full justify-between">View Evaluation <CheckCircle2 className="h-4 w-4" aria-hidden="true" /></Button></Link><Link to={`/ministry/contracts/${problem.id}`}><Button className="w-full justify-between">View Contract <FileSignature className="h-4 w-4" aria-hidden="true" /></Button></Link></CardContent></Card>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) { return <div><p className="text-caption font-semibold uppercase tracking-wider text-gov-text-muted">{label}</p><p className="mt-1 text-sm font-semibold leading-snug text-gov-text-primary">{value}</p></div>; }
function Metric({ label, value }: { label: string; value: string }) { return <div className="border-l-2 border-brand-orange pl-3"><p className="font-display text-3xl font-bold leading-none text-[#162b47]">{value}</p><p className="mt-1 text-caption text-gov-text-secondary">{label}</p></div>; }
