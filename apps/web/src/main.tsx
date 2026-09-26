import { FormEvent, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Eye,
  EyeOff,
  FileCheck2,
  FileText,
  Globe,
  GraduationCap,
  AlertCircle,
  Landmark,
  LayoutDashboard,
  LogOut,
  Menu,
  Phone,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  UploadCloud,
  Users,
  X,
  Cpu,
  Bell,
  Bookmark,
  Copy,
  Download,
  ExternalLink,
  Filter,
  Info as InfoIcon,
  Layers,
  Maximize2,
  RefreshCw,
  Share2,
  SlidersHorizontal,
  Edit3,
  FileDown,
  CheckSquare,
  Calendar,
  Star,
  HelpCircle,
} from "lucide-react";
import "./styles.css";

type Status = "pending" | "approved";
type Screen = "auth" | "pending" | "dashboard";
type AuthMode = "login" | "register";
type Tab = "Overview" | "Profile" | "Problem Statements" | "Schemes" | "Milestones" | "Sandbox";

type Startup = {
  name: string;
  email: string;
  password: string;
  dpiit: string;
  ministry?: string;
  dob: string;
  education: string;
  description: string;
  status: Status;
  registeredAt: string;
};

const STORAGE_KEY = "udyamsetu-startup";

const emptyStartup: Startup = {
  name: "",
  email: "",
  password: "",
  dpiit: "",
  dob: "",
  education: "",
  description: "",
  status: "pending",
  registeredAt: "",
};

const navItems: { label: Tab; icon: typeof LayoutDashboard }[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Profile", icon: Building2 },
  { label: "Problem Statements", icon: Target },
  { label: "Schemes", icon: Sparkles },
  { label: "Milestones", icon: BadgeCheck },
  { label: "Sandbox", icon: UploadCloud },
];

export type ProblemStatement = {
  id: string;
  title: string;
  ministry: string;
  theme: "Agriculture & Rural" | "Water & Sanitation" | "Food & Nutrition" | "Healthcare & AI" | "Clean Energy & Mobility";
  themeTag: string;
  themeColor: "green" | "blue" | "saffron" | "purple" | "teal";
  description: string;
  kpiBenchmarks: string[];
  grant: string;
  deadline: string;
  matchScore?: string;
  matchReason?: string;
};

const problemStatements: ProblemStatement[] = [
  {
    id: "PS-2026-AGRI-01",
    title: "AI-Driven Early Crop Blight & Pest Detection for Smallholder Farmers",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    theme: "Agriculture & Rural",
    themeTag: "Agriculture",
    themeColor: "green",
    description: "High-resolution spectral and smartphone camera AI model to identify early crop diseases and recommend organic treatments offline.",
    kpiBenchmarks: ["Model Accuracy >= 94%", "Inference Speed < 300ms", "Supports 12 Regional Languages", "Offline Inference Enabled"],
    grant: "₹25 Lakh Seed Grant + Fast-Track Procurement",
    deadline: "30 Oct 2026",
    matchScore: "98% Match",
    matchReason: "Suggested based on your Agritech & AI focus area",
  },
  {
    id: "PS-2026-WATER-02",
    title: "IoT & Edge Sensor Network for Real-Time Water Quality Telemetry",
    ministry: "Ministry of Jal Shakti (Dept of Drinking Water & Sanitation)",
    theme: "Water & Sanitation",
    themeTag: "Water & Sanitation",
    themeColor: "blue",
    description: "Low-cost rural water pipeline sensor telemetry system with anomaly detection for pH, turbidity, and chemical contaminants.",
    kpiBenchmarks: ["Sensor Battery Life >= 3 Years", "Telemetry Latency < 5s", "Solar Charging Unit", "Sub-$50 Unit Cost"],
    grant: "₹50 Lakh Grant + Pilot Deployment in 100 Villages",
    deadline: "15 Nov 2026",
    matchScore: "92% Match",
    matchReason: "Suggested based on your IoT & hardware capabilities",
  },
  {
    id: "PS-2026-FOOD-03",
    title: "Cold-Chain Perishable Quality & Expiry Prediction Telemetry Systems",
    ministry: "Ministry of Food Processing Industries",
    theme: "Food & Nutrition",
    themeTag: "Food & Processing",
    themeColor: "saffron",
    description: "Smart sensor indicators and supply-chain tracking to reduce post-harvest food grain and horticulture loss during transit.",
    kpiBenchmarks: ["Real-Time Temp & Humidity Logging", "Tamper-Proof NFC Tagging", "Expiry Prediction Accuracy >= 90%"],
    grant: "₹35 Lakh Grant + FCI Logistics Sandbox Access",
    deadline: "20 Nov 2026",
    matchScore: "88% Match",
    matchReason: "Suggested based on your supply chain experience",
  },
  {
    id: "PS-2026-HEALTH-04",
    title: "Portable Tele-Diagnostic Point-of-Care Kit for Primary Health Centres",
    ministry: "Ministry of Health & Family Welfare",
    theme: "Healthcare & AI",
    themeTag: "Healthcare & AI",
    themeColor: "purple",
    description: "Compact non-invasive diagnostic device capable of testing blood glucose, ECG, and vitals with automated AI triage.",
    kpiBenchmarks: ["Medical Grade Sensor Accuracy (+/- 2%)", "Weight < 1.5kg", "Seamless ABHA ID Integration"],
    grant: "₹40 Lakh Grant + ICMR Clinical Validation Support",
    deadline: "10 Dec 2026",
  },
  {
    id: "PS-2026-ENERGY-05",
    title: "Autonomous Grid Load Balancing & Decentralized Microgrid Controller",
    ministry: "Ministry of New & Renewable Energy",
    theme: "Clean Energy & Mobility",
    themeTag: "Clean Energy",
    themeColor: "teal",
    description: "Microgrid controller software utilizing predictive AI to balance solar storage and EV charging stations.",
    kpiBenchmarks: ["Peak Shaving Efficiency > 22%", "Grid Failover Time < 50ms", "OpenADR 2.0b Protocol Compliance"],
    grant: "₹60 Lakh Grant + NTPC Microgrid Integration Trial",
    deadline: "05 Jan 2027",
  },
];

function readStartup(): Startup | null {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? (JSON.parse(saved) as Startup) : null;
}

/* Official Government SVG Badges & Icons */
function AshokaEmblem() {
  return (
    <svg width="28" height="40" viewBox="0 0 100 140" fill="currentColor" className="ashoka-svg" aria-label="Emblem of India">
      <path d="M50 2 C40 16 28 22 28 36 C28 46 36 54 44 56 C40 60 36 65 36 72 C36 84 44 90 50 94 C56 90 64 84 64 72 C64 65 60 60 56 56 C64 54 72 46 72 36 C72 22 60 16 50 2 Z" fill="#b45309" />
      <circle cx="50" cy="110" r="15" fill="none" stroke="#1e40af" strokeWidth="3.5" />
      <path d="M50 95 L50 125 M35 110 L65 110 M39 99 L61 121 M39 121 L61 99" stroke="#1e40af" strokeWidth="2" />
      <rect x="18" y="128" width="64" height="7" rx="2" fill="#b45309" />
    </svg>
  );
}

function DPIITLogo() {
  return (
    <div className="dpiit-brand-badge">
      <div className="dpiit-text-group">
        <span className="dpiit-title">DPIIT</span>
        <span className="startup-india-tag">#startupindia</span>
      </div>
      <div className="tricolor-strip">
        <span className="strip-saffron" />
        <span className="strip-white" />
        <span className="strip-green" />
      </div>
    </div>
  );
}

function AmritMahotsavLogo() {
  return (
    <div className="amrit-badge">
      <div className="amrit-number">75</div>
      <div className="amrit-text">
        <span>Azadi Ka</span>
        <strong>Amrit Mahotsav</strong>
      </div>
    </div>
  );
}

function GovtHeader({
  authMode,
  setAuthMode,
  startup,
  onLogout,
  onSearch,
}: {
  authMode?: AuthMode;
  setAuthMode?: (mode: AuthMode) => void;
  startup?: Startup | null;
  onLogout?: () => void;
  onSearch?: (query: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState(3);

  const notifications = [
    {
      id: 1,
      title: "Evaluation Day 3 Update",
      text: "Ministry of Agriculture Technical Committee has submitted rubric score: 94/100.",
      time: "10 mins ago",
      type: "green",
    },
    {
      id: 2,
      title: "New MSINS 2025 Scheme",
      text: "Reimbursement scheme MSINS-2025-01 is open for your Agritech startup.",
      time: "2 hours ago",
      type: "saffron",
    },
    {
      id: 3,
      title: "EMD Exemption Verified",
      text: "Public procurement EMD waiver certificate issued for tender bids.",
      time: "1 day ago",
      type: "blue",
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery.trim());
      setSearchMessage(`Searching portal for "${searchQuery}"...`);
      setTimeout(() => setSearchMessage(""), 3000);
    }
  };

  return (
    <header className="govt-portal-header">
      {/* Top Utility Bar */}
      <div className="govt-top-bar">
        <div className="govt-container top-bar-inner">
          <div className="govt-emblem-section">
            <AshokaEmblem />
            <div className="govt-titles">
              <span className="hindi-title">भारत सरकार</span>
              <span className="eng-title">GOVERNMENT OF INDIA</span>
              <span className="ministry-title">MINISTRY OF COMMERCE AND INDUSTRY</span>
            </div>
          </div>
          <div className="govt-top-right">
            <div className="social-links">
              <span className="social-icon fb">f</span>
              <span className="social-icon tw">𝕏</span>
              <span className="social-icon in">in</span>
            </div>
            <div className="toll-free-info">
              <Phone size={13} />
              <span>Our Toll Free Number : <strong>1800 115 565</strong> (10:00 AM to 05:30 PM)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Branding & Search Sub-Header */}
      <div className="govt-main-header">
        <div className="govt-container main-header-inner">
          <div className="govt-brand-logos">
            <DPIITLogo />
            <div className="v-divider" />
            <AmritMahotsavLogo />
          </div>

          <div className="govt-header-controls">
            <div className="lang-selector static" aria-label="Current language: English">
              <Globe size={14} />
              <span>ENGLISH</span>
            </div>

            {/* Interactive Search Bar */}
            <form className="govt-search-bar" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search schemes, challenges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn" aria-label="Search">
                <Search size={15} />
              </button>
            </form>

            {/* Interactive Notification Bell */}
            {startup && startup.status === "approved" && (
              <div className="notif-wrapper">
                <button
                  type="button"
                  className="notif-bell-btn"
                  onClick={() => {
                    setIsNotifOpen(!isNotifOpen);
                    if (unreadNotifs > 0) setUnreadNotifs(0);
                  }}
                  title="Notifications"
                >
                  <Bell size={18} />
                  {unreadNotifs > 0 && <span className="notif-badge">{unreadNotifs}</span>}
                </button>

                {isNotifOpen && (
                  <div className="notif-dropdown-menu">
                    <div className="notif-header">
                      <strong>Government Portal Activity Alerts</strong>
                      <button className="clear-btn" onClick={() => setIsNotifOpen(false)}>Close</button>
                    </div>
                    <div className="notif-list">
                      {notifications.map((n) => (
                        <div key={n.id} className="notif-item">
                          <div className={`notif-dot ${n.type}`} />
                          <div className="notif-body">
                            <strong>{n.title}</strong>
                            <p>{n.text}</p>
                            <small>{n.time}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="govt-auth-actions">
              {startup && startup.status === "approved" ? (
                <div className="header-user-badge">
                  <span className="user-dot" />
                  <span className="user-name">{startup.name}</span>
                  {onLogout && (
                    <button onClick={onLogout} className="header-logout-btn" title="Log out">
                      <LogOut size={14} />
                    </button>
                  )}
                </div>
              ) : authMode && setAuthMode ? (
                <div className="auth-btn-group">
                  <button
                    className={`nav-auth-btn ${authMode === "login" ? "active" : ""}`}
                    onClick={() => setAuthMode("login")}
                  >
                    Login
                  </button>
                  <span className="slash">/</span>
                  <button
                    className={`nav-auth-btn ${authMode === "register" ? "active" : ""}`}
                    onClick={() => setAuthMode("register")}
                  >
                    Register
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {searchMessage && (
        <div className="govt-search-toast">
          <AlertCircle size={14} /> {searchMessage}
        </div>
      )}
    </header>
  );
}

function GovtHeroStatsBanner() {
  return (
    <div className="govt-hero-stats-wrapper">
      <div className="stats-pill-container">
        <div className="stat-card">
          <div className="stat-badge-icon">
            <BadgeCheck size={24} className="text-saffron" />
          </div>
          <div className="stat-text">
            <strong>254,623</strong>
            <span>DPIIT Recognised Startups</span>
          </div>
        </div>
        <div className="stat-v-line" />
        <div className="stat-card">
          <div className="stat-badge-icon">
            <FileText size={24} className="text-saffron" />
          </div>
          <div className="stat-text">
            <strong>0</strong>
            <span>BHASKAR Users</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [startup, setStartup] = useState<Startup | null>(() => readStartup());
  const [screen, setScreen] = useState<Screen>(() => {
    const saved = readStartup();
    return saved?.status === "approved" ? "dashboard" : saved ? "pending" : "auth";
  });
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [tab, setTab] = useState<Tab>("Overview");
  const [portalSearch, setPortalSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [activeBenefitIndex, setActiveBenefitIndex] = useState(0);

  useEffect(() => {
    if (startup) localStorage.setItem(STORAGE_KEY, JSON.stringify(startup));
  }, [startup]);

  const handleRegister = (newStartup: Startup) => {
    setStartup(newStartup);
    setNotice("");
    setScreen("pending");
  };

  const handleLogin = (email: string, password: string) => {
    if (!startup || startup.email.toLowerCase() !== email.trim().toLowerCase() || startup.password !== password) {
      setNotice("Your ID is not registered. Check your email and password, or register as a startup.");
      return;
    }
    setNotice("");
    setScreen(startup.status === "approved" ? "dashboard" : "pending");
  };

  const approveStartup = () => {
    if (!startup) return;
    const approved = { ...startup, status: "approved" as Status };
    setStartup(approved);
    setScreen("dashboard");
  };

  const logout = () => {
    setScreen("auth");
    setAuthMode("login");
    setNotice("");
  };

  const handlePortalSearch = (query: string) => {
    const normalizedQuery = query.toLowerCase();
    const problemMatch = problemStatements.some((problem) =>
      [problem.id, problem.title, problem.ministry, problem.theme, problem.description]
        .some((value) => value.toLowerCase().includes(normalizedQuery)),
    );
    const schemeSearch = ["scheme", "msins", "reimbursement", "procurement", "patent", "funding", "incubation", "incubator", "subsidy", "emd", "quality", "certification", "maharashtra", "rental", "soft loan"]
      .some((term) => normalizedQuery.includes(term));

    setPortalSearch(query);
    setTab(problemMatch || !schemeSearch ? "Problem Statements" : "Schemes");
  };

  const handleTabChange = (nextTab: Tab) => {
    setPortalSearch("");
    setTab(nextTab);
  };

  const govtBenefits = [
    {
      icon: <Award size={20} />,
      title: "DPIIT Recognition",
      description: "Fast-track patent applications with up to 80% fee rebate for eligible startups.",
    },
    {
      icon: <Landmark size={20} />,
      title: "Public Procurement",
      description: "Exemption from EMD and prior experience criteria in government tender bids.",
    },
    {
      icon: <Sparkles size={20} />,
      title: "Startup Seed Fund",
      description: "Access up to ₹50 Lakh financial assistance for prototype & proof of concept.",
    },
    {
      icon: <UploadCloud size={20} />,
      title: "Solution Sandbox",
      description: "Test AI & software solutions directly against live ministry challenges.",
    },
  ];

  if (screen === "pending" && startup) {
    return (
      <div className="govt-page-wrapper">
        <GovtHeader startup={startup} onLogout={logout} />
        <PendingView startup={startup} onApprove={approveStartup} onLogout={logout} />
      </div>
    );
  }

  if (screen === "dashboard" && startup) {
    return (
      <div className="govt-page-wrapper">
        <GovtHeader startup={startup} onLogout={logout} onSearch={handlePortalSearch} />
        <Dashboard startup={startup} tab={tab} setTab={handleTabChange} onLogout={logout} portalSearch={portalSearch} onClearSearch={() => setPortalSearch("")} />
      </div>
    );
  }

  return (
    <div className="govt-page-wrapper">
      <GovtHeader authMode={authMode} setAuthMode={setAuthMode} />

      <main className="auth-shell">
        {/* Left Side: Interactive Feature Showcase Section */}
        <section className="auth-intro">
          <div className="intro-copy">
            <p className="eyebrow">DPIIT Innovation Network</p>
            <h1>
              Build what
              <br />
              <em>matters.</em>
            </h1>
            <p className="intro-text">
              A single government platform to take your idea from a registered startup to a deployed ministry solution.
            </p>

            {/* Interactive Benefit Selector Tabs */}
            <div className="interactive-benefits-widget">
              <span className="widget-label">Key Platform Benefits (Click to explore)</span>
              <div className="benefit-pills-row">
                {govtBenefits.map((benefit, idx) => (
                  <button
                    key={benefit.title}
                    type="button"
                    className={`benefit-pill ${activeBenefitIndex === idx ? "active" : ""}`}
                    onClick={() => setActiveBenefitIndex(idx)}
                  >
                    {benefit.icon}
                    <span>{benefit.title}</span>
                  </button>
                ))}
              </div>

              <div className="benefit-card-display">
                <div className="card-display-header">
                  {govtBenefits[activeBenefitIndex].icon}
                  <strong>{govtBenefits[activeBenefitIndex].title}</strong>
                </div>
                <p>{govtBenefits[activeBenefitIndex].description}</p>
              </div>
            </div>
          </div>

          <div className="intro-footer">
            <span className="status-dot" /> Government innovation network <span>↗</span>
          </div>
        </section>

        {/* Right Side: Interactive Auth Panel */}
        <section className="auth-panel">
          <div className="auth-panel-inner">
            <div className="auth-header">
              <p className="eyebrow">Startup portal</p>
              <h2>{authMode === "login" ? "Welcome back" : "Join the network"}</h2>
              <p>
                {authMode === "login"
                  ? "Sign in to continue to your startup workspace."
                  : "Tell us about your startup to get started."}
              </p>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="mode-switch" role="tablist">
              <button
                className={authMode === "login" ? "active" : ""}
                onClick={() => {
                  setAuthMode("login");
                  setNotice("");
                }}
              >
                Log in
              </button>
              <button
                className={authMode === "register" ? "active" : ""}
                onClick={() => {
                  setAuthMode("register");
                  setNotice("");
                }}
              >
                Register
              </button>
            </div>

            {notice && (
              <div className="form-notice">
                <CircleHelp size={17} /> {notice}
              </div>
            )}

            {authMode === "login" ? (
              <LoginForm onLogin={handleLogin} existingStartup={startup} />
            ) : (
              <RegisterForm onRegister={handleRegister} />
            )}
          </div>
          <div className="privacy-note">
            <ShieldCheck size={16} /> Your information is encrypted and handled securely under Government of India standards.
          </div>
        </section>
      </main>
    </div>
  );
}

function LoginForm({
  onLogin,
  existingStartup,
}: {
  onLogin: (email: string, password: string) => void;
  existingStartup: Startup | null;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"Startup" | "Ministry" | "Evaluator">("Startup");
  const [showPassword, setShowPassword] = useState(false);

  // Quick Demo Credential Autofill
  const handleAutofillDemo = () => {
    if (existingStartup) {
      setEmail(existingStartup.email);
      setPassword(existingStartup.password);
    } else {
      setEmail(role === "Startup" ? "founder@agritech.in" : role === "Ministry" ? "officer@gov.in" : "evaluator@expert.gov.in");
      setPassword("password123");
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      <div className="demo-autofill-banner">
        <button type="button" className="autofill-btn" onClick={handleAutofillDemo}>
          <Sparkles size={14} /> Auto-fill {existingStartup ? "Registered" : "Demo"} Credentials
        </button>
      </div>

      <label className="field">
        <span>
          Login as<b>*</b>
        </span>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "Startup" | "Ministry" | "Evaluator")}
          className="role-dropdown-select"
        >
          <option value="Startup">Startup / Entrepreneur</option>
          <option value="Ministry">Ministry / Department Officer</option>
          <option value="Evaluator">Technical Evaluator / Expert</option>
        </select>
      </label>

      {role !== "Startup" && (
        <div className="role-info-banner">
          <AlertCircle size={15} />
          <span>
            Logging in as <strong>{role}</strong>. You will be routed to the official {role} Portal Workspace.
          </span>
        </div>
      )}

      <label className="field">
        <span>
          Registered email<b>*</b>
        </span>
        <input
          name="email"
          type="email"
          placeholder={role === "Startup" ? "founder@company.com" : role === "Ministry" ? "officer@gov.in" : "evaluator@expert.gov.in"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="field">
        <span>
          Password<b>*</b>
        </span>
        <div className="input-with-toggle">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </label>

      <button className="primary-button" type="submit">
        Log in as {role} <ArrowRight size={17} />
      </button>
      <p className="helper-text">Use your registered email and password for UdyamSetu.</p>
    </form>
  );
}

function RegisterForm({ onRegister }: { onRegister: (startup: Startup) => void }) {
  const [role, setRole] = useState<"Startup" | "Ministry">("Startup");
  const [name, setName] = useState("");
  const [dpiit, setDpiit] = useState("");
  const [ministry, setMinistry] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [education, setEducation] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);

  // Interactive Demo Registration Autofill
  const handleAutofillDemo = () => {
    setName(role === "Startup" ? "Aarav Sharma" : "Dr. Rajesh Varma");
    setDpiit(role === "Startup" ? "DPIIT-984210" : "GOV-MIN-40291");
    setMinistry(role === "Startup" ? "" : "Ministry of Agriculture & Farmers Welfare");
    setEmail(role === "Startup" ? "aarav@cleanenergy.in" : "r.varma@agri.gov.in");
    setDob("1995-08-15");
    setEducation(role === "Startup" ? "B.Tech Innovation Science" : "Ph.D Public Policy & Agritech");
    setPassword("Startup#2026");
    setDescription(role === "Startup" ? "Solar-powered micro-grid technology for rural community access." : "Department of Agricultural Innovation & Procurement.");
    setAttachedFile({ name: role === "Startup" ? "DPIIT_Certificate_Aarav.pdf" : "Government_ID_Rajesh.pdf", size: "2.1 MB" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setAttachedFile({ name: file.name, size: `${sizeMb} MB` });
    }
  };

  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return { label: "", score: 0 };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) || /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    if (score <= 1) return { label: "Weak", score: 1, color: "#ef4444" };
    if (score === 2 || score === 3) return { label: "Medium", score: 2, color: "#f97316" };
    return { label: "Strong", score: 3, color: "#16a34a" };
  };

  const passStrength = calculatePasswordStrength(password);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onRegister({
      name,
      email,
      password,
      dpiit,
      ministry: role === "Ministry" ? ministry : "",
      dob,
      education,
      description,
      status: "pending",
      registeredAt: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });
  };

  return (
    <form className="auth-form register-form" onSubmit={submit}>
      <div className="demo-autofill-banner">
        <button type="button" className="autofill-btn" onClick={handleAutofillDemo}>
          <Sparkles size={14} /> Auto-fill Sample Registration Data
        </button>
      </div>

      <label className="field">
        <span>
          Register as<b>*</b>
        </span>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "Startup" | "Ministry")}
          className="role-dropdown-select"
        >
          <option value="Startup">Startup / Entrepreneur</option>
          <option value="Ministry">Ministry / Department Nodal Officer</option>
        </select>
      </label>

      {role === "Ministry" && (
        <>
          <div className="role-info-banner">
            <Building2 size={15} />
            <span>
              Registering a <strong>Ministry Officer Account</strong> to post problem statements & evaluate sandbox submissions.
            </span>
          </div>
          <label className="field">
            <span>
              Ministry / Department<b>*</b>
            </span>
            <select
              name="ministry"
              value={ministry}
              onChange={(event) => setMinistry(event.target.value)}
              required
            >
              <option value="" disabled>Select your ministry or department</option>
              <option value="Ministry of Agriculture & Farmers Welfare">Ministry of Agriculture & Farmers Welfare</option>
              <option value="Department of Agricultural Research and Education">Department of Agricultural Research and Education</option>
              <option value="Ministry of Food Processing Industries">Ministry of Food Processing Industries</option>
              <option value="Ministry of Fisheries, Animal Husbandry and Dairying">Ministry of Fisheries, Animal Husbandry and Dairying</option>
              <option value="Ministry of Jal Shakti">Ministry of Jal Shakti</option>
              <option value="Department of Drinking Water and Sanitation">Department of Drinking Water and Sanitation</option>
              <option value="Ministry of Health and Family Welfare">Ministry of Health and Family Welfare</option>
              <option value="Ministry of Education">Ministry of Education</option>
              <option value="Ministry of Electronics and Information Technology">Ministry of Electronics and Information Technology</option>
              <option value="Ministry of New and Renewable Energy">Ministry of New and Renewable Energy</option>
              <option value="Ministry of Power">Ministry of Power</option>
              <option value="Ministry of Rural Development">Ministry of Rural Development</option>
              <option value="Ministry of Environment, Forest and Climate Change">Ministry of Environment, Forest and Climate Change</option>
              <option value="Ministry of Housing and Urban Affairs">Ministry of Housing and Urban Affairs</option>
              <option value="Ministry of Road Transport and Highways">Ministry of Road Transport and Highways</option>
              <option value="Ministry of Textiles">Ministry of Textiles</option>
              <option value="Ministry of Women and Child Development">Ministry of Women and Child Development</option>
              <option value="Other Ministry or Department">Other Ministry or Department</option>
            </select>
          </label>
        </>
      )}

      <div className="form-grid">
        <label className="field">
          <span>
            {role === "Startup" ? "Startup / founder name" : "Officer / Entity name"}<b>*</b>
          </span>
          <input
            name="name"
            placeholder={role === "Startup" ? "Your registered name" : "Official Full Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="field">
          <span>
            {role === "Startup" ? "DPIIT recognition ID" : "Government Department ID"}<b>*</b>
          </span>
          <input
            name="dpiit"
            placeholder={role === "Startup" ? "DPIIT-XXXXXX" : "GOV-MIN-XXXXX"}
            value={dpiit}
            onChange={(e) => setDpiit(e.target.value)}
            required
          />
        </label>
      </div>

      <div className="form-grid">
        <label className="field">
          <span>
            Registered email<b>*</b>
          </span>
          <input
            name="email"
            type="email"
            placeholder={role === "Startup" ? "founder@company.com" : "officer@gov.in"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="field">
          <span>
            Date of birth<b>*</b>
          </span>
          <input
            name="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </label>
      </div>

      <label className="field">
        <span>
          Education / qualification<b>*</b>
        </span>
        <input
          name="education"
          placeholder="Highest qualification"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          required
        />
      </label>

      <label className="field">
        <span>
          Create password<b>*</b>
        </span>
        <div className="input-with-toggle">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Minimum 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Interactive Password Strength Bar */}
        {password && (
          <div className="password-strength-bar">
            <div className="strength-meter">
              <span
                className="meter-fill"
                style={{
                  width: `${(passStrength.score / 3) * 100}%`,
                  backgroundColor: passStrength.color,
                }}
              />
            </div>
            <span className="strength-label" style={{ color: passStrength.color }}>
              Strength: <strong>{passStrength.label}</strong>
            </span>
          </div>
        )}
      </label>

      <label className="field">
        <span>
          {role === "Startup" ? "What are you building?" : "Department Focus & Mandate"}<b>*</b>
        </span>
        <textarea
          name="description"
          placeholder={role === "Startup" ? "A short description of your solution" : "Brief description of your ministry initiatives"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>

      {/* Interactive Certificate File Upload Component */}
      <div className={`upload-row ${attachedFile ? "has-file" : ""}`}>
        <input
          type="file"
          id="cert-upload"
          style={{ display: "none" }}
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
        {attachedFile ? (
          <>
            <CheckCircle2 size={20} className="text-saffron" />
            <div>
              <strong>{attachedFile.name}</strong>
              <small>{attachedFile.size} · Document Attached</small>
            </div>
            <button
              type="button"
              className="upload-button remove-btn"
              onClick={() => setAttachedFile(null)}
            >
              <X size={14} /> Remove
            </button>
          </>
        ) : (
          <>
            <FileCheck2 size={20} />
            <div>
              <strong>{role === "Startup" ? "Education certificate" : "Government ID Proof"}</strong>
              <small>PDF, JPG or PNG · max 5 MB</small>
            </div>
            <label htmlFor="cert-upload" className="upload-button clickable">
              Attach file <ChevronRight size={15} />
            </label>
          </>
        )}
      </div>

      <button className="primary-button" type="submit">
        Submit as {role} for verification <ArrowRight size={17} />
      </button>
      <p className="helper-text">Your application is reviewed by the UdyamSetu admin team.</p>
    </form>
  );
}

function PendingView({
  startup,
  onApprove,
  onLogout,
}: {
  startup: Startup;
  onApprove: () => void;
  onLogout: () => void;
}) {
  return (
    <main className="pending-shell">
      <header className="simple-header">
        <div className="brand-mark">
          <Rocket size={18} />
        </div>
        <div className="brand-name">
          udyam<span>setu</span>
        </div>
        <button className="quiet-button" onClick={onLogout}>
          <LogOut size={16} /> Exit
        </button>
      </header>
      <section className="pending-card">
        <div className="pending-icon">
          <FileCheck2 size={30} />
        </div>
        <p className="eyebrow">Application received · {startup.registeredAt}</p>
        <h1>
          We’re reviewing
          <br />
          your <em>application.</em>
        </h1>
        <p className="pending-copy">
          Thanks, {startup.name}. Your startup details and documents are now with the admin verification team.
          Expect an update within <strong>3–4 business days.</strong>
        </p>
        <div className="review-steps">
          <div className="review-step done">
            <span>
              <Check size={15} />
            </span>
            <div>
              <strong>Application submitted</strong>
              <small>Your information is securely recorded</small>
            </div>
          </div>
          <div className="step-line" />
          <div className="review-step active">
            <span>2</span>
            <div>
              <strong>Admin verification</strong>
              <small>Our team is checking your DPIIT recognition</small>
            </div>
          </div>
          <div className="step-line" />
          <div className="review-step">
            <span>3</span>
            <div>
              <strong>Startup workspace unlocked</strong>
              <small>Access challenges, schemes and sandbox</small>
            </div>
          </div>
        </div>
        <div className="admin-preview">
          <div>
            <span className="admin-label">
              <Users size={14} /> Admin preview
            </span>
            <strong>Approve this application to preview the startup workspace</strong>
          </div>
          <button onClick={onApprove}>
            Approve application <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}

function StartupWorkspaceHeader({
  startup,
  tab,
  setTab,
  onLogout,
}: {
  startup: Startup;
  tab: Tab;
  setTab: (tab: Tab) => void;
  onLogout: () => void;
}) {
  return (
    <header className="startup-workspace-header">
      <div className="govt-container workspace-header-inner">
        <div className="workspace-brand">
          <div className="brand-mark">
            <Rocket size={17} />
          </div>
          <div className="brand-name">
            udyam<span>setu</span>
          </div>
        </div>

        <nav className="workspace-nav">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={tab === label ? "selected" : ""}
              onClick={() => setTab(label)}
            >
              <Icon size={16} />
              {label}
              {label === "Problem Statements" && <span className="nav-count">5</span>}
            </button>
          ))}
        </nav>

        <div className="workspace-right-controls">
          <div className="help-link">
            <CircleHelp size={16} /> Help centre
          </div>
          <button className="profile-chip" onClick={() => setTab("Profile")}>
            <span>{startup.name.slice(0, 1).toUpperCase()}</span>
            <div>
              <strong>{startup.name}</strong>
              <small>Verified startup</small>
            </div>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Dashboard({
  startup,
  tab,
  setTab,
  onLogout,
  portalSearch,
  onClearSearch,
}: {
  startup: Startup;
  tab: Tab;
  setTab: (tab: Tab) => void;
  onLogout: () => void;
  portalSearch: string;
  onClearSearch: () => void;
}) {
  const [selectedProblem, setSelectedProblem] = useState<ProblemStatement>(problemStatements[0]);

  const handleApplyProblem = (problem: ProblemStatement) => {
    setSelectedProblem(problem);
    setTab("Sandbox");
  };

  return (
    <main className="dashboard-shell">
      <StartupWorkspaceHeader startup={startup} tab={tab} setTab={setTab} onLogout={onLogout} />
      <section className="dashboard-content">
        <header className="dashboard-header">
          <button className="mobile-menu">
            <Menu size={20} />
          </button>
          <div>
            <p className="eyebrow">Startup workspace</p>
            <h1>{tab}</h1>
          </div>
          <div className="header-actions">
            <span className="approved-pill">
              <span /> Verified
            </span>
            <button className="quiet-button" onClick={onLogout}>
              <LogOut size={16} /> Log out
            </button>
          </div>
        </header>
        <div className="dashboard-body">
          {tab === "Overview" ? (
            <Overview startup={startup} setTab={setTab} onApplyProblem={handleApplyProblem} />
          ) : tab === "Problem Statements" ? (
            <ProblemStatementsView onApplyProblem={handleApplyProblem} initialSearchQuery={portalSearch} onClearSearch={onClearSearch} />
          ) : tab === "Sandbox" ? (
            <SolutionSandboxView
              startup={startup}
              selectedProblem={selectedProblem}
              onSelectProblem={setSelectedProblem}
            />
          ) : tab === "Milestones" ? (
            <MilestonesView startup={startup} />
          ) : tab === "Schemes" ? (
            <SchemesView startup={startup} searchQuery={portalSearch} onClearSearch={onClearSearch} />
          ) : (
            <TabContent tab={tab as Exclude<Tab, "Overview" | "Problem Statements" | "Sandbox" | "Milestones" | "Schemes">} startup={startup} />
          )}
        </div>
      </section>
    </main>
  );
}

function Overview({
  startup,
  setTab,
  onApplyProblem,
}: {
  startup: Startup;
  setTab: (tab: Tab) => void;
  onApplyProblem: (problem: ProblemStatement) => void;
}) {
  const interestedProblems = problemStatements.filter((p) => p.matchScore);

  return (
    <div className="overview">
      <div className="welcome-row">
        <div>
          <p className="eyebrow">DPIIT Innovation Portal</p>
          <h2>
            Good morning, {startup.name.split(" ")[0]} <span>✦</span>
          </h2>
          <p>Here’s what’s moving your startup forward.</p>
        </div>
        <button className="outline-button" onClick={() => setTab("Profile")}>
          View startup profile <ArrowRight size={16} />
        </button>
      </div>

      <div className="metric-grid">
        <Metric number="05" label="Ministry Problem Statements" accent="mint" icon={<Target size={20} />} onClick={() => setTab("Problem Statements")} />
        <Metric number="04" label="Matched DPIIT Schemes" accent="peach" icon={<Sparkles size={20} />} onClick={() => setTab("Schemes")} />
        <Metric number="02" label="Milestones Achieved" accent="lilac" icon={<BadgeCheck size={20} />} onClick={() => setTab("Milestones")} />
      </div>

      {/* SECTION: Problem Statements You Might Be Interested In */}
      <div className="interested-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Personalized AI Matchmaking</p>
            <h3>Problem Statements You Might Be Interested In</h3>
            <p className="section-subtext">
              Suggested based on your registered domain, tech stack, and past innovation experience.
            </p>
          </div>
          <button className="text-button" onClick={() => setTab("Problem Statements")}>
            Explore all (5) <ArrowRight size={15} />
          </button>
        </div>

        <div className="interested-grid">
          {interestedProblems.map((ps) => (
            <div key={ps.id} className="ps-card interested-card">
              <div className="ps-card-header">
                <span className={`theme-badge ${ps.themeColor}`}>{ps.theme}</span>
                {ps.matchScore && <span className="match-pill">{ps.matchScore}</span>}
              </div>
              <span className="ministry-tag">{ps.ministry}</span>
              <h4>{ps.title}</h4>
              <p className="ps-desc">{ps.description}</p>

              <div className="kpi-mini-list">
                {ps.kpiBenchmarks.slice(0, 3).map((kpi, i) => (
                  <span key={i} className="kpi-chip">
                    <CheckCircle2 size={12} className="text-green" /> {kpi}
                  </span>
                ))}
              </div>

              <div className="ps-card-footer">
                <div className="grant-info">
                  <strong>{ps.grant.split("+")[0]}</strong>
                  <small>Deadline: {ps.deadline}</small>
                </div>
                <button className="apply-btn" onClick={() => onApplyProblem(ps)}>
                  Apply <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="progress-band">
        <div className="progress-copy">
          <span className="mini-icon">
            <Rocket size={17} />
          </span>
          <div>
            <p className="eyebrow">Startup journey</p>
            <h3>2 of 5 milestones achieved</h3>
          </div>
        </div>
        <div className="progress-track">
          <span />
        </div>
        <button className="text-button" onClick={() => setTab("Milestones")}>
          See progress <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

function Metric({
  number,
  label,
  accent,
  icon,
  onClick,
}: {
  number: string;
  label: string;
  accent: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button type="button" className={`metric-card ${accent}`} onClick={onClick}>
      <span className="metric-icon">{icon}</span>
      <strong>{number}</strong>
      <span>{label}</span>
      <ChevronRight size={17} />
    </button>
  );
}

function ProblemStatementsView({
  onApplyProblem,
  initialSearchQuery = "",
  onClearSearch,
}: {
  onApplyProblem: (problem: ProblemStatement) => void;
  initialSearchQuery?: string;
  onClearSearch?: () => void;
}) {
  const [selectedTheme, setSelectedTheme] = useState<string>("All Themes");
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(["PS-2026-AGRI-01"]);
  const [previewProblem, setPreviewProblem] = useState<ProblemStatement | null>(null);
  const [toastMessage, setToastMessage] = useState<string>("");

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
    onClearSearch?.();
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const toggleBookmark = (id: string, title: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((i) => i !== id));
      showToast(`Removed "${id}" from Bookmarks`);
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
      showToast(`Bookmarked "${id}"! Quick access saved.`);
    }
  };

  const handleShareLink = (ps: ProblemStatement) => {
    showToast(`Copied official link for "${ps.id}" to clipboard!`);
  };

  const themes = [
    "All Themes",
    "Bookmarks Only ⭐",
    "Agriculture & Rural",
    "Water & Sanitation",
    "Food & Nutrition",
    "Healthcare & AI",
    "Clean Energy & Mobility",
  ];

  const filteredProblems = problemStatements.filter((ps) => {
    if (selectedTheme === "Bookmarks Only ⭐") {
      return bookmarkedIds.includes(ps.id);
    }
    const matchesTheme = selectedTheme === "All Themes" || ps.theme === selectedTheme;
    const matchesQuery =
      ps.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ps.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ps.ministry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ps.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ps.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTheme && matchesQuery;
  });

  return (
    <div className="problem-statements-page">
      {toastMessage && (
        <div className="govt-toast-banner">
          <Sparkles size={16} className="text-saffron" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="ps-page-header">
        <div>
          <p className="eyebrow">Official Ministry Procurement Pipeline</p>
          <h2>Government Problem Statements</h2>
          <p className="detail-intro">
            Explore active ministry challenges open for startup solution sandbox evaluation, pilot testing, and seed funding.
          </p>
        </div>
        <div className="search-box-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by title, theme, ministry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {searchQuery && (
          <button type="button" className="outline-button clear-search-button" onClick={clearSearch}>
            Clear search <X size={14} />
          </button>
        )}
      </div>

      {/* Theme Filters Row */}
      <div className="theme-filters-row">
        <span className="filter-label">Filter by Theme:</span>
        <div className="theme-pills">
          {themes.map((theme) => (
            <button
              key={theme}
              type="button"
              className={`theme-pill ${selectedTheme === theme ? "active" : ""}`}
              onClick={() => setSelectedTheme(theme)}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      {/* Problem Statements List Grid */}
      <div className="ps-full-list">
        {filteredProblems.map((ps) => {
          const isBookmarked = bookmarkedIds.includes(ps.id);
          return (
            <div key={ps.id} className="ps-full-card">
              <div className="ps-card-top">
                <div className="ps-card-header-group">
                  <span className={`theme-badge ${ps.themeColor}`}>{ps.theme}</span>
                  <span className="ps-id-badge">{ps.id}</span>
                  {ps.matchScore && <span className="match-pill">{ps.matchScore}</span>}
                </div>
                <div className="ps-card-top-actions">
                  <button
                    type="button"
                    className={`bookmark-btn ${isBookmarked ? "active" : ""}`}
                    onClick={() => toggleBookmark(ps.id, ps.title)}
                    title={isBookmarked ? "Remove Bookmark" : "Save Bookmark"}
                  >
                    <Star size={16} fill={isBookmarked ? "#ea580c" : "none"} />
                  </button>
                  <button
                    type="button"
                    className="share-icon-btn"
                    onClick={() => handleShareLink(ps)}
                    title="Share Challenge Link"
                  >
                    <Share2 size={16} />
                  </button>
                  <span className="ministry-name-badge">{ps.ministry}</span>
                </div>
              </div>

              <h3 className="ps-title">{ps.title}</h3>
              <p className="ps-description-text">{ps.description}</p>

              {/* Target KPIs & System Benchmark Criteria */}
              <div className="kpi-benchmark-section">
                <span className="kpi-section-title">Required KPI Benchmark Criteria:</span>
                <div className="kpi-grid">
                  {ps.kpiBenchmarks.map((kpi, idx) => (
                    <div key={idx} className="kpi-box">
                      <CheckCircle2 size={14} className="text-saffron" />
                      <span>{kpi}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ps-card-bottom-row">
                <div className="grant-details">
                  <Award size={18} className="text-saffron" />
                  <div>
                    <strong>{ps.grant}</strong>
                    <small>Submission Deadline: <span>{ps.deadline}</span></small>
                  </div>
                </div>
                <div className="card-actions-group">
                  <button
                    type="button"
                    className="outline-button quick-view-btn"
                    onClick={() => setPreviewProblem(ps)}
                  >
                    <Maximize2 size={15} /> Quick View Spec
                  </button>
                  <button className="primary-button apply-btn-main" onClick={() => onApplyProblem(ps)}>
                    Apply for Sandbox Evaluation <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredProblems.length === 0 && (
          <div className="no-results-box">
            <p>No problem statements match your filter criteria.</p>
            <button className="outline-button" onClick={() => setSelectedTheme("All Themes")}>
              Reset Theme Filter
            </button>
          </div>
        )}
      </div>

      {/* Interactive Quick View Modal */}
      {previewProblem && (
        <div className="modal-overlay" onClick={() => setPreviewProblem(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <span className={`theme-badge ${previewProblem.themeColor}`}>{previewProblem.theme}</span>
                <span className="ps-id-badge">{previewProblem.id}</span>
              </div>
              <button className="modal-close-btn" onClick={() => setPreviewProblem(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <span className="ministry-tag-large">{previewProblem.ministry}</span>
              <h2>{previewProblem.title}</h2>
              <p className="modal-desc">{previewProblem.description}</p>

              <div className="modal-section">
                <h4>Mandatory Target KPI Benchmarks</h4>
                <div className="kpi-grid">
                  {previewProblem.kpiBenchmarks.map((kpi, idx) => (
                    <div key={idx} className="kpi-box highlight">
                      <CheckCircle2 size={16} className="text-saffron" />
                      <span>{kpi}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-grant-box">
                <Award size={22} className="text-saffron" />
                <div>
                  <strong>{previewProblem.grant}</strong>
                  <p>Includes E2B Sandbox Testing Access + DPIIT Fast-Track Procurement Approval</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="outline-button"
                onClick={() => handleShareLink(previewProblem)}
              >
                <Share2 size={15} /> Copy Share Link
              </button>
              <button
                type="button"
                className="primary-button"
                onClick={() => {
                  const target = previewProblem;
                  setPreviewProblem(null);
                  onApplyProblem(target);
                }}
              >
                Open Solution Sandbox Form <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SolutionSandboxView({
  startup,
  selectedProblem,
  onSelectProblem,
}: {
  startup: Startup;
  selectedProblem: ProblemStatement;
  onSelectProblem: (problem: ProblemStatement) => void;
}) {
  const [solutionScope, setSolutionScope] = useState<"Software" | "Hardware" | "Both">("Both");
  const [solutionTitle, setSolutionTitle] = useState("");
  const [q1SolutionType, setQ1SolutionType] = useState("AI / Machine Learning");
  const [q2PrimaryOutcome, setQ2PrimaryOutcome] = useState("Accuracy");
  const [expectedOutcomeExplanation, setExpectedOutcomeExplanation] = useState("");
  const [existingProcessImproved, setExistingProcessImproved] = useState("");
  const [q3ImprovementPct, setQ3ImprovementPct] = useState("25–50%");
  const [targetValue, setTargetValue] = useState(">= 92% Target KPI");
  const [performanceDirection, setPerformanceDirection] = useState("Higher performance is better");
  const [q4MeasurementMethod, setQ4MeasurementMethod] = useState("Automatically from the sandbox");

  // Technical Specs fields
  const [techStack, setTechStack] = useState("");
  const [deploymentModel, setDeploymentModel] = useState("Hybrid / Edge + Cloud");
  const [hardwareSpecs, setHardwareSpecs] = useState("");
  const [microcontrollers, setMicrocontrollers] = useState("");
  const [powerFootprint, setPowerFootprint] = useState("");

  // System KPI Verification & Streaming Report State
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testVerified, setTestVerified] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [loadingStepText, setLoadingStepText] = useState("Connecting to E2B Isolated Docker Sandbox Environment...");
  const [streamLinesCount, setStreamLinesCount] = useState(0);

  // File Upload state
  const [codeFile, setCodeFile] = useState<{ name: string; size: string } | null>(null);
  const [docFile, setDocFile] = useState<{ name: string; size: string } | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const consoleLogs = [
    "[0.05s INFO] Initializing E2B Sandbox Isolated Docker Container (e2b-sandbox-procure-2026)...",
    "[0.30s INFO] Mounting workspace: Ingesting source code repository & technical specifications...",
    "[0.65s TEST] Executing Test Suite #1: Spectral Model Accuracy & Pest Identification Rate...",
    "[1.10s PASS] Test Suite #1 Result: 96.2% Accuracy (Benchmark requirement >= 94.0%)",
    "[1.45s TEST] Executing Test Suite #2: Edge Device Inference Latency & Frame Processing Speed...",
    "[1.90s PASS] Test Suite #2 Result: 240ms Mean Latency (Benchmark requirement < 300ms)",
    "[2.25s TEST] Executing Test Suite #3: Offline Model Weight Execution & On-Device Memory Footprint...",
    "[2.70s PASS] Test Suite #3 Result: Offline Model Execution Verified (Benchmark requirement Enabled)",
    "[3.10s EVAL] Computing AI Anomaly Detection Score: 0.02 (Optimal threshold <= 0.05)",
    "[3.50s DONE] All 4/4 Target Ministry KPI Benchmarks Executed Successfully!",
  ];

  const q1Options = [
    "AI / Machine Learning",
    "Software / Web Application",
    "Mobile Application",
    "Hardware / IoT",
    "Hardware + Software",
    "Infrastructure / Physical Solution",
    "Service / Process Innovation",
    "Other",
  ];

  const q2OutcomeOptions = [
    "Accuracy",
    "Speed / Processing Time",
    "Cost Reduction",
    "Productivity",
    "Resource Utilization",
    "Reliability",
    "Safety",
    "Customer/Citizen Satisfaction",
    "Revenue / Financial Impact",
    "Error Reduction",
    "Environmental Impact",
    "Accessibility",
    "Other",
  ];

  const q3ImprovementOptions = ["0–10%", "10–25%", "25–50%", "50–75%", "More than 75%"];

  const q4MeasurementOptions = [
    "Automatically from the sandbox",
    "Uploaded dataset",
    "API response",
    "Uploaded test report",
    "Sensor/device data",
    "Government-provided data",
    "User feedback",
    "Manual evaluator input",
    "Combination of multiple sources",
  ];

  const TOTAL_STREAM_STEPS = 19;
  const [streamStep, setStreamStep] = useState(0);

  const missingSandboxFields = [
    !solutionTitle.trim() && "Solution title",
    !expectedOutcomeExplanation.trim() && "Expected outcome explanation",
    !existingProcessImproved.trim() && "Process and workflow improvement",
    !targetValue.trim() && "Target KPI value",
    (solutionScope === "Software" || solutionScope === "Both") && !techStack.trim() && "Software tech stack",
    (solutionScope === "Hardware" || solutionScope === "Both") && !microcontrollers.trim() && "Microcontrollers / processor units",
    (solutionScope === "Hardware" || solutionScope === "Both") && !powerFootprint.trim() && "Power and battery footprint",
    (solutionScope === "Hardware" || solutionScope === "Both") && !hardwareSpecs.trim() && "Hardware specifications",
    !codeFile && "Product code or technical artifact",
    !docFile && "Technical whitepaper or pitch deck",
  ].filter((field): field is string => Boolean(field));

  const handleRunBenchmarkCheck = () => {
    if (missingSandboxFields.length > 0) {
      setValidationMessage(`Complete these details before running E2B: ${missingSandboxFields.join(", ")}.`);
      return;
    }

    setValidationMessage("");
    setIsTestRunning(true);
    setLoadingStepText("Connecting to E2B Isolated Docker Sandbox Environment...");

    setTimeout(() => {
      setLoadingStepText("Ingesting uploaded code repository & compiling environment...");
    }, 1000);

    setTimeout(() => {
      setLoadingStepText("Executing automated test suite against ministry target datasets...");
    }, 2000);

    setTimeout(() => {
      setIsTestRunning(false);
      setTestVerified(true);
      setShowReport(true);
      setStreamStep(1);
    }, 3000);
  };

  useEffect(() => {
    if (showReport && streamStep > 0 && streamStep < TOTAL_STREAM_STEPS) {
      const timer = setTimeout(() => {
        setStreamStep((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showReport, streamStep]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!testVerified) {
      handleRunBenchmarkCheck();
    } else {
      setIsSubmitted(true);
    }
  };

  if (isTestRunning) {
    return (
      <div className="sandbox-loading-screen">
        <div className="loading-card">
          <div className="spinner-large" />
          <p className="eyebrow">E2B Sandbox Runner Engine Active</p>
          <h2>Running E2B Sandbox Automated Test Runner...</h2>
          <p className="loading-subtext">{loadingStepText}</p>
          <div className="loading-progress-bar">
            <span className="fill-bar-animate" />
          </div>
          <small className="loading-footer-note">
            Please wait 3 seconds while our system evaluates your codebase against target ministry benchmarks.
          </small>
        </div>
      </div>
    );
  }

  if (showReport) {
    return (
      <div className="sandbox-report-page">
        {/* Streaming Progress Banner */}
        {streamStep < TOTAL_STREAM_STEPS && (
          <div className="streaming-status-banner">
            <span className="typing-pulse" />
            <span>AI Report Engine: Loading report contents line-by-line... ({Math.min(100, Math.round((streamStep / TOTAL_STREAM_STEPS) * 100))}%)</span>
          </div>
        )}

        {/* Step 1: Report Header Card */}
        {streamStep >= 1 && (
          <div className="report-header-card stream-item">
            <div className="report-header-top">
              <span className={`theme-badge ${selectedProblem.themeColor}`}>{selectedProblem.theme}</span>
              <span className="ps-id-badge">{selectedProblem.id}</span>
              <span className="status-badge eligible">✓ All Test Cases Passed (100%)</span>
            </div>
            <h2>E2B Automated Sandbox Benchmark Evaluation Report</h2>
            <p className="report-meta">
              Target Ministry: <strong>{selectedProblem.ministry}</strong> · Solution: <strong>{solutionTitle || "Agritech Edge Solution"}</strong> ({solutionScope})
            </p>
          </div>
        )}

        {/* Step 2+: Terminal Console Log Box */}
        {streamStep >= 2 && (
          <div className="terminal-log-box stream-item">
            <div className="terminal-header">
              <div className="window-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="terminal-title">E2B Sandbox Container Execution Log (Live Console Stream)</span>
            </div>
            <div className="terminal-body">
              {streamStep >= 3 && (
                <div className="terminal-line">
                  <span className="line-num">1</span>
                  <span className="line-info">[0.05s INFO] Initializing E2B Sandbox Isolated Docker Container (e2b-sandbox-procure-2026)...</span>
                </div>
              )}
              {streamStep >= 3 && (
                <div className="terminal-line">
                  <span className="line-num">2</span>
                  <span className="line-info">[0.30s INFO] Mounting workspace: Ingesting source code repository & technical specifications...</span>
                </div>
              )}
              {streamStep >= 4 && (
                <div className="terminal-line">
                  <span className="line-num">3</span>
                  <span className="line-test">[0.65s TEST] Executing Test Suite #1: Spectral Model Accuracy & Pest Identification Rate...</span>
                </div>
              )}
              {streamStep >= 4 && (
                <div className="terminal-line">
                  <span className="line-num">4</span>
                  <span className="line-pass">[1.10s PASS] Test Suite #1 Result: 96.2% Accuracy (Benchmark requirement &gt;= 94.0%)</span>
                </div>
              )}
              {streamStep >= 5 && (
                <div className="terminal-line">
                  <span className="line-num">5</span>
                  <span className="line-test">[1.45s TEST] Executing Test Suite #2: Edge Device Inference Latency & Frame Processing Speed...</span>
                </div>
              )}
              {streamStep >= 5 && (
                <div className="terminal-line">
                  <span className="line-num">6</span>
                  <span className="line-pass">[1.90s PASS] Test Suite #2 Result: 240ms Mean Latency (Benchmark requirement &lt; 300ms)</span>
                </div>
              )}
              {streamStep >= 6 && (
                <div className="terminal-line">
                  <span className="line-num">7</span>
                  <span className="line-test">[2.25s TEST] Executing Test Suite #3: Offline Model Weight Execution & On-Device Memory Footprint...</span>
                </div>
              )}
              {streamStep >= 6 && (
                <div className="terminal-line">
                  <span className="line-num">8</span>
                  <span className="line-pass">[2.70s PASS] Test Suite #3 Result: Offline Model Execution Verified (Benchmark requirement Enabled)</span>
                </div>
              )}
              {streamStep >= 7 && (
                <div className="terminal-line">
                  <span className="line-num">9</span>
                  <span className="line-info">[3.10s EVAL] Computing AI Anomaly Detection Score: 0.02 (Optimal threshold &lt;= 0.05)</span>
                </div>
              )}
              {streamStep >= 7 && (
                <div className="terminal-line">
                  <span className="line-num">10</span>
                  <span className="line-done">[3.50s DONE] All 4/4 Target Ministry KPI Benchmarks Executed Successfully!</span>
                </div>
              )}
              {streamStep < 7 && (
                <div className="terminal-cursor">▋ Line-by-line output streaming...</div>
              )}
            </div>
          </div>
        )}

        {/* Step 8+: Evaluation Summary Report Grid */}
        {streamStep >= 8 && (
          <div className="report-section-card stream-item">
            <div className="section-title-group">
              <BadgeCheck size={18} className="text-saffron" />
              <h4>Target Ministry Benchmark Test Case Verification Summary</h4>
            </div>
            <div className="test-cases-grid">
              {selectedProblem.kpiBenchmarks.map((kpi, idx) => {
                const isStepVisible = streamStep >= 9 + idx;
                if (!isStepVisible) return null;
                return (
                  <div key={idx} className="test-case-item passed stream-item">
                    <CheckCircle2 size={18} className="text-green" />
                    <div className="test-case-info">
                      <strong>Test Case #{idx + 1}: {kpi.split(" ")[0]} Criteria</strong>
                      <span>{kpi}</span>
                    </div>
                    <span className="test-result-chip pass">Passed ✓</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 13+: Drawbacks & Recommendations Section */}
        {streamStep >= 13 && (
          <div className="report-section-card drawback-section stream-item">
            <div className="section-title-group">
              <AlertCircle size={18} className="text-orange" />
              <h4>System Optimization Analysis & Identified Drawback Points</h4>
            </div>

            <div className="drawback-list">
              {streamStep >= 14 && (
                <div className="drawback-card stream-item">
                  <div className="drawback-header">
                    <span className="warning-chip">⚠️ Point of Concern / Drawback 1</span>
                    <strong>Model Weight File Size (45.2 MB)</strong>
                  </div>
                  <p className="drawback-desc">
                    The offline neural network model file size is 45.2 MB. While within limits, this may cause an initial 1.2s cold-boot delay on ultra low-memory (2GB RAM) feature smartphones.
                  </p>
                  {streamStep >= 15 && (
                    <div className="recommendation-box stream-item">
                      <strong>💡 System Recommendation:</strong> Quantize model weights to INT8 or compile to ONNX format to compress file size by 60% without accuracy loss.
                    </div>
                  )}
                </div>
              )}

              {streamStep >= 16 && (
                <div className="drawback-card stream-item">
                  <div className="drawback-header">
                    <span className="warning-chip">⚠️ Point of Concern / Drawback 2</span>
                    <strong>Zero-Lux Ambient Light Sensitivity</strong>
                  </div>
                  <p className="drawback-desc">
                    Spectral camera sensor accuracy experiences a minor 3.8% variance under extreme zero-lux ambient lighting during nocturnal field tests.
                  </p>
                  {streamStep >= 17 && (
                    <div className="recommendation-box stream-item">
                      <strong>💡 System Recommendation:</strong> Enable automatic LED flash trigger in the mobile SDK when ambient lux falls below 10 lux.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 18: Overall Verdict Banner */}
        {streamStep >= 18 && (
          <div className="verdict-banner stream-item">
            <CheckCircle2 size={22} className="text-green" />
            <div>
              <strong>Final System Evaluation Verdict: PASSED WITH HIGHEST RECOMMENDATION (98% Match)</strong>
              <span>Solution meets all technical, latency, and operational benchmarks required by {selectedProblem.ministry}.</span>
            </div>
          </div>
        )}

        {/* Step 19: Final Action Buttons Row */}
        {streamStep >= 19 && (
          <div className="report-actions-card stream-item">
            <button type="button" className="outline-button" onClick={() => { setShowReport(false); setStreamStep(0); }}>
              Edit Form & Code Submission
            </button>
            <button type="button" className="primary-button" onClick={() => setIsSubmitted(true)}>
              Submit Final Proposal to Ministry Board <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="detail-page">
        <div className="submission-success-card">
          <div className="success-icon-orb">
            <CheckCircle2 size={40} />
          </div>
          <p className="eyebrow">Proposal Submitted · Ticket #E2B-2026-984</p>
          <h2>Solution Proposal Submitted Successfully!</h2>
          <p className="success-intro">
            Your proposal for <strong>"{selectedProblem.title}"</strong> has been recorded and submitted to the{" "}
            <strong>{selectedProblem.ministry}</strong> evaluation board.
          </p>

          <div className="submission-details-box">
            <div className="detail-row">
              <span>Solution Title:</span>
              <strong>{solutionTitle || "Agritech Edge Solution"}</strong>
            </div>
            <div className="detail-row">
              <span>Solution Scope:</span>
              <strong>{solutionScope} ({q1SolutionType})</strong>
            </div>
            <div className="detail-row">
              <span>Target Ministry:</span>
              <strong>{selectedProblem.ministry}</strong>
            </div>
            <div className="detail-row">
              <span>Primary Outcome:</span>
              <strong>{q2PrimaryOutcome} ({q3ImprovementPct} Improvement)</strong>
            </div>
            <div className="detail-row">
              <span>KPI Benchmark Check:</span>
              <strong className="text-green">Passed E2B Verification (4/4 Test Cases)</strong>
            </div>
          </div>

          <button className="primary-button" onClick={() => { setIsSubmitted(false); setShowReport(false); }}>
            Submit Another Proposal <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="solution-sandbox-page">
      {/* Selected Problem Selector & Header */}
      <div className="sandbox-problem-selector">
        <div className="selector-top">
          <span className="eyebrow">Target Ministry Problem Statement</span>
          <select
            value={selectedProblem.id}
            onChange={(e) => {
              const found = problemStatements.find((p) => p.id === e.target.value);
              if (found) onSelectProblem(found);
            }}
          >
            {problemStatements.map((ps) => (
              <option key={ps.id} value={ps.id}>
                {ps.id} - {ps.title} ({ps.theme})
              </option>
            ))}
          </select>
        </div>

        <div className="selected-ps-banner">
          <div className="ps-banner-left">
            <span className={`theme-badge ${selectedProblem.themeColor}`}>{selectedProblem.theme}</span>
            <span className="ministry-title">{selectedProblem.ministry}</span>
            <h3>{selectedProblem.title}</h3>
          </div>
          <div className="ps-banner-right">
            <strong>{selectedProblem.grant.split("+")[0]}</strong>
            <small>Deadline: {selectedProblem.deadline}</small>
          </div>
        </div>
      </div>

      <form className="sandbox-form" onSubmit={handleSubmit}>
        {/* Initial Scope Classification */}
        <div className="form-section scope-selector-section">
          <div className="section-title-group">
            <Cpu size={18} className="text-saffron" />
            <h4>Initial Classification: Is your solution Software, Hardware, or Both?</h4>
          </div>
          <p className="section-desc">Select your core technology medium to customize the technical evaluation questions.</p>
          <div className="scope-pills-grid">
            <button
              type="button"
              className={`scope-pill ${solutionScope === "Software" ? "active" : ""}`}
              onClick={() => {
                setSolutionScope("Software");
                setQ1SolutionType("Software / Web Application");
              }}
            >
              <FileText size={18} />
              <div>
                <strong>Software Solution</strong>
                <small>Web App, Mobile App, Cloud API, AI Model</small>
              </div>
            </button>

            <button
              type="button"
              className={`scope-pill ${solutionScope === "Hardware" ? "active" : ""}`}
              onClick={() => {
                setSolutionScope("Hardware");
                setQ1SolutionType("Hardware / IoT");
              }}
            >
              <Cpu size={18} />
              <div>
                <strong>Hardware Solution</strong>
                <small>IoT Sensors, Microcontrollers, Physical Device</small>
              </div>
            </button>

            <button
              type="button"
              className={`scope-pill ${solutionScope === "Both" ? "active" : ""}`}
              onClick={() => {
                setSolutionScope("Both");
                setQ1SolutionType("Hardware + Software");
              }}
            >
              <Sparkles size={18} />
              <div>
                <strong>Hardware + Software (Hybrid)</strong>
                <small>Embedded Systems, Telemetry, Integrated Kit</small>
              </div>
            </button>
          </div>
        </div>

        {/* Section 1: Solution Title */}
        <div className="form-section">
          <div className="section-title-group">
            <FileText size={18} className="text-saffron" />
            <h4>Solution Title & Product Name</h4>
          </div>
          <label className="field">
            <span>
              What is the official name of your solution?<b>*</b>
            </span>
            <input
              type="text"
              placeholder="e.g. AgriVision AI Edge Crop Camera & Sensor Kit"
              value={solutionTitle}
              onChange={(e) => setSolutionTitle(e.target.value)}
              required
            />
          </label>
        </div>

        {/* Section 2: Solution Classification Type */}
        <div className="form-section">
          <div className="section-title-group">
            <FileText size={18} className="text-saffron" />
            <h4>Solution Classification Type</h4>
          </div>
          <div className="field">
            <span>
              What type of solution are you providing? <b>(MCQ — Select one)*</b>
            </span>
            <div className="mcq-options-grid">
              {q1Options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`mcq-option-pill ${q1SolutionType === opt ? "selected" : ""}`}
                  onClick={() => setQ1SolutionType(opt)}
                >
                  <span className="radio-dot" />
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Primary Outcome to Improve */}
        <div className="form-section">
          <div className="section-title-group">
            <Target size={18} className="text-saffron" />
            <h4>Primary Outcome to Improve</h4>
          </div>
          <div className="field">
            <span>
              What is the primary outcome your solution is expected to improve? <b>(MCQ — Select one)*</b>
            </span>
            <p className="field-hint">What should become better if your solution works?</p>
            <div className="mcq-options-grid">
              {q2OutcomeOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`mcq-option-pill ${q2PrimaryOutcome === opt ? "selected" : ""}`}
                  onClick={() => setQ2PrimaryOutcome(opt)}
                >
                  <span className="radio-dot" />
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Expected Outcome Details */}
        <div className="form-section">
          <div className="section-title-group">
            <FileText size={18} className="text-saffron" />
            <h4>Expected Outcome Explanation</h4>
          </div>
          <label className="field">
            <span>
              Explain the expected outcome in detail<b>*</b>
            </span>
            <textarea
              placeholder="Describe in detail what measurable improvements your solution delivers..."
              value={expectedOutcomeExplanation}
              onChange={(e) => setExpectedOutcomeExplanation(e.target.value)}
              required
            />
          </label>
        </div>

        {/* Section 5: Existing Process Improvement */}
        <div className="form-section">
          <div className="section-title-group">
            <Sparkles size={18} className="text-saffron" />
            <h4>Process & Workflow Improvement</h4>
          </div>
          <label className="field">
            <span>
              What existing process does your solution improve?<b>*</b>
            </span>
            <textarea
              placeholder="Describe the current manual or legacy process and how your solution upgrades it..."
              value={existingProcessImproved}
              onChange={(e) => setExistingProcessImproved(e.target.value)}
              required
            />
          </label>
        </div>

        {/* Section 6: Improvement Percentage */}
        <div className="form-section">
          <div className="section-title-group">
            <Target size={18} className="text-saffron" />
            <h4>Expected Improvement Percentage</h4>
          </div>
          <div className="field">
            <span>
              What improvement do you expect? <b>(MCQ — Select one)*</b>
            </span>
            <p className="field-hint">Compared with the current baseline, what improvement do you expect?</p>
            <div className="mcq-options-row">
              {q3ImprovementOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`mcq-option-pill ${q3ImprovementPct === opt ? "selected" : ""}`}
                  onClick={() => setQ3ImprovementPct(opt)}
                >
                  <span className="radio-dot" />
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 7: Target Value & Performance Direction */}
        <div className="form-section">
          <div className="section-title-group">
            <BadgeCheck size={18} className="text-saffron" />
            <h4>Target Value & Performance Direction</h4>
          </div>
          <div className="form-grid">
            <label className="field">
              <span>
                What is your target value?<b>*</b>
              </span>
              <input
                type="text"
                placeholder="e.g. 95% Accuracy, < 200ms processing time"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                required
              />
            </label>

            <div className="field">
              <span>
                Is higher or lower performance better?<b>*</b>
              </span>
              <div className="mcq-options-row">
                {["Higher performance is better", "Lower performance is better"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`mcq-option-pill ${performanceDirection === opt ? "selected" : ""}`}
                    onClick={() => setPerformanceDirection(opt)}
                  >
                    <span className="radio-dot" />
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 8: KPI Measurement Method */}
        <div className="form-section">
          <div className="section-title-group">
            <Award size={18} className="text-saffron" />
            <h4>KPI Measurement Method</h4>
          </div>
          <div className="field">
            <span>
              How will the KPI be measured? <b>(MCQ — Select one)*</b>
            </span>
            <div className="mcq-options-grid">
              {q4MeasurementOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`mcq-option-pill ${q4MeasurementMethod === opt ? "selected" : ""}`}
                  onClick={() => setQ4MeasurementMethod(opt)}
                >
                  <span className="radio-dot" />
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Technical & Specifications Section (Adaptive for Software / Hardware) */}
        <div className="form-section">
          <div className="section-title-group">
            <Building2 size={18} className="text-saffron" />
            <h4>
              Technical & {solutionScope === "Software" ? "Software" : "Hardware"} Specifications
            </h4>
          </div>

          {(solutionScope === "Software" || solutionScope === "Both") && (
            <div className="form-grid">
              <label className="field">
                <span>
                  Software Tech Stack & Programming Languages<b>*</b>
                </span>
                <input
                  type="text"
                  placeholder="e.g. Python, PyTorch, React, Node.js, PostgreSQL"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  required={solutionScope === "Software"}
                />
              </label>

              <label className="field">
                <span>
                  Software Deployment Model<b>*</b>
                </span>
                <select value={deploymentModel} onChange={(e) => setDeploymentModel(e.target.value)}>
                  <option value="Hybrid / Edge + Cloud">Hybrid / Edge + Cloud</option>
                  <option value="Cloud SaaS API">Cloud SaaS API</option>
                  <option value="Pure On-Device / Offline">Pure On-Device / Offline</option>
                  <option value="On-Premise Server">On-Premise Server</option>
                </select>
              </label>
            </div>
          )}

          {(solutionScope === "Hardware" || solutionScope === "Both") && (
            <>
              <div className="form-grid">
                <label className="field">
                  <span>
                    Microcontrollers / Processor Units<b>*</b>
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. ESP32, STM32, Raspberry Pi Compute Module 4, Jetson Nano"
                    value={microcontrollers}
                    onChange={(e) => setMicrocontrollers(e.target.value)}
                    required={solutionScope === "Hardware"}
                  />
                </label>

                <label className="field">
                  <span>
                    Power & Battery Footprint<b>*</b>
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. 5V Solar Powered, 3.7V Li-Ion 5000mAh (3-year standby)"
                    value={powerFootprint}
                    onChange={(e) => setPowerFootprint(e.target.value)}
                    required={solutionScope === "Hardware"}
                  />
                </label>
              </div>

              <label className="field">
                <span>Hardware Sensors & Physical Device Specifications<b>*</b></span>
                <textarea
                  placeholder="List telemetry sensors, camera resolution, enclosure IP rating (e.g. IP67 waterproof), operating temperature range..."
                  value={hardwareSpecs}
                  onChange={(e) => setHardwareSpecs(e.target.value)}
                  required={solutionScope === "Hardware"}
                />
              </label>
            </>
          )}
        </div>

        {/* Section 11: File Submission Section (Moved ABOVE final KPI test runner) */}
        <div className="form-section">
          <div className="section-title-group">
            <UploadCloud size={18} className="text-saffron" />
            <h4>Product Code & Artifact File Submissions</h4>
          </div>

          <div className="form-grid">
            <div className="upload-box">
              <label>{solutionScope === "Hardware" ? "Hardware CAD / PCB Schematics (.ZIP, .PDF)" : "Source Code Repository (.ZIP, Git Link)"}</label>
              {codeFile ? (
                <div className="attached-chip">
                  <CheckCircle2 size={16} className="text-green" />
                  <span>{codeFile.name} ({codeFile.size})</span>
                  <button type="button" onClick={() => setCodeFile(null)}>Remove</button>
                </div>
              ) : (
                <label className="upload-trigger">
                  <UploadCloud size={18} />
                  <span>Attach Code / Technical Artifact</span>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setCodeFile({ name: e.target.files[0].name, size: "3.2 MB" });
                      }
                    }}
                  />
                </label>
              )}
            </div>

            <div className="upload-box">
              <label>Technical Whitepaper & Pitch Deck PDF</label>
              {docFile ? (
                <div className="attached-chip">
                  <CheckCircle2 size={16} className="text-green" />
                  <span>{docFile.name} ({docFile.size})</span>
                  <button type="button" onClick={() => setDocFile(null)}>Remove</button>
                </div>
              ) : (
                <label className="upload-trigger">
                  <UploadCloud size={18} />
                  <span>Attach Proposal Document PDF</span>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setDocFile({ name: e.target.files[0].name, size: "1.8 MB" });
                      }
                    }}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Section 12 (LAST STEP): System KPI & Benchmark Verification & Automated E2B Sandbox Test Runner */}
        <div className="form-section benchmark-section final-step-card">
          <div className="section-title-group">
            <BadgeCheck size={18} className="text-saffron" />
            <h4>System KPI & Benchmark Verification (Final Step)</h4>
          </div>
          <p className="section-desc">
            The final step evaluates your solution against the target benchmarks provided by our system. Click below to run automated 3-second E2B sandbox verification.
          </p>

          <div className="benchmark-matrix">
            {selectedProblem.kpiBenchmarks.map((kpi, idx) => (
              <div key={idx} className="benchmark-row">
                <div className="kpi-info">
                  <CheckCircle2 size={16} className={testVerified ? "text-green" : "text-gray"} />
                  <span>{kpi}</span>
                </div>
                <span className={`benchmark-status ${testVerified ? "passed" : "pending"}`}>
                  {testVerified ? "✓ Passed System Benchmark" : "Pending Test Run"}
                </span>
              </div>
            ))}
          </div>

          {validationMessage && (
            <div className="sandbox-validation-message" role="alert">
              <AlertCircle size={16} />
              <span>{validationMessage}</span>
            </div>
          )}

          <div className="benchmark-actions">
            <button
              type="button"
              className={`benchmark-run-btn ${testVerified ? "verified" : ""}`}
              onClick={handleRunBenchmarkCheck}
              disabled={isTestRunning}
            >
              <Sparkles size={16} /> Check Sandbox Benchmark Result & Run E2B Test
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function MilestonesView({ startup }: { startup: Startup }) {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("All");
  const [expandedDay, setExpandedDay] = useState<string | null>("Day 3");
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoTimeSlot, setDemoTimeSlot] = useState("11:30 AM - 12:00 PM IST");
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const days = [
    {
      day: "Day 1",
      date: "22 Sep 2026",
      title: "Proposal & Solution Sandbox Submission",
      desc: "Source code repository, CAD files, and structured MCQ form ingested into E2B sandbox environment.",
      status: "completed",
      icon: CheckCircle2,
      actor: "Startup Submission System",
      subtasks: [
        "Ingested GitHub Repository & CAD Schematics",
        "Form MCQ Schema validated against target parameters",
        "Assigned Application ID: PS-2026-AGRI-01-SUB-984",
      ],
    },
    {
      day: "Day 2",
      date: "23 Sep 2026",
      title: "Automated E2B Sandbox Benchmark Verification",
      desc: "System simulated model performance: 96.2% Accuracy, 240ms Inference Speed. All 4 target KPI benchmarks passed.",
      status: "completed",
      icon: CheckCircle2,
      actor: "AI Engine E2B Sandbox Runner",
      subtasks: [
        "Spectral Model Accuracy test: 96.2% (Passed ✓)",
        "Edge Device Latency test: 240ms (Passed ✓)",
        "Offline Model Memory Footprint test: 45.2 MB (Passed ✓)",
        "AI Anomaly Score: 0.02 (Passed ✓)",
      ],
    },
    {
      day: "Day 3",
      date: "24 Sep 2026 (Today)",
      title: "Ministry Technical Committee Review & Evaluator Scoring",
      desc: "2 of 3 designated technical committee evaluators have submitted evaluation rubrics. Solution anomaly score: 0.02 (Optimal).",
      status: "in_progress",
      icon: Sparkles,
      actor: "Ministry of Agriculture Evaluator Panel",
      subtasks: [
        "Evaluator #1 Score: 96/100 (DeepTech & Hardware integration)",
        "Evaluator #2 Score: 94/100 (AI Scalability & Vernacular UI)",
        "Evaluator #3 Status: Pending Review Submission (Expected by 5:00 PM)",
      ],
    },
    {
      day: "Day 4",
      date: "25 Sep 2026",
      title: "Live Solution Demo & Interactive Q&A Presentation",
      desc: "Scheduled 30-minute virtual presentation with ministry nodal officers and technical leads.",
      status: "upcoming",
      icon: FileText,
      actor: "Ministry Nodal Officer",
      subtasks: [
        "Virtual Presentation Room Link Generated",
        "Nodal Officer: Dr. S. K. Kulkarni (Joint Director)",
        "Demo Equipment Checklist: Edge Camera Prototype + Smartphone App",
      ],
    },
    {
      day: "Day 5",
      date: "26 Sep 2026",
      title: "Procurement Contract Drafting & Final Award",
      desc: "Automated AI contract drafting and fast-track DPIIT seed grant disbursement of ₹25 Lakh.",
      status: "upcoming",
      icon: Award,
      actor: "Government Procurement Board",
      subtasks: [
        "AI Contract Drafter Engine ready to generate SLA",
        "Public Procurement EMD Waiver Certificate ready for signing",
        "Disbursement Bank Node linked for Seed Grant Release",
      ],
    },
  ];

  const filteredDays = days.filter((d) => {
    if (selectedStatusFilter === "Completed") return d.status === "completed";
    if (selectedStatusFilter === "In Progress") return d.status === "in_progress";
    if (selectedStatusFilter === "Upcoming") return d.status === "upcoming";
    return true;
  });

  return (
    <div className="milestones-page">
      {toastMsg && (
        <div className="govt-toast-banner">
          <CheckCircle2 size={16} className="text-green" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Target Application Header Card */}
      <div className="milestone-app-card">
        <div className="app-card-top">
          <span className="theme-badge green">Agriculture & Rural</span>
          <span className="ps-id-badge">PS-2026-AGRI-01</span>
          <span className="status-badge in-progress">
            <Sparkles size={13} className="spin-slow" /> Evaluation in Progress (Day 3 of 5)
          </span>
        </div>

        <h3>AI-Driven Early Crop Blight & Pest Detection for Smallholder Farmers</h3>
        <p className="ministry-sub">Ministry of Agriculture & Farmers Welfare · Applied by {startup.name}</p>

        {/* Dynamic Day-by-Day Progress Bar */}
        <div className="progress-bar-container">
          <div className="progress-labels">
            <span>Overall Evaluation Progress</span>
            <strong>60% Completed (Day 3 of 5)</strong>
          </div>
          <div className="progress-track-outer">
            <div className="progress-fill-bar" style={{ width: "60%" }} />
          </div>
        </div>

        <div className="milestone-card-actions">
          <button
            type="button"
            className="outline-button download-cert-btn"
            onClick={() => showToast("Exporting official Evaluation Audit Certificate PDF...")}
          >
            <Download size={15} /> Export Audit Report PDF
          </button>
          <button
            type="button"
            className="primary-button schedule-demo-btn"
            onClick={() => setIsDemoModalOpen(true)}
          >
            <Calendar size={15} /> Schedule Day 4 Live Demo Slot
          </button>
        </div>
      </div>

      {/* Day by Day Activity Timeline */}
      <div className="milestone-timeline-section">
        <div className="timeline-header">
          <div>
            <p className="eyebrow">Day-by-Day Sandbox Lifecycle</p>
            <h3>Evaluation Progress Timeline</h3>
            <p className="timeline-sub">
              Click any day container below to expand reviewer rubrics, evaluator logs, and sub-task verifications.
            </p>
          </div>

          {/* Timeline Status Filter Pills */}
          <div className="status-filter-pills">
            {["All", "Completed", "In Progress", "Upcoming"].map((st) => (
              <button
                key={st}
                type="button"
                className={`filter-pill ${selectedStatusFilter === st ? "active" : ""}`}
                onClick={() => setSelectedStatusFilter(st)}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="days-timeline-list">
          {filteredDays.map((item, idx) => {
            const IconComp = item.icon;
            const isExpanded = expandedDay === item.day;

            return (
              <div
                key={item.day}
                className={`day-card ${item.status} ${isExpanded ? "expanded" : ""}`}
                onClick={() => setExpandedDay(isExpanded ? null : item.day)}
              >
                <div className="day-badge-col">
                  <span className="day-tag">{item.day}</span>
                  <span className="day-date">{item.date}</span>
                </div>

                <div className="day-icon-col">
                  <div className="icon-circle">
                    <IconComp size={18} />
                  </div>
                  {idx < filteredDays.length - 1 && <div className="connector-line" />}
                </div>

                <div className="day-content-col">
                  <div className="day-header-row">
                    <h4>{item.title}</h4>
                    <span className={`state-chip ${item.status}`}>
                      {item.status === "completed"
                        ? "✓ Completed"
                        : item.status === "in_progress"
                        ? "⏳ In Progress"
                        : "📅 Upcoming"}
                    </span>
                  </div>
                  <p className="day-desc">{item.desc}</p>
                  <span className="day-actor">
                    <strong>Responsible Entity:</strong> {item.actor}
                  </span>

                  {/* Expandable Sub-Tasks List */}
                  {isExpanded && (
                    <div className="expandable-subtasks-box">
                      <span className="subtasks-title">Detailed Verification Checklist & Sub-Tasks:</span>
                      <div className="subtasks-grid">
                        {item.subtasks.map((task, tIdx) => (
                          <div key={tIdx} className="subtask-row">
                            <CheckCircle2 size={14} className="text-saffron" />
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Schedule Live Demo Slot Modal */}
      {isDemoModalOpen && (
        <div className="modal-overlay" onClick={() => setIsDemoModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <Calendar size={20} className="text-saffron" />
                <h3>Schedule Day 4 Live Demo Presentation</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsDemoModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-desc">
                Select your preferred 30-minute virtual presentation slot with the Ministry of Agriculture Technical Evaluation Panel.
              </p>
              <div className="field">
                <span>Select Virtual Time Slot (25 Sep 2026):</span>
                <select value={demoTimeSlot} onChange={(e) => setDemoTimeSlot(e.target.value)}>
                  <option value="10:00 AM - 10:30 AM IST">10:00 AM - 10:30 AM IST</option>
                  <option value="11:30 AM - 12:00 PM IST">11:30 AM - 12:00 PM IST (Recommended)</option>
                  <option value="02:30 PM - 03:00 PM IST">02:30 PM - 03:00 PM IST</option>
                  <option value="04:00 PM - 04:30 PM IST">04:00 PM - 04:30 PM IST</option>
                </select>
              </div>
              <div className="demo-info-banner">
                <InfoIcon size={16} />
                <span>
                  The virtual meeting link will be sent to <strong>{startup.email}</strong> 15 minutes before the presentation.
                </span>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="outline-button" onClick={() => setIsDemoModalOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="primary-button"
                onClick={() => {
                  setIsDemoModalOpen(false);
                  showToast(`Live Demo Slot confirmed for ${demoTimeSlot}! Confirmation email sent.`);
                }}
              >
                Confirm Demo Slot <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Evaluation Log Audit Section */}
      <div className="milestone-logs-card">
        <div className="section-title-group">
          <FileText size={18} className="text-saffron" />
          <h4>Live Evaluation Activity & System Audit Logs</h4>
        </div>
        <div className="log-entries">
          <div className="log-entry">
            <span className="log-time">24 Sep 2026, 02:45 PM</span>
            <span className="log-dot green" />
            <span>Evaluator #2 submitted technical rubric score: <strong>94/100</strong> (Category: AI & Scalability).</span>
          </div>
          <div className="log-entry">
            <span className="log-time">23 Sep 2026, 06:12 PM</span>
            <span className="log-dot green" />
            <span>E2B Sandbox Container automated benchmark test executed successfully: <strong>Passed 4/4 KPIs</strong>.</span>
          </div>
          <div className="log-entry">
            <span className="log-time">22 Sep 2026, 11:30 AM</span>
            <span className="log-dot blue" />
            <span>Solution Sandbox Application submitted by <strong>{startup.name}</strong> for PS-2026-AGRI-01.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

type Scheme = {
  id: string;
  title: string;
  policy: string;
  benefit: string;
  category: string;
  description: string;
  requiredDocs: { name: string; key: string; required: boolean }[];
  missingDocKey?: string;
  missingDocName?: string;
};

function SchemesView({ startup, searchQuery = "", onClearSearch }: { startup: Startup; searchQuery?: string; onClearSearch?: () => void }) {
  const [activeTab, setActiveTab] = useState<"All" | "Eligible" | "Action Required" | "Applied">("All");

  // Track attached documents state locally
  const [documents, setDocuments] = useState<Record<string, boolean>>({
    dpiit: true,
    education: true,
    description: true,
    patentDraft: false,
    financialProposal: false,
    incubatorLetter: false,
  });

  // Track applied schemes IDs
  const [appliedSchemeIds, setAppliedSchemeIds] = useState<string[]>([]);
  const [uploadNotice, setUploadNotice] = useState<string>("");

  const schemesData: Scheme[] = [
    {
      id: "MSINS-2025-01",
      title: "MSINS Quality Certification Reimbursement Scheme",
      policy: "Maharashtra Startup Policy 2025 (MSINS)",
      benefit: "Up to ₹2 Lakh Reimbursement (80% of certification cost)",
      category: "Reimbursement",
      description: "Reimbursement of expenses incurred for obtaining national and international quality certifications (ISO, BIS, CE, NABL) for innovative startup products.",
      requiredDocs: [
        { name: "DPIIT Recognition Certificate", key: "dpiit", required: true },
        { name: "Founder Educational Qualification", key: "education", required: true },
      ],
    },
    {
      id: "MSINS-2025-02",
      title: "Maharashtra Public Procurement EMD & Security Deposit Exemption",
      policy: "Government of Maharashtra Procurement Rules 2025",
      benefit: "100% Exemption from EMD & Prior Turnover Criteria",
      category: "Public Procurement",
      description: "Complete exemption from Earnest Money Deposit (EMD), security deposit, and prior experience/turnover requirements in government department tenders.",
      requiredDocs: [
        { name: "DPIIT Recognition Certificate", key: "dpiit", required: true },
        { name: "Startup Profile & Solution Description", key: "description", required: true },
      ],
    },
    {
      id: "MSINS-2025-03",
      title: "IPR & Patent Application Financial Assistance Grant",
      policy: "Maharashtra Startup Policy 2025 (MSINS)",
      benefit: "Up to ₹2 Lakh (Domestic Patent) & ₹5 Lakh (International Patent)",
      category: "Grant & Patent",
      description: "Financial grant assistance to cover attorney fees, government patent filing fees, and international PCT search reports for tech inventions.",
      missingDocKey: "patentDraft",
      missingDocName: "Patent Application Draft Document",
      requiredDocs: [
        { name: "DPIIT Recognition Certificate", key: "dpiit", required: true },
        { name: "Patent Application Draft Document", key: "patentDraft", required: true },
      ],
    },
    {
      id: "MSINS-2025-04",
      title: "MSINS Seed Funding & Proof of Concept (PoC) Assistance",
      policy: "Maharashtra Innovation & Entrepreneurship Board",
      benefit: "Up to ₹25 Lakh Soft Loan / Prototype Grant",
      category: "Seed Funding",
      description: "Financial support for developing prototypes, proof of concept (PoC), and commercial validation for early-stage Maharashtra startups.",
      missingDocKey: "financialProposal",
      missingDocName: "Financial Projection & Pitch Deck",
      requiredDocs: [
        { name: "DPIIT Recognition Certificate", key: "dpiit", required: true },
        { name: "Financial Projection & Pitch Deck", key: "financialProposal", required: true },
      ],
    },
    {
      id: "MSINS-2025-05",
      title: "Incubation & Acceleration Co-Working Space Rental Subsidy",
      policy: "MSINS Incubation Network 2025",
      benefit: "50% Rental Subsidy (up to ₹10,000/month per seat)",
      category: "Incubation Subsidy",
      description: "Rental assistance for operating out of state-recognized government incubators, tinkering labs, and technology parks across Maharashtra.",
      missingDocKey: "incubatorLetter",
      missingDocName: "Incubator Recommendation Letter",
      requiredDocs: [
        { name: "DPIIT Recognition Certificate", key: "dpiit", required: true },
        { name: "Incubator Recommendation Letter", key: "incubatorLetter", required: true },
      ],
    },
  ];

  const handleUploadMissingDoc = (docKey: string, docName: string) => {
    setDocuments((prev) => ({ ...prev, [docKey]: true }));
    setUploadNotice(`Document "${docName}" attached successfully! Scheme is now unlocked and eligible to apply.`);
    setTimeout(() => setUploadNotice(""), 4000);
  };

  const handleApplyScheme = (schemeId: string, schemeTitle: string) => {
    if (!appliedSchemeIds.includes(schemeId)) {
      setAppliedSchemeIds((prev) => [...prev, schemeId]);
      setUploadNotice(`Application submitted successfully for "${schemeTitle}"! Track status in Milestones.`);
      setTimeout(() => setUploadNotice(""), 4000);
    }
  };

  const checkEligibility = (scheme: Scheme) => {
    return scheme.requiredDocs.every((d) => documents[d.key]);
  };

  const filteredSchemes = schemesData.filter((scheme) => {
    const isEligible = checkEligibility(scheme);
    const isApplied = appliedSchemeIds.includes(scheme.id);
    const normalizedQuery = searchQuery.toLowerCase();
    const matchesSearch = !normalizedQuery ||
      [scheme.id, scheme.title, scheme.policy, scheme.benefit, scheme.category, scheme.description]
        .some((value) => value.toLowerCase().includes(normalizedQuery));

    if (activeTab === "Eligible") return matchesSearch && isEligible && !isApplied;
    if (activeTab === "Action Required") return matchesSearch && !isEligible;
    if (activeTab === "Applied") return matchesSearch && isApplied;
    return matchesSearch;
  });

  const clearSearch = () => onClearSearch?.();

  return (
    <div className="schemes-page">
      <div className="schemes-page-header">
        <div>
          <p className="eyebrow">Maharashtra Startup Policy 2025 (MSINS) & Central Schemes</p>
          <h2>Government Financial & Assistance Schemes</h2>
          <p className="detail-intro">
            Explore grant funding, public procurement EMD exemptions, patent assistance, and incubator subsidies tailored to {startup.name}.
          </p>
        </div>
        {searchQuery && (
          <button type="button" className="outline-button clear-search-button" onClick={clearSearch}>
            Clear search <X size={14} />
          </button>
        )}
      </div>

      {uploadNotice && (
        <div className="schemes-toast-notice">
          <CheckCircle2 size={16} className="text-green" />
          <span>{uploadNotice}</span>
        </div>
      )}

      {/* Schemes Filter Tabs */}
      <div className="schemes-tabs-row">
        <button
          type="button"
          className={`schemes-tab-btn ${activeTab === "All" ? "active" : ""}`}
          onClick={() => setActiveTab("All")}
        >
          All Schemes ({schemesData.length})
        </button>
        <button
          type="button"
          className={`schemes-tab-btn ${activeTab === "Eligible" ? "active" : ""}`}
          onClick={() => setActiveTab("Eligible")}
        >
          Eligible & Ready ({schemesData.filter((s) => checkEligibility(s) && !appliedSchemeIds.includes(s.id)).length})
        </button>
        <button
          type="button"
          className={`schemes-tab-btn ${activeTab === "Action Required" ? "active" : ""}`}
          onClick={() => setActiveTab("Action Required")}
        >
          Action Required ({schemesData.filter((s) => !checkEligibility(s)).length})
        </button>
        <button
          type="button"
          className={`schemes-tab-btn ${activeTab === "Applied" ? "active" : ""}`}
          onClick={() => setActiveTab("Applied")}
        >
          Applied ({appliedSchemeIds.length})
        </button>
      </div>

      {/* Schemes Grid */}
      <div className="schemes-grid">
        {filteredSchemes.map((scheme) => {
          const isEligible = checkEligibility(scheme);
          const isApplied = appliedSchemeIds.includes(scheme.id);

          return (
            <div
              key={scheme.id}
              className={`scheme-card ${isApplied ? "applied" : isEligible ? "eligible" : "action-required"}`}
            >
              <div className="scheme-card-header">
                <span className="policy-badge">{scheme.policy}</span>
                {isApplied ? (
                  <span className="status-badge applied">✓ Applied</span>
                ) : isEligible ? (
                  <span className="status-badge eligible">✓ Eligible to Apply</span>
                ) : (
                  <span className="status-badge action">⚠️ Missing Document</span>
                )}
              </div>

              <h3 className="scheme-title">{scheme.title}</h3>
              <div className="benefit-badge">
                <Sparkles size={15} className="text-saffron" />
                <strong>{scheme.benefit}</strong>
              </div>
              <p className="scheme-desc">{scheme.description}</p>

              {/* Required Documents Checklist */}
              <div className="doc-checklist-box">
                <span className="checklist-title">Eligibility Document Checklist:</span>
                <div className="doc-list">
                  {scheme.requiredDocs.map((doc, idx) => {
                    const isAttached = !!documents[doc.key];
                    return (
                      <div key={idx} className={`doc-item ${isAttached ? "attached" : "missing"}`}>
                        {isAttached ? (
                          <CheckCircle2 size={15} className="text-green" />
                        ) : (
                          <AlertCircle size={15} className="text-orange" />
                        )}
                        <span>{doc.name}</span>
                        <span className={`doc-status-tag ${isAttached ? "ok" : "need"}`}>
                          {isAttached ? "Attached ✓" : "Required ⚠️"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Scheme Footer & Action Button */}
              <div className="scheme-card-footer">
                {isApplied ? (
                  <button className="scheme-btn applied" disabled>
                    <CheckCircle2 size={16} /> Applied for Scheme
                  </button>
                ) : isEligible ? (
                  <button
                    type="button"
                    className="scheme-btn apply"
                    onClick={() => handleApplyScheme(scheme.id, scheme.title)}
                  >
                    Apply for Scheme <ArrowRight size={16} />
                  </button>
                ) : (
                  <label className="scheme-btn upload-trigger">
                    <UploadCloud size={16} /> Attach {scheme.missingDocName || "Missing Document"}
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={() =>
                        handleUploadMissingDoc(scheme.missingDocKey || "patentDraft", scheme.missingDocName || "Document")
                      }
                    />
                  </label>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProfileView({ startup }: { startup: Startup }) {
  const [toastMessage, setToastMessage] = useState("");
  const [isPreviewDocModalOpen, setIsPreviewDocModalOpen] = useState(false);
  const [selectedDocTitle, setSelectedDocTitle] = useState("");
  const [isPassportModalOpen, setIsPassportModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleCopyDpiit = () => {
    const dpiitVal = startup.dpiit || "DPIIT-984210";
    navigator.clipboard?.writeText(dpiitVal);
    showToast(`Copied DPIIT Recognition ID "${dpiitVal}" to clipboard!`);
  };

  const profileDetails = [
    {
      label: "Founder / Registered Representative",
      value: startup.name || "Aarav Sharma",
      icon: Users,
      badge: "Verified Founder",
      badgeColor: "green",
    },
    {
      label: "DPIIT Recognition ID",
      value: startup.dpiit || "DPIIT-984210",
      icon: BadgeCheck,
      badge: "DPIIT Certified",
      badgeColor: "saffron",
    },
    {
      label: "Registered Email Address",
      value: startup.email || "founder@agritech.in",
      icon: FileText,
      badge: "Primary Contact",
      badgeColor: "blue",
    },
    {
      label: "Date of Birth",
      value: startup.dob || "15 Aug 1995",
      icon: GraduationCap,
      badge: "ID Verified",
      badgeColor: "green",
    },
    {
      label: "Highest Educational Qualification",
      value: startup.education || "B.Tech Innovation Science",
      icon: GraduationCap,
      badge: "Degree Verified",
      badgeColor: "green",
    },
    {
      label: "Registration Date",
      value: startup.registeredAt || "22 Sep 2026",
      icon: CheckCircle2,
      badge: "Active Account",
      badgeColor: "green",
    },
    {
      label: "Entity Classification",
      value: "DPIIT Recognized Startup / Private Limited",
      icon: Building2,
      badge: "DPIIT Unit",
      badgeColor: "saffron",
    },
    {
      label: "Primary Innovation Sector",
      value: "Agritech, Artificial Intelligence & DeepTech",
      icon: Target,
      badge: "Priority Sector",
      badgeColor: "saffron",
    },
    {
      label: "Tax Compliance Clearance",
      value: "Section 80-IAC Tax Exemption Eligible",
      icon: Landmark,
      badge: "80-IAC Exempt",
      badgeColor: "green",
    },
    {
      label: "BHASKAR Innovation Network Sync",
      value: "Active & Linked with National Portal",
      icon: Sparkles,
      badge: "BHASKAR Linked",
      badgeColor: "blue",
    },
    {
      label: "Public Procurement Exemption",
      value: "100% EMD & Security Deposit Exempted",
      icon: ShieldCheck,
      badge: "EMD Waived",
      badgeColor: "green",
    },
    {
      label: "Account Verification Status",
      value: startup.status === "approved" ? "Approved & Verified by Admin Board ✓" : "Under Verification",
      icon: BadgeCheck,
      badge: startup.status === "approved" ? "Approved ✓" : "Pending",
      badgeColor: startup.status === "approved" ? "green" : "orange",
    },
    {
      label: "Password & Security Encryption",
      value: "SHA-256 Encrypted & 2FA Protected (Strong)",
      icon: ShieldCheck,
      badge: "AES-256 Bit",
      badgeColor: "blue",
    },
  ];

  return (
    <div className="profile-page">
      {toastMessage && (
        <div className="govt-toast-banner">
          <Sparkles size={16} className="text-saffron" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Header Card */}
      <div className="profile-header-card">
        <div className="profile-header-left">
          <div className="profile-avatar-large">
            {startup.name ? startup.name.slice(0, 1).toUpperCase() : "S"}
          </div>
          <div>
            <div className="profile-badges-row">
              <span className="approved-pill">
                <CheckCircle2 size={13} /> Verified DPIIT Startup
              </span>
              <button className="copy-chip-btn" onClick={handleCopyDpiit} title="Click to copy DPIIT ID">
                <Copy size={12} /> DPIIT ID: {startup.dpiit || "DPIIT-984210"}
              </button>
            </div>
            <h2>{startup.name}</h2>
            <p className="profile-subtext">
              Official DPIIT Recognized Startup Entity · Registered on {startup.registeredAt || "22 Sep 2026"}
            </p>
          </div>
        </div>
        <div className="profile-header-right">
          <button
            type="button"
            className="primary-button passport-btn"
            onClick={() => setIsPassportModalOpen(true)}
          >
            <BadgeCheck size={16} /> Digital DPIIT Passport Card
          </button>
        </div>
      </div>

      {/* Grid of Small Individual Content Cards */}
      <div className="profile-cards-section">
        <div className="section-title-group">
          <Building2 size={18} className="text-saffron" />
          <h4>Registered Startup Profile Details</h4>
        </div>

        <div className="individual-cards-grid">
          {profileDetails.map((detail, idx) => {
            const IconComp = detail.icon;
            return (
              <div key={idx} className="profile-item-card">
                <div className="item-card-icon-box">
                  <IconComp size={20} />
                </div>
                <div className="item-card-body">
                  <div className="item-card-top-row">
                    <span className="item-card-label">{detail.label}</span>
                    <span className={`item-badge ${detail.badgeColor}`}>{detail.badge}</span>
                  </div>
                  <strong className="item-card-value">{detail.value}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Attached Documents Section */}
      <div className="profile-cards-section">
        <div className="section-title-group">
          <FileCheck2 size={18} className="text-saffron" />
          <h4>Attached Educational & Recognition Certificate Documents</h4>
        </div>

        <div className="attached-docs-grid">
          <div
            className="profile-item-card doc-card clickable"
            onClick={() => {
              setSelectedDocTitle(`Educational_Certificate_${startup.name || "Founder"}.pdf`);
              setIsPreviewDocModalOpen(true);
            }}
          >
            <div className="item-card-icon-box green-box">
              <FileCheck2 size={20} />
            </div>
            <div className="item-card-body">
              <div className="item-card-top-row">
                <span className="item-card-label">Educational Certificate Document</span>
                <span className="item-badge green">Click to Preview</span>
              </div>
              <strong className="item-card-value">
                DPIIT_Certificate_{startup.name ? startup.name.split(" ")[0] : "Founder"}.pdf
              </strong>
              <small className="doc-subtext">2.1 MB · Ingested & Verified PDF Document ✓</small>
            </div>
          </div>

          <div
            className="profile-item-card doc-card clickable"
            onClick={() => {
              setSelectedDocTitle(`DPIIT_Recognition_Record_${startup.dpiit || "984210"}.pdf`);
              setIsPreviewDocModalOpen(true);
            }}
          >
            <div className="item-card-icon-box green-box">
              <BadgeCheck size={20} />
            </div>
            <div className="item-card-body">
              <div className="item-card-top-row">
                <span className="item-card-label">DPIIT Recognition Certificate</span>
                <span className="item-badge green">Click to Preview</span>
              </div>
              <strong className="item-card-value">
                DPIIT_Recognition_Record_{startup.dpiit || "984210"}.pdf
              </strong>
              <small className="doc-subtext">1.4 MB · Ingested & Verified PDF Document ✓</small>
            </div>
          </div>
        </div>
      </div>

      {/* Startup Solution Description Card */}
      <div className="profile-cards-section">
        <div className="section-title-group">
          <Sparkles size={18} className="text-saffron" />
          <h4>Startup Solution Description & Core Technology Mandate</h4>
        </div>

        <div className="profile-item-card full-width-desc-card">
          <div className="item-card-icon-box saffron-box">
            <Sparkles size={20} />
          </div>
          <div className="item-card-body">
            <span className="item-card-label">Full Solution Overview</span>
            <p className="desc-text-content">{startup.description}</p>
          </div>
        </div>
      </div>

      {/* Document Viewer Modal */}
      {isPreviewDocModalOpen && (
        <div className="modal-overlay" onClick={() => setIsPreviewDocModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <FileCheck2 size={20} className="text-saffron" />
                <h3>Verified Document Preview</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsPreviewDocModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="doc-preview-box">
                <FileText size={48} className="text-saffron" />
                <strong>{selectedDocTitle}</strong>
                <span>Official PDF Document Ingested & Digitally Signed by Government Verification Engine</span>
                <div className="seal-badge">
                  <BadgeCheck size={16} /> Verified Authentic Document
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="primary-button"
                onClick={() => {
                  setIsPreviewDocModalOpen(false);
                  showToast(`Downloaded "${selectedDocTitle}"`);
                }}
              >
                <Download size={15} /> Download PDF File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Digital DPIIT Passport Modal */}
      {isPassportModalOpen && (
        <div className="modal-overlay" onClick={() => setIsPassportModalOpen(false)}>
          <div className="modal-card passport-card-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <BadgeCheck size={20} className="text-saffron" />
                <h3>Official Startup India Digital Passport ID</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsPassportModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="digital-passport-card">
                <div className="passport-top-row">
                  <div className="gov-emblem-small">
                    <strong>GOVERNMENT OF INDIA</strong>
                    <span>DPIIT Startup Passport</span>
                  </div>
                  <span className="passport-chip">DPIIT CERTIFIED</span>
                </div>
                <div className="passport-main-body">
                  <div className="passport-avatar">{startup.name.slice(0, 1)}</div>
                  <div className="passport-details">
                    <h3>{startup.name}</h3>
                    <p className="p-id">ID: {startup.dpiit || "DPIIT-984210"}</p>
                    <p className="p-sector">Sector: Agritech & Artificial Intelligence</p>
                    <p className="p-date">Valid Thru: 2030 · Ministry Verified</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="primary-button"
                onClick={() => {
                  setIsPassportModalOpen(false);
                  showToast("Digital DPIIT Passport ID downloaded!");
                }}
              >
                <Download size={15} /> Download Passport Card PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TabContent({ tab, startup }: { tab: Tab; startup: Startup }) {
  if (tab === "Profile") return <ProfileView startup={startup} />;

  return (
    <div className="detail-page">
      <p className="eyebrow">Startup workspace</p>
      <h2>{tab}</h2>
      <div className="empty-feature">
        <div className="feature-orb">
          <Sparkles size={30} />
        </div>
        <h3>Your matched opportunities will appear here</h3>
        <p>
          This area is connected to your verified startup profile and will update as new government
          opportunities become available.
        </p>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-item">
      <span>{label}</span>
      <strong>{value || "Not provided"}</strong>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);

export default App;