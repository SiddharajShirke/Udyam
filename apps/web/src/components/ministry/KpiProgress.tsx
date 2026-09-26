interface KpiProgressProps {
  label: string;
  value: number;
  detail?: string;
}

export function KpiProgress({ label, value, detail }: KpiProgressProps) {
  const barColor = value >= 85 ? "bg-gov-success" : value >= 70 ? "bg-brand-orange" : "bg-gov-warning";

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-gov-text-primary">{label}</p>
        <span className="font-display text-2xl font-bold text-[#162b47]">{value}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden bg-gov-surface" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={`${label} ${value}%`}>
        <div className={`h-full ${barColor} transition-all duration-500`} style={{ width: `${value}%` }} />
      </div>
      {detail && <p className="mt-1 text-caption text-gov-text-muted">{detail}</p>}
    </div>
  );
}
