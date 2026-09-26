import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

interface AdminStatCardProps {
  label: string;
  value: string | number;
  supporting: string;
  icon: LucideIcon;
  /** Optional extra class on the icon wrapper to tint it */
  iconClass?: string;
}

export function AdminStatCard({
  label,
  value,
  supporting,
  icon: Icon,
  iconClass = "bg-gov-surface text-gov-blue",
}: AdminStatCardProps) {
  return (
    <div className="group border border-gov-border-light bg-white p-5 shadow-gov-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-orange/50 hover:shadow-gov-md">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-caption font-semibold text-gov-text-secondary uppercase tracking-widest">
              {label}
            </p>
            <p className="mt-1 font-display text-4xl leading-none font-bold text-[#162b47]">
              {value}
            </p>
            <p className="mt-2 text-caption text-gov-text-muted">{supporting}</p>
          </div>
          <div className="flex items-start gap-2">
            <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center ${iconClass}`} aria-hidden="true">
            <Icon className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-gov-text-muted transition-colors group-hover:text-brand-orange" aria-hidden="true" />
          </div>
        </div>
    </div>
  );
}
