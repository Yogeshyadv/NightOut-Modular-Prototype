import React, { useState } from 'react';
import { T } from '../../../theme/tokens';
import { venues } from '../../../data/mockData';

export const PaymentScreen = ({ venue, navigate }) => {
  const [sel, setSel] = useState(0);
  const methods = [{ icon: "🔵", name: "UPI", sub: "GPay, PhonePe, Paytm", bg: "rgba(0,100,255,0.1)" }, { icon: "💳", name: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay", bg: "rgba(255,140,0,0.1)" }, { icon: "🏦", name: "Net Banking", sub: "All major banks", bg: "rgba(0,200,83,0.1)" }, { icon: "👛", name: "Wallet", sub: "Paytm, Amazon Pay", bg: "rgba(124,77,255,0.1)" }];
  const v = venue || venues[0];
  return (
    <div className="slide-in" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "56px 20px 18px", display: "flex", alignItems: "center", gap: 14, borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
        <div onClick={() => navigate("booking")} style={{ width: 40, height: 40, background: T.glass, border: `1px solid ${T.border}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>←</div>
        <div><div style={{ fontFamily: T.font2, fontSize: 20, fontWeight: 700 }}>Payment</div><div style={{ fontSize: 12, color: T.t2 }}>Secure checkout</div></div>
      </div>
      <div className="mscroll" style={{ flex: 1, paddingBottom: 40, height: "auto" }}>
        <div className="glass" style={{ borderRadius: T.rlg, padding: 20, margin: "18px 20px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, paddingBottom: 16, borderBottom: `1px solid ${T.border}` }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: T.greenGlow, border: "1px solid rgba(0,200,83,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>{v.emoji}</div>
            <div><div style={{ fontSize: 15, fontWeight: 700 }}>{v.name}</div><div style={{ fontSize: 12, color: T.t2, marginTop: 2 }}>Guestlist · Stag · 25 March 2026</div></div>
          </div>
          {[["Entry (1 person)", "₹1,500"], ["Deposit", "₹99"], ["Platform fee", "₹30"]].map(([k, val]) => (
            <div key={k} style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", fontSize: 13, padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}><span style={{ color: T.t2 }}>{k}</span><span style={{ fontWeight: 600 }}>{val}</span></div>
          ))}
          <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", fontSize: 15, fontWeight: 800, paddingTop: 12, marginTop: 4 }}><span>Total</span><span style={{ color: T.green }}>₹1,629</span></div>
        </div>
        <div style={{ padding: "0 20px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: T.t3, marginBottom: 12 }}>Payment Method</div>
          {methods.map((m, i) => (
            <div key={m.name} onClick={() => setSel(i)} style={{ display: "flex", alignItems: "center", gap: 14, padding: 16, background: sel === i ? "rgba(0,200,83,0.04)" : T.glass, border: `1.5px solid ${sel === i ? T.green : T.border}`, borderRadius: T.r, cursor: "pointer", marginBottom: 10, backdropFilter: "blur(10px)", transition: "all 0.2s" }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{m.icon}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</div><div style={{ fontSize: 11, color: T.t2, marginTop: 2 }}>{m.sub}</div></div>
              <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${sel === i ? T.green : T.border}`, display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center" }}>
                {sel === i && <div style={{ width: 10, height: 10, background: T.green, borderRadius: "50%", boxShadow: `0 0 8px ${T.green}` }} />}
              </div>
            </div>
          ))}
          <button onClick={() => navigate("qr")} style={{ width: "100%", padding: 16, background: T.green, color: "#000", border: "none", borderRadius: T.r, fontFamily: T.font, fontSize: 15, fontWeight: 700, boxShadow: "0 0 24px rgba(0,200,83,0.25)", cursor: "pointer", marginTop: 4 }}>Pay ₹99 Deposit Now</button>
          <div style={{ textAlign: "center", fontSize: 11, color: T.t4, marginTop: 10 }}>🔒 Secured by Razorpay · 256-bit SSL</div>
        </div>
      </div>
    </div>
  );
};
