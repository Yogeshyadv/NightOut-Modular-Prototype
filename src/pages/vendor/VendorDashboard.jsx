import React, { useState } from 'react';
import { T } from '../../theme/tokens';
import { bookings, vendors, venues, activity, analyticsData } from '../../data/mockData';
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

export const VendorDashboard = () => {
  const [panel, setPanel] = useState("overview");
  const [scanResult, setScanResult] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, color = T.green) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const navSections = [
    { section: "Operations", items: [["overview", "📊", "Overview"], ["bookings", "📅", "Bookings", 3], ["scanner", "📱", "Scanner"]] },
    { section: "Management", items: [["analytics", "📈", "Analytics"], ["settings", "⚙️", "Settings"]] },
  ];

  const bottomNavItems = [
    ["overview", "📊", "Overview"],
    ["scanner", "📱", "Scanner"],
    ["bookings", "📅", "Bookings"],
    ["analytics", "📈", "Analytics"],
    ["settings", "⚙️", "Settings"],
  ];

  const panels = {
    overview: () => (
      <div className="fade-up">
        <div className="flex-stack" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
          <div><div style={{ fontFamily: T.font2, fontSize: "clamp(22px, 6vw, 26px)", fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 4 }}>Today's Overview</div><div style={{ fontSize: 13, color: T.t3 }}>{new Date().toLocaleDateString()} · Live</div></div>
          <div className="stack-buttons" style={{ display: "flex", gap: 10 }}><Btn variant="ghost" sm>Export</Btn><Btn variant="primary" sm>+ Event</Btn></div>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {[["warn", T.gold, "⚠️", "Update pricing", "Fix Friday night rates"], ["error", T.red, "🚨", "1 complaint", "Respond within 48h"]].map(([t, c, icon, title, sub]) => (
            <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: 12, background: T.glass, border: `1px solid rgba(${t === "warn" ? "255,215,64" : "255,82,82"},0.2)`, borderLeft: `3px solid ${c}`, borderRadius: 12, padding: "12px 14px" }}>
              <span style={{ fontSize: 14 }}>{icon}</span>
              <div><div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{title}</div><div style={{ fontSize: 11, color: T.t2 }}>{sub}</div></div>
            </div>
          ))}
        </div>

        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
          <KpiCard icon="🎟️" label="Bookings" value="47" change="+12%" accentColor={T.green} />
          <KpiCard icon="✅" label="Checked In" value="23" change="of 47" changeUp={false} accentColor={T.purple} />
          <KpiCard icon="💰" label="Est. Rev" value="₹2.8L" change="+8%" accentColor={T.gold} />
          <KpiCard icon="⭐" label="Rating" value="4.5" change="+0.2" accentColor={T.gold} />
        </div>

        <div className="grid-1" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, marginBottom: 24 }}>
          <GlassCard>
            <div className="flex-stack" style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div><div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 3 }}>Bookings This Week</div></div>
              <div style={{ display: "flex", gap: 4 }}>
                {["W", "M", "Y"].map(p => <button key={p} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, color: p === "W" ? T.green : T.t3, background: p === "W" ? T.greenGlow : "transparent", border: `1px solid ${p === "W" ? T.green : T.border}`, cursor: "pointer" }}>{p}</button>)}
              </div>
            </div>
            <BarChart data={[22, 38, 19, 29, 56, 62, 40]} labels={["M", "T", "W", "T", "F", "S", "S"]} height={140} />
          </GlassCard>
          
          <GlassCard>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div><div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 3 }}>Entry Progress</div><div style={{ fontSize: 12, color: T.t3 }}>Live</div></div>
              <div style={{ fontFamily: T.font2, fontSize: 22, fontWeight: 800, color: T.green }}>49%</div>
            </div>
            <div style={{ width: "100%", height: 10, background: "rgba(255,255,255,0.06)", borderRadius: 8, overflow: "hidden", marginBottom: 10 }}>
              <div style={{ width: "49%", height: "100%", background: `linear-gradient(to right,${T.green},${T.green2})`, borderRadius: 8 }} />
            </div>
            <div style={{ fontSize: 11, color: T.t3 }}>23 of 47 checked in</div>
          </GlassCard>
        </div>
      </div>
    ),
    bookings: () => (
      <div className="fade-up">
        <div className="flex-stack" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div><div style={{ fontFamily: T.font2, fontSize: "clamp(22px, 6vw, 26px)", fontWeight: 700, marginBottom: 4 }}>Booking Manager</div><div style={{ fontSize: 13, color: T.t3 }}>Tonight · 47 total</div></div>
          <Btn variant="ghost" sm>Export</Btn>
        </div>
        
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 22 }}>
          <KpiCard icon="📋" label="Total" value="47" accentColor={T.green} />
          <KpiCard icon="✅" label="Check In" value="23" accentColor={T.purple} />
          <KpiCard icon="❌" label="No-Show" value="3" accentColor={T.red} />
        </div>

        <GlassCard style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: `1px solid ${T.border}`, gap: 12 }}>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700 }} className="hide-mobile">Guestlist</div>
            <SearchBar value="" onChange={() => { }} placeholder="Search guests..." />
          </div>

          {/* Mobile View Cards */}
          <div className="mobile-only" style={{ padding: 12 }}>
            {bookings.slice(0, 5).map(b => (
              <div key={b.id} className="mobile-table-card">
                <div className="row"><strong>{b.guest}</strong> <Pill status={b.status} /></div>
                <div className="row"><span className="label">Type</span> <span>{b.type}</span></div>
                <div className="row"><span className="label">Amount</span> <span style={{ fontWeight: 700 }}>₹{b.amount?.toLocaleString()}</span></div>
                {b.status === "Confirmed" && <button onClick={() => { setPanel("scanner"); setScanResult("valid"); }} style={{ width: '100%', marginTop: 8, padding: "8px", borderRadius: 8, background: T.greenGlow, border: `1px solid ${T.green}`, color: T.green, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Check In</button>}
              </div>
            ))}
          </div>

          <table className="hide-on-mobile">
            <thead><tr><th>Guest</th><th>Type</th><th>Guests</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td><strong>{b.guest}</strong><div style={{ fontSize: 11, color: T.t3 }}>{b.id}</div></td>
                  <td>{b.type}</td>
                  <td>{b.guests}</td>
                  <td style={{ fontWeight: 700 }}>{b.amount ? `₹${b.amount.toLocaleString()}` : "—"}</td>
                  <td><Pill status={b.status} /></td>
                  <td>{b.status === "Confirmed" && <button onClick={() => { setPanel("scanner"); setScanResult("valid"); }} style={{ padding: "5px 12px", borderRadius: 6, fontSize: 11, fontWeight: 700, border: `1px solid ${T.green}`, background: "transparent", color: T.green, cursor: "pointer", fontFamily: T.font }}>Check In</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    ),
    guestlist: () => (
      <div className="fade-up">
        <div className="flex-stack" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div><div style={{ fontFamily: T.font2, fontSize: "clamp(22px, 6vw, 26px)", fontWeight: 700, marginBottom: 4 }}>Guestlist</div><div style={{ fontSize: 13, color: T.t3 }}>Entry log for tonight</div></div>
          <Btn variant="primary" sm onClick={() => setPanel("scanner")}>Scanner</Btn>
        </div>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 22 }}>
          <KpiCard icon="📋" label="Booked" value="47" accentColor={T.green} />
          <KpiCard icon="✅" label="In" value="23" accentColor={T.green} />
          <KpiCard icon="⏳" label="Pending" value="21" accentColor={T.gold} />
        </div>
        <GlassCard style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "18px 22px", borderBottom: `1px solid ${T.border}` }}><div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700 }}>Entry Log — Tonight</div></div>
          
          <div className="mobile-only" style={{ padding: 12 }}>
            {[["9:04 PM", "Rahul Sharma", "Stag", 1, "Bouncer"], ["9:12 PM", "Rohan Mehra", "Stag", 1, "QR Scan"]].map(([time, guest, type, g, by]) => (
              <div key={time} className="mobile-table-card">
                <div className="row"><strong>{guest}</strong> <span>{time}</span></div>
                <div className="row"><span className="label">Method</span> <span>{by}</span></div>
              </div>
            ))}
          </div>

          <table className="hide-on-mobile">
            <thead><tr><th>Check-in Time</th><th>Guest Name</th><th>Type</th><th>Guests</th><th>Method</th></tr></thead>
            <tbody>
              {[["9:04 PM", "Rahul Sharma", "Stag", 1, "Bouncer"], ["9:12 PM", "Rohan Mehra", "Stag", 1, "QR Scan"], ["9:18 PM", "Vikram & Neha", "Couple", 2, "QR Scan"], ["9:31 PM", "Riya Gupta", "Stag", 1, "Manual"], ["9:45 PM", "Karan Shah", "Couple", 2, "QR Scan"], ["10:02 PM", "Vikram Singh", "Stag", 1, "QR Scan"]].map(([time, guest, type, g, by]) => (
                <tr key={time}><td style={{ color: T.t2 }}>{time}</td><td><strong>{guest}</strong></td><td>{type}</td><td>{g}</td><td><span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 8, background: by === "QR Scan" ? T.greenGlow2 : "rgba(255,215,64,0.08)", border: `1px solid ${by === "QR Scan" ? T.green : "rgba(255,215,64,0.2)"}`, color: by === "QR Scan" ? T.green : T.gold }}>{by}</span></td></tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    ),
    scanner: () => (
      <div className="fade-up">
        <div className="flex-stack" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div><div style={{ fontFamily: T.font2, fontSize: "clamp(22px, 6vw, 26px)", fontWeight: 700, marginBottom: 4 }}>Operations</div><div style={{ fontSize: 13, color: T.t3 }}>Bouncer / QR Scanner</div></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: T.green, fontWeight: 700 }}>
            <div className="blink" style={{ width: 6, height: 6, background: T.green, borderRadius: "50%" }} />Live
          </div>
        </div>
        <div className="grid-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <GlassCard>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Scan QR</div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
              <div style={{ width: "100%", maxWidth: 260, aspectRatio: "1/1", background: T.glass, border: `2px solid ${T.border}`, borderRadius: 24, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <div className="scan-anim" style={{ position: "absolute", width: "80%", height: 2, background: T.green, boxShadow: `0 0 10px ${T.green}` }} />
                <div style={{ textAlign: "center", color: T.t4, fontSize: 13 }}>📱<br />Aim at QR code</div>
              </div>
              <div style={{ width: "100%", textAlign: "center" }}>
                <div style={{ fontSize: 12, color: T.t3, marginBottom: 10 }}>Or enter code manually:</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input placeholder="000000" style={{ flex: 1, background: T.glass, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px", color: T.white, textAlign: "center", fontSize: 16, letterSpacing: 2 }} />
                  <Btn variant="primary" sm onClick={() => setScanResult("valid")}>Verify</Btn>
                </div>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Status</div>
            {!scanResult ? <EmptyState icon="📋" title="Waiting..." sub="Ready to scan next guest" /> : (
              <div className="fade-in" style={{ background: T.greenGlow, border: `1px solid ${T.green}`, borderRadius: 16, padding: 20, textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
                <div style={{ fontFamily: T.font2, fontSize: 18, fontWeight: 800, color: T.green, marginBottom: 12 }}>ADMIT GUEST</div>
                <div style={{ fontSize: 13, color: T.white, fontWeight: 600 }}>Priya Sharma + 1</div>
                <div style={{ fontSize: 11, color: T.t3, marginTop: 4 }}>Couple Guestlist · Paid</div>
                <button onClick={() => setScanResult(null)} style={{ marginTop: 16, padding: "10px 20px", background: "transparent", border: `1px solid ${T.border}`, borderRadius: 10, color: T.t2, fontSize: 12, fontWeight: 700 }}>Next Guest</button>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    ),
    analytics: () => (
      <div className="fade-up">
        <div className="flex-stack" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div><div style={{ fontFamily: T.font2, fontSize: "clamp(22px, 6vw, 26px)", fontWeight: 700, marginBottom: 4 }}>Analytics</div><div style={{ fontSize: 13, color: T.t3 }}>March 2026 · Platform Performance</div></div>
          <div className="stack-buttons" style={{ display: "flex", gap: 10 }}><Btn variant="ghost" sm>Month</Btn><Btn variant="ghost" sm>Export</Btn></div>
        </div>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
          <KpiCard icon="📋" label="Bookings" value="842" change="+23%" accentColor={T.green} />
          <KpiCard icon="✅" label="Check-in" value="91%" change="+4%" accentColor={T.purple} />
          <KpiCard icon="💰" label="Revenue" value="₹38L" change="+18%" accentColor={T.gold} />
          <KpiCard icon="⭐" label="Rating" value="4.5" change="+0.3" accentColor={T.gold} />
        </div>
        <div className="grid-1" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, marginBottom: 24 }}>
          <GlassCard>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Revenue (Daily)</div>
            <div style={{ fontSize: 11, color: T.t3, marginBottom: 20 }}>Estimated daily revenue (₹L)</div>
            <BarChart data={[1.2, 1.8, 1.1, 1.6, 3.0, 3.2, 2.0]} labels={["M", "T", "W", "T", "F", "S", "S"]} primaryColor={T.purple} secondaryColor={T.purple2} height={140} />
          </GlassCard>
          <GlassCard>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Benchmark</div>
            <div className="mobile-only">
              {[["Cover", "₹1,500", "+15%"], ["Rating", "4.5⭐", "+0.3"]].map(([m, us, d]) => (
                <div key={m} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 13 }}>
                  <span style={{ color: T.t3 }}>{m}</span>
                  <strong>{us} <span style={{ color: T.green, fontSize: 11 }}>{d}</span></strong>
                </div>
              ))}
            </div>
            <table className="hide-on-mobile">
              <thead><tr><th>Metric</th><th>Us</th><th>City</th></tr></thead>
              <tbody>
                {[["Cover", "₹1,500", "+15%"], ["Rating", "4.5⭐", "+0.3"], ["Check-in", "91%", "+13%"], ["Bookings", "842", "+65%"]].map(([m, us, d]) => (
                  <tr key={m}><td style={{ color: T.t2 }}>{m}</td><td style={{ fontWeight: 700 }}>{us}</td><td style={{ color: T.green, fontWeight: 600 }}>{d}</td></tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </div>
        <GlassCard>
          <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Rating Breakdown · 312 reviews</div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <div style={{ fontFamily: T.font2, fontSize: 48, fontWeight: 800, color: T.gold }}>4.5</div>
            <div style={{ flex: 1 }}>
              {[[5, 62], [4, 24], [3, 8], [2, 4], [1, 2]].map(([s, p]) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: T.t2, minWidth: 40 }}>{s} ★</span>
                  <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}><div style={{ width: `${p}%`, height: "100%", background: T.gold, borderRadius: 4 }} /></div>
                  <span style={{ fontSize: 11, color: T.t3, minWidth: 30 }}>{p}%</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    ),
    venue: () => (
      <div className="fade-up">
        <div className="flex-stack" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div><div style={{ fontFamily: T.font2, fontSize: "clamp(22px, 6vw, 26px)", fontWeight: 700, marginBottom: 4 }}>Edit Venue</div><div style={{ fontSize: 13, color: T.t3 }}>Update your profile listing</div></div>
          <div className="stack-buttons"><Btn variant="primary" sm>Save Changes</Btn></div>
        </div>
        <GlassCard style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Basic Information</div>
          <div className="grid-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Input label="Venue Name" value="F Bar & Lounge" />
            <Input label="Category" value="Nightclub" />
            <div style={{ gridColumn: "span 2" }}><Input label="Address" value="MI Road, Jaipur, Rajasthan 302001" /></div>
          </div>
        </GlassCard>
        <GlassCard>
          <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Amenities</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[["Parking", true], ["Valet", true], ["Dance Floor", true], ["VIP Lounge", false], ["Smoking", true]].map(([am, on]) => (
              <div key={am} style={{ padding: "8px 14px", background: on ? T.greenGlow : T.glass, border: `1px solid ${on ? "rgba(0,200,83,0.3)" : T.border}`, borderRadius: 10, fontSize: 12, fontWeight: 600, color: on ? T.green : T.t3 }}>{on ? "✓" : "+"} {am}</div>
            ))}
          </div>
        </GlassCard>
      </div>
    ),
    pricing: () => (
      <div className="fade-up">
        <div className="flex-stack" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div><div style={{ fontFamily: T.font2, fontSize: "clamp(22px, 6vw, 26px)", fontWeight: 700, marginBottom: 4 }}>Pricing</div><div style={{ fontSize: 13, color: T.t3 }}>Manage entry rates</div></div>
          <div className="stack-buttons"><Btn variant="primary" sm>Publish</Btn></div>
        </div>
        <div className="hscroll" style={{ marginBottom: 24 }}>
          {["Weekday", "Friday", "Saturday", "Sunday"].map((d, i) => (
            <button key={d} style={{ padding: "8px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700, color: i === 0 ? T.green : T.t3, background: i === 0 ? T.greenGlow : T.glass, border: `1px solid ${i === 0 ? T.green : T.border}`, cursor: "pointer", whiteSpace: 'nowrap' }}>{d}</button>
          ))}
        </div>
        <GlassCard style={{ marginBottom: 20 }}>
          <div className="grid-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Input label="Stag (₹)" value="1500" type="number" />
            <Input label="Couple (₹)" value="2000" type="number" />
            <div style={{ gridColumn: "span 2" }}><Input label="Dress Code" value="Smart casual" /></div>
          </div>
        </GlassCard>
        
        <GlassCard style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "18px 22px", borderBottom: `1px solid ${T.border}` }}><div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700 }}>History</div></div>
          <div className="mobile-only" style={{ padding: 12 }}>
            {[["25 Mar", "₹1,500"], ["21 Mar", "₹2,000"]].map(([d, p]) => (
              <div key={d} className="mobile-table-card">
                <div className="row"><strong>{d}</strong> <span>{p}</span></div>
              </div>
            ))}
          </div>
          <table className="hide-on-mobile">
            <thead><tr><th>Date</th><th>Stag</th><th>Couple</th><th>Female</th></tr></thead>
            <tbody>
              {[["25 Mar", "₹1,500", "₹2,000", "₹800"], ["21 Mar", "₹2,000", "₹2,500", "₹1,000"]].map(([d, ...r]) => (
                <tr key={d}><td style={{ color: T.t2 }}>{d}</td>{r.map((v, i) => <td key={i} style={{ fontWeight: i < 3 ? 700 : 400 }}>{v}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    ),
    notifications: () => (
      <div className="fade-up">
        <div style={{ fontFamily: T.font2, fontSize: "clamp(22px, 6vw, 26px)", fontWeight: 700, marginBottom: 4 }}>Notifications</div>
        <div style={{ fontSize: 13, color: T.t3, marginBottom: 20 }}>App alerts and platform messages</div>
        {[
          { icon: "🎟️", color: T.green, title: "New booking: Rahul S.", "sub": "F Bar & Lounge · Stag", time: "2m" },
          { icon: "⚠️", color: T.gold, title: "Price update reminder", "sub": "Weekend rates due", time: "1h" },
          { icon: "⭐", color: T.gold, title: "New 5⭐ review", "sub": "Priya M: 'Best club!'", time: "3h" },
        ].map((n, i) => (
          <div key={i} className="glass" style={{ borderRadius: 16, padding: 14, marginBottom: 10, display: "flex", gap: 14, alignItems: "center", border: `1px solid ${T.border}` }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${n.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{n.icon}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600, color: T.white }}>{n.title}</div><div style={{ fontSize: 11, color: T.t2, marginTop: 2 }}>{n.sub}</div></div>
            <span style={{ fontSize: 11, color: T.t4 }}>{n.time}</span>
          </div>
        ))}
      </div>
    ),
    settings: () => (
      <div className="fade-up">
        <div style={{ fontFamily: T.font2, fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Settings</div>
        <div style={{ fontSize: 14, color: T.t3, marginBottom: 28 }}>Manage account and preferences</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <GlassCard>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Account Details</div>
            <Input label="Full Name" value="Amit Kumar" /><Input label="Email" value="amit@fbar.in" type="email" /><Input label="Phone" value="+91 98765 00001" type="tel" />
            <Btn variant="primary" full onClick={() => showToast("Account saved!")}>Save Account</Btn>
          </GlassCard>
          <GlassCard>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Notification Preferences</div>
            {[["New Bookings", "Get notified for each booking", true], ["Daily Summary", "End-of-day performance email", true], ["Complaints", "Alert when complaint received", false], ["Price Reminders", "Thursday pricing SMS", true]].map(([n, s, on]) => (
              <div key={n} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <div><div style={{ fontSize: 14, fontWeight: 600 }}>{n}</div><div style={{ fontSize: 11, color: T.t2, marginTop: 2 }}>{s}</div></div>
                <div style={{ width: 44, height: 24, background: on ? T.green : T.glass, border: `1px solid ${on ? T.green : T.border}`, borderRadius: 12, cursor: "pointer", position: "relative", transition: "all 0.2s" }}>
                  <div style={{ position: "absolute", top: 3, [on ? "right" : "left"]: 3, width: 18, height: 18, background: on ? "#000" : "rgba(255,255,255,0.2)", borderRadius: "50%", transition: "all 0.2s" }} />
                </div>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    ),
  };

  return (
    <div className="flex-stack" style={{ display: "flex", minHeight: "100vh", paddingTop: 74, paddingBottom: 68 }}>
      <MobileAppHeader 
        title="Vendor Portal" 
        navSections={navSections} 
        onSelect={setPanel} 
        activePanel={panel} 
      />
      
      {/* Sidebar */}
      <div className="hide-mobile" style={{ width: 256, minWidth: 256, background: "rgba(10,10,10,0.95)", borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", padding: "28px 0", position: "sticky", top: 74, height: "calc(100vh - 74px)", overflowY: "auto" }}>
        <div style={{ padding: "0 24px 24px", borderBottom: `1px solid ${T.border}`, marginBottom: 16 }}>
          <div style={{ fontFamily: T.font2, fontSize: 20, fontWeight: 700, color: T.green }}>Vendor Portal</div>
          <div style={{ fontSize: 11, color: T.t3, marginTop: 3 }}>F Bar & Lounge · Jaipur</div>
        </div>
        <div style={{ padding: "0 24px 18px", borderBottom: `1px solid ${T.border}`, marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar name="Amit Kumar" size={40} />
            <div><div style={{ fontSize: 13, fontWeight: 700 }}>Amit Kumar</div><div style={{ fontSize: 11, color: T.t3 }}>Club Owner</div></div>
          </div>
          <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 700, color: T.green, background: T.greenGlow, border: "1px solid rgba(0,200,83,0.2)", padding: "3px 10px", borderRadius: 10 }}>✓ Rainbow Verified</div>
        </div>
        {navSections.map(({ section, items }) => (
          <div key={section}>
            <div style={{ padding: "8px 24px 4px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: T.t4 }}>{section}</div>
            {items.map(([id, icon, label, badge]) => (
              <div key={id} onClick={() => setPanel(id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 24px", cursor: "pointer", fontSize: 13, fontWeight: panel === id ? 700 : 500, color: panel === id ? T.green : T.t3, borderLeft: `2px solid ${panel === id ? T.green : "transparent"}`, background: panel === id ? "rgba(0,200,83,0.04)" : "transparent", transition: "all 0.2s" }}>
                <span style={{ fontSize: 15, width: 20, textAlign: "center", filter: panel === id ? `drop-shadow(0 0 6px rgba(0,200,83,0.4))` : "none" }}>{icon}</span>
                <span style={{ flex: 1 }}>{label}</span>
                {badge && <span style={{ background: T.red, color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 10 }}>{badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="p-shrink" style={{ flex: 1, padding: "36px 40px", overflowY: "auto", position: "relative" }}>
        <div className="grid-1" style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
          {(panels[panel] || panels.overview)()}
        </div>
      </div>

      <BottomNav items={bottomNavItems} active={panel} onSelect={setPanel} />

      {/* Toast */}
      {toast && <div className="fade-in" style={{ position: "fixed", bottom: 32, right: 32, background: T.glass3, border: `1px solid ${toast.color}`, borderRadius: T.r, padding: "14px 22px", color: toast.color, fontWeight: 600, fontSize: 14, backdropFilter: "blur(20px)", boxShadow: `0 0 30px ${toast.color}44`, zIndex: 9998 }}>{toast.msg}</div>}
    </div>
  );
};
