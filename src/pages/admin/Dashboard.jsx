// ─────────────────────────────────────────────────────────────────────────────
//  Admin Dashboard  —  platform-wide overview
// ─────────────────────────────────────────────────────────────────────────────
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  StatCard, Card, PageHeader, StatusPill,
  ProgressBar, Button, Icon,
} from '../../components/ui/index.js';
import {
  PLATFORM_VENDORS, PLATFORM_USERS, BOOKINGS,
  ADMIN_REVENUE_DAILY, TOP_VENUES, ACTIVITY_LOG,
} from '../../data/mockData.js';
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

const HEALTH = [
  { label: 'Vendor Activation Rate', val: 75, accent: 'green'  },
  { label: 'Booking Completion',      val: 91, accent: 'green'  },
  { label: 'User Retention (30d)',    val: 68, accent: 'purple' },
  { label: 'Payment Success Rate',    val: 97, accent: 'green'  },
  { label: 'Review Submission Rate',  val: 44, accent: 'gold'   },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const activeVendors  = PLATFORM_VENDORS.filter(v => v.status === 'Active').length;
  const pendingVendors = PLATFORM_VENDORS.filter(v => v.status === 'Pending').length;
  const totalGMV       = ADMIN_REVENUE_DAILY.reduce((s, d) => s + d.revenue, 0);
  const totalComm      = ADMIN_REVENUE_DAILY.reduce((s, d) => s + d.commission, 0);

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      {/* Welcome banner */}
      <div className="relative overflow-hidden dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-3xl p-6">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(124,77,255,0.09) 0%, transparent 60%)' }} />
        <div className="relative flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="label-xs text-purple-light mb-1">Super Admin · Platform Control Centre</div>
            <h2 className="heading-sm mb-1">Platform Overview</h2>
            <p className="text-sm dark:text-dark-100 text-dark-400">Tuesday, 25 March 2026 · All systems operational</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button size="sm" variant="purple" onClick={() => navigate('/admin/vendors')} leftIcon="building">
              Review Vendors ({pendingVendors})
            </Button>
            <Button size="sm" variant="ghost-dark" onClick={() => navigate('/admin/activity')} leftIcon="zap">
              Activity Feed
            </Button>
          </div>
        </div>
      </div>

      {/* KPI row 1 */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="users"    label="Total Users"    value="12,847"  change="+18% MoM" accent="info"   />
        <StatCard icon="building" label="Active Vendors" value={activeVendors} change={`${pendingVendors} pending`} accent="purple" />
        <StatCard icon="calendar" label="Total Bookings" value="84,291"  change="+23% MoM" accent="green"  />
        <StatCard icon="💰"       label="Platform GMV"   value="₹4.8Cr"  change="+31% MoM" accent="gold"   />
      </div>

      {/* KPI row 2 */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="building" label="Total Venues"     value="18"    change="3 pending" accent="green"  />
        <StatCard icon="💼"       label="Commission Earned" value={fmt.shortCurrency(totalComm)} change="+28%" accent="gold" />
        <StatCard icon="⭐"       label="Platform Rating"  value="4.6"   change="+0.1 MoM" accent="gold"   />
        <StatCard icon="alert"    label="Open Complaints"  value="3"     change="Action needed" changeUp={false} accent="danger" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Revenue chart */}
        <div className="xl:col-span-2">
          <Card title="Platform Revenue (Daily)" subtitle="GMV and Commission — March 2026">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={ADMIN_REVENUE_DAILY} margin={{ top:4, right:4, bottom:0, left:0 }}>
                <defs>
                  <linearGradient id="gmvG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#7C4DFF" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#7C4DFF" stopOpacity={0}    />
                  </linearGradient>
                  <linearGradient id="comG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#00C853" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#00C853" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fill:'#6B6B80', fontSize:11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill:'#6B6B80', fontSize:11 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="revenue"    name="GMV"        stroke="#7C4DFF" strokeWidth={2.5} fill="url(#gmvG)" dot={false} activeDot={{ r:5 }} />
                <Area type="monotone" dataKey="commission" name="Commission"  stroke="#00C853" strokeWidth={2}   fill="url(#comG)" dot={false} activeDot={{ r:4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Platform health */}
        <Card title="Platform Health">
          <div className="space-y-5">
            {HEALTH.map(h => (
              <ProgressBar key={h.label} label={h.label} value={h.val} showPct accent={h.accent} height={5} />
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Top venues */}
        <Card title="Top Performing Venues" subtitle="By monthly revenue"
          action={<Button size="sm" variant="ghost-dark" onClick={() => navigate('/admin/revenue')}>View all →</Button>}>
          <div className="divide-y dark:divide-dark-400 divide-light-200">
            {TOP_VENUES.map((v, i) => (
              <div key={v.name} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className={`font-display font-bold text-sm w-6 ${i === 0 ? 'text-gold' : 'dark:text-dark-100 text-dark-400'}`}>
                    #{i + 1}
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{v.name}</div>
                    <div className="text-[11px] dark:text-dark-100 text-dark-400">{v.city} · ⭐ {v.rating}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green">{v.revenue}</div>
                  <div className={`text-[11px] font-bold ${v.trendUp ? 'text-green' : 'text-danger'}`}>{v.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity feed */}
        <Card title="Recent Activity" subtitle="Last platform events"
          action={<Button size="sm" variant="ghost-dark" onClick={() => navigate('/admin/activity')}>View all →</Button>}>
          <div className="divide-y dark:divide-dark-400 divide-light-200">
            {ACTIVITY_LOG.slice(0, 6).map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-3">
                <span className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.color }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm">{a.msg}</div>
                  <div className="text-[11px] dark:text-dark-100 text-dark-400 mt-0.5">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
