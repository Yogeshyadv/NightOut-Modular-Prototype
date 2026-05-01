// ─────────────────────────────────────────────────────────────────────────────
//  PublicLayout.jsx  —  Navbar + Footer wrapping all public pages
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled
          ? 'py-3 dark:bg-dark-900/80 bg-white/80 backdrop-blur-xl border-b dark:border-white/5 border-black/5 shadow-sm'
          : 'py-6 bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shadow-green/20 group-hover:shadow-green/40 transition-all duration-500 group-hover:rotate-[10deg]">
            <img src="/logo.png" alt="NightOut Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-display font-black text-xl tracking-tighter dark:text-white text-dark-900">
            Night<span className="text-green">Out</span>
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-1 dark:bg-white/5 bg-black/5 backdrop-blur-md border dark:border-white/10 border-black/5 rounded-2xl p-1">
          {NAV_LINKS.map(link => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'}
              className={({ isActive }) => cn(
                'relative px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300',
                isActive
                  ? 'text-black'
                  : 'dark:text-white/60 text-dark-400 hover:dark:text-white hover:text-dark-900',
              )}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-bg"
                      className="absolute inset-0 bg-green rounded-xl shadow-lg shadow-green/20"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-10 h-10 rounded-2xl dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/5 dark:hover:bg-white/10 hover:bg-black/10 dark:text-white/60 text-dark-400 dark:hover:text-green hover:text-green flex items-center justify-center transition-all duration-300"
          >
            <Icon name={dark ? 'sun' : 'moon'} size={16} />
          </button>

          {/* Auth */}
          {user ? (
            <Button size="md" onClick={() => navigate(user.role === 'admin' ? '/admin/dashboard' : '/vendor/dashboard')} rightIcon="arrow">
              Dashboard
            </Button>
          ) : (
            <div className="flex items-center gap-1">
              <Link to="/login"
                className="hidden sm:block text-sm font-black uppercase tracking-widest dark:text-white/60 text-dark-400 dark:hover:text-white hover:text-dark-900 px-5 py-2 transition-colors">
                Login
              </Link>
              <Button size="md" onClick={() => navigate('/register')} rightIcon="arrow">
                Join
              </Button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden w-10 h-10 rounded-2xl dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/5 flex items-center justify-center dark:text-white text-dark-900"
          >
            <Icon name={mobileOpen ? 'x' : 'menu'} size={18} />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden dark:bg-dark-900 bg-white border-t dark:border-white/5 border-black/5 overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-6 space-y-2">
              {NAV_LINKS.map(link => (
                <NavLink key={link.to} to={link.to} end={link.to === '/'}
                  className={({ isActive }) => cn(
                    'flex items-center px-5 py-4 rounded-2xl text-sm font-bold transition-all',
                    isActive ? 'text-black bg-green shadow-lg shadow-green/20' : 'dark:text-white/60 text-dark-400 dark:hover:bg-white/5 hover:bg-light-100',
                  )}
                >
                  {link.label}
                </NavLink>
              ))}
              {!user && (
                <div className="pt-6 mt-4 border-t dark:border-white/5 border-black/5 flex flex-col gap-3">
                  <Link to="/login" className="text-sm font-black uppercase tracking-widest dark:text-white/60 text-dark-400 px-5 py-3">Login</Link>
                  <Button size="xl" fullWidth onClick={() => navigate('/register')}>Join Now</Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
    <footer className="dark:bg-dark-950 bg-light-50 dark:border-t dark:border-white/5 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-20">
          {/* Brand column */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center">
                <img src="/logo.png" alt="NightOut Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-black text-2xl tracking-tighter dark:text-white text-dark-900">Night<span className="text-green">Out</span></span>
            </Link>
            <p className="text-lg dark:text-dark-100 text-dark-400 leading-relaxed max-w-sm mb-10">
              India's premium nightlife operating system. Discover the elite, book the best, and experience the night safely.
            </p>
            <div className="flex gap-4">
              {['twitter', 'instagram', 'linkedin'].map(s => (
                <a key={s} href="#" aria-label={s}
                  className="w-11 h-11 rounded-2xl dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/5 flex items-center justify-center dark:text-white/40 text-dark-400 dark:hover:text-green hover:text-green dark:bg-white/10 hover:bg-black/10 transition-all duration-300">
                  <Icon name="external-link" size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] dark:text-white/30 text-dark-400/50 mb-8">{section}</div>
              <ul className="space-y-4">
                {links.map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm font-medium dark:text-dark-100 text-dark-400 hover:text-green transition-colors">
                      {link.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t dark:border-white/5 border-black/5 flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-dark-100">
          <span>© 2026 NightOut Technologies Pvt. Ltd.</span>
          <div className="flex items-center gap-3 dark:bg-white/5 bg-black/5 px-4 py-2 rounded-full border dark:border-white/10 border-black/5">
            <span className="w-1.5 h-1.5 bg-green rounded-full animate-pulse shadow-[0_0_8px_rgba(0,200,83,0.8)]" />
            <span className="dark:text-white/60 text-dark-400">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── LAYOUT WRAPPER ─────────────────────────────────────────────────────────────
export default function PublicLayout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col dark:bg-dark-900 bg-light-50 selection:bg-green selection:text-black">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
