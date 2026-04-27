// ─────────────────────────────────────────────────────────────────────────────
//  DashboardLayout.jsx  —  Collapsible sidebar + top-bar for both portals
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useAuth }  from '../../context/AuthContext.jsx';
import { Icon, Avatar, Button } from '../ui/index.js';
import { cn } from '../../utils/helpers.js';

// ── NAV CONFIG ────────────────────────────────────────────────────────────────
const VENDOR_NAV = [
  { section: 'Main',        items: [{ to: '/vendor/dashboard',      icon: 'home',         label: 'Dashboard'    }] },
  { section: 'Operations',  items: [
    { to: '/vendor/venues',    icon: 'building',     label: 'Venues'       },
    { to: '/vendor/bookings',  icon: 'calendar',     label: 'Bookings',   badge: 3 },
    { to: '/vendor/guests',    icon: 'users',        label: 'Guestlist'    },
    { to: '/vendor/scanner',   icon: 'qr',           label: 'QR Scanner'   },
  ]},
  { section: 'Insights',    items: [
    { to: '/vendor/analytics',     icon: 'chart',    label: 'Analytics'    },
    { to: '/vendor/notifications', icon: 'bell',     label: 'Notifications', badge: 2 },
  ]},
  { section: 'Account',     items: [{ to: '/vendor/settings',       icon: 'settings',     label: 'Settings'     }] },
];

const ADMIN_NAV = [
  { section: 'Overview',    items: [
    { to: '/admin/dashboard', icon: 'home',           label: 'Dashboard'    },
    { to: '/admin/activity',  icon: 'zap',            label: 'Activity Feed' },
  ]},
  { section: 'Management',  items: [
    { to: '/admin/vendors',   icon: 'building',       label: 'Vendors',     badge: 2 },
    { to: '/admin/users',     icon: 'users',          label: 'Users'        },
    { to: '/admin/bookings',  icon: 'calendar',       label: 'Bookings'     },
  ]},
  { section: 'Finance',     items: [
    { to: '/admin/revenue',   icon: 'trending-up',    label: 'Revenue'      },
  ]},
  { section: 'Platform',    items: [
    { to: '/admin/moderation',icon: 'shield',         label: 'Moderation',  badge: 1 },
    { to: '/admin/settings',  icon: 'settings',       label: 'Settings'     },
  ]},
];

// ── NAV ITEM (expanded) ───────────────────────────────────────────────────────
function NavItem({ to, icon, label, badge, isAdmin }) {
  return (
    <NavLink to={to}
      className={({ isActive }) => cn(
        'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
        isActive
          ? isAdmin
            ? 'text-purple-light bg-purple/[0.09] font-semibold border-l-2 border-purple pl-[14px]'
            : 'text-green bg-green/[0.09] font-semibold border-l-2 border-green pl-[14px]'
          : 'text-dark-100 hover:text-white hover:bg-white/[0.06]',
      )}>
      {({ isActive }) => (
        <>
          <Icon name={icon} size={15} strokeWidth={isActive ? 2.2 : 1.8} className="flex-shrink-0" />
          <span className="flex-1 truncate">{label}</span>
          {badge != null && (
            <span className="bg-danger text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

// ── NAV ITEM (collapsed / icon-only) ─────────────────────────────────────────
function NavIconOnly({ to, icon, label, isAdmin }) {
  return (
    <NavLink to={to} title={label}
      className={({ isActive }) => cn(
        'flex items-center justify-center h-10 w-10 mx-auto rounded-xl transition-all',
        isActive
          ? isAdmin ? 'text-purple-light bg-purple/10' : 'text-green bg-green/10'
          : 'text-dark-100 hover:text-white hover:bg-white/[0.06]',
      )}>
      <Icon name={icon} size={17} />
    </NavLink>
  );
}

// ── MAIN LAYOUT ───────────────────────────────────────────────────────────────
export default function DashboardLayout({ children, role = 'vendor' }) {
  const { dark, toggle } = useTheme();
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const [collapsed,    setCollapsed]    = useState(false);
  const [notifOpen,    setNotifOpen]    = useState(false);

  const isAdmin  = role === 'admin';
  const navItems = isAdmin ? ADMIN_NAV : VENDOR_NAV;

  const accentText  = isAdmin ? 'text-purple-light' : 'text-green';
  const accentBg    = isAdmin ? 'bg-purple'          : 'bg-green';
  const accentRing  = isAdmin ? 'animate-blink bg-purple' : 'animate-blink bg-green';

  const handleLogout = () => { logout(); navigate('/login'); };

  const NOTIFS = [
    { icon: '🎟️', msg: 'New booking: Rahul Sharma',      time: '2 min ago', unread: true  },
    { icon: '⭐',  msg: 'Priya M. left a 5-star review',  time: '1 hr ago',  unread: true  },
    { icon: '⚠️', msg: 'Pricing reminder for Friday',     time: '3 hr ago',  unread: false },
  ];

  return (
    <div className="flex h-screen dark:bg-dark-900 bg-light-50 overflow-hidden">

      {/* ── Sidebar ── */}
      <aside
        className={cn(
          'flex flex-col flex-shrink-0 h-full transition-all duration-300',
          'dark:bg-dark-800 bg-white dark:border-r dark:border-dark-600 border-r border-light-200',
          collapsed ? 'w-[68px]' : 'w-64',
        )}
      >
        {/* Brand */}
        <div className="h-14 flex items-center justify-between px-4 border-b dark:border-dark-600 border-light-200 flex-shrink-0">
          {!collapsed && (
            <Link to={isAdmin ? '/admin/dashboard' : '/vendor/dashboard'} className="flex items-center gap-2 overflow-hidden">
              <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center font-display font-bold text-xs flex-shrink-0', isAdmin ? 'bg-purple text-white' : 'bg-green text-black')}>
                N
              </div>
              <div className="min-w-0">
                <div className="font-display font-bold text-sm leading-tight">NightOut</div>
                <div className="text-[10px] dark:text-dark-100 text-dark-400 leading-tight">{isAdmin ? 'Admin Portal' : 'Vendor Portal'}</div>
              </div>
            </Link>
          )}
          {collapsed && (
            <div className={cn('w-7 h-7 rounded-lg mx-auto flex items-center justify-center font-display font-bold text-xs', isAdmin ? 'bg-purple text-white' : 'bg-green text-black')}>
              N
            </div>
          )}
          <button
            onClick={() => setCollapsed(c => !c)}
            className={cn(
              'text-dark-100 hover:text-white p-1.5 rounded-lg hover:bg-white/[0.06] transition-all flex-shrink-0',
              collapsed && 'mx-auto',
            )}
          >
            <Icon name={collapsed ? 'chevron-right' : 'chevron-left'} size={14} />
          </button>
        </div>

        {/* User chip */}
        {!collapsed && user && (
          <div className="px-4 py-3 border-b dark:border-dark-600 border-light-200">
            <div className="flex items-center gap-3 p-2.5 dark:bg-dark-700 bg-light-50 rounded-xl">
              <Avatar name={user.name} size={32} accent={isAdmin ? 'purple' : 'green'} />
              <div className="overflow-hidden">
                <div className="text-sm font-semibold truncate">{user.name}</div>
                <div className="text-[11px] dark:text-dark-100 text-dark-400 truncate">{user.business || user.email}</div>
              </div>
            </div>
          </div>
        )}

        {/* Nav sections */}
        <nav className="flex-1 overflow-y-auto no-scrollbar px-3 py-3 space-y-4">
          {navItems.map(section => (
            <div key={section.section}>
              {!collapsed && (
                <div className="text-[10px] font-bold uppercase tracking-[2px] dark:text-dark-100/50 text-dark-300 px-4 mb-1.5">
                  {section.section}
                </div>
              )}
              <div className="space-y-0.5">
                {section.items.map(item =>
                  collapsed
                    ? <NavIconOnly key={item.to} {...item} isAdmin={isAdmin} />
                    : <NavItem    key={item.to} {...item} isAdmin={isAdmin} />
                )}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom actions */}
        {!collapsed && (
          <div className="px-3 py-3 border-t dark:border-dark-600 border-light-200 space-y-1">
            <button
              onClick={() => navigate(isAdmin ? '/vendor/dashboard' : '/admin/dashboard')}
              className={cn(
                'w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all',
                isAdmin ? 'text-green bg-green/10 hover:bg-green/20' : 'text-purple-light bg-purple/10 hover:bg-purple/20',
              )}
            >
              <Icon name="arrow" size={13} />
              Switch to {isAdmin ? 'Vendor' : 'Admin'}
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-dark-100 hover:text-danger hover:bg-danger/5 transition-all"
            >
              <Icon name="logout" size={13} /> Logout
            </button>
          </div>
        )}
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="h-14 flex items-center justify-between px-6 dark:bg-dark-800/70 bg-white/80 backdrop-blur-xl dark:border-b dark:border-dark-600 border-b border-light-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className={cn('w-2 h-2 rounded-full', accentRing)} />
              <span className={cn('text-xs font-semibold', accentText)}>Live</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Theme */}
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-xl dark:bg-dark-700 bg-light-100 flex items-center justify-center dark:text-dark-100 text-dark-400 hover:text-green transition-all"
            >
              <Icon name={dark ? 'sun' : 'moon'} size={15} />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(o => !o)}
                className="w-9 h-9 rounded-xl dark:bg-dark-700 bg-light-100 flex items-center justify-center dark:text-dark-100 text-dark-400 hover:text-green transition-all relative"
              >
                <Icon name="bell" size={15} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 dark:border-dark-700 border-light-100" />
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-11 w-72 dark:bg-dark-700 bg-white dark:border-dark-500 border-light-200 border rounded-2xl shadow-card z-50 animate-fade-in overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b dark:border-dark-600 border-light-200">
                    <div className="text-sm font-bold">Notifications</div>
                    <button className="text-xs text-green font-semibold hover:underline">Mark all read</button>
                  </div>
                  {NOTIFS.map((n, i) => (
                    <div key={i} className={cn(
                      'flex items-start gap-3 px-4 py-3 hover:dark:bg-dark-600 hover:bg-light-50 transition-colors cursor-pointer border-b dark:border-dark-600 border-light-200 last:border-0',
                      n.unread && 'dark:bg-dark-700/60',
                    )}>
                      <span className="text-base mt-0.5 flex-shrink-0">{n.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{n.msg}</div>
                        <div className="text-[11px] dark:text-dark-100 text-dark-400 mt-0.5">{n.time}</div>
                      </div>
                      {n.unread && <span className="w-2 h-2 bg-green rounded-full mt-1.5 flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Avatar */}
            {user && (
              <Avatar name={user.name} size={32} accent={isAdmin ? 'purple' : 'green'} />
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
