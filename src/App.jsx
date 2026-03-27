import React, { useState, useEffect } from 'react';
import { T } from './theme/tokens';
import { GlobalStyles } from './theme/GlobalStyles';
import { LandingPage } from './pages/landing/LandingPage';
import { VendorDashboard } from './pages/vendor/VendorDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { TopNav } from './components/common/TopNav';

import { MobileAppHeader, BottomNav } from './components/common/MobileAppLayout';

export default function App() {
  const [role, setRole] = useState("app");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [role]);

  const appNavItems = [
    ["app", "📱", "Home"],
    ["vendor", "🏪", "Vendor"],
    ["admin", "⚡", "Admin"],
  ];

  return (
    <>
      <GlobalStyles />
      <div className="hide-mobile">
        <TopNav role={role} setRole={setRole} />
      </div>
      <div style={{ background: T.bg, color: "#fff", minHeight: "100vh", position: "relative", paddingBottom: role === "app" ? 64 : 0 }}>
        {role === "app" && <LandingPage setRole={setRole} />}
        {role === "vendor" && <VendorDashboard />}
        {role === "admin" && <AdminDashboard />}
      </div>
      {role === "app" && <BottomNav items={appNavItems} active={role} onSelect={setRole} />}
    </>
  );
}
