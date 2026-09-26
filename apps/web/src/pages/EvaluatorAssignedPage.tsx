import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FileCheck2, Search } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { StatusBadge } from "../components/ui/StatusBadge";
import { DataTable, type Column } from "../components/ui/DataTable";
import { EVALUATOR_REVIEWS, type EvaluatorReview } from "../lib/evaluatorData";

export default function EvaluatorAssignedPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const categories = Array.from(new Set(EVALUATOR_REVIEWS.map((review) => review.category)));
  const filteredReviews = useMemo(() => EVALUATOR_REVIEWS.filter((review) => {
    const matchesQuery = `${review.problem} ${review.participant}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (status === "all" || review.status === status) && (category === "all" || review.category === category);
  }), [category, query, status]);
  const columns: Column<EvaluatorReview>[] = [
    { key: "problem", header: "Problem", render: (review) => <div className="min-w-[220px]"><Link to={`/evaluator/review/${review.id}`} className="font-semibold text-gov-text-primary hover:text-brand-orange">{review.problem}</Link><span className="mt-0.5 block text-caption text-gov-text-muted">{review.id}</span></div> },
    { key: "participant", header: "Participant", render: (review) => <span className="text-caption text-gov-text-secondary">{review.participant}</span> },
    { key: "category", header: "Category", render: (review) => <span className="text-caption text-gov-text-secondary">{review.category}</span> },
    { key: "assigned", header: "Assigned", render: (review) => <span className="whitespace-nowrap text-caption text-gov-text-secondary">{review.assigned}</span> },
    { key: "deadline", header: "Deadline", render: (review) => <span className="whitespace-nowrap text-caption text-gov-text-secondary">{review.deadline}</span> },
    { key: "status", header: "Status", render: (review) => <StatusBadge status={review.status} label={review.status === "active" ? "In Progress" : undefined} /> },
    { key: "score", header: "Score", render: (review) => <span className="font-display text-xl font-bold text-[#162b47]">{review.score ?? "—"}</span> },
    { key: "action", header: "Action", render: (review) => <Link to={`/evaluator/review/${review.id}`}><Button variant="ghost" size="sm">Review</Button></Link> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assigned Reviews"
        description="Review and complete evaluations assigned to you."
      />
      <Card><CardContent className="space-y-5"><div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_190px_230px]"><div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gov-text-muted" aria-hidden="true" /><Input aria-label="Search assigned reviews" placeholder="Search problems or participants" value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" /></div><Select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value)} options={[{ value: "all", label: "All statuses" }, { value: "pending", label: "Pending" }, { value: "active", label: "In Progress" }, { value: "completed", label: "Completed" }]} /><Select aria-label="Filter by category" value={category} onChange={(event) => setCategory(event.target.value)} options={[{ value: "all", label: "All categories" }, ...categories.map((item) => ({ value: item, label: item }))]} /></div><div className="flex items-center justify-between gap-3"><p className="text-caption text-gov-text-muted">Showing {filteredReviews.length} of {EVALUATOR_REVIEWS.length} assigned reviews</p><span className="hidden items-center gap-1.5 text-caption text-gov-text-muted sm:flex"><FileCheck2 className="h-3.5 w-3.5 text-brand-orange" aria-hidden="true" />Local demo workspace</span></div><DataTable columns={columns} data={filteredReviews} keyExtractor={(review) => review.id} emptyMessage="No assigned reviews match your filters." /></CardContent></Card>
    </div>
  );
}
