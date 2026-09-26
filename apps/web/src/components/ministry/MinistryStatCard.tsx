import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

interface MinistryStatCardProps {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone: "orange" | "blue" | "green" | "amber";
}

const toneStyles = {
  orange: "bg-brand-orange-tint text-brand-orange",
  blue: "bg-gov-active-light text-gov-blue",
  green: "bg-gov-success-light text-gov-success",
  amber: "bg-gov-warning-light text-gov-warning",
};

export function MinistryStatCard({ label, value, detail, icon: Icon, tone }: MinistryStatCardProps) {
  return (
    <div className="group border border-gov-border-light bg-white p-5 shadow-gov-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-orange/50 hover:shadow-gov-md">
      <div className="flex items-start justify-between gap-3">
        <div className={`flex h-9 w-9 items-center justify-center ${toneStyles[tone]}`}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-gov-text-muted transition-colors group-hover:text-brand-orange" aria-hidden="true" />
      </div>
      <p className="mt-5 text-caption font-semibold uppercase tracking-widest text-gov-text-secondary">{label}</p>
      <p className="mt-1 font-display text-4xl font-bold leading-none text-[#162b47]">{value}</p>
      <p className="mt-2 text-caption text-gov-text-muted">{detail}</p>
    </div>
  );
}
