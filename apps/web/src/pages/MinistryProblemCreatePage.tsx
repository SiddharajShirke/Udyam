import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, FilePlus2, Save } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import { Breadcrumb } from "../components/ui/Breadcrumb";

function SectionHeader({ index, title, description }: { index: string; title: string; description: string }) {
  return (
    <CardHeader>
      <div className="flex gap-3.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-brand-orange-tint font-display text-xl font-bold text-brand-orange">{index}</span>
        <div><h2 className="text-2xl font-bold text-[#162b47]">{title}</h2><p className="mt-1 text-sm text-gov-text-secondary">{description}</p></div>
      </div>
    </CardHeader>
  );
}

export default function MinistryProblemCreatePage() {
  const [notice, setNotice] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>, action: string) {
    event.preventDefault();
    setNotice(`Problem ${action === "publish" ? "published" : "saved as a draft"} in this demo workspace.`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Ministry", href: "/ministry" }, { label: "Problems", href: "/ministry/problems" }, { label: "Create Problem" }]} />
      <PageHeader
        title="Create Government Problem"
        description="Define a problem statement and requirements for participating innovators."
        actions={<Link to="/ministry/problems" className="flex items-center gap-1.5 text-sm font-semibold text-gov-text-secondary hover:text-brand-orange"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to problems</Link>}
      />

      {notice && <div role="status" className="flex items-center gap-2 border border-gov-success/20 bg-gov-success-light px-4 py-3 text-sm text-gov-success"><CheckCircle2 className="h-4 w-4" aria-hidden="true" />{notice}</div>}

      <form className="space-y-5" onSubmit={(event) => handleSubmit(event, "publish")}>
        <Card>
          <SectionHeader index="01" title="Basic Information" description="Start with the public-facing context for this challenge." />
          <CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input label="Problem Title" placeholder="e.g. Early crop blight detection for smallholder farmers" required className="md:col-span-2" />
            <Select label="Ministry / Department" placeholder="Select ministry" required options={[{ value: "agriculture", label: "Ministry of Agriculture & Farmers Welfare" }, { value: "jal", label: "Ministry of Jal Shakti" }, { value: "meity", label: "Ministry of Electronics & IT" }, { value: "health", label: "Ministry of Health & Family Welfare" }]} />
            <Select label="Problem Category" placeholder="Select category" required options={[{ value: "agriculture", label: "Agriculture & Rural" }, { value: "water", label: "Water & Sanitation" }, { value: "digital", label: "Digital Governance" }, { value: "climate", label: "Climate & Energy" }, { value: "health", label: "Health Technology" }]} />
            <Textarea label="Problem Description" placeholder="Describe the public need, current gap, and context for innovators." required className="md:col-span-2 min-h-[130px]" />
          </CardContent>
        </Card>

        <Card>
          <SectionHeader index="02" title="Requirements" description="Make the expected solution boundaries clear and testable." />
          <CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Textarea label="Expected Outcome" placeholder="What should a successful solution achieve?" required />
            <Textarea label="Technical Requirements" placeholder="List performance, integration, and deployment requirements." required />
            <Textarea label="Eligibility Criteria" placeholder="Who can participate in this challenge?" required />
            <Textarea label="Constraints" placeholder="Mention policy, infrastructure, data, or operating constraints." required />
          </CardContent>
        </Card>

        <Card>
          <SectionHeader index="03" title="Timeline" description="Set the windows for submissions and ministry evaluation." />
          <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Input label="Submission Start Date" type="date" required />
            <Input label="Submission End Date" type="date" required />
            <Input label="Evaluation Start Date" type="date" required />
            <Input label="Evaluation End Date" type="date" required />
          </CardContent>
        </Card>

        <Card>
          <SectionHeader index="04" title="Evaluation" description="Tell participants how their solutions will be assessed." />
          <CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Textarea label="Evaluation Criteria" placeholder="Describe the review dimensions and scoring approach." required />
            <Textarea label="KPI / Success Metric" placeholder="Define measurable indicators for the sandbox evaluation." required />
            <Select label="Weight / Priority" required options={[{ value: "high", label: "High priority" }, { value: "medium", label: "Medium priority" }, { value: "standard", label: "Standard" }]} />
          </CardContent>
        </Card>

        <div className="flex flex-col-reverse gap-3 border-t border-gov-border-light pt-5 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/ministry/problems" className="text-center text-sm font-semibold text-gov-text-secondary hover:text-brand-orange">Cancel</Link>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" variant="secondary" onClick={() => setNotice("Problem saved as a draft in this demo workspace.")}><Save className="h-4 w-4" aria-hidden="true" />Save Draft</Button>
            <Button type="submit"><FilePlus2 className="h-4 w-4" aria-hidden="true" />Publish Problem</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
