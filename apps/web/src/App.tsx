import { Navigate, Route, Routes } from "react-router-dom";
import { GovernmentLayout } from "./components/layout/GovernmentLayout";
import { navigationConfigs } from "./lib/navigation";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import StartupSignupPage from "./pages/StartupSignupPage";
import EvaluatorSignupPage from "./pages/EvaluatorSignupPage";
import MinistrySignupPage from "./pages/MinistrySignupPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminRegistrationsPage from "./pages/AdminRegistrationsPage";
import AdminSecurityPage from "./pages/AdminSecurityPage";
import AdminAuditLogsPage from "./pages/AdminAuditLogsPage";
import MinistryDashboardPage from "./pages/MinistryDashboardPage";
import MinistryProblemsPage from "./pages/MinistryProblemsPage";
import MinistryProblemCreatePage from "./pages/MinistryProblemCreatePage";
import MinistryProblemDetailPage from "./pages/MinistryProblemDetailPage";
import MinistrySandboxPage from "./pages/MinistrySandboxPage";
import MinistryEvaluationPage from "./pages/MinistryEvaluationPage";
import MinistryContractsPage from "./pages/MinistryContractsPage";
import EvaluatorQueuePage from "./pages/EvaluatorQueuePage";
import EvaluatorAssignedPage from "./pages/EvaluatorAssignedPage";
import EvaluatorReviewPage from "./pages/EvaluatorReviewPage";
import StartupPortalPage from "./pages/StartupPortalPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<MinistrySignupPage />} />
      {/* Signup routes */}
      <Route path="/signup/startup" element={<StartupSignupPage />} />
      <Route path="/signup/evaluator" element={<EvaluatorSignupPage />} />
      <Route path="/signup/ministry" element={<MinistrySignupPage />} />

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
        <Route path="problems/new" element={<MinistryProblemCreatePage />} />
        <Route path="problems/:id/edit" element={<MinistryProblemCreatePage />} />
        <Route path="problems/:id" element={<MinistryProblemDetailPage />} />
        <Route path="sandbox" element={<Navigate to="/ministry/sandbox/PRB-1042" replace />} />
        <Route path="sandbox/:id" element={<MinistrySandboxPage />} />
        <Route path="evaluation" element={<Navigate to="/ministry/evaluation/PRB-1042" replace />} />
        <Route path="evaluation/:id" element={<MinistryEvaluationPage />} />
        <Route path="contracts" element={<Navigate to="/ministry/contracts/PRB-1042" replace />} />
        <Route path="contracts/:id" element={<MinistryContractsPage />} />
      </Route>

      {/* Evaluator portal */}
      <Route path="/evaluator" element={<GovernmentLayout config={navigationConfigs.evaluator} />}>
        <Route index element={<EvaluatorQueuePage />} />
        <Route path="assigned" element={<EvaluatorAssignedPage />} />
        <Route path="review/:id" element={<EvaluatorReviewPage />} />
      </Route>

      {/* Startup portal — untouched */}
      <Route path="/startup" element={<StartupPortalPage />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
