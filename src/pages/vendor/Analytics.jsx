// ─────────────────────────────────────────────────────────────────────────────
//  Vendor Analytics
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  StatCard, Card, PageHeader, ProgressBar,
} from '../../components/ui/index.js';
import { useAnalytics } from '../../hooks/useAnalytics.js';
import { fmt } from '../../utils/helpers.js';




const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-xl px-3 py-2 text-xs shadow-card">
      <div className="font-bold mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">
            {['revenue'].includes(p.dataKey) ? fmt.shortCurrency(p.value) : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const PIE_COLORS = ['#00C853','#7C4DFF','#FFD740','#00E5FF'];


export default function Analytics() {
  const { stats, loading } = useAnalytics();
  const [period, setPeriod] = useState('daily');

  if (loading && !stats) {
    return (
      <div className="p-6 space-y-6 animate-fade-up">
        <PageHeader title="Analytics" subtitle="Revenue and performance insights" />
        <div className="h-64 shimmer dark:bg-dark-600 bg-white rounded-3xl" />
      </div>
    );
  }

  const { todayRevenue, todayCount, totalRevenue, totalBookings, weeklyStats, venueStats, recentBookings } = stats || {};

  const avgOrderValue = totalBookings ? Math.round(totalRevenue / totalBookings) : 0;

  // Simple breakdown from recent bookings or mocked for now if backend doesn't provide full aggregate
  const typeBreakdown = [
    { name: 'Stag',   value: recentBookings?.filter(b => b.tickets?.type === 'stag').length || 0 },
    { name: 'Couple', value: recentBookings?.filter(b => b.tickets?.type === 'couple').length || 0 },
    { name: 'Group',  value: recentBookings?.filter(b => b.tickets?.type === 'group').length || 0 },
    { name: 'VIP',    value: recentBookings?.filter(b => b.tickets?.type === 'vip').length || 0 },
  ];

  const payBreakdown = [
    { method:'UPI',     pct: 75 },
    { method:'Other',   pct: 25 },
  ];


  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <PageHeader
        title="Analytics"
        subtitle="Revenue and performance insights"
        action={
          <div className="flex dark:bg-dark-700 bg-white dark:border-dark-500 border-light-200 border rounded-xl p-1">
            {['daily','monthly'].map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                  period === p ? 'bg-green text-black' : 'dark:text-dark-100 text-dark-400 hover:text-green'
                }`}>
                {p}
              </button>
            ))}
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="💰"      label="Total Revenue"  value={fmt.shortCurrency(totalRevenue)} accent="gold"   />
        <StatCard icon="calendar" label="Total Bookings" value={totalBookings}             accent="green"  />
        <StatCard icon="📊"      label="Avg Order Value" value={fmt.currency(avgOrderValue)} accent="purple" />
        <StatCard icon="⭐"       label="Platform Rating" value="4.65"                        accent="gold"   />
      </div>

      {/* Main revenue/bookings chart */}
      <Card title="Weekly Performance" subtitle="Revenue and booking volume (Last 7 Days)">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={weeklyStats} margin={{ top:4, right:4, bottom:0, left:0 }}>
            <defs>
              <linearGradient id="aRevG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#00C853" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#00C853" stopOpacity={0}    />
              </linearGradient>
              <linearGradient id="aBkG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#7C4DFF" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#7C4DFF" stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="day" tick={{ fill:'#6B6B80', fontSize:11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="r" tick={{ fill:'#6B6B80', fontSize:11 }} axisLine={false} tickLine={false}
              tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
            <YAxis yAxisId="b" orientation="right" tick={{ fill:'#6B6B80', fontSize:11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTip />} />
            <Legend wrapperStyle={{ color:'#6B6B80', fontSize:12, paddingTop:12 }} />
            <Area yAxisId="r" type="monotone" dataKey="revenue"  name="Revenue"  stroke="#00C853" strokeWidth={2.5} fill="url(#aRevG)" dot={false} activeDot={{r:5}} />
            <Area yAxisId="b" type="monotone" dataKey="bookings" name="Bookings" stroke="#7C4DFF" strokeWidth={2}   fill="url(#aBkG)"  dot={false} activeDot={{r:4}} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Bottom 3-col row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Pie: booking types */}
        <Card title="Booking Types (Recent)">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={typeBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
                dataKey="value" paddingAngle={3}>
                {typeBreakdown.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} stroke="transparent" />)}
              </Pie>
              <Tooltip content={<ChartTip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {typeBreakdown.map((t, i) => (
              <div key={t.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i] }} />
                <span className="dark:text-dark-100 text-dark-400">{t.name}</span>
                <span className="ml-auto font-bold">{t.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Bar: payment methods */}
        <Card title="Payment Channels">
          <div className="space-y-4 mt-1">
            {payBreakdown.map(({ method, pct }, i) => (
              <ProgressBar key={method} label={method} value={pct} showPct
                accent={i === 0 ? 'green' : i === 1 ? 'purple' : i === 2 ? 'gold' : 'info'} height={5} />
            ))}
          </div>
        </Card>

        {/* Venue revenue bar */}
        <Card title="Revenue by Venue">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={venueStats} margin={{ top:4, right:0, bottom:0, left:-24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill:'#6B6B80', fontSize:10 }} axisLine={false} tickLine={false}
                tickFormatter={v => v.split(' ')[0]} />
              <YAxis tick={{ fill:'#6B6B80', fontSize:10 }} axisLine={false} tickLine={false}
                tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="totalRevenue" name="Revenue" fill="#00C853" radius={[6,6,0,0]} fillOpacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Status funnel */}
      <Card title="Platform Funnel" subtitle="Real-time breakdown">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            ['Total',      totalBookings,                                       'text-green'       ],
            ['Confirmed',  stats?.upcomingToday || 0,                            'text-purple-light'],
            ['Checked In', stats?.checkedInToday || 0,                           'text-green'       ],
            ['Cancelled',  stats?.cancelledToday || 0,                           'text-danger'      ],
            ['Other',      0,                                                   'text-dark-100'    ],
          ].map(([l, v, cls]) => (
            <div key={l} className="dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-2xl p-4 text-center">
              <div className={`font-display text-2xl font-bold mb-1 ${cls}`}>{v}</div>
              <div className="text-xs dark:text-dark-100 text-dark-400 uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}
