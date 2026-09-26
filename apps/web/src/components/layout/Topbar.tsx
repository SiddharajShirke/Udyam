import { useState } from "react";
import { Bell, LogOut, Menu, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GovernmentBrand } from "./GovernmentBrand";
import { clearDemoSession, getSession, setDemoSession, type Role } from "../../lib/auth";
import { DEMO_MODE_NOTICE } from "../../mocks/demoData";

interface TopbarProps {
  title: string;
  onMenuClick: () => void;
}

export function Topbar({ title, onMenuClick }: TopbarProps) {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const session = getSession();

  function logout() {
    clearDemoSession();
    navigate("/login", { replace: true });
  }

  function switchRole(role: Exclude<Role, "STARTUP">) {
    setDemoSession(role, true);
    navigate(role === "ADMIN" ? "/admin" : role === "MINISTRY" ? "/ministry" : "/evaluator", { replace: true });
    setProfileOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 bg-white shadow-gov-sm">
      <div className="hidden h-8 items-center justify-between bg-[#292929] px-4 text-[10px] font-semibold tracking-wide text-white/85 sm:flex sm:px-6">
        <span>भारत सरकार | GOVERNMENT OF INDIA</span>
        <span>Ministry of Commerce and Industry · DPIIT</span>
        <span>Our Toll Free Number: 1800 115 565</span>
      </div>
      <div className="flex h-16 items-center border-b border-gov-border-light px-4 sm:px-6">
        <button onClick={onMenuClick} className="-ml-2 rounded-gov p-2 text-gov-text-secondary transition-colors hover:bg-gov-surface lg:hidden" aria-label="Open navigation menu"><Menu className="h-5 w-5" /></button>
        <div className="ml-2 lg:hidden"><GovernmentBrand compact dark={false} /></div>
        <div className="hidden items-center gap-3 lg:flex"><div className="h-2 w-2 rounded-full bg-brand-orange" /><h2 className="text-card-title text-gov-text-primary truncate">{title}</h2><span className="text-caption text-gov-text-muted">Government workspace</span><span className="hidden rounded-full border border-brand-orange/20 bg-brand-orange-tint px-2 py-1 text-[10px] font-semibold text-brand-orange xl:inline-flex">{DEMO_MODE_NOTICE}</span></div>
        <div className="flex-1" />
        <div className="hidden items-center gap-4 text-caption text-gov-text-secondary md:flex"><span>English</span><span className="h-4 w-px bg-gov-border" /></div>
        <div className="relative flex items-center gap-1">
          <button className="relative rounded-gov p-2 text-gov-text-secondary transition-colors hover:bg-gov-surface" aria-label="Notifications"><Bell className="h-5 w-5" /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gov-danger" aria-hidden="true" /></button>
          <button onClick={() => setProfileOpen((open) => !open)} className="rounded-gov p-2 text-gov-text-secondary transition-colors hover:bg-gov-surface" aria-label="User profile" aria-expanded={profileOpen}><User className="h-5 w-5" /></button>
          {profileOpen && <div className="absolute right-0 top-12 z-50 w-72 border border-gov-border-light bg-white p-3 shadow-gov-md"><p className="text-sm font-semibold text-gov-text-primary">{session?.displayName ?? "Demo user"}</p><p className="mt-0.5 text-caption text-gov-text-secondary">{DEMO_MODE_NOTICE}</p><div className="mt-3 border-t border-gov-border-light pt-3"><p className="text-[10px] font-bold uppercase tracking-widest text-gov-text-muted">Switch demo role</p><div className="mt-2 grid grid-cols-3 gap-1.5">{([['ADMIN', 'Admin'], ['MINISTRY', 'Ministry'], ['EVALUATOR', 'Evaluator']] as const).map(([role, label]) => <button key={role} onClick={() => switchRole(role)} className={`border px-2 py-1.5 text-[11px] font-semibold transition-colors ${session?.role === role ? "border-brand-orange bg-brand-orange-tint text-brand-orange" : "border-gov-border text-gov-text-secondary hover:border-brand-orange/50"}`}>{label}</button>)}</div></div><button onClick={logout} className="mt-3 flex w-full items-center gap-2 border-t border-gov-border-light pt-3 text-left text-sm font-semibold text-gov-danger hover:text-red-700"><LogOut className="h-4 w-4" aria-hidden="true" />Log out</button></div>}
        </div>
      </div>
      <div className="h-1 bg-brand-orange" aria-hidden="true" />
    </header>
  );
}
