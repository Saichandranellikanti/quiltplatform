import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Home from "./pages/Home";
import Features from "./pages/Features";
import UseCases from "./pages/UseCases";
import HowItWorks from "./pages/HowItWorks";
import ForTeams from "./pages/ForTeams";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Auth from "./pages/Auth";
import AccessDenied from "./pages/AccessDenied";
import AdminDashboard from "./pages/AdminDashboard";
import BookingsDashboard from "./pages/BookingsDashboard";
import BillingDashboard from "./pages/BillingDashboard";
import CRMDashboard from "./pages/CRMDashboard";
import MKYAdminDashboard from "./pages/MKYAdminDashboard";
import MKYStaffDashboard from "./pages/MKYStaffDashboard";
import TenantRedirect from "./components/TenantRedirect";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TenantRedirect><Home /></TenantRedirect>} />
            <Route path="/features" element={<Features />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/for-teams" element={<ForTeams />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/bookings-dashboard" element={<BookingsDashboard />} />
            <Route path="/billing-dashboard" element={<BillingDashboard />} />
            <Route path="/crm-dashboard" element={<CRMDashboard />} />
            <Route path="/mky-admin" element={<MKYAdminDashboard />} />
            <Route path="/mky-staff" element={<MKYStaffDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
