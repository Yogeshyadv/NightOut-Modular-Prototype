import React, { useState, useEffect } from 'react';
import { T } from './theme/tokens';
import { GlobalStyles } from './theme/GlobalStyles';
import { LandingPage } from './pages/landing/LandingPage';
import { VendorDashboard } from './pages/vendor/VendorDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { TopNav } from './components/common/TopNav';

export default function App() {
  const [role, setRole] = useState("app");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [role]);

  return (
    <>
      <GlobalStyles />
      <TopNav role={role} setRole={setRole} />
      <div style={{ background: T.bg, color: "#fff", minHeight: "100vh", position: "relative" }}>
        {role === "app" && <LandingPage setRole={setRole} />}
        {role === "vendor" && <VendorDashboard />}
        {role === "admin" && <AdminDashboard />}
      </div>
    </>
  );
}
