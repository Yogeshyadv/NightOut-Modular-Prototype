import React from 'react';
import { T } from '../../../theme/tokens';
import { venues } from '../../../data/mockData';

export const QRScreen = ({ venue, navigate }) => {
  const v = venue || venues[0];
  return (
    <div className="slide-in" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="mscroll" style={{ flex: 1, paddingBottom: 40, height: "auto" }}>
        <div style={{ padding: "72px 20px 24px", textAlign: "center" }}>
          <div className="qr-pop" style={{ width: 72, height: 72, background: T.greenGlow, border: "2px solid rgba(0,200,83,0.4)", borderRadius: "50%", margin: "0 auto 18px", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontSize: 28, color: T.green, boxShadow: "0 0 40px rgba(0,200,83,0.2)" }}>✓</div>
          <div style={{ fontFamily: T.font2, fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Booking Confirmed!</div>
          <div style={{ fontSize: 13, color: T.t2 }}>Show QR at the venue entrance</div>
        </div>
        <div style={{ background: "#fff", borderRadius: 20, padding: 24, margin: "0 20px 14px", display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center", gap: 12, boxShadow: "0 0 0 1px rgba(0,200,83,0.15),0 8px 40px rgba(0,0,0,0.5)" }}>
          <svg viewBox="0 0 200 200" width="180" height="180" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="white" />
            <rect x="12" y="12" width="56" height="56" rx="6" fill="#000" /><rect x="20" y="20" width="40" height="40" rx="3" fill="#fff" /><rect x="27" y="27" width="26" height="26" rx="2" fill="#000" />
            <rect x="132" y="12" width="56" height="56" rx="6" fill="#000" /><rect x="140" y="20" width="40" height="40" rx="3" fill="#fff" /><rect x="147" y="27" width="26" height="26" rx="2" fill="#000" />
            <rect x="12" y="132" width="56" height="56" rx="6" fill="#000" /><rect x="20" y="140" width="40" height="40" rx="3" fill="#fff" /><rect x="27" y="147" width="26" height="26" rx="2" fill="#000" />
            {[[76, 12], [88, 12], [100, 12], [120, 12], [76, 24], [100, 24], [112, 24], [88, 36], [120, 36], [76, 48], [112, 48], [12, 76], [28, 76], [76, 76], [100, 76], [132, 76], [156, 76], [180, 76], [12, 92], [44, 92], [76, 92], [148, 92], [172, 92], [28, 108], [52, 108], [108, 108], [136, 108], [76, 132], [100, 132], [148, 132], [88, 148], [160, 148], [76, 164], [100, 164], [148, 164], [84, 180], [108, 180], [132, 180], [164, 180]].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width="8" height="8" rx="1" fill="#000" />
            ))}
            <rect x="84" y="84" width="32" height="32" rx="6" fill="#00C853" />
            <text x="100" y="106" fontSize="18" fontWeight="800" fill="#000" textAnchor="middle" fontFamily="sans-serif">N</text>
          </svg>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{v.name} — Guestlist</div>
          <div style={{ fontSize: 11, color: "#888" }}>Booking ID: NO-2026-84729</div>
        </div>
        <div style={{ background: T.glass, border: "1px dashed rgba(0,200,83,0.35)", borderRadius: T.r, padding: 16, margin: "0 20px 14px", textAlign: "center" }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: T.t3, marginBottom: 8 }}>Backup Code</div>
          <div style={{ fontFamily: T.font2, fontSize: 30, fontWeight: 800, color: T.green, letterSpacing: 10, textShadow: "0 0 20px rgba(0,200,83,0.3)" }}>847 291</div>
        </div>
        <div className="glass" style={{ borderRadius: T.r, padding: 18, margin: "0 20px 14px" }}>
          {[["Venue", v.name], ["Date", "Tue, 25 March 2026"], ["Type", "Guestlist — Stag"], ["Guest", "Rahul Sharma"], ["Status", "✓ Confirmed & Paid"]].map(([k, val]) => (
            <div key={k} style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", fontSize: 13, padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
              <span style={{ color: T.t2 }}>{k}</span><span style={{ fontWeight: 600, color: k === "Status" ? T.green : T.white }}>{val}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, padding: "0 20px 30px" }}>
          {[["📤 Share"], ["📍 Directions"], ["📅 My Bookings"]].map(([l], i) => (
            <button key={l} onClick={() => i === 2 && navigate("bookings")} style={{ flex: 1, padding: 13, background: T.glass, border: `1px solid ${T.border}`, borderRadius: T.r, color: T.white, fontFamily: T.font, fontSize: 12, fontWeight: 600, cursor: "pointer", backdropFilter: "blur(10px)" }}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  );
};
