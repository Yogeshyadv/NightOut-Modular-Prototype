// ─────────────────────────────────────────────────────────────────────────────
//  DashboardLayout.jsx  —  Collapsible sidebar + top-bar for both portals
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useAuth }  from '../../context/AuthContext.jsx';
import { useNotifications } from '../../hooks/useNotifications.js';
import { Icon, Avatar, Button } from '../ui/index.js';
import { cn } from '../../utils/helpers.js';

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
          {badge > 0 && (
            <span className="bg-danger text-white text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none min-w-[18px] text-center">
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

// ── NAV ITEM (collapsed / icon-only) ─────────────────────────────────────────
function NavIconOnly({ to, icon, label, isAdmin, badge }) {
  return (
    <NavLink to={to} title={label}
      className={({ isActive }) => cn(
        'flex items-center justify-center h-10 w-10 mx-auto rounded-xl transition-all relative',
        isActive
          ? isAdmin ? 'text-purple-light bg-purple/10' : 'text-green bg-green/10'
          : 'text-dark-100 hover:text-white hover:bg-white/[0.06]',
      )}>
      <Icon name={icon} size={17} />
      {badge > 0 && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full border-2 dark:border-dark-800 border-white" />
      )}
    </NavLink>
  );
}

// ── MAIN LAYOUT ───────────────────────────────────────────────────────────────
export default function DashboardLayout({ children, role = 'vendor' }) {
  const { dark, toggle } = useTheme();
  const { user, logout, refreshUser } = useAuth();
  const { notifications, unreadCount, markAllRead, markRead } = useNotifications();
  const navigate         = useNavigate();
  const [collapsed,    setCollapsed]    = useState(false);
  const [notifOpen,    setNotifOpen]    = useState(false);

  const isAdmin  = role === 'admin';

  const VENDOR_NAV = [
    { section: 'Main',        items: [{ to: '/vendor/dashboard',      icon: 'home',         label: 'Dashboard'    }] },
    { section: 'Operations',  items: [
      { to: '/vendor/venues',    icon: 'building',     label: 'Venues'       },
      { to: '/vendor/bookings',  icon: 'calendar',     label: 'Bookings'    },
      { to: '/vendor/guests',    icon: 'users',        label: 'Guestlist'    },
      { to: '/vendor/scanner',   icon: 'qr',           label: 'QR Scanner'   },
    ]},
    { section: 'Insights',    items: [
      { to: '/vendor/analytics',     icon: 'chart',    label: 'Analytics'    },
      { to: '/vendor/wallet',        icon: 'wallet',   label: 'Wallet'       },
      { to: '/vendor/notifications', icon: 'bell',     label: 'Notifications' },
    ]},
    { section: 'Account',     items: [
      { to: '/vendor/verification',   icon: 'shield',       label: 'Verification' },
      { to: '/vendor/settings',       icon: 'settings',     label: 'Settings'     }
    ]},
  ];

  const ADMIN_NAV = [
    { section: 'Overview',    items: [
      { to: '/admin/dashboard', icon: 'home',           label: 'Dashboard'    },
      { to: '/admin/activity',  icon: 'zap',            label: 'Activity Feed' },
    ]},
    { section: 'Management',  items: [
      { to: '/admin/vendors',   icon: 'building',       label: 'Vendors'      },
      { to: '/admin/users',     icon: 'users',          label: 'Users'        },
      { to: '/admin/bookings',  icon: 'calendar',       label: 'Bookings'     },
    ]},
    { section: 'Finance',     items: [
      { to: '/admin/revenue',   icon: 'trending-up',    label: 'Revenue'      },
      { to: '/admin/payouts',   icon: 'wallet',         label: 'Payouts'      },
    ]},
    { section: 'Platform',    items: [
      { to: '/admin/moderation',icon: 'shield',         label: 'Moderation'   },
      { to: '/admin/verifications', icon: 'check',      label: 'Verifications' },
      { to: '/admin/settings',  icon: 'settings',       label: 'Settings'     },
    ]},
  ];

  const getBadge = (to) => {
    if (to.includes('notifications')) return unreadCount;
    if (isAdmin && to === '/admin/verifications') {
       return notifications.filter(n => !n.isRead && n.type === 'verification_applied').length;
    }
    if (!isAdmin && to === '/vendor/verification' && !user?.isVerified) {
       return notifications.filter(n => !n.isRead && (n.type === 'verification_approved' || n.type === 'verification_rejected')).length;
    }
    return 0;
  };

  const navItems = (isAdmin ? ADMIN_NAV : VENDOR_NAV).map(section => ({
    ...section,
    items: section.items.map(i => ({ ...i, badge: getBadge(i.to) || i.badge }))
  }));

  const accentText  = isAdmin ? 'text-purple-light' : 'text-green';
  const accentBg    = isAdmin ? 'bg-purple'          : 'bg-green';
  const accentRing  = isAdmin ? 'animate-blink bg-purple' : 'animate-blink bg-green';

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className={cn("min-h-screen flex", dark ? "dark bg-dark-900" : "bg-light-50")}>
      {/* SIDEBAR */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 border-r",
        dark ? "bg-dark-800 border-dark-400" : "bg-white border-light-200 shadow-xl",
        collapsed ? "w-20" : "w-64"
      )}>
        {/* Brand */}
        <div className="h-20 flex items-center px-6 gap-3 mb-2">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg", accentBg)}>
            <Icon name="zap" size={20} className="text-black" />
          </div>
          {!collapsed && (
            <div className="font-display font-black text-xl tracking-tight">
              Night<span className={accentText}>Out</span>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
          {navItems.map((sec, idx) => (
            <div key={idx} className="mb-6 last:mb-0">
              {!collapsed && (
                <div className="px-4 mb-2 text-[10px] font-black uppercase tracking-widest opacity-30">
                  {sec.section}
                </div>
              )}
              <div className="space-y-1">
                {sec.items.map(item => (
                  collapsed 
                    ? <NavIconOnly key={item.to} {...item} isAdmin={isAdmin} />
                    : <NavItem key={item.to} {...item} isAdmin={isAdmin} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* User / Bottom */}
        <div className="p-4 border-t dark:border-dark-400 border-light-200">
           {!collapsed ? (
             <div className="flex items-center gap-3 p-3 dark:bg-dark-700 bg-light-50 rounded-2xl border dark:border-dark-500 border-light-200">
               <Avatar name={user?.name} size={36} accent={isAdmin ? 'purple' : 'green'} />
               <div className="flex-1 min-w-0">
                 <div className="text-xs font-bold truncate">{user?.name}</div>
                 <div className="text-[10px] opacity-50 truncate capitalize">{user?.role}</div>
               </div>
               <button onClick={handleLogout} className="p-1.5 hover:text-danger transition-colors">
                 <Icon name="logout" size={16} />
               </button>
             </div>
           ) : (
             <button onClick={handleLogout} className="w-10 h-10 mx-auto flex items-center justify-center hover:text-danger transition-colors">
               <Icon name="logout" size={18} />
             </button>
           )}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        collapsed ? "ml-20" : "ml-64"
      )}>
        {/* TOP BAR */}
        <header className={cn(
          "h-20 flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-md border-b transition-all",
          dark ? "bg-dark-900/80 border-dark-400 text-white" : "bg-white/80 border-light-200 text-dark-900 shadow-sm"
        )}>
          <div className="flex items-center gap-4">
            <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:dark:bg-dark-700 hover:bg-light-100 rounded-xl transition-all">
              <Icon name="menu" size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="opacity-40">Portal</span>
              <span className="opacity-20">/</span>
              <span className="font-bold capitalize">{role}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
             {/* Notif Trigger */}
             <div className="relative">
                <button onClick={() => setNotifOpen(!notifOpen)} 
                  className="w-10 h-10 flex items-center justify-center hover:dark:bg-dark-700 hover:bg-light-100 rounded-xl transition-all relative">
                  <Icon name="bell" size={19} />
                  {unreadCount > 0 && (
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-green rounded-full shadow-glow" />
                  )}
                </button>
                
                {/* Mini Notif Dropdown */}
                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                    <div className="absolute right-0 mt-3 w-80 dark:bg-dark-700 bg-white dark:border-dark-400 border-light-200 border rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-in origin-top-right">
                       <div className="px-5 py-4 border-b dark:border-dark-400 border-light-200 flex items-center justify-between">
                         <span className="font-bold">Notifications</span>
                         {unreadCount > 0 && <span className="text-[10px] bg-green text-black px-1.5 py-0.5 rounded-full font-black">{unreadCount} New</span>}
                       </div>
                       <div className="max-h-[300px] overflow-y-auto">
                         {notifications.slice(0, 5).map(n => (
                           <div key={n._id} onClick={() => { markRead(n._id); setNotifOpen(false); navigate(isAdmin ? '/admin/verifications' : '/vendor/notifications'); }} 
                             className={cn("p-4 border-b dark:border-dark-400 border-light-200 last:border-0 hover:dark:bg-dark-600 hover:bg-light-50 cursor-pointer transition-colors", !n.isRead && "dark:bg-dark-600/50")}>
                             <div className="text-[11px] font-bold mb-0.5">{n.title}</div>
                             <div className="text-[10px] opacity-60 line-clamp-1">{n.message}</div>
                           </div>
                         ))}
                         {notifications.length === 0 && <div className="p-10 text-center text-xs opacity-40">No alerts found</div>}
                       </div>
                       <Link to={isAdmin ? '/admin/activity' : '/vendor/notifications'} onClick={() => setNotifOpen(false)}
                         className="block p-3 text-center text-[11px] font-bold dark:bg-dark-800 bg-light-100 hover:opacity-80">
                         View All Notifications
                       </Link>
                    </div>
                  </>
                )}
             </div>

             <button onClick={toggle} className="w-10 h-10 flex items-center justify-center hover:dark:bg-dark-700 hover:bg-light-100 rounded-xl transition-all">
                <Icon name={dark ? 'sun' : 'moon'} size={19} />
             </button>
             
             <div className="w-px h-6 mx-1 dark:bg-dark-400 bg-light-200" />
             
             <div className="flex items-center gap-3 pl-1">
                <div className="text-right hidden md:block">
                  <div className="text-xs font-bold">{user?.name}</div>
                  <div className="text-[10px] opacity-40 capitalize">{user?.role}</div>
                </div>
                <Avatar name={user?.name} size={38} accent={isAdmin ? 'purple' : 'green'} />
             </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto bg-transparent relative">
          {children}
        </div>
      </main>
    </div>
  );
}
