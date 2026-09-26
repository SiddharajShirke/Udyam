import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  FlaskConical,
  Globe2,
  Phone,
  Globe,
  Search,
  Twitter,
  Linkedin,
  ArrowUp,
  Menu,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

const governmentEmblemUrl = "https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg";
const azadiLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/e/ee/Azadi-Ka-Amrit-Mahotsav-Logo.png";

const challenges = [
  { title: "Early crop blight detection for smallholder farmers", ministry: "Ministry of Agriculture & Farmers Welfare", category: "Agriculture & Rural", status: "Open for submissions", deadline: "30 Oct 2026", tone: "green" },
  { title: "Real-time water quality telemetry for rural pipelines", ministry: "Ministry of Jal Shakti", category: "Water & Sanitation", status: "Open for submissions", deadline: "15 Nov 2026", tone: "blue" },
  { title: "Cold-chain expiry prediction for horticulture transit", ministry: "Ministry of Food Processing Industries", category: "Food & Nutrition", status: "Under evaluation", deadline: "20 Nov 2026", tone: "amber" },
];

const workflow = [
  { number: "01", icon: FileText, title: "Identify a public problem", text: "A government department defines a clear challenge, outcome, and operating context." },
  { number: "02", icon: Globe2, title: "Publish the challenge", text: "The challenge is structured and made visible to eligible innovators through Udyam." },
  { number: "03", icon: Users, title: "Receive solutions", text: "Submitted approaches are organised for transparent comparison and review." },
  { number: "04", icon: FlaskConical, title: "Evaluate in a sandbox", text: "Shortlisted solutions are tested against agreed criteria and measurable KPIs." },
  { number: "05", icon: CheckCircle2, title: "Move toward implementation", text: "The ministry reviews the evidence and proceeds with the next programme step." },
];

const roles = [
  { icon: ShieldCheck, title: "Admin", text: "Oversee registrations, platform governance, security, and audit activity.", href: "/admin", tone: "navy" },
  { icon: Building2, title: "Ministry", text: "Create public challenges, monitor participation, and review evaluation progress.", href: "/ministry", tone: "orange" },
  { icon: ClipboardCheck, title: "Evaluator", text: "Review submissions against structured criteria and record evidence-led assessments.", href: "/evaluator", tone: "blue" },
];

const NAV_LINKS = [
  { label: "About", href: "https://www.startupindia.gov.in/content/sih/en/about-startup-india-initiative.html" },
  { label: "Recognition", href: "https://www.startupindia.gov.in/content/sih/en/startupgov/dpiit-recognition.html" },
  { label: "Funding", href: "https://www.startupindia.gov.in/content/sih/en/funding.html" },
  { label: "Schemes and Policies", href: "https://www.startupindia.gov.in/content/sih/en/government-schemes.html" },
  { label: "Market Access", href: "https://www.startupindia.gov.in/content/sih/en/market-access.html" },
  { label: "Marquee Initiatives", href: "https://www.startupindia.gov.in/content/sih/en/marquee-initiatives.html" },
  { label: "Resources", href: "https://www.startupindia.gov.in/content/sih/en/resources.html" },
  { label: "Network", href: "https://www.startupindia.gov.in/content/sih/en/search.html" },
];

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-gov-text-primary selection:bg-brand-orange selection:text-white">
      <header className="relative z-40 bg-white shadow-gov-sm">
        <div className="bg-[#292929] text-white"><div className="mx-auto flex min-h-9 max-w-7xl items-center justify-between gap-4 px-4 text-[10px] sm:px-6"><div className="flex items-center gap-3"><img src={governmentEmblemUrl} alt="Government of India emblem" className="h-6 w-5 brightness-0 invert" /><span className="hidden font-semibold tracking-wide sm:inline">भारत सरकार | GOVERNMENT OF INDIA</span><span className="hidden text-white/50 lg:inline">Ministry of Commerce &amp; Industry</span></div><div className="flex items-center gap-3 text-white/70"><span className="hidden items-center gap-1 md:flex"><Phone className="h-3 w-3" />1800 115 565 (10:00 AM to 05:30 PM)</span><span className="hidden items-center gap-1 sm:flex"><Globe className="h-3 w-3" />हिंदी</span><a href="#" aria-label="Twitter" className="hover:text-brand-orange"><Twitter className="h-3 w-3" /></a><a href="#" aria-label="LinkedIn" className="hover:text-brand-orange"><Linkedin className="h-3 w-3" /></a></div></div></div>
        <div className="border-b border-gray-100 bg-white"><div className="mx-auto flex min-h-[72px] max-w-7xl items-center gap-5 px-4 sm:px-6"><Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Udyam home"><span className="font-display text-2xl font-bold leading-none text-[#162b47]">DPIIT</span><span className="border-l border-gray-200 pl-2 text-sm font-bold text-brand-orange">#startupindia</span></Link><div className="hidden h-9 w-px bg-gray-200 sm:block" /><img src={azadiLogoUrl} alt="Azadi Ka Amrit Mahotsav" className="hidden h-12 w-auto object-contain sm:block" /><div className="ml-auto flex items-center gap-4"><div className="hidden h-11 w-[310px] items-center overflow-hidden rounded border border-brand-orange shadow-sm md:flex"><input aria-label="Search" placeholder="Search here" className="h-full min-w-0 flex-1 px-3 text-sm italic text-gray-600 outline-none" /><button type="button" aria-label="Submit search" className="flex h-full w-14 items-center justify-center bg-brand-orange text-white"><Search className="h-5 w-5" /></button></div><Link to="/login" className="hidden text-sm font-semibold text-brand-orange hover:text-brand-orange-dark sm:inline">Sign In</Link><Link to="/login" className="hidden bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orange-dark sm:inline">Register</Link><button className="rounded p-1 text-[#162b47] md:hidden" onClick={() => setMobileOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={mobileOpen}>{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button></div></div></div>
        <nav className="border-b-4 border-brand-orange bg-white" aria-label="Main navigation"><div className="mx-auto flex min-h-[52px] max-w-7xl items-center justify-between gap-5 px-4 sm:px-6"><Link to="/" className="flex shrink-0 items-center gap-1.5"><span className="font-display text-2xl font-bold text-brand-orange">udyam</span><span className="font-display text-2xl font-medium text-[#24243a]">procure</span></Link><div className="hidden items-center gap-7 lg:flex">{NAV_LINKS.map((link) => <NavLink key={link.label} href={link.href}>{link.label}</NavLink>)}</div><a href="https://www.startupindia.gov.in/content/sih/en/contact-us.html" target="_blank" rel="noopener noreferrer" className="hidden text-caption text-gray-500 hover:text-brand-orange xl:inline">Help centre</a></div>{mobileOpen && <div className="border-t border-gray-100 px-4 py-3 lg:hidden">{NAV_LINKS.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="block border-b border-gray-100 py-3 text-sm font-semibold text-[#162b47] last:border-0 hover:text-brand-orange">{item.label}</a>)}<a href="https://www.startupindia.gov.in/content/sih/en/contact-us.html" target="_blank" rel="noopener noreferrer" className="block py-3 text-sm font-semibold text-gray-500 hover:text-brand-orange">Help centre</a></div>}</nav>
      </header>

      <main>
        <section id="about" className="relative overflow-hidden border-b border-gov-border-light bg-brand-cream">
          <div className="hero-network absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="absolute right-0 top-0 hidden h-full w-[34%] bg-[#f4e2d0] lg:block" aria-hidden="true"><div className="absolute inset-y-0 left-0 w-24 bg-brand-cream [clip-path:polygon(0_0,100%_0,0_100%)]" /><div className="absolute right-16 top-14 h-48 w-48 rounded-full border-[16px] border-brand-orange/15" /><p className="absolute bottom-10 right-12 font-display text-8xl font-bold text-brand-orange/15">भारत</p></div>
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
            <div className="max-w-3xl"><p className="text-caption font-bold uppercase tracking-[0.22em] text-brand-orange">PUBLIC INNOVATION · GOVERNMENT OF INDIA</p><h1 className="portal-heading mt-4 max-w-3xl font-display text-6xl font-bold leading-[0.9] text-[#162b47] sm:text-7xl lg:text-8xl">Advancing public services<br /><span className="text-brand-orange">through innovation.</span></h1><p className="mt-6 max-w-2xl text-base leading-7 text-gov-text-secondary">Udyam gives government teams a structured way to define public challenges, invite solution proposals, and review innovation through a transparent, evidence-led process.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link to="/login" className="inline-flex items-center justify-center gap-2 bg-brand-orange px-6 py-3 text-sm font-bold text-white hover:bg-brand-orange-dark">Government Login <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><a href="#challenges" className="inline-flex items-center justify-center gap-2 border border-gov-border bg-white px-6 py-3 text-sm font-bold text-gov-navy hover:border-brand-orange hover:text-brand-orange">Explore challenges <ArrowRight className="h-4 w-4" aria-hidden="true" /></a></div></div>
          </div>
        </section>

        <section id="challenges" className="border-b border-gov-border-light bg-white py-16 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionIntro eyebrow="PUBLIC CHALLENGES" title="Explore government challenge statements" text="The examples below illustrate how public challenges can be presented clearly for discovery and review." /><div className="mt-9 grid grid-cols-1 gap-5 lg:grid-cols-3">{challenges.map((challenge) => <ChallengeCard key={challenge.title} challenge={challenge} />)}</div><p className="mt-5 text-caption text-gov-text-muted">Demonstration content only. Statuses and deadlines are not live records.</p></div></section>

        <section id="how-it-works" className="bg-gov-surface py-16 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionIntro eyebrow="HOW IT WORKS" title="From public need to evaluated solution" text="Udyam gives government teams a consistent way to define, publish, assess, and advance innovation challenges." /><div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-gov-border-light bg-gov-border-light sm:grid-cols-2 lg:grid-cols-5">{workflow.map((item) => <article key={item.number} className="bg-white p-5"><div className="flex items-center justify-between"><span className="font-display text-3xl font-bold text-brand-orange">{item.number}</span><item.icon className="h-5 w-5 text-gov-blue" aria-hidden="true" /></div><h3 className="mt-8 text-xl font-bold text-[#162b47]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-gov-text-secondary">{item.text}</p></article>)}</div></div></section>

        <section id="roles" className="bg-white py-16 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionIntro eyebrow="GOVERNMENT ROLES" title="One platform, clear responsibilities" text="Each Government workspace is designed around a specific part of the public innovation process." /><div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">{roles.map((role) => <Link key={role.title} to={role.href} className="group border border-gov-border-light bg-white p-6 shadow-gov-sm transition-all hover:-translate-y-1 hover:border-brand-orange hover:shadow-gov-md"><div className={`flex h-11 w-11 items-center justify-center ${role.tone === "orange" ? "bg-brand-orange-tint text-brand-orange" : role.tone === "blue" ? "bg-gov-active-light text-gov-blue" : "bg-gov-navy/10 text-gov-navy"}`}><role.icon className="h-5 w-5" aria-hidden="true" /></div><h3 className="mt-6 text-2xl font-bold text-[#162b47]">{role.title}</h3><p className="mt-2 min-h-[72px] text-sm leading-6 text-gov-text-secondary">{role.text}</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange group-hover:gap-2">Enter workspace <ArrowRight className="h-4 w-4" aria-hidden="true" /></span></Link>)}</div></div></section>

        <section className="bg-[#162b47] py-16 text-white sm:py-20"><div className="mx-auto max-w-4xl px-4 text-center sm:px-6"><p className="text-caption font-bold uppercase tracking-[0.22em] text-brand-orange">A GOVERNMENT-FIRST WORKSPACE</p><h2 className="mt-3 font-display text-5xl font-bold leading-none sm:text-6xl">Make the next public challenge clearer.</h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">Use the Government login to enter the appropriate Udyam workspace for administration, ministry challenge management, or structured evaluation.</p><Link to="/login" className="mt-8 inline-flex items-center gap-2 bg-brand-orange px-6 py-3 text-sm font-bold text-white hover:bg-brand-orange-light">Open Government Login <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></section>
      </main>

      <footer className="bg-[#242424] text-white/75"><div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12"><div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_1.55fr_1fr] lg:gap-14"><div className="flex flex-wrap items-start gap-8"><div className="flex items-center gap-2.5"><img src={governmentEmblemUrl} alt="Government of India emblem" className="h-14 w-10 brightness-0 invert" /><div className="leading-none"><p className="font-display text-3xl font-bold text-white">DPIIT</p><p className="text-xl font-bold text-brand-orange">#startupindia</p></div></div></div><div className="flex flex-col gap-3 sm:flex-row sm:items-center"><label htmlFor="footer-email" className="sr-only">Enter your email</label><input id="footer-email" type="email" placeholder="Enter your email" className="h-12 min-w-0 flex-1 rounded border border-gray-300 bg-white px-4 text-sm text-gray-700 outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30" /><button type="button" className="h-12 shrink-0 rounded bg-brand-orange px-7 text-sm font-bold text-white hover:bg-brand-orange-light">Subscribe</button></div><div className="lg:justify-self-end"><p className="text-sm font-semibold text-white">Last Updated:</p><p className="mt-1 text-lg font-bold leading-tight text-white">25-SEP-2026 | Udyam public demo</p></div></div><div className="mt-10 grid grid-cols-1 gap-8 border-t border-white/10 pt-8 sm:grid-cols-3"><div className="text-sm leading-8"><p>Toll Free Number: 1800 115 565</p><p>Working Hrs: 10:00 am - 5:30 pm</p></div><div className="grid gap-1 text-sm leading-7 sm:justify-self-center"><a href="#about" className="hover:text-brand-orange">About Udyam</a><a href="#how-it-works" className="hover:text-brand-orange">How It Works</a><a href="#challenges" className="hover:text-brand-orange">Challenges</a><Link to="/login" className="hover:text-brand-orange">Government Login</Link></div><div className="grid gap-1 text-sm leading-7 sm:justify-self-end sm:min-w-[150px]"><a href="https://www.startupindia.gov.in/content/sih/en/disclaimer.html" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange">Disclaimer</a><a href="https://www.startupindia.gov.in/content/sih/en/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange">Privacy Policy</a><a href="https://www.startupindia.gov.in/content/sih/en/contact-us.html" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange">Contact Us</a><a href="https://www.startupindia.gov.in/content/sih/en/sitemap.html" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange">Site map</a></div></div></div><div className="relative border-t border-white/30 py-6 text-center text-lg text-white sm:text-xl"><p>Udyam Government Innovation Platform · Public demonstration environment.</p><button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="absolute bottom-3 left-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-orange bg-white text-brand-orange hover:bg-brand-orange hover:text-white"><ArrowUp className="h-5 w-5" /></button></div><div className="bg-[#171717] py-3 text-center text-caption text-white/80">© 2026 Udyam. Government Innovation Platform. All Rights Reserved.</div></footer>
    </div>
  );
}

function NavLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm font-semibold text-gray-700 transition-colors hover:text-brand-orange"
    >
      {children}
    </a>
  );
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) { return <div className="max-w-2xl"><p className="text-caption font-bold uppercase tracking-[0.22em] text-brand-orange">{eyebrow}</p><h2 className="portal-heading mt-2 font-display text-4xl font-bold leading-none text-[#162b47] sm:text-5xl">{title}</h2><p className="mt-4 text-sm leading-6 text-gov-text-secondary sm:text-base">{text}</p></div>; }

function ChallengeCard({ challenge }: { challenge: (typeof challenges)[number] }) { const tone = challenge.tone === "green" ? "text-gov-success bg-gov-success-light" : challenge.tone === "blue" ? "text-gov-blue bg-gov-active-light" : "text-gov-warning bg-gov-warning-light"; return <article className="group flex flex-col border border-gov-border-light bg-white p-5 shadow-gov-sm transition-all hover:-translate-y-1 hover:border-brand-orange hover:shadow-gov-md"><div className="flex items-start justify-between gap-3"><span className="text-caption font-bold uppercase tracking-widest text-brand-orange">{challenge.category}</span><span className={`shrink-0 px-2 py-1 text-[10px] font-bold ${tone}`}>{challenge.status}</span></div><h3 className="interactive-title mt-6 text-2xl font-bold leading-tight text-[#162b47]">{challenge.title}</h3><p className="mt-3 text-caption font-semibold uppercase tracking-wide text-gov-text-muted">{challenge.ministry}</p><div className="mt-auto flex items-end justify-between gap-3 border-t border-gov-border-light pt-5"><div><p className="text-caption uppercase tracking-wider text-gov-text-muted">Submission deadline</p><p className="mt-1 text-sm font-bold text-gov-text-primary">{challenge.deadline}</p></div><span className="text-caption font-semibold text-brand-orange">Demonstration challenge</span></div></article>; }
