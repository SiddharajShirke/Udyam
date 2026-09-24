import { Navigate, Route, Routes } from "react-router-dom";
import { GovernmentLayout } from "./components/layout/GovernmentLayout";
import { navigationConfigs } from "./lib/navigation";

// Pages
import LoginPage from "./pages/LoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminRegistrationsPage from "./pages/AdminRegistrationsPage";
import AdminSecurityPage from "./pages/AdminSecurityPage";
import AdminAuditLogsPage from "./pages/AdminAuditLogsPage";
import MinistryDashboardPage from "./pages/MinistryDashboardPage";
import MinistryProblemsPage from "./pages/MinistryProblemsPage";
import MinistrySandboxPage from "./pages/MinistrySandboxPage";
import MinistryEvaluationPage from "./pages/MinistryEvaluationPage";
import MinistryContractsPage from "./pages/MinistryContractsPage";
import EvaluatorQueuePage from "./pages/EvaluatorQueuePage";
import EvaluatorAssignedPage from "./pages/EvaluatorAssignedPage";
import StartupPortalPage from "./pages/StartupPortalPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Admin portal */}
      <Route path="/admin" element={<GovernmentLayout config={navigationConfigs.admin} />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="registrations" element={<AdminRegistrationsPage />} />
        <Route path="security" element={<AdminSecurityPage />} />
        <Route path="audit-logs" element={<AdminAuditLogsPage />} />
      </Route>

      {/* Ministry portal */}
      <Route path="/ministry" element={<GovernmentLayout config={navigationConfigs.ministry} />}>
        <Route index element={<MinistryDashboardPage />} />
        <Route path="problems" element={<MinistryProblemsPage />} />
        <Route path="sandbox" element={<MinistrySandboxPage />} />
        <Route path="evaluation" element={<MinistryEvaluationPage />} />
        <Route path="contracts" element={<MinistryContractsPage />} />
      </Route>

      {/* Evaluator portal */}
      <Route path="/evaluator" element={<GovernmentLayout config={navigationConfigs.evaluator} />}>
        <Route index element={<EvaluatorQueuePage />} />
        <Route path="assigned" element={<EvaluatorAssignedPage />} />
      </Route>

      {/* Startup portal — untouched */}
      <Route path="/startup" element={<StartupPortalPage />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
