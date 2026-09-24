const statusStyles = {
  pending: "bg-gov-warning-light text-gov-warning border-gov-warning/20",
  approved: "bg-gov-success-light text-gov-success border-gov-success/20",
  rejected: "bg-gov-danger-light text-gov-danger border-gov-danger/20",
  draft: "bg-gov-draft-light text-gov-draft border-gov-draft/20",
  active: "bg-gov-active-light text-gov-active border-gov-active/20",
  completed: "bg-gov-success-light text-gov-success border-gov-success/20",
} as const;

export type StatusType = keyof typeof statusStyles;

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className = "" }: StatusBadgeProps) {
  const displayLabel = label ?? status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-caption font-medium border rounded-full ${statusStyles[status]} ${className}`}
    >
      {displayLabel}
    </span>
  );
}
