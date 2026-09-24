import { Link, useLocation } from "react-router-dom";
import type { NavigationConfig } from "../../lib/navigation";
import { Landmark } from "lucide-react";

interface SidebarProps {
  config: NavigationConfig;
}

export function Sidebar({ config }: SidebarProps) {
  const { pathname } = useLocation();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-gov-navy text-white">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-white/10">
        <Landmark className="h-7 w-7 text-gov-blue-accent flex-shrink-0" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-sm font-bold tracking-wide truncate">UDYAM</p>
          <p className="text-[11px] text-white/60 truncate">{config.label}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto" aria-label="Sidebar navigation">
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
      </nav>

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
    </aside>
  );
}
