import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AccessDenied from "./pages/AccessDenied";
import MKYAdminDashboard from "./pages/MKYAdminDashboard";
import MKYStaffDashboard from "./pages/MKYStaffDashboard";
import DocumentManagement from "./pages/DocumentManagement";
import DocumentFieldsConfig from "./pages/DocumentFieldsConfig";
import TenantGateway from "./components/TenantGateway";
import NotFound from "./pages/NotFound";
import Features from "./pages/Features";
import UseCases from "./pages/UseCases";
import HowItWorks from "./pages/HowItWorks";
import ForTeams from "./pages/ForTeams";
import Pricing from "./pages/Pricing";
import About from "./pages/About";

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TenantGateway />} />
            <Route path="/home" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="/mky-admin" element={<MKYAdminDashboard />} />
            <Route path="/mky-staff" element={<MKYStaffDashboard />} />
            <Route path="/document-management" element={<DocumentManagement />} />
            <Route path="/document-fields/:templateId" element={<DocumentFieldsConfig />} />
            <Route path="/features" element={<Features />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/for-teams" element={<ForTeams />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

export default App;
