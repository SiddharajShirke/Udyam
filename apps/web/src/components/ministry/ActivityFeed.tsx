import { CheckCircle2, CircleDot, Clock3, FileText } from "lucide-react";
import type { ActivityItem } from "../../lib/ministryData";

interface ActivityFeedProps {
  items: ActivityItem[];
  compact?: boolean;
}

const icons = {
  orange: FileText,
  blue: CircleDot,
  green: CheckCircle2,
  amber: Clock3,
};

const dots = {
  orange: "bg-brand-orange",
  blue: "bg-gov-blue-accent",
  green: "bg-gov-success",
  amber: "bg-gov-warning",
};

export function ActivityFeed({ items, compact = false }: ActivityFeedProps) {
  return (
    <div className="divide-y divide-gov-border-light">
      {items.map((item) => {
        const Icon = icons[item.tone];
        return (
          <div key={item.id} className={`flex gap-3 ${compact ? "py-3" : "py-4"}`}>
            <span className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center ${dots[item.tone]}/10`}>
              <Icon className={`h-3.5 w-3.5 ${item.tone === "orange" ? "text-brand-orange" : item.tone === "blue" ? "text-gov-blue-accent" : item.tone === "green" ? "text-gov-success" : "text-gov-warning"}`} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gov-text-primary">{item.title}</p>
              <p className="mt-0.5 truncate text-caption text-gov-text-secondary">{item.detail}</p>
            </div>
            <time className="shrink-0 text-caption text-gov-text-muted">{item.time}</time>
          </div>
        );
      })}
    </div>
  );
}
