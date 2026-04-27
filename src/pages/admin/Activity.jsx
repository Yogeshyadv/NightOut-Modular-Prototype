// ─────────────────────────────────────────────────────────────────────────────
//  Admin Activity Feed
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { PageHeader, Icon } from '../../components/ui/index.js';
import { ACTIVITY_LOG }    from '../../data/mockData.js';
import { cn }              from '../../utils/helpers.js';

// Extend the base 8 entries with more history
const EXTENDED = [
  ...ACTIVITY_LOG,
  { type:'booking', msg:'Table booking ₹28,000: Skybar 22 — Karan Malhotra', time:'2.5 hr ago', color:'#00C853' },
  { type:'system',  msg:'System: auto-backup completed successfully',          time:'3 hr ago',   color:'#00E5FF' },
  { type:'venue',   msg:'New venue submitted for review: Apex Club Mumbai',    time:'4 hr ago',   color:'#9C6FFF' },
  { type:'user',    msg:'New user milestone: 12,847 registered users',         time:'5 hr ago',   color:'#00E5FF' },
  { type:'booking', msg:'Group booking: 8 guests at F Bar — ₹14,400',         time:'6 hr ago',   color:'#00C853' },
  { type:'vendor',  msg:'Commission payout processed: Pulse Events ₹95K',     time:'8 hr ago',   color:'#FFD740' },
  { type:'user',    msg:'User blocked for repeated no-shows: Sana Khan',       time:'9 hr ago',   color:'#FF5252' },
  { type:'booking', msg:'Weekend record: 285 bookings on Saturday',            time:'1 day ago',  color:'#00C853' },
];

const TYPE_ICON = { booking:'🎟️', vendor:'🏪', user:'👤', venue:'🏢', system:'🔧' };
const TYPE_OPTS = ['all','booking','vendor','user','venue','system'];

export default function AdminActivity() {
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? EXTENDED : EXTENDED.filter(a => a.type === filter);

  return (
    <div className="p-6 space-y-5 animate-fade-up">
      <PageHeader title="Activity Feed" subtitle="Real-time platform events" />

      {/* Live banner */}
      <div className="flex items-center gap-2.5 px-4 py-3 dark:bg-dark-700 bg-white dark:border-dark-500 border-light-200 border rounded-xl">
        <span className="w-2 h-2 bg-green rounded-full animate-blink" />
        <span className="text-sm font-semibold text-green">Live</span>
        <span className="text-sm dark:text-dark-100 text-dark-400">· updates every 30 seconds · {EXTENDED.length} events today</span>
      </div>

      {/* Type filter */}
      <div className="flex gap-2 flex-wrap">
        {TYPE_OPTS.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all',
              filter === t
                ? 'bg-purple text-white shadow-purple'
                : 'dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border dark:text-dark-100 text-dark-400 hover:text-purple-light',
            )}>
            {t === 'all' ? 'All Events' : t}
          </button>
        ))}
      </div>

      {/* Event list */}
      <div className="space-y-3">
        {visible.map((a, i) => (
          <div key={i}
            className="flex items-start gap-4 p-4 dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-2xl hover:dark:border-dark-300 hover:border-light-300 transition-all group">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background:`${a.color}18`, border:`1px solid ${a.color}28` }}>
              {TYPE_ICON[a.type] ?? '🔔'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{a.msg}</div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                  style={{ background:`${a.color}18`, color: a.color }}>
                  {a.type}
                </span>
                <span className="text-xs dark:text-dark-100 text-dark-400">{a.time}</span>
              </div>
            </div>
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5"
              style={{ background: a.color, boxShadow:`0 0 6px ${a.color}` }} />
          </div>
        ))}
      </div>
    </div>
  );
}
