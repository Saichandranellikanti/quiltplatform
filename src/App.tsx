import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AccessDenied from "./pages/AccessDenied";
import MKYAdminDashboard from "./pages/MKYAdminDashboard";
import MKYStaffDashboard from "./pages/MKYStaffDashboard";
import TenantGateway from "./components/TenantGateway";
import NotFound from "./pages/NotFound";

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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

export default App;
