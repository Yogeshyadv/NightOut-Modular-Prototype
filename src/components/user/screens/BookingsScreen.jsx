import React, { useState } from 'react';
import { T } from '../../../theme/tokens';
import { MobNav } from '../MobNav';
import { userBookings } from '../../../data/mockData';

const EmptyState = ({ icon = "📭", title, sub }) => (
  <div style={{ textAlign: "center", padding: "60px 20px", color: T.t3 }}>
    <div style={{ fontSize: "3rem", marginBottom: 16 }}>{icon}</div>
    <div style={{ fontSize: 16, fontWeight: 700, color: T.t2, marginBottom: 8 }}>{title}</div>
    {sub && <div style={{ fontSize: 13, lineHeight: 1.7 }}>{sub}</div>}
  </div>
);

export const BookingsScreen = ({ navigate }) => {
  const [tab, setTab] = useState("upcoming");
  const filtered = userBookings.filter(b => b.status === tab);
  return (
    <div className="slide-in" style={{ height: "100%", position: "relative" }}>
      <div style={{ padding: "56px 20px 18px" }}>
        <div style={{ fontFamily: T.font2, fontSize: 22, fontWeight: 700, marginBottom: 4 }}>My Bookings</div>
        <div style={{ fontSize: 13, color: T.t2 }}>Your nightlife history</div>
      </div>
      <div style={{ display: "flex", background: T.glass, border: `1px solid ${T.border}`, borderRadius: T.r, padding: 4, margin: "0 20px 18px", backdropFilter: "blur(10px)" }}>
        {["upcoming", "past"].map(t => (
          <div key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: 10, textAlign: "center", fontSize: 13, fontWeight: 600, borderRadius: T.rsm, cursor: "pointer", background: tab === t ? T.green : "transparent", color: tab === t ? "#000" : T.t3, transition: "all 0.2s", textTransform: "capitalize" }}>{t}</div>
        ))}
      </div>
      <div className="mscroll" style={{ padding: "0 20px 90px" }}>
        {filtered.length === 0 && <EmptyState icon="📅" title="No bookings yet" sub={tab === "upcoming" ? "Book a venue to see upcoming plans" : "Past bookings will appear here"} />}
        {filtered.map(b => (
          <div key={b.id} className="glass hover-card" style={{ borderRadius: T.rlg, overflow: "hidden", marginBottom: 16 }}>
            <div style={{ height: 110, background: b.gradient, display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontSize: "2.5rem", position: "relative" }}>
              {b.emoji}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 20%,rgba(0,0,0,0.6))" }} />
              <span style={{ position: "absolute", top: 10, right: 10, padding: "3px 10px", borderRadius: 10, fontSize: 10, fontWeight: 700, background: b.status === "upcoming" ? "rgba(0,200,83,0.15)" : "rgba(176,176,176,0.1)", border: `1px solid ${b.status === "upcoming" ? T.green : "rgba(176,176,176,0.2)"}`, color: b.status === "upcoming" ? T.green : T.t2 }}>{b.status === "upcoming" ? "Confirmed" : "Completed"}</span>
            </div>
            <div style={{ padding: "14px 16px" }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, fontFamily: T.font2 }}>{b.venue}</div>
              <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                {[["📅", b.date], ["🕐", b.time], ["👤", `${b.guests} Guest${b.guests > 1 ? "s" : ""}`]].map(([ic, val]) => (
                  <div key={ic} style={{ display: "flex", alignItems: "center", justifyItems: "center", gap: 5, fontSize: 11, color: T.t2 }}>{ic} {val}</div>
                ))}
              </div>
              <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
                <div><div style={{ fontSize: 11, color: T.t3 }}>Total Paid</div><div style={{ fontSize: 15, fontWeight: 700, color: b.status === "upcoming" ? T.green : T.t2 }}>₹{b.amount.toLocaleString()}</div></div>
                {b.status === "upcoming" ? <button onClick={() => navigate("qr")} style={{ padding: "9px 16px", background: T.green, color: "#000", border: "none", borderRadius: T.rsm, fontFamily: T.font, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>📱 View QR</button> : <button style={{ padding: "9px 14px", background: "transparent", color: T.t2, border: `1px solid ${T.border}`, borderRadius: T.rsm, fontFamily: T.font, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Write Review ⭐</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
      <MobNav active="bookings" navigate={navigate} />
    </div>
  );
};
