import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-gov-navy text-white hover:bg-gov-navy-light active:bg-gov-blue focus-visible:ring-gov-blue-accent",
  secondary:
    "bg-white text-gov-navy border border-gov-border hover:bg-gov-surface active:bg-gray-100 focus-visible:ring-gov-blue-accent",
  danger:
    "bg-gov-danger text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-gov-danger",
  ghost:
    "text-gov-text-secondary hover:bg-gov-surface active:bg-gray-200 focus-visible:ring-gov-blue-accent",
} as const;

const sizes = {
  sm: "px-3 py-1.5 text-caption",
  md: "px-4 py-2 text-body",
  lg: "px-5 py-2.5 text-body",
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, disabled, children, className = "", ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-gov transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        disabled:opacity-50 disabled:pointer-events-none
        ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  ),
);

Button.displayName = "Button";
