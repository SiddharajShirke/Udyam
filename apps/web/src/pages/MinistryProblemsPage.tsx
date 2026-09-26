import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, FileEdit, FilePlus2, Search, Settings2 } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { StatusBadge } from "../components/ui/StatusBadge";
import { DataTable, type Column } from "../components/ui/DataTable";
import { MINISTRY_PROBLEMS, type MinistryProblem } from "../lib/ministryData";

export default function MinistryProblemsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");

  const categories = Array.from(new Set(MINISTRY_PROBLEMS.map((problem) => problem.category)));
  const filteredProblems = useMemo(() => MINISTRY_PROBLEMS.filter((problem) => {
    const matchesQuery = `${problem.title} ${problem.department}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === "all" || problem.status === status;
    const matchesCategory = category === "all" || problem.category === category;
    return matchesQuery && matchesStatus && matchesCategory;
  }), [category, query, status]);

  const columns: Column<MinistryProblem>[] = [
    { key: "problem", header: "Problem", render: (problem) => <div className="min-w-[230px]"><Link to={`/ministry/problems/${problem.id}`} className="font-semibold text-gov-text-primary hover:text-brand-orange">{problem.title}</Link><span className="mt-0.5 block text-caption text-gov-text-muted">{problem.id} · {problem.department}</span></div> },
    { key: "category", header: "Category", render: (problem) => <span className="text-caption text-gov-text-secondary">{problem.category}</span> },
    { key: "published", header: "Published", render: (problem) => <span className="whitespace-nowrap text-caption text-gov-text-secondary">{problem.published}</span> },
    { key: "participants", header: "Participants", render: (problem) => <span>{problem.participants}</span> },
    { key: "status", header: "Status", render: (problem) => <StatusBadge status={problem.status} label={problem.status === "active" ? "Published" : problem.status === "pending" ? "Evaluation" : undefined} /> },
    { key: "actions", header: "Actions", render: (problem) => <div className="flex items-center gap-2"><Link to={`/ministry/problems/${problem.id}`} aria-label={`View ${problem.title}`} className="text-gov-text-secondary hover:text-brand-orange"><Eye className="h-4 w-4" /></Link><Link to={`/ministry/problems/${problem.id}`} aria-label={`Manage ${problem.title}`} className="text-gov-text-secondary hover:text-brand-orange"><Settings2 className="h-4 w-4" /></Link><Link to={`/ministry/problems/${problem.id}`} aria-label={`Edit ${problem.title}`} className="text-gov-text-secondary hover:text-brand-orange"><FileEdit className="h-4 w-4" /></Link></div> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Government Problems"
        description="Create, publish, and monitor innovation challenges submitted by the ministry."
        actions={<Link to="/ministry/problems/new"><Button><FilePlus2 className="h-4 w-4" aria-hidden="true" />Create Problem</Button></Link>}
      />
      <Card>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_190px_230px]">
            <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gov-text-muted" aria-hidden="true" /><Input aria-label="Search problems" placeholder="Search problems or departments" value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" /></div>
            <Select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value)} options={[{ value: "all", label: "All statuses" }, { value: "draft", label: "Draft" }, { value: "active", label: "Published" }, { value: "pending", label: "Evaluation" }, { value: "completed", label: "Completed" }]} />
            <Select aria-label="Filter by category" value={category} onChange={(event) => setCategory(event.target.value)} options={[{ value: "all", label: "All categories" }, ...categories.map((item) => ({ value: item, label: item }))]} />
          </div>
          <div className="flex items-center justify-between gap-3"><p className="text-caption text-gov-text-muted">Showing {filteredProblems.length} of {MINISTRY_PROBLEMS.length} government problems</p><span className="hidden items-center gap-1.5 text-caption text-gov-text-muted sm:flex"><span className="h-2 w-2 rounded-full bg-brand-orange" />Demo workspace data</span></div>
          <DataTable columns={columns} data={filteredProblems} keyExtractor={(problem) => problem.id} emptyMessage="No problems match your filters." />
        </CardContent>
      </Card>
    </div>
  );
}
