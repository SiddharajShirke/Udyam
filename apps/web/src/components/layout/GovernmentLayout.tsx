import { useState, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";
import { Topbar } from "./Topbar";
import type { NavigationConfig } from "../../lib/navigation";

interface GovernmentLayoutProps {
  config: NavigationConfig;
}

function resolvePageTitle(config: NavigationConfig, pathname: string): string {
  const match = config.items.find((item) => item.href === pathname);
  return match?.label ?? config.label;
}

export function GovernmentLayout({ config }: GovernmentLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const title = resolvePageTitle(config, pathname);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <div className="min-h-screen bg-gov-surface">
      <Sidebar config={config} />
      <MobileSidebar config={config} open={mobileOpen} onClose={closeMobile} />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Topbar title={title} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
