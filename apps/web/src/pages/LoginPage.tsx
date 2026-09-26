import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Shield,
  Building2,
  ClipboardList,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { setDemoSession } from "../lib/auth";
import { MINISTRY_OPTIONS } from "../lib/ministryData";

/* ─────────────────────────── types ─────────────────────────────── */

type Role = "ministry" | "evaluator" | "admin";

interface RoleConfig {
  id: Role;
  label: string;
  icon: typeof Shield;
  color: string;
  activeColor: string;
  portal: string;
  portalHref: string;
}

/* ─────────────────────────── config ────────────────────────────── */

const ROLES: RoleConfig[] = [
  {
    id: "ministry",
    label: "Ministry",
    icon: Building2,
    color: "text-brand-orange",
    activeColor: "bg-brand-orange",
    portal: "Ministry Portal",
    portalHref: "/ministry",
  },
  {
    id: "evaluator",
    label: "Evaluator",
    icon: ClipboardList,
    color: "text-gov-blue",
    activeColor: "bg-gov-navy",
    portal: "Evaluator Portal",
    portalHref: "/evaluator",
  },
  {
    id: "admin",
    label: "Admin",
    icon: Shield,
    color: "text-gov-navy",
    activeColor: "bg-gov-navy",
    portal: "Admin Portal",
    portalHref: "/admin",
  },
];

/* ─────────────────────────── page ──────────────────────────────── */

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("ministry");
  const [ministry, setMinistry] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const active = ROLES.find((r) => r.id === role)!;

  return (
    <AuthLayout backHref="/" backLabel="Back to Home">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-gov-md overflow-hidden">
          {/* Orange top accent bar */}
          <div className="h-1 bg-brand-orange w-full" />

          <div className="px-8 pt-8 pb-9">
            {/* Header */}
            <div className="mb-6">
              <p className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-1.5">
                DPIIT INNOVATION PORTAL
              </p>
              <h1 className="text-3xl font-black text-gray-900">Sign In</h1>
              <p className="text-base text-gray-600 mt-1">
                Access your{" "}
                <span className="text-brand-orange font-semibold">{active.portal}</span>
              </p>
            </div>

            {/* Demo role access */}
            <div className="mb-6">
              <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-brand-orange">Demo Access</p>
              <div className="grid grid-cols-3 gap-2.5">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  type="button"
                  className={`flex min-h-[92px] flex-col items-center justify-center gap-1.5 border px-2.5 py-3 text-xs font-bold transition-colors ${
                    role === r.id
                      ? `${r.activeColor} border-transparent text-white shadow-gov-sm`
                      : "border-gray-200 bg-white text-gray-600 hover:border-brand-orange/50 hover:bg-brand-orange-tint"
                  }`}
                  aria-pressed={role === r.id}
                >
                  <r.icon className="h-4.5 w-4.5" aria-hidden="true" />
                  <span>{r.label}</span>
                  <span className="text-[11px] font-medium opacity-90">Enter as {r.label}</span>
                </button>
              ))}
              </div>
            </div>

            {/* Form */}
            <form
                onSubmit={(e) => {
                e.preventDefault();
                  setDemoSession(role === "admin" ? "ADMIN" : role === "ministry" ? "MINISTRY" : "EVALUATOR", rememberMe);
                  navigate(active.portalHref);
              }}
              className="space-y-5"
            >
              {/* Ministry / Department Dropdown (Ministry Login) */}
              {role === "ministry" && (
                <div className="p-4 border border-dashed border-brand-orange/50 bg-brand-orange-surface/30 rounded-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="ministry" className="block text-sm font-bold text-gray-900">
                      Select Ministry
                    </label>
                    <span className="text-xs font-semibold text-brand-orange bg-brand-orange-tint px-2 py-0.5 rounded border border-brand-orange/20">
                      Required
                    </span>
                  </div>
                  <div className="relative">
                    <Building2
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                      aria-hidden="true"
                    />
                    <select
                      id="ministry"
                      value={ministry}
                      onChange={(e) => setMinistry(e.target.value)}
                      required
                      className="w-full pl-11 pr-10 py-3 text-base bg-white border border-gray-300 rounded-sm text-gray-900 appearance-none
                        focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
                        transition-colors shadow-sm"
                    >
                      <option value="" disabled>
                        Select your Ministry
                      </option>
                      {MINISTRY_OPTIONS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-xs text-gray-500 leading-normal">
                    The selected Ministry determines the Ministry scope of the account.
                  </p>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={
                      role === "ministry"
                        ? "officer@ministry.gov.in"
                        : role === "evaluator"
                        ? "evaluator@institution.ac.in"
                        : "admin@gov.in"
                    }
                    className="w-full pl-11 pr-4 py-3 text-base bg-white border border-gray-300 rounded-sm
                      placeholder:text-gray-400 text-gray-900
                      focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
                      transition-colors"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="h-4 w-4 rounded accent-brand-orange" />
                Remember this demo session
              </label>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-brand-orange hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3 text-base bg-white border border-gray-300 rounded-sm
                      placeholder:text-gray-400 text-gray-900
                      focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
                      transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Demo notice */}
              <p className="text-xs text-gray-500 bg-gray-50 border border-dashed border-gray-300 rounded-sm px-3.5 py-2.5 text-center leading-relaxed">
                Demo mode only — no real authentication or backend request is used.
              </p>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white text-base font-bold rounded-sm transition-colors shadow-sm"
              >
                Sign In to {active.portal}
                <ChevronRight className="h-5 w-5" />
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs font-medium text-gray-400">New to Udyam Procure?</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Signup links */}
            <div className="space-y-2.5">
              <Link
                to="/signup/evaluator"
                className="flex items-center justify-between w-full px-4 py-3 border border-gray-200 rounded-sm hover:border-brand-orange hover:bg-brand-orange-surface transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <ClipboardList className="h-5 w-5 text-gov-blue" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-brand-orange">
                      Apply as an Evaluator
                    </p>
                    <p className="text-xs text-gray-500">Domain experts & institutions</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-brand-orange" />
              </Link>
              <Link
                to="/signup/ministry"
                className="flex items-center justify-between w-full px-4 py-3 border border-gray-200 rounded-sm hover:border-brand-orange hover:bg-brand-orange-surface transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-brand-orange" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-brand-orange">
                      Ministry Account Request
                    </p>
                    <p className="text-xs text-gray-500">
                      Central & state government bodies
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-brand-orange" />
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500">
          InnovateProcure · Government of India · DPIIT
        </p>
      </div>
    </AuthLayout>
  );
}
