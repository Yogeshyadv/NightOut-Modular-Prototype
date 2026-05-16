// ─────────────────────────────────────────────────────────────────────────────
//  Vendor Notifications
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { PageHeader, Button, Icon } from '../../components/ui/index.js';
import { cn }                        from '../../utils/helpers.js';
import { useNotifications } from '../../hooks/useNotifications.js';

export default function Notifications() {
  const { notifications, unreadCount, markRead, markAllRead, loading } = useNotifications();
  const [filter, setFilter] = useState('all');

  // Mark all as read when visiting the page
  useEffect(() => {
    if (notifications.length > 0) {
      markAllRead();
    }
  }, [notifications.length, markAllRead]);

  const getIcon = (type) => {
    if (type.includes('approved')) return '✅';
    if (type.includes('rejected')) return '❌';
    if (type.includes('verification')) return '🛡️';
    if (type.includes('booking')) return '🎟️';
    return '🔔';
  };

  const getColor = (type) => {
    if (type.includes('approved')) return '#00C853';
    if (type.includes('rejected')) return '#FF5252';
    if (type.includes('verification')) return '#7C4DFF';
    return '#6B6B80';
  };

  const visible = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type.toLowerCase().includes(filter.toLowerCase()));

  if (loading && notifications.length === 0) {
    return (
      <div className="p-6 space-y-6 animate-fade-up">
        <PageHeader title="Notifications" subtitle="Alerts and platform updates" />
        <div className="h-64 shimmer dark:bg-dark-600 bg-white rounded-3xl" />
      </div>
    );
  }

  const FILTER_OPTIONS = ['all', 'verification', 'booking'];

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <PageHeader
        title="Notifications"
        subtitle="Alerts and platform updates"
        action={
          unreadCount > 0 && (
            <Button size="sm" variant="ghost-dark" onClick={markAllRead}>
              Mark all read
            </Button>
          )
        }
      />

      {/* Unread banner */}
      {unreadCount > 0 && (
        <div className="flex items-center gap-2.5 px-4 py-3 dark:bg-dark-700 bg-white dark:border-dark-500 border-light-200 border rounded-xl text-sm font-semibold text-green shadow-sm">
          <span className="w-2.5 h-2.5 bg-green rounded-full animate-blink" />
          {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
        </div>
      )}

      {/* Type filter */}
      <div className="flex gap-2 flex-wrap">
        {FILTER_OPTIONS.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all duration-200',
              filter === t
                ? 'bg-green text-black shadow-lg shadow-green/20'
                : 'dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border dark:text-dark-100 text-dark-400 hover:text-green',
            )}>
            {t === 'all' ? 'All' : t}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="space-y-3">
        {visible.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-4xl mb-4 opacity-30">🔔</div>
            <div className="text-sm font-bold dark:text-dark-100 text-dark-400">No {filter !== 'all' ? filter : ''} notifications found</div>
            <div className="text-xs opacity-50 mt-1 text-dark-300">We'll alert you here when something happens.</div>
          </Card>
        )}

        {visible.map(n => (
          <div key={n._id}
            className={cn(
              'flex items-start gap-4 p-4 dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-2xl',
              'hover:dark:border-dark-300 hover:border-light-300 transition-all group cursor-pointer relative overflow-hidden',
              !n.isRead && 'dark:bg-dark-500 bg-light-50',
            )}
            onClick={() => markRead(n._id)}>
            
            {!n.isRead && (
              <div className="absolute top-0 left-0 w-1 h-full bg-green" />
            )}

            {/* Icon */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-inner"
              style={{ background:`${getColor(n.type)}12`, border:`1px solid ${getColor(n.type)}22` }}>
              {getIcon(n.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-bold dark:text-white text-dark-900 truncate pr-4">{n.title}</div>
                <div className="text-[10px] dark:text-dark-400 text-dark-300 whitespace-nowrap">{new Date(n.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="text-xs dark:text-dark-100 text-dark-400 leading-relaxed line-clamp-2">{n.message}</div>
            </div>

            {/* Unread indicator */}
            <div className="flex items-center flex-shrink-0 self-center">
              {!n.isRead && <span className="w-2.5 h-2.5 bg-green rounded-full shadow-glow" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Internal Card fallback to avoid import issues if not in index
const Card = ({ children, className = '' }) => (
  <div className={cn("dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-2xl", className)}>
    {children}
  </div>
);
