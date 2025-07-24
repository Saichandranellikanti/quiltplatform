import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import SimpleAccessDenied from "./components/SimpleAccessDenied";
import SimpleMKYAdminDashboard from "./components/SimpleMKYAdminDashboard";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div className="min-h-screen bg-background">
      <h1 className="text-2xl font-bold p-4">MKY App - Testing React</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/mky-admin" element={<SimpleMKYAdminDashboard />} />
          <Route path="/access-denied" element={<SimpleAccessDenied />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
