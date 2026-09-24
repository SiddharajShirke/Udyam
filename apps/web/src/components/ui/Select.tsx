import { type SelectHTMLAttributes, forwardRef } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, options, placeholder, className = "", ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-body font-medium text-gov-text-primary">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`w-full appearance-none px-3 py-2 pr-8 text-body bg-white border rounded-gov transition-colors
              focus:outline-none focus:ring-2 focus:ring-gov-blue-accent/40 focus:border-gov-blue-accent
              disabled:bg-gov-surface disabled:text-gov-text-muted disabled:cursor-not-allowed
              ${error ? "border-gov-danger" : "border-gov-border"} ${className}`}
            aria-invalid={error ? "true" : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gov-text-muted pointer-events-none"
            aria-hidden="true"
          />
        </div>
        {error && selectId && (
          <p id={`${selectId}-error`} className="text-caption text-gov-danger">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
