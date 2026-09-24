import { type TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={textareaId} className="block text-body font-medium text-gov-text-primary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full px-3 py-2 text-body bg-white border rounded-gov transition-colors resize-y min-h-[80px]
            placeholder:text-gov-text-muted
            focus:outline-none focus:ring-2 focus:ring-gov-blue-accent/40 focus:border-gov-blue-accent
            disabled:bg-gov-surface disabled:text-gov-text-muted disabled:cursor-not-allowed
            ${error ? "border-gov-danger" : "border-gov-border"} ${className}`}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error && textareaId ? `${textareaId}-error` : undefined}
          {...props}
        />
        {error && textareaId && (
          <p id={`${textareaId}-error`} className="text-caption text-gov-danger">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
