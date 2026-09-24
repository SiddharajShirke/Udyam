import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-body font-medium text-gov-text-primary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-3 py-2 text-body bg-white border rounded-gov transition-colors
            placeholder:text-gov-text-muted
            focus:outline-none focus:ring-2 focus:ring-gov-blue-accent/40 focus:border-gov-blue-accent
            disabled:bg-gov-surface disabled:text-gov-text-muted disabled:cursor-not-allowed
            ${error ? "border-gov-danger" : "border-gov-border"} ${className}`}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error && inputId ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && inputId && (
          <p id={`${inputId}-error`} className="text-caption text-gov-danger">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
