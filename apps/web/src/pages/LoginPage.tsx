import { Link } from "react-router-dom";
import { Landmark } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gov-surface flex flex-col">
      {/* Header band */}
      <header className="bg-gov-navy">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Landmark className="h-6 w-6 text-gov-blue-accent" aria-hidden="true" />
          <span className="text-white font-bold tracking-wide text-sm">UDYAM</span>
          <span className="text-white/50 text-caption hidden sm:inline">
            Government Procurement Platform
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gov-border-light rounded-gov shadow-gov p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gov-navy/5 mb-3">
                <Landmark className="h-6 w-6 text-gov-navy" aria-hidden="true" />
              </div>
              <h1 className="text-page-title text-gov-text-primary">Sign In</h1>
              <p className="mt-1 text-body text-gov-text-secondary">
                Access the Government Procurement Portal
              </p>
            </div>

            <p className="text-center text-body text-gov-text-muted py-4 border border-dashed border-gov-border rounded-gov bg-gov-surface">
              Authentication is not implemented yet.
              <br />
              Use the links below to explore portals.
            </p>

            <nav className="mt-6 space-y-2" aria-label="Portal quick links">
              <PortalLink to="/admin" label="Admin Portal" desc="Government administration" />
              <PortalLink to="/ministry" label="Ministry Portal" desc="Problem management" />
              <PortalLink to="/evaluator" label="Evaluator Portal" desc="Review & evaluation" />
            </nav>
          </div>
          <p className="mt-4 text-center text-caption text-gov-text-muted">
            InnovateProcure &middot; Government of India
          </p>
        </div>
      </main>
    </div>
  );
}

function PortalLink({ to, label, desc }: { to: string; label: string; desc: string }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between px-4 py-3 border border-gov-border-light rounded-gov hover:bg-gov-surface transition-colors group"
    >
      <div>
        <p className="text-body font-medium text-gov-text-primary group-hover:text-gov-blue">{label}</p>
        <p className="text-caption text-gov-text-muted">{desc}</p>
      </div>
      <span className="text-gov-text-muted group-hover:text-gov-blue transition-colors" aria-hidden="true">&rarr;</span>
    </Link>
  );
}
