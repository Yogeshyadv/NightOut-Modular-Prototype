// ─────────────────────────────────────────────────────────────────────────────
//  Login.jsx
// ─────────────────────────────────────────────────────────────────────────────
import { useState }          from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth }           from '../../context/AuthContext.jsx';
import { useTheme }          from '../../context/ThemeContext.jsx';
import { Button, Input, PasswordInput, Icon, Divider } from '../../components/ui/index.js';
import { cn }                from '../../utils/helpers.js';

// ── Shared auth shell (left panel + right form) ────────────────────────────
function AuthShell({ children, title, subtitle }) {
  const { dark, toggle } = useTheme();

  return (
    <div className="min-h-screen flex dark:bg-dark-900 bg-light-50">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative overflow-hidden dark:bg-dark-800 bg-white dark:border-r dark:border-dark-600 border-r border-light-200 flex-col items-center justify-center p-16">
        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,200,83,0.08) 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.08) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 dark:grid-bg grid-bg-light opacity-60" />
        </div>

        <div className="relative text-center max-w-sm w-full">
          <Link to="/" className="flex items-center gap-2 justify-center mb-12">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-green">
              <img src="/logo.png" alt="NightOut Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-display font-bold text-2xl dark:text-white text-dark-900">Night<span className="text-green">Out</span></span>
          </Link>

          <blockquote className="text-xl font-display font-bold leading-snug mb-5 dark:text-white text-dark-900">
            "The operating system for India's nightlife"
          </blockquote>
          <p className="text-sm dark:text-dark-100 text-dark-400 mb-10">
            200+ venues · 12 cities · 50,000+ bookings
          </p>

          <div className="grid grid-cols-3 gap-4">
            {[['50K+','Bookings'],['200+','Venues'],['4.8★','Rating']].map(([v, l]) => (
              <div key={l} className="dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-xl p-3 text-center">
                <div className="font-display font-bold text-lg text-green">{v}</div>
                <div className="text-[10px] dark:text-dark-100 text-dark-400 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="absolute top-5 right-5 w-9 h-9 rounded-xl dark:bg-dark-600 bg-light-100 flex items-center justify-center dark:text-dark-100 text-dark-400 hover:text-green transition-all"
        >
          <Icon name={dark ? 'sun' : 'moon'} size={15} />
        </button>

        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center">
              <img src="/logo.png" alt="NightOut Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-display font-bold text-lg">Night<span className="text-green">Out</span></span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">{title}</h1>
            {subtitle && <p className="text-sm dark:text-dark-100 text-dark-400">{subtitle}</p>}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

// ── LOGIN ──────────────────────────────────────────────────────────────────────
export default function Login() {
  const { login, loading, error, setError } = useAuth();
  const navigate = useNavigate();

  const [role,  setRole]  = useState('vendor');
  const [email, setEmail] = useState('');
  const [pass,  setPass]  = useState('');

  const fillDemo = (r) => {
    setRole(r);
    setEmail(r === 'admin' ? 'admin@nightout.in'  : 'vendor@nightout.in');
    setPass( r === 'admin' ? 'admin123'            : 'vendor123');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !pass) return;
    const res = await login(email, pass, role);
    if (res.success) navigate(role === 'admin' ? '/admin/dashboard' : '/vendor/dashboard');
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to your NightOut account">
      {/* Role tabs */}
      <div className="flex gap-1.5 p-1 dark:bg-dark-700 bg-light-100 dark:border-dark-500 border-light-200 border rounded-xl mb-6">
        {[['vendor','🏪 Vendor'], ['admin','⚡ Admin']].map(([r, label]) => (
          <button key={r} onClick={() => { setRole(r); setError(''); }}
            className={cn(
              'flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all',
              role === r
                ? r === 'admin' ? 'bg-purple text-white shadow-purple' : 'bg-green text-black shadow-green'
                : 'dark:text-dark-100 text-dark-400 hover:text-green',
            )}>
            {label}
          </button>
        ))}
      </div>

      {/* Demo credentials */}
      <div className="dark:bg-dark-700 bg-white dark:border-dark-500 border-light-200 border rounded-xl p-4 mb-6">
        <div className="text-xs dark:text-dark-100 text-dark-400 mb-3 font-medium">
          Demo credentials — click to fill:
        </div>
        <div className="flex gap-2">
          <button onClick={() => fillDemo('vendor')}
            className="flex-1 text-xs py-2 rounded-lg bg-green/10 border border-green/25 text-green hover:bg-green/20 transition-all font-semibold">
            Vendor Demo
          </button>
          <button onClick={() => fillDemo('admin')}
            className="flex-1 text-xs py-2 rounded-lg bg-purple/10 border border-purple/25 text-purple-light hover:bg-purple/20 transition-all font-semibold">
            Admin Demo
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          icon="mail"
          value={email}
          onChange={e => { setEmail(e.target.value); setError(''); }}
          autoComplete="email"
          required
        />
        <PasswordInput
          label="Password"
          placeholder="••••••••"
          value={pass}
          onChange={e => { setPass(e.target.value); setError(''); }}
          autoComplete="current-password"
          required
        />

        {error && (
          <div className="flex items-center gap-2 text-sm text-danger bg-danger/10 border border-danger/20 rounded-xl px-4 py-3">
            <Icon name="alert" size={14} /> {error}
          </div>
        )}

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs dark:text-dark-100 text-dark-400 hover:text-green transition-colors">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          size="lg"
          variant={role === 'admin' ? 'purple' : 'primary'}
          fullWidth
          loading={loading}
          rightIcon="arrow"
        >
          Sign In
        </Button>
      </form>

      <Divider label="or" />

      {/* Social stub */}
      <div className="flex gap-3 mb-6">
        {['🅖 Continue with Google', '🍎 Continue with Apple'].map(s => (
          <button key={s} className="flex-1 py-3 dark:bg-dark-700 bg-white dark:border-dark-500 border-light-200 border rounded-xl text-xs font-semibold dark:text-dark-100 text-dark-400 hover:dark:bg-dark-600 hover:bg-light-50 transition-all">
            {s}
          </button>
        ))}
      </div>

      <p className="text-sm dark:text-dark-100 text-dark-400 text-center">
        Don't have an account?{' '}
        <Link to="/register" className="text-green font-semibold hover:underline">Create one</Link>
      </p>
    </AuthShell>
  );
}

// Re-export AuthShell for use in Register + ForgotPassword
export { AuthShell };
