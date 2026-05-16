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
import { useAuth }                      from '../../context/AuthContext.jsx';
import { useAdminAnalytics } from '../../hooks/useAdminAnalytics.js';
import { fmt, cn }                      from '../../utils/helpers.js';
import { ToastContainer }               from '../../components/ui/Toast.jsx';
import { useToast }                     from '../../hooks/useToast.js';

const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-xl px-3 py-2 text-xs shadow-card">
      <div className="font-bold mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{fmt.currency(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { stats, loading } = useAdminAnalytics();
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

  const { totalUsers, totalVendors, totalVenues, totalBookings, totalRevenue, pendingVenues, weeklyGrowth, recentActivity } = stats || {};

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <ToastContainer toasts={toasts} dismiss={dismiss} />

      {/* Welcome banner */}
      <div className="relative overflow-hidden dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-3xl p-6">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(124,77,255,0.09) 0%, transparent 60%)' }} />
        <div className="relative flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="label-xs text-purple-light mb-1">Super Admin · Platform Control Centre</div>
            <h2 className="heading-sm mb-1">Platform Overview</h2>
            <p className="text-sm dark:text-dark-100 text-dark-400">{new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' })} · All systems operational</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button size="sm" variant="purple" onClick={() => navigate('/admin/vendors')} leftIcon="building">
              Review Vendors ({pendingVenues})
            </Button>
            <Button size="sm" variant="ghost-dark" onClick={() => navigate('/admin/activity')} leftIcon="zap">
              Activity Feed
            </Button>
          </div>
        </div>
      </div>

      {/* KPI row 1 */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="users"    label="Total Users"    value={totalUsers}    accent="info"   />
        <StatCard icon="building" label="Active Vendors" value={totalVendors}  accent="purple" />
        <StatCard icon="calendar" label="Total Bookings" value={totalBookings} accent="green"  />
        <StatCard icon="💰"       label="Platform GMV"   value={fmt.shortCurrency(totalRevenue)} accent="gold"   />
      </div>

      {/* KPI row 2 */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="building" label="Total Venues"     value={totalVenues}   accent="green"  />
        <StatCard icon="💼"       label="Commission"      value={fmt.shortCurrency(totalRevenue * 0.15)} accent="gold" />
        <StatCard icon="⭐"       label="Platform Rating"  value="4.6"           accent="gold"   />
        <StatCard icon="alert"    label="Open Pending"     value={pendingVenues} accent="danger" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Revenue chart */}
        <div className="xl:col-span-2">
          <Card title="Platform Revenue (Daily)" subtitle="GMV performance — Last 7 Days">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={weeklyGrowth} margin={{ top:4, right:4, bottom:0, left:0 }}>
                <defs>
                  <linearGradient id="gmvG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#7C4DFF" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#7C4DFF" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="_id" tick={{ fill:'#6B6B80', fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v => v.split('-').slice(1).join('/')} />
                <YAxis tick={{ fill:'#6B6B80', fontSize:11 }} axisLine={false} tickLine={false}
                  tickFormatter={v => v >= 1000 ? `₹${(v/1000).toFixed(0)}K` : `₹${v}`} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="revenue" name="GMV" stroke="#7C4DFF" strokeWidth={2.5} fill="url(#gmvG)" dot={false} activeDot={{ r:5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Platform health */}
        <Card title="Platform Status">
          <div className="space-y-4 p-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Server Status</span>
              <span className="text-xs text-green flex items-center gap-1.5"><span className="w-2 h-2 bg-green rounded-full animate-pulse" /> Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Database</span>
              <span className="text-xs text-green">Synced</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Queue Workers</span>
              <span className="text-xs text-green">Active</span>
            </div>
            <div className="pt-4 border-t dark:border-dark-400 border-light-200">
               <Button size="sm" fullWidth leftIcon="activity">Check Detailed Logs</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Activity feed */}
      <Card title="Recent Platform Activity" subtitle="Real-time events"
        action={<Button size="sm" variant="ghost-dark" onClick={() => navigate('/admin/activity')}>View all →</Button>}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentActivity?.map((a, i) => (
            <div key={a._id} className="flex items-start gap-3 py-3 px-2 rounded-xl hover:dark:bg-dark-500/40 transition-all border border-transparent">
              <Avatar name={a.user?.name} size={36} accent="green" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">
                  {a.user?.name} booked <span className="text-purple-light">{a.venue?.name}</span>
                </div>
                <div className="text-[11px] dark:text-dark-100 text-dark-400 mt-0.5">
                  {new Date(a.createdAt).toLocaleString()} · {fmt.currency(a.totalPrice)}
                </div>
              </div>
              <StatusPill status={a.status === 'upcoming' ? 'Confirmed' : a.status === 'completed' ? 'Checked In' : 'Cancelled'} className="scale-75 origin-right" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}


