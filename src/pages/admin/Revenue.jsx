// ─────────────────────────────────────────────────────────────────────────────
//  Admin Revenue Analytics
// ─────────────────────────────────────────────────────────────────────────────
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  StatCard, Card, PageHeader, ProgressBar, StatusPill,
} from '../../components/ui/index.js';
import { ADMIN_REVENUE_DAILY, PLATFORM_VENDORS, TOP_VENUES } from '../../data/mockData.js';
import { fmt } from '../../utils/helpers.js';

const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-xl px-3 py-2 text-xs shadow-card">
      <div className="font-bold mb-1">Day {label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{fmt.shortCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

const CITY_REVENUE = [
  { city:'Jaipur',    revenue:3120000, pct:65, color:'#00C853'  },
  { city:'Delhi',     revenue:980000,  pct:20, color:'#7C4DFF'  },
  { city:'Mumbai',    revenue:720000,  pct:15, color:'#00E5FF'  },
];

export default function AdminRevenue() {
  const totalGMV  = ADMIN_REVENUE_DAILY.reduce((s,d) => s + d.revenue, 0);
  const totalComm = ADMIN_REVENUE_DAILY.reduce((s,d) => s + d.commission, 0);
  const activeVendors = PLATFORM_VENDORS.filter(v => v.status === 'Active');

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <PageHeader title="Revenue Analytics" subtitle="Platform earnings and commission — March 2026" />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="💰"       label="Total GMV"       value={fmt.shortCurrency(totalGMV)}  change="+31% MoM" accent="gold"   />
        <StatCard icon="💼"       label="Commission"      value={fmt.shortCurrency(totalComm)} change="+28%"     accent="purple" />
        <StatCard icon="%"        label="Avg Rate"        value="5%"                            accent="green"  />
        <StatCard icon="📈"       label="Avg Order Value" value="₹2,847"                        change="+12%"    accent="info"   />
      </div>

      {/* GMV vs Commission chart */}
      <Card title="GMV vs Commission (Daily)" subtitle="March 2026 platform earnings">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={ADMIN_REVENUE_DAILY} margin={{ top:4, right:4, bottom:0, left:0 }}>
            <defs>
              <linearGradient id="rGmv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#7C4DFF" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#7C4DFF" stopOpacity={0}    />
              </linearGradient>
              <linearGradient id="rCom" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#00C853" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#00C853" stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="day" tick={{ fill:'#6B6B80', fontSize:11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill:'#6B6B80', fontSize:11 }} axisLine={false} tickLine={false}
              tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
            <Tooltip content={<ChartTip />} />
            <Area type="monotone" dataKey="revenue"    name="GMV"        stroke="#7C4DFF" strokeWidth={2.5} fill="url(#rGmv)" dot={false} activeDot={{ r:5 }} />
            <Area type="monotone" dataKey="commission" name="Commission"  stroke="#00C853" strokeWidth={2}   fill="url(#rCom)" dot={false} activeDot={{ r:4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* City breakdown */}
        <Card title="Revenue by City">
          <div className="space-y-5">
            {CITY_REVENUE.map(c => (
              <div key={c.city}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">{c.city}</span>
                  <span style={{ color: c.color }} className="font-bold">
                    {fmt.shortCurrency(c.revenue)} ({c.pct}%)
                  </span>
                </div>
                <div className="h-2 rounded-full dark:bg-dark-400 bg-light-200 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width:`${c.pct}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top venues table */}
        <Card title="Top Performing Venues" noPad>
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-dark-400 border-light-200">
                {['#','Venue','Revenue','Bookings','Trend'].map(h => (
                  <th key={h} className="text-left label-xs text-dark-100 px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOP_VENUES.map((v, i) => (
                <tr key={v.name} className="border-b dark:border-dark-400/50 border-light-200/70 last:border-0">
                  <td className="px-5 py-3.5">
                    <span className={`font-display font-bold text-sm ${i===0 ? 'text-gold' : 'dark:text-dark-100 text-dark-400'}`}>#{i+1}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-sm">{v.name}</div>
                    <div className="text-[11px] dark:text-dark-100 text-dark-400">{v.city}</div>
                  </td>
                  <td className="px-5 py-3.5 font-bold text-sm text-green">{v.revenue}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold">{v.bookings.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-sm font-bold" style={{ color: v.trendUp ? '#00C853' : '#FF5252' }}>{v.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Vendor commission ledger */}
      <Card title="Vendor Commission Ledger" subtitle="Active vendors — March 2026" noPad>
        <table className="w-full min-w-max">
          <thead>
            <tr className="border-b dark:border-dark-400 border-light-200">
              {['Vendor','City','GMV','Rate','Commission','Status'].map(h => (
                <th key={h} className="text-left label-xs text-dark-100 px-5 py-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activeVendors.sort((a,b) => b.revenue - a.revenue).map(v => (
              <tr key={v.id} className="border-b dark:border-dark-400/50 border-light-200/70 last:border-0 hover:dark:bg-dark-500/40 hover:bg-light-50 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="font-semibold text-sm">{v.name}</div>
                  <div className="text-[11px] dark:text-dark-100 text-dark-400">{v.owner}</div>
                </td>
                <td className="px-5 py-3.5 text-sm dark:text-dark-100 text-dark-400">{v.city}</td>
                <td className="px-5 py-3.5 text-sm font-bold text-green">{v.revenue ? fmt.shortCurrency(v.revenue) : '—'}</td>
                <td className="px-5 py-3.5 text-sm dark:text-dark-100 text-dark-400">5%</td>
                <td className="px-5 py-3.5 text-sm font-bold text-purple-light">{v.commission ? fmt.shortCurrency(v.commission) : '—'}</td>
                <td className="px-5 py-3.5"><StatusPill status={v.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
