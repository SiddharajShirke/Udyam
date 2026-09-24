import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-white border border-gov-border-light rounded-gov shadow-gov-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardHeader({ children, className = "", ...props }: CardHeaderProps) {
  return (
    <div className={`px-5 py-4 border-b border-gov-border-light ${className}`} {...props}>
      {children}
    </div>
  );
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardContent({ children, className = "", ...props }: CardContentProps) {
  return (
    <div className={`px-5 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
