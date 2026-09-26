import { useState, useCallback } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";
import { Topbar } from "./Topbar";
import type { NavigationConfig } from "../../lib/navigation";
import { getSession } from "../../lib/auth";

interface GovernmentLayoutProps {
  config: NavigationConfig;
}

function resolvePageTitle(config: NavigationConfig, pathname: string): string {
  if (pathname === config.basePath) return config.label;
  if (config.basePath === "/evaluator" && pathname.startsWith("/evaluator/review/")) {
    return "Evaluation Review";
  }
  if (config.basePath === "/ministry" && pathname === "/ministry/problems/new") {
    return "Create Problem";
  }
  if (config.basePath === "/ministry" && pathname.startsWith("/ministry/problems/") && pathname.endsWith("/edit")) {
    return "Edit Problem";
  }
  if (config.basePath === "/ministry" && pathname.startsWith("/ministry/problems/")) {
    return "Problem Overview";
  }
  const match = [...config.items]
    .filter((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
    .sort((first, second) => second.href.length - first.href.length)[0];
  return match?.label ?? config.label;
}

export function GovernmentLayout({ config }: GovernmentLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const title = resolvePageTitle(config, pathname);
  const session = getSession();
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  if (!session || session.role !== config.role) {
    return <Navigate to="/login" replace />;
  }

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
