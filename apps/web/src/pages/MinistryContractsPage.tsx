import { Link, useParams } from "react-router-dom";
import { CalendarDays, Download, FileSignature, FileText, ShieldCheck } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { StatusBadge } from "../components/ui/StatusBadge";
import { Button } from "../components/ui/Button";
import { getProblem, MILESTONES } from "../lib/ministryData";
import { DEMO_CHALLENGE, DEMO_PARTICIPANT } from "../mocks/demoData";

export default function MinistryContractsPage() {
  const { id } = useParams();
  const problem = getProblem(id);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Ministry", href: "/ministry" }, { label: "Contracts", href: "/ministry/contracts/PRB-1042" }, { label: problem.id }]} />
      <PageHeader title="Contract" description="Review contract preparation and implementation status." actions={<StatusBadge status="pending" label="Under Review" />} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.85fr)]"><div className="space-y-6"><Card><CardHeader><div className="flex items-center gap-2"><FileSignature className="h-4 w-4 text-brand-orange" aria-hidden="true" /><h2 className="text-xl font-bold text-[#162b47]">Contract Summary</h2></div></CardHeader><CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2"><Info label="Contract value" value="₹35 Lakh" /><Info label="Start date" value="15 Dec 2026" /><Info label="End date" value="15 Jun 2027" /><Info label="Duration" value="6 months" /><Info label="Scope" value="Pilot deployment across 3 districts" /><Info label="Problem ID" value={problem.id} /></CardContent></Card>
      <Card><CardHeader><h2 className="text-xl font-bold text-[#162b47]">Parties</h2></CardHeader><CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2"><Party label="Ministry" value={DEMO_CHALLENGE.department} /><Party label="Selected Participant" value={DEMO_PARTICIPANT.name} /></CardContent></Card>
      <Card><CardHeader><h2 className="text-xl font-bold text-[#162b47]">Problem</h2></CardHeader><CardContent><div className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center bg-brand-orange-tint text-brand-orange"><FileText className="h-4 w-4" aria-hidden="true" /></span><div><p className="text-sm font-semibold text-gov-text-primary">{DEMO_CHALLENGE.title}</p><p className="mt-1 text-caption text-gov-text-secondary">{DEMO_CHALLENGE.id} · {DEMO_CHALLENGE.category}</p></div></div></CardContent></Card>
      <Card><CardHeader><div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-brand-orange" aria-hidden="true" /><h2 className="text-xl font-bold text-[#162b47]">Milestones</h2></div></CardHeader><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-body"><thead><tr className="border-b border-gov-border-light">{["Milestone", "Due date", "Status", "Progress"].map((heading) => <th key={heading} className="px-5 py-3 text-left text-caption font-semibold uppercase tracking-wider text-gov-text-secondary">{heading}</th>)}</tr></thead><tbody className="divide-y divide-gov-border-light">{MILESTONES.map((milestone) => <tr key={milestone.label}><td className="px-5 py-3 font-semibold text-gov-text-primary">{milestone.label}</td><td className="px-5 py-3 text-caption text-gov-text-secondary">{milestone.dueDate}</td><td className="px-5 py-3"><StatusBadge status={milestone.status as "pending" | "active" | "completed"} label={milestone.status === "active" ? "In Progress" : undefined} /></td><td className="px-5 py-3"><div className="flex items-center gap-2"><div className="h-1.5 w-24 bg-gov-surface"><div className="h-full bg-brand-orange" style={{ width: `${milestone.progress}%` }} /></div><span className="text-caption text-gov-text-secondary">{milestone.progress}%</span></div></td></tr>)}</tbody></table></div></CardContent></Card></div>
      <div className="space-y-6"><Card className="border-brand-orange/20 bg-brand-orange-tint/30"><CardContent><div className="flex h-10 w-10 items-center justify-center bg-white text-brand-orange"><ShieldCheck className="h-5 w-5" aria-hidden="true" /></div><h2 className="mt-4 text-xl font-bold text-[#162b47]">Ready for ministry review</h2><p className="mt-2 text-sm leading-relaxed text-gov-text-secondary">The draft is prepared from the selected evaluation outcome. Review the scope and milestones before approval.</p><div className="mt-5 grid gap-2"><Button>Review Contract</Button><Button variant="secondary"><Download className="h-4 w-4" aria-hidden="true" />Download Draft</Button><Button variant="secondary">Approve</Button></div></CardContent></Card><Card><CardHeader><h2 className="text-xl font-bold text-[#162b47]">Implementation status</h2></CardHeader><CardContent className="space-y-4"><Info label="Current stage" value="Ministry review" /><Info label="Last updated" value="Today, 10:45" /><Info label="Owner" value="Procurement cell" /></CardContent></Card><Link to={`/ministry/problems/${problem.id}`} className="block text-center text-sm font-semibold text-brand-orange hover:underline">Return to problem overview</Link></div></div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) { return <div><p className="text-caption font-semibold uppercase tracking-wider text-gov-text-muted">{label}</p><p className="mt-1 text-sm font-semibold leading-snug text-gov-text-primary">{value}</p></div>; }
function Party({ label, value }: { label: string; value: string }) { return <div className="border-l-2 border-brand-orange pl-3"><p className="text-caption font-semibold uppercase tracking-wider text-gov-text-muted">{label}</p><p className="mt-1 text-sm font-semibold text-gov-text-primary">{value}</p></div>; }
