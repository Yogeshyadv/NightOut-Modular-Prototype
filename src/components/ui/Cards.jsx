// ─────────────────────────────────────────────────────────────────────────────
//  Cards.jsx  — Card, StatCard, VenueCard, InfoRow, ProgressBar, EmptyState, Skeleton
// ─────────────────────────────────────────────────────────────────────────────
import { cn } from '../../utils/helpers.js';
import Icon from './Icon.jsx';

/* ── Base Card ───────────────────────────────────────────────────────────── */
export function Card({
  children,
  className = '',
  title,
  subtitle,
  action,
  noPad = false,
  onClick,
  hover = false,
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'dark:bg-dark-600 bg-white',
        'dark:border-dark-400 border-light-200 border',
        'rounded-2xl overflow-hidden',
        'transition-all duration-200',
        hover && 'hover:dark:border-dark-300 hover:border-light-300 hover:shadow-card cursor-pointer',
        onClick && 'cursor-pointer hover:dark:border-dark-300 hover:border-light-300',
        className,
      )}
    >
      {(title || action) && (
        <div className="flex items-center justify-between px-5 py-4 border-b dark:border-dark-400 border-light-200">
          <div>
            {title    && <div className="font-display text-sm font-bold">{title}</div>}
            {subtitle && <div className="text-xs text-dark-100 mt-0.5">{subtitle}</div>}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      <div className={noPad ? '' : 'p-5'}>
        {children}
      </div>
    </div>
  );
}

/* ── Stat / KPI Card ─────────────────────────────────────────────────────── */
const ACCENT_CFG = {
  green:  { bar: 'bg-green',   icon: 'bg-green/10  border-green/20  text-green',        ring: 'hover:border-green/30'  },
  purple: { bar: 'bg-purple',  icon: 'bg-purple/10 border-purple/20 text-purple-light', ring: 'hover:border-purple/30' },
  gold:   { bar: 'bg-gold',    icon: 'bg-gold/10   border-gold/20   text-gold',         ring: 'hover:border-gold/30'   },
  danger: { bar: 'bg-danger',  icon: 'bg-danger/10 border-danger/20 text-danger',       ring: 'hover:border-danger/30' },
  info:   { bar: 'bg-info',    icon: 'bg-info/10   border-info/20   text-info',         ring: 'hover:border-info/30'   },
  warn:   { bar: 'bg-warn',    icon: 'bg-warn/10   border-warn/20   text-warn',         ring: 'hover:border-warn/30'   },
};

export function StatCard({
  icon,        // Icon name string OR emoji string
  label,
  value,
  change,
  changeUp = true,
  accent = 'green',
  onClick,
  className = '',
}) {
  const a = ACCENT_CFG[accent] ?? ACCENT_CFG.green;
  const isEmoji = icon && (icon.length <= 2 || /\p{Emoji}/u.test(icon));

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative overflow-hidden',
        'dark:bg-dark-600 bg-white',
        'dark:border-dark-400 border-light-200 border rounded-2xl p-5',
        'transition-all duration-200',
        a.ring,
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {/* accent bottom bar */}
      <div className={cn('absolute bottom-0 left-0 right-0 h-0.5', a.bar)} />

      <div className="flex items-start justify-between mb-3">
        <div className={cn('w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0', a.icon)}>
          {isEmoji
            ? <span className="text-xl">{icon}</span>
            : <Icon name={icon} size={18} />
          }
        </div>
        {change && (
          <span className={cn('text-xs font-bold flex items-center gap-0.5', changeUp ? 'text-green' : 'text-danger')}>
            {changeUp ? '↑' : '↓'} {change}
          </span>
        )}
      </div>

      <div className="label-xs text-dark-100 mb-1.5">{label}</div>
      <div className="font-display text-2xl font-bold">{value}</div>
    </div>
  );
}

/* ── Venue Card ──────────────────────────────────────────────────────────── */
export function VenueCard({ venue, onEdit, onDelete, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border',
        'rounded-3xl overflow-hidden',
        'hover:dark:border-dark-300 hover:border-light-300 hover:-translate-y-1',
        'transition-all duration-200',
        onClick && 'cursor-pointer',
      )}
    >
      {/* Banner */}
      <div
        className="h-40 flex items-center justify-center text-5xl relative"
        style={{ 
          background: !venue.images?.[0] 
            ? `linear-gradient(135deg, ${venue.gradientFrom ?? '#0d001a'}, ${venue.gradientTo ?? '#1e0035'})` 
            : 'none'
        }}
      >
        {venue.images?.[0] ? (
          <img 
            src={venue.images[0]} 
            alt={venue.name} 
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <span className="relative z-10">{venue.emoji || '🏢'}</span>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        
        {venue.status && (
          <div className="absolute top-3 right-3 z-10">
            <StatusPill status={venue.status} />
          </div>
        )}
        
        <div className="absolute bottom-3 left-4 right-4 z-10">
          <div className="text-white text-sm font-bold truncate drop-shadow-md">{venue.name}</div>
          <div className="text-white/80 text-[10px] uppercase tracking-wider font-semibold drop-shadow-sm">{venue.location}</div>
        </div>
      </div>


      {/* Body */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gold font-bold">⭐ {venue.rating}</span>
            <span className="text-dark-100">({venue.reviews ?? 0})</span>
          </div>
          <div className="text-xs text-dark-100">{(venue.bookings ?? 0).toLocaleString()} bookings</div>
        </div>

        {venue.genre?.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mb-3">
            {venue.genre.slice(0, 2).map(g => (
              <span key={g} className="text-[10px] px-2 py-0.5 rounded-lg dark:bg-dark-500 bg-light-100 dark:border-dark-300 border-light-200 border dark:text-dark-100 text-dark-400">
                {g}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t dark:border-dark-400 border-light-200">
          <div>
            <div className="text-[10px] text-dark-100">Monthly Revenue</div>
            <div className="text-sm font-bold text-green">
              {venue.monthlyRevenue
                ? `₹${(venue.monthlyRevenue / 100000).toFixed(1)}L`
                : '—'
              }
            </div>
          </div>

          {(onEdit || onDelete) && (
            <div className="flex gap-2" onClick={e => e.stopPropagation()}>
              {onEdit && (
                <button
                  onClick={() => onEdit(venue)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl dark:bg-dark-500 bg-light-100 dark:border-dark-400 border-light-200 border hover:dark:border-green/40 hover:text-green transition-all"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(venue)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-danger/10 border border-danger/20 text-danger hover:bg-danger/20 transition-all"
                >
                  Delete
                </button>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Info Row ────────────────────────────────────────────────────────────── */
export function InfoRow({ label, value, valueClassName = '' }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b dark:border-dark-400 border-light-200 last:border-0">
      <span className="text-sm dark:text-dark-100 text-dark-400">{label}</span>
      <span className={cn('text-sm font-semibold', valueClassName)}>{value ?? '—'}</span>
    </div>
  );
}

/* ── Status Pill ─────────────────────────────────────────────────────────── */
const PILL_CLS = {
  'Active':     'pill-green',
  'Confirmed':  'pill-purple',
  'Checked In': 'pill-green',
  'Pending':    'pill-gold',
  'No-Show':    'pill-danger',
  'Cancelled':  'pill-muted',
  'Blocked':    'pill-danger',
  'Flagged':    'pill-warn',
  'Rejected':   'pill-danger',
  'Approved':   'pill-green',
};
const DOT_CLS = {
  'Active': 'bg-green', 'Confirmed': 'bg-purple', 'Checked In': 'bg-green',
  'Pending': 'bg-gold', 'No-Show': 'bg-danger', 'Cancelled': 'bg-dark-100',
  'Blocked': 'bg-danger', 'Flagged': 'bg-warn', 'Rejected': 'bg-danger', 'Approved': 'bg-green',
};
export function StatusPill({ status, className = '' }) {
  return (
    <span className={cn('pill', PILL_CLS[status] ?? 'pill-muted', className)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', DOT_CLS[status] ?? 'bg-dark-100')} />
      {status}
    </span>
  );
}

/* ── Progress Bar ────────────────────────────────────────────────────────── */
const BAR_COLOR = {
  green:  'bg-green',
  purple: 'bg-purple',
  gold:   'bg-gold',
  danger: 'bg-danger',
  info:   'bg-info',
};
export function ProgressBar({ value, max = 100, accent = 'green', height = 6, label, showPct = false }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      {(label || showPct) && (
        <div className="flex justify-between text-xs mb-1.5">
          {label    && <span className="dark:text-dark-100 text-dark-400">{label}</span>}
          {showPct  && <span className="font-bold">{pct}%</span>}
        </div>
      )}
      <div
        className="w-full rounded-full dark:bg-dark-400 bg-light-200 overflow-hidden"
        style={{ height }}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-700', BAR_COLOR[accent] ?? 'bg-green')}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ── Empty State ─────────────────────────────────────────────────────────── */
export function EmptyState({ icon = '📭', title, subtitle, action, className = '' }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-20 text-center', className)}>
      <div className="text-5xl mb-4 opacity-50">{icon}</div>
      {title    && <div className="font-display text-base font-bold mb-2">{title}</div>}
      {subtitle && <div className="text-sm dark:text-dark-100 text-dark-400 max-w-xs leading-relaxed mb-4">{subtitle}</div>}
      {action}
    </div>
  );
}

/* ── Skeleton loader ─────────────────────────────────────────────────────── */
export function Skeleton({ className = '', height = 40, rounded = 'rounded-xl' }) {
  return (
    <div
      style={{ height }}
      className={cn('shimmer dark:bg-dark-500 bg-light-200', rounded, className)}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-2xl p-5 space-y-3">
      <Skeleton height={40} className="w-11 rounded-xl" />
      <Skeleton height={12} className="w-20 rounded-lg" />
      <Skeleton height={28} className="w-32 rounded-lg" />
    </div>
  );
}

/* ── Avatar ──────────────────────────────────────────────────────────────── */
export function Avatar({ name = '', size = 36, accent = 'green', className = '' }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '??';
  const accentCls = {
    green:  'bg-green/20  border-green/30  text-green',
    purple: 'bg-purple/20 border-purple/30 text-purple-light',
    gold:   'bg-gold/20   border-gold/30   text-gold',
    danger: 'bg-danger/20 border-danger/30 text-danger',
  };
  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.35, borderRadius: size * 0.3 }}
      className={cn('border flex items-center justify-center font-bold flex-shrink-0', accentCls[accent] ?? accentCls.green, className)}
    >
      {initials}
    </div>
  );
}

/* ── Section Label ───────────────────────────────────────────────────────── */
export function SectionLabel({ children, className = '' }) {
  return (
    <div className={cn('label-xs text-green', className)}>
      {children}
    </div>
  );
}

/* ── Page Header ─────────────────────────────────────────────────────────── */
export function PageHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={cn('flex items-start justify-between gap-4 mb-6', className)}>
      <div>
        <h1 className="heading-sm">{title}</h1>
        {subtitle && <p className="text-sm dark:text-dark-100 text-dark-400 mt-1">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

/* ── Divider ─────────────────────────────────────────────────────────────── */
export function Divider({ label, className = '' }) {
  if (!label) {
    return <hr className={cn('dark:border-dark-400 border-light-200 my-4', className)} />;
  }
  return (
    <div className={cn('relative my-5', className)}>
      <hr className="dark:border-dark-400 border-light-200" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 dark:bg-dark-700 bg-white text-xs dark:text-dark-100 text-dark-400">
        {label}
      </span>
    </div>
  );
}
