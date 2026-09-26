import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Shield,
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { MINISTRY_OPTIONS } from "../lib/ministryData";

/* ─────────────────────────── types ─────────────────────────────── */

interface MinistryRegistrationForm {
  registerAs: string;
  ministryName: string;
  officerName: string;
  departmentId: string;
  officialEmail: string;
  dob: string;
  qualification: string;
  password: string;
  focusMandate: string;
  attachedFileName: string;
  agreed: boolean;
}

const REGISTER_ROLES = [
  "Ministry / Department Nodal Officer",
  "State Government Department Nodal Officer",
  "Public Sector Undertaking (PSU) Procurement Lead",
  "Autonomous Government Institution",
  "Defence / Strategic Innovation Officer",
];

const DEMO_DATA: MinistryRegistrationForm = {
  registerAs: "Ministry / Department Nodal Officer",
  ministryName: "Ministry of Jal Shakti",
  officerName: "Dr. Arvind Patel",
  departmentId: "GOV-MIN-74921",
  officialEmail: "officer@jalshakti.gov.in",
  dob: "1984-06-15",
  qualification: "M.Tech in Water Resources Engineering, IAS Cadre (2009 Batch)",
  password: "UdyamGov@2026!",
  focusMandate:
    "Implementation of telemetry-enabled real-time water quality monitoring for rural pipeline networks under Jal Jeevan Mission, SCADA automation, and IoT sensor benchmarking.",
  attachedFileName: "dr_arvind_patel_official_id.pdf",
  agreed: true,
};

export default function MinistrySignupPage() {
  const [done, setDone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [demoBanner, setDemoBanner] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<MinistryRegistrationForm>({
    registerAs: "Ministry / Department Nodal Officer",
    ministryName: "",
    officerName: "",
    departmentId: "",
    officialEmail: "",
    dob: "",
    qualification: "",
    password: "",
    focusMandate: "",
    attachedFileName: "",
    agreed: false,
  });

  function setField<K extends keyof MinistryRegistrationForm>(field: K, value: MinistryRegistrationForm[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleFillDemoData() {
    setForm({ ...DEMO_DATA });
    setDemoBanner(true);
    setTimeout(() => setDemoBanner(false), 4000);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setField("attachedFileName", file.name);
    }
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
              Ministry Registration Submitted!
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              Your registration application for{" "}
              <span className="font-semibold text-gray-800">{form.ministryName || "Ministry Account"}</span>{" "}
              has been forwarded to the Udyam admin team for verification.
            </p>
            <p className="font-semibold text-gray-800 mb-6">{form.officialEmail}</p>
            <p className="text-xs text-gray-400 mb-6">
              Expected processing time: 24–48 working hours. You will receive an official onboarding
              email once your government credentials are confirmed.
            </p>
            <div className="space-y-2.5">
              <Link
                to="/login"
                className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-bold rounded-sm transition-colors shadow-sm"
              >
                Back to Sign In
              </Link>
            </div>
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
            {/* Header Title & Subtitle */}
            <div className="mb-4">
              <h1 className="text-3xl font-black text-gray-900 leading-tight">Join the network</h1>
              <p className="text-sm text-gray-600 mt-1">
                Tell us about your ministry or department to get started.
              </p>
            </div>

            {/* Log in / Register Tab Switcher */}
            <div className="flex border-b border-gray-200 mb-6">
              <Link
                to="/login"
                className="pb-2.5 px-4 text-base font-semibold text-gray-500 hover:text-gray-900 transition-colors"
              >
                Log in
              </Link>
              <div className="pb-2.5 px-4 text-base font-bold text-brand-orange border-b-2 border-brand-orange">
                Register
              </div>
            </div>

            {/* Auto-fill Button */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleFillDemoData}
                className="w-full py-2.5 px-4 bg-orange-50/70 hover:bg-orange-100/80 border border-brand-orange/40 text-brand-orange font-bold text-sm rounded-sm flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Sparkles className="h-4 w-4 text-brand-orange" />
                Fill in Demo Data
              </button>
              {demoBanner && (
                <div className="mt-2 text-center text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-sm py-1.5 px-3 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Sample Ministry registration data populated successfully!
                </div>
              )}
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Register as dropdown */}
              <div className="space-y-1.5">
                <label htmlFor="registerAs" className="block text-sm font-semibold text-gray-800">
                  Register as <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="registerAs"
                    value={form.registerAs}
                    onChange={(e) => setField("registerAs", e.target.value)}
                    required
                    className="w-full px-3.5 py-3 pr-10 text-base border border-gray-300 rounded-sm bg-white text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-colors"
                  >
                    {REGISTER_ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Explanatory banner */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-sm text-xs text-gray-700 leading-relaxed flex items-start gap-2">
                <span className="text-base leading-none">🏛️</span>
                <span>
                  <strong>Registering a Ministry Officer Account</strong> to post problem statements &amp; evaluate sandbox submissions.
                </span>
              </div>

              {/* Ministry / Department selection */}
              <div className="space-y-1.5">
                <label htmlFor="ministryName" className="block text-sm font-semibold text-gray-800">
                  Ministry / Department <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="ministryName"
                    value={form.ministryName}
                    onChange={(e) => setField("ministryName", e.target.value)}
                    required
                    className="w-full px-3.5 py-3 pr-10 text-base border border-gray-300 rounded-sm bg-white text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-colors"
                  >
                    <option value="" disabled>
                      Select your ministry or department
                    </option>
                    {MINISTRY_OPTIONS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* 2-column: Officer Name & Government Department ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="officerName" className="block text-sm font-semibold text-gray-800">
                    Officer / Entity name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="officerName"
                    type="text"
                    value={form.officerName}
                    onChange={(e) => setField("officerName", e.target.value)}
                    placeholder="Official Full Name"
                    required
                    className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-sm bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="departmentId" className="block text-sm font-semibold text-gray-800">
                    Government Department ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="departmentId"
                    type="text"
                    value={form.departmentId}
                    onChange={(e) => setField("departmentId", e.target.value)}
                    placeholder="GOV-MIN-XXXXX"
                    required
                    className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-sm bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-colors"
                  />
                </div>
              </div>

              {/* 2-column: Registered email & Date of birth */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="officialEmail" className="block text-sm font-semibold text-gray-800">
                    Registered email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="officialEmail"
                    type="email"
                    value={form.officialEmail}
                    onChange={(e) => setField("officialEmail", e.target.value)}
                    placeholder="officer@gov.in"
                    required
                    className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-sm bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="dob" className="block text-sm font-semibold text-gray-800">
                    Date of birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="dob"
                    type="date"
                    value={form.dob}
                    onChange={(e) => setField("dob", e.target.value)}
                    required
                    className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-sm bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-colors"
                  />
                </div>
              </div>

              {/* Education / qualification */}
              <div className="space-y-1.5">
                <label htmlFor="qualification" className="block text-sm font-semibold text-gray-800">
                  Education / qualification <span className="text-red-500">*</span>
                </label>
                <input
                  id="qualification"
                  type="text"
                  value={form.qualification}
                  onChange={(e) => setField("qualification", e.target.value)}
                  placeholder="Highest qualification (e.g. M.Tech, MBA, IAS Cadre)"
                  required
                  className="w-full px-3.5 py-3 text-base border border-gray-300 rounded-sm bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-colors"
                />
              </div>

              {/* Create password */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                  Create password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setField("password", e.target.value)}
                    placeholder="Minimum 8 characters"
                    required
                    className="w-full px-3.5 py-3 pr-11 text-base border border-gray-300 rounded-sm bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Department Focus & Mandate */}
              <div className="space-y-1.5">
                <label htmlFor="focusMandate" className="block text-sm font-semibold text-gray-800">
                  Department Focus &amp; Mandate <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="focusMandate"
                  rows={3}
                  value={form.focusMandate}
                  onChange={(e) => setField("focusMandate", e.target.value)}
                  placeholder="Brief description of your ministry initiatives and procurement focus"
                  required
                  className="w-full px-3.5 py-2.5 text-base border border-gray-300 rounded-sm bg-white text-gray-900 placeholder:text-gray-400 resize-y focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-colors"
                />
              </div>

              {/* Government ID Proof */}
              <div className="p-3.5 border border-dashed border-gray-300 rounded-sm bg-gray-50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-gray-400 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Government ID Proof</p>
                    <p className="text-xs text-gray-500">
                      {form.attachedFileName ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          {form.attachedFileName}
                        </span>
                      ) : (
                        "PDF, JPG or PNG · max 5 MB"
                      )}
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 bg-white border border-gray-300 hover:border-brand-orange text-brand-orange font-semibold text-xs rounded-sm transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
                >
                  {form.attachedFileName ? "Change file >" : "Attach file >"}
                </button>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={form.agreed}
                  onChange={(e) => setField("agreed", e.target.checked)}
                  required
                  className="mt-1 h-4 w-4 rounded accent-brand-orange cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600 leading-relaxed cursor-pointer">
                  I certify that I am an authorised representative of the above government body and agree to the{" "}
                  <a href="#schemes" className="text-brand-orange font-semibold hover:underline">
                    Terms &amp; Conditions
                  </a>
                  .
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white text-base font-bold rounded-sm transition-colors shadow-sm mt-2 cursor-pointer"
              >
                Submit as Ministry for verification
                <ChevronRight className="h-5 w-5" />
              </button>
            </form>

            {/* Footer Notice */}
            <p className="mt-4 text-center text-xs text-gray-500">
              Your application is reviewed by the Udyam admin team.
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
