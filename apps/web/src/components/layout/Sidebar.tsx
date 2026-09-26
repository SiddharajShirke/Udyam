import { Link, useLocation } from "react-router-dom";
import type { NavigationConfig } from "../../lib/navigation";
import { GovernmentBrand } from "./GovernmentBrand";
import { getSession } from "../../lib/auth";

interface SidebarProps {
  config: NavigationConfig;
}

export function Sidebar({ config }: SidebarProps) {
  const { pathname } = useLocation();
  const session = getSession();
  const activeHref = [...config.items]
    .filter((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
    .sort((first, second) => second.href.length - first.href.length)[0]?.href;

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-[#292929] text-white">
      {/* Brand */}
      <div className="border-b border-white/10 bg-[#242424] px-5 py-4">
        <GovernmentBrand compact />
        <div className="mt-3 flex items-baseline gap-2 pl-1">
          <p className="font-display text-lg font-bold tracking-wide text-white">UDYAM</p>
          <p className="truncate text-[10px] font-medium uppercase tracking-widest text-white/50">{config.label}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto" aria-label="Sidebar navigation">
        {config.items.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-gov transition-colors
                ${isActive
                  ? "border-l-2 border-brand-orange bg-white/10 pl-[10px] text-white font-medium"
                  : "text-white/65 hover:bg-white/8 hover:text-white"
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
          <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-caption font-bold text-white">
            {config.role.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-caption font-medium truncate">{session?.displayName ?? "Demo Officer"}</p>
            <p className="text-[11px] text-white/50 truncate">{session?.email ?? "demo@gov.in"}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
