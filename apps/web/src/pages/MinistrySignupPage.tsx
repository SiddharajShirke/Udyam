import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Mail,
  Phone,
  User,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Shield,
} from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { MINISTRY_OPTIONS } from "../lib/ministryData";

/* ─────────────────────────── types ─────────────────────────────── */

interface FormData {
  ministryName: string;
  department: string;
  ministryType: string;
  officerName: string;
  officerDesignation: string;
  officialEmail: string;
  contactNumber: string;
  authorizationLetter: string; // file input — UI only
  purpose: string;
}

/* ─────────────────────────── options ───────────────────────────── */

const MINISTRY_TYPES = [
  "Central Government Ministry",
  "State Government Department",
  "Public Sector Undertaking (PSU)",
  "Autonomous Government Body",
  "Defence / Armed Forces",
  "Other Government Entity",
];

/* ─────────────────────────── page ──────────────────────────────── */

export default function MinistrySignupPage() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<FormData>({
    ministryName: "",
    department: "",
    ministryType: "",
    officerName: "",
    officerDesignation: "",
    officialEmail: "",
    contactNumber: "",
    authorizationLetter: "",
    purpose: "",
  });

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <AuthLayout backHref="/login" backLabel="Back to Sign In">
        <div className="w-full max-w-md text-center">
          <div className="bg-white border border-gray-200 rounded-sm shadow-gov-md p-10">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full bg-brand-orange-surface flex items-center justify-center">
                <Shield className="h-8 w-8 text-brand-orange" />
              </div>
            </div>
            <p className="text-[10px] font-bold text-brand-orange uppercase tracking-widest mb-2">
              REQUEST RECEIVED
            </p>
            <h2 className="text-xl font-black text-gray-900 mb-2">
              Ministry Account Request Submitted!
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              Your request has been forwarded to the Admin team for verification. An account will
              be provisioned at:
            </p>
            <p className="font-semibold text-gray-800 mb-6">{form.officialEmail}</p>
            <p className="text-xs text-gray-400 mb-6">
              Expected processing time: 3–5 working days. You will receive an official onboarding
              email once the account is approved.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-bold rounded-sm transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout backHref="/login" backLabel="Back to Sign In">
      <div className="w-full max-w-lg">
        <div className="bg-white border border-gray-200 rounded-sm shadow-gov-md overflow-hidden">
          <div className="h-1 bg-brand-orange w-full" />

          <div className="px-8 pt-7 pb-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="h-9 w-9 rounded-full bg-brand-orange-surface flex items-center justify-center flex-shrink-0">
                <Building2 className="h-4.5 w-4.5 text-brand-orange" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-brand-orange uppercase tracking-widest">
                  DPIIT INNOVATION PORTAL
                </p>
                <h1 className="text-xl font-black text-gray-900 leading-tight">
                  Ministry Account Request
                </h1>
              </div>
            </div>

            <p className="text-xs text-gray-400 mb-6 pl-12">
              Ministry accounts are provisioned by the Admin team. Submit your details and an
              authorisation letter to request access.
            </p>

            {/* Info notice */}
            <div className="flex items-start gap-2.5 bg-brand-orange-tint border border-brand-orange/20 rounded-sm px-4 py-3 mb-6">
              <Shield className="h-4 w-4 text-brand-orange flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-[11px] text-brand-orange-dark leading-relaxed">
                Only authorised officers from registered government bodies may request a Ministry
                account. Requests are verified against official government records.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Ministry info */}
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-1.5">
                  Ministry / Organisation Details
                </p>
              </div>

              {/* Select Ministry card matching reference */}
              <div className="p-4 border border-dashed border-brand-orange/50 bg-brand-orange-surface/30 rounded-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="ministryName" className="block text-sm font-bold text-gray-900">
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
                    id="ministryName"
                    value={form.ministryName}
                    onChange={(e) => set("ministryName", e.target.value)}
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="ministryType" className="block text-sm font-semibold text-gray-800">
                    Organisation Type *
                  </label>
                  <select
                    id="ministryType"
                    value={form.ministryType}
                    onChange={(e) => set("ministryType", e.target.value)}
                    required
                    className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-sm bg-white text-gray-900
                      focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange"
                  >
                    <option value="">Select type</option>
                    {MINISTRY_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <TextField
                  id="department"
                  label="Sub-Department / Wing"
                  icon={FileText}
                  value={form.department}
                  onChange={(v) => set("department", v)}
                  placeholder="e.g. DPIIT / SFAC"
                />
              </div>

              {/* Officer info */}
              <div className="space-y-1.5 pt-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-1.5">
                  Authorised Officer Details
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <TextField
                  id="officerName"
                  label="Full Name *"
                  icon={User}
                  value={form.officerName}
                  onChange={(v) => set("officerName", v)}
                  placeholder="Shri Arvind Patel"
                  required
                />
                <TextField
                  id="officerDesignation"
                  label="Designation *"
                  icon={FileText}
                  value={form.officerDesignation}
                  onChange={(v) => set("officerDesignation", v)}
                  placeholder="Joint Secretary"
                  required
                />
              </div>

              <TextField
                id="officialEmail"
                label="Official Government Email *"
                icon={Mail}
                value={form.officialEmail}
                onChange={(v) => set("officialEmail", v)}
                placeholder="officer@ministry.gov.in"
                type="email"
                required
              />

              <TextField
                id="contactNumber"
                label="Office Contact Number *"
                icon={Phone}
                value={form.contactNumber}
                onChange={(v) => set("contactNumber", v)}
                placeholder="+91 11 2345 6789"
                type="tel"
                required
              />

              {/* Purpose */}
              <div className="space-y-1.5 pt-2">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-1">
                  Purpose & Documents
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="purpose" className="block text-sm font-semibold text-gray-800">
                  Purpose of Access *
                </label>
                <textarea
                  id="purpose"
                  value={form.purpose}
                  onChange={(e) => set("purpose", e.target.value)}
                  rows={3}
                  required
                  placeholder="Briefly describe the procurement problems your ministry intends to post on the platform..."
                  className="w-full px-3.5 py-2.5 text-base border border-gray-300 rounded-sm bg-white text-gray-900 resize-y
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange"
                />
              </div>

              {/* File upload — UI only */}
              <div className="space-y-2">
                <label htmlFor="authLetter" className="block text-sm font-semibold text-gray-800">
                  Authorisation Letter (PDF) *
                </label>
                <div className="flex items-center gap-3 px-3.5 py-3 border border-dashed border-gray-300 rounded-sm bg-gray-50 hover:border-brand-orange transition-colors">
                  <FileText className="h-5 w-5 text-gray-400 flex-shrink-0" aria-hidden="true" />
                  <input
                    id="authLetter"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="flex-1 text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3.5 file:border-0 file:rounded-sm file:bg-brand-orange file:text-white file:text-xs file:font-semibold file:cursor-pointer hover:file:bg-brand-orange-dark"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Upload a signed authorisation letter on official letterhead (PDF, max 5MB)
                </p>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 h-4 w-4 rounded accent-brand-orange"
                />
                <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600 leading-relaxed cursor-pointer">
                  I certify that I am an authorised representative of the above government body and
                  agree to the{" "}
                  <a href="#" className="text-brand-orange font-semibold hover:underline">
                    Terms & Conditions
                  </a>
                  .
                </label>
              </div>

              {/* Flow description */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-sm text-xs text-gray-600 leading-relaxed">
                <span className="font-bold text-gray-800">Flow:</span> Select Ministry → enter account details → submit request → Admin approval → Ministry account activated.
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white text-base font-bold rounded-sm transition-colors shadow-sm"
              >
                Submit Ministry Account Request
                <ChevronRight className="h-5 w-5" />
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-brand-orange font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

/* ─────────────────────────── helper ────────────────────────────── */

function TextField({
  id, label, icon: Icon, value, onChange, placeholder, type = "text", required,
}: {
  id: string; label: string; icon: typeof Mail; value: string;
  onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-800">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" aria-hidden="true" />
        <input
          id={id} type={type} value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} required={required}
          className="w-full pl-11 pr-4 py-3 text-base border border-gray-300 rounded-sm bg-white text-gray-900
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-colors"
        />
      </div>
    </div>
  );
}
