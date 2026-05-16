import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // ── Initial Auth Check ───────────────────────────────────────────────────
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('nightout-token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get('/auth/me');
        if (res.data.success) {
          setUser(res.data.data);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('nightout-token');
        localStorage.removeItem('nightout-user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  /* Login ------------------------------------------------------------------ */
  const login = async (email, password) => {
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      
      if (res.data.success) {
        const { token, user: userData } = res.data;
        setUser(userData);
        localStorage.setItem('nightout-token', token);
        localStorage.setItem('nightout-user', JSON.stringify(userData));
        setLoading(false);
        return { success: true, user: userData };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid email or password.';
      setError(msg);
      setLoading(false);
      return { success: false, message: msg };
    }
  };

  /* Register --------------------------------------------------------------- */
  const register = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Backend expects: name, email, password, role
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role || 'vendor'
      };

      const res = await api.post('/auth/register', payload);

      if (res.data.success) {
        const { token, user: userData } = res.data;
        setUser(userData);
        localStorage.setItem('nightout-token', token);
        localStorage.setItem('nightout-user', JSON.stringify(userData));
        setLoading(false);
        return { success: true, user: userData };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.';
      setError(msg);
      setLoading(false);
      return { success: false, message: msg };
    }
  };

  /* Logout ----------------------------------------------------------------- */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('nightout-token');
    localStorage.removeItem('nightout-user');
  };

  /* Refresh User Profile -------------------------------------------------- */
  const refreshUser = async () => {
    try {
      const res = await api.get('/auth/me');
      if (res.data.success) {
        setUser(res.data.data);
        localStorage.setItem('nightout-user', JSON.stringify(res.data.data));
      }
    } catch (err) {
      console.error('Failed to refresh user:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, loading, login, register, logout, setError, refreshUser }}>
      {children}
    </AuthContext.Provider>

  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

