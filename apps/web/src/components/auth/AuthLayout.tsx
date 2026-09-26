import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const governmentEmblemUrl = "https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg";

interface AuthLayoutProps {
  children: ReactNode;
  /** Optional "back" link — defaults to "/" */
  backHref?: string;
  backLabel?: string;
}

/** Shared wrapper for all auth pages: govt top bar + brand nav + content area */
export function AuthLayout({ children, backHref = "/", backLabel = "Back to Home" }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream font-sans">
      {/* ── Government top bar ── */}
      <div className="bg-[#292929] text-white text-[11px]">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={governmentEmblemUrl} alt="Government of India emblem" className="h-6 w-5 brightness-0 invert" />
            <span className="font-semibold tracking-wide">
              भारत सरकार | GOVERNMENT OF INDIA
            </span>
            <span className="hidden sm:inline text-white/40 ml-1">
              · Ministry of Commerce & Industry
            </span>
          </div>
          <span className="hidden md:block text-white/50">
            Toll Free: 1800 115 565 (10:00 AM – 05:30 PM)
          </span>
        </div>
      </div>

      {/* ── DPIIT strip ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
          <span className="font-display font-bold text-gov-navy text-xl tracking-tight">DPIIT</span>
          <span className="text-brand-orange font-bold text-sm">#startupindia</span>
        </div>
      </div>

      {/* ── Brand nav ── */}
      <nav className="border-b-4 border-brand-orange bg-white">
        <div className="max-w-7xl mx-auto px-4 h-[52px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1">
            <span className="font-display text-brand-orange font-bold text-2xl tracking-tight">udyam</span>
            <span className="font-display text-[#24243a] font-medium text-2xl tracking-tight">procure</span>
          </Link>
          <Link
            to={backHref}
            className="flex items-center gap-1.5 text-caption text-gray-600 hover:text-brand-orange transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {backLabel}
          </Link>
        </div>
      </nav>

      {/* ── Page content ── */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        {children}
      </main>

      {/* ── Footer strip ── */}
      <div className="bg-[#111] text-white/40 text-[11px] text-center py-3">
        © 2026 InnovateProcure · Government of India · DPIIT · All rights reserved
      </div>
    </div>
  );
}
