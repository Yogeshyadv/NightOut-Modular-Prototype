import { createContext, useContext, useState } from 'react';

// ── Demo credential sets ───────────────────────────────────────────────────
const VENDOR_USERS = [
  {
    id: 'V001', name: 'Amit Kumar', email: 'vendor@nightout.in',
    password: 'vendor123', role: 'vendor',
    business: 'F Bar & Lounge', city: 'Jaipur', avatar: 'AK',
    joined: 'Oct 2025', plan: 'Premium',
  },
  {
    id: 'V002', name: 'Rohan Mehra', email: 'rohan@skyhosp.in',
    password: 'vendor123', role: 'vendor',
    business: 'Sky Hospitality', city: 'Delhi', avatar: 'RM',
    joined: 'Nov 2025', plan: 'Growth',
  },
];

const ADMIN_USERS = [
  {
    id: 'A001', name: 'Super Admin', email: 'admin@nightout.in',
    password: 'admin123', role: 'admin',
    avatar: 'SA', joined: 'Sep 2025',
  },
];

// ── Context ────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('nightout-user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  /* Login ------------------------------------------------------------------ */
  const login = async (email, password, role = 'vendor') => {
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800)); // simulate network

    const pool = role === 'admin' ? ADMIN_USERS : VENDOR_USERS;
    const found = pool.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (found) {
      const userData = { ...found, role };
      delete userData.password;
      setUser(userData);
      try { localStorage.setItem('nightout-user', JSON.stringify(userData)); } catch {}
      setLoading(false);
      return { success: true, user: userData };
    }

    setError('Invalid email or password. Try the demo credentials.');
    setLoading(false);
    return { success: false };
  };

  /* Register --------------------------------------------------------------- */
  const register = async (formData) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));

    const userData = {
      id: `V${Date.now()}`,
      name: formData.name,
      email: formData.email,
      business: formData.businessName || '',
      city: formData.city || '',
      role: 'vendor',
      plan: formData.plan || 'starter',
      avatar: formData.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
      joined: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
    };

    setUser(userData);
    try { localStorage.setItem('nightout-user', JSON.stringify(userData)); } catch {}
    setLoading(false);
    return { success: true, user: userData };
  };

  /* Logout ----------------------------------------------------------------- */
  const logout = () => {
    setUser(null);
    try { localStorage.removeItem('nightout-user'); } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, error, loading, login, register, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
