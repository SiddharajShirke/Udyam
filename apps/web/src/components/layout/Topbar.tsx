import { Bell, Menu, User } from "lucide-react";

interface TopbarProps {
  title: string;
  onMenuClick: () => void;
}

export function Topbar({ title, onMenuClick }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center h-16 px-4 sm:px-6 bg-white border-b border-gov-border-light shadow-gov-sm">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 -ml-2 rounded-gov text-gov-text-secondary hover:bg-gov-surface transition-colors"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Page title */}
      <h2 className="ml-2 lg:ml-0 text-card-title text-gov-text-primary truncate">{title}</h2>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          className="p-2 rounded-gov text-gov-text-secondary hover:bg-gov-surface transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-gov-danger" aria-hidden="true" />
        </button>
        <button
          className="p-2 rounded-gov text-gov-text-secondary hover:bg-gov-surface transition-colors"
          aria-label="User profile"
        >
          <User className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
