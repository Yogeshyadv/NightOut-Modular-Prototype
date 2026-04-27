// ─────────────────────────────────────────────────────────────────────────────
//  PublicLayout.jsx  —  Navbar + Footer wrapping all public pages
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useAuth }  from '../../context/AuthContext.jsx';
import { Icon, Button } from '../ui/index.js';
import { cn } from '../../utils/helpers.js';

// ── NAV LINKS ─────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { to: '/',         label: 'Home'     },
  { to: '/features', label: 'Features' },
  { to: '/pricing',  label: 'Pricing'  },
  { to: '/about',    label: 'About'    },
  { to: '/contact',  label: 'Contact'  },
];

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar() {
  const { dark, toggle } = useTheme();
  const { user }         = useAuth();
  const location         = useLocation();
  const navigate         = useNavigate();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'dark:bg-dark-900/92 bg-white/92 backdrop-blur-xl dark:border-b dark:border-dark-600 border-b border-light-200 shadow-sm'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-green flex items-center justify-center font-display font-bold text-black text-sm shadow-green group-hover:shadow-green-lg transition-all">
            N
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            Night<span className="text-green">Out</span>
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'}
              className={({ isActive }) => cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'text-green dark:bg-green/10 bg-green/8'
                  : 'dark:text-dark-100 text-dark-400 hover:text-green dark:hover:bg-dark-600 hover:bg-light-100',
              )}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-2.5">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-xl dark:bg-dark-600 bg-light-100 dark:hover:bg-dark-500 hover:bg-light-200 dark:text-dark-100 text-dark-400 hover:text-green flex items-center justify-center transition-all"
          >
            <Icon name={dark ? 'sun' : 'moon'} size={15} />
          </button>

          {/* Auth */}
          {user ? (
            <Button size="sm" onClick={() => navigate(user.role === 'admin' ? '/admin/dashboard' : '/vendor/dashboard')} rightIcon="arrow">
              Dashboard
            </Button>
          ) : (
            <>
              <Link to="/login"
                className="hidden sm:block text-sm font-semibold dark:text-dark-100 text-dark-400 hover:text-green px-3 py-2 transition-colors">
                Sign In
              </Link>
              <Button size="sm" onClick={() => navigate('/register')} rightIcon="arrow">
                Get Started
              </Button>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden w-9 h-9 rounded-xl dark:bg-dark-600 bg-light-100 flex items-center justify-center dark:text-dark-100 text-dark-400"
          >
            <Icon name={mobileOpen ? 'x' : 'menu'} size={17} />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {mobileOpen && (
        <div className="md:hidden dark:bg-dark-800 bg-white dark:border-dark-600 border-light-200 border-t px-5 py-4 space-y-1 animate-fade-in">
          {NAV_LINKS.map(link => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'}
              className={({ isActive }) => cn(
                'flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all',
                isActive ? 'text-green bg-green/10' : 'dark:text-dark-100 text-dark-400 dark:hover:bg-dark-600 hover:bg-light-100',
              )}
            >
              {link.label}
            </NavLink>
          ))}
          {!user && (
            <div className="pt-3 border-t dark:border-dark-600 border-light-200 flex flex-col gap-2">
              <Link to="/login" className="text-sm font-semibold dark:text-dark-100 text-dark-400 px-4 py-2.5">Sign In</Link>
              <Button size="md" fullWidth onClick={() => navigate('/register')}>Get Started</Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
const FOOTER_LINKS = {
  Platform:   [{ to: '/features', l: 'Features' }, { to: '/pricing', l: 'Pricing' }, { to: '/about', l: 'About Us' }],
  Resources:  [{ to: '/help', l: 'Help Centre' }, { to: '/terms', l: 'Terms of Service' }, { to: '/privacy', l: 'Privacy Policy' }],
  Company:    [{ to: '/contact', l: 'Contact Us' }, { to: '/about', l: 'Our Story' }],
};

function Footer() {
  return (
    <footer className="dark:bg-dark-900 bg-light-50 dark:border-t dark:border-dark-700 border-t border-light-200">
      <div className="max-w-7xl mx-auto px-5 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-green flex items-center justify-center font-display font-bold text-black text-sm">N</div>
              <span className="font-display font-bold text-xl">Night<span className="text-green">Out</span></span>
            </Link>
            <p className="text-sm dark:text-dark-100 text-dark-400 leading-relaxed max-w-xs mb-6">
              India's complete nightlife operating system — discover, book, and experience the night safely.
            </p>
            <div className="flex gap-3">
              {['twitter', 'instagram', 'linkedin'].map(s => (
                <a key={s} href="#" aria-label={s}
                  className="w-9 h-9 rounded-xl dark:bg-dark-600 bg-light-100 flex items-center justify-center dark:text-dark-100 text-dark-400 hover:text-green hover:dark:bg-dark-500 transition-all">
                  <Icon name="external-link" size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <div className="label-sm dark:text-dark-100 text-dark-400 mb-4">{section}</div>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm dark:text-dark-100 text-dark-400 hover:text-green transition-colors">
                      {link.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="dark:border-t dark:border-dark-700 border-t border-light-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs dark:text-dark-100 text-dark-400">
          <span>© 2026 NightOut Technologies Pvt. Ltd. All rights reserved.</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green rounded-full animate-blink" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── LAYOUT WRAPPER ─────────────────────────────────────────────────────────────
export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col dark:bg-dark-900 bg-light-50">
      <Navbar />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
