import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  StatCard, Card, PageHeader, StatusPill,
  ProgressBar, Avatar, Icon, Button,
} from '../../components/ui/index.js';
import { useAuth }                      from '../../context/AuthContext.jsx';
import { useAnalytics } from '../../hooks/useAnalytics.js';
import { useToast } from '../../hooks/useToast.js';
import { ToastContainer } from '../../components/ui/Toast.jsx';
import { fmt, cn } from '../../utils/helpers.js';



const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-xl px-3 py-2 text-xs shadow-card">
      <div className="font-bold mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">
            {p.name === 'Revenue' ? fmt.currency(p.value) : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function VendorDashboard() {
  const { user }   = useAuth();
  const navigate   = useNavigate();
  const { stats, loading } = useAnalytics();
  const { toasts, show, dismiss } = useToast();

  if (loading) {
    return (
      <div className="p-6 space-y-6 animate-fade-up">
        <div className="h-40 shimmer dark:bg-dark-600 bg-white rounded-3xl" />
        <div className="grid grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-24 shimmer dark:bg-dark-600 bg-white rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 h-64 shimmer dark:bg-dark-600 bg-white rounded-3xl" />
          <div className="h-64 shimmer dark:bg-dark-600 bg-white rounded-3xl" />
        </div>
      </div>
    );
  }

  const { todayCount, todayRevenue, checkedInToday, upcomingToday, cancelledToday, recentBookings, venueStats, weeklyStats } = stats || {};

  const checkinPct = todayCount ? Math.round((checkedInToday / todayCount) * 100) : 0;

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <ToastContainer toasts={toasts} dismiss={dismiss} />

      {/* Welcome banner */}
      <div className="relative overflow-hidden dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-3xl p-6">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(0,200,83,0.08) 0%, transparent 60%)' }} />
        <div className="relative flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="label-xs text-green mb-1">{new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}</div>
            <h2 className="heading-sm mb-1">Good evening, {user?.name?.split(' ')[0] ?? 'there'} 👋</h2>
            <p className="text-sm dark:text-dark-100 text-dark-400">Here's what's happening at your venues tonight.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button size="sm" onClick={() => navigate('/vendor/bookings')} leftIcon="calendar">Manage Bookings</Button>
            <Button size="sm" variant="ghost-dark" onClick={() => navigate('/vendor/scanner')} leftIcon="qr">Open Scanner</Button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="calendar" label="Bookings Today"  value={todayCount} accent="green"  />
        <StatCard icon="💰"       label="Today's Revenue" value={fmt.shortCurrency(todayRevenue)} accent="gold"   />
        <StatCard icon="users"    label="Checked In"      value={`${checkedInToday}/${todayCount}`} change={`${checkinPct}% rate`} changeUp accent="purple" />
        <StatCard icon="alert"    label="Cancelled"       value={cancelledToday} accent="danger" changeUp={false} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Revenue area chart */}
        <div className="xl:col-span-2">
          <Card title="Weekly Growth" subtitle="Last 7 days performance"
            action={
              <select className="select-base h-8 text-xs py-0 px-2 w-auto">
                <option>Last 7 Days</option>
              </select>
            }>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={weeklyStats} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="vRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#00C853" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#00C853" stopOpacity={0}    />
                  </linearGradient>
                  <linearGradient id="vBkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#7C4DFF" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#7C4DFF" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fill:'#6B6B80', fontSize:11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill:'#6B6B80', fontSize:11 }} axisLine={false} tickLine={false}
                  tickFormatter={v => v >= 1000 ? `₹${(v/1000).toFixed(0)}K` : `₹${v}`} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="revenue"  name="Revenue"  stroke="#00C853" strokeWidth={2.5} fill="url(#vRevGrad)" dot={false} activeDot={{ r:5, fill:'#00C853' }} />
                <Area type="monotone" dataKey="bookings" name="Bookings" stroke="#7C4DFF" strokeWidth={1.8} fill="url(#vBkGrad)"  dot={false} activeDot={{ r:4, fill:'#7C4DFF' }} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Venue snapshots */}
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
          {venueStats?.map(v => (
            <Card key={v._id} noPad>
              <div className="p-4 border-b dark:border-dark-400 border-light-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-dark-500">
                  🏢
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">{v.name}</div>
                  <div className="text-[11px] dark:text-dark-100 text-dark-400">⭐ {v.rating} · {v.location}</div>
                </div>
                <StatusPill status={v.status === 'active' ? 'Active' : 'Pending'} />
              </div>
              <div className="p-4 grid grid-cols-3 gap-2 text-center">
                {[
                  ['Bookings', v.totalBookings.toLocaleString(), 'text-green'],
                  ['Revenue',  fmt.shortCurrency(v.totalRevenue), 'text-gold'],
                  ['Rating',   v.rating, 'text-purple-light'],
                ].map(([l, val, cls]) => (
                  <div key={l}>
                    <div className={`font-display text-lg font-bold ${cls}`}>{val}</div>
                    <div className="text-[10px] dark:text-dark-100 text-dark-400 mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent bookings + check-in progress */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Recent bookings */}
        <div className="xl:col-span-2">
          <Card title="Recent Bookings" subtitle="Latest 5 reservations"
            action={<Button size="sm" variant="ghost-dark" onClick={() => navigate('/vendor/bookings')}>View all →</Button>}>
            <div className="divide-y dark:divide-dark-400 divide-light-200">
              {recentBookings?.map(b => (
                <div key={b._id}
                  className="flex items-center justify-between py-3 px-1 rounded-lg hover:dark:bg-dark-500/40 hover:bg-light-50 transition-colors cursor-pointer"
                  onClick={() => navigate('/vendor/bookings')}>
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar name={b.user?.name} size={34} accent="green" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate">{b.user?.name}</div>
                      <div className="text-[11px] dark:text-dark-100 text-dark-400">{b.venue?.name} · <span className="capitalize">{b.tickets?.type}</span></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right hidden sm:block">
                      <div className="text-sm font-bold text-green">{fmt.currency(b.totalPrice)}</div>
                      <div className="text-[11px] dark:text-dark-100 text-dark-400">{new Date(b.bookingDate).toLocaleDateString('en-IN')}</div>
                    </div>
                    <StatusPill status={b.status === 'upcoming' ? 'Confirmed' : b.status === 'completed' ? 'Checked In' : 'Cancelled'} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Check-in progress */}
        <Card title="Tonight's Progress" subtitle="Live check-in status">
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Checked In</span>
                <span className="font-display text-2xl font-bold text-green">{checkedInToday}/{todayCount}</span>
              </div>
              <div className="h-3 rounded-full dark:bg-dark-400 bg-light-200 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${checkinPct}%`, background: 'linear-gradient(to right, #00C853, #00E676)', boxShadow: '0 0 16px rgba(0,200,83,0.4)' }} />
              </div>
              <div className="text-xs dark:text-dark-100 text-dark-400 mt-1.5">{checkinPct}% arrived · Real-time update</div>
            </div>

            <div className="space-y-2.5 pt-2 border-t dark:border-dark-400 border-light-200">
              {[
                ['Upcoming', upcomingToday, 'text-purple-light'],
                ['Completed', checkedInToday, 'text-green'],
                ['Cancelled', cancelledToday, 'text-danger'],
              ].map(([label, count, cls]) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="dark:text-dark-100 text-dark-400">{label}</span>
                  <span className={`font-bold ${cls}`}>{count}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t dark:border-dark-400 border-light-200 space-y-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green rounded-full animate-blink" />
                <span className="text-xs text-green font-semibold">Live · updating</span>
              </div>
              <Button size="sm" fullWidth onClick={() => navigate('/vendor/scanner')} leftIcon="qr">
                Open QR Scanner
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

