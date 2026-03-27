import React, { useState } from 'react';
import { T } from '../../theme/tokens';
import { bookings, vendors, venues, activity, users, analyticsData } from '../../data/mockData';
import { Btn } from '../../components/common/Btn';
import { KpiCard } from '../../components/common/KpiCard';
import { BarChart } from '../../components/common/BarChart';
import { Pill } from '../../components/common/Pill';
import { Input } from '../../components/common/Input';
import { GlassCard } from '../../components/common/GlassCard';
import { Avatar } from '../../components/common/Avatar';
import { EmptyState } from '../../components/common/EmptyState';
import { SearchBar } from '../../components/common/SearchBar';
import { MobileAppHeader, BottomNav } from '../../components/common/MobileAppLayout';

export const AdminDashboard = () => {
  const [panel, setPanel] = useState("superdash");
  const [toast, setToast] = useState(null);

  const showToast = (msg, color = T.green) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const navSections = [
    { section: "Overview", items: [["superdash", "⚡", "Super Dashboard"], ["activity", "📡", "Activity"]] },
    { section: "Management", items: [["vendors", "🏪", "Vendors"], ["users", "👥", "Users"], ["oversight", "📋", "Oversight"], ["venues", "🏢", "Venues"]] },
    { section: "Platform", items: [["settings", "⚙", "Settings"]] },
  ];

  const bottomNavItems = [
    ["superdash", "⚡", "Dashboard"],
    ["activity", "📡", "Activity"],
    ["vendors", "🏪", "Vendors"],
    ["users", "👥", "Users"],
    ["settings", "⚙", "Settings"],
  ];

  // Super Dashboard
  const SuperDashPanel = () => (
    <div className="fade-up">
      <div className="flex-stack" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, gap: 18 }}>
        <div>
          <div style={{ fontFamily: T.font2, fontSize: "clamp(22px, 6vw, 26px)", fontWeight: 700, marginBottom: 4 }}>Super Dashboard</div>
          <div style={{ fontSize: 13, color: T.t3 }}>Platform overview · 25 March 2026</div>
        </div>
        <div className="stack-buttons" style={{ display: "flex", gap: 10, flexWrap: "wrap", width: '100%', maxWidth: 400 }}><Btn variant="ghost" sm>Export Report</Btn><Btn variant="purple" sm>Platform Broadcast</Btn></div>
      </div>
      
      {/* KPI Section */}
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 18 }}>
        <KpiCard icon="👥" label="Total Users" value="12,847" change="+18%" accentColor={T.cyan} />
        <KpiCard icon="🏪" label="Active Vendors" value={vendors.filter(v => v.status === "Active").length.toString()} change="+2 review" accentColor={T.purple} />
        <KpiCard icon="🎟️" label="Total Bookings" value="84,291" change="+23%" accentColor={T.green} />
        <KpiCard icon="💰" label="Platform Revenue" value="₹4.8Cr" change="+31%" accentColor={T.gold} />
      </div>
      
      <div className="grid-1" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20, marginBottom: 24 }}>
        <GlassCard>
          <div className="flex-stack" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div><div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 3 }}>Platform Revenue (Daily)</div><div style={{ fontSize: 12, color: T.t3 }}>Last 30 Days trend (₹L)</div></div>
            <div style={{ display: "flex", gap: 4 }}>
              {["30D", "7D", "MTD"].map(p => <button key={p} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, color: p === "30D" ? T.purple2 : T.t3, background: p === "30D" ? T.purpleGlow : "transparent", border: `1px solid ${p === "30D" ? T.purple : T.border}`, cursor: "pointer" }}>{p}</button>)}
            </div>
          </div>
          <BarChart data={analyticsData.revenueDaily.slice(-14)} labels={[]} primaryColor={T.purple} secondaryColor={T.purple2} height={140} />
        </GlassCard>
        
        <GlassCard>
          <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Platform Health</div>
          {[
            { label: "Vendor Activation", val: 75, color: T.green },
            { label: "Booking Completion", val: 91, color: T.cyan },
            { label: "Payment Success", val: 97, color: T.green },
          ].map(({ label, val, color }) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                <span style={{ color: T.t2 }}>{label}</span>
                <span style={{ fontWeight: 700, color }}>{val}%</span>
              </div>
              <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${val}%`, height: "100%", background: color, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </GlassCard>
      </div>

      <div className="grid-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <GlassCard style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "18px 22px", borderBottom: `1px solid ${T.border}` }}><div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700 }}>Top Performing Venues</div></div>
          
          {/* Mobile View Cards */}
          <div className="mobile-only" style={{ padding: 12 }}>
            {analyticsData.topVenues.slice(0, 3).map((v, i) => (
              <div key={v.name} className="mobile-table-card">
                <div className="row"><strong>#{i + 1} {v.name}</strong> <span style={{ color: T.green }}>{v.revenue}</span></div>
                <div className="row"><span className="label">Bookings</span> <span>{v.bookings}</span></div>
                <div className="row"><span className="label">City</span> <span>{v.city}</span></div>
              </div>
            ))}
          </div>

          <table className="hide-on-mobile">
            <thead><tr><th>#</th><th>Venue</th><th>Revenue</th><th>Bookings</th><th>Trend</th></tr></thead>
            <tbody>
              {analyticsData.topVenues.map((v, i) => (
                <tr key={v.name}>
                  <td><span style={{ fontFamily: T.font2, fontWeight: 800, color: i === 0 ? T.gold : T.t3 }}>#{i + 1}</span></td>
                  <td><strong>{v.name}</strong><div style={{ fontSize: 11, color: T.t3 }}>{v.city}</div></td>
                  <td style={{ fontWeight: 700, color: T.green }}>{v.revenue}</td>
                  <td>{v.bookings}</td>
                  <td style={{ color: T.green, fontWeight: 600 }}>{v.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>

        <GlassCard>
          <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Bookings by City</div>
          {[["Jaipur", "3,842", 78], ["Delhi", "1,241", 25], ["Mumbai", "891", 18]].map(([city, bks, pct]) => (
            <div key={city} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                <span style={{ fontWeight: 600 }}>{city}</span>
                <span style={{ color: T.t2 }}>{bks}</span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(to right,${T.green},${T.green2})`, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );

  // Activity Feed
  const ActivityPanel = () => (
    <div className="fade-up">
      <div style={{ fontFamily: T.font2, fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Activity Feed</div>
      <div style={{ fontSize: 14, color: T.t3, marginBottom: 28 }}>Real-time platform events</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "10px 16px", background: T.greenGlow, borderRadius: T.r, fontSize: 13, color: T.green, fontWeight: 600 }}>
        <div className="blink" style={{ width: 8, height: 8, background: T.green, borderRadius: "50%", boxShadow: `0 0 8px ${T.green}` }} />
        Live · Updates every 30 seconds
      </div>
      {activity.map((a, i) => (
        <div key={i} className="glass hover-card" style={{ borderRadius: T.r, padding: "16px 18px", marginBottom: 10, display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: `${a.color}18`, border: `1px solid ${a.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
            {a.type === "booking" ? "🎟️" : a.type === "vendor" ? "🏪" : a.type === "user" ? "👤" : a.type === "venue" ? "🏢" : "🔔"}
          </div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3, color: T.white }}>{a.msg}</div><div style={{ fontSize: 11, color: T.t3 }}>{a.time}</div></div>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: a.color, boxShadow: `0 0 6px ${a.color}`, marginTop: 8, flexShrink: 0 }} />
        </div>
      ))}
    </div>
  );

  // Vendor Management
  const VendorMgmt = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const filtered = vendors.filter(v => (search === "" || v.name.toLowerCase().includes(search.toLowerCase())) && (statusFilter === "All" || v.status === statusFilter));
    return (
      <div className="fade-up">
        <div className="flex-stack" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div><div style={{ fontFamily: T.font2, fontSize: "clamp(22px, 6vw, 26px)", fontWeight: 700, marginBottom: 4 }}>Vendor Manager</div><div style={{ fontSize: 13, color: T.t3 }}>{vendors.length} vendors total</div></div>
          <Btn variant="ghost" sm>Export</Btn>
        </div>
        
        <div className="hscroll" style={{ marginBottom: 24 }}>
          {["All", "Active", "Pending", "Blocked"].map(l => (
            <button key={l} onClick={() => setStatusFilter(l)} style={{ padding: "8px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700, color: statusFilter === l ? T.gold : T.t3, background: statusFilter === l ? "rgba(255,215,64,0.1)" : T.glass, border: `1px solid ${statusFilter === l ? T.gold : T.border}`, cursor: "pointer", whiteSpace: 'nowrap' }}>{l}</button>
          ))}
        </div>

        <GlassCard style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: `1px solid ${T.border}`, gap: 12 }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search vendors..." />
          </div>

          <div className="mobile-only" style={{ padding: 12 }}>
            {filtered.slice(0, 5).map(v => (
              <div key={v.id} className="mobile-table-card">
                <div className="row"><strong>{v.name}</strong> <Pill status={v.status} /></div>
                <div className="row"><span className="label">Owner</span> <span>{v.owner}</span></div>
                <div className="row"><span className="label">Bookings</span> <span>{v.totalBookings.toLocaleString()}</span></div>
                <div className="row"><span className="label">Revenue</span> <span style={{ color: T.green }}>₹{(v.revenue / 100000).toFixed(1)}L</span></div>
                <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                  <button style={{ flex: 1, padding: '8px', borderRadius: 8, background: T.glass, border: `1px solid ${T.border}`, fontSize: 11, fontWeight: 700, color: T.t2 }}>View</button>
                  {v.status === "Pending" && <button style={{ flex: 1.5, padding: '8px', borderRadius: 8, background: T.greenGlow, border: `1px solid ${T.green}`, fontSize: 11, fontWeight: 700, color: T.green }}>Approve</button>}
                </div>
              </div>
            ))}
          </div>

          <table className="hide-on-mobile">
            <thead><tr><th>Vendor</th><th>City</th><th>Venues</th><th>Bookings</th><th>Revenue</th><th>Rating</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id}>
                  <td><strong>{v.name}</strong><div style={{ fontSize: 11, color: T.t3 }}>{v.owner} · {v.email}</div></td>
                  <td>{v.city}</td>
                  <td style={{ fontWeight: 600 }}>{v.venues}</td>
                  <td style={{ fontWeight: 600 }}>{v.totalBookings.toLocaleString()}</td>
                  <td style={{ color: T.green, fontWeight: 700 }}>{v.revenue ? `₹${(v.revenue / 100000).toFixed(1)}L` : "—"}</td>
                  <td>{v.rating ? `⭐ ${v.rating}` : "—"}</td>
                  <td><Pill status={v.status} /></td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      {v.status === "Pending" && <button onClick={() => showToast(`${v.name} approved!`)} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, border: `1px solid ${T.green}`, background: "transparent", color: T.green, cursor: "pointer", fontFamily: T.font }}>Approve</button>}
                      <button style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, border: `1px solid ${T.border}`, background: "transparent", color: T.t2, cursor: "pointer", fontFamily: T.font }}>View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    );
  };

  // User Management
  const UserMgmt = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const filtered = users.filter(u => (search === "" || u.name.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search)) && (statusFilter === "All" || u.status === statusFilter));
    return (
      <div className="fade-up">
        <div className="flex-stack" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div><div style={{ fontFamily: T.font2, fontSize: "clamp(22px, 6vw, 26px)", fontWeight: 700, marginBottom: 4 }}>User Manager</div><div style={{ fontSize: 13, color: T.t3 }}>{users.length} registered</div></div>
          <Btn variant="ghost" sm>Export</Btn>
        </div>
        
        <div className="hscroll" style={{ marginBottom: 20 }}>
          {["All", "Active", "Flagged", "Blocked"].map(l => (
            <button key={l} onClick={() => setStatusFilter(l)} style={{ padding: "8px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700, color: statusFilter === l ? T.purple2 : T.t3, background: statusFilter === l ? T.purpleGlow : T.glass, border: `1px solid ${statusFilter === l ? T.purple : T.border}`, cursor: "pointer", whiteSpace: 'nowrap' }}>{l}</button>
          ))}
        </div>

        <GlassCard style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: `1px solid ${T.border}`, gap: 12 }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search users..." />
          </div>

          <div className="mobile-only" style={{ padding: 12 }}>
            {filtered.slice(0, 5).map(u => (
              <div key={u.id} className="mobile-table-card">
                <div className="row"><strong>{u.name}</strong> <Pill status={u.status} /></div>
                <div className="row"><span className="label">Joined</span> <span>{u.joined}</span></div>
                <div className="row"><span className="label">Spent</span> <span style={{ color: T.green }}>₹{u.spent.toLocaleString()}</span></div>
                <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                  <button style={{ flex: 1, padding: '8px', borderRadius: 8, background: T.glass, border: `1px solid ${T.border}`, fontSize: 11, fontWeight: 700, color: T.t2 }}>View</button>
                  <button style={{ flex: 1, padding: '8px', borderRadius: 8, background: 'rgba(255,82,82,0.1)', border: `1px solid ${T.red}`, fontSize: 11, fontWeight: 700, color: T.red }}>Block</button>
                </div>
              </div>
            ))}
          </div>

          <table className="hide-on-mobile">
            <thead><tr><th>User</th><th>Joined</th><th>Bookings</th><th>Spent</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={u.name} size={32} />
                      <div><strong>{u.name}</strong><div style={{ fontSize: 11, color: T.t3 }}>{u.phone}</div></div>
                    </div>
                  </td>
                  <td>{u.joined}</td>
                  <td style={{ fontWeight: 700 }}>{u.bookings}</td>
                  <td style={{ color: T.green, fontWeight: 700 }}>₹{u.spent.toLocaleString()}</td>
                  <td><Pill status={u.status} /></td>
                  <td><button style={{ padding: "4px 8px", borderRadius: 6, fontSize: 11, border: `1px solid ${T.border}`, background: "transparent", color: T.t2 }}>Manage</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    );
  };

  // Booking Oversight
  const BookingOversight = () => {
    const [cityFilter, setCityFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const statuses = ["All", "Checked In", "Confirmed", "No-Show", "Pending"];
    const cities = ["All", "Jaipur", "Delhi", "Mumbai"];
    const filtered = bookings.filter(b => (cityFilter === "All" || b.city === cityFilter) && (statusFilter === "All" || b.status === statusFilter));
    return (
      <div className="fade-up">
        <div className="flex-stack" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div><div style={{ fontFamily: T.font2, fontSize: "clamp(22px, 6vw, 26px)", fontWeight: 700, marginBottom: 4 }}>Booking Oversight</div><div style={{ fontSize: 13, color: T.t3 }}>{bookings.length} total today</div></div>
          <Btn variant="ghost" sm>Export</Btn>
        </div>
        <div className="hscroll" style={{ marginBottom: 12 }}>
          {cities.map(c => <button key={c} onClick={() => setCityFilter(c)} style={{ padding: "7px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, color: cityFilter === c ? T.green : T.t3, background: cityFilter === c ? T.greenGlow : "transparent", border: `1px solid ${cityFilter === c ? T.green : T.border}`, cursor: "pointer", whiteSpace: 'nowrap' }}>{c}</button>)}
        </div>
        <div className="hscroll" style={{ marginBottom: 24 }}>
          {statuses.map(s => <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: "7px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, color: statusFilter === s ? T.purple2 : T.t3, background: statusFilter === s ? T.purpleGlow : T.glass, border: `1px solid ${statusFilter === s ? T.purple : T.border}`, cursor: "pointer", whiteSpace: 'nowrap' }}>{s}</button>)}
        </div>

        <GlassCard style={{ padding: 0, overflow: "hidden" }}>
          <div className="mobile-only" style={{ padding: 12 }}>
            {filtered.slice(0, 10).map(b => (
              <div key={b.id} className="mobile-table-card">
                <div className="row"><strong>{b.guest}</strong> <Pill status={b.status} /></div>
                <div className="row"><span className="label">Venue</span> <span>{b.venue}</span></div>
                <div className="row"><span className="label">Amount</span> <span style={{ fontWeight: 700 }}>₹{b.amount?.toLocaleString()}</span></div>
                <div className="row"><span className="label">City</span> <span>{b.city}</span></div>
              </div>
            ))}
          </div>

          <table className="hide-on-mobile">
            <thead><tr><th>Booking ID</th><th>Guest</th><th>Venue</th><th>City</th><th>Type</th><th>Amount</th><th>Commission</th><th>Payment</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id}>
                  <td style={{ fontFamily: T.font2, fontSize: 11, color: T.t3 }}>{b.id}</td>
                  <td><strong>{b.guest}</strong></td>
                  <td style={{ color: T.t2 }}>{b.venue}</td>
                  <td>{b.city}</td>
                  <td>{b.type}</td>
                  <td style={{ fontWeight: 700 }}>{b.amount ? `₹${b.amount.toLocaleString()}` : "—"}</td>
                  <td style={{ color: T.green, fontWeight: 700 }}>₹{b.commission}</td>
                  <td><span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 8, background: T.glass2, color: T.t2 }}>{b.paymentMethod}</span></td>
                  <td><Pill status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <EmptyState icon="📋" title="No bookings match filters" />}
        </GlassCard>
      </div>
    );
  };

  // Venue Moderation
  const VenueModeration = () => (
    <div className="fade-up">
      <div style={{ fontFamily: T.font2, fontSize: "clamp(22px, 6vw, 26px)", fontWeight: 700, marginBottom: 4 }}>Venue Moderation</div>
      <div style={{ fontSize: 13, color: T.t3, marginBottom: 28 }}>Review and approve venue content</div>
      
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
        <KpiCard icon="✅" label="Active" value={venues.filter(v => v.status === "Active").length.toString()} accentColor={T.green} />
        <KpiCard icon="⏳" label="Pending" value={venues.filter(v => v.status === "Pending").length.toString()} accentColor={T.gold} />
        <KpiCard icon="🌈" label="Verified" value="3" accentColor={T.purple} />
      </div>

      <GlassCard style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "18px 22px", borderBottom: `1px solid ${T.border}` }}><div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700 }}>All Venues</div></div>
        
        <div className="mobile-only" style={{ padding: 12 }}>
          {venues.map(v => (
            <div key={v.id} className="mobile-table-card">
              <div className="row"><strong>{v.name}</strong> <Pill status={v.status} /></div>
              <div className="row"><span className="label">Location</span> <span>{v.location}</span></div>
              <div className="row"><span className="label">Vendor</span> <span>{vendors.find(vn => vn.id === v.vendor)?.name || "—"}</span></div>
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                {v.status === "Pending" && <button style={{ flex: 1.5, padding: '8px', borderRadius: 8, background: T.greenGlow, border: `1px solid ${T.green}`, fontSize: 11, fontWeight: 700, color: T.green }}>Approve</button>}
                <button style={{ flex: 1, padding: '8px', borderRadius: 8, background: T.glass, border: `1px solid ${T.border}`, fontSize: 11, fontWeight: 700, color: T.t2 }}>View</button>
              </div>
            </div>
          ))}
        </div>

        <table className="hide-on-mobile">
          <thead><tr><th>Venue</th><th>Vendor</th><th>City</th><th>Rating</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {venues.map(v => (
              <tr key={v.id}>
                <td><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 36, height: 36, borderRadius: 10, background: v.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>{v.emoji}</div><div><strong>{v.name}</strong><div style={{ fontSize: 11, color: T.t3 }}>{v.location}</div></div></div></td>
                <td style={{ color: T.t2 }}>{vendors.find(vn => vn.id === v.vendor)?.name || "—"}</td>
                <td>{v.location.split(",")[1]?.trim() || "Jaipur"}</td>
                <td>{v.rating ? `⭐ ${v.rating}` : "—"}</td>
                <td><Pill status={v.status} /></td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    {v.status === "Pending" && <button onClick={() => showToast(`${v.name} approved!`)} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, border: `1px solid ${T.green}`, background: "transparent", color: T.green, cursor: "pointer", fontFamily: T.font }}>Approve</button>}
                    <button style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, border: `1px solid ${T.border}`, background: "transparent", color: T.t2, cursor: "pointer", fontFamily: T.font }}>View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );

  const panelMap = {
    superdash: <SuperDashPanel />,
    activity: <ActivityPanel />,
    vendors: <VendorMgmt />,
    users: <UserMgmt />,
    oversight: <BookingOversight />,
    venues: <VenueModeration />,
  };

  return (
    <div className="flex-stack" style={{ display: "flex", minHeight: "100vh", paddingTop: 74, paddingBottom: 64 }}>
      <MobileAppHeader 
        title="Admin Panel" 
        navSections={navSections} 
        onSelect={setPanel} 
        activePanel={panel} 
      />
      
      {/* Admin Sidebar */}
      <div className="hide-mobile" style={{ width: 256, minWidth: 256, background: "rgba(8,8,12,0.97)", borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", padding: "28px 0", position: "sticky", top: 74, height: "calc(100vh - 74px)", overflowY: "auto" }}>
        <div style={{ padding: "0 24px 24px", borderBottom: `1px solid ${T.border}`, marginBottom: 16 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: T.purpleGlow, border: "1px solid rgba(124,77,255,0.3)", borderRadius: 8, padding: "3px 10px", fontSize: 10, fontWeight: 700, color: T.purple2, marginBottom: 8 }}>⚡ SUPER ADMIN</div>
          <div style={{ fontFamily: T.font2, fontSize: 20, fontWeight: 700 }}>NightOut Admin</div>
          <div style={{ fontSize: 11, color: T.t3, marginTop: 2 }}>Platform Control Center</div>
        </div>
        <div style={{ padding: "0 24px 18px", borderBottom: `1px solid ${T.border}`, marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: T.purpleGlow, border: "1px solid rgba(124,77,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: T.purple2 }}>SA</div>
            <div><div style={{ fontSize: 13, fontWeight: 700 }}>Super Admin</div><div style={{ fontSize: 11, color: T.t3 }}>platform@nightout.in</div></div>
          </div>
        </div>
        {navSections.map(({ section, items }) => (
          <div key={section}>
            <div style={{ padding: "8px 24px 4px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: T.t4 }}>{section}</div>
            {items.map(([id, icon, label, badge]) => (
              <div key={id} onClick={() => setPanel(id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 24px", cursor: "pointer", fontSize: 13, fontWeight: panel === id ? 700 : 500, color: panel === id ? T.purple2 : T.t3, borderLeft: `2px solid ${panel === id ? T.purple : "transparent"}`, background: panel === id ? "rgba(124,77,255,0.04)" : "transparent", transition: "all 0.2s" }}>
                <span style={{ fontSize: 15, width: 20, textAlign: "center", filter: panel === id ? `drop-shadow(0 0 6px rgba(124,77,255,0.4))` : "none" }}>{icon}</span>
                <span style={{ flex: 1 }}>{label}</span>
                {badge && <span style={{ background: T.red, color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 10 }}>{badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="p-shrink" style={{ flex: 1, padding: "36px 40px", overflowY: "auto" }}>
        <div className="grid-1" style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
          {panelMap[panel] || <SuperDashPanel />}
        </div>
      </div>

      <BottomNav items={bottomNavItems} active={panel} onSelect={setPanel} />

      {/* Toast */}
      {toast && <div className="fade-in" style={{ position: "fixed", bottom: 32, right: 32, background: T.glass3, border: `1px solid ${toast.color}`, borderRadius: T.r, padding: "14px 22px", color: toast.color, fontWeight: 600, fontSize: 14, backdropFilter: "blur(20px)", boxShadow: `0 0 30px ${toast.color}44`, zIndex: 9998 }}>{toast.msg}</div>}
    </div>
  );
};
