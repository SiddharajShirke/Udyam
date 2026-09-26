import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading…" }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16" role="status">
      <Loader2 className="h-8 w-8 text-gov-blue-accent animate-spin" aria-hidden="true" />
      <p className="mt-3 text-body text-gov-text-secondary">{message}</p>
      <span className="sr-only">{message}</span>
    </div>
  );
}
