import {
  LayoutDashboard,
  FileCheck,
  Shield,
  ScrollText,
  FileText,
  Box,
  ClipboardCheck,
  FileSignature,
  ListChecks,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "./auth";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavigationConfig {
  role: Role;
  label: string;
  basePath: string;
  items: NavItem[];
}

const adminNav: NavigationConfig = {
  role: "ADMIN",
  label: "Government Administration",
  basePath: "/admin",
  items: [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Registration Requests", href: "/admin/registrations", icon: FileCheck },
    { label: "Security", href: "/admin/security", icon: Shield },
    { label: "Audit Logs", href: "/admin/audit-logs", icon: ScrollText },
  ],
};

const ministryNav: NavigationConfig = {
  role: "MINISTRY",
  label: "Ministry Portal",
  basePath: "/ministry",
  items: [
    { label: "Dashboard", href: "/ministry", icon: LayoutDashboard },
    { label: "Problems", href: "/ministry/problems", icon: FileText },
    { label: "Sandbox", href: "/ministry/sandbox", icon: Box },
    { label: "Evaluation", href: "/ministry/evaluation", icon: ClipboardCheck },
    { label: "Contracts", href: "/ministry/contracts", icon: FileSignature },
  ],
};

const evaluatorNav: NavigationConfig = {
  role: "EVALUATOR",
  label: "Evaluator Portal",
  basePath: "/evaluator",
  items: [
    { label: "Review Queue", href: "/evaluator", icon: ListChecks },
    { label: "Assigned Reviews", href: "/evaluator/assigned", icon: ClipboardList },
  ],
};

export const navigationConfigs: Record<string, NavigationConfig> = {
  admin: adminNav,
  ministry: ministryNav,
  evaluator: evaluatorNav,
};

export function getNavigationConfig(portalKey: string): NavigationConfig | undefined {
  return navigationConfigs[portalKey];
}
