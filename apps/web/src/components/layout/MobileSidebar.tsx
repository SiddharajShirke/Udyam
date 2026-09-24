import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Landmark } from "lucide-react";
import type { NavigationConfig } from "../../lib/navigation";

interface MobileSidebarProps {
  config: NavigationConfig;
  open: boolean;
  onClose: () => void;
}

export function MobileSidebar({ config, open, onClose }: MobileSidebarProps) {
  const { pathname } = useLocation();

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <nav
        className="fixed inset-y-0 left-0 w-72 bg-gov-navy text-white flex flex-col shadow-lg"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Landmark className="h-7 w-7 text-gov-blue-accent flex-shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-sm font-bold tracking-wide">UDYAM</p>
              <p className="text-[11px] text-white/60 truncate">{config.label}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-gov hover:bg-white/10 transition-colors"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {config.items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-gov transition-colors
                  ${isActive
                    ? "bg-white/15 text-white font-medium"
                    : "text-white/70 hover:bg-white/8 hover:text-white"
                  }`}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon className="h-[18px] w-[18px] flex-shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* User area */}
        <div className="px-4 py-3 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gov-blue-accent/30 flex items-center justify-center text-caption font-bold text-white">
              {config.role.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-caption font-medium truncate">Officer</p>
              <p className="text-[11px] text-white/50 truncate">{config.role.toLowerCase()}@gov.in</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
