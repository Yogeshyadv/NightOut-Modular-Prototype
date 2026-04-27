// ─────────────────────────────────────────────────────────────────────────────
//  Vendor Notifications
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { PageHeader, Button, Icon } from '../../components/ui/index.js';
import { cn }                        from '../../utils/helpers.js';

const INITIAL = [
  { id:'N1', type:'booking', icon:'🎟️', title:'New booking: Rahul Sharma',          sub:'F Bar & Lounge · Stag · ₹1,629',                                  time:'2 min ago',   unread:true,  color:'#00C853' },
  { id:'N2', type:'review',  icon:'⭐',  title:'Priya M. gave you 5 stars',           sub:'"Best club in Jaipur. Rainbow badge actually means something."',   time:'1 hr ago',   unread:true,  color:'#FFD740' },
  { id:'N3', type:'alert',   icon:'⚠️', title:'Pricing not set for Friday night',   sub:"Update this weekend's pricing before Thursday 5 PM to avoid gaps.", time:'3 hr ago',   unread:false, color:'#FF6D00' },
  { id:'N4', type:'booking', icon:'🎟️', title:'Table booking: Karan Malhotra + 5',   sub:'Skybar 22 · VIP Table · ₹28,000',                                  time:'5 hr ago',   unread:false, color:'#00C853' },
  { id:'N5', type:'system',  icon:'🔔', title:'Rainbow certification renewal due',   sub:'Schedule your annual inclusivity audit within the next 28 days.',   time:'1 day ago',  unread:false, color:'#9C6FFF' },
  { id:'N6', type:'booking', icon:'🎟️', title:'No-show: Dev Kapoor',                 sub:'F Bar & Lounge · Couple · Auto-flagged at 11:30 PM',               time:'1 day ago',  unread:false, color:'#FF5252' },
  { id:'N7', type:'review',  icon:'⭐',  title:'Arjun K. left a 4-star review',       sub:'"Great vibe, the crowd level meter is super accurate."',            time:'2 days ago', unread:false, color:'#FFD740' },
  { id:'N8', type:'system',  icon:'📊', title:'Weekly summary ready',                sub:'This week: 48 bookings · ₹95K revenue · 91% check-in rate',         time:'3 days ago', unread:false, color:'#00E5FF' },
];

const TYPE_OPTIONS = ['all','booking','review','alert','system'];

export default function Notifications() {
  const [items,  setItems]  = useState(INITIAL);
  const [filter, setFilter] = useState('all');

  const visible = filter === 'all' ? items : items.filter(n => n.type === filter);
  const unreadCount = items.filter(n => n.unread).length;

  const markAllRead = () => setItems(ns => ns.map(n => ({ ...n, unread:false })));
  const dismiss     = (id) => setItems(ns => ns.filter(n => n.id !== id));
  const markRead    = (id) => setItems(ns => ns.map(n => n.id === id ? { ...n, unread:false } : n));

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
        <div className="flex items-center gap-2.5 px-4 py-3 dark:bg-dark-700 bg-white dark:border-dark-500 border-light-200 border rounded-xl text-sm font-semibold text-green">
          <span className="w-2 h-2 bg-green rounded-full animate-blink" />
          {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
        </div>
      )}

      {/* Type filter */}
      <div className="flex gap-2 flex-wrap">
        {TYPE_OPTIONS.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all',
              filter === t
                ? 'bg-green text-black shadow-green'
                : 'dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border dark:text-dark-100 text-dark-400 hover:text-green',
            )}>
            {t === 'all' ? 'All' : t}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="space-y-3">
        {visible.length === 0 && (
          <div className="dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-2xl p-12 text-center">
            <div className="text-4xl mb-3 opacity-40">🔔</div>
            <div className="text-sm font-semibold dark:text-dark-100 text-dark-400">No {filter !== 'all' ? filter : ''} notifications</div>
          </div>
        )}

        {visible.map(n => (
          <div key={n.id}
            className={cn(
              'flex items-start gap-4 p-4 dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-2xl',
              'hover:dark:border-dark-300 hover:border-light-300 transition-all group cursor-pointer',
              n.unread && 'dark:bg-dark-600/80',
            )}
            onClick={() => markRead(n.id)}>

            {/* Icon */}
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background:`${n.color}18`, border:`1px solid ${n.color}28` }}>
              {n.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold mb-0.5">{n.title}</div>
              <div className="text-xs dark:text-dark-100 text-dark-400 leading-relaxed">{n.sub}</div>
              <div className="text-[10px] dark:text-dark-200 text-dark-300 mt-1.5">{n.time}</div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {n.unread && <span className="w-2 h-2 bg-green rounded-full" />}
              <button
                onClick={e => { e.stopPropagation(); dismiss(n.id); }}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-dark-100 hover:text-danger p-1"
              >
                <Icon name="x" size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
