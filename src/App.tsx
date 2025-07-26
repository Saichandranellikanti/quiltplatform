import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Header from "./components/Header";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AccessDenied from "./pages/AccessDenied";
import MKYAdminDashboard from "./pages/MKYAdminDashboard";
import MKYStaffDashboard from "./pages/MKYStaffDashboard";
import DocumentManagement from "./pages/DocumentManagement";
import DocumentFieldsConfig from "./pages/DocumentFieldsConfig";
import DocumentGenerator from "./pages/DocumentGenerator";
import TenantGateway from "./components/TenantGateway";
import NotFound from "./pages/NotFound";
import Features from "./pages/Features";
import UseCases from "./pages/UseCases";
import HowItWorks from "./pages/HowItWorks";
import ForTeams from "./pages/ForTeams";
import Pricing from "./pages/Pricing";
import About from "./pages/About";

const AppContent = () => {
  const location = useLocation();
  
  // Don't show Header on MKY dashboard routes
  const hideHeader = ['/mky-admin', '/mky-staff', '/document-management', '/auth', '/access-denied'].some(
    path => location.pathname.startsWith(path)
  ) || location.pathname.startsWith('/document-fields/') || location.pathname.startsWith('/generate-documents/');

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<TenantGateway />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/mky-admin" element={<MKYAdminDashboard />} />
        <Route path="/mky-staff" element={<MKYStaffDashboard />} />
        <Route path="/document-management" element={<DocumentManagement />} />
        <Route path="/document-fields/:templateId" element={<DocumentFieldsConfig />} />
        <Route path="/generate-documents/:bookingId" element={<DocumentGenerator />} />
        <Route path="/features" element={<Features />} />
        <Route path="/use-cases" element={<UseCases />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/for-teams" element={<ForTeams />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

export default App;
