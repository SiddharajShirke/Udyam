import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList,
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
  GraduationCap,
  Building2,
} from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";

/* ─────────────────────────── types ─────────────────────────────── */

interface FormData {
  // Step 1
  fullName: string;
  designation: string;
  institution: string;
  department: string;
  phone: string;
  // Step 2
  expertise: string[];
  experience: string;
  linkedIn: string;
  publications: string;
  // Step 3
  email: string;
  password: string;
  confirmPassword: string;
}

/* ─────────────────────────── options ───────────────────────────── */

const EXPERTISE_AREAS = [
  "Agriculture & Rural",
  "Water & Sanitation",
  "Food & Nutrition",
  "Health & Medicine",
  "Education & Skills",
  "Clean Energy",
  "Defence & Aerospace",
  "Transport & Mobility",
  "Fintech",
  "AI/ML & Data Science",
  "IoT & Embedded Systems",
  "Blockchain",
];

const STEPS = ["Personal Details", "Expertise & Experience", "Create Account"];

/* ─────────────────────────── page ──────────────────────────────── */

export default function EvaluatorSignupPage() {
  const [step, setStep] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState<FormData>({
    fullName: "",
    designation: "",
    institution: "",
    department: "",
    phone: "",
    expertise: [],
    experience: "",
    linkedIn: "",
    publications: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function set<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleExpertise(area: string) {
    setForm((prev) => ({
      ...prev,
      expertise: prev.expertise.includes(area)
        ? prev.expertise.filter((e) => e !== area)
        : [...prev.expertise, area],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 2) setStep((s) => s + 1);
    else setDone(true);
  }

  if (done) {
    return (
      <AuthLayout backHref="/login" backLabel="Back to Sign In">
        <div className="w-full max-w-md text-center">
          <div className="bg-white border border-gray-200 rounded-sm shadow-gov-md p-10">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full bg-purple-50 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <p className="text-[10px] font-bold text-brand-orange uppercase tracking-widest mb-2">
              APPLICATION RECEIVED
            </p>
            <h2 className="text-xl font-black text-gray-900 mb-2">
              Evaluator Application Submitted!
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Your application is under review by the Admin team. You'll hear back at{" "}
              <span className="font-semibold text-gray-700">{form.email}</span> within 5–7 working
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
          <div className="h-1 bg-purple-600 w-full" />

          <div className="px-8 pt-7 pb-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-9 w-9 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                <ClipboardList className="h-4.5 w-4.5 text-purple-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-brand-orange uppercase tracking-widest">
                  DPIIT INNOVATION PORTAL
                </p>
                <h1 className="text-xl font-black text-gray-900 leading-tight">
                  Apply as an Evaluator
                </h1>
              </div>
            </div>

            <StepProgress steps={STEPS} current={step} accentColor="bg-purple-600" />

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Step 0: Personal Details */}
              {step === 0 && (
                <>
                  <TextField
                    id="fullName"
                    label="Full Name (as per ID) *"
                    icon={User}
                    value={form.fullName}
                    onChange={(v) => set("fullName", v)}
                    placeholder="Dr. Ramesh Gupta"
                    required
                  />
                  <TextField
                    id="designation"
                    label="Designation / Title *"
                    icon={GraduationCap}
                    value={form.designation}
                    onChange={(v) => set("designation", v)}
                    placeholder="Professor / Senior Scientist"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      id="institution"
                      label="Institution / Organisation *"
                      icon={Building2}
                      value={form.institution}
                      onChange={(v) => set("institution", v)}
                      placeholder="IIT Delhi"
                      required
                    />
                    <TextField
                      id="department"
                      label="Department"
                      icon={FileText}
                      value={form.department}
                      onChange={(v) => set("department", v)}
                      placeholder="Computer Science"
                    />
                  </div>
                  <TextField
                    id="phone"
                    label="Contact Number *"
                    icon={Phone}
                    value={form.phone}
                    onChange={(v) => set("phone", v)}
                    placeholder="+91 98765 43210"
                    type="tel"
                    required
                  />
                </>
              )}

              {/* Step 1: Expertise */}
              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-700">
                      Domain Expertise * (select all that apply)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {EXPERTISE_AREAS.map((area) => {
                        const sel = form.expertise.includes(area);
                        return (
                          <button
                            key={area}
                            type="button"
                            onClick={() => toggleExpertise(area)}
                            className={`px-3 py-1.5 text-[11px] font-semibold rounded-sm border transition-colors ${
                              sel
                                ? "bg-purple-600 border-purple-600 text-white"
                                : "bg-white border-gray-200 text-gray-600 hover:border-purple-400"
                            }`}
                          >
                            {sel && <CheckCircle2 className="inline h-3 w-3 mr-1" />}
                            {area}
                          </button>
                        );
                      })}
                    </div>
                    {form.expertise.length === 0 && (
                      <p className="text-[10px] text-red-400">Please select at least one area.</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="experience" className="block text-xs font-semibold text-gray-700">
                      Years of Experience *
                    </label>
                    <select
                      id="experience"
                      value={form.experience}
                      onChange={(e) => set("experience", e.target.value)}
                      required
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-sm bg-white text-gray-900
                        focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                    >
                      <option value="">Select experience range</option>
                      <option>1–3 years</option>
                      <option>4–7 years</option>
                      <option>8–15 years</option>
                      <option>15+ years</option>
                    </select>
                  </div>

                  <TextField
                    id="linkedIn"
                    label="LinkedIn / Scholar Profile URL"
                    icon={FileText}
                    value={form.linkedIn}
                    onChange={(v) => set("linkedIn", v)}
                    placeholder="https://linkedin.com/in/your-profile"
                    type="url"
                  />

                  <div className="space-y-1.5">
                    <label htmlFor="publications" className="block text-xs font-semibold text-gray-700">
                      Notable Publications / Projects (optional)
                    </label>
                    <textarea
                      id="publications"
                      value={form.publications}
                      onChange={(e) => set("publications", e.target.value)}
                      rows={3}
                      placeholder="Briefly describe key publications, patents, or government projects..."
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-sm bg-white text-gray-900 resize-y
                        placeholder:text-gray-300
                        focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                    />
                  </div>
                </>
              )}

              {/* Step 2: Account */}
              {step === 2 && (
                <>
                  <TextField
                    id="email"
                    label="Official Email *"
                    icon={Mail}
                    value={form.email}
                    onChange={(v) => set("email", v)}
                    placeholder="evaluator@institution.ac.in"
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
                      className="mt-0.5 h-3.5 w-3.5 accent-purple-600"
                    />
                    <label htmlFor="terms" className="text-[11px] text-gray-500 leading-relaxed">
                      I agree to the{" "}
                      <a href="#" className="text-brand-orange hover:underline">Terms & Conditions</a>
                      {" "}and confirm that the information provided is accurate.
                    </label>
                  </div>
                </>
              )}

              {/* Buttons */}
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
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-sm transition-colors"
                >
                  {step < 2 ? (
                    <>
                      Next: {STEPS[step + 1]}
                      <ChevronRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Submit Application
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

function StepProgress({
  steps,
  current,
  accentColor,
}: {
  steps: string[];
  current: number;
  accentColor: string;
}) {
  return (
    <div className="flex items-center">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center flex-1 min-w-0">
          <div className="flex flex-col items-center flex-shrink-0">
            <div
              className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                i < current
                  ? "bg-green-500 text-white"
                  : i === current
                  ? `${accentColor} text-white`
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {i < current ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <p
              className={`mt-1 text-[10px] font-semibold whitespace-nowrap ${
                i === current ? "text-purple-600" : i < current ? "text-green-600" : "text-gray-400"
              }`}
            >
              {s}
            </p>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-px mx-1 mb-4 ${i < current ? "bg-green-400" : "bg-gray-200"}`}
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

function PasswordField({
  id, label, value, onChange, show, onToggle, required,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  show: boolean; onToggle: () => void; required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-800">{label}</label>
      <div className="relative">
        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" aria-hidden="true" />
        <input
          id={id} type={show ? "text" : "password"} value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••" required={required}
          className="w-full pl-11 pr-11 py-3 text-base border border-gray-300 rounded-sm bg-white text-gray-900
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-colors"
        />
        <button type="button" onClick={onToggle}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
          aria-label={show ? "Hide password" : "Show password"}>
          {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
