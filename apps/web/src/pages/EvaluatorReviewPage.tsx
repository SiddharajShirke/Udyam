import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ClipboardCheck, FileText, Save, Send, ShieldCheck } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { StatusBadge } from "../components/ui/StatusBadge";
import { Button } from "../components/ui/Button";
import { Textarea } from "../components/ui/Textarea";
import { ScoreCriterion } from "../components/evaluator/ScoreCriterion";
import { EVALUATION_CRITERIA, getEvaluatorReview } from "../lib/evaluatorData";

export default function EvaluatorReviewPage() {
  const { id } = useParams();
  const review = getEvaluatorReview(id);
  const [scores, setScores] = useState<Record<string, number>>(() => Object.fromEntries(EVALUATION_CRITERIA.map((criterion) => [criterion.id, 3])));
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [assessment, setAssessment] = useState("");
  const [strengths, setStrengths] = useState("");
  const [improvements, setImprovements] = useState("");
  const [submitted, setSubmitted] = useState(review.status === "completed");
  const [notice, setNotice] = useState("");

  const weightedScore = useMemo(() => EVALUATION_CRITERIA.reduce((total, criterion) => total + ((scores[criterion.id] ?? 0) / 5) * criterion.weight, 0), [scores]);
  const completion = useMemo(() => {
    const criteriaCompleted = EVALUATION_CRITERIA.filter((criterion) => (scores[criterion.id] ?? 0) > 0).length;
    const writtenSections = [assessment, strengths, improvements].filter((value) => value.trim().length > 0).length;
    return Math.round(((criteriaCompleted + writtenSections) / (EVALUATION_CRITERIA.length + 3)) * 100);
  }, [assessment, improvements, scores, strengths]);

  function updateScore(criterionId: string, score: number) { setScores((current) => ({ ...current, [criterionId]: score })); setNotice(""); }
  function updateNote(criterionId: string, note: string) { setNotes((current) => ({ ...current, [criterionId]: note })); }
  function saveDraft() { setNotice("Evaluation draft saved locally in this demo workspace."); }
  function submitEvaluation() { setSubmitted(true); setNotice("Evaluation submitted locally. The review is now marked completed in this demo workspace."); window.scrollTo({ top: 0, behavior: "smooth" }); }

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Evaluator", href: "/evaluator" }, { label: "Assigned Reviews", href: "/evaluator/assigned" }, { label: review.id }]} />
      <PageHeader title="Evaluation Review" description={`${review.problem} · ${review.participant}`} actions={<div className="flex flex-wrap items-center gap-2"><StatusBadge status={submitted ? "completed" : review.status} label={submitted ? "Completed" : review.status === "active" ? "In Progress" : "Pending"} /><Link to="/evaluator/assigned" className="flex items-center gap-1.5 text-sm font-semibold text-gov-text-secondary hover:text-brand-orange"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back</Link></div>} />
      {notice && <div role="status" className="flex items-center gap-2 border border-gov-success/20 bg-gov-success-light px-4 py-3 text-sm text-gov-success"><CheckCircle2 className="h-4 w-4" aria-hidden="true" />{notice}</div>}
      <Card className="border-brand-orange/20 bg-brand-orange-tint/30"><CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-4"><SummaryItem label="Participant" value={review.participant} /><SummaryItem label="Review ID" value={review.id} /><SummaryItem label="Deadline" value={review.deadline} /><SummaryItem label="Current status" value={submitted ? "Completed" : review.status === "active" ? "In Progress" : "Pending"} /></CardContent></Card>
      <Card><CardHeader><SectionLabel icon={FileText} label="SECTION A" title="Problem Summary" /></CardHeader><CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2"><DetailBlock label="Problem statement" value={review.statement} /><DetailBlock label="Expected outcome" value={review.outcome} /><DetailBlock label="Requirements" value={review.requirements} /><DetailBlock label="Constraints" value={review.constraints} /></CardContent></Card>
      <Card><CardHeader><SectionLabel icon={ClipboardCheck} label="SECTION B" title="Submission" /></CardHeader><CardContent><div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_280px]"><div><p className="text-caption font-bold uppercase tracking-widest text-brand-orange">{review.participant}</p><h2 className="mt-1 text-2xl font-bold text-[#162b47]">{review.solutionTitle}</h2><p className="mt-3 text-sm leading-7 text-gov-text-secondary">{review.solutionSummary}</p><div className="mt-5 border-l-2 border-brand-orange pl-3"><p className="text-caption font-semibold uppercase tracking-wider text-gov-text-muted">Technology / approach</p><p className="mt-1 text-sm leading-relaxed text-gov-text-primary">{review.approach}</p></div></div><div className="border border-gov-border-light bg-gov-surface p-4"><p className="text-caption font-semibold uppercase tracking-wider text-gov-text-muted">Submission date</p><p className="mt-1 text-sm font-semibold text-gov-text-primary">{review.submitted}</p><p className="mt-4 text-caption font-semibold uppercase tracking-wider text-gov-text-muted">Participant</p><p className="mt-1 text-sm font-semibold text-gov-text-primary">{review.participant}</p><Button variant="secondary" className="mt-5 w-full"><FileText className="h-4 w-4" aria-hidden="true" />View Submission</Button></div></div></CardContent></Card>
      <Card><CardHeader><SectionLabel icon={ShieldCheck} label="SECTION C" title="KPI Evaluation" /><p className="mt-2 text-sm text-gov-text-secondary">Score each criterion from 1 to 5 and support the assessment with concise evidence.</p></CardHeader><CardContent className="space-y-4">{EVALUATION_CRITERIA.map((criterion) => <ScoreCriterion key={criterion.id} label={criterion.label} weight={criterion.weight} score={scores[criterion.id] ?? 3} note={notes[criterion.id] ?? ""} onScoreChange={(score) => updateScore(criterion.id, score)} onNoteChange={(note) => updateNote(criterion.id, note)} />)}</CardContent></Card>
      <Card><CardHeader><SectionLabel icon={FileText} label="SECTION D" title="Evaluator Comments" /></CardHeader><CardContent className="grid grid-cols-1 gap-5 md:grid-cols-3"><Textarea label="Overall Assessment" placeholder="Summarise the evidence and recommendation" value={assessment} onChange={(event) => setAssessment(event.target.value)} className="min-h-[130px]" /><Textarea label="Strengths" placeholder="What does the solution do well?" value={strengths} onChange={(event) => setStrengths(event.target.value)} className="min-h-[130px]" /><Textarea label="Areas for Improvement" placeholder="What needs attention before selection?" value={improvements} onChange={(event) => setImprovements(event.target.value)} className="min-h-[130px]" /></CardContent></Card>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px]"><Card><CardHeader><SectionLabel icon={CheckCircle2} label="SECTION E" title="Evaluation Summary" /></CardHeader><CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-3"><div><p className="text-caption font-semibold uppercase tracking-wider text-gov-text-muted">Overall score</p><p className="mt-1 font-display text-5xl font-bold leading-none text-[#162b47]">{weightedScore.toFixed(1)}<span className="text-xl text-gov-text-muted">/100</span></p></div><div><p className="text-caption font-semibold uppercase tracking-wider text-gov-text-muted">Rating / status</p><p className="mt-2"><StatusBadge status={weightedScore >= 70 ? "approved" : "pending"} label={weightedScore >= 70 ? "Strong fit" : "Needs review"} /></p></div><div><p className="text-caption font-semibold uppercase tracking-wider text-gov-text-muted">Completion</p><p className="mt-1 font-display text-3xl font-bold text-brand-orange">{completion}%</p><div className="mt-2 h-2 bg-gov-surface"><div className="h-full bg-brand-orange transition-all" style={{ width: `${completion}%` }} /></div></div></CardContent></Card><Card className="border-gov-border-light bg-gov-surface"><CardContent><p className="text-caption font-bold uppercase tracking-widest text-brand-orange">REVIEW STANDARD</p><p className="mt-2 text-sm leading-relaxed text-gov-text-secondary">Keep scores consistent with the published criteria and use notes to make the decision auditable.</p></CardContent></Card></div>
      <div className="flex flex-col-reverse gap-3 border-t border-gov-border-light pt-5 sm:flex-row sm:items-center sm:justify-between"><p className="text-caption text-gov-text-muted">Demo-only evaluator workspace · no backend submission</p><div className="flex flex-col gap-3 sm:flex-row"><Button variant="secondary" onClick={saveDraft}><Save className="h-4 w-4" aria-hidden="true" />Save Draft</Button><Button onClick={submitEvaluation} disabled={submitted}><Send className="h-4 w-4" aria-hidden="true" />{submitted ? "Evaluation Submitted" : "Submit Evaluation"}</Button></div></div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) { return <div><p className="text-caption font-semibold uppercase tracking-wider text-gov-text-muted">{label}</p><p className="mt-1 text-sm font-semibold text-gov-text-primary">{value}</p></div>; }
function DetailBlock({ label, value }: { label: string; value: string }) { return <div className="border-l-2 border-gov-border pl-3"><p className="text-caption font-semibold uppercase tracking-wider text-gov-text-muted">{label}</p><p className="mt-1 text-sm leading-relaxed text-gov-text-secondary">{value}</p></div>; }
function SectionLabel({ icon: Icon, label, title }: { icon: typeof FileText; label: string; title: string }) { return <div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center bg-brand-orange-tint text-brand-orange"><Icon className="h-4 w-4" aria-hidden="true" /></span><div><p className="text-caption font-bold uppercase tracking-widest text-brand-orange">{label}</p><h2 className="mt-0.5 text-xl font-bold text-[#162b47]">{title}</h2></div></div>; }
