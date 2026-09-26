import { Link, useParams } from "react-router-dom";
import { Activity, ArrowRight, Box, CheckCircle2, Clock3, FileText, PlayCircle } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { StatusBadge } from "../components/ui/StatusBadge";
import { KpiProgress } from "../components/ministry/KpiProgress";
import { getProblem, KPI_RESULTS, PARTICIPANTS } from "../lib/ministryData";

const runStatus = { completed: "completed", active: "active", pending: "pending" } as const;

export default function MinistrySandboxPage() {
  const { id } = useParams();
  const problem = getProblem(id);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Ministry", href: "/ministry" }, { label: "Sandbox", href: "/ministry/sandbox/PRB-1042" }, { label: problem.id }]} />
      <PageHeader title="Sandbox" description={`Monitor execution and evaluation progress for ${problem.title}.`} actions={<StatusBadge status="active" label="Running" />} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.85fr)]">
        <div className="space-y-6">
          <Card><CardHeader><div className="flex items-start justify-between gap-3"><div><p className="text-caption font-bold uppercase tracking-widest text-brand-orange">SANDBOX STATUS</p><h2 className="mt-1 text-xl font-bold text-[#162b47]">{problem.title}</h2><p className="mt-1 text-caption text-gov-text-secondary">{problem.id} · 4 participants currently running validation</p></div><div className="flex h-10 w-10 items-center justify-center bg-brand-orange-tint text-brand-orange"><Box className="h-5 w-5" aria-hidden="true" /></div></div></CardHeader><CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3"><StatusBlock label="Environment" value="Running" tone="active" /><StatusBlock label="Last execution" value="Today, 10:42" tone="completed" /><StatusBlock label="Visibility" value="Summary only" tone="pending" /></CardContent></Card>
          <Card><CardHeader><p className="text-caption font-bold uppercase tracking-widest text-brand-orange">AGGREGATE KPIS</p><h2 className="mt-1 text-xl font-bold text-[#162b47]">KPI Progress</h2></CardHeader><CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">{KPI_RESULTS.map((kpi) => <KpiProgress key={kpi.label} {...kpi} />)}</CardContent></Card>
          <Card><CardHeader><h2 className="text-xl font-bold text-[#162b47]">Participant Overview</h2></CardHeader><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-body"><thead><tr className="border-b border-gov-border-light">{["Participant", "Run status", "Score", "KPI progress", "Last run"].map((heading) => <th key={heading} className="px-5 py-3 text-left text-caption font-semibold uppercase tracking-wider text-gov-text-secondary">{heading}</th>)}</tr></thead><tbody className="divide-y divide-gov-border-light">{PARTICIPANTS.map((participant) => <tr key={participant.name} className="hover:bg-gov-surface/50"><td className="px-5 py-3 font-semibold text-gov-text-primary">{participant.name}</td><td className="px-5 py-3"><StatusBadge status={runStatus[participant.status as keyof typeof runStatus]} label={participant.status === "active" ? "Running" : participant.status === "completed" ? "Completed" : "Pending"} /></td><td className="px-5 py-3 font-display text-xl font-bold text-[#162b47]">{participant.score}</td><td className="px-5 py-3"><div className="flex items-center gap-2"><div className="h-1.5 w-24 bg-gov-surface"><div className="h-full bg-brand-orange" style={{ width: `${participant.progress}%` }} /></div><span className="text-caption text-gov-text-secondary">{participant.progress}%</span></div></td><td className="px-5 py-3 text-caption text-gov-text-secondary">{participant.lastRun}</td></tr>)}</tbody></table></div></CardContent></Card>
        </div>
        <div className="space-y-6"><Card><CardHeader><div className="flex items-center gap-2"><Activity className="h-4 w-4 text-brand-orange" aria-hidden="true" /><h2 className="text-xl font-bold text-[#162b47]">Execution Activity</h2></div></CardHeader><CardContent><div className="space-y-5">{[["Sandbox run started", "Today, 10:32", PlayCircle, "text-brand-orange"], ["Execution completed", "Today, 10:42", CheckCircle2, "text-gov-success"], ["KPI results calculated", "Today, 10:43", FileText, "text-gov-blue-accent"], ["Evaluation updated", "Today, 10:45", Clock3, "text-gov-warning"]].map(([title, time, Icon, color]) => <div key={title as string} className="flex gap-3"><span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-gov-surface"><Icon className={`h-4 w-4 ${color}`} aria-hidden="true" /></span><div><p className="text-sm font-semibold text-gov-text-primary">{title as string}</p><p className="mt-0.5 text-caption text-gov-text-muted">{time as string}</p></div></div>)}</div></CardContent></Card><Card className="border-brand-orange/20 bg-brand-orange-tint/40"><CardContent><p className="text-caption font-bold uppercase tracking-widest text-brand-orange">NEXT STEP</p><h2 className="mt-1 text-xl font-bold text-[#162b47]">Review structured evaluation</h2><p className="mt-2 text-sm leading-relaxed text-gov-text-secondary">Only summary metrics are shown here. Detailed execution visibility can be aligned with the final permission model later.</p><Link to={`/ministry/evaluation/${problem.id}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange hover:gap-2 transition-all">Open evaluation <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></CardContent></Card></div>
      </div>
    </div>
  );
}

function StatusBlock({ label, value, tone }: { label: string; value: string; tone: "active" | "completed" | "pending" }) { return <div className="border-l-2 border-gov-border pl-3"><p className="text-caption uppercase tracking-wider text-gov-text-muted">{label}</p><div className="mt-1 flex items-center gap-2"><StatusBadge status={tone} label={value} /></div></div>; }
