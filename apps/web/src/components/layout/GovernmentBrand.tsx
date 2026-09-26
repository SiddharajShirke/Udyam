import { Landmark } from "lucide-react";

const emblemUrl = "https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg";

interface GovernmentBrandProps {
  compact?: boolean;
  dark?: boolean;
}

export function GovernmentBrand({ compact = false, dark = true }: GovernmentBrandProps) {
  const textColor = dark ? "text-white" : "text-gov-navy";
  const mutedColor = dark ? "text-white/65" : "text-gov-text-secondary";

  return (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-3"}`}>
      <div className={`flex shrink-0 items-center justify-center ${compact ? "h-9 w-7" : "h-11 w-9"}`}>
        <img src={emblemUrl} alt="Government of India emblem" className={`max-h-full max-w-full ${dark ? "brightness-0 invert" : ""}`} />
        <Landmark className="hidden h-7 w-7 text-brand-orange" aria-hidden="true" />
      </div>
      <div className="min-w-0 leading-tight">
        <p className={`${compact ? "text-[11px]" : "text-sm"} font-bold tracking-wide ${textColor}`}>भारत सरकार</p>
        <p className={`${compact ? "text-[9px]" : "text-[10px]"} font-medium uppercase tracking-wide ${mutedColor}`}>Government of India</p>
      </div>
      <span className={`${compact ? "ml-1" : "ml-2"} h-8 w-px ${dark ? "bg-white/20" : "bg-gov-border"}`} aria-hidden="true" />
      <div className="min-w-0 leading-tight">
        <p className={`${compact ? "text-[11px]" : "text-sm"} font-bold ${textColor}`}>DPIIT</p>
        <p className="text-[10px] font-bold text-brand-orange">#startupindia</p>
      </div>
    </div>
  );
}
