import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Rocket,
  Building2,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  User,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Globe,
} from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";

/* ─────────────────────────── types ─────────────────────────────── */

interface FormData {
  // Step 1 — Company
  startupName: string;
  dpiitNumber: string;
  incorporationDate: string;
  sector: string;
  website: string;
  // Step 2 — Founder
  founderName: string;
  founderEmail: string;
  founderPhone: string;
  designation: string;
  // Step 3 — Account
  email: string;
  password: string;
  confirmPassword: string;
}

/* ─────────────────────────── options ───────────────────────────── */

const SECTORS = [
  "Agriculture & Rural",
  "Water & Sanitation",
  "Food & Nutrition",
  "Health & Medicine",
  "Education & Skills",
  "Clean Energy",
  "Defence & Aerospace",
  "Transport & Mobility",
  "Smart Cities",
  "Fintech",
  "Other",
];

const STEPS = ["Company Details", "Founder Info", "Create Account"];

/* ─────────────────────────── page ──────────────────────────────── */

export default function StartupSignupPage() {
  const [step, setStep] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState<FormData>({
    startupName: "",
    dpiitNumber: "",
    incorporationDate: "",
    sector: "",
    website: "",
    founderName: "",
    founderEmail: "",
    founderPhone: "",
    designation: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 2) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  }

  if (done) {
    return (
      <AuthLayout backHref="/login" backLabel="Back to Sign In">
        <div className="w-full max-w-md text-center">
          <div className="bg-white border border-gray-200 rounded-sm shadow-gov-md p-10">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <p className="text-[10px] font-bold text-brand-orange uppercase tracking-widest mb-2">
              APPLICATION SUBMITTED
            </p>
            <h2 className="text-xl font-black text-gray-900 mb-2">Registration Received!</h2>
            <p className="text-sm text-gray-500 mb-6">
              Your startup registration is under review. You'll receive confirmation at{" "}
              <span className="font-semibold text-gray-700">{form.email}</span> within 2–3 working
              days.
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
            <div className="flex items-center gap-3 mb-6">
              <div className="h-9 w-9 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <Rocket className="h-4.5 w-4.5 text-green-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-brand-orange uppercase tracking-widest">
                  DPIIT INNOVATION PORTAL
                </p>
                <h1 className="text-xl font-black text-gray-900 leading-tight">
                  Register Your Startup
                </h1>
              </div>
            </div>

            {/* Step progress */}
            <StepProgress steps={STEPS} current={step} />

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {step === 0 && (
                <>
                  <TextField
                    id="startupName"
                    label="Startup / Company Name *"
                    icon={Building2}
                    value={form.startupName}
                    onChange={(v) => set("startupName", v)}
                    placeholder="e.g. InnovateTech Pvt Ltd"
                    required
                  />
                  <TextField
                    id="dpiit"
                    label="DPIIT Recognition Number *"
                    icon={FileText}
                    value={form.dpiitNumber}
                    onChange={(v) => set("dpiitNumber", v)}
                    placeholder="DIPP12345"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="sector" className="block text-xs font-semibold text-gray-700">
                        Primary Sector *
                      </label>
                      <select
                        id="sector"
                        value={form.sector}
                        onChange={(e) => set("sector", e.target.value)}
                        required
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-sm bg-white text-gray-900
                          focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange"
                      >
                        <option value="">Select sector</option>
                        {SECTORS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="incDate" className="block text-xs font-semibold text-gray-700">
                        Incorporation Date *
                      </label>
                      <input
                        id="incDate"
                        type="date"
                        value={form.incorporationDate}
                        onChange={(e) => set("incorporationDate", e.target.value)}
                        required
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-sm bg-white text-gray-900
                          focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange"
                      />
                    </div>
                  </div>
                  <TextField
                    id="website"
                    label="Website (optional)"
                    icon={Globe}
                    value={form.website}
                    onChange={(v) => set("website", v)}
                    placeholder="https://yourstartup.in"
                    type="url"
                  />
                </>
              )}

              {step === 1 && (
                <>
                  <TextField
                    id="founderName"
                    label="Founder / Authorised Representative Name *"
                    icon={User}
                    value={form.founderName}
                    onChange={(v) => set("founderName", v)}
                    placeholder="e.g. Sneha Raju"
                    required
                  />
                  <TextField
                    id="designation"
                    label="Designation *"
                    icon={FileText}
                    value={form.designation}
                    onChange={(v) => set("designation", v)}
                    placeholder="e.g. CEO / Co-Founder"
                    required
                  />
                  <TextField
                    id="founderEmail"
                    label="Official Email *"
                    icon={Mail}
                    value={form.founderEmail}
                    onChange={(v) => set("founderEmail", v)}
                    placeholder="founder@startup.in"
                    type="email"
                    required
                  />
                  <TextField
                    id="founderPhone"
                    label="Mobile Number *"
                    icon={Phone}
                    value={form.founderPhone}
                    onChange={(v) => set("founderPhone", v)}
                    placeholder="+91 98765 43210"
                    type="tel"
                    required
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <TextField
                    id="email"
                    label="Login Email *"
                    icon={Mail}
                    value={form.email}
                    onChange={(v) => set("email", v)}
                    placeholder="login@startup.in"
                    type="email"
                    required
                  />
                  <PasswordField
                    id="password"
                    label="Create Password *"
                    value={form.password}
                    onChange={(v) => set("password", v)}
                    show={showPass}
                    onToggle={() => setShowPass((s) => !s)}
                    required
                  />
                  <PasswordField
                    id="confirmPassword"
                    label="Confirm Password *"
                    value={form.confirmPassword}
                    onChange={(v) => set("confirmPassword", v)}
                    show={showConfirm}
                    onToggle={() => setShowConfirm((s) => !s)}
                    required
                  />
                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="mt-0.5 h-3.5 w-3.5 accent-brand-orange"
                    />
                    <label htmlFor="terms" className="text-[11px] text-gray-500 leading-relaxed">
                      I agree to the{" "}
                      <a href="#" className="text-brand-orange hover:underline">Terms & Conditions</a>{" "}
                      and{" "}
                      <a href="#" className="text-brand-orange hover:underline">Privacy Policy</a>{" "}
                      of InnovateProcure.
                    </label>
                  </div>
                </>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center gap-3 pt-1">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-sm hover:border-gray-400 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-bold rounded-sm transition-colors"
                >
                  {step < 2 ? (
                    <>
                      Next: {STEPS[step + 1]}
                      <ChevronRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Submit Registration
                      <CheckCircle2 className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <p className="mt-5 text-center text-[11px] text-gray-400">
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

/* ─────────────────────────── helpers ───────────────────────────── */

function StepProgress({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center flex-1 min-w-0">
          <div className="flex flex-col items-center flex-shrink-0">
            <div
              className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                i < current
                  ? "bg-green-500 text-white"
                  : i === current
                  ? "bg-brand-orange text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {i < current ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <p
              className={`mt-1 text-[10px] font-semibold whitespace-nowrap ${
                i === current ? "text-brand-orange" : i < current ? "text-green-600" : "text-gray-400"
              }`}
            >
              {s}
            </p>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-px mx-1 mb-4 transition-colors ${
                i < current ? "bg-green-400" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function TextField({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  icon: typeof Mail;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-800">
        {label}
      </label>
      <div className="relative">
        <Icon
          className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
          aria-hidden="true"
        />
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full pl-11 pr-4 py-3 text-base border border-gray-300 rounded-sm bg-white text-gray-900
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
            transition-colors"
        />
      </div>
    </div>
  );
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  show,
  onToggle,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-800">
        {label}
      </label>
      <div className="relative">
        <Lock
          className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
          aria-hidden="true"
        />
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          required={required}
          className="w-full pl-11 pr-11 py-3 text-base border border-gray-300 rounded-sm bg-white text-gray-900
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
            transition-colors"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
