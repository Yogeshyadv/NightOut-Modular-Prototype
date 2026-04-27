// ─────────────────────────────────────────────────────────────────────────────
//  App.jsx  —  FINAL COMPLETE ROUTER  (Part 5B)
//
//  Wires together ALL pages:
//    Public   → Landing, Features, Pricing, About, Contact, Help, Terms, Privacy
//    Auth     → Login, Register, ForgotPassword
//    Vendor   → Dashboard, Venues, Bookings, Guests, Analytics, Scanner,
//               Notifications, Settings
//    Admin    → Dashboard, Activity, Vendors, Users, Bookings, Revenue,
//               Moderation, Settings
//    Fallback → 404 NotFound
// ─────────────────────────────────────────────────────────────────────────────
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth }       from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider }  from './context/AuthContext.jsx';

// ── Layouts ───────────────────────────────────────────────────────────────────
import PublicLayout    from './components/layouts/PublicLayout.jsx';
import DashboardLayout from './components/layouts/DashboardLayout.jsx';

// ── Public pages ──────────────────────────────────────────────────────────────
import Landing  from './pages/public/Landing.jsx';
import Features from './pages/public/Features.jsx';
import Pricing  from './pages/public/Pricing.jsx';
import {
  About, Contact, Help, Terms, Privacy, NotFound,
} from './pages/public/OtherPages.jsx';

// ── Auth pages ────────────────────────────────────────────────────────────────
import Login          from './pages/auth/Login.jsx';
import Register       from './pages/auth/Register.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';

// ── Vendor pages ──────────────────────────────────────────────────────────────
import VDashboard     from './pages/vendor/Dashboard.jsx';
import VVenues        from './pages/vendor/Venues.jsx';
import VBookings      from './pages/vendor/Bookings.jsx';
import VGuests        from './pages/vendor/Guests.jsx';
import VAnalytics     from './pages/vendor/Analytics.jsx';
import VScanner       from './pages/vendor/Scanner.jsx';
import VNotifications from './pages/vendor/Notifications.jsx';
import VSettings      from './pages/vendor/Settings.jsx';

// ── Admin pages ───────────────────────────────────────────────────────────────
import ADashboard    from './pages/admin/Dashboard.jsx';
import AActivity     from './pages/admin/Activity.jsx';
import AVendors      from './pages/admin/Vendors.jsx';
import AUsers        from './pages/admin/Users.jsx';
import ABookings     from './pages/admin/Bookings.jsx';
import ARevenue      from './pages/admin/Revenue.jsx';
import AModeration   from './pages/admin/Moderation.jsx';
import ASettings     from './pages/admin/Settings.jsx';

// ─────────────────────────────────────────────────────────────────────────────
//  PrivateRoute  —  role-aware auth guard
//
//  Usage:
//    <Route element={<PrivateRoute />}>                  ← any logged-in user
//    <Route element={<PrivateRoute role="vendor" />}>    ← vendor only
//    <Route element={<PrivateRoute role="admin"  />}>    ← admin only
// ─────────────────────────────────────────────────────────────────────────────
function PrivateRoute({ role }) {
  const { user } = useAuth();

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Wrong role → redirect to their correct portal or home
  if (role && user.role !== role) {
    if (user.role === 'admin')  return <Navigate to="/admin/dashboard"  replace />;
    if (user.role === 'vendor') return <Navigate to="/vendor/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

// ─────────────────────────────────────────────────────────────────────────────
//  PublicOnlyRoute  —  redirect already-logged-in users away from auth pages
// ─────────────────────────────────────────────────────────────────────────────
function PublicOnlyRoute() {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/vendor/dashboard'} replace />;
  }
  return <Outlet />;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Vendor portal wrapper  —  applies DashboardLayout with role="vendor"
// ─────────────────────────────────────────────────────────────────────────────
function VendorPortal() {
  return (
    <DashboardLayout role="vendor">
      <Outlet />
    </DashboardLayout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Admin portal wrapper  —  applies DashboardLayout with role="admin"
// ─────────────────────────────────────────────────────────────────────────────
function AdminPortal() {
  return (
    <DashboardLayout role="admin">
      <Outlet />
    </DashboardLayout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Root App
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>

            {/* ══════════════════════════════════════════
                PUBLIC ROUTES  (no auth required)
            ══════════════════════════════════════════ */}
            <Route element={<PublicLayout><Outlet /></PublicLayout>}>
              <Route path="/"         element={<Landing  />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing"  element={<Pricing  />} />
              <Route path="/about"    element={<About    />} />
              <Route path="/contact"  element={<Contact  />} />
              <Route path="/help"     element={<Help     />} />
              <Route path="/terms"    element={<Terms    />} />
              <Route path="/privacy"  element={<Privacy  />} />
            </Route>

            {/* ══════════════════════════════════════════
                AUTH ROUTES  (redirect if already logged in)
            ══════════════════════════════════════════ */}
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login"           element={<Login          />} />
              <Route path="/register"        element={<Register       />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* ══════════════════════════════════════════
                VENDOR PORTAL  (role: vendor)
            ══════════════════════════════════════════ */}
            <Route element={<PrivateRoute role="vendor" />}>
              <Route element={<VendorPortal />}>
                {/* Redirect /vendor → /vendor/dashboard */}
                <Route path="/vendor"                   element={<Navigate to="/vendor/dashboard" replace />} />
                <Route path="/vendor/dashboard"         element={<VDashboard     />} />
                <Route path="/vendor/venues"            element={<VVenues        />} />
                <Route path="/vendor/bookings"          element={<VBookings      />} />
                <Route path="/vendor/guests"            element={<VGuests        />} />
                <Route path="/vendor/analytics"         element={<VAnalytics     />} />
                <Route path="/vendor/scanner"           element={<VScanner       />} />
                <Route path="/vendor/notifications"     element={<VNotifications />} />
                <Route path="/vendor/settings"          element={<VSettings      />} />
                {/* Catch unknown vendor sub-routes */}
                <Route path="/vendor/*"                 element={<Navigate to="/vendor/dashboard" replace />} />
              </Route>
            </Route>

            {/* ══════════════════════════════════════════
                ADMIN PORTAL  (role: admin)
            ══════════════════════════════════════════ */}
            <Route element={<PrivateRoute role="admin" />}>
              <Route element={<AdminPortal />}>
                {/* Redirect /admin → /admin/dashboard */}
                <Route path="/admin"                    element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/dashboard"          element={<ADashboard  />} />
                <Route path="/admin/activity"           element={<AActivity   />} />
                <Route path="/admin/vendors"            element={<AVendors    />} />
                <Route path="/admin/users"              element={<AUsers      />} />
                <Route path="/admin/bookings"           element={<ABookings   />} />
                <Route path="/admin/revenue"            element={<ARevenue    />} />
                <Route path="/admin/moderation"         element={<AModeration />} />
                <Route path="/admin/settings"           element={<ASettings   />} />
                {/* Catch unknown admin sub-routes */}
                <Route path="/admin/*"                  element={<Navigate to="/admin/dashboard" replace />} />
              </Route>
            </Route>

            {/* ══════════════════════════════════════════
                404 CATCH-ALL
            ══════════════════════════════════════════ */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
