import React, { useState } from 'react';
import { T } from '../../../theme/tokens';
import { Input } from '../../common/Input';
import { venues } from '../../../data/mockData';

export const BookingScreen = ({ venue, navigate }) => {
  const [day, setDay] = useState(1);
  const [entry, setEntry] = useState("stag");
  const [guests, setGuests] = useState(1);
  const v = venue || venues[0];
  const types = [{ id: "stag", label: "Stag", price: v.stagPrice }, { id: "couple", label: "Couple", price: v.couplePrice }, { id: "group", label: "Group", price: Math.round(v.stagPrice * 0.85) }];
  const sel = types.find(t => t.id === entry);
  const total = sel.price * guests + 99 + 30;
  return (
    <div className="slide-in" style={{ height: "100%", position: "relative" }}>
      <div style={{ padding: "56px 20px 18px", display: "flex", alignItems: "center", gap: 14, borderBottom: `1px solid ${T.border}` }}>
        <div onClick={() => navigate("venue")} style={{ width: 40, height: 40, background: T.glass, border: `1px solid ${T.border}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>←</div>
        <div><div style={{ fontFamily: T.font2, fontSize: 20, fontWeight: 700 }}>Guestlist Booking</div><div style={{ fontSize: 12, color: T.t2 }}>{v.name}</div></div>
      </div>
      <div className="mscroll" style={{ paddingBottom: 20 }}>
        <div className="hscroll" style={{ display: "flex", gap: 10, padding: "18px 20px 0", marginBottom: 18 }}>
          {[["Mon", "24"], ["Tue", "25"], ["Wed", "26"], ["Thu", "27"], ["Fri", "28"], ["Sat", "29"]].map(([d, n], i) => (
            <div key={i} onClick={() => setDay(i)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "10px 14px", minWidth: 52, background: day === i ? T.green : T.glass, border: `1.5px solid ${day === i ? T.green : T.border}`, borderRadius: T.rsm, cursor: "pointer", flexShrink: 0, transition: "all 0.2s" }}>
              <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", color: day === i ? "#000" : T.t3 }}>{d}</div>
              <div style={{ fontSize: 18, fontWeight: 800, fontFamily: T.font2, color: day === i ? "#000" : T.white }}>{n}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: "0 20px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: T.t3, marginBottom: 10 }}>Entry Type</div>
            <div style={{ display: "flex", gap: 10 }}>
              {types.map(t => (
                <div key={t.id} onClick={() => setEntry(t.id)} style={{ flex: 1, padding: "14px 10px", background: entry === t.id ? T.greenGlow2 : T.glass, border: `1.5px solid ${entry === t.id ? T.green : T.border}`, borderRadius: T.r, cursor: "pointer", textAlign: "center", transition: "all 0.2s" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{t.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: entry === t.id ? T.green : T.t3 }}>₹{t.price.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: T.t3, marginBottom: 10 }}>Guests</div>
            <div style={{ display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "space-between", background: T.glass, border: `1px solid ${T.border}`, borderRadius: T.r, padding: "14px 18px" }}>
              <div><div style={{ fontSize: 14, fontWeight: 600 }}>Number of Guests</div><div style={{ fontSize: 11, color: T.t2, marginTop: 2 }}>Name must match ID</div></div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div onClick={() => setGuests(g => Math.max(1, g - 1))} style={{ width: 36, height: 36, background: T.glass2, border: `1px solid ${T.border}`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, fontWeight: 700, color: T.green, transition: "all 0.2s" }}>−</div>
                <div style={{ fontFamily: T.font2, fontSize: 22, fontWeight: 800, minWidth: 28, textAlign: "center" }}>{guests}</div>
                <div onClick={() => setGuests(g => Math.min(10, g + 1))} style={{ width: 36, height: 36, background: T.glass2, border: `1px solid ${T.border}`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, fontWeight: 700, color: T.green, transition: "all 0.2s" }}>+</div>
              </div>
            </div>
          </div>
          <Input label="Guest Name" placeholder="Full name as on ID" value="Rahul Sharma" />
          <div className="glass" style={{ borderRadius: T.r, padding: 18, marginBottom: 18 }}>
            {[["Entry", `₹${sel.price.toLocaleString()} × ${guests}`], ["Refundable deposit", "₹99"], ["Platform fee", "₹30"]].map(([k, val]) => (
              <div key={k} style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", fontSize: 13, padding: "6px 0" }}><span style={{ color: T.t2 }}>{k}</span><span style={{ fontWeight: 600 }}>{val}</span></div>
            ))}
            <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", fontSize: 16, fontWeight: 800, paddingTop: 14, marginTop: 8, borderTop: `1px solid ${T.border}` }}>
              <span>Total</span><span style={{ color: T.green }}>₹{total.toLocaleString()}</span>
            </div>
          </div>
          <div style={{ background: T.glass, border: `1px solid ${T.border}`, borderRadius: T.r, padding: 14, display: "flex", gap: 10, marginBottom: 18 }}>
            <span style={{ color: T.green }}>ℹ️</span>
            <div style={{ fontSize: 12, color: T.t2, lineHeight: 1.6 }}>Free cancellation up to 4 hrs before. ₹99 deposit refunded on check-in.</div>
          </div>
          <button onClick={() => navigate("payment")} style={{ width: "100%", padding: 16, background: T.green, color: "#000", border: "none", borderRadius: T.r, fontFamily: T.font, fontSize: 15, fontWeight: 700, boxShadow: "0 0 24px rgba(0,200,83,0.25)", cursor: "pointer" }}>Confirm & Pay ₹{total.toLocaleString()}</button>
        </div>
      </div>
    </div>
  );
};
