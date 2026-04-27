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
import { BOOKINGS, REVENUE_DAILY, REVENUE_MONTHLY, VENUES } from '../../data/mockData.js';
import { fmt } from '../../utils/helpers.js';

const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-xl px-3 py-2 text-xs shadow-card">
      <div className="font-bold mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">
            {['revenue','monthlyRevenue'].includes(p.dataKey) ? fmt.shortCurrency(p.value) : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const PIE_COLORS = ['#00C853','#7C4DFF','#FFD740','#00E5FF'];

export default function Analytics() {
  const [period, setPeriod] = useState('daily');
  const data = period === 'daily' ? REVENUE_DAILY : REVENUE_MONTHLY;
  const xKey = period === 'daily' ? 'day' : 'month';

  const totalRev = REVENUE_DAILY.reduce((s, d) => s + d.revenue, 0);
  const myVenues = VENUES.filter(v => v.vendorId === 'V001');

  const typeBreakdown = [
    { name: 'Stag',   value: BOOKINGS.filter(b => b.type === 'Stag').length   },
    { name: 'Couple', value: BOOKINGS.filter(b => b.type === 'Couple').length },
    { name: 'Group',  value: BOOKINGS.filter(b => b.type === 'Group').length  },
    { name: 'VIP',    value: BOOKINGS.filter(b => b.type === 'VIP Table').length },
  ];

  const payBreakdown = [
    { method:'UPI',     pct: 65 },
    { method:'Card',    pct: 20 },
    { method:'Wallet',  pct: 10 },
    { method:'Bank',    pct:  5 },
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
        <StatCard icon="💰"      label="Total Revenue"  value={fmt.shortCurrency(totalRev)} change="+18%" accent="gold"   />
        <StatCard icon="calendar" label="Total Bookings" value={BOOKINGS.length}             change="+23%" accent="green"  />
        <StatCard icon="📊"      label="Avg Order Value" value={fmt.currency(Math.round(totalRev / BOOKINGS.length))} change="+12%" accent="purple" />
        <StatCard icon="⭐"       label="Avg Rating"     value="4.65"                        change="+0.2" accent="gold"   />
      </div>

      {/* Main revenue/bookings chart */}
      <Card title={period === 'daily' ? 'Daily Revenue — Last 7 Days' : 'Monthly Revenue — Last 6 Months'} subtitle="Revenue and booking volume">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top:4, right:4, bottom:0, left:0 }}>
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
            <XAxis dataKey={xKey} tick={{ fill:'#6B6B80', fontSize:11 }} axisLine={false} tickLine={false} />
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
        <Card title="Booking Types">
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
        <Card title="Payment Methods">
          <div className="space-y-4 mt-1">
            {payBreakdown.map(({ method, pct }, i) => (
              <ProgressBar key={method} label={method} value={pct} showPct
                accent={i === 0 ? 'green' : i === 1 ? 'purple' : i === 2 ? 'gold' : 'info'} height={5} />
            ))}
          </div>
        </Card>

        {/* Venue revenue bar */}
        <Card title="Venue Revenue">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={myVenues} margin={{ top:4, right:0, bottom:0, left:-24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill:'#6B6B80', fontSize:10 }} axisLine={false} tickLine={false}
                tickFormatter={v => v.split(' ')[0]} />
              <YAxis tick={{ fill:'#6B6B80', fontSize:10 }} axisLine={false} tickLine={false}
                tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="monthlyRevenue" name="Revenue" fill="#00C853" radius={[6,6,0,0]} fillOpacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Status funnel */}
      <Card title="Booking Status Funnel" subtitle="All-time breakdown">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            ['Total',      BOOKINGS.length,                                       'text-green'       ],
            ['Confirmed',  BOOKINGS.filter(b=>b.status==='Confirmed').length,     'text-purple-light'],
            ['Checked In', BOOKINGS.filter(b=>b.status==='Checked In').length,    'text-green'       ],
            ['No-Show',    BOOKINGS.filter(b=>b.status==='No-Show').length,       'text-danger'      ],
            ['Cancelled',  BOOKINGS.filter(b=>b.status==='Cancelled').length,     'text-dark-100'    ],
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
