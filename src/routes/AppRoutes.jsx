import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Shared Pages
import HomePage from '../pages/shared/HomePage.jsx';
import LoginPage from '../pages/shared/LoginPage.jsx';

// Citizen Pages
import PostProblem from '../pages/citizen/PostProblem.jsx';
import ComplaintDetail from '../pages/citizen/ComplaintDetail.jsx';
import NearbyProblems from '../pages/citizen/NearbyProblems.jsx';

// University Pages
import UniversityDashboard from '../pages/university/UniversityDashboard.jsx';
import AllProblems from '../pages/university/AllProblems.jsx';
import ProblemDetail from '../pages/university/ProblemDetail.jsx';
import MySelectedProblems from '../pages/university/MySelectedProblems.jsx';
import ProjectWorkspace from '../pages/university/ProjectWorkspace.jsx';
import IndustryCollab from '../pages/university/IndustryCollab.jsx';

// Industry Pages
import IndustryDashboard from '../pages/industry/IndustryDashboard.jsx';
import BrowseProblems from '../pages/industry/BrowseProblems.jsx';
import ProjectDetailIndustry from '../pages/industry/ProjectDetailIndustry.jsx';
import MyRequests from '../pages/industry/MyRequests.jsx';

// Government Pages
import GovDashboard from '../pages/government/GovDashboard.jsx';
import VerificationQueue from '../pages/government/VerificationQueue.jsx';
import SystemicAlerts from '../pages/government/SystemicAlerts.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public / Shared */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Citizen Routes */}
      <Route path="/citizen/complaints" element={<PostProblem />} />
      <Route path="/citizen/complaint/:id" element={<ComplaintDetail />} />
      <Route path="/citizen/nearby" element={<NearbyProblems />} />

      {/* University Routes */}
      <Route path="/university/dashboard" element={<UniversityDashboard />} />
      <Route path="/university/all-problems" element={<AllProblems />} />
      <Route path="/university/problem/:id" element={<ProblemDetail />} />
      <Route path="/university/selected" element={<MySelectedProblems />} />
      <Route path="/university/workspace/:id" element={<ProjectWorkspace />} />
      <Route path="/university/industry-collab" element={<IndustryCollab />} />

      {/* Industry Routes */}
      <Route path="/industry/dashboard" element={<IndustryDashboard />} />
      <Route path="/industry/browse" element={<BrowseProblems />} />
      <Route path="/industry/project/:id" element={<ProjectDetailIndustry />} />
      <Route path="/industry/requests" element={<MyRequests />} />

      {/* Government Routes */}
      <Route path="/government/dashboard" element={<GovDashboard />} />
      <Route path="/government/verification" element={<VerificationQueue />} />
      <Route path="/government/systemic-alerts" element={<SystemicAlerts />} />

      {/* Catch-all Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
