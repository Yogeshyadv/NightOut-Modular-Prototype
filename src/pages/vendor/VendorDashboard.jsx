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

export const VendorDashboard = () => {
  const [panel, setPanel] = useState("overview");
  const [scanResult, setScanResult] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, color = T.green) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const navSections = [
    { section: "Operations", items: [["overview", "📊", "Overview"], ["bookings", "📅", "Bookings", 3], ["guestlist", "✅", "Guestlist"], ["scanner", "📱", "QR Scanner"]] },
    { section: "Management", items: [["analytics", "📈", "Analytics"], ["venue", "🏪", "Edit Venue"], ["pricing", "🏷", "Pricing"], ["notifications", "🔔", "Notifications", 2]] },
    { section: "Account", items: [["settings", "⚙️", "Settings"]] },
  ];

  const panels = {
    overview: () => (
      <div className="fade-up">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
          <div><div style={{ fontFamily: T.font2, fontSize: 26, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 4 }}>Today's Overview</div><div style={{ fontSize: 14, color: T.t3 }}>Tuesday, 25 March 2026 · Live</div></div>
          <div style={{ display: "flex", gap: 10 }}><Btn variant="ghost" sm>Export</Btn><Btn variant="primary" sm>+ New Event</Btn></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {[["warn", T.gold, "⚠️", "Pricing not set for Friday night", "Update to avoid losing bookings"], ["error", T.red, "🚨", "1 complaint awaiting response", "48-hr SLA · Respond now to maintain rating"]].map(([t, c, icon, title, sub]) => (
            <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: 12, background: T.glass, border: `1px solid rgba(${t === "warn" ? "255,215,64" : "255,82,82"},0.2)`, borderLeft: `3px solid ${c}`, borderRadius: T.r, padding: "14px 16px" }}>
              <span style={{ fontSize: 16 }}>{icon}</span>
              <div><div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{title}</div><div style={{ fontSize: 12, color: T.t2 }}>{sub}</div></div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 28 }}>
          <KpiCard icon="🎟️" label="Bookings Tonight" value="47" change="+12% vs last Tue" accentColor={T.green} />
          <KpiCard icon="✅" label="Checked In" value="23" change="of 47 confirmed" changeUp={false} accentColor={T.purple} />
          <KpiCard icon="💰" label="Est. Revenue" value="₹2.8L" change="+8% vs avg" accentColor={T.gold} />
          <KpiCard icon="⭐" label="Avg Rating" value="4.5" change="+0.2 this month" accentColor={T.gold} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, marginBottom: 24 }}>
          <GlassCard>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div><div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 3 }}>Bookings This Week</div><div style={{ fontSize: 12, color: T.t3 }}>Daily breakdown</div></div>
              <div style={{ display: "flex", gap: 4 }}>
                {["Week", "Month", "Year"].map(p => <button key={p} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, color: p === "Week" ? T.green : T.t3, background: p === "Week" ? T.greenGlow : "transparent", border: `1px solid ${p === "Week" ? T.green : T.border}`, cursor: "pointer" }}>{p}</button>)}
              </div>
            </div>
            <BarChart data={[22, 38, 19, 29, 56, 62, 40]} labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} />
          </GlassCard>
          <GlassCard>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 18 }}>Booking Split</div>
            <svg viewBox="0 0 120 120" width="160" height="160" style={{ display: "block", margin: "0 auto 16px" }}>
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="18" />
              <circle cx="60" cy="60" r="50" fill="none" stroke={T.green} strokeWidth="18" strokeDasharray="213.6 100" strokeLinecap="round" transform="rotate(-90 60 60)" />
              <circle cx="60" cy="60" r="50" fill="none" stroke={T.purple} strokeWidth="18" strokeDasharray="53.4 260.2" strokeDashoffset="-213.6" strokeLinecap="round" transform="rotate(-90 60 60)" />
              <circle cx="60" cy="60" r="50" fill="none" stroke={T.gold} strokeWidth="18" strokeDasharray="47 266.6" strokeDashoffset="-267" strokeLinecap="round" transform="rotate(-90 60 60)" />
              <text x="60" y="56" textAnchor="middle" fontSize="14" fontWeight="800" fill="white" fontFamily="sans-serif">47</text>
              <text x="60" y="70" textAnchor="middle" fontSize="7" fill="#707070" fontFamily="sans-serif">bookings</text>
            </svg>
            {[[T.green, "Guestlist", "32", "68%"], [T.purple, "Tables", "8", "17%"], [T.gold, "Events", "7", "15%"]].map(([c, l, v, p]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: c, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: T.t2, flex: 1 }}>{l}</span>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{v}</span>
                <span style={{ fontSize: 11, color: T.t3 }}>{p}</span>
              </div>
            ))}
          </GlassCard>
        </div>
        <GlassCard>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div><div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 3 }}>Check-in Progress</div><div style={{ fontSize: 12, color: T.t3 }}>Live</div></div>
            <div style={{ fontFamily: T.font2, fontSize: 22, fontWeight: 800, color: T.green }}>23 / 47</div>
          </div>
          <div style={{ width: "100%", height: 12, background: "rgba(255,255,255,0.06)", borderRadius: 8, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ width: "49%", height: "100%", background: `linear-gradient(to right,${T.green},${T.green2})`, borderRadius: 8, boxShadow: "0 0 16px rgba(0,200,83,0.3)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: T.t3 }}>
            <span><span style={{ color: T.green, fontWeight: 700 }}>49%</span> checked in</span>
            <span>Expected: 120–150 guests tonight</span>
          </div>
        </GlassCard>
      </div>
    ),
    bookings: () => (
      <div className="fade-up">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div><div style={{ fontFamily: T.font2, fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Booking Manager</div><div style={{ fontSize: 14, color: T.t3 }}>Tonight · 47 total bookings</div></div>
          <Btn variant="ghost" sm>Export CSV</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 22 }}>
          <KpiCard icon="📋" label="Total" value="47" accentColor={T.green} />
          <KpiCard icon="✅" label="Checked In" value="23" accentColor={T.purple} />
          <KpiCard icon="❌" label="No-Shows" value="3" accentColor={T.red} />
        </div>
        <GlassCard style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700 }}>Tonight's Guestlist</div>
            <SearchBar value="" onChange={() => { }} placeholder="Search guests..." />
          </div>
          <table>
            <thead><tr><th>Guest</th><th>Contact</th><th>Type</th><th>Guests</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td><strong>{b.guest}</strong><div style={{ fontSize: 11, color: T.t3 }}>{b.id}</div></td>
                  <td style={{ color: T.t2 }}>{b.phone || "—"}</td>
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
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div><div style={{ fontFamily: T.font2, fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Guestlist</div><div style={{ fontSize: 14, color: T.t3 }}>Entry log for tonight</div></div>
          <Btn variant="primary" sm onClick={() => setPanel("scanner")}>Open Scanner</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 22 }}>
          <KpiCard icon="📋" label="Booked" value="47" accentColor={T.green} />
          <KpiCard icon="✅" label="In" value="23" accentColor={T.green} />
          <KpiCard icon="⏳" label="Pending" value="21" accentColor={T.gold} />
        </div>
        <GlassCard style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "18px 22px", borderBottom: `1px solid ${T.border}` }}><div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700 }}>Entry Log — Tonight</div></div>
          <table>
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
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div><div style={{ fontFamily: T.font2, fontSize: 26, fontWeight: 700, marginBottom: 4 }}>QR Scanner</div><div style={{ fontSize: 14, color: T.t3 }}>Bouncer mode · Scan guest tickets</div></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: T.green, fontWeight: 700 }}>
            <div className="blink" style={{ width: 8, height: 8, background: T.green, borderRadius: "50%", boxShadow: `0 0 8px ${T.green}` }} />Scanned: 23
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <GlassCard>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Camera Scanner</div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, padding: "16px 0" }}>
              <div style={{ width: 280, height: 280, background: T.glass, border: `2px solid ${T.border}`, borderRadius: 24, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)", overflow: "hidden" }}>
                {[["top:14px;left:14px", "4px 0 0 4px"], ["top:14px;right:14px", "4px 4px 0 0"], ["bottom:14px;left:14px", "0 0 0 4px"], ["bottom:14px;right:14px", "0 4px 4px 0"]].map(([pos, br], i) => (
                  <div key={i} style={{ position: "absolute", ...Object.fromEntries(pos.split(";").map(p => { const [k, v] = p.split(":"); return [k.trim().replace(/-([a-z])/g, g => g[1].toUpperCase()), v.trim()]; })), width: 32, height: 32, border: `3px solid ${T.green}`, borderRadius: br, boxShadow: `0 0 8px ${T.green}44` }} />
                ))}
                <div className="scan-anim" style={{ position: "absolute", width: "70%", height: 2, background: `linear-gradient(to right,transparent,${T.green},transparent)`, boxShadow: `0 0 10px ${T.green}` }} />
                <div style={{ textAlign: "center", color: T.t4, fontSize: 13 }}>📱<br />Point at guest QR</div>
              </div>
              <div style={{ textAlign: "center", width: "100%" }}>
                <div style={{ fontSize: 13, color: T.t2, marginBottom: 10 }}>Or enter backup code manually:</div>
                <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                  <input placeholder="847291" maxLength={6} style={{ background: T.glass, border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 14px", color: T.white, fontSize: 14, fontFamily: T.font, width: 160, textAlign: "center", letterSpacing: 4 }} onFocus={e => e.target.style.borderColor = T.green} onBlur={e => e.target.style.borderColor = T.border} />
                  <button onClick={() => setScanResult("valid")} style={{ padding: "10px 20px", background: T.green, color: "#000", border: "none", borderRadius: 8, fontFamily: T.font, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Verify</button>
                </div>
              </div>
            </div>
          </GlassCard>
          <GlassCard>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Scan Result</div>
            {!scanResult ? <EmptyState icon="📱" title="Awaiting scan" sub="Use camera or enter backup code" /> : (
              <div className="fade-in" style={{ background: "rgba(0,200,83,0.04)", border: `2px solid ${T.green}`, borderRadius: T.rlg, padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                <div style={{ fontFamily: T.font2, fontSize: 22, fontWeight: 800, color: T.green, marginBottom: 16 }}>VALID — ADMIT</div>
                {[["Guest", "Priya & Arjun"], ["Type", "Couple Guestlist"], ["Guests", "2 people"], ["Payment", "PAID ✓"], ["Dress Code", "✓ Compliant"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "6px 0", borderBottom: `1px solid ${T.border}` }}>
                    <span style={{ color: T.t2 }}>{k}</span><span style={{ fontWeight: 700, color: k === "Payment" || k === "Dress Code" ? T.green : T.white }}>{v}</span>
                  </div>
                ))}
                <button onClick={() => setScanResult(null)} style={{ marginTop: 16, padding: "10px 24px", background: "transparent", border: `1px solid ${T.border}`, borderRadius: T.r, color: T.t2, fontFamily: T.font, fontSize: 13, cursor: "pointer" }}>Next Guest →</button>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    ),
    analytics: () => (
      <div className="fade-up">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div><div style={{ fontFamily: T.font2, fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Analytics</div><div style={{ fontSize: 14, color: T.t3 }}>March 2026 · Performance</div></div>
          <div style={{ display: "flex", gap: 10 }}><Btn variant="ghost" sm>Last 30 days</Btn><Btn variant="ghost" sm>Export PDF</Btn></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 28 }}>
          <KpiCard icon="📋" label="Total Bookings" value="842" change="+23%" accentColor={T.green} />
          <KpiCard icon="✅" label="Check-in Rate" value="91%" change="+4%" accentColor={T.purple} />
          <KpiCard icon="💰" label="Revenue" value="₹38L" change="+18%" accentColor={T.gold} />
          <KpiCard icon="⭐" label="Avg Rating" value="4.5" change="+0.3" accentColor={T.gold} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, marginBottom: 24 }}>
          <GlassCard>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Revenue This Week</div>
            <div style={{ fontSize: 12, color: T.t3, marginBottom: 20 }}>Daily estimated revenue (₹L)</div>
            <BarChart data={[1.2, 1.8, 1.1, 1.6, 3.0, 3.2, 2.0]} labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} primaryColor={T.purple} secondaryColor={T.purple2} />
          </GlassCard>
          <GlassCard>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Competitor Benchmark</div>
            <table>
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
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div><div style={{ fontFamily: T.font2, fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Edit Venue</div><div style={{ fontSize: 14, color: T.t3 }}>Update your NightOut listing</div></div>
          <Btn variant="primary" sm onClick={() => showToast("Venue updated and live!")}>Save Changes</Btn>
        </div>
        <GlassCard style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Basic Information</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <Input label="Venue Name" value="F Bar & Lounge" />
            <Input label="Category" value="Nightclub" />
            <Input label="City" value="Jaipur" />
            <Input label="Capacity" value="350" type="number" />
            <div style={{ gridColumn: "span 2" }}><Input label="Address" value="MI Road, Jaipur, Rajasthan 302001" /></div>
            <div style={{ gridColumn: "span 2" }}><Input label="Description" value="Jaipur's premier nightclub with world-class DJs and stunning rooftop views." /></div>
          </div>
        </GlassCard>
        <GlassCard>
          <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Amenities</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[["Parking", true], ["Valet", true], ["Dance Floor", true], ["Rooftop", false], ["Hookah", false], ["VIP Lounge", false], ["Smoking Area", true], ["Gender-Neutral WC", true]].map(([am, on]) => (
              <div key={am} style={{ padding: "8px 16px", background: on ? T.greenGlow : T.glass, border: `1px solid ${on ? "rgba(0,200,83,0.3)" : T.border}`, borderRadius: 10, fontSize: 13, fontWeight: 600, color: on ? T.green : T.t3, cursor: "pointer", transition: "all 0.2s" }}>{on ? "✓" : "+"} {am}</div>
            ))}
          </div>
        </GlassCard>
      </div>
    ),
    pricing: () => {
      return (
        <div className="fade-up">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
            <div><div style={{ fontFamily: T.font2, fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Pricing Manager</div><div style={{ fontSize: 14, color: T.t3 }}>Changes go live instantly</div></div>
            <Btn variant="primary" sm onClick={() => showToast("Pricing published live! ✓")}>Publish Live</Btn>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {["Weekday", "Friday", "Saturday", "Sunday", "Special Event"].map((d, i) => (
              <button key={d} style={{ padding: "8px 16px", borderRadius: 6, fontSize: 12, fontWeight: 600, color: i === 0 ? T.green : T.t3, background: i === 0 ? T.greenGlow : "transparent", border: `1px solid ${i === 0 ? T.green : T.border}`, cursor: "pointer" }}>{d}</button>
            ))}
          </div>
          <GlassCard style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Weekday Pricing</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <Input label="Stag Entry (₹)" value="1500" type="number" />
              <Input label="Couple Entry (₹)" value="2000" type="number" />
              <Input label="Female Entry (₹)" value="800" type="number" />
              <Input label="Includes" value="2 Drinks" />
              <div style={{ gridColumn: "span 2" }}><Input label="Dress Code" value="Smart casual · No shorts, flip-flops, sportswear" /></div>
            </div>
          </GlassCard>
          <GlassCard style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "18px 22px", borderBottom: `1px solid ${T.border}` }}><div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700 }}>Pricing History</div></div>
            <table>
              <thead><tr><th>Date</th><th>Stag</th><th>Couple</th><th>Female</th><th>Changed By</th></tr></thead>
              <tbody>
                {[["25 Mar", "₹1,500", "₹2,000", "₹800", "Vikram (Mgr)"], ["21 Mar", "₹2,000", "₹2,500", "₹1,000", "Amit Kumar"], ["14 Mar", "₹1,500", "₹2,000", "₹800", "Vikram (Mgr)"]].map(([d, ...r]) => (
                  <tr key={d}><td style={{ color: T.t2 }}>{d}</td>{r.map((v, i) => <td key={i} style={{ fontWeight: i < 3 ? 700 : 400 }}>{v}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </div>
      );
    },
    notifications: () => (
      <div className="fade-up">
        <div style={{ fontFamily: T.font2, fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Notifications</div>
        <div style={{ fontSize: 14, color: T.t3, marginBottom: 28 }}>Platform alerts and messages</div>
        {[
          { type: "booking", icon: "🎟️", color: T.green, title: "New booking: Rahul Sharma", "sub": "F Bar & Lounge · Stag · ₹1,629", time: "2 min ago" },
          { type: "alert", icon: "⚠️", color: T.gold, title: "Price update reminder", "sub": "Update pricing for this weekend before 5 PM", time: "1 hr ago" },
          { type: "review", icon: "⭐", color: T.gold, title: "New review posted", "sub": "Priya M. gave 5 stars: 'Best club in Jaipur!'", time: "3 hr ago" },
          { type: "booking", icon: "🎟️", color: T.green, title: "Table booking: Anjali Singh + 4", "sub": "Skybar 22 · Table 12 · ₹25,000 min spend", time: "5 hr ago" },
          { type: "system", icon: "🔔", color: T.purple2, title: "Rainbow certification renewal due", "sub": "Schedule audit within 28 days to maintain badge", time: "1 day ago" },
        ].map((n, i) => (
          <div key={i} className="glass hover-card" style={{ borderRadius: T.r, padding: "16px 18px", marginBottom: 10, display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: `rgba(${n.color === T.green ? "0,200,83" : n.color === T.gold ? "255,215,64" : "124,77,255"},0.1)`, border: `1px solid rgba(${n.color === T.green ? "0,200,83" : n.color === T.gold ? "255,215,64" : "124,77,255"},0.2)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{n.icon}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{n.title}</div><div style={{ fontSize: 12, color: T.t2 }}>{n.sub}</div></div>
            <span style={{ fontSize: 11, color: T.t4, whiteSpace: "nowrap" }}>{n.time}</span>
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
    <div style={{ display: "flex", minHeight: "100vh", paddingTop: 74 }}>
      {/* Sidebar */}
      <div style={{ width: 256, minWidth: 256, background: "rgba(10,10,10,0.95)", borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", padding: "28px 0", position: "sticky", top: 74, height: "calc(100vh - 74px)", overflowY: "auto" }}>
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
      <div style={{ flex: 1, padding: "36px 40px", overflowY: "auto", position: "relative" }}>
        {(panels[panel] || panels.overview)()}
      </div>
      {/* Toast */}
      {toast && <div className="fade-in" style={{ position: "fixed", bottom: 32, right: 32, background: T.glass3, border: `1px solid ${toast.color}`, borderRadius: T.r, padding: "14px 22px", color: toast.color, fontWeight: 600, fontSize: 14, backdropFilter: "blur(20px)", boxShadow: `0 0 30px ${toast.color}44`, zIndex: 9998 }}>{toast.msg}</div>}
    </div>
  );
};
